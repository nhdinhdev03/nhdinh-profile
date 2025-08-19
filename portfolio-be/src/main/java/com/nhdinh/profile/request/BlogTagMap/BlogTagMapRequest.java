package com.nhdinh.profile.request.BlogTagMap;

import jakarta.validation.constraints.NotNull;
import java.util.UUID;

public class BlogTagMapRequest {
    
    @NotNull(message = "Blog ID is required")
    private UUID blogId;
    
    @NotNull(message = "Tag ID is required")
    private UUID tagId;
    
    // Default constructor
    public BlogTagMapRequest() {}
    
    // Constructor
    public BlogTagMapRequest(UUID blogId, UUID tagId) {
        this.blogId = blogId;
        this.tagId = tagId;
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public UUID getTagId() {
        return tagId;
    }
    
    public void setTagId(UUID tagId) {
        this.tagId = tagId;
    }
    
    @Override
    public String toString() {
        return "BlogTagMapRequest{" +
                "blogId=" + blogId +
                ", tagId=" + tagId +
                '}';
    }
}
