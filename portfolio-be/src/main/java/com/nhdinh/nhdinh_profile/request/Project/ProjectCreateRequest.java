package com.nhdinh.nhdinh_profile.request.Project;

import java.util.List;
import java.util.Map;
import java.util.UUID;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCreateRequest {
    
    @NotNull(message = "CategoryId không được để trống")
    private UUID categoryId;
    
    @Size(max = 512, message = "ImageUrl không được vượt quá 512 ký tự")
    private String imageUrl;
    
    @Size(max = 512, message = "DemoUrl không được vượt quá 512 ký tự")
    private String demoUrl;
    
    @Size(max = 512, message = "SourceUrl không được vượt quá 512 ký tự")
    private String sourceUrl;
    
    private Boolean isFeatured = false;
    private Boolean isPublic = true;
    private String status = "draft"; // draft, published, archived
    private Integer sortOrder = 0;
    
    @NotEmpty(message = "Translations không được để trống")
    @Valid
    private Map<String, ProjectTranslationRequest> translations;
    
    @Valid
    private List<UUID> tagIds;
}