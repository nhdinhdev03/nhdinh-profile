package com.nhdinh.profile.modules.ProjectTagMap;

import java.time.LocalDateTime;
import java.util.UUID;

import com.nhdinh.profile.modules.Project.Project;
import com.nhdinh.profile.modules.ProjectTag.ProjectTag;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.Id;
import jakarta.persistence.IdClass;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.PrePersist;
import jakarta.persistence.Table;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ProjectTagMap", schema = "dbo")
@IdClass(ProjectTagMapId.class)
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMap {
    
    @Id
    @Column(name = "ProjectId")
    private UUID projectId;
    
    @Id
    @Column(name = "TagId")
    private UUID tagId;
    
    @Min(value = 1, message = "SortOrder phải lớn hơn 0")
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;
    
    @Column(name = "CreatedAt", nullable = false)
    private LocalDateTime createdAt;
    
    @Size(max = 50, message = "CreatedBy không được vượt quá 50 ký tự")
    @Column(name = "CreatedBy", length = 50)
    private String createdBy;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ProjectId", insertable = false, updatable = false)
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TagId", insertable = false, updatable = false)
    private ProjectTag tag;
    
    // Constructor with IDs and sortOrder
    public ProjectTagMap(UUID projectId, UUID tagId, Integer sortOrder) {
        this.projectId = projectId;
        this.tagId = tagId;
        this.sortOrder = sortOrder != null ? sortOrder : 1;
    }
    
    // Constructor with entities
    public ProjectTagMap(Project project, ProjectTag tag, Integer sortOrder) {
        this.projectId = project.getProjectId();
        this.tagId = tag.getTagId();
        this.sortOrder = sortOrder != null ? sortOrder : 1;
        this.project = project;
        this.tag = tag;
    }
    
    // Constructor with entities and created by
    public ProjectTagMap(Project project, ProjectTag tag, Integer sortOrder, String createdBy) {
        this.projectId = project.getProjectId();
        this.tagId = tag.getTagId();
        this.sortOrder = sortOrder != null ? sortOrder : 1;
        this.createdBy = createdBy;
        this.project = project;
        this.tag = tag;
    }
    
    @PrePersist
    protected void onCreate() {
        createdAt = LocalDateTime.now();
    }
}
