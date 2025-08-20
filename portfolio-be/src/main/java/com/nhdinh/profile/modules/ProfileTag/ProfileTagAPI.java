package com.nhdinh.profile.modules.ProfileTag;

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

import com.nhdinh.profile.request.ProfileTag.ProfileTagCreateRequest;
import com.nhdinh.profile.request.ProfileTag.ProfileTagUpdateRequest;
import com.nhdinh.profile.response.ProfileTag.ProfileTagResponse;
import com.nhdinh.profile.service.ProfileTag.ProfileTagService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile-tags")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileTagAPI {
    
    @Autowired
    private ProfileTagService profileTagService;
    
    /**
     * Lấy tất cả ProfileTag của một Profile
     */
    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<ProfileTagResponse>> getTagsByProfileId(@PathVariable UUID profileId) {
        try {
            List<ProfileTag> tags = profileTagService.getTagsByProfileId(profileId);
            List<ProfileTagResponse> responses = tags.stream()
                    .map(ProfileTagResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProfileTag theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProfileTagResponse> getTagById(@PathVariable UUID id) {
        try {
            Optional<ProfileTag> tag = profileTagService.getTagById(id);
            
            if (tag.isPresent()) {
                ProfileTagResponse response = ProfileTagResponse.fromEntity(tag.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm ProfileTag
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProfileTagResponse>> searchTags(@RequestParam String keyword) {
        try {
            List<ProfileTag> tags = profileTagService.searchTags(keyword);
            List<ProfileTagResponse> responses = tags.stream()
                    .map(ProfileTagResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo ProfileTag mới
     */
    @PostMapping("/create")
    public ResponseEntity<ProfileTagResponse> createTag(@Valid @RequestBody ProfileTagCreateRequest request) {
        try {
            ProfileTag createdTag = profileTagService.createTag(request);
            ProfileTagResponse response = ProfileTagResponse.fromEntity(createdTag);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Cập nhật ProfileTag
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProfileTagResponse> updateTag(@PathVariable UUID id, 
                                                      @Valid @RequestBody ProfileTagUpdateRequest request) {
        try {
            ProfileTag updatedTag = profileTagService.updateTag(id, request);
            ProfileTagResponse response = ProfileTagResponse.fromEntity(updatedTag);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Xóa ProfileTag
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteTag(@PathVariable UUID id) {
        try {
            profileTagService.deleteTag(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Xóa tất cả ProfileTag của một Profile
     */
    @DeleteMapping("/profile/{profileId}")
    public ResponseEntity<Void> deleteAllTagsByProfileId(@PathVariable UUID profileId) {
        try {
            profileTagService.deleteAllTagsByProfileId(profileId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Đếm số lượng Tag của một Profile
     */
    @GetMapping("/profile/{profileId}/count")
    public ResponseEntity<Long> getTagCountByProfileId(@PathVariable UUID profileId) {
        try {
            long count = profileTagService.getTagCountByProfileId(profileId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy những Tag phổ biến nhất
     */
    @GetMapping("/most-used")
    public ResponseEntity<List<Object[]>> getMostUsedTags() {
        try {
            List<Object[]> mostUsedTags = profileTagService.getMostUsedTags();
            return ResponseEntity.ok(mostUsedTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
