package com.nhdinh.profile.modules.ProjectTag;

import java.time.LocalDateTime;
import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ProjectTag", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTag {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "TagId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID tagId;
    
    @NotBlank(message = "Name không được để trống")
    @Size(max = 50, message = "Name không được vượt quá 50 ký tự")
    @Column(name = "Name", length = 50, nullable = false, unique = true)
    private String name;
    
    @Size(max = 255, message = "Description không được vượt quá 255 ký tự")
    @Column(name = "Description", length = 255)
    private String description;
    
    @Size(max = 7, message = "Color phải là mã hex color hợp lệ")
    @Column(name = "Color", length = 7)
    private String color;
    
    @Size(max = 50, message = "Icon không được vượt quá 50 ký tự")
    @Column(name = "Icon", length = 50)
    private String icon;
    
    @Size(max = 30, message = "Category không được vượt quá 30 ký tự")
    @Column(name = "Category", length = 30)
    private String category;
    
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @Column(name = "UsageCount", nullable = false)
    private Integer usageCount = 0;
    
    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
    
    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}
