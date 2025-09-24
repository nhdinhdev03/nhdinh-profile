package com.nhdinh.nhdinh_profile.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Project.Project;
import com.nhdinh.nhdinh_profile.modules.Project.ProjectDAO;

@Service
@Transactional
public class ProjectService {
    
    private final ProjectDAO projectDAO;
    
    public ProjectService(ProjectDAO projectDAO) {
        this.projectDAO = projectDAO;
    }
    
    /**
     * Lấy tất cả projects active
     */
    public List<Project> findAllActive() {
        return projectDAO.findAllActive();
    }
    
    /**
     * Lấy tất cả projects active với phân trang
     */
    public Page<Project> findAllActiveWithPagination(Pageable pageable) {
        return projectDAO.findAllActiveWithPagination(pageable);
    }
    
    /**
     * Lấy projects theo status
     */
    public List<Project> findByStatus(String status) {
        return projectDAO.findByStatus(status);
    }
    
 
    
    /**
     * Lấy projects theo category
     */
    public List<Project> findByCategoryId(UUID categoryId) {
        return projectDAO.findByCategoryId(categoryId);
    }
    
    /**
     * Lấy project với translations và tags
     */
    public Optional<Project> findByIdWithTranslationsAndTags(UUID projectId) {
        return projectDAO.findByIdWithTranslationsAndTags(projectId);
    }
    
    /**
     * Lấy projects published
     */
    public Page<Project> findPublishedProjects(Pageable pageable) {
        return projectDAO.findPublishedProjects(pageable);
    }
    
    /**
     * Soft delete project
     */
    public void softDeleteById(UUID projectId) {
        projectDAO.softDeleteById(projectId);
    }
    
    /**
     * Update view count
     */
    public void incrementViewCount(UUID projectId) {
        projectDAO.incrementViewCount(projectId);
    }
    
    /**
     * Update published status
     */
    public void publishProject(UUID projectId, LocalDateTime publishedAt) {
        projectDAO.publishProject(projectId, publishedAt);
    }
    
    /**
     * Lưu Project
     */
    public Project save(Project project) {
        return projectDAO.save(project);
    }
    
    /**
     * Tìm Project theo ID
     */
    public Optional<Project> findById(UUID projectId) {
        return projectDAO.findById(projectId);
    }
    
    /**
     * Xóa Project theo ID
     */
    public void deleteById(UUID projectId) {
        projectDAO.deleteById(projectId);
    }
    
    /**
     * Lấy tất cả Projects
     */
    public List<Project> findAll() {
        return projectDAO.findAll();
    }
}



