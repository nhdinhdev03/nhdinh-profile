package com.nhdinh.profile.service.Project;

import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.Project.Project;
import com.nhdinh.profile.modules.Project.ProjectDAO;
import com.nhdinh.profile.modules.ProjectCategory.ProjectCategory;
import com.nhdinh.profile.modules.ProjectCategory.ProjectCategoryDAO;
import com.nhdinh.profile.modules.ProjectTag.ProjectTag;
import com.nhdinh.profile.modules.ProjectTag.ProjectTagService;
import com.nhdinh.profile.request.Project.ProjectCreateRequest;
import com.nhdinh.profile.request.Project.ProjectUpdateRequest;

@Service
@Transactional
public class ProjectService {
    
    @Autowired
    private ProjectDAO projectDAO;
    
    @Autowired
    private ProjectCategoryDAO projectCategoryDAO;
    
    @Autowired
    private ProjectTagService projectTagService;
    
    /**
     * Lấy tất cả Project
     */
    public List<Project> getAllProjects() {
        return projectDAO.findAllOrderByCreatedAtDesc();
    }
    
    /**
     * Lấy Project theo ID
     */
    public Optional<Project> getProjectById(UUID projectId) {
        return projectDAO.findById(projectId);
    }
    
    /**
     * Lấy Project theo CategoryId
     */
    public List<Project> getProjectsByCategoryId(UUID categoryId) {
        return projectDAO.findByCategoryId(categoryId);
    }
    
    /**
     * Tìm kiếm Project theo từ khóa
     */
    public List<Project> searchProjects(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllProjects();
        }
        return projectDAO.findByTitleOrDescriptionContainingIgnoreCase(keyword.trim());
    }
    
    /**
     * Tạo Project mới
     */
    public Project createProject(ProjectCreateRequest request) {
        // Kiểm tra xem title đã tồn tại chưa
        if (projectDAO.existsByTitleIgnoreCase(request.getTitle())) {
            throw new RuntimeException("Title đã tồn tại: " + request.getTitle());
        }
        
        // Kiểm tra xem CategoryId có tồn tại không
        ProjectCategory category = projectCategoryDAO.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectCategory với ID: " + request.getCategoryId()));
        
        Project project = new Project();
        project.setTitle(request.getTitle());
        project.setDescription(request.getDescription());
        project.setImageUrl(request.getImageUrl());
        project.setDemoUrl(request.getDemoUrl());
        project.setSourceUrl(request.getSourceUrl());
        project.setCategory(category);
        
        // Xử lý tags
        if (request.getTagNames() != null && !request.getTagNames().isEmpty()) {
            List<ProjectTag> tags = projectTagService.findOrCreateTags(request.getTagNames());
            project.setTags(new HashSet<>(tags));
        }
        
        return projectDAO.save(project);
    }
    
    /**
     * Cập nhật Project
     */
    public Project updateProject(UUID projectId, ProjectUpdateRequest request) {
        Project existingProject = projectDAO.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Project với ID: " + projectId));
        
        // Kiểm tra xem title đã tồn tại chưa (trừ record hiện tại)
        if (projectDAO.existsByTitleIgnoreCaseAndNotSelf(request.getTitle(), projectId)) {
            throw new RuntimeException("Title đã tồn tại: " + request.getTitle());
        }
        
        // Kiểm tra xem CategoryId có tồn tại không
        ProjectCategory category = projectCategoryDAO.findById(request.getCategoryId())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectCategory với ID: " + request.getCategoryId()));
        
        existingProject.setTitle(request.getTitle());
        existingProject.setDescription(request.getDescription());
        existingProject.setImageUrl(request.getImageUrl());
        existingProject.setDemoUrl(request.getDemoUrl());
        existingProject.setSourceUrl(request.getSourceUrl());
        existingProject.setCategory(category);
        
        // Xử lý tags
        if (request.getTagNames() != null) {
            if (request.getTagNames().isEmpty()) {
                existingProject.getTags().clear();
            } else {
                List<ProjectTag> tags = projectTagService.findOrCreateTags(request.getTagNames());
                existingProject.setTags(new HashSet<>(tags));
            }
        }
        
        return projectDAO.save(existingProject);
    }
    
    /**
     * Xóa Project
     */
    public void deleteProject(UUID projectId) {
        Project project = projectDAO.findById(projectId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Project với ID: " + projectId));
        
        projectDAO.delete(project);
    }
    
    /**
     * Kiểm tra xem Project có tồn tại không
     */
    public boolean existsById(UUID projectId) {
        return projectDAO.existsById(projectId);
    }
    
    /**
     * Đếm số Project theo CategoryId
     */
    public long countProjectsByCategory(UUID categoryId) {
        return projectDAO.countByCategoryId(categoryId);
    }
    
    /**
     * Lấy Projects theo TagId
     */
    public List<Project> getProjectsByTagId(UUID tagId) {
        return projectDAO.findByTagId(tagId);
    }
    
    /**
     * Lấy Projects theo tên tag
     */
    public List<Project> getProjectsByTagName(String tagName) {
        return projectDAO.findByTagName(tagName);
    }
    
    /**
     * Lấy Projects có chứa bất kỳ tag nào trong danh sách
     */
    public List<Project> getProjectsByAnyTags(List<UUID> tagIds) {
        return projectDAO.findByTagIds(tagIds);
    }
    
    /**
     * Lấy Projects có chứa tất cả tags trong danh sách
     */
    public List<Project> getProjectsByAllTags(List<UUID> tagIds) {
        return projectDAO.findByAllTagIds(tagIds, tagIds.size());
    }
}
