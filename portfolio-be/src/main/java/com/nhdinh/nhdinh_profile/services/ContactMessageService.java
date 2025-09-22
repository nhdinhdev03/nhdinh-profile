package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.ContactMessage.ContactMessage;
import com.nhdinh.nhdinh_profile.modules.ContactMessage.ContactMessageDAO;

@Service
@Transactional
public class ContactMessageService {
    
    private final ContactMessageDAO contactMessageDAO;
    
    public ContactMessageService(ContactMessageDAO contactMessageDAO) {
        this.contactMessageDAO = contactMessageDAO;
    }
    
    /**
     * Lấy tất cả messages chưa reply
     */
    public List<ContactMessage> findUnrepliedMessages() {
        return contactMessageDAO.findUnrepliedMessages();
    }
    
    /**
     * Lấy messages đã reply
     */
    public List<ContactMessage> findRepliedMessages() {
        return contactMessageDAO.findRepliedMessages();
    }
    
    /**
     * Lấy messages theo email
     */
    public List<ContactMessage> findByEmail(String email) {
        return contactMessageDAO.findByEmail(email);
    }
    
    /**
     * Lấy messages với phân trang
     */
    public Page<ContactMessage> findAllWithPagination(Pageable pageable) {
        return contactMessageDAO.findAllWithPagination(pageable);
    }
    
    /**
     * Tìm kiếm messages theo content hoặc subject
     */
    public List<ContactMessage> searchMessages(String keyword) {
        return contactMessageDAO.searchMessages(keyword);
    }
    
    /**
     * Đếm messages chưa reply
     */
    public Long countUnrepliedMessages() {
        return contactMessageDAO.countUnrepliedMessages();
    }
    
    /**
     * Lưu ContactMessage
     */
    public ContactMessage save(ContactMessage contactMessage) {
        return contactMessageDAO.save(contactMessage);
    }
    
    /**
     * Tìm ContactMessage theo ID
     */
    public Optional<ContactMessage> findById(UUID messageId) {
        return contactMessageDAO.findById(messageId);
    }
    
    /**
     * Xóa ContactMessage theo ID
     */
    public void deleteById(UUID messageId) {
        contactMessageDAO.deleteById(messageId);
    }
    
    /**
     * Lấy tất cả ContactMessages
     */
    public List<ContactMessage> findAll() {
        return contactMessageDAO.findAll();
    }
}



