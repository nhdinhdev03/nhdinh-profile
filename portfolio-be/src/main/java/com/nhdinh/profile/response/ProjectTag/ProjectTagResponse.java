package com.nhdinh.profile.response.ProjectTag;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import com.nhdinh.profile.modules.ProjectTag.ProjectTag;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagResponse {
    
    private UUID tagId;
    private String name;
    
    public static ProjectTagResponse fromEntity(ProjectTag tag) {
        return new ProjectTagResponse(
                tag.getTagId(),
                tag.getName()
        );
    }
}
