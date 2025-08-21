package com.nhdinh.profile.service.email;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;

import com.nhdinh.profile.modules.ContactMessage.ContactMessage;

import jakarta.mail.MessagingException;

import java.util.concurrent.CompletableFuture;

@Service
public class AsyncEmailService {

    private static final Logger logger = LoggerFactory.getLogger(AsyncEmailService.class);
    
    private final EmailService emailService;

    public AsyncEmailService(EmailService emailService) {
        this.emailService = emailService;
    }

    /**
     * Gửi email thông báo contact message mới một cách bất đồng bộ
     */
    @Async
    public CompletableFuture<Void> sendNewContactMessageNotificationAsync(ContactMessage contactMessage) {
        try {
            logger.info("Bắt đầu gửi email thông báo liên hệ bất đồng bộ cho: {}", contactMessage.getEmail());
            emailService.sendNewContactMessageNotification(contactMessage);
            logger.info("Gửi email thông báo liên hệ bất đồng bộ thành công");
            return CompletableFuture.completedFuture(null);
        } catch (MessagingException e) {
            logger.error("Lỗi gửi email thông báo liên hệ: {}", e.getMessage(), e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Gửi email xác nhận cho người gửi một cách bất đồng bộ
     */
    @Async
    public CompletableFuture<Void> sendContactConfirmationEmailAsync(ContactMessage contactMessage) {
        try {
            logger.info("Bắt đầu gửi email xác nhận bất đồng bộ cho: {}", contactMessage.getEmail());
            emailService.sendContactConfirmationEmail(contactMessage);
            logger.info("Gửi email xác nhận bất đồng bộ thành công");
            return CompletableFuture.completedFuture(null);
        } catch (MessagingException e) {
            logger.error("Lỗi gửi email xác nhận liên hệ: {}", e.getMessage(), e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Gửi email phản hồi một cách bất đồng bộ
     */
    @Async
    public CompletableFuture<Void> sendContactReplyEmailAsync(String toEmail, String originalSubject, 
            String originalMessage, String replyMessage) {
        try {
            logger.info("Bắt đầu gửi email phản hồi bất đồng bộ đến: {}", toEmail);
            emailService.sendContactReplyEmail(toEmail, originalSubject, originalMessage, replyMessage);
            logger.info("Gửi email phản hồi bất đồng bộ thành công");
            return CompletableFuture.completedFuture(null);
        } catch (MessagingException e) {
            logger.error("Lỗi gửi email phản hồi liên hệ: {}", e.getMessage(), e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Gửi email thông báo hệ thống một cách bất đồng bộ
     */
    @Async
    public CompletableFuture<Void> sendSystemNotificationAsync(String subject, String message) {
        try {
            logger.info("Bắt đầu gửi thông báo hệ thống bất đồng bộ: {}", subject);
            emailService.sendSystemNotification(subject, message);
            logger.info("Gửi thông báo hệ thống bất đồng bộ thành công");
            return CompletableFuture.completedFuture(null);
        } catch (MessagingException e) {
            logger.error("Lỗi gửi email thông báo hệ thống: {}", e.getMessage(), e);
            return CompletableFuture.failedFuture(e);
        }
    }

    /**
     * Gửi batch email notifications cho nhiều contact messages
     */
    @Async
    public CompletableFuture<Void> sendBatchContactNotificationsAsync(java.util.List<ContactMessage> contactMessages) {
        int successCount = 0;
        int failureCount = 0;
        
        logger.info("Bắt đầu gửi email thông báo hàng loạt cho {} tin nhắn", contactMessages.size());
        
        for (ContactMessage message : contactMessages) {
            try {
                emailService.sendNewContactMessageNotification(message);
                successCount++;
                logger.debug("Gửi thông báo hàng loạt thành công cho tin nhắn ID: {}", message.getMessageId());
            } catch (MessagingException e) {
                failureCount++;
                logger.error("Lỗi gửi thông báo cho tin nhắn ID {}: {}", 
                           message.getMessageId(), e.getMessage());
            }
        }
        
        logger.info("Hoàn thành gửi email thông báo hàng loạt. Thành công: {}, Thất bại: {}", successCount, failureCount);
        return CompletableFuture.completedFuture(null);
    }
}
