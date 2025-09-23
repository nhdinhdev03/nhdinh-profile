package com.nhdinh.nhdinh_profile.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.AdminUser.AdminUser;
import com.nhdinh.nhdinh_profile.modules.AdminUser.AdminUserDAO;


@Service
@Transactional
public class AdminUserService {
    
    private final AdminUserDAO adminUserDAO;
    
    public AdminUserService(AdminUserDAO adminUserDAO) {
        this.adminUserDAO = adminUserDAO;
    }
       public Page<AdminUser> findAllActiveWithPagination(Pageable pageable) {
        return adminUserDAO.findAllActiveWithPagination(pageable);
    }
    
    /**
     * Tìm admin theo phone number
     */
    public Optional<AdminUser> findByPhoneNumber(String phoneNumber) {
        return adminUserDAO.findByPhoneNumber(phoneNumber);
    }
    
    /**
     * Tìm admin theo username
     */
    public Optional<AdminUser> findByUsername(String username) {
        return adminUserDAO.findByUsername(username);
    }
    
    /**
     * Kiểm tra phone number có tồn tại
     */
    public boolean existsByPhoneNumber(String phoneNumber) {
        return adminUserDAO.existsByPhoneNumber(phoneNumber);
    }
    
    /**
     * Kiểm tra username có tồn tại
     */
    public boolean existsByUsername(String username) {
        return adminUserDAO.existsByUsername(username);
    }
    
    /**
     * Tìm admin active theo phone hoặc username
     */
    public Optional<AdminUser> findActiveByPhoneOrUsername(String identifier) {
        return adminUserDAO.findActiveByPhoneOrUsername(identifier);
    }
    
    /**
     * Lưu AdminUser
     */
    public AdminUser save(AdminUser adminUser) {
        return adminUserDAO.save(adminUser);
    }
    
    /**
     * Tìm AdminUser theo ID
     */
    public Optional<AdminUser> findById(UUID userId) {
        return adminUserDAO.findById(userId);
    }
    
    /**
     * Xóa AdminUser theo ID
     */
    public void deleteById(UUID userId) {
        adminUserDAO.deleteById(userId);
    }
}



