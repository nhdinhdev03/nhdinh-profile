package com.nhdinh.nhdinh_profile.modules.ContactMessage;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ContactMessage", schema = "dbo")
@Data
@NoArgsConstructor
public class ContactMessage {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "MessageId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID messageId;
    
    @NotBlank(message = "FullName không được để trống")
    @Size(max = 100, message = "FullName không được vượt quá 100 ký tự")
    @Column(name = "FullName", length = 100, nullable = false)
    private String fullName;
    
    @NotBlank(message = "Email không được để trống")
    @Email(message = "Email không hợp lệ")
    @Size(max = 256, message = "Email không được vượt quá 256 ký tự")
    @Column(name = "Email", length = 256, nullable = false)
    private String email;
    
    @Size(max = 200, message = "Subject không được vượt quá 200 ký tự")
    @Column(name = "Subject", length = 200)
    private String subject;
    
    @NotBlank(message = "Content không được để trống")
    @Column(name = "Content", columnDefinition = "NVARCHAR(MAX)", nullable = false)
    private String content;
    
    @NotNull
    @Column(name = "IsReplied", nullable = false)
    private Boolean isReplied = false;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}