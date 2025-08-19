package com.nhdinh.profile.modules.ProjectTagMap;

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
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapBatchRequest;
import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapCreateRequest;
import com.nhdinh.profile.request.ProjectTagMap.ProjectTagMapUpdateRequest;
import com.nhdinh.profile.response.ProjectTagMap.ProjectTagMapResponse;
import com.nhdinh.profile.service.ProjectTagMap.ProjectTagMapService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project-tag-maps")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectTagMapAPI {
    
    @Autowired
    private ProjectTagMapService projectTagMapService;
    
    /**
     * Lấy tất cả tags của một project (theo thứ tự sort)
     */
    @GetMapping("/project/{projectId}")
    public ResponseEntity<List<ProjectTagMapResponse>> getProjectTags(@PathVariable UUID projectId) {
        try {
            List<ProjectTagMap> mappings = projectTagMapService.getProjectTagsByProjectId(projectId);
            List<ProjectTagMapResponse> responses = mappings.stream()
                    .map(ProjectTagMapResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy tất cả projects sử dụng một tag
     */
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<ProjectTagMapResponse>> getTagProjects(@PathVariable UUID tagId) {
        try {
            List<ProjectTagMap> mappings = projectTagMapService.getProjectsByTagId(tagId);
            List<ProjectTagMapResponse> responses = mappings.stream()
                    .map(ProjectTagMapResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy mapping cụ thể
     */
    @GetMapping("/project/{projectId}/tag/{tagId}")
    public ResponseEntity<ProjectTagMapResponse> getProjectTagMap(
            @PathVariable UUID projectId, 
            @PathVariable UUID tagId) {
        try {
            Optional<ProjectTagMap> mapping = projectTagMapService.getProjectTagMap(projectId, tagId);
            
            if (mapping.isPresent()) {
                ProjectTagMapResponse response = ProjectTagMapResponse.fromEntity(mapping.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo mapping mới
     */
    @PostMapping("/create")
    public ResponseEntity<?> createProjectTagMap(@Valid @RequestBody ProjectTagMapCreateRequest request) {
        try {
            ProjectTagMap mapping = projectTagMapService.createProjectTagMap(request);
            ProjectTagMapResponse response = ProjectTagMapResponse.fromEntitySimple(mapping);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi tạo mapping");
        }
    }
    
    /**
     * Cập nhật mapping (chủ yếu là sortOrder)
     */
    @PutMapping("/project/{projectId}/tag/{tagId}")
    public ResponseEntity<?> updateProjectTagMap(
            @PathVariable UUID projectId,
            @PathVariable UUID tagId,
            @Valid @RequestBody ProjectTagMapUpdateRequest request) {
        try {
            ProjectTagMap mapping = projectTagMapService.updateProjectTagMap(projectId, tagId, request);
            ProjectTagMapResponse response = ProjectTagMapResponse.fromEntitySimple(mapping);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật mapping");
        }
    }
    
    /**
     * Xóa mapping cụ thể
     */
    @DeleteMapping("/project/{projectId}/tag/{tagId}")
    public ResponseEntity<?> deleteProjectTagMap(
            @PathVariable UUID projectId,
            @PathVariable UUID tagId) {
        try {
            projectTagMapService.deleteProjectTagMap(projectId, tagId);
            return ResponseEntity.ok().body("Xóa mapping thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa mapping");
        }
    }
    
    /**
     * Xóa tất cả mappings của một project
     */
    @DeleteMapping("/project/{projectId}/all")
    public ResponseEntity<?> deleteAllProjectTagMaps(@PathVariable UUID projectId) {
        try {
            projectTagMapService.deleteAllProjectTagMaps(projectId);
            return ResponseEntity.ok().body("Xóa tất cả mappings của project thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa mappings");
        }
    }
    
    /**
     * Cập nhật batch mappings cho một project
     */
    @PutMapping("/project/batch")
    public ResponseEntity<?> updateProjectTagMappings(@Valid @RequestBody ProjectTagMapBatchRequest request) {
        try {
            List<ProjectTagMap> mappings = projectTagMapService.updateProjectTagMappings(request);
            List<ProjectTagMapResponse> responses = mappings.stream()
                    .map(ProjectTagMapResponse::fromEntitySimple)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật mappings");
        }
    }
    
    /**
     * Đếm số tag của một project
     */
    @GetMapping("/project/{projectId}/count")
    public ResponseEntity<Long> countTagsByProject(@PathVariable UUID projectId) {
        try {
            long count = projectTagMapService.countTagsByProjectId(projectId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Đếm số project sử dụng một tag
     */
    @GetMapping("/tag/{tagId}/count")
    public ResponseEntity<Long> countProjectsByTag(@PathVariable UUID tagId) {
        try {
            long count = projectTagMapService.countProjectsByTagId(tagId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Kiểm tra mapping tồn tại
     */
    @GetMapping("/project/{projectId}/tag/{tagId}/exists")
    public ResponseEntity<Boolean> checkMappingExists(
            @PathVariable UUID projectId,
            @PathVariable UUID tagId) {
        try {
            boolean exists = projectTagMapService.existsMapping(projectId, tagId);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy thống kê tags phổ biến nhất
     */
    @GetMapping("/statistics/popular-tags")
    public ResponseEntity<List<Object[]>> getMostUsedTagsStatistics() {
        try {
            List<Object[]> statistics = projectTagMapService.getMostUsedTagsStatistics();
            return ResponseEntity.ok(statistics);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
