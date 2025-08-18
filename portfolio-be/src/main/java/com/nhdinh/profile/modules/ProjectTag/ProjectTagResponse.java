package com.nhdinh.profile.modules.ProjectTag;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

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
