package com.nhdinh.nhdinh_profile.services;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.ProfileInfo.ProfileInfo;
import com.nhdinh.nhdinh_profile.modules.ProfileInfo.ProfileInfoDAO;

@Service
@Transactional
public class ProfileInfoService {
    
    private final ProfileInfoDAO profileInfoDAO;
    
    public ProfileInfoService(ProfileInfoDAO profileInfoDAO) {
        this.profileInfoDAO = profileInfoDAO;
    }
    
    /**
     * Find the active profile (assuming only one profile exists)
     */
    public Optional<ProfileInfo> findActiveProfile() {
        return profileInfoDAO.findActiveProfile();
    }

    /**
     * Check if any profile exists
     */
    public boolean existsAnyProfile() {
        return profileInfoDAO.existsAnyProfile();
    }

    /**
     * Find profile with translations
     */
    public Optional<ProfileInfo> findByIdWithTranslations(UUID profileId) {
        return profileInfoDAO.findByIdWithTranslations(profileId);
    }

    /**
     * Find active profile with all related data
     */
    public Optional<ProfileInfo> getActiveProfileWithAllData() {
        return profileInfoDAO.findActiveProfile();
    }
    
    /**
     * Lưu ProfileInfo
     */
    public ProfileInfo save(ProfileInfo profileInfo) {
        return profileInfoDAO.save(profileInfo);
    }
    
    /**
     * Tìm ProfileInfo theo ID
     */
    public Optional<ProfileInfo> findById(UUID id) {
        return profileInfoDAO.findById(id);
    }
    
    /**
     * Xóa ProfileInfo theo ID
     */
    public void deleteById(UUID id) {
        profileInfoDAO.deleteById(id);
    }
    
  
    /**
     * Lấy tất cả ProfileInfo với phân trang
     */
    public Page<ProfileInfo> findAllWithPagination(Pageable pageable) {
        return profileInfoDAO.findAllWithPagination(pageable);
    }
}



