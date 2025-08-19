package com.nhdinh.profile.response.Experience;

import java.util.UUID;

import com.nhdinh.profile.modules.Experience.Experience;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ExperienceResponse {
    
    private UUID expId;
    private UUID profileId;
    private String position;
    private String company;
    private String description;
    private Integer startYear;
    private Integer endYear;
    private boolean isCurrent;
    private int sortOrder;
    
    public static ExperienceResponse fromEntity(Experience experience) {
        return new ExperienceResponse(
                experience.getExpId(),
                experience.getProfileId(),
                experience.getPosition(),
                experience.getCompany(),
                experience.getDescription(),
                experience.getStartYear(),
                experience.getEndYear(),
                experience.isCurrent(),
                experience.getSortOrder()
        );
    }
}
