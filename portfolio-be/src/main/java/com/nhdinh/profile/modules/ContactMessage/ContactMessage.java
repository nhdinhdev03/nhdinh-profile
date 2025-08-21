package com.nhdinh.profile.modules.ContactMessage;

import jakarta.persistence.*;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.CreationTimestamp;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "ContactMessage", schema = "dbo")
public class ContactMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MessageId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID messageId;
    
    @NotBlank(message = "Full name is required")
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    @Column(name = "FullName", nullable = false, length = 100)
    private String fullName;
    
    @NotBlank(message = "Email is required")
    @Email(message = "Email must be valid")
    @Size(max = 256, message = "Email must not exceed 256 characters")
    @Column(name = "Email", nullable = false, length = 256)
    private String email;
    
    @Size(max = 200, message = "Subject must not exceed 200 characters")
    @Column(name = "Subject", length = 200)
    private String subject;
    
    @NotBlank(message = "Message content is required")
    @Column(name = "Content", nullable = false, columnDefinition = "NVARCHAR(MAX)")
    private String content;
    
    @Column(name = "IsReplied", nullable = false)
    private Boolean isReplied = false;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    // Default constructor
    public ContactMessage() {}
    
    // Constructor for creating new contact message
    public ContactMessage(String fullName, String email, String subject, String content) {
        this.fullName = fullName;
        this.email = email;
        this.subject = subject;
        this.content = content;
        this.isReplied = false;
    }
    
    // Getters and Setters
    public UUID getMessageId() {
        return messageId;
    }
    
    public void setMessageId(UUID messageId) {
        this.messageId = messageId;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
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
    
    public String getContent() {
        return content;
    }
    
    public void setContent(String content) {
        this.content = content;
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
    
    public byte[] getRowVer() {
        return rowVer;
    }
    
    public void setRowVer(byte[] rowVer) {
        this.rowVer = rowVer;
    }
    
    // Utility methods
    public void markAsReplied() {
        this.isReplied = true;
    }
    
    public void markAsUnreplied() {
        this.isReplied = false;
    }
    
    public boolean isPending() {
        return !this.isReplied;
    }
    
    public String getDisplayName() {
        return this.fullName;
    }
    
    public String getShortContent() {
        if (this.content == null) return "";
        return this.content.length() > 100 ? 
               this.content.substring(0, 100) + "..." : 
               this.content;
    }
    
    public String getStatusText() {
        return this.isReplied ? "Replied" : "Pending";
    }
    
    @Override
    public String toString() {
        return "ContactMessage{" +
                "messageId=" + messageId +
                ", fullName='" + fullName + '\'' +
                ", email='" + email + '\'' +
                ", subject='" + subject + '\'' +
                ", isReplied=" + isReplied +
                ", createdAt=" + createdAt +
                '}';
    }
}
