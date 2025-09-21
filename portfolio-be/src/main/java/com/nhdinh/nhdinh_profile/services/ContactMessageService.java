package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.ContactMessage.ContactMessage;
import com.nhdinh.nhdinh_profile.repositories.ContactMessageRepository;

@Service
@Transactional
public class ContactMessageService {
    
    private final ContactMessageRepository contactMessageRepository;
    
    public ContactMessageService(ContactMessageRepository contactMessageRepository) {
        this.contactMessageRepository = contactMessageRepository;
    }
    
    /**
     * Lấy tất cả messages chưa reply
     */
    public List<ContactMessage> findUnrepliedMessages() {
        return contactMessageRepository.findUnrepliedMessages();
    }
    
    /**
     * Lấy messages đã reply
     */
    public List<ContactMessage> findRepliedMessages() {
        return contactMessageRepository.findRepliedMessages();
    }
    
    /**
     * Lấy messages theo email
     */
    public List<ContactMessage> findByEmail(String email) {
        return contactMessageRepository.findByEmail(email);
    }
    
    /**
     * Lấy messages với phân trang
     */
    public Page<ContactMessage> findAllWithPagination(Pageable pageable) {
        return contactMessageRepository.findAllWithPagination(pageable);
    }
    
    /**
     * Tìm kiếm messages theo content hoặc subject
     */
    public List<ContactMessage> searchMessages(String keyword) {
        return contactMessageRepository.searchMessages(keyword);
    }
    
    /**
     * Đếm messages chưa reply
     */
    public Long countUnrepliedMessages() {
        return contactMessageRepository.countUnrepliedMessages();
    }
    
    /**
     * Lưu ContactMessage
     */
    public ContactMessage save(ContactMessage contactMessage) {
        return contactMessageRepository.save(contactMessage);
    }
    
    /**
     * Tìm ContactMessage theo ID
     */
    public Optional<ContactMessage> findById(UUID messageId) {
        return contactMessageRepository.findById(messageId);
    }
    
    /**
     * Xóa ContactMessage theo ID
     */
    public void deleteById(UUID messageId) {
        contactMessageRepository.deleteById(messageId);
    }
    
    /**
     * Lấy tất cả ContactMessages
     */
    public List<ContactMessage> findAll() {
        return contactMessageRepository.findAll();
    }
}