package com.nhdinh.profile.modules.ContactMessage;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

@Repository
public interface ContactMessageDAO extends JpaRepository<ContactMessage, UUID> {
    
    // Find all messages ordered by creation date (newest first)
    List<ContactMessage> findAllByOrderByCreatedAtDesc();
    
    // Find pending messages (not replied)
    List<ContactMessage> findByIsRepliedFalseOrderByCreatedAtDesc();
    
    // Find replied messages
    List<ContactMessage> findByIsRepliedTrueOrderByCreatedAtDesc();
    
    // Find messages by email
    List<ContactMessage> findByEmailIgnoreCaseOrderByCreatedAtDesc(String email);
    
    // Find messages by full name containing keyword (case insensitive)
    @Query("SELECT cm FROM ContactMessage cm WHERE LOWER(cm.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) ORDER BY cm.createdAt DESC")
    List<ContactMessage> findByFullNameContainingIgnoreCase(@Param("keyword") String keyword);
    
    // Search messages by keyword in name, email, subject, or content
    @Query("SELECT cm FROM ContactMessage cm WHERE " +
           "LOWER(cm.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(cm.email) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(cm.subject) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(cm.content) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY cm.createdAt DESC")
    List<ContactMessage> searchByKeyword(@Param("keyword") String keyword);
    
    // Find messages by date range
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.createdAt BETWEEN :startDate AND :endDate ORDER BY cm.createdAt DESC")
    List<ContactMessage> findByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                               @Param("endDate") LocalDateTime endDate);
    
    // Find recent messages (last N days)
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.createdAt >= :sinceDate ORDER BY cm.createdAt DESC")
    List<ContactMessage> findRecentMessages(@Param("sinceDate") LocalDateTime sinceDate);
    
    // Count pending messages
    long countByIsRepliedFalse();
    
    // Count replied messages
    long countByIsRepliedTrue();
    
    // Count messages from specific email
    long countByEmailIgnoreCase(String email);
    
    // Count messages in date range
    @Query("SELECT COUNT(cm) FROM ContactMessage cm WHERE cm.createdAt BETWEEN :startDate AND :endDate")
    long countByCreatedAtBetween(@Param("startDate") LocalDateTime startDate, 
                                @Param("endDate") LocalDateTime endDate);
    
    // Find messages by year
    @Query("SELECT cm FROM ContactMessage cm WHERE YEAR(cm.createdAt) = :year ORDER BY cm.createdAt DESC")
    List<ContactMessage> findByCreatedAtYear(@Param("year") int year);
    
    // Find messages by year and month
    @Query("SELECT cm FROM ContactMessage cm WHERE YEAR(cm.createdAt) = :year AND MONTH(cm.createdAt) = :month ORDER BY cm.createdAt DESC")
    List<ContactMessage> findByCreatedAtYearAndMonth(@Param("year") int year, @Param("month") int month);
    
    // Get message statistics by month
    @Query("SELECT YEAR(cm.createdAt) as year, MONTH(cm.createdAt) as month, COUNT(cm) as messageCount " +
           "FROM ContactMessage cm " +
           "GROUP BY YEAR(cm.createdAt), MONTH(cm.createdAt) " +
           "ORDER BY year DESC, month DESC")
    List<Object[]> getMessageStatsByMonth();
    
    // Get top email domains
    @Query("SELECT SUBSTRING(cm.email, CHARINDEX('@', cm.email) + 1, LEN(cm.email)) as domain, COUNT(cm) as count " +
           "FROM ContactMessage cm " +
           "GROUP BY SUBSTRING(cm.email, CHARINDEX('@', cm.email) + 1, LEN(cm.email)) " +
           "ORDER BY count DESC")
    List<Object[]> getTopEmailDomains();
    
    // Check if email has sent message recently (within last N hours)
    @Query("SELECT COUNT(cm) > 0 FROM ContactMessage cm WHERE LOWER(cm.email) = LOWER(:email) AND cm.createdAt >= :sinceTime")
    boolean hasRecentMessageFromEmail(@Param("email") String email, @Param("sinceTime") LocalDateTime sinceTime);
    
    // Find duplicate messages (same email, subject, and content within timeframe)
    @Query("SELECT cm FROM ContactMessage cm WHERE " +
           "LOWER(cm.email) = LOWER(:email) AND " +
           "LOWER(cm.subject) = LOWER(:subject) AND " +
           "LOWER(cm.content) = LOWER(:content) AND " +
           "cm.createdAt >= :sinceTime " +
           "ORDER BY cm.createdAt DESC")
    List<ContactMessage> findPotentialDuplicates(@Param("email") String email, 
                                                @Param("subject") String subject, 
                                                @Param("content") String content, 
                                                @Param("sinceTime") LocalDateTime sinceTime);
}
