package com.nhdinh.profile.modules.AdminUser;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Repository
public interface AdminUserDAO extends JpaRepository<AdminUser, UUID> {
    
    // Find by phone number
    Optional<AdminUser> findByPhoneNumber(String phoneNumber);
    
    // Find by username
    Optional<AdminUser> findByUsername(String username);
    
    // Find by phone number or username (for login)
    @Query("SELECT a FROM AdminUser a WHERE (a.phoneNumber = :identifier OR a.username = :identifier) AND a.isActive = true")
    Optional<AdminUser> findByPhoneNumberOrUsername(@Param("identifier") String identifier);
    
    // Find active users only
    List<AdminUser> findByIsActiveTrue();
    
    // Find inactive users only
    List<AdminUser> findByIsActiveFalse();
    
    // Find by active status
    List<AdminUser> findByIsActive(Boolean isActive);
    
    // Check if phone number exists
    boolean existsByPhoneNumber(String phoneNumber);
    
    // Check if username exists
    boolean existsByUsername(String username);
    
    // Check if phone number exists excluding current user
    @Query("SELECT COUNT(a) > 0 FROM AdminUser a WHERE a.phoneNumber = :phoneNumber AND a.userId != :userId")
    boolean existsByPhoneNumberAndUserIdNot(@Param("phoneNumber") String phoneNumber, @Param("userId") UUID userId);
    
    // Check if username exists excluding current user
    @Query("SELECT COUNT(a) > 0 FROM AdminUser a WHERE a.username = :username AND a.userId != :userId")
    boolean existsByUsernameAndUserIdNot(@Param("username") String username, @Param("userId") UUID userId);
    
    // Search by full name (case-insensitive)
    @Query("SELECT a FROM AdminUser a WHERE LOWER(a.fullName) LIKE LOWER(CONCAT('%', :name, '%'))")
    List<AdminUser> findByFullNameContainingIgnoreCase(@Param("name") String name);
    
    // Search admin users by keyword (name, username, phone)
    @Query("SELECT a FROM AdminUser a WHERE " +
           "LOWER(a.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(a.username) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "a.phoneNumber LIKE CONCAT('%', :keyword, '%')")
    List<AdminUser> searchAdminUsers(@Param("keyword") String keyword);
    
    // Find users created within date range
    @Query("SELECT a FROM AdminUser a WHERE a.createdAt BETWEEN :startDate AND :endDate ORDER BY a.createdAt DESC")
    List<AdminUser> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                          @Param("endDate") LocalDateTime endDate);
    
    // Find users created after specific date
    List<AdminUser> findByCreatedAtAfterOrderByCreatedAtDesc(LocalDateTime date);
    
    // Find users created before specific date
    List<AdminUser> findByCreatedAtBeforeOrderByCreatedAtDesc(LocalDateTime date);
    
    // Get recently created users
    @Query("SELECT a FROM AdminUser a ORDER BY a.createdAt DESC")
    List<AdminUser> findRecentUsers();
    
    // Count active users
    long countByIsActiveTrue();
    
    // Count inactive users
    long countByIsActiveFalse();
    
    // Count total users
    @Query("SELECT COUNT(a) FROM AdminUser a")
    long countTotalUsers();
    
    // Count users created today
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE DATE(a.createdAt) = CURRENT_DATE")
    long countUsersCreatedToday();
    
    // Count users created this week
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE a.createdAt >= :startOfWeek")
    long countUsersCreatedThisWeek(@Param("startOfWeek") LocalDateTime startOfWeek);
    
    // Count users created this month
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE YEAR(a.createdAt) = YEAR(CURRENT_DATE) AND MONTH(a.createdAt) = MONTH(CURRENT_DATE)")
    long countUsersCreatedThisMonth();
    
    // Count users created this year
    @Query("SELECT COUNT(a) FROM AdminUser a WHERE YEAR(a.createdAt) = YEAR(CURRENT_DATE)")
    long countUsersCreatedThisYear();
    
    // Get user statistics by month
    @Query("SELECT YEAR(a.createdAt) as year, MONTH(a.createdAt) as month, COUNT(a) as count " +
           "FROM AdminUser a " +
           "GROUP BY YEAR(a.createdAt), MONTH(a.createdAt) " +
           "ORDER BY year DESC, month DESC")
    List<Object[]> getUserStatisticsByMonth();
    
    // Find users with no username set
    @Query("SELECT a FROM AdminUser a WHERE a.username IS NULL OR a.username = ''")
    List<AdminUser> findUsersWithoutUsername();
    
    // Find users with no full name set
    @Query("SELECT a FROM AdminUser a WHERE a.fullName IS NULL OR a.fullName = ''")
    List<AdminUser> findUsersWithoutFullName();
    
    // Get active users ordered by creation date
    @Query("SELECT a FROM AdminUser a WHERE a.isActive = true ORDER BY a.createdAt DESC")
    List<AdminUser> findActiveUsersOrderByCreatedAtDesc();
    
    // Get inactive users ordered by creation date
    @Query("SELECT a FROM AdminUser a WHERE a.isActive = false ORDER BY a.createdAt DESC")
    List<AdminUser> findInactiveUsersOrderByCreatedAtDesc();
}
