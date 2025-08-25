package com.nhdinh.profile.modules.ProjectCategory;

import java.util.List;
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

import com.nhdinh.profile.request.ProjectCategory.ProjectCategoryCreateRequest;
import com.nhdinh.profile.request.ProjectCategory.ProjectCategoryUpdateRequest;
import com.nhdinh.profile.response.ProjectCategory.ProjectCategoryResponse;
import com.nhdinh.profile.service.ProjectCategory.ProjectCategoryService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project-categories")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectCategoryAPI {
    
    @Autowired
    private ProjectCategoryService projectCategoryService;
    
    /**
     * Lấy tất cả ProjectCategories
     */
    
    @GetMapping("all")
    public ResponseEntity<List<ProjectCategoryResponse>> getAllCategories() {
        try {
            List<ProjectCategory> categories = projectCategoryService.getAllCategories();
            List<ProjectCategoryResponse> responses = categories.stream()
                    .map(ProjectCategoryResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProjectCategory theo ID
     */
    @GetMapping("/{categoryId}")
    public ResponseEntity<ProjectCategoryResponse> getCategoryById(@PathVariable UUID categoryId) {
        try {
            return projectCategoryService.getCategoryById(categoryId)
                    .map(category -> ResponseEntity.ok(ProjectCategoryResponse.fromEntity(category)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProjectCategory theo tên
     */
    @GetMapping("/name/{name}")
    public ResponseEntity<ProjectCategoryResponse> getCategoryByName(@PathVariable String name) {
        try {
            return projectCategoryService.getCategoryByName(name)
                    .map(category -> ResponseEntity.ok(ProjectCategoryResponse.fromEntity(category)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm ProjectCategory theo từ khóa
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProjectCategoryResponse>> searchCategories(@RequestParam String keyword) {
        try {
            List<ProjectCategory> categories = projectCategoryService.searchCategories(keyword);
            List<ProjectCategoryResponse> responses = categories.stream()
                    .map(ProjectCategoryResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo ProjectCategory mới
     */
    @PostMapping("/create")
    public ResponseEntity<?> createCategory(@Valid @RequestBody ProjectCategoryCreateRequest request) {
        try {
            ProjectCategory category = projectCategoryService.createCategory(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(ProjectCategoryResponse.fromEntity(category));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Cập nhật ProjectCategory
     */
    @PutMapping("/{categoryId}")
    public ResponseEntity<?> updateCategory(
            @PathVariable UUID categoryId,
            @Valid @RequestBody ProjectCategoryUpdateRequest request) {
        try {
            ProjectCategory updatedCategory = projectCategoryService.updateCategory(categoryId, request);
            return ResponseEntity.ok(ProjectCategoryResponse.fromEntity(updatedCategory));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Xóa ProjectCategory
     */
    @DeleteMapping("/{categoryId}")
    public ResponseEntity<?> deleteCategory(@PathVariable UUID categoryId) {
        try {
            projectCategoryService.deleteCategory(categoryId);
            return ResponseEntity.ok(new SuccessResponse("Xóa ProjectCategory thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Kiểm tra ProjectCategory có tồn tại không theo tên
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> existsByName(@RequestParam String name) {
        try {
            boolean exists = projectCategoryService.existsByName(name);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Inner classes for responses
    public static class ErrorResponse {
        private String message;
        private String status = "error";
        
        public ErrorResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public String getStatus() {
            return status;
        }
    }
    
    public static class SuccessResponse {
        private String message;
        private String status = "success";
        
        public SuccessResponse(String message) {
            this.message = message;
        }
        
        public String getMessage() {
            return message;
        }
        
        public String getStatus() {
            return status;
        }
    }
}
