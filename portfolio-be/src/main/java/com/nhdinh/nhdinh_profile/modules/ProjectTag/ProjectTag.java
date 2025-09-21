package com.nhdinh.nhdinh_profile.modules.ProjectTag;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;

import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMap;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.UniqueConstraint;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ProjectTag", schema = "dbo",
       uniqueConstraints = @UniqueConstraint(name = "UQ_ProjectTag_Name", 
                                           columnNames = {"Name"}))
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
    @Column(name = "Name", length = 50, nullable = false)
    private String name;
    
    @Size(max = 255, message = "Description không được vượt quá 255 ký tự")
    @Column(name = "Description", length = 255)
    private String description;
    
    @Size(max = 7, message = "Color phải là mã màu hex hợp lệ (#RRGGBB)")
    @Column(name = "Color", length = 7)
    private String color; // #RRGGBB format
    
    @Size(max = 50, message = "Icon không được vượt quá 50 ký tự")
    @Column(name = "Icon", length = 50)
    private String icon;
    
    @Size(max = 30, message = "Category không được vượt quá 30 ký tự")
    @Column(name = "Category", length = 30)
    private String category;
    
    @NotNull
    @Column(name = "IsActive", nullable = false)
    private Boolean isActive = true;
    
    @NotNull
    @Column(name = "UsageCount", nullable = false)
    private Integer usageCount = 0;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt", insertable = false)
    private LocalDateTime updatedAt;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    // Relationships
    @OneToMany(mappedBy = "tag", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ProjectTagMap> projectMaps;
}