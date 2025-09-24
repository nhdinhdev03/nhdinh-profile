package com.nhdinh.nhdinh_profile.modules.ContactMessage;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.services.ContactMessageService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/contact-messages")
@CrossOrigin(origins = "*", maxAge = 3600)
public class ContactMessageAPI {

    private final ContactMessageService contactMessageService;

    public ContactMessageAPI(ContactMessageService contactMessageService) {
        this.contactMessageService = contactMessageService;
    }

    /**
     * Lấy tất cả messages với pagination
     */
    @GetMapping("/all")
    public ResponseEntity<Page<ContactMessage>> getAllMessages(Pageable pageable) {
        try {
            Page<ContactMessage> messages = contactMessageService.findAllWithPagination(pageable);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy message theo ID
     */
    @GetMapping("/{id}")
    public ResponseEntity<ContactMessage> getMessageById(@PathVariable UUID id) {
        try {
            Optional<ContactMessage> message = contactMessageService.findById(id);
            return message.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy messages chưa reply
     */
    @GetMapping("/unreplied")
    public ResponseEntity<List<ContactMessage>> getUnrepliedMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.findUnrepliedMessages();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy messages đã reply
     */
    @GetMapping("/replied")
    public ResponseEntity<List<ContactMessage>> getRepliedMessages() {
        try {
            List<ContactMessage> messages = contactMessageService.findRepliedMessages();
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy messages theo email
     */
    @GetMapping("/email/{email}")
    public ResponseEntity<List<ContactMessage>> getMessagesByEmail(@PathVariable String email) {
        try {
            List<ContactMessage> messages = contactMessageService.findByEmail(email);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tìm kiếm messages
     */
    @GetMapping("/search")
    public ResponseEntity<List<ContactMessage>> searchMessages(@RequestParam String keyword) {
        try {
            List<ContactMessage> messages = contactMessageService.searchMessages(keyword);
            return ResponseEntity.ok(messages);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Đếm messages chưa reply
     */
    @GetMapping("/count/unreplied")
    public ResponseEntity<Long> countUnrepliedMessages() {
        try {
            Long count = contactMessageService.countUnrepliedMessages();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo message mới (form liên hệ)
     */
    @PostMapping
    public ResponseEntity<ContactMessage> createMessage(@Valid @RequestBody ContactMessage message) {
        try {
            ContactMessage createdMessage = contactMessageService.save(message);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdMessage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật message (chủ yếu để mark as replied)
     */
    @PutMapping("/{id}")
    public ResponseEntity<ContactMessage> updateMessage(@PathVariable UUID id, 
                                                       @Valid @RequestBody ContactMessage message) {
        try {
            Optional<ContactMessage> existingMessage = contactMessageService.findById(id);
            if (existingMessage.isPresent()) {
                message.setMessageId(id);
                ContactMessage updatedMessage = contactMessageService.save(message);
                return ResponseEntity.ok(updatedMessage);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Xóa message
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteMessage(@PathVariable UUID id) {
        try {
            Optional<ContactMessage> existingMessage = contactMessageService.findById(id);
            if (existingMessage.isPresent()) {
                contactMessageService.deleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}