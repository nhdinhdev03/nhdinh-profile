package com.nhdinh.profile.modules.HeroSubHeading;

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
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/hero-subheadings")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HeroSubHeadingAPI {
    
    @Autowired
    private HeroSubHeadingService heroSubHeadingService;
    
    /**
     * Lấy tất cả SubHeadings theo HeroId
     */
    @GetMapping("/hero/{heroId}")
    public ResponseEntity<List<HeroSubHeadingResponse>> getSubHeadingsByHeroId(@PathVariable UUID heroId) {
        try {
            List<HeroSubHeading> subHeadings = heroSubHeadingService.getSubHeadingsByHeroId(heroId);
            List<HeroSubHeadingResponse> responses = subHeadings.stream()
                    .map(HeroSubHeadingResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy tất cả SubHeadings theo locale
     */
    @GetMapping("/locale/{locale}")
    public ResponseEntity<List<HeroSubHeadingResponse>> getSubHeadingsByLocale(@PathVariable String locale) {
        try {
            List<HeroSubHeading> subHeadings = heroSubHeadingService.getSubHeadingsByLocale(locale);
            List<HeroSubHeadingResponse> responses = subHeadings.stream()
                    .map(HeroSubHeadingResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy SubHeading theo ID
     */
    @GetMapping("/{subId}")
    public ResponseEntity<HeroSubHeadingResponse> getSubHeadingById(@PathVariable UUID subId) {
        try {
            return heroSubHeadingService.getSubHeadingById(subId)
                    .map(subHeading -> ResponseEntity.ok(HeroSubHeadingResponse.fromEntity(subHeading)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo SubHeading mới
     */
    @PostMapping
    public ResponseEntity<?> createSubHeading(@Valid @RequestBody HeroSubHeadingCreateRequest request) {
        try {
            HeroSubHeading subHeading = heroSubHeadingService.createSubHeading(request);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(HeroSubHeadingResponse.fromEntity(subHeading));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Cập nhật SubHeading
     */
    @PutMapping("/{subId}")
    public ResponseEntity<?> updateSubHeading(
            @PathVariable UUID subId,
            @Valid @RequestBody HeroSubHeadingUpdateRequest request) {
        try {
            HeroSubHeading updatedSubHeading = heroSubHeadingService.updateSubHeading(subId, request);
            return ResponseEntity.ok(HeroSubHeadingResponse.fromEntity(updatedSubHeading));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Xóa SubHeading
     */
    @DeleteMapping("/{subId}")
    public ResponseEntity<?> deleteSubHeading(@PathVariable UUID subId) {
        try {
            heroSubHeadingService.deleteSubHeading(subId);
            return ResponseEntity.ok(new SuccessResponse("Xóa SubHeading thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Cập nhật thứ tự SubHeadings
     */
    @PutMapping("/reorder")
    public ResponseEntity<?> reorderSubHeadings(@Valid @RequestBody List<HeroSubHeadingReorderRequest> requests) {
        try {
            heroSubHeadingService.reorderSubHeadings(requests);
            return ResponseEntity.ok(new SuccessResponse("Cập nhật thứ tự thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
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
