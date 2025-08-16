package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "Projects", indexes = {
    @Index(name = "IX_Projects_Status_Featured", columnList = "Status, Featured, SortOrder")
})
public class Project extends BaseEntity {
    
    @Column(name = "Title", nullable = false, length = 256)
    private String title;
    
    @Column(name = "Slug", nullable = false, unique = true, length = 256)
    private String slug;
    
    @Column(name = "ShortDescription", length = 512)
    private String shortDescription;
    
    @Column(name = "LongDescription", columnDefinition = "NTEXT")
    private String longDescription;
    
    @Column(name = "Status", nullable = false)
    private Integer status = 1; // 0=Draft, 1=Published, 2=Archived
    
    @Column(name = "Featured", nullable = false)
    private Boolean featured = false;
    
    @Column(name = "Priority", nullable = false)
    private Integer priority = 1; // 1=Low, 2=Normal, 3=High
    
    @Column(name = "StartDate")
    private LocalDate startDate;
    
    @Column(name = "EndDate")
    private LocalDate endDate;
    
    @Column(name = "ClientName", length = 128)
    private String clientName;
    
    @Column(name = "ProjectType", length = 64)
    private String projectType; // Personal, Client, Open Source, etc.
    
    @Column(name = "Budget", precision = 10, scale = 2)
    private java.math.BigDecimal budget;
    
    @Column(name = "TeamSize")
    private Integer teamSize;
    
    @Column(name = "MyRole", length = 128)
    private String myRole;
    
    @Column(name = "LiveUrl", length = 512)
    private String liveUrl;
    
    @Column(name = "GithubUrl", length = 512)
    private String githubUrl;
    
    @Column(name = "DemoUrl", length = 512)
    private String demoUrl;
    
    @Column(name = "DocumentationUrl", length = 512)
    private String documentationUrl;
    
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 0;
    
    @Column(name = "ViewCount", nullable = false)
    private Long viewCount = 0L;
    
    @Column(name = "LikeCount", nullable = false)
    private Long likeCount = 0L;
    
    @Column(name = "MetaTitle", length = 256)
    private String metaTitle;
    
    @Column(name = "MetaDescription", length = 512)
    private String metaDescription;
    
    @Column(name = "MetaKeywords", length = 512)
    private String metaKeywords;
    
    @Column(name = "PublishedAt")
    private LocalDateTime publishedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryId")
    private ProjectCategory category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CoverMediaId")
    private Media coverMedia;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ProjectTagMap",
               joinColumns = @JoinColumn(name = "ProjectId"),
               inverseJoinColumns = @JoinColumn(name = "TagId"))
    private Set<ProjectTag> tags = new HashSet<>();
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "ProjectTechMap",
               joinColumns = @JoinColumn(name = "ProjectId"),
               inverseJoinColumns = @JoinColumn(name = "TechId"))
    private Set<TechStack> techStacks = new HashSet<>();
}
