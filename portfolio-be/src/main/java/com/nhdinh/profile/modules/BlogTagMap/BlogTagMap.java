package com.nhdinh.profile.modules.BlogTagMap;

import com.nhdinh.profile.modules.BlogPost.BlogPost;
import com.nhdinh.profile.modules.BlogTag.BlogTag;
import jakarta.persistence.*;

import java.io.Serializable;
import java.util.UUID;

@Entity
@Table(name = "BlogTagMap", schema = "dbo")
@IdClass(BlogTagMapId.class)
public class BlogTagMap implements Serializable {
    
    @Id
    @Column(name = "BlogId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID blogId;
    
    @Id
    @Column(name = "TagId", columnDefinition = "UNIQUEIDENTIFIER")
    private UUID tagId;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "BlogId", insertable = false, updatable = false)
    private BlogPost blogPost;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "TagId", insertable = false, updatable = false)
    private BlogTag blogTag;
    
    // Default constructor
    public BlogTagMap() {}
    
    // Constructor with IDs
    public BlogTagMap(UUID blogId, UUID tagId) {
        this.blogId = blogId;
        this.tagId = tagId;
    }
    
    // Constructor with entities
    public BlogTagMap(BlogPost blogPost, BlogTag blogTag) {
        this.blogId = blogPost.getBlogId();
        this.tagId = blogTag.getTagId();
        this.blogPost = blogPost;
        this.blogTag = blogTag;
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
    
    public BlogPost getBlogPost() {
        return blogPost;
    }
    
    public void setBlogPost(BlogPost blogPost) {
        this.blogPost = blogPost;
        if (blogPost != null) {
            this.blogId = blogPost.getBlogId();
        }
    }
    
    public BlogTag getBlogTag() {
        return blogTag;
    }
    
    public void setBlogTag(BlogTag blogTag) {
        this.blogTag = blogTag;
        if (blogTag != null) {
            this.tagId = blogTag.getTagId();
        }
    }
    
    @Override
    public boolean equals(Object obj) {
        if (this == obj) return true;
        if (obj == null || getClass() != obj.getClass()) return false;
        BlogTagMap that = (BlogTagMap) obj;
        return blogId != null && blogId.equals(that.blogId) &&
               tagId != null && tagId.equals(that.tagId);
    }
    
    @Override
    public int hashCode() {
        return (blogId != null ? blogId.hashCode() : 0) * 31 +
               (tagId != null ? tagId.hashCode() : 0);
    }
    
    @Override
    public String toString() {
        return "BlogTagMap{" +
                "blogId=" + blogId +
                ", tagId=" + tagId +
                '}';
    }
}
