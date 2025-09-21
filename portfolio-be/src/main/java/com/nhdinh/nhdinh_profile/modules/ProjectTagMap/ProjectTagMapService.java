package com.nhdinh.nhdinh_profile.modules.ProjectTagMap;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.ProjectTagMapRepository;

@Service
@Transactional
public class ProjectTagMapService {
    
    private final ProjectTagMapRepository projectTagMapRepository;
    
    public ProjectTagMapService(ProjectTagMapRepository projectTagMapRepository) {
        this.projectTagMapRepository = projectTagMapRepository;
    }
    
    /**
     * Lấy tất cả tag maps của một project
     */
    public List<ProjectTagMap> findByProjectId(UUID projectId) {
        return projectTagMapRepository.findByProjectId(projectId);
    }
    
    /**
     * Lấy tất cả tag maps của một tag
     */
    public List<ProjectTagMap> findByTagId(UUID tagId) {
        return projectTagMapRepository.findByTagId(tagId);
    }
    
    /**
     * Kiểm tra mapping có tồn tại
     */
    public boolean existsByProjectIdAndTagId(UUID projectId, UUID tagId) {
        return projectTagMapRepository.existsByProjectIdAndTagId(projectId, tagId);
    }
    
    /**
     * Lấy max sort order của project
     */
    public Integer findMaxSortOrderByProjectId(UUID projectId) {
        return projectTagMapRepository.findMaxSortOrderByProjectId(projectId);
    }
    
    /**
     * Xóa tất cả mappings của một project
     */
    public void deleteByProjectId(UUID projectId) {
        projectTagMapRepository.deleteByProjectId(projectId);
    }
    
    /**
     * Xóa tất cả mappings của một tag
     */
    public void deleteByTagId(UUID tagId) {
        projectTagMapRepository.deleteByTagId(tagId);
    }
    
    /**
     * Đếm số mappings của tag
     */
    public Long countByTagId(UUID tagId) {
        return projectTagMapRepository.countByTagId(tagId);
    }
    
    /**
     * Lưu ProjectTagMap
     */
    public ProjectTagMap save(ProjectTagMap projectTagMap) {
        return projectTagMapRepository.save(projectTagMap);
    }
    
    /**
     * Tìm ProjectTagMap theo ID
     */
    public List<ProjectTagMap> findAll() {
        return projectTagMapRepository.findAll();
    }
    
    /**
     * Xóa ProjectTagMap
     */
    public void delete(ProjectTagMap projectTagMap) {
        projectTagMapRepository.delete(projectTagMap);
    }
}