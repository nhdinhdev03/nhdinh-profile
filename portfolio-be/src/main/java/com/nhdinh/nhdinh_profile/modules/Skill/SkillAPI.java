package com.nhdinh.nhdinh_profile.modules.Skill;

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

import com.nhdinh.nhdinh_profile.services.SkillService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/skills")
@CrossOrigin(origins = "*", maxAge = 3600)
public class SkillAPI {

    private final SkillService skillService;

    public SkillAPI(SkillService skillService) {
        this.skillService = skillService;
    }

    /**
     * Lấy tất cả skills active
     */
    @GetMapping
    public ResponseEntity<List<Skill>> getAllActiveSkills() {
        try {
            List<Skill> skills = skillService.findAllActive();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy skill theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable UUID id) {
        try {
            Optional<Skill> skill = skillService.findById(id);
            return skill.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy skills theo category
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@PathVariable UUID categoryId) {
        try {
            List<Skill> skills = skillService.findByCategoryId(categoryId);
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tìm skill theo tên trong category
     */
    @GetMapping("/category/{categoryId}/name/{name}")
    public ResponseEntity<Skill> getSkillByCategoryAndName(@PathVariable UUID categoryId, 
                                                          @PathVariable String name) {
        try {
            Optional<Skill> skill = skillService.findByCategoryIdAndName(categoryId, name);
            return skill.map(ResponseEntity::ok)
                        .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tìm kiếm skills theo tên
     */
    @GetMapping("/search")
    public ResponseEntity<List<Skill>> searchSkills(@RequestParam String keyword) {
        try {
            List<Skill> skills = skillService.searchByName(keyword);
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Kiểm tra skill có tồn tại trong category
     */
    @GetMapping("/category/{categoryId}/exists")
    public ResponseEntity<Boolean> checkSkillExists(@PathVariable UUID categoryId, 
                                                   @RequestParam String name) {
        try {
            boolean exists = skillService.existsByCategoryIdAndName(categoryId, name);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy max sort order trong category
     */
    @GetMapping("/category/{categoryId}/max-sort-order")
    public ResponseEntity<Integer> getMaxSortOrder(@PathVariable UUID categoryId) {
        try {
            Integer maxOrder = skillService.findMaxSortOrderByCategoryId(categoryId);
            return ResponseEntity.ok(maxOrder != null ? maxOrder : 0);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo skill mới
     */
    @PostMapping
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill) {
        try {
            Skill createdSkill = skillService.save(skill);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSkill);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật skill
     */
    @PutMapping("/{id}")
    public ResponseEntity<Skill> updateSkill(@PathVariable UUID id, 
                                            @Valid @RequestBody Skill skill) {
        try {
            Optional<Skill> existingSkill = skillService.findById(id);
            if (existingSkill.isPresent()) {
                skill.setSkillId(id);
                Skill updatedSkill = skillService.save(skill);
                return ResponseEntity.ok(updatedSkill);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa skill
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable UUID id) {
        try {
            Optional<Skill> existingSkill = skillService.findById(id);
            if (existingSkill.isPresent()) {
                skillService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}