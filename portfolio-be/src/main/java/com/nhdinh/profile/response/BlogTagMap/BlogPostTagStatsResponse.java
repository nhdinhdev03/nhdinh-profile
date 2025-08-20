package com.nhdinh.profile.response.BlogTagMap;

import com.nhdinh.profile.modules.BlogPost.BlogPost;
import java.time.LocalDateTime;
import java.util.UUID;

public class BlogPostTagStatsResponse {
    
    private UUID blogId;
    private String blogTitle;
    private String blogSlug;
    private LocalDateTime blogCreatedAt;
    private Long tagCount;
    private String tagDensity;
    
    // Default constructor
    public BlogPostTagStatsResponse() {}
    
    // Constructor from BlogPost and tag count
    public BlogPostTagStatsResponse(BlogPost blogPost, Long tagCount) {
        if (blogPost != null) {
            this.blogId = blogPost.getBlogId();
            this.blogTitle = blogPost.getTitle();
            this.blogSlug = blogPost.getSlug();
            this.blogCreatedAt = blogPost.getCreatedAt();
        }
        this.tagCount = tagCount != null ? tagCount : 0L;
        this.tagDensity = calculateTagDensity();
    }
    
    // Constructor with all fields
    public BlogPostTagStatsResponse(UUID blogId, String blogTitle, String blogSlug, 
                                  LocalDateTime blogCreatedAt, Long tagCount, String tagDensity) {
        this.blogId = blogId;
        this.blogTitle = blogTitle;
        this.blogSlug = blogSlug;
        this.blogCreatedAt = blogCreatedAt;
        this.tagCount = tagCount != null ? tagCount : 0L;
        this.tagDensity = tagDensity;
    }
    
    // Static factory method
    public static BlogPostTagStatsResponse create(BlogPost blogPost, Long tagCount) {
        return new BlogPostTagStatsResponse(blogPost, tagCount);
    }
    
    // Getters and Setters
    public UUID getBlogId() {
        return blogId;
    }
    
    public void setBlogId(UUID blogId) {
        this.blogId = blogId;
    }
    
    public String getBlogTitle() {
        return blogTitle;
    }
    
    public void setBlogTitle(String blogTitle) {
        this.blogTitle = blogTitle;
    }
    
    public String getBlogSlug() {
        return blogSlug;
    }
    
    public void setBlogSlug(String blogSlug) {
        this.blogSlug = blogSlug;
    }
    
    public LocalDateTime getBlogCreatedAt() {
        return blogCreatedAt;
    }
    
    public void setBlogCreatedAt(LocalDateTime blogCreatedAt) {
        this.blogCreatedAt = blogCreatedAt;
    }
    
    public Long getTagCount() {
        return tagCount;
    }
    
    public void setTagCount(Long tagCount) {
        this.tagCount = tagCount;
        this.tagDensity = calculateTagDensity();
    }
    
    public String getTagDensity() {
        return tagDensity;
    }
    
    public void setTagDensity(String tagDensity) {
        this.tagDensity = tagDensity;
    }
    
    public BlogPost getBlogPost() {
        // Create a minimal BlogPost object for compatibility
        if (blogId != null) {
            BlogPost blogPost = new BlogPost();
            blogPost.setBlogId(blogId);
            blogPost.setTitle(blogTitle);
            blogPost.setSlug(blogSlug);
            blogPost.setCreatedAt(blogCreatedAt);
            return blogPost;
        }
        return null;
    }
    
    // Utility methods
    private String calculateTagDensity() {
        if (tagCount == null || tagCount == 0) {
            return "No tags";
        } else if (tagCount <= 2) {
            return "Light";
        } else if (tagCount <= 5) {
            return "Medium";
        } else if (tagCount <= 8) {
            return "Heavy";
        } else {
            return "Very Heavy";
        }
    }
    
    public String getTagCountDescription() {
        if (tagCount == null || tagCount == 0) {
            return "No tags";
        } else if (tagCount == 1) {
            return "1 tag";
        } else {
            return tagCount + " tags";
        }
    }
    
    public boolean isWellTagged() {
        return tagCount != null && tagCount >= 3 && tagCount <= 7;
    }
    
    public boolean isUnderTagged() {
        return tagCount == null || tagCount < 3;
    }
    
    public boolean isOverTagged() {
        return tagCount != null && tagCount > 7;
    }
    
    @Override
    public String toString() {
        return "BlogPostTagStatsResponse{" +
                "blogId=" + blogId +
                ", blogTitle='" + blogTitle + '\'' +
                ", blogSlug='" + blogSlug + '\'' +
                ", tagCount=" + tagCount +
                ", tagDensity='" + tagDensity + '\'' +
                '}';
    }
}
