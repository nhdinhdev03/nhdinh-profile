package com.nhdinh.profile.modules.BlogTagMap;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

public class BlogTagMapBatchRequest {
    
    @NotNull(message = "Blog ID is required")
    private UUID blogId;
    
    @NotEmpty(message = "Tag IDs list cannot be empty")
    private List<UUID> tagIds;
    
    // Default constructor
    public BlogTagMapBatchRequest() {}
    
    // Constructor
    public BlogTagMapBatchRequest(UUID blogId, List<UUID> tagIds) {
        this.blogId = blogId;
        this.tagIds = tagIds;
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public List<UUID> getTagIds() {
        return tagIds;
    }
    
    public void setTagIds(List<UUID> tagIds) {
        this.tagIds = tagIds;
    }
    
    @Override
    public String toString() {
        return "BlogTagMapBatchRequest{" +
                "blogId=" + blogId +
                ", tagIds=" + tagIds +
                '}';
    }
}
