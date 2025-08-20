package com.nhdinh.profile.modules.ProjectTag;

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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.profile.request.ProjectTag.ProjectTagCreateRequest;
import com.nhdinh.profile.request.ProjectTag.ProjectTagUpdateRequest;
import com.nhdinh.profile.response.ProjectTag.ProjectTagResponse;
import com.nhdinh.profile.service.ProjectTag.ProjectTagService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/project-tags")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProjectTagAPI {
    
    @Autowired
    private ProjectTagService projectTagService;
    
    /**
     * Lấy tất cả ProjectTags
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProjectTagResponse>> getAllTags() {
        try {
            List<ProjectTag> tags = projectTagService.getAllTags();
            List<ProjectTagResponse> responses = tags.stream()
                    .map(ProjectTagResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProjectTag theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProjectTagResponse> getTagById(@PathVariable UUID id) {
        try {
            Optional<ProjectTag> tag = projectTagService.getTagById(id);
            
            if (tag.isPresent()) {
                ProjectTagResponse response = ProjectTagResponse.fromEntity(tag.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProjectTag theo tên
     */
    @GetMapping("/by-name/{name}")
    public ResponseEntity<ProjectTagResponse> getTagByName(@PathVariable String name) {
        try {
            Optional<ProjectTag> tag = projectTagService.getTagByName(name);
            
            if (tag.isPresent()) {
                ProjectTagResponse response = ProjectTagResponse.fromEntity(tag.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm ProjectTags
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProjectTagResponse>> searchTags(@RequestParam String keyword) {
        try {
            List<ProjectTag> tags = projectTagService.searchTags(keyword);
            List<ProjectTagResponse> responses = tags.stream()
                    .map(ProjectTagResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy tags phổ biến nhất
     */
    @GetMapping("/popular")
    public ResponseEntity<List<ProjectTagResponse>> getMostUsedTags() {
        try {
            List<ProjectTag> tags = projectTagService.getMostUsedTags();
            List<ProjectTagResponse> responses = tags.stream()
                    .map(ProjectTagResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo ProjectTag mới
     */
    @PostMapping("/create")
    public ResponseEntity<?> createTag(@Valid @RequestBody ProjectTagCreateRequest request) {
        try {
            ProjectTag tag = projectTagService.createTag(request);
            ProjectTagResponse response = ProjectTagResponse.fromEntity(tag);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi tạo tag");
        }
    }
    
    /**
     * Cập nhật ProjectTag
     */
    @PutMapping("/{id}")
    public ResponseEntity<?> updateTag(@PathVariable UUID id, @Valid @RequestBody ProjectTagUpdateRequest request) {
        try {
            ProjectTag tag = projectTagService.updateTag(id, request);
            ProjectTagResponse response = ProjectTagResponse.fromEntity(tag);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi cập nhật tag");
        }
    }
    
    /**
     * Xóa ProjectTag
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTag(@PathVariable UUID id) {
        try {
            if (!projectTagService.existsById(id)) {
                return ResponseEntity.notFound().build();
            }
            
            projectTagService.deleteTag(id);
            return ResponseEntity.ok().body("Xóa tag thành công");
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Có lỗi xảy ra khi xóa tag");
        }
    }
}
