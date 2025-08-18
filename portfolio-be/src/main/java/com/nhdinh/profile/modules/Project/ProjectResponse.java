package com.nhdinh.profile.modules.Project;

import java.time.LocalDateTime;
import java.util.UUID;

import com.nhdinh.profile.modules.ProjectCategory.ProjectCategoryResponse;

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
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    
    public static ProjectResponse fromEntity(Project project) {
        return new ProjectResponse(
                project.getProjectId(),
                project.getTitle(),
                project.getDescription(),
                project.getImageUrl(),
                project.getDemoUrl(),
                project.getSourceUrl(),
                ProjectCategoryResponse.fromEntity(project.getCategory()),
                project.getCreatedAt(),
                project.getUpdatedAt()
        );
    }
}
