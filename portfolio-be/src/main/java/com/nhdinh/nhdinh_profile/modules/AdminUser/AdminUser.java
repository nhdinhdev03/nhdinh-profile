package com.nhdinh.nhdinh_profile.modules.AdminUser;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "AdminUser", schema = "dbo",
       uniqueConstraints = {
           @UniqueConstraint(name = "UQ_AdminUser_Phone", columnNames = {"PhoneNumber"}),
           @UniqueConstraint(name = "UQ_AdminUser_Username", columnNames = {"Username"})
       })
@Data
@NoArgsConstructor
public class AdminUser {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "UserId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID userId;
    
    @NotBlank(message = "PhoneNumber không được để trống")
    @Size(max = 20, message = "PhoneNumber không được vượt quá 20 ký tự")
    @Column(name = "PhoneNumber", length = 20, nullable = false)
    private String phoneNumber;
    
    @Size(max = 50, message = "Username không được vượt quá 50 ký tự")
    @Column(name = "Username", length = 50)
    private String username;
    
    @NotBlank(message = "PasswordHash không được để trống")
    @Size(max = 256, message = "PasswordHash không được vượt quá 256 ký tự")
    @Column(name = "PasswordHash", length = 256, nullable = false)
    private String passwordHash;
    
    @Size(max = 100, message = "FullName không được vượt quá 100 ký tự")
    @Column(name = "FullName", length = 100)
    private String fullName;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @NotNull
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}