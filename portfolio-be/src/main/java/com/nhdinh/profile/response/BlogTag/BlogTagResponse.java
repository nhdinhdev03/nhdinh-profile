package com.nhdinh.profile.response.BlogTag;

import java.util.UUID;

import com.nhdinh.profile.modules.BlogTag.BlogTag;

public class BlogTagResponse {
    
    private UUID tagId;
    private String name;
    private Long usageCount;
    
    // Default constructor
    public BlogTagResponse() {}
    
    // Constructor from BlogTag entity
    public BlogTagResponse(BlogTag blogTag) {
        this.tagId = blogTag.getTagId();
        this.name = blogTag.getName();
        this.usageCount = null; // To be set separately if needed
    }
    
    // Constructor with usage count
    public BlogTagResponse(BlogTag blogTag, Long usageCount) {
        this.tagId = blogTag.getTagId();
        this.name = blogTag.getName();
        this.usageCount = usageCount;
    }
    
    // Constructor with all fields
    public BlogTagResponse(UUID tagId, String name, Long usageCount) {
        this.tagId = tagId;
        this.name = name;
        this.usageCount = usageCount;
    }
    
    // Static factory method for creating response without usage count
    public static BlogTagResponse createBasic(BlogTag blogTag) {
        return new BlogTagResponse(blogTag);
    }
    
    // Static factory method for creating response with usage count
    public static BlogTagResponse createWithUsage(BlogTag blogTag, Long usageCount) {
        return new BlogTagResponse(blogTag, usageCount);
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
    }
    
    @Override
    public String toString() {
        return "BlogTagResponse{" +
                "tagId=" + tagId +
                ", name='" + name + '\'' +
                ", usageCount=" + usageCount +
                '}';
    }
}
