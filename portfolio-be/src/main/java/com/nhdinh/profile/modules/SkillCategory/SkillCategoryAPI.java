package com.nhdinh.profile.modules.SkillCategory;

import java.sql.SQLException;
import java.util.List;
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
    
    private SkillCategoryDAO skillCategoryDAO;
    
    public SkillCategoryAPI() {
        this.skillCategoryDAO = new SkillCategoryDAO();
    }
    
    /**
     * GET /api/skill-categories
     * Get all active skill categories
     */
    @GetMapping
    public ResponseEntity<List<SkillCategory>> getAllActiveCategories() {
        try {
            List<SkillCategory> categories = skillCategoryDAO.getAllActiveCategories();
            return ResponseEntity.ok(categories);
        } catch (SQLException e) {
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
        } catch (SQLException e) {
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
            SkillCategory category = skillCategoryDAO.getCategoryById(id);
            
            if (category != null) {
                return ResponseEntity.ok(category);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (SQLException e) {
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
            SkillCategory createdCategory = skillCategoryDAO.createCategory(category);
            
            if (createdCategory != null) {
                return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
            } else {
                return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
            }
        } catch (SQLException e) {
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
            category.setCategoryId(id);
            
            boolean updated = skillCategoryDAO.updateCategory(category);
            
            if (updated) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (SQLException e) {
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
            boolean deleted = skillCategoryDAO.deleteCategory(id);
            
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (SQLException e) {
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
            boolean deleted = skillCategoryDAO.hardDeleteCategory(id);
            
            if (deleted) {
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (SQLException e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
