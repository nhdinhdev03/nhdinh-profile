package com.nhdinh.profile.modules.Project;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;
import java.util.UUID;

import com.nhdinh.profile.modules.ProjectCategory.ProjectCategory;
import com.nhdinh.profile.modules.ProjectTag.ProjectTag;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.PreUpdate;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "Project", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ProjectId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID projectId;
    
    @NotBlank(message = "Title không được để trống")
    @Size(max = 100, message = "Title không được vượt quá 100 ký tự")
    @Column(name = "Title", length = 100, nullable = false)
    private String title;
    
    @Size(max = 255, message = "Description không được vượt quá 255 ký tự")
    @Column(name = "Description", length = 255)
    private String description;
    
    @Size(max = 512, message = "ImageUrl không được vượt quá 512 ký tự")
    @Column(name = "ImageUrl", length = 512)
    private String imageUrl;
    
    @Size(max = 512, message = "DemoUrl không được vượt quá 512 ký tự")
    @Column(name = "DemoUrl", length = 512)
    private String demoUrl;
    
    @Size(max = 512, message = "SourceUrl không được vượt quá 512 ký tự")
    @Column(name = "SourceUrl", length = 512)
    private String sourceUrl;
    
    @Column(name = "IsFeatured", nullable = false)
    private Boolean isFeatured = false;
    
    @Column(name = "Status", length = 20, nullable = false)
    private String status = "draft"; // draft, published, archived
    
    @Column(name = "IsPublic", nullable = false)
    private Boolean isPublic = true;
    
    @Column(name = "ViewCount", nullable = false)
    private Long viewCount = 0L;
    
    @Column(name = "SortOrder")
    private Integer sortOrder = 0;
    
    @NotNull(message = "CategoryId không được để trống")
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryId", nullable = false)
    private ProjectCategory category;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
        name = "ProjectTagMap",
        schema = "dbo",
        joinColumns = @JoinColumn(name = "ProjectId"),
        inverseJoinColumns = @JoinColumn(name = "TagId")
    )
    private Set<ProjectTag> tags = new HashSet<>();
    
    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;
    
    @Column(name = "UpdatedAt")
    private LocalDateTime updatedAt;
    
    @Version
    @Column(name = "RowVer")
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
