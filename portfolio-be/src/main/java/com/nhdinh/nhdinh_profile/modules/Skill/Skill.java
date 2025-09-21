package com.nhdinh.nhdinh_profile.modules.Skill;

import java.time.LocalDateTime;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.UuidGenerator;

import com.nhdinh.nhdinh_profile.modules.SkillCategory.SkillCategory;

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
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

/**
 * Entity representing individual skills
 * Maps to dbo.Skill table
 */
@Entity
@Table(name = "Skill", schema = "dbo",
       uniqueConstraints = {
           @UniqueConstraint(name = "UQ_Skill_Category_Name", 
                           columnNames = {"CategoryId", "Name"})
       })
public class Skill {

    @Id
    @UuidGenerator
    @Column(name = "SkillId", nullable = false)
    private UUID skillId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CategoryId", nullable = false,
                foreignKey = @ForeignKey(name = "FK_Skill_SkillCategory"))
    private SkillCategory skillCategory;

    @NotBlank(message = "Name is required")
    @Size(max = 100, message = "Name must not exceed 100 characters")
    @Column(name = "Name", nullable = false, length = 100)
    private String name;

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
    public Skill() {}

    // Constructor with required fields
    public Skill(SkillCategory skillCategory, String name) {
        this.skillCategory = skillCategory;
        this.name = name;
    }

    // Constructor with main fields
    public Skill(SkillCategory skillCategory, String name, Integer sortOrder) {
        this.skillCategory = skillCategory;
        this.name = name;
        this.sortOrder = sortOrder;
    }

    // Getters and Setters
    public UUID getSkillId() {
        return skillId;
    }

    public void setSkillId(UUID skillId) {
        this.skillId = skillId;
    }

    public SkillCategory getSkillCategory() {
        return skillCategory;
    }

    public void setSkillCategory(SkillCategory skillCategory) {
        this.skillCategory = skillCategory;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
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
        if (!(o instanceof Skill)) return false;
        Skill skill = (Skill) o;
        return skillId != null && skillId.equals(skill.skillId);
    }

    @Override
    public int hashCode() {
        return getClass().hashCode();
    }

    @Override
    public String toString() {
        return "Skill{" +
                "skillId=" + skillId +
                ", name='" + name + '\'' +
                ", sortOrder=" + sortOrder +
                ", isActive=" + isActive +
                ", createdAt=" + createdAt +
                '}';
    }
}