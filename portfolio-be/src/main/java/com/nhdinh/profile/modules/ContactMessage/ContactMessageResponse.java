package com.nhdinh.profile.modules.ContactMessage;

import java.time.LocalDateTime;
import java.util.UUID;

public class ContactMessageResponse {
    
    private UUID id;
    private String name;
    private String email;
    private String subject;
    private String message;
    private Boolean isReplied;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public ContactMessageResponse() {
    }
    
    public ContactMessageResponse(ContactMessage contactMessage) {
        this.id = contactMessage.getId();
        this.name = contactMessage.getName();
        this.email = contactMessage.getEmail();
        this.subject = contactMessage.getSubject();
        this.message = contactMessage.getMessage();
        this.isReplied = contactMessage.getIsReplied();
        this.createdAt = contactMessage.getCreatedAt();
        this.updatedAt = contactMessage.getUpdatedAt();
    }
    
    public ContactMessageResponse(UUID id, String name, String email, String subject, 
                                 String message, Boolean isReplied, LocalDateTime createdAt, 
                                 LocalDateTime updatedAt) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.subject = subject;
        this.message = message;
        this.isReplied = isReplied;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }
    
    // Getters and Setters
    public UUID getId() {
        return id;
    }
    
    public void setId(UUID id) {
        this.id = id;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public String getEmail() {
        return email;
    }
    
    public void setEmail(String email) {
        this.email = email;
    }
    
    public String getSubject() {
        return subject;
    }
    
    public void setSubject(String subject) {
        this.subject = subject;
    }
    
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public Boolean getIsReplied() {
        return isReplied;
    }
    
    public void setIsReplied(Boolean isReplied) {
        this.isReplied = isReplied;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }
    
    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
    
    @Override
    public String toString() {
        return "ContactMessageResponse{" +
                "id=" + id +
                ", name='" + name + '\'' +
                ", email='" + email + '\'' +
                ", subject='" + subject + '\'' +
                ", message='" + message + '\'' +
                ", isReplied=" + isReplied +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}
