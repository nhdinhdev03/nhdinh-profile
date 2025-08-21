package com.nhdinh.profile.utils;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

/**
 * Error Handler Utility - Xử lý lỗi thống nhất cho toàn bộ ứng dụng
 */
public class ErrorHandlerUtil {
    
    private static final Logger logger = LoggerFactory.getLogger(ErrorHandlerUtil.class);
    
    /**
     * Xử lý lỗi chung cho API endpoints
     */
    public static ResponseEntity<Object> handleApiError(Exception e, String operation, String entityName) {
        String errorMessage;
        HttpStatus status;
        
        if (e instanceof IllegalArgumentException) {
            errorMessage = e.getMessage();
            status = HttpStatus.BAD_REQUEST;
            logger.warn("Lỗi tham số không hợp lệ trong {}: {}", operation, e.getMessage());
        } else if (e instanceof IllegalStateException) {
            errorMessage = "Trạng thái không hợp lệ cho thao tác này.";
            status = HttpStatus.CONFLICT;
            logger.warn("Lỗi trạng thái trong {}: {}", operation, e.getMessage());
        } else {
            errorMessage = String.format("Không thể %s %s. Vui lòng thử lại sau.", operation, entityName);
            status = HttpStatus.INTERNAL_SERVER_ERROR;
            logger.error("Lỗi hệ thống trong {} {}: {}", operation, entityName, e.getMessage(), e);
        }
        
        return ResponseEntity.status(status)
            .body(new ErrorResponse(errorMessage, status.value()));
    }
    
    /**
     * Xử lý lỗi không tìm thấy entity
     */
    public static ResponseEntity<Object> handleNotFound(String entityName) {
        String errorMessage = String.format("Không tìm thấy %s với ID được cung cấp.", entityName);
        logger.warn("Entity không tồn tại: {}", entityName);
        return ResponseEntity.status(HttpStatus.NOT_FOUND)
            .body(new ErrorResponse(errorMessage, HttpStatus.NOT_FOUND.value()));
    }
    
    /**
     * Xử lý lỗi ID không hợp lệ
     */
    public static ResponseEntity<Object> handleInvalidId(String id, String entityName) {
        String errorMessage = String.format("ID %s không hợp lệ.", entityName);
        logger.warn("ID không hợp lệ cho {}: {}", entityName, id);
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(errorMessage, HttpStatus.BAD_REQUEST.value()));
    }
    
    /**
     * Xử lý lỗi validation
     */
    public static ResponseEntity<Object> handleValidationError(String validationMessage) {
        logger.warn("Lỗi validation: {}", validationMessage);
        return ResponseEntity.badRequest()
            .body(new ErrorResponse(validationMessage, HttpStatus.BAD_REQUEST.value()));
    }
    
    /**
     * Log success operation
     */
    public static void logSuccess(String operation, String entityName, Object id) {
        logger.info("Thành công {}: {} với ID: {}", operation, entityName, id);
    }
    
    /**
     * Log operation start
     */
    public static void logOperationStart(String operation, String entityName) {
        logger.debug("Bắt đầu {}: {}", operation, entityName);
    }
    
    /**
     * Validate UUID format
     */
    public static boolean isValidUUID(String uuid) {
        if (uuid == null) return false;
        try {
            java.util.UUID.fromString(uuid);
            return true;
        } catch (IllegalArgumentException e) {
            return false;
        }
    }
}
