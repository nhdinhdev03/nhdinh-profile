package com.nhdinh.profile.modules.ProjectTagMap;

import jakarta.validation.constraints.Min;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMapUpdateRequest {
    
    @Min(value = 1, message = "SortOrder phải lớn hơn 0")
    private Integer sortOrder;
}
