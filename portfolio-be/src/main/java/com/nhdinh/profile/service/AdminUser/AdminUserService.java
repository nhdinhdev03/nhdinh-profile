package com.nhdinh.profile.service.AdminUser;

import com.nhdinh.profile.modules.AdminUser.AdminUser;
import com.nhdinh.profile.modules.AdminUser.AdminUserDAO;
import com.nhdinh.profile.modules.AdminUser.AdminUserMonthlyStats;
import com.nhdinh.profile.request.AdminUser.AdminUserRequest;
import com.nhdinh.profile.request.AdminUser.AdminUserUpdateRequest;
import com.nhdinh.profile.request.AdminUser.ChangePasswordRequest;
import com.nhdinh.profile.response.AdminUser.AdminUserStatsResponse;
import com.nhdinh.profile.response.AdminUser.AdminUserSummaryResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class AdminUserService {
    
    @Autowired
    private AdminUserDAO adminUserDAO;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    // Create new admin user
    public AdminUser createAdminUser(AdminUserRequest request) {
        // Validate phone number uniqueness
        if (adminUserDAO.existsByPhoneNumber(request.getPhoneNumber())) {
            throw new IllegalArgumentException("Phone number already exists");
        }
        
        // Validate username uniqueness if provided
        if (request.getUsername() != null && !request.getUsername().trim().isEmpty()) {
            if (adminUserDAO.existsByUsername(request.getUsername())) {
                throw new IllegalArgumentException("Username already exists");
            }
        }
        
        // Create admin user
        AdminUser adminUser = new AdminUser();
        adminUser.setPhoneNumber(request.getPhoneNumber());
        adminUser.setUsername(request.getUsername());
        adminUser.setPasswordHash(passwordEncoder.encode(request.getPassword()));
        adminUser.setFullName(request.getFullName());
        adminUser.setIsActive(true);
        
        return adminUserDAO.save(adminUser);
    }
    
    // Update admin user
    public AdminUser updateAdminUser(UUID userId, AdminUserUpdateRequest request) {
        AdminUser adminUser = adminUserDAO.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Admin user not found"));
        
        // Validate phone number uniqueness
        if (request.getPhoneNumber() != null && 
            !request.getPhoneNumber().equals(adminUser.getPhoneNumber())) {
            if (adminUserDAO.existsByPhoneNumberAndUserIdNot(request.getPhoneNumber(), userId)) {
                throw new IllegalArgumentException("Phone number already exists");
            }
            adminUser.setPhoneNumber(request.getPhoneNumber());
        }
        
        // Validate username uniqueness
        if (request.getUsername() != null && 
            !request.getUsername().equals(adminUser.getUsername())) {
            if (adminUserDAO.existsByUsernameAndUserIdNot(request.getUsername(), userId)) {
                throw new IllegalArgumentException("Username already exists");
            }
            adminUser.setUsername(request.getUsername());
        }
        
        // Update other fields
        if (request.getFullName() != null) {
            adminUser.setFullName(request.getFullName());
        }
        
        return adminUserDAO.save(adminUser);
    }
    
    // Change password
    public AdminUser changePassword(UUID userId, ChangePasswordRequest request) {
        AdminUser adminUser = adminUserDAO.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Admin user not found"));
        
        // Verify current password
        if (!passwordEncoder.matches(request.getCurrentPassword(), adminUser.getPasswordHash())) {
            throw new IllegalArgumentException("Current password is incorrect");
        }
        
        // Update password
        adminUser.setPasswordHash(passwordEncoder.encode(request.getNewPassword()));
        return adminUserDAO.save(adminUser);
    }
    
    // Reset password (admin function)
    public AdminUser resetPassword(UUID userId, String newPassword) {
        AdminUser adminUser = adminUserDAO.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Admin user not found"));
        
        adminUser.setPasswordHash(passwordEncoder.encode(newPassword));
        return adminUserDAO.save(adminUser);
    }
    
    // Authenticate user
    public Optional<AdminUser> authenticate(String identifier, String password) {
        Optional<AdminUser> userOpt = adminUserDAO.findByPhoneNumberOrUsername(identifier);
        
        if (userOpt.isPresent()) {
            AdminUser user = userOpt.get();
            if (user.isActive() && passwordEncoder.matches(password, user.getPasswordHash())) {
                return Optional.of(user);
            }
        }
        
        return Optional.empty();
    }
    
    // Get all admin users
    public List<AdminUser> getAllAdminUsers() {
        return adminUserDAO.findAll();
    }
    
    // Get admin user by ID
    public Optional<AdminUser> getAdminUserById(UUID userId) {
        return adminUserDAO.findById(userId);
    }
    
    // Get admin user by phone number
    public Optional<AdminUser> getAdminUserByPhoneNumber(String phoneNumber) {
        return adminUserDAO.findByPhoneNumber(phoneNumber);
    }
    
    // Get admin user by username
    public Optional<AdminUser> getAdminUserByUsername(String username) {
        return adminUserDAO.findByUsername(username);
    }
    
    // Get active admin users
    public List<AdminUser> getActiveAdminUsers() {
        return adminUserDAO.findByIsActiveTrue();
    }
    
    // Get inactive admin users
    public List<AdminUser> getInactiveAdminUsers() {
        return adminUserDAO.findByIsActiveFalse();
    }
    
    // Activate admin user
    public AdminUser activateAdminUser(UUID userId) {
        AdminUser adminUser = adminUserDAO.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Admin user not found"));
        
        adminUser.activate();
        return adminUserDAO.save(adminUser);
    }
    
    // Deactivate admin user
    public AdminUser deactivateAdminUser(UUID userId) {
        AdminUser adminUser = adminUserDAO.findById(userId)
                .orElseThrow(() -> new IllegalArgumentException("Admin user not found"));
        
        adminUser.deactivate();
        return adminUserDAO.save(adminUser);
    }
    
    // Delete admin user
    public void deleteAdminUser(UUID userId) {
        if (!adminUserDAO.existsById(userId)) {
            throw new IllegalArgumentException("Admin user not found");
        }
        adminUserDAO.deleteById(userId);
    }
    
    // Search admin users
    public List<AdminUser> searchAdminUsers(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return adminUserDAO.findAll();
        }
        return adminUserDAO.searchAdminUsers(keyword.trim());
    }
    
    // Get users created within date range
    public List<AdminUser> getUsersByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return adminUserDAO.findByCreatedAtBetween(startDate, endDate);
    }
    
    // Get recent users
    public List<AdminUser> getRecentUsers(int days) {
        LocalDateTime cutoffDate = LocalDateTime.now().minus(days, ChronoUnit.DAYS);
        return adminUserDAO.findByCreatedAtAfterOrderByCreatedAtDesc(cutoffDate);
    }
    
    // Check if phone number exists
    public boolean phoneNumberExists(String phoneNumber) {
        return adminUserDAO.existsByPhoneNumber(phoneNumber);
    }
    
    // Check if username exists
    public boolean usernameExists(String username) {
        return adminUserDAO.existsByUsername(username);
    }
    
    // Count statistics
    public long countTotalUsers() {
        return adminUserDAO.countTotalUsers();
    }
    
    public long countActiveUsers() {
        return adminUserDAO.countByIsActiveTrue();
    }
    
    public long countInactiveUsers() {
        return adminUserDAO.countByIsActiveFalse();
    }
    
    public long countUsersCreatedToday() {
        return adminUserDAO.countUsersCreatedToday();
    }
    
    public long countUsersCreatedThisWeek() {
        LocalDateTime startOfWeek = LocalDateTime.now().with(java.time.DayOfWeek.MONDAY).truncatedTo(ChronoUnit.DAYS);
        return adminUserDAO.countUsersCreatedThisWeek(startOfWeek);
    }
    
    public long countUsersCreatedThisMonth() {
        return adminUserDAO.countUsersCreatedThisMonth();
    }
    
    public long countUsersCreatedThisYear() {
        return adminUserDAO.countUsersCreatedThisYear();
    }
    
    // Get user statistics
    public AdminUserStatsResponse getUserStatistics() {
        long totalUsers = countTotalUsers();
        long activeUsers = countActiveUsers();
        long inactiveUsers = countInactiveUsers();
        long usersToday = countUsersCreatedToday();
        long usersThisWeek = countUsersCreatedThisWeek();
        long usersThisMonth = countUsersCreatedThisMonth();
        long usersThisYear = countUsersCreatedThisYear();
        
        double activeRate = totalUsers > 0 ? (double) activeUsers / totalUsers * 100 : 0;
        
        return new AdminUserStatsResponse(
                totalUsers, activeUsers, inactiveUsers, activeRate,
                usersToday, usersThisWeek, usersThisMonth, usersThisYear
        );
    }
    
    // Get monthly statistics
    public List<AdminUserMonthlyStats> getMonthlyStatistics() {
        List<Object[]> rawStats = adminUserDAO.getUserStatisticsByMonth();
        return rawStats.stream()
                .map(row -> new AdminUserMonthlyStats(
                        ((Number) row[0]).intValue(), // year
                        ((Number) row[1]).intValue(), // month
                        ((Number) row[2]).longValue() // count
                ))
                .toList();
    }
    
    // Get users without username
    public List<AdminUser> getUsersWithoutUsername() {
        return adminUserDAO.findUsersWithoutUsername();
    }
    
    // Get users without full name
    public List<AdminUser> getUsersWithoutFullName() {
        return adminUserDAO.findUsersWithoutFullName();
    }
    
    // Batch operations
    public List<AdminUser> batchActivateUsers(List<UUID> userIds) {
        List<AdminUser> users = adminUserDAO.findAllById(userIds);
        users.forEach(AdminUser::activate);
        return adminUserDAO.saveAll(users);
    }
    
    public List<AdminUser> batchDeactivateUsers(List<UUID> userIds) {
        List<AdminUser> users = adminUserDAO.findAllById(userIds);
        users.forEach(AdminUser::deactivate);
        return adminUserDAO.saveAll(users);
    }
    
    public void batchDeleteUsers(List<UUID> userIds) {
        adminUserDAO.deleteAllById(userIds);
    }
    
    // Get admin summary for dashboard
    public AdminUserSummaryResponse getAdminUserSummary() {
        AdminUserStatsResponse stats = getUserStatistics();
        List<AdminUser> recentUsers = getRecentUsers(7);
        List<AdminUser> activeUsers = adminUserDAO.findActiveUsersOrderByCreatedAtDesc();
        List<AdminUser> inactiveUsers = adminUserDAO.findInactiveUsersOrderByCreatedAtDesc();
        List<AdminUserMonthlyStats> monthlyStats = getMonthlyStatistics();
        
        return new AdminUserSummaryResponse(stats, recentUsers, activeUsers, inactiveUsers, monthlyStats);
    }
}
