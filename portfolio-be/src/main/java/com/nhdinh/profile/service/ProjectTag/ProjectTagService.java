package com.nhdinh.profile.service.ProjectTag;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.ProjectTag.ProjectTag;
import com.nhdinh.profile.modules.ProjectTag.ProjectTagDAO;
import com.nhdinh.profile.request.ProjectTag.ProjectTagCreateRequest;
import com.nhdinh.profile.request.ProjectTag.ProjectTagUpdateRequest;

@Service
@Transactional
public class ProjectTagService {
    
    @Autowired
    private ProjectTagDAO projectTagDAO;
    
    /**
     * Lấy tất cả ProjectTag
     */
    public List<ProjectTag> getAllTags() {
        return projectTagDAO.findAllOrderByName();
    }
    
    /**
     * Lấy ProjectTag theo ID
     */
    public Optional<ProjectTag> getTagById(UUID tagId) {
        return projectTagDAO.findById(tagId);
    }
    
    /**
     * Lấy ProjectTag theo tên
     */
    public Optional<ProjectTag> getTagByName(String name) {
        return projectTagDAO.findByNameIgnoreCase(name);
    }
    
    /**
     * Tìm kiếm ProjectTag theo từ khóa
     */
    public List<ProjectTag> searchTags(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllTags();
        }
        return projectTagDAO.findByNameContainingIgnoreCase(keyword.trim());
    }
    
    /**
     * Lấy tags phổ biến nhất
     */
    public List<ProjectTag> getMostUsedTags() {
        return projectTagDAO.findMostUsedTags();
    }
    
    /**
     * Tạo ProjectTag mới
     */
    public ProjectTag createTag(ProjectTagCreateRequest request) {
        // Kiểm tra xem tên đã tồn tại chưa
        if (projectTagDAO.existsByNameIgnoreCase(request.getName())) {
            throw new RuntimeException("Tag name đã tồn tại: " + request.getName());
        }
        
        ProjectTag tag = new ProjectTag();
        tag.setName(request.getName().trim());
        
        return projectTagDAO.save(tag);
    }
    
    /**
     * Cập nhật ProjectTag
     */
    public ProjectTag updateTag(UUID tagId, ProjectTagUpdateRequest request) {
        ProjectTag existingTag = projectTagDAO.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectTag với ID: " + tagId));
        
        // Kiểm tra xem tên đã tồn tại chưa (trừ record hiện tại)
        if (projectTagDAO.existsByNameIgnoreCaseAndNotSelf(request.getName(), tagId)) {
            throw new RuntimeException("Tag name đã tồn tại: " + request.getName());
        }
        
        existingTag.setName(request.getName().trim());
        
        return projectTagDAO.save(existingTag);
    }
    
    /**
     * Xóa ProjectTag
     */
    public void deleteTag(UUID tagId) {
        ProjectTag tag = projectTagDAO.findById(tagId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectTag với ID: " + tagId));
        
        // Note: Cần kiểm tra xem tag có đang được sử dụng trong project nào không
        // Có thể thêm validation ở đây nếu cần
        
        projectTagDAO.delete(tag);
    }
    
    /**
     * Kiểm tra xem ProjectTag có tồn tại không
     */
    public boolean existsById(UUID tagId) {
        return projectTagDAO.existsById(tagId);
    }
    
    /**
     * Tìm hoặc tạo tags theo danh sách tên
     */
    public List<ProjectTag> findOrCreateTags(List<String> tagNames) {
        List<ProjectTag> existingTags = projectTagDAO.findByNameIn(tagNames);
        
        // Tìm những tag chưa tồn tại
        List<String> existingTagNames = existingTags.stream()
                .map(ProjectTag::getName)
                .toList();
        
        List<String> newTagNames = tagNames.stream()
                .filter(name -> !existingTagNames.contains(name))
                .toList();
        
        // Tạo những tag mới
        for (String tagName : newTagNames) {
            ProjectTag newTag = new ProjectTag();
            newTag.setName(tagName.trim());
            projectTagDAO.save(newTag);
            existingTags.add(newTag);
        }
        
        return existingTags;
    }
}
