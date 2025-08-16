package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.Project;
import com.nhdinh.profile.model.ProjectCategory;
import com.nhdinh.profile.repository.ProjectRepository;
import com.nhdinh.profile.repository.ProjectCategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/projects")
@RequiredArgsConstructor
public class ProjectController {
    
    private final ProjectRepository projectRepository;
    private final ProjectCategoryRepository projectCategoryRepository;
    
    @GetMapping
    public ResponseEntity<Page<Project>> getAllProjects(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<Project> projectPage = projectRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(projectPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<Project>> getAllProjectsSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<Project> projectPage = projectRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(projectPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Project> getProjectById(@PathVariable UUID id) {
        Optional<Project> project = projectRepository.findByIdActive(id);
        return project.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<Project> getProjectBySlug(@PathVariable String slug) {
        Optional<Project> project = projectRepository.findBySlug(slug);
        return project.map(ResponseEntity::ok)
                     .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<Project>> getFeaturedProjects() {
        List<Project> featuredProjects = projectRepository.findFeaturedProjects();
        return ResponseEntity.ok(featuredProjects);
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<Project>> getProjectsByStatus(
            @PathVariable Integer status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projectPage = projectRepository.findByStatus(status, pageable);
        
        return ResponseEntity.ok(projectPage);
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<Project>> getProjectsByCategory(
            @PathVariable UUID categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Optional<ProjectCategory> category = projectCategoryRepository.findByIdActive(categoryId);
        if (category.isPresent()) {
            Pageable pageable = PageRequest.of(page, size);
            Page<Project> projectPage = projectRepository.findByCategory(category.get(), pageable);
            return ResponseEntity.ok(projectPage);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/tag/{tagSlug}")
    public ResponseEntity<Page<Project>> getProjectsByTag(
            @PathVariable String tagSlug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projectPage = projectRepository.findByTagSlug(tagSlug, pageable);
        
        return ResponseEntity.ok(projectPage);
    }
    
    @GetMapping("/tech/{techSlug}")
    public ResponseEntity<Page<Project>> getProjectsByTechStack(
            @PathVariable String techSlug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projectPage = projectRepository.findByTechStackSlug(techSlug, pageable);
        
        return ResponseEntity.ok(projectPage);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<Project>> searchProjects(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<Project> projectPage = projectRepository.searchByKeyword(keyword, pageable);
        
        return ResponseEntity.ok(projectPage);
    }
    
    @PostMapping
    public ResponseEntity<Project> createProject(@RequestBody Project project) {
        Project savedProject = projectRepository.save(project);
        return ResponseEntity.ok(savedProject);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Project> updateProject(@PathVariable UUID id, @RequestBody Project project) {
        Optional<Project> existingProject = projectRepository.findByIdActive(id);
        if (existingProject.isPresent()) {
            project.setId(id);
            Project updatedProject = projectRepository.save(project);
            return ResponseEntity.ok(updatedProject);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProject(@PathVariable UUID id) {
        Optional<Project> project = projectRepository.findByIdActive(id);
        if (project.isPresent()) {
            Project projectToDelete = project.get();
            projectToDelete.setIsDeleted(true);
            projectRepository.save(projectToDelete);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
