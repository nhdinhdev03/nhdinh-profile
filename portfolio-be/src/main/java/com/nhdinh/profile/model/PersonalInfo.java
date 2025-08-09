package com.nhdinh.profile.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "personal_info")
@Data
@EqualsAndHashCode(callSuper = true)
public class PersonalInfo extends BaseEntity {
    @Column(nullable = false)
    private String fullName;
    
    @Column(length = 1000)
    private String bio;
    
    private String title;
    
    @Column(unique = true)
    private String email;
    
    private String phone;
    
    private String location;
    
    @Column(length = 500)
    private String avatarUrl;
    
    private String githubUrl;
    
    private String linkedinUrl;
    
    @Column(length = 2000)
    private String resumeUrl;
}
