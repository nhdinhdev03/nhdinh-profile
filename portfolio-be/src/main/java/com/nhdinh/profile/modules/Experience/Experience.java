package com.nhdinh.profile.modules.Experience;

import java.util.UUID;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import jakarta.persistence.Version;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * Experience Entity Class
 * Represents work experience associated with a user profile
 */
@Entity
@Table(name = "Experience", schema = "dbo")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Experience {
    
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(name = "ExpId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID expId;
    
    @NotNull(message = "Profile ID không được để trống")
    @Column(name = "ProfileId", nullable = false, columnDefinition = "UNIQUEIDENTIFIER")
    private UUID profileId;
    
    @Size(max = 100, message = "Position không được vượt quá 100 ký tự")
    @Column(name = "Position", length = 100)
    private String position;
    
    @Size(max = 100, message = "Company không được vượt quá 100 ký tự")
    @Column(name = "Company", length = 100)
    private String company;
    
    @Column(name = "Description", columnDefinition = "NVARCHAR(MAX)")
    private String description;
    
    @Column(name = "StartYear")
    private Integer startYear;
    
    @Column(name = "EndYear")
    private Integer endYear;
    
    @Column(name = "IsCurrent", columnDefinition = "BIT DEFAULT 0")
    private boolean isCurrent = false;
    
    @Column(name = "SortOrder", columnDefinition = "INT DEFAULT 1")
    private int sortOrder = 1;
    
    @Version
    @Column(name = "RowVer", columnDefinition = "ROWVERSION")
    private byte[] rowVer;

    // Constructor for creating new experience (without ID)
    public Experience(UUID profileId, String position, String company, String description, 
                     Integer startYear, Integer endYear, boolean isCurrent, int sortOrder) {
        this.profileId = profileId;
        this.position = position;
        this.company = company;
        this.description = description;
        this.startYear = startYear;
        this.endYear = endYear;
        this.isCurrent = isCurrent;
        this.sortOrder = sortOrder;
    }
}
