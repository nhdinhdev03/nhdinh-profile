package com.nhdinh.nhdinh_profile.response.Project;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectResponse {
    
    private UUID projectId;
    private ProjectCategoryResponse category;
    private String imageUrl;
    private String demoUrl;
    private String sourceUrl;
    private Boolean isFeatured;
    private Boolean isPublic;
    private String status;
    private Long viewCount;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private LocalDateTime publishedAt;
    private Boolean isDeleted;
    
    private List<ProjectTranslationResponse> translations;
    private List<ProjectTagResponse> tags;
}