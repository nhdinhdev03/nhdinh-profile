package com.nhdinh.nhdinh_profile.modules.ProfileInfo;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.Size;

/**
 * Entity representing profile information
 * Maps to dbo.ProfileInfo table
 */
@Entity
@Table(name = "ProfileInfo", schema = "dbo")
public class ProfileInfo {

    @Id
    @UuidGenerator
    @Column(name = "ProfileId", nullable = false)
    private UUID profileId;

    @Size(max = 512, message = "Avatar URL must not exceed 512 characters")
    @Column(name = "AvatarUrl", length = 512)
    private String avatarUrl;

    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;

    @UpdateTimestamp
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;

    @Version
    @Column(name = "RowVer")
    private byte[] rowVer;

    // Default constructor
    public ProfileInfo() {}

    // Getters and Setters
    public UUID getProfileId() {
        return profileId;
    }

    public void setProfileId(UUID profileId) {
        this.profileId = profileId;
    }

    public String getAvatarUrl() {
        return avatarUrl;
    }

    public void setAvatarUrl(String avatarUrl) {
        this.avatarUrl = avatarUrl;
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

    public byte[] getRowVer() {
        return rowVer;
    }

    public void setRowVer(byte[] rowVer) {
        this.rowVer = rowVer;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (!(o instanceof ProfileInfo)) return false;
        ProfileInfo that = (ProfileInfo) o;
        return profileId != null && profileId.equals(that.profileId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "ProfileInfo{" +
                "profileId=" + profileId +
                ", avatarUrl='" + avatarUrl + '\'' +
                ", createdAt=" + createdAt +
                ", updatedAt=" + updatedAt +
                '}';
    }
}