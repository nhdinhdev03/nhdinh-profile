package com.nhdinh.nhdinh_profile.modules.Experience;

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

import com.nhdinh.nhdinh_profile.services.ExperienceService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/experiences")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExperienceAPI {

    private final ExperienceService experienceService;

    public ExperienceAPI(ExperienceService experienceService) {
        this.experienceService = experienceService;
    }

    /**
     * Lấy tất cả experiences
     */
    @GetMapping("/all")
    public ResponseEntity<List<Experience>> getAllExperiences() {
        try {
            List<Experience> experiences = experienceService.findAll();
            return ResponseEntity.ok(experiences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy experience theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Experience> getExperienceById(@PathVariable UUID id) {
        try {
            Optional<Experience> experience = experienceService.findById(id);
            return experience.map(ResponseEntity::ok)
                            .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy tất cả experiences của profile
     */
    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<Experience>> getExperiencesByProfile(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.findByProfileId(profileId);
            return ResponseEntity.ok(experiences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy current experiences của profile
     */
    @GetMapping("/profile/{profileId}/current")
    public ResponseEntity<List<Experience>> getCurrentExperiencesByProfile(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.findCurrentExperiencesByProfileId(profileId);
            return ResponseEntity.ok(experiences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy past experiences của profile
     */
    @GetMapping("/profile/{profileId}/past")
    public ResponseEntity<List<Experience>> getPastExperiencesByProfile(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.findPastExperiencesByProfileId(profileId);
            return ResponseEntity.ok(experiences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tìm experiences theo company
     */
    @GetMapping("/profile/{profileId}/search")
    public ResponseEntity<List<Experience>> searchExperiencesByCompany(@PathVariable UUID profileId,
                                                                      @RequestParam String company) {
        try {
            List<Experience> experiences = experienceService.findByProfileIdAndCompany(profileId, company);
            return ResponseEntity.ok(experiences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Đếm số experiences của profile
     */
    @GetMapping("/profile/{profileId}/count")
    public ResponseEntity<Long> countExperiencesByProfile(@PathVariable UUID profileId) {
        try {
            Long count = experienceService.countByProfileId(profileId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy max sort order của profile
     */
    @GetMapping("/profile/{profileId}/max-sort-order")
    public ResponseEntity<Integer> getMaxSortOrderByProfile(@PathVariable UUID profileId) {
        try {
            Integer maxOrder = experienceService.findMaxSortOrderByProfileId(profileId);
            return ResponseEntity.ok(maxOrder != null ? maxOrder : 0);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo experience mới
     */
    @PostMapping
    public ResponseEntity<Experience> createExperience(@Valid @RequestBody Experience experience) {
        try {
            Experience createdExperience = experienceService.save(experience);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdExperience);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật experience
     */
    @PutMapping("/{id}")
    public ResponseEntity<Experience> updateExperience(@PathVariable UUID id, 
                                                      @Valid @RequestBody Experience experience) {
        try {
            Optional<Experience> existingExperience = experienceService.findById(id);
            if (existingExperience.isPresent()) {
                experience.setExpId(id);
                Experience updatedExperience = experienceService.save(experience);
                return ResponseEntity.ok(updatedExperience);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa experience
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable UUID id) {
        try {
            Optional<Experience> existingExperience = experienceService.findById(id);
            if (existingExperience.isPresent()) {
                experienceService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}