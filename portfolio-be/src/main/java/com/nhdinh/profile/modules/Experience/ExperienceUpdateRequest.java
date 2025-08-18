package com.nhdinh.profile.modules.Experience;

import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceUpdateRequest {
    
    @Size(max = 100, message = "Position không được vượt quá 100 ký tự")
    private String position;
    
    @Size(max = 100, message = "Company không được vượt quá 100 ký tự")
    private String company;
    
    private String description;
    
    private Integer startYear;
    
    private Integer endYear;
    
    private Boolean isCurrent;
    
    private Integer sortOrder;
}
