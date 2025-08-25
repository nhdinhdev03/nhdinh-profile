package com.nhdinh.profile.modules.SkillCategory;

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
 * SkillCategory REST API Controller
 * Handles HTTP requests for skill category operations with professional error handling
 */
@RestController
@RequestMapping("/api/skill-categories")
@CrossOrigin(origins = "*")
public class SkillCategoryAPI {
    
    private static final Logger logger = LoggerFactory.getLogger(SkillCategoryAPI.class);
    private final SkillCategoryDAO skillCategoryDAO;
    
    public SkillCategoryAPI(SkillCategoryDAO skillCategoryDAO) {
        this.skillCategoryDAO = skillCategoryDAO;
    }
    
    /**
     * GET /api/skill-categories/active/all - Get all active skill categories
     */
    @GetMapping("/active/all")
    public ResponseEntity<Object> getAllActiveCategories() {
        try {
            List<SkillCategory> categories = skillCategoryDAO.getAllActiveCategories();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy danh sách danh mục kỹ năng đang hoạt động: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải danh mục kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * GET /api/skill-categories/all - Get all skill categories (including inactive)
     */
    @GetMapping("/all")
    public ResponseEntity<Object> getAllSkillCategories() {
        try {
            List<SkillCategory> categories = skillCategoryDAO.findAll();
            return ResponseEntity.ok(categories);
        } catch (Exception e) {
            logger.error("Lỗi khi lấy tất cả danh mục kỹ năng: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải danh mục kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * GET /api/skill-categories/{id} - Get skill category by ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<Object> getSkillCategoryById(@PathVariable("id") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            Optional<SkillCategory> category = skillCategoryDAO.findById(id);
            
            if (category.isPresent()) {
                return ResponseEntity.ok(category.get());
            } else {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy danh mục kỹ năng với ID được cung cấp.", 
                        HttpStatus.NOT_FOUND.value()));
            }
        } catch (IllegalArgumentException e) {
            logger.warn("ID danh mục kỹ năng không hợp lệ: {}", categoryId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID danh mục không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi lấy danh mục kỹ năng với ID {}: {}", categoryId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tải thông tin danh mục kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * POST /api/skill-categories/create - Create new skill category
     */
    @PostMapping("/create")
    public ResponseEntity<Object> createSkillCategory(@Valid @RequestBody SkillCategory skillCategory) {
        try {
            SkillCategory savedCategory = skillCategoryDAO.save(skillCategory);
            logger.info("Đã tạo danh mục kỹ năng mới: {} (ID: {})", savedCategory.getName(), savedCategory.getCategoryId());
            return ResponseEntity.status(HttpStatus.CREATED)
                .body(new SuccessResponse<>("Tạo danh mục kỹ năng thành công.", savedCategory, HttpStatus.CREATED.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi tạo danh mục kỹ năng mới: {}", e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể tạo danh mục kỹ năng mới. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * PUT /api/skill-categories/{id} - Update existing skill category
     */
    @PutMapping("/{id}")
    public ResponseEntity<Object> updateSkillCategory(@PathVariable("id") String categoryId, 
            @Valid @RequestBody SkillCategory skillCategory) {
        try {
            UUID id = UUID.fromString(categoryId);
            
            if (!skillCategoryDAO.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy danh mục kỹ năng để cập nhật.", 
                        HttpStatus.NOT_FOUND.value()));
            }
            
            skillCategory.setCategoryId(id);
            SkillCategory updatedCategory = skillCategoryDAO.save(skillCategory);
            logger.info("Đã cập nhật danh mục kỹ năng: {} (ID: {})", updatedCategory.getName(), updatedCategory.getCategoryId());
            return ResponseEntity.ok(new SuccessResponse<>("Cập nhật danh mục kỹ năng thành công.", updatedCategory, HttpStatus.OK.value()));
        } catch (IllegalArgumentException e) {
            logger.warn("ID danh mục kỹ năng không hợp lệ khi cập nhật: {}", categoryId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID danh mục không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi cập nhật danh mục kỹ năng với ID {}: {}", categoryId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể cập nhật danh mục kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
    
    /**
     * DELETE /api/skill-categories/{id} - Delete skill category by ID
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteSkillCategory(@PathVariable("id") String categoryId) {
        try {
            UUID id = UUID.fromString(categoryId);
            
            if (!skillCategoryDAO.existsById(id)) {
                return ResponseEntity.status(HttpStatus.NOT_FOUND)
                    .body(new ErrorResponse("Không tìm thấy danh mục kỹ năng để xóa.", 
                        HttpStatus.NOT_FOUND.value()));
            }
            
            skillCategoryDAO.deleteById(id);
            logger.info("Đã xóa danh mục kỹ năng với ID: {}", categoryId);
            return ResponseEntity.ok(new SuccessResponse<>("Xóa danh mục kỹ năng thành công.", null, HttpStatus.OK.value()));
        } catch (IllegalArgumentException e) {
            logger.warn("ID danh mục kỹ năng không hợp lệ khi xóa: {}", categoryId);
            return ResponseEntity.badRequest()
                .body(new ErrorResponse("ID danh mục không hợp lệ.", HttpStatus.BAD_REQUEST.value()));
        } catch (Exception e) {
            logger.error("Lỗi khi xóa danh mục kỹ năng với ID {}: {}", categoryId, e.getMessage(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                .body(new ErrorResponse("Không thể xóa danh mục kỹ năng. Vui lòng thử lại sau.", 
                    HttpStatus.INTERNAL_SERVER_ERROR.value()));
        }
    }
}
