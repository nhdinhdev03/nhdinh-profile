package com.nhdinh.profile.modules.AdminUser;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import jakarta.validation.constraints.Size;
import org.hibernate.annotations.GenericGenerator;

import java.time.LocalDateTime;
import java.util.UUID;

@Entity
@Table(name = "AdminUser", schema = "dbo")
public class AdminUser {
    
    @Id
    @GeneratedValue(generator = "uuid2")
    @GenericGenerator(name = "uuid2", strategy = "uuid2")
    @Column(name = "UserId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID userId;
    
    @NotBlank(message = "Phone number is required")
    @Pattern(regexp = "^[+]?[0-9]{10,15}$", message = "Invalid phone number format")
    @Column(name = "PhoneNumber", length = 20, nullable = false, unique = true)
    private String phoneNumber;
    
    @Size(min = 3, max = 50, message = "Username must be between 3 and 50 characters")
    @Pattern(regexp = "^[a-zA-Z0-9_]+$", message = "Username can only contain letters, numbers, and underscores")
    @Column(name = "Username", length = 50, unique = true)
    private String username;
    
    @NotBlank(message = "Password hash is required")
    @Column(name = "PasswordHash", length = 256, nullable = false)
    private String passwordHash;
    
    @Size(max = 100, message = "Full name must not exceed 100 characters")
    @Column(name = "FullName", length = 100)
    private String fullName;
    
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @Version
    @Column(name = "RowVer")
    private Long rowVer;
    
    // Constructors
    public AdminUser() {
        this.createdAt = LocalDateTime.now();
        this.isActive = true;
    }
    
    public AdminUser(String phoneNumber, String passwordHash) {
        this();
        this.phoneNumber = phoneNumber;
        this.passwordHash = passwordHash;
    }
    
    public AdminUser(String phoneNumber, String username, String passwordHash, String fullName) {
        this();
        this.phoneNumber = phoneNumber;
        this.username = username;
        this.passwordHash = passwordHash;
        this.fullName = fullName;
    }
    
    // Getters and Setters
    public UUID getUserId() {
        return userId;
    }
    
    public void setUserId(UUID userId) {
        this.userId = userId;
    }
    
    public String getPhoneNumber() {
        return phoneNumber;
    }
    
    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }
    
    public String getUsername() {
        return username;
    }
    
    public void setUsername(String username) {
        this.username = username;
    }
    
    public String getPasswordHash() {
        return passwordHash;
    }
    
    public void setPasswordHash(String passwordHash) {
        this.passwordHash = passwordHash;
    }
    
    public String getFullName() {
        return fullName;
    }
    
    public void setFullName(String fullName) {
        this.fullName = fullName;
    }
    
    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
    
    public Boolean getIsActive() {
        return isActive;
    }
    
    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
    }
    
    public Long getRowVer() {
        return rowVer;
    }
    
    public void setRowVer(Long rowVer) {
        this.rowVer = rowVer;
    }
    
    // Business methods
    public void activate() {
        this.isActive = true;
    }
    
    public void deactivate() {
        this.isActive = false;
    }
    
    public boolean isActive() {
        return this.isActive != null && this.isActive;
    }
    
    @Override
    public String toString() {
        return "AdminUser{" +
                "userId=" + userId +
                ", phoneNumber='" + phoneNumber + '\'' +
                ", username='" + username + '\'' +
                ", fullName='" + fullName + '\'' +
                ", createdAt=" + createdAt +
                ", isActive=" + isActive +
                '}';
    }
    
    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        AdminUser adminUser = (AdminUser) o;
        return userId != null && userId.equals(adminUser.userId);
    }
    
    @Override
    public int hashCode() {
        return userId != null ? userId.hashCode() : 0;
    }
}
