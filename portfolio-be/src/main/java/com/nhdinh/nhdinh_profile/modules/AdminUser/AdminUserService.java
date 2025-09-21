package com.nhdinh.nhdinh_profile.modules.AdminUser;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.AdminUserRepository;

@Service
@Transactional
public class AdminUserService {
    
    private final AdminUserRepository adminUserRepository;
    
    public AdminUserService(AdminUserRepository adminUserRepository) {
        this.adminUserRepository = adminUserRepository;
    }
    
    /**
     * Tìm admin theo phone number
     */
    public Optional<AdminUser> findByPhoneNumber(String phoneNumber) {
        return adminUserRepository.findByPhoneNumber(phoneNumber);
    }
    
    /**
     * Tìm admin theo username
     */
    public Optional<AdminUser> findByUsername(String username) {
        return adminUserRepository.findByUsername(username);
    }
    
    /**
     * Kiểm tra phone number có tồn tại
     */
    public boolean existsByPhoneNumber(String phoneNumber) {
        return adminUserRepository.existsByPhoneNumber(phoneNumber);
    }
    
    /**
     * Kiểm tra username có tồn tại
     */
    public boolean existsByUsername(String username) {
        return adminUserRepository.existsByUsername(username);
    }
    
    /**
     * Tìm admin active theo phone hoặc username
     */
    public Optional<AdminUser> findActiveByPhoneOrUsername(String identifier) {
        return adminUserRepository.findActiveByPhoneOrUsername(identifier);
    }
    
    /**
     * Lưu AdminUser
     */
    public AdminUser save(AdminUser adminUser) {
        return adminUserRepository.save(adminUser);
    }
    
    /**
     * Tìm AdminUser theo ID
     */
    public Optional<AdminUser> findById(UUID userId) {
        return adminUserRepository.findById(userId);
    }
    
    /**
     * Xóa AdminUser theo ID
     */
    public void deleteById(UUID userId) {
        adminUserRepository.deleteById(userId);
    }
}