package com.nhdinh.profile.modules.ProfileTag;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProfileTagResponse {
    
    private UUID tagId;
    private UUID profileId;
    private String label;
    private int sortOrder;
    
    public static ProfileTagResponse fromEntity(ProfileTag profileTag) {
        return new ProfileTagResponse(
                profileTag.getTagId(),
                profileTag.getProfileId(),
                profileTag.getLabel(),
                profileTag.getSortOrder()
        );
    }
}
