package com.nhdinh.profile.modules.Experience;

import java.util.UUID;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceCreateRequest {
    
    @NotNull(message = "Profile ID không được để trống")
    private UUID profileId;
    
    @Size(max = 100, message = "Position không được vượt quá 100 ký tự")
    private String position;
    
    @Size(max = 100, message = "Company không được vượt quá 100 ký tự")
    private String company;
    
    private String description;
    
    private Integer startYear;
    
    private Integer endYear;
    
    private boolean isCurrent = false;
    
    private int sortOrder = 1;
    
    public Experience toEntity() {
        return new Experience(profileId, position, company, description, 
                             startYear, endYear, isCurrent, sortOrder);
    }
}
