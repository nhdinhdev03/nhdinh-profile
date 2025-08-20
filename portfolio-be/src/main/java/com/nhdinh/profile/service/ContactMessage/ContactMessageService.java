package com.nhdinh.profile.service.ContactMessage;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.ContactMessage.ContactMessage;
import com.nhdinh.profile.modules.ContactMessage.ContactMessageDAO;
import com.nhdinh.profile.modules.ContactMessage.ContactMessageMonthlyStats;
import com.nhdinh.profile.modules.ContactMessage.EmailDomainStats;
import com.nhdinh.profile.request.ContactMessage.ContactMessageRequest;
import com.nhdinh.profile.response.ContactMessage.ContactMessageStatsResponse;
import com.nhdinh.profile.response.ContactMessage.ContactMessageSummaryResponse;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class ContactMessageService {
    
    @Autowired
    private ContactMessageDAO contactMessageDAO;
    
    // Create new contact message
    public ContactMessage createContactMessage(ContactMessageRequest request) {
        // Check for recent duplicate messages to prevent spam
        LocalDateTime oneHourAgo = LocalDateTime.now().minusHours(1);
        boolean hasRecentMessage = contactMessageDAO.hasRecentMessageFromEmail(request.getEmail(), oneHourAgo);
        
        if (hasRecentMessage) {
            throw new IllegalArgumentException("You have already sent a message recently. Please wait before sending another message.");
        }
        
        // Check for potential duplicates (same content within 24 hours)
        if (request.getSubject() != null && request.getMessage() != null) {
            LocalDateTime oneDayAgo = LocalDateTime.now().minusDays(1);
            List<ContactMessage> duplicates = contactMessageDAO.findPotentialDuplicates(
                request.getEmail(), 
                request.getSubject(), 
                request.getMessage(), 
                oneDayAgo
            );
            
            if (!duplicates.isEmpty()) {
                throw new IllegalArgumentException("A similar message has already been sent recently.");
            }
        }
        
        ContactMessage contactMessage = new ContactMessage(
            request.getName(),
            request.getEmail(),
            request.getSubject(),
            request.getMessage()
        );
        
        return contactMessageDAO.save(contactMessage);
    }
    
    // Get all contact messages
    public List<ContactMessage> getAllContactMessages() {
        return contactMessageDAO.findAllByOrderByCreatedAtDesc();
    }
    
    // Get contact message by ID
    public Optional<ContactMessage> getContactMessageById(UUID id) {
        return contactMessageDAO.findById(id);
    }
    
    // Get pending messages (not replied)
    public List<ContactMessage> getPendingMessages() {
        return contactMessageDAO.findByIsRepliedFalseOrderByCreatedAtDesc();
    }
    
    // Get replied messages
    public List<ContactMessage> getRepliedMessages() {
        return contactMessageDAO.findByIsRepliedTrueOrderByCreatedAtDesc();
    }
    
    // Mark message as replied
    public ContactMessage markAsReplied(UUID messageId) {
        Optional<ContactMessage> contactMessage = contactMessageDAO.findById(messageId);
        if (!contactMessage.isPresent()) {
            throw new IllegalArgumentException("Contact message not found");
        }
        
        ContactMessage message = contactMessage.get();
        message.markAsReplied();
        return contactMessageDAO.save(message);
    }
    
    // Mark message as unreplied
    public ContactMessage markAsUnreplied(UUID messageId) {
        Optional<ContactMessage> contactMessage = contactMessageDAO.findById(messageId);
        if (!contactMessage.isPresent()) {
            throw new IllegalArgumentException("Contact message not found");
        }
        
        ContactMessage message = contactMessage.get();
        message.markAsUnreplied();
        return contactMessageDAO.save(message);
    }
    
    // Delete contact message
    public void deleteContactMessage(UUID messageId) {
        if (!contactMessageDAO.existsById(messageId)) {
            throw new IllegalArgumentException("Contact message not found");
        }
        contactMessageDAO.deleteById(messageId);
    }
    
    // Search contact messages
    public List<ContactMessage> searchContactMessages(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllContactMessages();
        }
        return contactMessageDAO.searchByKeyword(keyword.trim());
    }
    
    // Get messages by email
    public List<ContactMessage> getMessagesByEmail(String email) {
        return contactMessageDAO.findByEmailIgnoreCaseOrderByCreatedAtDesc(email);
    }
    
    // Get recent messages (last N days)
    public List<ContactMessage> getRecentMessages(int days) {
        LocalDateTime sinceDate = LocalDateTime.now().minusDays(days);
        return contactMessageDAO.findRecentMessages(sinceDate);
    }
    
    // Get messages by date range
    public List<ContactMessage> getMessagesByDateRange(LocalDateTime startDate, LocalDateTime endDate) {
        return contactMessageDAO.findByCreatedAtBetween(startDate, endDate);
    }
    
    // Get messages by year
    public List<ContactMessage> getMessagesByYear(int year) {
        return contactMessageDAO.findByCreatedAtYear(year);
    }
    
    // Get messages by year and month
    public List<ContactMessage> getMessagesByYearAndMonth(int year, int month) {
        return contactMessageDAO.findByCreatedAtYearAndMonth(year, month);
    }
    
    // Count pending messages
    public long countPendingMessages() {
        return contactMessageDAO.countByIsRepliedFalse();
    }
    
    // Count replied messages
    public long countRepliedMessages() {
        return contactMessageDAO.countByIsRepliedTrue();
    }
    
    // Count total messages
    public long countTotalMessages() {
        return contactMessageDAO.count();
    }
    
    // Count messages from specific email
    public long countMessagesByEmail(String email) {
        return contactMessageDAO.countByEmailIgnoreCase(email);
    }
    
    // Get message statistics
    public ContactMessageStatsResponse getMessageStatistics() {
        long totalMessages = countTotalMessages();
        long pendingMessages = countPendingMessages();
        long repliedMessages = countRepliedMessages();
        
        // Get recent activity (last 7 days)
        List<ContactMessage> recentMessages = getRecentMessages(7);
        long recentCount = recentMessages.size();
        
        // Get this month's messages
        LocalDateTime startOfMonth = LocalDateTime.now().withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfMonth = startOfMonth.plusMonths(1).minusSeconds(1);
        long thisMonthCount = contactMessageDAO.countByCreatedAtBetween(startOfMonth, endOfMonth);
        
        return new ContactMessageStatsResponse(
            totalMessages,
            pendingMessages,
            repliedMessages,
            recentCount,
            thisMonthCount
        );
    }
    
    // Get monthly statistics
    public List<ContactMessageMonthlyStats> getMonthlyStatistics() {
        List<Object[]> results = contactMessageDAO.getMessageStatsByMonth();
        return results.stream()
                .map(result -> {
                    Integer year = (Integer) result[0];
                    Integer month = (Integer) result[1];
                    Long messageCount = (Long) result[2];
                    return new ContactMessageMonthlyStats(year, month, messageCount);
                })
                .collect(Collectors.toList());
    }
    
    // Get top email domains
    public List<EmailDomainStats> getTopEmailDomains() {
        List<Object[]> results = contactMessageDAO.getTopEmailDomains();
        return results.stream()
                .map(result -> {
                    String domain = (String) result[0];
                    Long count = (Long) result[1];
                    return new EmailDomainStats(domain, count);
                })
                .collect(Collectors.toList());
    }
    
    // Batch mark as replied
    public List<ContactMessage> batchMarkAsReplied(List<UUID> messageIds) {
        return messageIds.stream()
                .map(this::markAsReplied)
                .collect(Collectors.toList());
    }
    
    // Batch delete messages
    public void batchDeleteMessages(List<UUID> messageIds) {
        messageIds.forEach(this::deleteContactMessage);
    }
    
    // Check if email has sent message recently (for rate limiting)
    public boolean hasRecentMessageFromEmail(String email, int hours) {
        LocalDateTime sinceTime = LocalDateTime.now().minusHours(hours);
        return contactMessageDAO.hasRecentMessageFromEmail(email, sinceTime);
    }
    
    // Get contact message summary for admin dashboard
    public ContactMessageSummaryResponse getContactMessageSummary() {
        List<ContactMessage> pendingMessages = getPendingMessages();
        List<ContactMessage> recentMessages = getRecentMessages(7);
        ContactMessageStatsResponse stats = getMessageStatistics();
        
        return new ContactMessageSummaryResponse(
            pendingMessages.stream().limit(5).collect(Collectors.toList()),
            recentMessages.stream().limit(10).collect(Collectors.toList()),
            stats
        );
    }
}
