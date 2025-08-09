package com.nhdinh.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "projects")
@Data
@EqualsAndHashCode(callSuper = true)
public class Project extends BaseEntity {
    @Column(nullable = false)
    private String name;
    
    @Column(length = 1000)
    private String description;
    
    private String technologies;
    
    private String githubUrl;
    
    private String liveUrl;
    
    @Column(length = 500)
    private String imageUrl;
    
    private Boolean featured = false;
}
