package com.nhdinh.profile.response.ProfileTag;

import java.util.UUID;

import com.nhdinh.profile.modules.ProfileTag.ProfileTag;

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
