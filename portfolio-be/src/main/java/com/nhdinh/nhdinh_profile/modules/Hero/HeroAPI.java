                                                                                                                                                                                                                                           package com.nhdinh.nhdinh_profile.modules.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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

import com.nhdinh.nhdinh_profile.services.HeroService;

import jakarta.validation.Valid;

/**
 * Hero API Controller
 * Handles all Hero-related operations for portfolio website
 */
@RestController
@RequestMapping("/api/v2/heroes")
@CrossOrigin(origins = "*", maxAge = 3600)
public class HeroAPI {

    private final HeroService heroService;

    public HeroAPI(HeroService heroService) {
        this.heroService = heroService;
    }

    /**
     * Lấy tất cả Hero active với pagination
     */
    @GetMapping
    public ResponseEntity<Page<Hero>> getAllActiveHeroes(Pageable pageable) {
        try {
            Page<Hero> heroes = heroService.findAllActiveWithPagination(pageable);
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy tất cả Hero active (không phân trang)
     */
    @GetMapping("/all")
    public ResponseEntity<List<Hero>> getAllActiveHeroesList() {
        try {
            List<Hero> heroes = heroService.findAllActive();
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            e.printStackTrace(); // Log error for debugging
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero đầu tiên active với translations
     */
    @GetMapping("/first")
    public ResponseEntity<Hero> getFirstActiveHero() {
        try {
            Optional<Hero> hero = heroService.findFirstActiveWithTranslations();
            return hero.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero theo language code
     */
    @GetMapping("/language/{languageCode}")
    public ResponseEntity<List<Hero>> getHeroesByLanguage(@PathVariable String languageCode) {
        try {
            List<Hero> heroes = heroService.findByLanguageCode(languageCode);
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero với language parameter
     */
    @GetMapping("/by-language")
    public ResponseEntity<List<Hero>> getHeroesByLanguageParam(@RequestParam String lang) {
        try {
            List<Hero> heroes = heroService.findByLanguageCode(lang);
            return ResponseEntity.ok(heroes);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy Hero theo ID với translations
     */
    @GetMapping("/{id}")
    public ResponseEntity<Hero> getHeroById(@PathVariable UUID id) {
        try {
            Optional<Hero> hero = heroService.findByIdWithTranslations(id);
            return hero.map(ResponseEntity::ok)
                      .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo Hero mới
     */
    @PostMapping
    public ResponseEntity<Hero> createHero(@Valid @RequestBody Hero hero) {
        try {
            Hero createdHero = heroService.save(hero);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdHero);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật Hero
     */
    @PutMapping("/{id}")
    public ResponseEntity<Hero> updateHero(@PathVariable UUID id, 
                                          @Valid @RequestBody Hero hero) {
        try {
            Optional<Hero> existingHero = heroService.findById(id);
            if (existingHero.isPresent()) {
                hero.setHeroId(id);
                Hero updatedHero = heroService.save(hero);
                return ResponseEntity.ok(updatedHero);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
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
            Optional<Hero> existingHero = heroService.findById(id);
            if (existingHero.isPresent()) {
                heroService.softDeleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}