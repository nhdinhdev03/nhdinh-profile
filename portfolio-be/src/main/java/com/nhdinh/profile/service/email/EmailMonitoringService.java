package com.nhdinh.profile.service.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import java.time.LocalDateTime;
import java.util.concurrent.atomic.AtomicLong;

/**
 * Email Monitoring Service - Theo dõi và ghi log email activities
 */
@Service
public class EmailMonitoringService {
    
    private static final Logger logger = LoggerFactory.getLogger(EmailMonitoringService.class);
    
    // Counters
    private final AtomicLong totalEmailsSent = new AtomicLong(0);
    private final AtomicLong totalEmailsFailed = new AtomicLong(0);
    private final AtomicLong contactNotificationsSent = new AtomicLong(0);
    private final AtomicLong confirmationEmailsSent = new AtomicLong(0);
    private final AtomicLong replyEmailsSent = new AtomicLong(0);
    private final AtomicLong systemNotificationsSent = new AtomicLong(0);
    
    /**
     * Log email thành công
     */
    public void logEmailSent(String emailType, String recipient, String subject) {
        totalEmailsSent.incrementAndGet();
        
        switch (emailType.toLowerCase()) {
            case "contact_notification" -> contactNotificationsSent.incrementAndGet();
            case "confirmation" -> confirmationEmailsSent.incrementAndGet();
            case "reply" -> replyEmailsSent.incrementAndGet();
            case "system" -> systemNotificationsSent.incrementAndGet();
        }
        
        logger.info("Email gửi thành công - Loại: {}, Đến: {}, Chủ đề: '{}', Tổng đã gửi: {}", 
                   emailType, maskEmail(recipient), subject, totalEmailsSent.get());
    }
    
    /**
     * Log email thất bại
     */
    public void logEmailFailed(String emailType, String recipient, String subject, Exception error) {
        totalEmailsFailed.incrementAndGet();
        
        logger.error("Email gửi thất bại - Loại: {}, Đến: {}, Chủ đề: '{}', Lỗi: {}, Tổng thất bại: {}", 
                    emailType, maskEmail(recipient), subject, error.getMessage(), totalEmailsFailed.get());
    }
    
    /**
     * Log bắt đầu gửi email
     */
    public void logEmailStart(String emailType, String recipient, String subject) {
        logger.debug("Bắt đầu gửi email - Loại: {}, Đến: {}, Chủ đề: '{}'", 
                   emailType, maskEmail(recipient), subject);
    }
    
    /**
     * Che giấu email để bảo mật (ví dụ: u***@gmail.com)
     */
    private String maskEmail(String email) {
        if (email == null || email.length() < 3) return "***";
        
        int atIndex = email.indexOf('@');
        if (atIndex <= 0) return "***";
        
        String localPart = email.substring(0, atIndex);
        String domain = email.substring(atIndex);
        
        if (localPart.length() <= 2) {
            return localPart.charAt(0) + "***" + domain;
        } else {
            return localPart.charAt(0) + "***" + localPart.charAt(localPart.length() - 1) + domain;
        }
    }
    
    /**
     * Lấy thống kê email
     */
    public EmailStats getEmailStats() {
        return new EmailStats(
            totalEmailsSent.get(),
            totalEmailsFailed.get(),
            contactNotificationsSent.get(),
            confirmationEmailsSent.get(),
            replyEmailsSent.get(),
            systemNotificationsSent.get(),
            LocalDateTime.now()
        );
    }
    
    /**
     * Log thống kê email
     */
    public void logEmailStats() {
        EmailStats stats = getEmailStats();
        logger.info("""
                THỐNG KÊ EMAIL:
                Đã gửi thành công: {}
                Gửi thất bại: {}
                Thông báo liên hệ: {}
                Email xác nhận: {}
                Email phản hồi: {}
                Thông báo hệ thống: {}
                Thời gian tạo báo cáo: {}
                """, 
                stats.totalSent(), stats.totalFailed(), stats.contactNotifications(),
                stats.confirmations(), stats.replies(), stats.systemNotifications(),
                stats.timestamp());
    }
    
    /**
     * Reset counters (cho testing hoặc maintenance)
     */
    public void resetCounters() {
        totalEmailsSent.set(0);
        totalEmailsFailed.set(0);
        contactNotificationsSent.set(0);
        confirmationEmailsSent.set(0);
        replyEmailsSent.set(0);
        systemNotificationsSent.set(0);
        
        logger.info("Đã reset tất cả bộ đếm thống kê email");
    }
    
    /**
     * Kiểm tra tỷ lệ thành công
     */
    public double getSuccessRate() {
        long total = totalEmailsSent.get() + totalEmailsFailed.get();
        if (total == 0) return 100.0;
        return (double) totalEmailsSent.get() / total * 100.0;
    }
    
    /**
     * Log performance metrics
     */
    public void logPerformanceMetric(String operation, long durationMs) {
        if (durationMs > 5000) { // Cảnh báo nếu mất quá 5 giây
            logger.warn("Hoạt động email chậm - {}: {}ms", operation, durationMs);
        } else {
            logger.debug("Thời gian thực hiện email - {}: {}ms", operation, durationMs);
        }
    }
    
    /**
     * Record class cho email statistics
     */
    public record EmailStats(
        long totalSent,
        long totalFailed, 
        long contactNotifications,
        long confirmations,
        long replies,
        long systemNotifications,
        LocalDateTime timestamp
    ) {}
}
