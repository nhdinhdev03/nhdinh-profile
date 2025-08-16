package com.nhdinh.profile.model;

import jakarta.persistence.*;
import lombok.Data;
import lombok.EqualsAndHashCode;

import java.time.LocalDateTime;
import java.util.HashSet;
import java.util.Set;

@Data
@EqualsAndHashCode(callSuper = true)
@Entity
@Table(name = "BlogPosts", indexes = {
    @Index(name = "IX_BlogPosts_Status_PublishedAt", columnList = "Status, PublishedAt")
})
public class BlogPost extends BaseEntity {
    
    @Column(name = "Title", nullable = false, length = 256)
    private String title;
    
    @Column(name = "Slug", nullable = false, unique = true, length = 256)
    private String slug;
    
    @Column(name = "Summary", length = 512)
    private String summary;
    
    @Column(name = "Content", columnDefinition = "NTEXT")
    private String content;
    
    @Column(name = "Status", nullable = false)
    private Integer status = 0; // 0=Draft, 1=Published, 2=Archived
    
    @Column(name = "Featured", nullable = false)
    private Boolean featured = false;
    
    @Column(name = "AllowComments", nullable = false)
    private Boolean allowComments = true;
    
    @Column(name = "ViewCount", nullable = false)
    private Long viewCount = 0L;
    
    @Column(name = "LikeCount", nullable = false)
    private Long likeCount = 0L;
    
    @Column(name = "CommentCount", nullable = false)
    private Long commentCount = 0L;
    
    @Column(name = "ReadingTimeMinutes")
    private Integer readingTimeMinutes;
    
    @Column(name = "Language", length = 5)
    private String language = "en";
    
    @Column(name = "MetaTitle", length = 256)
    private String metaTitle;
    
    @Column(name = "MetaDescription", length = 512)
    private String metaDescription;
    
    @Column(name = "MetaKeywords", length = 512)
    private String metaKeywords;
    
    @Column(name = "PublishedAt")
    private LocalDateTime publishedAt;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "AuthorId")
    private User author;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CategoryId")
    private BlogCategory category;
    
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "CoverImageId")
    private Media coverImage;
    
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "BlogPostTag",
               joinColumns = @JoinColumn(name = "PostId"),
               inverseJoinColumns = @JoinColumn(name = "TagId"))
    private Set<BlogTag> tags = new HashSet<>();
}
