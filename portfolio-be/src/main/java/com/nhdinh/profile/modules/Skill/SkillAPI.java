package com.nhdinh.profile.modules.Skill;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
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

import com.nhdinh.profile.utils.ErrorResponse;
import com.nhdinh.profile.utils.SuccessResponse;

import jakarta.validation.Valid;

/**
 * Skill REST API Controller
 * Handles HTTP requests for skill operations with professional error handling
 */
@RestController
@RequestMapping("/api/skills")
@CrossOrigin(origins = "*")
public class SkillAPI {

    private static final Logger logger = LoggerFactory.getLogger(SkillAPI.class);
    private final SkillDAO skillDAO;

    public SkillAPI(SkillDAO skillDAO) {
        this.skillDAO = skillDAO;
    }

    /**
     * GET /api/skills/active/all - Get all active skills
     */
    @GetMapping("/active/all")
    public ResponseEntity<Object> getAllActiveSkills() {
        try {
            List<Skill> skills = skillDAO.getAllActiveSkills();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy danh sách kỹ năng đang hoạt động: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải danh sách kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * GET /api/skills/all - Get all skills (including inactive)
     */
    @GetMapping("/all")
    public ResponseEntity<Object> getAllSkills() {
        try {
            List<Skill> skills = skillDAO.getAllSkills();
            return ResponseEntity.ok(skills);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy tất cả kỹ năng: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải danh sách kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * GET /api/skills/category/{categoryId} - Get skills by category ID
     */
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Object> getSkillsByCategory(@PathVariable("categoryId") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            List<Skill> skills = skillDAO.getSkillsByCategory(id);
            return ResponseEntity.ok(skills);
        } catch (IllegalArgumentException e) {
            logger.warn("ID danh mục kỹ năng không hợp lệ: {}", categoryId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID danh mục không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi lấy kỹ năng theo danh mục {}: {}", categoryId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải kỹ năng theo danh mục. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * GET /api/skills/{id} - Get skill by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getSkillById(@PathVariable("id") String skillId) {
        try {
            UUID id = UUID.fromString(skillId);
            Optional<Skill> skill = skillDAO.findById(id);

            if (skill.isPresent()) {
                return ResponseEntity.ok(skill.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy kỹ năng với ID được cung cấp.", 
                        HttpStatus.NOT_FOUND.value()));
            }
        } catch (IllegalArgumentException e) {
            logger.warn("ID kỹ năng không hợp lệ: {}", skillId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID kỹ năng không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi lấy kỹ năng với ID {}: {}", skillId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải thông tin kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * POST /api/skills - Create new skill
     */
    @PostMapping
    public ResponseEntity<Object> createSkill(@Valid @RequestBody Skill skill) {
        try {
            Skill savedSkill = skillDAO.save(skill);
            logger.info("Đã tạo kỹ năng mới: {} (ID: {})", savedSkill.getName(), savedSkill.getSkillId());
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SuccessResponse<>("Tạo kỹ năng thành công.", savedSkill, HttpStatus.CREATED.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi tạo kỹ năng mới: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tạo kỹ năng mới. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * PUT /api/skills/{id} - Update existing skill
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSkill(@PathVariable("id") String skillId, @Valid @RequestBody Skill skill) {
        try {
            UUID id = UUID.fromString(skillId);
            
            if (!skillDAO.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy kỹ năng để cập nhật.", 
                        HttpStatus.NOT_FOUND.value()));
            }

            skill.setSkillId(id);
            Skill updatedSkill = skillDAO.save(skill);
            logger.info("Đã cập nhật kỹ năng: {} (ID: {})", updatedSkill.getName(), updatedSkill.getSkillId());
            return ResponseEntity.ok(new SuccessResponse<>("Cập nhật kỹ năng thành công.", updatedSkill, HttpStatus.OK.value()));
        } catch (IllegalArgumentException e) {
            logger.warn("ID kỹ năng không hợp lệ khi cập nhật: {}", skillId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID kỹ năng không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi cập nhật kỹ năng với ID {}: {}", skillId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể cập nhật kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }

    /**
     * DELETE /api/skills/{id} - Delete skill by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSkill(@PathVariable("id") String skillId) {
        try {
            UUID id = UUID.fromString(skillId);
            
            if (!skillDAO.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy kỹ năng để xóa.", 
                        HttpStatus.NOT_FOUND.value()));
            }

            skillDAO.deleteById(id);
            logger.info("Đã xóa kỹ năng với ID: {}", skillId);
            return ResponseEntity.ok(new SuccessResponse<>("Xóa kỹ năng thành công.", null, HttpStatus.OK.value()));
        } catch (IllegalArgumentException e) {
            logger.warn("ID kỹ năng không hợp lệ khi xóa: {}", skillId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID kỹ năng không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi xóa kỹ năng với ID {}: {}", skillId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể xóa kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
