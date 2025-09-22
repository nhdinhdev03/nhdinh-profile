package com.nhdinh.nhdinh_profile.modules.Project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.nhdinh.nhdinh_profile.constants.ApiConstants;
import com.nhdinh.nhdinh_profile.services.ProjectService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(ApiConstants.PROJECTS)
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectAPI {

    private final ProjectService projectService;

    public ProjectAPI(ProjectService projectService) {
        this.projectService = projectService;
    }

    /**
     * Lấy tất cả projects active
     */
    @GetMapping
    public ResponseEntity<List<Project>> getAllActiveProjects() {
        try {
            List<Project> projects = projectService.findAllActive();
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy project theo ID với translations và tags
     */
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        try {
            Optional<Project> project = projectService.findByIdWithTranslationsAndTags(id);
            return project.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy featured projects
     */
    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        try {
            List<Project> projects = projectService.findFeaturedProjects();
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy public projects
     */
    @GetMapping("/public")
    public ResponseEntity<List<Project>> getPublicProjects() {
        try {
            List<Project> projects = projectService.findPublicProjects();
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy published projects với pagination
     */
    @GetMapping("/published")
    public ResponseEntity<Page<Project>> getPublishedProjects(Pageable pageable) {
        try {
            Page<Project> projects = projectService.findPublishedProjects(pageable);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy projects theo status
     */
    @GetMapping("/status/{status}")
    public ResponseEntity<List<Project>> getProjectsByStatus(@PathVariable String status) {
        try {
            List<Project> projects = projectService.findByStatus(status);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy projects theo category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Project>> getProjectsByCategory(@PathVariable UUID categoryId) {
        try {
            List<Project> projects = projectService.findByCategoryId(categoryId);
            return ResponseEntity.ok(projects);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo project mới
     */
    @PostMapping
    public ResponseEntity<Project> createProject(@Valid @RequestBody Project project) {
        try {
            Project createdProject = projectService.save(project);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật project
     */
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable UUID id, 
                                                 @Valid @RequestBody Project project) {
        try {
            Optional<Project> existingProject = projectService.findById(id);
            if (existingProject.isPresent()) {
                project.setProjectId(id);
                Project updatedProject = projectService.save(project);
                return ResponseEntity.ok(updatedProject);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Soft delete project
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        try {
            Optional<Project> existingProject = projectService.findById(id);
            if (existingProject.isPresent()) {
                projectService.softDeleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Increment view count
     */
    @PostMapping("/{id}/view")
    public ResponseEntity<Void> incrementViewCount(@PathVariable UUID id) {
        try {
            Optional<Project> existingProject = projectService.findById(id);
            if (existingProject.isPresent()) {
                projectService.incrementViewCount(id);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Publish project
     */
    @PostMapping("/{id}/publish")
    public ResponseEntity<Void> publishProject(@PathVariable UUID id, 
                                              @RequestParam(required = false) LocalDateTime publishedAt) {
        try {
            Optional<Project> existingProject = projectService.findById(id);
            if (existingProject.isPresent()) {
                LocalDateTime publishTime = publishedAt != null ? publishedAt : LocalDateTime.now();
                projectService.publishProject(id, publishTime);
                return ResponseEntity.ok().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}