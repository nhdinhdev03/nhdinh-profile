package com.nhdinh.nhdinh_profile.modules.ProfileTranslation;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import com.nhdinh.nhdinh_profile.modules.ProfileInfo.ProfileInfo;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.ForeignKey;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Entity representing profile translations for multilingual support
 * Maps to dbo.ProfileTranslation table
 */
@Entity
@Table(name = "ProfileTranslation", schema = "dbo",
       uniqueConstraints = {
           @UniqueConstraint(name = "UQ_ProfileTranslation_Profile_Lang", 
                           columnNames = {"ProfileId", "LanguageCode"})
       })
public class ProfileTranslation {

    @Id
    @UuidGenerator
    @Column(name = "TranslationId", nullable = false)
    private UUID translationId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ProfileId", nullable = false,
                foreignKey = @ForeignKey(name = "FK_ProfileTranslation_ProfileInfo"))
    private ProfileInfo profileInfo;

    @NotBlank(message = "Language code is required")
    @Size(max = 10, message = "Language code must not exceed 10 characters")
    @Column(name = "LanguageCode", nullable = false, length = 10)
    private String languageCode;

    @Size(max = 100, message = "Full name must not exceed 100 characters")
    @Column(name = "FullName", length = 100)
    private String fullName;

    @Size(max = 100, message = "Title must not exceed 100 characters")
    @Column(name = "Title", length = 100)
    private String title;

    @Column(name = "Bio", columnDefinition = "NVARCHAR(MAX)")
    private String bio;

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
    public ProfileTranslation() {}

    // Constructor with required fields
    public ProfileTranslation(ProfileInfo profileInfo, String languageCode) {
        this.profileInfo = profileInfo;
        this.languageCode = languageCode;
    }

    // Constructor with all main fields
    public ProfileTranslation(ProfileInfo profileInfo, String languageCode, 
                            String fullName, String title, String bio) {
        this.profileInfo = profileInfo;
        this.languageCode = languageCode;
        this.fullName = fullName;
        this.title = title;
        this.bio = bio;
    }

    // Getters and Setters
    public UUID getTranslationId() {
        return translationId;
    }

    public void setTranslationId(UUID translationId) {
        this.translationId = translationId;
    }

    public ProfileInfo getProfileInfo() {
        return profileInfo;
    }

    public void setProfileInfo(ProfileInfo profileInfo) {
        this.profileInfo = profileInfo;
    }

    public String getLanguageCode() {
        return languageCode;
    }

    public void setLanguageCode(String languageCode) {
        this.languageCode = languageCode;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getBio() {
        return bio;
    }

    public void setBio(String bio) {
        this.bio = bio;
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
        if (!(o instanceof ProfileTranslation)) return false;
        ProfileTranslation that = (ProfileTranslation) o;
        return translationId != null && translationId.equals(that.translationId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "ProfileTranslation{" +
                "translationId=" + translationId +
                ", languageCode='" + languageCode + '\'' +
                ", fullName='" + fullName + '\'' +
                ", title='" + title + '\'' +
                ", createdAt=" + createdAt +
                '}';
    }
}