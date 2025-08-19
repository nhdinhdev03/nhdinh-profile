package com.nhdinh.profile.request.ProjectTagMap;

import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.UUID;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagMapBatchRequest {
    
    @NotNull(message = "ProjectId không được để trống")
    private UUID projectId;
    
    @NotNull(message = "TagMappings không được để trống")
    private List<TagMapping> tagMappings;
    
    @Data
    @NoArgsConstructor
    @AllArgsConstructor
    public static class TagMapping {
        @NotNull(message = "TagId không được để trống")
        private UUID tagId;
        
        private Integer sortOrder = 1;
    }
}
