package com.nhdinh.profile.modules.BlogTag;

import java.util.UUID;

public class BlogTagUsageResponse {
    
    private UUID tagId;
    private String name;
    private Long usageCount;
    private Boolean isPopular;
    
    // Default constructor
    public BlogTagUsageResponse() {}
    
    // Constructor from BlogTag and usage count
    public BlogTagUsageResponse(BlogTag blogTag, Long usageCount) {
        this.tagId = blogTag.getTagId();
        this.name = blogTag.getName();
        this.usageCount = usageCount != null ? usageCount : 0L;
        this.isPopular = this.usageCount > 0;
    }
    
    // Constructor with all fields
    public BlogTagUsageResponse(UUID tagId, String name, Long usageCount, Boolean isPopular) {
        this.tagId = tagId;
        this.name = name;
        this.usageCount = usageCount != null ? usageCount : 0L;
        this.isPopular = isPopular != null ? isPopular : this.usageCount > 0;
    }
    
    // Static factory method
    public static BlogTagUsageResponse create(BlogTag blogTag, Long usageCount) {
        return new BlogTagUsageResponse(blogTag, usageCount);
    }
    
    // Getters and Setters
    public UUID getTagId() {
        return tagId;
    }
    
    public void setTagId(UUID tagId) {
        this.tagId = tagId;
    }
    
    public String getName() {
        return name;
    }
    
    public void setName(String name) {
        this.name = name;
    }
    
    public Long getUsageCount() {
        return usageCount;
    }
    
    public void setUsageCount(Long usageCount) {
        this.usageCount = usageCount;
        // Update isPopular based on usage count
        this.isPopular = this.usageCount != null && this.usageCount > 0;
    }
    
    public Boolean getIsPopular() {
        return isPopular;
    }
    
    public void setIsPopular(Boolean isPopular) {
        this.isPopular = isPopular;
    }
    
    // Utility methods
    public boolean isUnused() {
        return usageCount == null || usageCount == 0;
    }
    
    public String getUsageDescription() {
        if (usageCount == null || usageCount == 0) {
            return "Unused";
        } else if (usageCount == 1) {
            return "1 blog post";
        } else {
            return usageCount + " blog posts";
        }
    }
    
    @Override
    public String toString() {
        return "BlogTagUsageResponse{" +
                "tagId=" + tagId +
                ", name='" + name + '\'' +
                ", usageCount=" + usageCount +
                ", isPopular=" + isPopular +
                '}';
    }
}
