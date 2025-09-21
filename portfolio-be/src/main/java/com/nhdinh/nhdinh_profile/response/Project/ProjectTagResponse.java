package com.nhdinh.nhdinh_profile.response.Project;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ProjectTagResponse {
    
    private UUID tagId;
    private String name;
    private String description;
    private String color;
    private String icon;
    private String category;
    private Boolean isActive;
    private Integer usageCount;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}