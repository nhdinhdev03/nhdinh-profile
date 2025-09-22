package com.nhdinh.nhdinh_profile.modules.SkillCategory;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.constants.ApiConstants;
import com.nhdinh.nhdinh_profile.services.SkillCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping(ApiConstants.SKILL_CATEGORIES)
@CrossOrigin(origins = "*", maxAge = 3600)
public class SkillCategoryAPI {

    private final SkillCategoryService skillCategoryService;

    public SkillCategoryAPI(SkillCategoryService skillCategoryService) {
        this.skillCategoryService = skillCategoryService;
    }

    /**
     * Lấy tất cả skill categories active
     */
    @GetMapping
    public ResponseEntity<List<SkillCategory>> getAllActiveCategories() {
        try {
            List<SkillCategory> categories = skillCategoryService.findAllActive();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy skill category theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<SkillCategory> getCategoryById(@PathVariable UUID id) {
        try {
            Optional<SkillCategory> category = skillCategoryService.findById(id);
            return category.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy skill category theo tên
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<SkillCategory> getCategoryByName(@PathVariable String name) {
        try {
            Optional<SkillCategory> category = skillCategoryService.findByName(name);
            return category.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy categories có active skills
     */
    @GetMapping("/with-skills")
    public ResponseEntity<List<SkillCategory>> getCategoriesWithActiveSkills() {
        try {
            List<SkillCategory> categories = skillCategoryService.findCategoriesWithActiveSkills();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Kiểm tra category có tồn tại theo tên
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkCategoryExists(@RequestParam String name) {
        try {
            boolean exists = skillCategoryService.existsByName(name);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Đếm số active skills trong category
     */
    @GetMapping("/{id}/skills/count")
    public ResponseEntity<Long> countActiveSkillsInCategory(@PathVariable UUID id) {
        try {
            Long count = skillCategoryService.countActiveSkillsInCategory(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo skill category mới
     */
    @PostMapping
    public ResponseEntity<SkillCategory> createCategory(@Valid @RequestBody SkillCategory category) {
        try {
            SkillCategory createdCategory = skillCategoryService.save(category);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdCategory);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật skill category
     */
    @PutMapping("/{id}")
    public ResponseEntity<SkillCategory> updateCategory(@PathVariable UUID id, 
                                                       @Valid @RequestBody SkillCategory category) {
        try {
            Optional<SkillCategory> existingCategory = skillCategoryService.findById(id);
            if (existingCategory.isPresent()) {
                category.setCategoryId(id);
                SkillCategory updatedCategory = skillCategoryService.save(category);
                return ResponseEntity.ok(updatedCategory);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa skill category
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteCategory(@PathVariable UUID id) {
        try {
            Optional<SkillCategory> existingCategory = skillCategoryService.findById(id);
            if (existingCategory.isPresent()) {
                skillCategoryService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}