package com.nhdinh.nhdinh_profile.modules.ProfileTag;

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
import jakarta.persistence.Version;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Entity representing profile tags
 * Maps to dbo.ProfileTag table
 */
@Entity
@Table(name = "ProfileTag", schema = "dbo")
public class ProfileTag {

    @Id
    @UuidGenerator
    @Column(name = "TagId", nullable = false)
    private UUID tagId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "ProfileId", nullable = false,
                foreignKey = @ForeignKey(name = "FK_ProfileTag_ProfileInfo"))
    private ProfileInfo profileInfo;

    @NotBlank(message = "Label is required")
    @Size(max = 100, message = "Label must not exceed 100 characters")
    @Column(name = "Label", nullable = false, length = 100)
    private String label;

    @Min(value = 1, message = "Sort order must be at least 1")
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;

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
    public ProfileTag() {}

    // Constructor with required fields
    public ProfileTag(ProfileInfo profileInfo, String label) {
        this.profileInfo = profileInfo;
        this.label = label;
    }

    // Constructor with all main fields
    public ProfileTag(ProfileInfo profileInfo, String label, Integer sortOrder) {
        this.profileInfo = profileInfo;
        this.label = label;
        this.sortOrder = sortOrder;
    }

    // Getters and Setters
    public UUID getTagId() {
        return tagId;
    }

    public void setTagId(UUID tagId) {
        this.tagId = tagId;
    }

    public ProfileInfo getProfileInfo() {
        return profileInfo;
    }

    public void setProfileInfo(ProfileInfo profileInfo) {
        this.profileInfo = profileInfo;
    }

    public String getLabel() {
        return label;
    }

    public void setLabel(String label) {
        this.label = label;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
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
        if (!(o instanceof ProfileTag)) return false;
        ProfileTag that = (ProfileTag) o;
        return tagId != null && tagId.equals(that.tagId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "ProfileTag{" +
                "tagId=" + tagId +
                ", label='" + label + '\'' +
                ", sortOrder=" + sortOrder +
                ", createdAt=" + createdAt +
                '}';
    }
}