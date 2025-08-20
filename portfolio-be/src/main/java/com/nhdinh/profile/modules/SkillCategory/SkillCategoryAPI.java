package com.nhdinh.profile.modules.SkillCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

/**
 * SkillCategory REST API Controller
 * Handles HTTP requests for skill category operations
 */
@RestController
@RequestMapping("/api/skill-categories")
@CrossOrigin(origins = "*")
public class SkillCategoryAPI {
    
    private final SkillCategoryDAO skillCategoryDAO;
    
    public SkillCategoryAPI(SkillCategoryDAO skillCategoryDAO) {
        this.skillCategoryDAO = skillCategoryDAO;
    }
    
    /**
     * GET /api/skill-categories/active/all
     * Get all active skill categories
     */
    @GetMapping("/active/all")
    public ResponseEntity<List<SkillCategory>> getAllActiveCategories() {
        try {
            List<SkillCategory> categories = skillCategoryDAO.getAllActiveCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/skill-categories/all
     * Get all skill categories (including inactive)
     */
    @GetMapping("/all")
    public ResponseEntity<List<SkillCategory>> getAllCategories() {
        try {
            List<SkillCategory> categories = skillCategoryDAO.getAllCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * GET /api/skill-categories/{id}
     * Get skill category by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<SkillCategory> getCategoryById(@PathVariable("id") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            Optional<SkillCategory> category = skillCategoryDAO.findById(id);
            
            if (category.isPresent()) {
                return ResponseEntity.ok(category.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * POST /api/skill-categories
     * Create new skill category
     */
    @PostMapping
    public ResponseEntity<SkillCategory> createCategory(@Valid @RequestBody SkillCategory category) {
        try {
            SkillCategory createdCategory = skillCategoryDAO.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * PUT /api/skill-categories/{id}
     * Update skill category
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateCategory(
            @PathVariable("id") String categoryId,
            @Valid @RequestBody SkillCategory category) {
        try {
            UUID id = UUID.fromString(categoryId);
            
            if (skillCategoryDAO.existsById(id)) {
                category.setCategoryId(id);
                skillCategoryDAO.save(category);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * DELETE /api/skill-categories/{id}
     * Soft delete skill category (set IsActive to false)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable("id") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            Optional<SkillCategory> categoryOpt = skillCategoryDAO.findById(id);
            
            if (categoryOpt.isPresent()) {
                SkillCategory category = categoryOpt.get();
                category.setActive(false);
                skillCategoryDAO.save(category);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * DELETE /api/skill-categories/{id}/hard
     * Hard delete skill category (permanent delete)
     */
    @DeleteMapping("/{id}/hard")
    public ResponseEntity<Void> hardDeleteCategory(@PathVariable("id") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            
            if (skillCategoryDAO.existsById(id)) {
                skillCategoryDAO.deleteById(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
