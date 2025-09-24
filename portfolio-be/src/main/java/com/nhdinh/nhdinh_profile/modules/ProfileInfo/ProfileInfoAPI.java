package com.nhdinh.nhdinh_profile.modules.ProfileInfo;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.services.ProfileInfoService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/profile")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ProfileInfoAPI {

    private final ProfileInfoService profileInfoService;

    public ProfileInfoAPI(ProfileInfoService profileInfoService) {
        this.profileInfoService = profileInfoService;
    }

    /**
     * Lấy tất cả profiles với phân trang
     */
    @GetMapping("/all")
    @Transactional(readOnly = true)
    public ResponseEntity<Page<ProfileInfo>> getAllProfiles(Pageable pageable) {
        try {
            Page<ProfileInfo> profiles = profileInfoService.findAllWithPagination(pageable);
            return ResponseEntity.ok(profiles);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

  

    /**
     * Lấy profile active (thông tin chính của user)
     */
    @GetMapping("/active")
    public ResponseEntity<ProfileInfo> getActiveProfile() {
        try {
            Optional<ProfileInfo> profile = profileInfoService.findActiveProfile();
            return profile.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy profile theo ID với translations
     */
    @GetMapping("/{id}")
    public ResponseEntity<ProfileInfo> getProfileById(@PathVariable UUID id) {
        try {
            Optional<ProfileInfo> profile = profileInfoService.findByIdWithTranslations(id);
            return profile.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy profile active với tất cả dữ liệu liên quan
     */
    @GetMapping("/full")
    public ResponseEntity<ProfileInfo> getActiveProfileWithAllData() {
        try {
            Optional<ProfileInfo> profile = profileInfoService.getActiveProfileWithAllData();
            return profile.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Kiểm tra xem có profile nào tồn tại không
     */
    @GetMapping("/exists")
    public ResponseEntity<Boolean> checkProfileExists() {
        try {
            boolean exists = profileInfoService.existsAnyProfile();
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo profile mới (thường chỉ có 1 profile)
     */
    @PostMapping
    public ResponseEntity<ProfileInfo> createProfile(@Valid @RequestBody ProfileInfo profile) {
        try {
            // Kiểm tra xem đã có profile chưa
            if (profileInfoService.existsAnyProfile()) {
                return ResponseEntity.status(HttpStatus.CONFLICT)
                                   .build(); // Conflict nếu đã có profile
            }
            ProfileInfo createdProfile = profileInfoService.save(profile);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdProfile);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật profile
     */
    @PutMapping("/{id}")
    public ResponseEntity<ProfileInfo> updateProfile(@PathVariable UUID id, 
                                                    @Valid @RequestBody ProfileInfo profile) {
        try {
            Optional<ProfileInfo> existingProfile = profileInfoService.findById(id);
            if (existingProfile.isPresent()) {
                profile.setProfileId(id);
                ProfileInfo updatedProfile = profileInfoService.save(profile);
                return ResponseEntity.ok(updatedProfile);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa profile
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProfile(@PathVariable UUID id) {
        try {
            Optional<ProfileInfo> existingProfile = profileInfoService.findById(id);
            if (existingProfile.isPresent()) {
                profileInfoService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}