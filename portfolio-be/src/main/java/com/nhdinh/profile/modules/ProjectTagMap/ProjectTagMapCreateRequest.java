package com.nhdinh.profile.modules.ProjectTagMap;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMapCreateRequest {
    
    @NotNull(message = "ProjectId không được để trống")
    private UUID projectId;
    
    @NotNull(message = "TagId không được để trống")
    private UUID tagId;
    
    @Min(value = 1, message = "SortOrder phải lớn hơn 0")
    private Integer sortOrder = 1;
}
