package com.nhdinh.profile.controller;

import com.nhdinh.profile.dto.ApiResponse;
import com.nhdinh.profile.model.*;
import com.nhdinh.profile.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/test")
@RequiredArgsConstructor
public class TestController {
    
    private final BlogPostRepository blogPostRepository;
    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final MediaRepository mediaRepository;
    private final BlogCategoryRepository blogCategoryRepository;
    private final ProjectCategoryRepository projectCategoryRepository;
    private final RoleRepository roleRepository;
    private final PermissionRepository permissionRepository;
    private final TechStackRepository techStackRepository;
    
    /**
     * Test API tổng hợp - lấy tất cả dữ liệu chính sắp xếp từ cao xuống thấp
     */
    @GetMapping("/all")
    public ResponseEntity<ApiResponse<Map<String, Object>>> getAllDataForTest() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Sắp xếp từ cao xuống thấp theo createdAt
            Sort sort = Sort.by("createdAt").descending();
            Pageable pageable = PageRequest.of(0, 10, sort); // Giới hạn 10 record cho test
            
            // Blog Posts
            Page<BlogPost> blogPosts = blogPostRepository.findAllActive(pageable);
            result.put("blogPosts", blogPosts.getContent());
            result.put("blogPostsCount", blogPosts.getTotalElements());
            
            // Projects
            Page<Project> projects = projectRepository.findAllActive(pageable);
            result.put("projects", projects.getContent());
            result.put("projectsCount", projects.getTotalElements());
            
            // Users
            Page<User> users = userRepository.findAllActive(pageable);
            result.put("users", users.getContent());
            result.put("usersCount", users.getTotalElements());
            
            // Media
            Page<Media> media = mediaRepository.findAllActive(pageable);
            result.put("media", media.getContent());
            result.put("mediaCount", media.getTotalElements());
            
            // Blog Categories
            Page<BlogCategory> blogCategories = blogCategoryRepository.findAllActive(pageable);
            result.put("blogCategories", blogCategories.getContent());
            result.put("blogCategoriesCount", blogCategories.getTotalElements());
            
            // Project Categories
            Page<ProjectCategory> projectCategories = projectCategoryRepository.findAllActive(pageable);
            result.put("projectCategories", projectCategories.getContent());
            result.put("projectCategoriesCount", projectCategories.getTotalElements());
            
            // Roles (không có soft delete)
            List<Role> roles = roleRepository.findAll(sort);
            result.put("roles", roles.size() > 10 ? roles.subList(0, 10) : roles);
            result.put("rolesCount", roles.size());
            
            // Permissions (không có soft delete)
            List<Permission> permissions = permissionRepository.findAll(sort);
            result.put("permissions", permissions.size() > 10 ? permissions.subList(0, 10) : permissions);
            result.put("permissionsCount", permissions.size());
            
            // TechStacks
            Page<TechStack> techStacks = techStackRepository.findAllActive(pageable);
            result.put("techStacks", techStacks.getContent());
            result.put("techStacksCount", techStacks.getTotalElements());
            
            return ResponseEntity.ok(ApiResponse.success(result, "Dữ liệu được sắp xếp từ cao xuống thấp theo ngày tạo"));
            
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Lỗi khi lấy dữ liệu: " + e.getMessage()));
        }
    }
    
    /**
     * Test API đếm tổng số bản ghi của tất cả bảng
     */
    @GetMapping("/count")
    public ResponseEntity<ApiResponse<Map<String, Long>>> getCountAllTables() {
        Map<String, Long> result = new HashMap<>();
        
        try {
            result.put("blogPostsCount", blogPostRepository.count());
            result.put("projectsCount", projectRepository.count());
            result.put("usersCount", userRepository.count());
            result.put("mediaCount", mediaRepository.count());
            result.put("blogCategoriesCount", blogCategoryRepository.count());
            result.put("projectCategoriesCount", projectCategoryRepository.count());
            result.put("rolesCount", roleRepository.count());
            result.put("permissionsCount", permissionRepository.count());
            result.put("techStacksCount", techStackRepository.count());
            
            return ResponseEntity.ok(ApiResponse.success(result, "Đếm thành công tất cả bảng"));
            
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Lỗi khi đếm dữ liệu: " + e.getMessage()));
        }
    }
    
    /**
     * Test API kiểm tra kết nối database
     */
    @GetMapping("/health")
    public ResponseEntity<ApiResponse<Map<String, Object>>> healthCheck() {
        Map<String, Object> result = new HashMap<>();
        
        try {
            // Test query đơn giản
            long totalRecords = blogPostRepository.count() + 
                              projectRepository.count() + 
                              userRepository.count();
            
            result.put("totalRecords", totalRecords);
            result.put("timestamp", System.currentTimeMillis());
            
            return ResponseEntity.ok(ApiResponse.success(result, "Database kết nối thành công"));
            
        } catch (Exception e) {
            return ResponseEntity.ok(ApiResponse.error("Database kết nối thất bại: " + e.getMessage()));
        }
    }
    
    /**
     * Test CORS và API không cần authentication
     */
    @GetMapping("/cors")
    public ResponseEntity<ApiResponse<Map<String, Object>>> testCors() {
        Map<String, Object> result = new HashMap<>();
        result.put("message", "CORS và API hoạt động bình thường");
        result.put("timestamp", System.currentTimeMillis());
        result.put("securityDisabled", true);
        
        return ResponseEntity.ok(ApiResponse.success(result, "Test CORS thành công - Security đã tắt"));
    }
    
    /**
     * Simple ping test
     */
    @GetMapping("/ping")
    public ResponseEntity<ApiResponse<String>> ping() {
        return ResponseEntity.ok(ApiResponse.success("pong", "Server hoạt động bình thường"));
    }
}
