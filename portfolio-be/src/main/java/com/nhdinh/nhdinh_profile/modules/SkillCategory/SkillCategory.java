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
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Entity representing skill categories
 * Maps to dbo.SkillCategory table
 */
@Entity
@Table(name = "SkillCategory", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
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

}