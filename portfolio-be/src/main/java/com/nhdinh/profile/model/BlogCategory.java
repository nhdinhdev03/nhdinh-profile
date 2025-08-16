package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.util.ArrayList;
import java.util.List;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "BlogCategories")
public class BlogCategory extends BaseEntity {
    
    @Column(name = "Name", nullable = false, length = 128)
    private String name;
    
    @Column(name = "Slug", nullable = false, unique = true, length = 128)
    private String slug;
    
    @Column(name = "Description", columnDefinition = "NTEXT")
    private String description;
    
    @Column(name = "Icon", length = 64)
    private String icon;
    
    @Column(name = "Color", length = 7)
    private String color;
    
    @Column(name = "SortOrder", nullable = false)
    private Integer sortOrder = 0;
    
    @Column(name = "PostCount", nullable = false)
    private Long postCount = 0L;
    
    @Column(name = "Enabled", nullable = false)
    private Boolean enabled = true;
    
    @Column(name = "MetaTitle", length = 256)
    private String metaTitle;
    
    @Column(name = "MetaDescription", length = 512)
    private String metaDescription;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "ParentId")
    private BlogCategory parent;
    
    @OneToMany(mappedBy = "parent", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<BlogCategory> children = new ArrayList<>();
}
