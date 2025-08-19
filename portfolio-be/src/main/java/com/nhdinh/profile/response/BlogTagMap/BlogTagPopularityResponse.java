package com.nhdinh.profile.response.BlogTagMap;

import com.nhdinh.profile.modules.BlogTag.BlogTag;
import java.util.UUID;

public class BlogTagPopularityResponse {
    
    private UUID tagId;
    private String tagName;
    private Long usageCount;
    private Double popularityPercentage;
    
    // Default constructor
    public BlogTagPopularityResponse() {}
    
    // Constructor from BlogTag and usage count
    public BlogTagPopularityResponse(BlogTag blogTag, Long usageCount) {
        this.tagId = blogTag.getTagId();
        this.tagName = blogTag.getName();
        this.usageCount = usageCount != null ? usageCount : 0L;
        this.popularityPercentage = null; // To be calculated if needed
    }
    
    // Constructor with all fields
    public BlogTagPopularityResponse(UUID tagId, String tagName, Long usageCount, Double popularityPercentage) {
        this.tagId = tagId;
        this.tagName = tagName;
        this.usageCount = usageCount != null ? usageCount : 0L;
        this.popularityPercentage = popularityPercentage;
    }
    
    // Static factory method
    public static BlogTagPopularityResponse create(BlogTag blogTag, Long usageCount) {
        return new BlogTagPopularityResponse(blogTag, usageCount);
    }
    
    // Getters and Setters
    public UUID getTagId() {
        return tagId;
    }
    
    public void setTagId(UUID tagId) {
        this.tagId = tagId;
    }
    
    public String getTagName() {
        return tagName;
    }
    
    public void setTagName(String tagName) {
        this.tagName = tagName;
    }
    
    public Long getUsageCount() {
        return usageCount;
    }
    
    public void setUsageCount(Long usageCount) {
        this.usageCount = usageCount;
    }
    
    public Double getPopularityPercentage() {
        return popularityPercentage;
    }
    
    public void setPopularityPercentage(Double popularityPercentage) {
        this.popularityPercentage = popularityPercentage;
    }
    
    // Utility methods
    public String getPopularityLevel() {
        if (usageCount == null || usageCount == 0) {
            return "Unused";
        } else if (usageCount == 1) {
            return "Low";
        } else if (usageCount <= 5) {
            return "Medium";
        } else if (usageCount <= 10) {
            return "High";
        } else {
            return "Very High";
        }
    }
    
    public String getUsageDescription() {
        if (usageCount == null || usageCount == 0) {
            return "Not used";
        } else if (usageCount == 1) {
            return "1 blog post";
        } else {
            return usageCount + " blog posts";
        }
    }
    
    @Override
    public String toString() {
        return "BlogTagPopularityResponse{" +
                "tagId=" + tagId +
                ", tagName='" + tagName + '\'' +
                ", usageCount=" + usageCount +
                ", popularityPercentage=" + popularityPercentage +
                '}';
    }
}
