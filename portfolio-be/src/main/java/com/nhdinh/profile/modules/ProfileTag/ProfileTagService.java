package com.nhdinh.profile.modules.ProfileTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ProfileTagService {
    
    @Autowired
    private ProfileTagDAO profileTagDAO;
    
    /**
     * Lấy tất cả ProfileTag của một Profile
     */
    public List<ProfileTag> getTagsByProfileId(UUID profileId) {
        return profileTagDAO.findByProfileIdOrderBySortOrder(profileId);
    }
    
    /**
     * Lấy ProfileTag theo ID
     */
    public Optional<ProfileTag> getTagById(UUID tagId) {
        return profileTagDAO.findById(tagId);
    }
    
    /**
     * Tìm kiếm ProfileTag theo từ khóa
     */
    public List<ProfileTag> searchTags(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return profileTagDAO.findAll();
        }
        return profileTagDAO.searchByLabelKeyword(keyword.trim());
    }
    
    /**
     * Tạo ProfileTag mới
     */
    public ProfileTag createTag(ProfileTagCreateRequest request) {
        // Kiểm tra xem Label đã tồn tại trong Profile chưa
        if (profileTagDAO.existsByProfileIdAndLabelIgnoreCase(request.getProfileId(), request.getLabel())) {
            throw new RuntimeException("Label đã tồn tại trong Profile: " + request.getLabel());
        }
        
        ProfileTag tag = request.toEntity();
        
        // Nếu sortOrder không được set, lấy sortOrder cao nhất + 1
        if (tag.getSortOrder() <= 0) {
            int maxSortOrder = profileTagDAO.getMaxSortOrderByProfileId(request.getProfileId());
            tag.setSortOrder(maxSortOrder + 1);
        }
        
        return profileTagDAO.save(tag);
    }
    
    /**
     * Cập nhật ProfileTag
     */
    public ProfileTag updateTag(UUID tagId, ProfileTagUpdateRequest request) {
        Optional<ProfileTag> existingTagOpt = profileTagDAO.findById(tagId);
        
        if (!existingTagOpt.isPresent()) {
            throw new RuntimeException("Không tìm thấy ProfileTag với ID: " + tagId);
        }
        
        ProfileTag existingTag = existingTagOpt.get();
        
        // Kiểm tra xem Label đã tồn tại trong Profile chưa (trừ record hiện tại)
        if (request.getLabel() != null && 
            profileTagDAO.existsByProfileIdAndLabelIgnoreCaseAndNotSelf(
                existingTag.getProfileId(), request.getLabel(), tagId)) {
            throw new RuntimeException("Label đã tồn tại trong Profile: " + request.getLabel());
        }
        
        // Cập nhật các field
        if (request.getLabel() != null) {
            existingTag.setLabel(request.getLabel());
        }
        if (request.getSortOrder() != null) {
            existingTag.setSortOrder(request.getSortOrder());
        }
        
        return profileTagDAO.save(existingTag);
    }
    
    /**
     * Xóa ProfileTag
     */
    public void deleteTag(UUID tagId) {
        if (!profileTagDAO.existsById(tagId)) {
            throw new RuntimeException("Không tìm thấy ProfileTag với ID: " + tagId);
        }
        profileTagDAO.deleteById(tagId);
    }
    
    /**
     * Xóa tất cả ProfileTag của một Profile
     */
    public void deleteAllTagsByProfileId(UUID profileId) {
        profileTagDAO.deleteByProfileId(profileId);
    }
    
    /**
     * Đếm số lượng Tag của một Profile
     */
    public long getTagCountByProfileId(UUID profileId) {
        return profileTagDAO.countByProfileId(profileId);
    }
    
    /**
     * Lấy những Tag phổ biến nhất
     */
    public List<Object[]> getMostUsedTags() {
        return profileTagDAO.findMostUsedTags();
    }
}
