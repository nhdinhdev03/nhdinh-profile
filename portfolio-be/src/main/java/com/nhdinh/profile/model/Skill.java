package com.nhdinh.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "skills")
@Data
@EqualsAndHashCode(callSuper = true)
public class Skill extends BaseEntity {
    @Column(nullable = false)
    private String name;
    
    private String category;
    
    private Integer proficiency;
    
    @Column(length = 500)
    private String iconUrl;
    
    private Integer orderIndex;
}
