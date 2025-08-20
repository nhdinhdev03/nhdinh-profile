package com.nhdinh.profile.response.ProjectTagMap;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import com.nhdinh.profile.modules.ProjectTagMap.ProjectTagMap;
import com.nhdinh.profile.response.Project.ProjectResponse;
import com.nhdinh.profile.response.ProjectTag.ProjectTagResponse;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMapResponse {
    
    private UUID projectId;
    private UUID tagId;
    private Integer sortOrder;
    private ProjectResponse project;
    private ProjectTagResponse tag;
    
    public static ProjectTagMapResponse fromEntity(ProjectTagMap projectTagMap) {
        ProjectResponse projectResponse = null;
        if (projectTagMap.getProject() != null) {
            projectResponse = ProjectResponse.fromEntity(projectTagMap.getProject());
        }
        
        ProjectTagResponse tagResponse = null;
        if (projectTagMap.getTag() != null) {
            tagResponse = ProjectTagResponse.fromEntity(projectTagMap.getTag());
        }
        
        return new ProjectTagMapResponse(
                projectTagMap.getProjectId(),
                projectTagMap.getTagId(),
                projectTagMap.getSortOrder(),
                projectResponse,
                tagResponse
        );
    }
    
    public static ProjectTagMapResponse fromEntitySimple(ProjectTagMap projectTagMap) {
        return new ProjectTagMapResponse(
                projectTagMap.getProjectId(),
                projectTagMap.getTagId(),
                projectTagMap.getSortOrder(),
                null,
                null
        );
    }
}
