package com.nhdinh.nhdinh_profile.modules.AdminUser;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.services.AdminUserService;

import jakarta.validation.Valid;

/**
 * Simple AdminUser API Controller
 * Note: Authentication/Authorization should be implemented with Spring Security
 */
@RestController
@RequestMapping("/api/v2/admin-users")
@CrossOrigin(origins = "*", maxAge = 3600)
public class AdminUserAPI {

    private final AdminUserService adminUserService;

    public AdminUserAPI(AdminUserService adminUserService) {
        this.adminUserService = adminUserService;
    }


    @GetMapping
    @Transactional(readOnly = true)
    public ResponseEntity<Page<AdminUser>> getAllActiveAdminUsers(Pageable pageable) {
        try {
            Page<AdminUser> adminUsers = adminUserService.findAllActiveWithPagination(pageable);
            return ResponseEntity.ok(adminUsers);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    /**
     * Lấy admin user theo phone number
     */
    @GetMapping("/phone/{phoneNumber}")
    @Transactional(readOnly = true)
    public ResponseEntity<AdminUser> getAdminUserByPhone(@PathVariable String phoneNumber) {
        try {
            Optional<AdminUser> adminUser = adminUserService.findByPhoneNumber(phoneNumber);
            return adminUser.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy admin user theo username
     */
    @GetMapping("/username/{username}")
    @Transactional(readOnly = true)
    public ResponseEntity<AdminUser> getAdminUserByUsername(@PathVariable String username) {
        try {
            Optional<AdminUser> adminUser = adminUserService.findByUsername(username);
            return adminUser.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy admin user theo ID
     */
    @GetMapping("/{id}")
    @Transactional(readOnly = true)
    public ResponseEntity<AdminUser> getAdminUserById(@PathVariable UUID id) {
        try {
            Optional<AdminUser> adminUser = adminUserService.findById(id);
            return adminUser.map(ResponseEntity::ok)
                           .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo admin user mới
     * Note: Password should be hashed in production
     */
    @PostMapping
    public ResponseEntity<AdminUser> createAdminUser(@Valid @RequestBody AdminUser adminUser) {
        try {
            AdminUser createdAdminUser = adminUserService.save(adminUser);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdAdminUser);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật admin user
     */
    @PutMapping("/{id}")
    public ResponseEntity<AdminUser> updateAdminUser(@PathVariable UUID id, 
                                                    @Valid @RequestBody AdminUser adminUser) {
        try {
            Optional<AdminUser> existingAdminUser = adminUserService.findById(id);
            if (existingAdminUser.isPresent()) {
                adminUser.setUserId(id);
                AdminUser updatedAdminUser = adminUserService.save(adminUser);
                return ResponseEntity.ok(updatedAdminUser);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa admin user
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAdminUser(@PathVariable UUID id) {
        try {
            Optional<AdminUser> existingAdminUser = adminUserService.findById(id);
            if (existingAdminUser.isPresent()) {
                adminUserService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}