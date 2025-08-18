package com.nhdinh.profile.modules.Experience;

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
@RequestMapping("/api/experiences")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ExperienceAPI {
    
    @Autowired
    private ExperienceService experienceService;
    
    /**
     * Lấy tất cả Experience của một Profile
     */
    @GetMapping("/profile/{profileId}")
    public ResponseEntity<List<ExperienceResponse>> getExperiencesByProfileId(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByProfileId(profileId);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy tất cả Experience của một Profile sắp xếp theo năm
     */
    @GetMapping("/profile/{profileId}/by-year")
    public ResponseEntity<List<ExperienceResponse>> getExperiencesByProfileIdOrderByYear(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByProfileIdOrderByYear(profileId);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Experience hiện tại của một Profile
     */
    @GetMapping("/profile/{profileId}/current")
    public ResponseEntity<List<ExperienceResponse>> getCurrentExperiencesByProfileId(@PathVariable UUID profileId) {
        try {
            List<Experience> experiences = experienceService.getCurrentExperiencesByProfileId(profileId);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Experience theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ExperienceResponse> getExperienceById(@PathVariable UUID id) {
        try {
            Optional<Experience> experience = experienceService.getExperienceById(id);
            
            if (experience.isPresent()) {
                ExperienceResponse response = ExperienceResponse.fromEntity(experience.get());
                return ResponseEntity.ok(response);
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm kiếm Experience
     */
    @GetMapping("/search")
    public ResponseEntity<List<ExperienceResponse>> searchExperiences(@RequestParam String keyword) {
        try {
            List<Experience> experiences = experienceService.searchExperiences(keyword);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm Experience theo Company
     */
    @GetMapping("/company/{company}")
    public ResponseEntity<List<ExperienceResponse>> getExperiencesByCompany(@PathVariable String company) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByCompany(company);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tìm Experience theo Position
     */
    @GetMapping("/position/{position}")
    public ResponseEntity<List<ExperienceResponse>> getExperiencesByPosition(@PathVariable String position) {
        try {
            List<Experience> experiences = experienceService.getExperiencesByPosition(position);
            List<ExperienceResponse> responses = experiences.stream()
                    .map(ExperienceResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo Experience mới
     */
    @PostMapping("/create")
    public ResponseEntity<ExperienceResponse> createExperience(@Valid @RequestBody ExperienceCreateRequest request) {
        try {
            Experience createdExperience = experienceService.createExperience(request);
            ExperienceResponse response = ExperienceResponse.fromEntity(createdExperience);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Cập nhật Experience
     */
    @PutMapping("/{id}")
    public ResponseEntity<ExperienceResponse> updateExperience(@PathVariable UUID id, 
                                                             @Valid @RequestBody ExperienceUpdateRequest request) {
        try {
            Experience updatedExperience = experienceService.updateExperience(id, request);
            ExperienceResponse response = ExperienceResponse.fromEntity(updatedExperience);
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Xóa Experience
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteExperience(@PathVariable UUID id) {
        try {
            experienceService.deleteExperience(id);
            return ResponseEntity.noContent().build();
        } catch (RuntimeException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Xóa tất cả Experience của một Profile
     */
    @DeleteMapping("/profile/{profileId}")
    public ResponseEntity<Void> deleteAllExperiencesByProfileId(@PathVariable UUID profileId) {
        try {
            experienceService.deleteAllExperiencesByProfileId(profileId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Đếm số lượng Experience của một Profile
     */
    @GetMapping("/profile/{profileId}/count")
    public ResponseEntity<Long> getExperienceCountByProfileId(@PathVariable UUID profileId) {
        try {
            long count = experienceService.getExperienceCountByProfileId(profileId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Đếm số lượng Experience hiện tại của một Profile
     */
    @GetMapping("/profile/{profileId}/current/count")
    public ResponseEntity<Long> getCurrentExperienceCountByProfileId(@PathVariable UUID profileId) {
        try {
            long count = experienceService.getCurrentExperienceCountByProfileId(profileId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy những Company phổ biến nhất
     */
    @GetMapping("/companies/popular")
    public ResponseEntity<List<Object[]>> getMostPopularCompanies() {
        try {
            List<Object[]> popularCompanies = experienceService.getMostPopularCompanies();
            return ResponseEntity.ok(popularCompanies);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy những Position phổ biến nhất
     */
    @GetMapping("/positions/popular")
    public ResponseEntity<List<Object[]>> getMostPopularPositions() {
        try {
            List<Object[]> popularPositions = experienceService.getMostPopularPositions();
            return ResponseEntity.ok(popularPositions);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
