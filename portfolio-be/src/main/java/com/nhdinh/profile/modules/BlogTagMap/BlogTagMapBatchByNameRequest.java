package com.nhdinh.profile.modules.BlogTagMap;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import java.util.List;
import java.util.UUID;

public class BlogTagMapBatchByNameRequest {
    
    @NotNull(message = "Blog ID is required")
    private UUID blogId;
    
    @NotEmpty(message = "Tag names list cannot be empty")
    private List<String> tagNames;
    
    // Default constructor
    public BlogTagMapBatchByNameRequest() {}
    
    // Constructor
    public BlogTagMapBatchByNameRequest(UUID blogId, List<String> tagNames) {
        this.blogId = blogId;
        this.tagNames = tagNames;
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public List<String> getTagNames() {
        return tagNames;
    }
    
    public void setTagNames(List<String> tagNames) {
        this.tagNames = tagNames;
    }
    
    @Override
    public String toString() {
        return "BlogTagMapBatchByNameRequest{" +
                "blogId=" + blogId +
                ", tagNames=" + tagNames +
                '}';
    }
}
