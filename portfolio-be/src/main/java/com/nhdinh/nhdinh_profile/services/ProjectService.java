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
import com.nhdinh.nhdinh_profile.repositories.ProjectRepository;

@Service
@Transactional
public class ProjectService {
    
    private final ProjectRepository projectRepository;
    
    public ProjectService(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }
    
    /**
     * Lấy tất cả projects active
     */
    public List<Project> findAllActive() {
        return projectRepository.findAllActive();
    }
    
    /**
     * Lấy projects theo status
     */
    public List<Project> findByStatus(String status) {
        return projectRepository.findByStatus(status);
    }
    
    /**
     * Lấy featured projects
     */
    public List<Project> findFeaturedProjects() {
        return projectRepository.findFeaturedProjects();
    }
    
    /**
     * Lấy public projects
     */
    public List<Project> findPublicProjects() {
        return projectRepository.findPublicProjects();
    }
    
    /**
     * Lấy projects theo category
     */
    public List<Project> findByCategoryId(UUID categoryId) {
        return projectRepository.findByCategoryId(categoryId);
    }
    
    /**
     * Lấy project với translations và tags
     */
    public Optional<Project> findByIdWithTranslationsAndTags(UUID projectId) {
        return projectRepository.findByIdWithTranslationsAndTags(projectId);
    }
    
    /**
     * Lấy projects published
     */
    public Page<Project> findPublishedProjects(Pageable pageable) {
        return projectRepository.findPublishedProjects(pageable);
    }
    
    /**
     * Soft delete project
     */
    public void softDeleteById(UUID projectId) {
        projectRepository.softDeleteById(projectId);
    }
    
    /**
     * Update view count
     */
    public void incrementViewCount(UUID projectId) {
        projectRepository.incrementViewCount(projectId);
    }
    
    /**
     * Update published status
     */
    public void publishProject(UUID projectId, LocalDateTime publishedAt) {
        projectRepository.publishProject(projectId, publishedAt);
    }
    
    /**
     * Lưu Project
     */
    public Project save(Project project) {
        return projectRepository.save(project);
    }
    
    /**
     * Tìm Project theo ID
     */
    public Optional<Project> findById(UUID projectId) {
        return projectRepository.findById(projectId);
    }
    
    /**
     * Xóa Project theo ID
     */
    public void deleteById(UUID projectId) {
        projectRepository.deleteById(projectId);
    }
    
    /**
     * Lấy tất cả Projects
     */
    public List<Project> findAll() {
        return projectRepository.findAll();
    }
}