package com.nhdinh.profile.request.Project;

import java.util.List;
import java.util.UUID;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectUpdateRequest {
    
    @NotBlank(message = "Title không được để trống")
    @Size(max = 100, message = "Title không được vượt quá 100 ký tự")
    private String title;
    
    @Size(max = 255, message = "Description không được vượt quá 255 ký tự")
    private String description;
    
    @Size(max = 512, message = "ImageUrl không được vượt quá 512 ký tự")
    private String imageUrl;
    
    @Size(max = 512, message = "DemoUrl không được vượt quá 512 ký tự")
    private String demoUrl;
    
    @Size(max = 512, message = "SourceUrl không được vượt quá 512 ký tự")
    private String sourceUrl;
    
    @NotNull(message = "CategoryId không được để trống")
    private UUID categoryId;
    
    private List<String> tagNames;
    
    private Boolean isFeatured;
    
    private String status; // draft, published, archived
    
    private Boolean isPublic;
    
    private Integer sortOrder;
}
