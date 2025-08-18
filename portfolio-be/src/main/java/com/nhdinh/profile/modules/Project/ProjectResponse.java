package com.nhdinh.profile.modules.Project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

import com.nhdinh.profile.modules.ProjectCategory.ProjectCategoryResponse;
import com.nhdinh.profile.modules.ProjectTag.ProjectTagResponse;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    
    private UUID projectId;
    private String title;
    private String description;
    private String imageUrl;
    private String demoUrl;
    private String sourceUrl;
    private ProjectCategoryResponse category;
    private List<ProjectTagResponse> tags;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ProjectResponse fromEntity(Project project) {
        List<ProjectTagResponse> tagResponses = project.getTags().stream()
                .map(ProjectTagResponse::fromEntity)
                .collect(Collectors.toList());
        
        return new ProjectResponse(
                project.getProjectId(),
                project.getTitle(),
                project.getDescription(),
                project.getImageUrl(),
                project.getDemoUrl(),
                project.getSourceUrl(),
                ProjectCategoryResponse.fromEntity(project.getCategory()),
                tagResponses,
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
