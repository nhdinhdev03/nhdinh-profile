package com.nhdinh.nhdinh_profile.modules.ContactMessage;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

/**
 * JpaRepository interface for ContactMessage entity
 */
@Repository
public interface ContactMessageDAO extends JpaRepository<ContactMessage, UUID> {
    
    /**
     * Lấy tất cả messages chưa reply
     */
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.isReplied = false ORDER BY cm.createdAt DESC")
    List<ContactMessage> findUnrepliedMessages();
    
    /**
     * Lấy messages đã reply
     */
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.isReplied = true ORDER BY cm.createdAt DESC")
    List<ContactMessage> findRepliedMessages();
    
    /**
     * Lấy messages theo email
     */
    @Query("SELECT cm FROM ContactMessage cm WHERE cm.email = :email ORDER BY cm.createdAt DESC")
    List<ContactMessage> findByEmail(@Param("email") String email);
    
    /**
     * Lấy messages với phân trang
     */
    @Query("SELECT cm FROM ContactMessage cm ORDER BY cm.createdAt DESC")
    Page<ContactMessage> findAllWithPagination(Pageable pageable);
    
    /**
     * Tìm kiếm messages theo content hoặc subject
     */
    @Query("SELECT cm FROM ContactMessage cm WHERE " +
           "LOWER(cm.content) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(cm.subject) LIKE LOWER(CONCAT('%', :keyword, '%')) OR " +
           "LOWER(cm.fullName) LIKE LOWER(CONCAT('%', :keyword, '%')) " +
           "ORDER BY cm.createdAt DESC")
    List<ContactMessage> searchMessages(@Param("keyword") String keyword);
    
    /**
     * Đếm messages chưa reply
     */
    @Query("SELECT COUNT(cm) FROM ContactMessage cm WHERE cm.isReplied = false")
    Long countUnrepliedMessages();
}