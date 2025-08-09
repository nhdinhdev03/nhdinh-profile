package com.nhdinh.profile.model;

import java.time.LocalDate;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import lombok.Data;
import lombok.EqualsAndHashCode;

@Entity
@Table(name = "experiences")
@Data
@EqualsAndHashCode(callSuper = true)
public class Experience extends BaseEntity {
    @Column(nullable = false)
    private String company;
    
    @Column(nullable = false)
    private String position;
    
    @Column(length = 1000)
    private String description;
    
    private LocalDate startDate;
    
    private LocalDate endDate;
    
    private Boolean current = false;
    
    private String location;
    
    @Column(length = 500)
    private String companyUrl;
}
