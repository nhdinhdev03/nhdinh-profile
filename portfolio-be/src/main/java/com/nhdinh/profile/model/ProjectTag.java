package com.nhdinh.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "ProjectTags")
public class ProjectTag extends BaseEntity {
    
    @Column(name = "Name", nullable = false, length = 64)
    private String name;
    
    @Column(name = "Slug", nullable = false, unique = true, length = 64)
    private String slug;
    
    @Column(name = "Color", length = 7)
    private String color;
    
    @Column(name = "Description", length = 256)
    private String description;
}
