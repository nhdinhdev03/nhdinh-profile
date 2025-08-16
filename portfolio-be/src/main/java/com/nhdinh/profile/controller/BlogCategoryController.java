package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.BlogCategory;
import com.nhdinh.profile.repository.BlogCategoryRepository;
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
@RequestMapping("/api/blog/categories")
@RequiredArgsConstructor
public class BlogCategoryController {
    
    private final BlogCategoryRepository blogCategoryRepository;
    
    @GetMapping
    public ResponseEntity<Page<BlogCategory>> getAllCategories(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "createdAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<BlogCategory> categoryPage = blogCategoryRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(categoryPage);
    }
    
    @GetMapping("/all")
    public ResponseEntity<List<BlogCategory>> getAllCategoriesSimple() {
        Sort sort = Sort.by("createdAt").descending();
        Pageable pageable = PageRequest.of(0, Integer.MAX_VALUE, sort);
        Page<BlogCategory> categoryPage = blogCategoryRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(categoryPage.getContent());
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogCategory> getCategoryById(@PathVariable UUID id) {
        Optional<BlogCategory> category = blogCategoryRepository.findByIdActive(id);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogCategory> getCategoryBySlug(@PathVariable String slug) {
        Optional<BlogCategory> category = blogCategoryRepository.findBySlug(slug);
        return category.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/parent/{parentId}")
    public ResponseEntity<List<BlogCategory>> getCategoriesByParent(@PathVariable UUID parentId) {
        List<BlogCategory> categories = blogCategoryRepository.findByParentId(parentId);
        return ResponseEntity.ok(categories);
    }
    
    @GetMapping("/root")
    public ResponseEntity<List<BlogCategory>> getRootCategories() {
        List<BlogCategory> categories = blogCategoryRepository.findRootCategories();
        return ResponseEntity.ok(categories);
    }
}
