package com.nhdinh.nhdinh_profile.modules.ProfileInfo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.ProfileInfoRepository;

@Service
@Transactional
public class ProfileInfoService {
    
    private final ProfileInfoRepository profileInfoRepository;
    
    public ProfileInfoService(ProfileInfoRepository profileInfoRepository) {
        this.profileInfoRepository = profileInfoRepository;
    }
    
    /**
     * Find the active profile (assuming only one profile exists)
     */
    public Optional<ProfileInfo> findActiveProfile() {
        return profileInfoRepository.findActiveProfile();
    }

    /**
     * Check if any profile exists
     */
    public boolean existsAnyProfile() {
        return profileInfoRepository.existsAnyProfile();
    }

    /**
     * Find profile with translations
     */
    public Optional<ProfileInfo> findByIdWithTranslations(UUID profileId) {
        return profileInfoRepository.findByIdWithTranslations(profileId);
    }

    /**
     * Find active profile with all related data
     */
    public Optional<ProfileInfo> findActiveProfileWithAllData() {
        return profileInfoRepository.findActiveProfileWithAllData();
    }
    
    /**
     * Lưu ProfileInfo
     */
    public ProfileInfo save(ProfileInfo profileInfo) {
        return profileInfoRepository.save(profileInfo);
    }
    
    /**
     * Tìm ProfileInfo theo ID
     */
    public Optional<ProfileInfo> findById(UUID profileId) {
        return profileInfoRepository.findById(profileId);
    }
    
    /**
     * Xóa ProfileInfo theo ID
     */
    public void deleteById(UUID profileId) {
        profileInfoRepository.deleteById(profileId);
    }
}