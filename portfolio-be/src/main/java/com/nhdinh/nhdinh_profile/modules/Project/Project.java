package com.nhdinh.nhdinh_profile.modules.Project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;
import org.hibernate.annotations.Where;

import com.nhdinh.nhdinh_profile.modules.ProjectCategory.ProjectCategory;
import com.nhdinh.nhdinh_profile.modules.ProjectTagMap.ProjectTagMap;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Project", schema = "dbo")
@Where(clause = "IsDeleted = 0")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ProjectId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID projectId;
    
    @NotNull(message = "Category không được để trống")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryId", nullable = false)
    private ProjectCategory category;
    
    @Size(max = 512, message = "ImageUrl không được vượt quá 512 ký tự")
    @Column(name = "ImageUrl", length = 512)
    private String imageUrl;
    
    @Size(max = 512, message = "DemoUrl không được vượt quá 512 ký tự")
    @Column(name = "DemoUrl", length = 512)
    private String demoUrl;
    
    @Size(max = 512, message = "SourceUrl không được vượt quá 512 ký tự")
    @Column(name = "SourceUrl", length = 512)
    private String sourceUrl;
    
    @NotNull
    @Column(name = "IsFeatured", nullable = false)
    private Boolean isFeatured = false;
    
    @NotNull
    @Column(name = "IsPublic", nullable = false)
    private Boolean isPublic = true;
    
    @NotNull
    @Size(max = 20, message = "Status không được vượt quá 20 ký tự")
    @Column(name = "Status", length = 20, nullable = false)
    private String status = "draft"; // draft, published, archived
    
    @NotNull
    @Column(name = "ViewCount", nullable = false)
    private Long viewCount = 0L;
    
    @NotNull
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 0;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "UpdatedAt", insertable = false)
    private LocalDateTime updatedAt;
    
    @Column(name = "PublishedAt")
    private LocalDateTime publishedAt;
    
    @NotNull
    @Column(name = "IsDeleted", nullable = false)
    private Boolean isDeleted = false;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
    
    // Relationships
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ProjectTranslation> translations;
    
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)
    private List<ProjectTagMap> tagMaps;
}