package com.nhdinh.profile.service.ProjectTagMap;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.Project.Project;
import com.nhdinh.profile.modules.Project.ProjectDAO;
import com.nhdinh.profile.modules.ProjectTag.ProjectTag;
import com.nhdinh.profile.modules.ProjectTag.ProjectTagDAO;
import com.nhdinh.profile.modules.ProjectTagMap.ProjectTagMap;
import com.nhdinh.profile.modules.ProjectTagMap.ProjectTagMapDAO;
import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapBatchRequest;
import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapCreateRequest;
import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapUpdateRequest;

@Service
@Transactional
public class ProjectTagMapService {
    
    @Autowired
    private ProjectTagMapDAO projectTagMapDAO;
    
    @Autowired
    private ProjectDAO projectDAO;
    
    @Autowired
    private ProjectTagDAO projectTagDAO;
    
    /**
     * Lấy tất cả mappings của một project (theo thứ tự sort)
     */
    public List<ProjectTagMap> getProjectTagsByProjectId(UUID projectId) {
        return projectTagMapDAO.findByProjectIdOrderBySortOrder(projectId);
    }
    
    /**
     * Lấy tất cả mappings của một tag
     */
    public List<ProjectTagMap> getProjectsByTagId(UUID tagId) {
        return projectTagMapDAO.findByTagId(tagId);
    }
    
    /**
     * Lấy mapping cụ thể
     */
    public Optional<ProjectTagMap> getProjectTagMap(UUID projectId, UUID tagId) {
        return projectTagMapDAO.findByProjectIdAndTagId(projectId, tagId);
    }
    
    /**
     * Tạo mapping mới
     */
    public ProjectTagMap createProjectTagMap(ProjectTagMapCreateRequest request) {
        // Kiểm tra project tồn tại
        Project project = projectDAO.findById(request.getProjectId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Project với ID: " + request.getProjectId()));
        
        // Kiểm tra tag tồn tại
        ProjectTag tag = projectTagDAO.findById(request.getTagId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectTag với ID: " + request.getTagId()));
        
        // Kiểm tra mapping đã tồn tại chưa
        if (projectTagMapDAO.existsByProjectIdAndTagId(request.getProjectId(), request.getTagId())) {
            throw new RuntimeException("Mapping đã tồn tại giữa Project và Tag này");
        }
        
        // Nếu không có sortOrder, tự động gán
        Integer sortOrder = request.getSortOrder();
        if (sortOrder == null) {
            Integer maxSortOrder = projectTagMapDAO.getMaxSortOrderByProjectId(request.getProjectId());
            sortOrder = maxSortOrder + 1;
        }
        
        ProjectTagMap mapping = new ProjectTagMap(
                request.getProjectId(),
                request.getTagId(),
                sortOrder
        );
        
        return projectTagMapDAO.save(mapping);
    }
    
    /**
     * Cập nhật sortOrder của mapping
     */
    public ProjectTagMap updateProjectTagMap(UUID projectId, UUID tagId, ProjectTagMapUpdateRequest request) {
        ProjectTagMap existingMapping = projectTagMapDAO.findByProjectIdAndTagId(projectId, tagId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy mapping giữa Project và Tag"));
        
        if (request.getSortOrder() != null) {
            projectTagMapDAO.updateSortOrder(projectId, tagId, request.getSortOrder());
            existingMapping.setSortOrder(request.getSortOrder());
        }
        
        return existingMapping;
    }
    
    /**
     * Xóa mapping
     */
    public void deleteProjectTagMap(UUID projectId, UUID tagId) {
        if (!projectTagMapDAO.existsByProjectIdAndTagId(projectId, tagId)) {
            throw new RuntimeException("Không tìm thấy mapping giữa Project và Tag");
        }
        
        projectTagMapDAO.deleteByProjectIdAndTagId(projectId, tagId);
    }
    
    /**
     * Xóa tất cả mappings của một project
     */
    public void deleteAllProjectTagMaps(UUID projectId) {
        projectTagMapDAO.deleteByProjectId(projectId);
    }
    
    /**
     * Xóa tất cả mappings của một tag
     */
    public void deleteAllTagMappings(UUID tagId) {
        projectTagMapDAO.deleteByTagId(tagId);
    }
    
    /**
     * Cập nhật batch mappings cho một project
     */
    public List<ProjectTagMap> updateProjectTagMappings(ProjectTagMapBatchRequest request) {
        UUID projectId = request.getProjectId();
        
        // Kiểm tra project tồn tại
        Project project = projectDAO.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Project với ID: " + projectId));
        
        // Xóa tất cả mappings hiện tại
        projectTagMapDAO.deleteByProjectId(projectId);
        
        // Tạo mappings mới
        List<ProjectTagMap> newMappings = new java.util.ArrayList<>();
        
        for (ProjectTagMapBatchRequest.TagMapping tagMapping : request.getTagMappings()) {
            // Kiểm tra tag tồn tại
            ProjectTag tag = projectTagDAO.findById(tagMapping.getTagId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectTag với ID: " + tagMapping.getTagId()));
            
            ProjectTagMap mapping = new ProjectTagMap(
                    projectId,
                    tagMapping.getTagId(),
                    tagMapping.getSortOrder() != null ? tagMapping.getSortOrder() : 1
            );
            
            newMappings.add(projectTagMapDAO.save(mapping));
        }
        
        return newMappings;
    }
    
    /**
     * Đếm số tag của một project
     */
    public long countTagsByProjectId(UUID projectId) {
        return projectTagMapDAO.countByProjectId(projectId);
    }
    
    /**
     * Đếm số project sử dụng một tag
     */
    public long countProjectsByTagId(UUID tagId) {
        return projectTagMapDAO.countByTagId(tagId);
    }
    
    /**
     * Kiểm tra mapping tồn tại
     */
    public boolean existsMapping(UUID projectId, UUID tagId) {
        return projectTagMapDAO.existsByProjectIdAndTagId(projectId, tagId);
    }
    
    /**
     * Lấy thống kê tags phổ biến nhất
     */
    public List<Object[]> getMostUsedTagsStatistics() {
        return projectTagMapDAO.findMostUsedTags();
    }
}
