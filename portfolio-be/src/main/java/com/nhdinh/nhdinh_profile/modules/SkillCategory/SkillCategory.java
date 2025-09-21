package com.nhdinh.nhdinh_profile.modules.SkillCategory;

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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Entity representing skill categories
 * Maps to dbo.SkillCategory table
 */
@Entity
@Table(name = "SkillCategory", schema = "dbo")
public class SkillCategory {

    @Id
    @UuidGenerator
    @Column(name = "CategoryId", nullable = false)
    private UUID categoryId;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

    @Size(max = 255, message = "Icon URL must not exceed 255 characters")
    @Column(name = "IconUrl", length = 255)
    private String iconUrl;

    @Min(value = 1, message = "Sort order must be at least 1")
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;

    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;

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
    public SkillCategory() {}

    // Constructor with required fields
    public SkillCategory(String name) {
        this.name = name;
    }

    // Constructor with main fields
    public SkillCategory(String name, String iconUrl, Integer sortOrder) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.sortOrder = sortOrder;
    }

    // Getters and Setters
    public UUID getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(UUID categoryId) {
        this.categoryId = categoryId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getIconUrl() {
        return iconUrl;
    }

    public void setIconUrl(String iconUrl) {
        this.iconUrl = iconUrl;
    }

    public Integer getSortOrder() {
        return sortOrder;
    }

    public void setSortOrder(Integer sortOrder) {
        this.sortOrder = sortOrder;
    }

    public Boolean getIsActive() {
        return isActive;
    }

    public void setIsActive(Boolean isActive) {
        this.isActive = isActive;
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
        if (!(o instanceof SkillCategory)) return false;
        SkillCategory that = (SkillCategory) o;
        return categoryId != null && categoryId.equals(that.categoryId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "SkillCategory{" +
                "categoryId=" + categoryId +
                ", name='" + name + '\'' +
                ", iconUrl='" + iconUrl + '\'' +
                ", sortOrder=" + sortOrder +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }
}