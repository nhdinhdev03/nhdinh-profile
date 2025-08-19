package com.nhdinh.profile.modules.Hero;

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

import com.nhdinh.profile.request.Hero.HeroCreateRequest;
import com.nhdinh.profile.request.Hero.HeroUpdateRequest;
import com.nhdinh.profile.response.Hero.HeroResponse;
import com.nhdinh.profile.service.Hero.HeroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/heroes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HeroAPI {
    
    @Autowired
    private HeroService heroService;
    
    /**
     * Lấy tất cả Heroes
     */
    @GetMapping("/all")
    public ResponseEntity<List<HeroResponse>> getAllHeroes() {
        try {
            List<Hero> heroes = heroService.getAllHeroes();
            List<HeroResponse> responses = heroes.stream()
                    .map(HeroResponse::fromEntity)
                    .collect(Collectors.toList());
            
            return ResponseEntity.ok(responses);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Hero theo ID
     */
    @GetMapping("/{heroId}")
    public ResponseEntity<HeroResponse> getHeroById(@PathVariable UUID heroId) {
        try {
            return heroService.getHeroById(heroId)
                    .map(hero -> ResponseEntity.ok(HeroResponse.fromEntity(hero)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Lấy Hero theo locale
     */
    @GetMapping("/locale/{locale}")
    public ResponseEntity<HeroResponse> getHeroByLocale(@PathVariable String locale) {
        try {
            return heroService.getHeroByLocale(locale)
                    .map(hero -> ResponseEntity.ok(HeroResponse.fromEntity(hero)))
                    .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    /**
     * Tạo Hero mới
     */
    @PostMapping
    public ResponseEntity<?> createHero(@Valid @RequestBody HeroCreateRequest request) {
        try {
            Hero hero = new Hero();
            hero.setLocale(request.getLocale());
            hero.setPreHeading(request.getPreHeading());
            hero.setHeading(request.getHeading());
            hero.setIntroHtml(request.getIntroHtml());
            
            Hero createdHero = heroService.createHero(hero);
            return ResponseEntity.status(HttpStatus.CREATED)
                    .body(HeroResponse.fromEntity(createdHero));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Cập nhật Hero
     */
    @PutMapping("/{heroId}")
    public ResponseEntity<?> updateHero(
            @PathVariable UUID heroId,
            @Valid @RequestBody HeroUpdateRequest request) {
        try {
            Hero heroUpdate = new Hero();
            heroUpdate.setLocale(request.getLocale());
            heroUpdate.setPreHeading(request.getPreHeading());
            heroUpdate.setHeading(request.getHeading());
            heroUpdate.setIntroHtml(request.getIntroHtml());
            
            Hero updatedHero = heroService.updateHero(heroId, heroUpdate);
            return ResponseEntity.ok(HeroResponse.fromEntity(updatedHero));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Xóa Hero
     */
    @DeleteMapping("/{heroId}")
    public ResponseEntity<?> deleteHero(@PathVariable UUID heroId) {
        try {
            heroService.deleteHero(heroId);
            return ResponseEntity.ok(new SuccessResponse("Xóa Hero thành công"));
        } catch (RuntimeException e) {
            return ResponseEntity.badRequest()
                    .body(new ErrorResponse(e.getMessage()));
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body(new ErrorResponse("Lỗi hệ thống: " + e.getMessage()));
        }
    }
    
    /**
     * Khôi phục Hero đã xóa
     */
    @PostMapping("/{heroId}/restore")
    public ResponseEntity<?> restoreHero(@PathVariable UUID heroId) {
        try {
            Hero restoredHero = heroService.restoreHero(heroId);
            return ResponseEntity.ok(HeroResponse.fromEntity(restoredHero));
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
