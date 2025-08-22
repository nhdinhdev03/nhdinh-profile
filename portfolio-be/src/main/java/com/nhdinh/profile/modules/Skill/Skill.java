package com.nhdinh.profile.modules.Skill;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import com.nhdinh.profile.modules.SkillCategory.SkillCategory;


@Entity
@Table(name = "Skill", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Skill {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "SkillId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID skillId;
    
    @NotNull(message = "Category ID không được để trống")
    @Column(name = "CategoryId", nullable = false, columnDefinition = "UNIQUEIDENTIFIER")
    private UUID categoryId;
    
    @ManyToOne
    @JoinColumn(name = "CategoryId", insertable = false, updatable = false)
    private SkillCategory skillCategory;
    
    @NotNull(message = "Name không được để trống")
    @Size(max = 100, message = "Name không được vượt quá 100 ký tự")
    @Column(name = "Name", nullable = false, length = 100)
    private String name;
    
    @Column(name = "SortOrder", columnDefinition = "INT DEFAULT 1")
    private int sortOrder = 1;
    
    @Column(name = "IsActive", columnDefinition = "BIT DEFAULT 1")
    private boolean isActive = true;
    
    @Column(name = "CreatedAt", columnDefinition = "DATETIME2 DEFAULT SYSUTCDATETIME()")
    private LocalDateTime createdAt;
    
    @Version
    @Column(name = "RowVer", columnDefinition = "ROWVERSION")
    private byte[] rowVer;

    // Constructor for creating new skill (without ID)
    public Skill(UUID categoryId, String name, int sortOrder, boolean isActive) {
        this.categoryId = categoryId;
        this.name = name;
        this.sortOrder = sortOrder;
        this.isActive = isActive;
        this.createdAt = LocalDateTime.now();
    }
}
