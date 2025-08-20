package com.nhdinh.profile.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.nhdinh.profile.modules.AdminUser.AdminUser;

@JsonInclude(JsonInclude.Include.NON_NULL)
public class AdminUserDTO {
    private UUID userId;
    private String phoneNumber;
    private String username;
    private String fullName;
    private LocalDateTime createdAt;
    private Boolean isActive;

    public AdminUserDTO() {}

    public AdminUserDTO(AdminUser adminUser) {
        this.userId = adminUser.getUserId();
        this.phoneNumber = adminUser.getPhoneNumber();
        this.username = adminUser.getUsername();
        this.fullName = adminUser.getFullName();
        this.createdAt = adminUser.getCreatedAt();
        this.isActive = adminUser.getIsActive();
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
}
