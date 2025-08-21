package com.nhdinh.profile.modules.ContactMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nhdinh.profile.request.ContactMessage.ContactMessageRequest;
import com.nhdinh.profile.response.ContactMessage.ContactMessageStatsResponse;
import com.nhdinh.profile.response.ContactMessage.ContactMessageSummaryResponse;
import com.nhdinh.profile.service.ContactMessage.ContactMessageService;
import com.nhdinh.profile.utils.ErrorResponse;
import com.nhdinh.profile.utils.SuccessResponse;

import jakarta.validation.Valid;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/contact-messages")
@CrossOrigin(origins = "*")
public class ContactMessageAPI {
    
    @Autowired
    private ContactMessageService contactMessageService;
    
    // Submit new contact message (public endpoint)
    @PostMapping("/submit")
    public ResponseEntity<Object> submitContactMessage(@Valid @RequestBody ContactMessageRequest request) {
        try {
            ContactMessage contactMessage = contactMessageService.createContactMessage(request);
            SuccessResponse<ContactMessage> successResponse = new SuccessResponse<>(
                "Gửi tin nhắn thành công! Chúng tôi sẽ phản hồi bạn sớm nhất có thể.", 
                contactMessage, 
                HttpStatus.CREATED.value()
            );
            return ResponseEntity.status(HttpStatus.CREATED).body(successResponse);
        } catch (IllegalArgumentException e) {
            ErrorResponse errorResponse = new ErrorResponse(e.getMessage(), HttpStatus.BAD_REQUEST.value());
            return ResponseEntity.badRequest().body(errorResponse);
        } catch (Exception e) {
            ErrorResponse errorResponse = new ErrorResponse("Đã xảy ra lỗi hệ thống. Vui lòng thử lại sau.", HttpStatus.INTERNAL_SERVER_ERROR.value());
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponse);
        }
    }
    
    // Get all contact messages (admin)
    @GetMapping("/all")
    public ResponseEntity<List<ContactMessage>> getAllContactMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.getAllContactMessages();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get contact message by ID (admin)
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getContactMessageById(@PathVariable UUID id) {
        try {
            Optional<ContactMessage> message = contactMessageService.getContactMessageById(id);
            return message.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get pending messages (admin)
    @GetMapping("/pending")
    public ResponseEntity<List<ContactMessage>> getPendingMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.getPendingMessages();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get replied messages (admin)
    @GetMapping("/replied")
    public ResponseEntity<List<ContactMessage>> getRepliedMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.getRepliedMessages();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Mark message as replied (admin)
    @PutMapping("/{id}/mark-replied")
    public ResponseEntity<ContactMessage> markAsReplied(@PathVariable UUID id) {
        try {
            ContactMessage message = contactMessageService.markAsReplied(id);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Reply to contact message and send email (admin)
    @PostMapping("/{id}/reply")
    public ResponseEntity<ContactMessage> replyToMessage(
            @PathVariable UUID id, 
            @RequestBody Map<String, String> replyData) {
        try {
            String replyMessage = replyData.get("message");
            if (replyMessage == null || replyMessage.trim().isEmpty()) {
                return ResponseEntity.badRequest().build();
            }
            
            ContactMessage message = contactMessageService.replyToContactMessage(id, replyMessage);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Mark message as unreplied (admin)
    @PutMapping("/{id}/mark-unreplied")
    public ResponseEntity<ContactMessage> markAsUnreplied(@PathVariable UUID id) {
        try {
            ContactMessage message = contactMessageService.markAsUnreplied(id);
            return ResponseEntity.ok(message);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete contact message (admin)
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContactMessage(@PathVariable UUID id) {
        try {
            contactMessageService.deleteContactMessage(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Search contact messages (admin)
    @GetMapping("/search")
    public ResponseEntity<List<ContactMessage>> searchContactMessages(@RequestParam String keyword) {
        try {
            List<ContactMessage> messages = contactMessageService.searchContactMessages(keyword);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get messages by email (admin)
    @GetMapping("/by-email/{email}")
    public ResponseEntity<List<ContactMessage>> getMessagesByEmail(@PathVariable String email) {
        try {
            List<ContactMessage> messages = contactMessageService.getMessagesByEmail(email);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get recent messages (admin)
    @GetMapping("/recent")
    public ResponseEntity<List<ContactMessage>> getRecentMessages(@RequestParam(defaultValue = "7") int days) {
        try {
            List<ContactMessage> messages = contactMessageService.getRecentMessages(days);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get messages by date range (admin)
    @GetMapping("/date-range")
    public ResponseEntity<List<ContactMessage>> getMessagesByDateRange(
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime startDate,
            @RequestParam @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime endDate) {
        try {
            List<ContactMessage> messages = contactMessageService.getMessagesByDateRange(startDate, endDate);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get messages by year (admin)
    @GetMapping("/year/{year}")
    public ResponseEntity<List<ContactMessage>> getMessagesByYear(@PathVariable int year) {
        try {
            List<ContactMessage> messages = contactMessageService.getMessagesByYear(year);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get messages by year and month (admin)
    @GetMapping("/year/{year}/month/{month}")
    public ResponseEntity<List<ContactMessage>> getMessagesByYearAndMonth(@PathVariable int year, 
                                                                        @PathVariable int month) {
        try {
            List<ContactMessage> messages = contactMessageService.getMessagesByYearAndMonth(year, month);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count pending messages (admin)
    @GetMapping("/count/pending")
    public ResponseEntity<Long> countPendingMessages() {
        try {
            long count = contactMessageService.countPendingMessages();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count replied messages (admin)
    @GetMapping("/count/replied")
    public ResponseEntity<Long> countRepliedMessages() {
        try {
            long count = contactMessageService.countRepliedMessages();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count total messages (admin)
    @GetMapping("/count/total")
    public ResponseEntity<Long> countTotalMessages() {
        try {
            long count = contactMessageService.countTotalMessages();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get message statistics (admin)
    @GetMapping("/statistics")
    public ResponseEntity<ContactMessageStatsResponse> getMessageStatistics() {
        try {
            ContactMessageStatsResponse stats = contactMessageService.getMessageStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get monthly statistics (admin)
    @GetMapping("/statistics/monthly")
    public ResponseEntity<List<ContactMessageMonthlyStats>> getMonthlyStatistics() {
        try {
            List<ContactMessageMonthlyStats> stats = contactMessageService.getMonthlyStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get top email domains (admin)
    @GetMapping("/statistics/email-domains")
    public ResponseEntity<List<EmailDomainStats>> getTopEmailDomains() {
        try {
            List<EmailDomainStats> stats = contactMessageService.getTopEmailDomains();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch mark as replied (admin)
    @PutMapping("/batch/mark-replied")
    public ResponseEntity<List<ContactMessage>> batchMarkAsReplied(@RequestBody List<UUID> messageIds) {
        try {
            List<ContactMessage> messages = contactMessageService.batchMarkAsReplied(messageIds);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch delete messages (admin)
    @DeleteMapping("/batch")
    public ResponseEntity<Void> batchDeleteMessages(@RequestBody List<UUID> messageIds) {
        try {
            contactMessageService.batchDeleteMessages(messageIds);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get admin dashboard summary (admin)
    @GetMapping("/admin/summary")
    public ResponseEntity<ContactMessageSummaryResponse> getContactMessageSummary() {
        try {
            ContactMessageSummaryResponse summary = contactMessageService.getContactMessageSummary();
            return ResponseEntity.ok(summary);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Check if email has sent message recently (for rate limiting)
    @GetMapping("/check-recent/{email}")
    public ResponseEntity<Boolean> hasRecentMessageFromEmail(@PathVariable String email, 
                                                           @RequestParam(defaultValue = "1") int hours) {
        try {
            boolean hasRecent = contactMessageService.hasRecentMessageFromEmail(email, hours);
            return ResponseEntity.ok(hasRecent);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
