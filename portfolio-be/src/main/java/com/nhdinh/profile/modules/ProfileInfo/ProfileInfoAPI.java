package com.nhdinh.profile.modules.ProfileInfo;

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

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/profile-info")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileInfoAPI {
    
    @Autowired
    private ProfileInfoService profileInfoService;
    
    /**
     * Lấy tất cả ProfileInfo
     */
    @GetMapping("/all")
    public ResponseEntity<List<ProfileInfoResponse>> getAllProfiles() {
        try {
            List<ProfileInfo> profiles = profileInfoService.getAllProfiles();
            List<ProfileInfoResponse> responses = profiles.stream()
                    .map(ProfileInfoResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProfileInfo theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProfileInfoResponse> getProfileById(@PathVariable UUID id) {
        try {
            Optional<ProfileInfo> profile = profileInfoService.getProfileById(id);
            
            if (profile.isPresent()) {
                ProfileInfoResponse response = ProfileInfoResponse.fromEntity(profile.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy ProfileInfo theo FullName
     */
    @GetMapping("/by-name/{fullName}")
    public ResponseEntity<ProfileInfoResponse> getProfileByFullName(@PathVariable String fullName) {
        try {
            Optional<ProfileInfo> profile = profileInfoService.getProfileByFullName(fullName);
            
            if (profile.isPresent()) {
                ProfileInfoResponse response = ProfileInfoResponse.fromEntity(profile.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm ProfileInfo
     */
    @GetMapping("/search")
    public ResponseEntity<List<ProfileInfoResponse>> searchProfiles(@RequestParam String keyword) {
        try {
            List<ProfileInfo> profiles = profileInfoService.searchProfiles(keyword);
            List<ProfileInfoResponse> responses = profiles.stream()
                    .map(ProfileInfoResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo ProfileInfo mới
     */
    @PostMapping("/create")
    public ResponseEntity<ProfileInfoResponse> createProfile(@Valid @RequestBody ProfileInfoCreateRequest request) {
        try {
            ProfileInfo createdProfile = profileInfoService.createProfile(request);
            ProfileInfoResponse response = ProfileInfoResponse.fromEntity(createdProfile);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Cập nhật ProfileInfo
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProfileInfoResponse> updateProfile(@PathVariable UUID id, 
                                                           @Valid @RequestBody ProfileInfoUpdateRequest request) {
        try {
            ProfileInfo updatedProfile = profileInfoService.updateProfile(id, request);
            ProfileInfoResponse response = ProfileInfoResponse.fromEntity(updatedProfile);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Xóa ProfileInfo
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        try {
            profileInfoService.deleteProfile(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Kiểm tra FullName đã tồn tại chưa
     */
    @GetMapping("/check-fullname/{fullName}")
    public ResponseEntity<Boolean> checkFullNameExists(@PathVariable String fullName) {
        try {
            boolean exists = profileInfoService.isFullNameExists(fullName);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy tổng số ProfileInfo
     */
    @GetMapping("/count")
    public ResponseEntity<Long> getTotalProfileCount() {
        try {
            long count = profileInfoService.getTotalProfileCount();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
