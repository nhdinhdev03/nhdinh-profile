package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMap;
import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMapDAO;

@Service
@Transactional
public class ProjectTagMapService {
    
    private final ProjectTagMapDAO projectTagMapDAO;
    
    public ProjectTagMapService(ProjectTagMapDAO projectTagMapDAO) {
        this.projectTagMapDAO = projectTagMapDAO;
    }
    
    /**
     * Lấy tất cả tag maps của một project
     */
    public List<ProjectTagMap> findByProjectId(UUID projectId) {
        return projectTagMapDAO.findByProjectId(projectId);
    }
    
    /**
     * Lấy tất cả tag maps của một tag
     */
    public List<ProjectTagMap> findByTagId(UUID tagId) {
        return projectTagMapDAO.findByTagId(tagId);
    }
    
    /**
     * Kiểm tra mapping có tồn tại
     */
    public boolean existsByProjectIdAndTagId(UUID projectId, UUID tagId) {
        return projectTagMapDAO.existsByProjectIdAndTagId(projectId, tagId);
    }
    
    /**
     * Lấy max sort order của project
     */
    public Integer findMaxSortOrderByProjectId(UUID projectId) {
        return projectTagMapDAO.findMaxSortOrderByProjectId(projectId);
    }
    
    /**
     * Xóa tất cả mappings của một project
     */
    public void deleteByProjectId(UUID projectId) {
        projectTagMapDAO.deleteByProjectId(projectId);
    }
    
    /**
     * Xóa tất cả mappings của một tag
     */
    public void deleteByTagId(UUID tagId) {
        projectTagMapDAO.deleteByTagId(tagId);
    }
    
    /**
     * Đếm số mappings của tag
     */
    public Long countByTagId(UUID tagId) {
        return projectTagMapDAO.countByTagId(tagId);
    }
    
    /**
     * Lưu ProjectTagMap
     */
    public ProjectTagMap save(ProjectTagMap projectTagMap) {
        return projectTagMapDAO.save(projectTagMap);
    }
    
    /**
     * Tìm ProjectTagMap theo ID
     */
    public List<ProjectTagMap> findAll() {
        return projectTagMapDAO.findAll();
    }
    
    /**
     * Xóa ProjectTagMap
     */
    public void delete(ProjectTagMap projectTagMap) {
        projectTagMapDAO.delete(projectTagMap);
    }
}



