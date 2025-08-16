package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "TechStacks")
public class TechStack extends BaseEntity {
    
    @Column(name = "Name", nullable = false, length = 64)
    private String name;
    
    @Column(name = "Slug", nullable = false, unique = true, length = 64)
    private String slug;
    
    @Column(name = "Description", length = 256)
    private String description;
    
    @Column(name = "Icon", length = 64)
    private String icon;
    
    @Column(name = "Color", length = 7)
    private String color;
    
    @Column(name = "Category", length = 64)
    private String category; // Frontend, Backend, Database, etc.
    
    @Column(name = "Website", length = 256)
    private String website;
    
    @Column(name = "ProficiencyLevel", nullable = false)
    private Integer proficiencyLevel = 1; // 1-5 scale
}
