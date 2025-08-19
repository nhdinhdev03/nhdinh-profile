package com.nhdinh.profile.service.ProfileInfo;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.ProfileInfo.ProfileInfo;
import com.nhdinh.profile.modules.ProfileInfo.ProfileInfoDAO;
import com.nhdinh.profile.request.ProfileInfo.ProfileInfoCreateRequest;
import com.nhdinh.profile.request.ProfileInfo.ProfileInfoUpdateRequest;

@Service
@Transactional
public class ProfileInfoService {
    
    @Autowired
    private ProfileInfoDAO profileInfoDAO;
    
    /**
     * Lấy tất cả ProfileInfo
     */
    public List<ProfileInfo> getAllProfiles() {
        return profileInfoDAO.findAllOrderByCreatedAtDesc();
    }
    
    /**
     * Lấy ProfileInfo theo ID
     */
    public Optional<ProfileInfo> getProfileById(UUID profileId) {
        return profileInfoDAO.findById(profileId);
    }
    
    /**
     * Lấy ProfileInfo theo FullName
     */
    public Optional<ProfileInfo> getProfileByFullName(String fullName) {
        return profileInfoDAO.findByFullNameIgnoreCase(fullName);
    }
    
    /**
     * Tìm kiếm ProfileInfo theo từ khóa
     */
    public List<ProfileInfo> searchProfiles(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllProfiles();
        }
        return profileInfoDAO.searchByKeyword(keyword.trim());
    }
    
    /**
     * Tạo ProfileInfo mới
     */
    public ProfileInfo createProfile(ProfileInfoCreateRequest request) {
        // Kiểm tra xem FullName đã tồn tại chưa
        if (profileInfoDAO.existsByFullNameIgnoreCase(request.getFullName())) {
            throw new RuntimeException("FullName đã tồn tại: " + request.getFullName());
        }
        
        ProfileInfo profile = request.toEntity();
        profile.setCreatedAt(LocalDateTime.now());
        return profileInfoDAO.save(profile);
    }
    
    /**
     * Cập nhật ProfileInfo
     */
    public ProfileInfo updateProfile(UUID profileId, ProfileInfoUpdateRequest request) {
        Optional<ProfileInfo> existingProfileOpt = profileInfoDAO.findById(profileId);
        
        if (!existingProfileOpt.isPresent()) {
            throw new RuntimeException("Không tìm thấy ProfileInfo với ID: " + profileId);
        }
        
        ProfileInfo existingProfile = existingProfileOpt.get();
        
        // Kiểm tra xem FullName đã tồn tại chưa (trừ record hiện tại)
        if (request.getFullName() != null && 
            profileInfoDAO.existsByFullNameIgnoreCaseAndNotSelf(request.getFullName(), profileId)) {
            throw new RuntimeException("FullName đã tồn tại: " + request.getFullName());
        }
        
        // Cập nhật các field
        if (request.getFullName() != null) {
            existingProfile.setFullName(request.getFullName());
        }
        if (request.getTitle() != null) {
            existingProfile.setTitle(request.getTitle());
        }
        if (request.getBio() != null) {
            existingProfile.setBio(request.getBio());
        }
        if (request.getAvatarUrl() != null) {
            existingProfile.setAvatarUrl(request.getAvatarUrl());
        }
        
        return profileInfoDAO.save(existingProfile);
    }
    
    /**
     * Xóa ProfileInfo
     */
    public void deleteProfile(UUID profileId) {
        if (!profileInfoDAO.existsById(profileId)) {
            throw new RuntimeException("Không tìm thấy ProfileInfo với ID: " + profileId);
        }
        profileInfoDAO.deleteById(profileId);
    }
    
    /**
     * Kiểm tra FullName đã tồn tại chưa
     */
    public boolean isFullNameExists(String fullName) {
        return profileInfoDAO.existsByFullNameIgnoreCase(fullName);
    }
    
    /**
     * Đếm tổng số ProfileInfo
     */
    public long getTotalProfileCount() {
        return profileInfoDAO.countAllProfiles();
    }
}
