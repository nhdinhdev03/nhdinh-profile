package com.nhdinh.profile.modules.BlogTagMap;

import java.io.Serializable;
import java.util.Objects;
import java.util.UUID;

public class BlogTagMapId implements Serializable {
    
    private UUID blogId;
    private UUID tagId;
    
    // Default constructor
    public BlogTagMapId() {}
    
    // Constructor
    public BlogTagMapId(UUID blogId, UUID tagId) {
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
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BlogTagMapId that = (BlogTagMapId) obj;
        return Objects.equals(blogId, that.blogId) &&
               Objects.equals(tagId, that.tagId);
    }
    
    @Override
    public int hashCode() {
        return Objects.hash(blogId, tagId);
    }
    
    @Override
    public String toString() {
        return "BlogTagMapId{" +
                "blogId=" + blogId +
                ", tagId=" + tagId +
                '}';
    }
}
