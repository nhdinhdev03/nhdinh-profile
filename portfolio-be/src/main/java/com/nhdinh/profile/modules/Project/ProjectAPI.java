package com.nhdinh.profile.modules.Project;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.profile.request.Project.ProjectCreateRequest;
import com.nhdinh.profile.request.Project.ProjectUpdateRequest;
import com.nhdinh.profile.response.Project.ProjectResponse;
import com.nhdinh.profile.service.Project.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/projects")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectAPI {
    
    @Autowired
    private ProjectService projectService;
    
    /**
     * Lấy tất cả Projects
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProjectResponse>> getAllProjects() {
        try {
            List<Project> projects = projectService.getAllProjects();
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Project theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectResponse> getProjectById(@PathVariable UUID id) {
        try {
            Optional<Project> project = projectService.getProjectById(id);
            
            if (project.isPresent()) {
                ProjectResponse response = ProjectResponse.fromEntity(project.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Projects theo CategoryId
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByCategory(@PathVariable UUID categoryId) {
        try {
            List<Project> projects = projectService.getProjectsByCategoryId(categoryId);
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm Projects
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProjectResponse>> searchProjects(@RequestParam String keyword) {
        try {
            List<Project> projects = projectService.searchProjects(keyword);
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo Project mới
     */
    @PostMapping("/create")
    public ResponseEntity<?> createProject(@Valid @RequestBody ProjectCreateRequest request) {
        try {
            Project project = projectService.createProject(request);
            ProjectResponse response = ProjectResponse.fromEntity(project);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi tạo project");
        }
    }
    
    /**
     * Cập nhật Project
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateProject(@PathVariable UUID id, @Valid @RequestBody ProjectUpdateRequest request) {
        try {
            Project project = projectService.updateProject(id, request);
            ProjectResponse response = ProjectResponse.fromEntity(project);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật project");
        }
    }
    
    /**
     * Xóa Project
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProject(@PathVariable UUID id) {
        try {
            if (!projectService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            
            projectService.deleteProject(id);
            return ResponseEntity.ok().body("Xóa project thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa project");
        }
    }
    
    /**
     * Đếm số Projects theo CategoryId
     */
    @GetMapping("/category/{categoryId}/count")
    public ResponseEntity<Long> countProjectsByCategory(@PathVariable UUID categoryId) {
        try {
            long count = projectService.countProjectsByCategory(categoryId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Projects theo TagId
     */
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByTag(@PathVariable UUID tagId) {
        try {
            List<Project> projects = projectService.getProjectsByTagId(tagId);
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Projects theo tên tag
     */
    @GetMapping("/tag/name/{tagName}")
    public ResponseEntity<List<ProjectResponse>> getProjectsByTagName(@PathVariable String tagName) {
        try {
            List<Project> projects = projectService.getProjectsByTagName(tagName);
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // ================== USER ENDPOINTS ==================
    
    /**
     * Lấy Projects công khai cho user (published và public)
     */
    @GetMapping("/public")
    public ResponseEntity<List<ProjectResponse>> getPublicProjects() {
        try {
            List<Project> projects = projectService.getPublicProjects();
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Featured Projects cho user
     */
    @GetMapping("/featured")
    public ResponseEntity<List<ProjectResponse>> getFeaturedProjects() {
        try {
            List<Project> projects = projectService.getFeaturedProjects();
            List<ProjectResponse> responses = projects.stream()
                    .map(ProjectResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tăng view count cho project
     */
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementViewCount(@PathVariable UUID id) {
        try {
            projectService.incrementViewCount(id);
            return ResponseEntity.ok().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
