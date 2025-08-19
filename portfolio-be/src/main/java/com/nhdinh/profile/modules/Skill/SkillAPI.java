package com.nhdinh.profile.modules.Skill;

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
import org.springframework.web.bind.annotation.RestController;

import jakarta.validation.Valid;

/**
 * Skill REST API Controller
 * Handles HTTP requests for skill operations
 */
@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillAPI {

    private final SkillDAO skillDAO;

    public SkillAPI(SkillDAO skillDAO) {
        this.skillDAO = skillDAO;
    }

    /**
     * GET /api/skills/active
     * Get all active skills
     */
    @GetMapping("/active/all")
    public ResponseEntity<List<Skill>> getAllActiveSkills() {
        try {
            List<Skill> skills = skillDAO.getAllActiveSkills();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/skills/all
     * Get all skills (including inactive)
     */
    @GetMapping("/all")
    public ResponseEntity<List<Skill>> getAllSkills() {
        try {
            List<Skill> skills = skillDAO.getAllSkills();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/skills/category/{categoryId}
     * Get skills by category ID
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<List<Skill>> getSkillsByCategory(@PathVariable("categoryId") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            List<Skill> skills = skillDAO.getSkillsByCategory(id);
            return ResponseEntity.ok(skills);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * GET /api/skills/{id}
     * Get skill by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Skill> getSkillById(@PathVariable("id") String skillId) {
        try {
            UUID id = UUID.fromString(skillId);
            Optional<Skill> skill = skillDAO.findById(id);

            if (skill.isPresent()) {
                return ResponseEntity.ok(skill.get());
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * POST /api/skills
     * Create new skill
     */
    @PostMapping
    public ResponseEntity<Skill> createSkill(@Valid @RequestBody Skill skill) {
        try {
            Skill createdSkill = skillDAO.save(skill);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdSkill);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * PUT /api/skills/{id}
     * Update skill
     */
    @PutMapping("/{id}")
    public ResponseEntity<Void> updateSkill(
            @PathVariable("id") String skillId,
            @Valid @RequestBody Skill skill) {
        try {
            UUID id = UUID.fromString(skillId);

            if (skillDAO.existsById(id)) {
                skill.setSkillId(id);
                skillDAO.save(skill);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/skills/{id}
     * Soft delete skill (set IsActive to false)
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSkill(@PathVariable("id") String skillId) {
        try {
            UUID id = UUID.fromString(skillId);
            Optional<Skill> skillOpt = skillDAO.findById(id);

            if (skillOpt.isPresent()) {
                Skill skill = skillOpt.get();
                skill.setActive(false);
                skillDAO.save(skill);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * DELETE /api/skills/{id}/hard
     * Hard delete skill (permanent delete)
     */
    @DeleteMapping("/{id}/hard")
    public ResponseEntity<Void> hardDeleteSkill(@PathVariable("id") String skillId) {
        try {
            UUID id = UUID.fromString(skillId);

            if (skillDAO.existsById(id)) {
                skillDAO.deleteById(id);
                return ResponseEntity.ok().build();
            } else {
                return ResponseEntity.notFound().build();
            }
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
