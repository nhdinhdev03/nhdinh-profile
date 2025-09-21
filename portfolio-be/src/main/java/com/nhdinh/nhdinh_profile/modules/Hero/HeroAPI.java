package com.nhdinh.nhdinh_profile.modules.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

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

import com.nhdinh.nhdinh_profile.request.Hero.HeroCreateRequest;
import com.nhdinh.nhdinh_profile.request.Hero.HeroUpdateRequest;
import com.nhdinh.nhdinh_profile.response.Hero.HeroResponse;
import com.nhdinh.nhdinh_profile.service.Hero.HeroService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/heroes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HeroAPI {

    @Autowired
    private HeroService heroService;

    /**
     * Lấy tất cả Hero active
     */
    @GetMapping
    public ResponseEntity<List<HeroResponse>> getAllActiveHeroes() {
        try {
            List<HeroResponse> heroes = heroService.getAllActiveHeroes();
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero đầu tiên
     */
    @GetMapping("/first")
    public ResponseEntity<HeroResponse> getFirstActiveHero() {
        try {
            Optional<HeroResponse> hero = heroService.getFirstActiveHero();
            return hero.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<HeroResponse> getHeroById(@PathVariable UUID id) {
        try {
            Optional<HeroResponse> hero = heroService.getHeroById(id);
            return hero.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero theo language code
     */
    @GetMapping("/language/{languageCode}")
    public ResponseEntity<List<HeroResponse>> getHeroesByLanguage(@PathVariable String languageCode) {
        try {
            List<HeroResponse> heroes = heroService.getHeroesByLanguage(languageCode);
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero với language parameter
     */
    @GetMapping("/by-language")
    public ResponseEntity<List<HeroResponse>> getHeroesByLanguageParam(@RequestParam String lang) {
        try {
            List<HeroResponse> heroes = heroService.getHeroesByLanguage(lang);
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo Hero mới
     */
    @PostMapping
    public ResponseEntity<HeroResponse> createHero(@Valid @RequestBody HeroCreateRequest request) {
        try {
            HeroResponse createdHero = heroService.createHero(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHero);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật Hero
     */
    @PutMapping("/{id}")
    public ResponseEntity<HeroResponse> updateHero(@PathVariable UUID id, 
                                                  @Valid @RequestBody HeroUpdateRequest request) {
        try {
            Optional<HeroResponse> updatedHero = heroService.updateHero(id, request);
            return updatedHero.map(ResponseEntity::ok)
                             .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Soft delete Hero
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteHero(@PathVariable UUID id) {
        try {
            boolean deleted = heroService.deleteHero(id);
            return deleted ? ResponseEntity.noContent().build() 
                          : ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}