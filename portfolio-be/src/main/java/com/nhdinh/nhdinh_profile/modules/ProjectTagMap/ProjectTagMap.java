package com.nhdinh.nhdinh_profile.modules.ProjectTagMap;

import java.time.LocalDateTime;

import org.hibernate.annotations.CreationTimestamp;

import com.nhdinh.nhdinh_profile.modules.Project.Project;
import com.nhdinh.nhdinh_profile.modules.ProjectTag.ProjectTag;

import jakarta.persistence.Column;
import jakarta.persistence.EmbeddedId;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.MapsId;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "ProjectTagMap", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMap {
    
    @EmbeddedId
    private ProjectTagMapId id;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("projectId")
    @JoinColumn(name = "ProjectId")
    private Project project;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @MapsId("tagId")
    @JoinColumn(name = "TagId")
    private ProjectTag tag;
    
    @NotNull
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 1;
    
    @CreationTimestamp
    @Column(name = "CreatedAt", nullable = false, updatable = false)
    private LocalDateTime createdAt;
    
    @Size(max = 50, message = "CreatedBy không được vượt quá 50 ký tự")
    @Column(name = "CreatedBy", length = 50)
    private String createdBy;
    
    @Version
    @Column(name = "RowVer", insertable = false, updatable = false)
    private byte[] rowVer;
}