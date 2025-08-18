package com.nhdinh.profile.modules.SkillCategory;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * SkillCategory Entity Class
 * Represents skill categories for organizing skills
 */
@Entity
@Table(name = "SkillCategory", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class SkillCategory {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "CategoryId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID categoryId;
    
    @NotNull(message = "Name không được để trống")
    @Size(max = 100, message = "Name không được vượt quá 100 ký tự")
    @Column(name = "Name", nullable = false, length = 100)
    private String name;
    
    @Size(max = 255, message = "IconUrl không được vượt quá 255 ký tự")
    @Column(name = "IconUrl", length = 255)
    private String iconUrl;
    
    @Column(name = "SortOrder", columnDefinition = "INT DEFAULT 1")
    private int sortOrder = 1;
    
    @Column(name = "IsActive", columnDefinition = "BIT DEFAULT 1")
    private boolean isActive = true;
    
    @Column(name = "CreatedAt", columnDefinition = "DATETIME2 DEFAULT SYSUTCDATETIME()")
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", columnDefinition = "ROWVERSION")
    private byte[] rowVer;

    // Constructor for creating new skill category (without ID)
    public SkillCategory(String name, String iconUrl, int sortOrder, boolean isActive) {
        this.name = name;
        this.iconUrl = iconUrl;
        this.sortOrder = sortOrder;
        this.isActive = isActive;
        this.createdAt = LocalDateTime.now();
    }
}
