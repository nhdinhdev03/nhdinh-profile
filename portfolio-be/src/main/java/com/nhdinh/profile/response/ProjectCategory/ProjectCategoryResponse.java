package com.nhdinh.profile.response.ProjectCategory;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

import com.nhdinh.profile.modules.ProjectCategory.ProjectCategory;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectCategoryResponse {
    
    private UUID categoryId;
    private String name;
    
    public static ProjectCategoryResponse fromEntity(ProjectCategory category) {
        return new ProjectCategoryResponse(
                category.getCategoryId(),
                category.getName()
        );
    }
}
