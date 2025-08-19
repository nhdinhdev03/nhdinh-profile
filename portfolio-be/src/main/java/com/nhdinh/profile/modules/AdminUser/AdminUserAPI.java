package com.nhdinh.profile.modules.AdminUser;


import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/admin-users")
@CrossOrigin(origins = "*")
public class AdminUserAPI {
    
    @Autowired
    private AdminUserService adminUserService;
    
    // Create new admin user
    @PostMapping("/create")
    public ResponseEntity<AdminUser> createAdminUser(@Valid @RequestBody AdminUserRequest request) {
        try {
            AdminUser adminUser = adminUserService.createAdminUser(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update admin user
    @PutMapping("/{id}")
    public ResponseEntity<AdminUser> updateAdminUser(@PathVariable UUID id, 
                                                    @Valid @RequestBody AdminUserUpdateRequest request) {
        try {
            AdminUser adminUser = adminUserService.updateAdminUser(id, request);
            return ResponseEntity.ok(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Change password
    @PutMapping("/{id}/change-password")
    public ResponseEntity<AdminUser> changePassword(@PathVariable UUID id, 
                                                   @Valid @RequestBody ChangePasswordRequest request) {
        try {
            AdminUser adminUser = adminUserService.changePassword(id, request);
            return ResponseEntity.ok(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Reset password (admin function)
    @PutMapping("/{id}/reset-password")
    public ResponseEntity<AdminUser> resetPassword(@PathVariable UUID id, 
                                                  @RequestBody ResetPasswordRequest request) {
        try {
            AdminUser adminUser = adminUserService.resetPassword(id, request.getNewPassword());
            return ResponseEntity.ok(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Authenticate user
    @PostMapping("/authenticate")
    public ResponseEntity<AdminUser> authenticate(@RequestBody LoginRequest request) {
        try {
            Optional<AdminUser> user = adminUserService.authenticate(request.getIdentifier(), request.getPassword());
            return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.status(HttpStatus.UNAUTHORIZED).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get all admin users
    @GetMapping("/all")
    public ResponseEntity<List<AdminUser>> getAllAdminUsers() {
        try {
            List<AdminUser> users = adminUserService.getAllAdminUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get admin user by ID
    @GetMapping("/{id}")
    public ResponseEntity<AdminUser> getAdminUserById(@PathVariable UUID id) {
        try {
            Optional<AdminUser> user = adminUserService.getAdminUserById(id);
            return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get admin user by phone number
    @GetMapping("/phone/{phoneNumber}")
    public ResponseEntity<AdminUser> getAdminUserByPhoneNumber(@PathVariable String phoneNumber) {
        try {
            Optional<AdminUser> user = adminUserService.getAdminUserByPhoneNumber(phoneNumber);
            return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get admin user by username
    @GetMapping("/username/{username}")
    public ResponseEntity<AdminUser> getAdminUserByUsername(@PathVariable String username) {
        try {
            Optional<AdminUser> user = adminUserService.getAdminUserByUsername(username);
            return user.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get active admin users
    @GetMapping("/active")
    public ResponseEntity<List<AdminUser>> getActiveAdminUsers() {
        try {
            List<AdminUser> users = adminUserService.getActiveAdminUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get inactive admin users
    @GetMapping("/inactive")
    public ResponseEntity<List<AdminUser>> getInactiveAdminUsers() {
        try {
            List<AdminUser> users = adminUserService.getInactiveAdminUsers();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Activate admin user
    @PutMapping("/{id}/activate")
    public ResponseEntity<AdminUser> activateAdminUser(@PathVariable UUID id) {
        try {
            AdminUser adminUser = adminUserService.activateAdminUser(id);
            return ResponseEntity.ok(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Deactivate admin user
    @PutMapping("/{id}/deactivate")
    public ResponseEntity<AdminUser> deactivateAdminUser(@PathVariable UUID id) {
        try {
            AdminUser adminUser = adminUserService.deactivateAdminUser(id);
            return ResponseEntity.ok(adminUser);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete admin user
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminUser(@PathVariable UUID id) {
        try {
            adminUserService.deleteAdminUser(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Search admin users
    @GetMapping("/search")
    public ResponseEntity<List<AdminUser>> searchAdminUsers(@RequestParam String keyword) {
        try {
            List<AdminUser> users = adminUserService.searchAdminUsers(keyword);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get users by date range
    @GetMapping("/date-range")
    public ResponseEntity<List<AdminUser>> getUsersByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            List<AdminUser> users = adminUserService.getUsersByDateRange(startDate, endDate);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get recent users
    @GetMapping("/recent")
    public ResponseEntity<List<AdminUser>> getRecentUsers(@RequestParam(defaultValue = "7") int days) {
        try {
            List<AdminUser> users = adminUserService.getRecentUsers(days);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Check if phone number exists
    @GetMapping("/check-phone/{phoneNumber}")
    public ResponseEntity<Boolean> phoneNumberExists(@PathVariable String phoneNumber) {
        try {
            boolean exists = adminUserService.phoneNumberExists(phoneNumber);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Check if username exists
    @GetMapping("/check-username/{username}")
    public ResponseEntity<Boolean> usernameExists(@PathVariable String username) {
        try {
            boolean exists = adminUserService.usernameExists(username);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count total users
    @GetMapping("/count/total")
    public ResponseEntity<Long> countTotalUsers() {
        try {
            long count = adminUserService.countTotalUsers();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count active users
    @GetMapping("/count/active")
    public ResponseEntity<Long> countActiveUsers() {
        try {
            long count = adminUserService.countActiveUsers();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count inactive users
    @GetMapping("/count/inactive")
    public ResponseEntity<Long> countInactiveUsers() {
        try {
            long count = adminUserService.countInactiveUsers();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get user statistics
    @GetMapping("/statistics")
    public ResponseEntity<AdminUserStatsResponse> getUserStatistics() {
        try {
            AdminUserStatsResponse stats = adminUserService.getUserStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get monthly statistics
    @GetMapping("/statistics/monthly")
    public ResponseEntity<List<AdminUserMonthlyStats>> getMonthlyStatistics() {
        try {
            List<AdminUserMonthlyStats> stats = adminUserService.getMonthlyStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get users without username
    @GetMapping("/without-username")
    public ResponseEntity<List<AdminUser>> getUsersWithoutUsername() {
        try {
            List<AdminUser> users = adminUserService.getUsersWithoutUsername();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get users without full name
    @GetMapping("/without-fullname")
    public ResponseEntity<List<AdminUser>> getUsersWithoutFullName() {
        try {
            List<AdminUser> users = adminUserService.getUsersWithoutFullName();
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch activate users
    @PutMapping("/batch/activate")
    public ResponseEntity<List<AdminUser>> batchActivateUsers(@RequestBody List<UUID> userIds) {
        try {
            List<AdminUser> users = adminUserService.batchActivateUsers(userIds);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch deactivate users
    @PutMapping("/batch/deactivate")
    public ResponseEntity<List<AdminUser>> batchDeactivateUsers(@RequestBody List<UUID> userIds) {
        try {
            List<AdminUser> users = adminUserService.batchDeactivateUsers(userIds);
            return ResponseEntity.ok(users);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch delete users
    @DeleteMapping("/batch")
    public ResponseEntity<Void> batchDeleteUsers(@RequestBody List<UUID> userIds) {
        try {
            adminUserService.batchDeleteUsers(userIds);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get admin user summary for dashboard
    @GetMapping("/admin/summary")
    public ResponseEntity<AdminUserSummaryResponse> getAdminUserSummary() {
        try {
            AdminUserSummaryResponse summary = adminUserService.getAdminUserSummary();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
