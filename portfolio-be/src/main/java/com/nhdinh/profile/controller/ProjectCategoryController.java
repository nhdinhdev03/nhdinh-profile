package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.ProjectCategory;
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
@RequestMapping("/api/project/categories")
@RequiredArgsConstructor
public class ProjectCategoryController {
    
    private final ProjectCategoryRepository projectCategoryRepository;
    
    @GetMapping
    public ResponseEntity<Page<ProjectCategory>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<ProjectCategory> categoryPage = projectCategoryRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(categoryPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<ProjectCategory>> getAllCategoriesSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<ProjectCategory> categoryPage = projectCategoryRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(categoryPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<ProjectCategory> getCategoryById(@PathVariable UUID id) {
        Optional<ProjectCategory> category = projectCategoryRepository.findByIdActive(id);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<ProjectCategory> getCategoryBySlug(@PathVariable String slug) {
        Optional<ProjectCategory> category = projectCategoryRepository.findBySlug(slug);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
}
