package com.nhdinh.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "ProjectCategories")
public class ProjectCategory extends BaseEntity {
    
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
    
    @Column(name = "Enabled", nullable = false)
    private Boolean enabled = true;
}
