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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing individual skills
 * Maps to dbo.Skill table
 */
@Entity
@Table(name = "Skill", schema = "dbo", uniqueConstraints = {
        @UniqueConstraint(name = "UQ_Skill_Category_Name", columnNames = { "CategoryId", "Name" })
})
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {

    @Id
    @UuidGenerator
    @Column(name = "SkillId", nullable = false)
    private UUID skillId;

    @ManyToOne(fetch = FetchType.LAZY, optional = false)
    @JoinColumn(name = "CategoryId", nullable = false, foreignKey = @ForeignKey(name = "FK_Skill_SkillCategory"))
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

}