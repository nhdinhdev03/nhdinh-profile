package com.nhdinh.profile.modules.BlogTagMap;

import com.nhdinh.profile.modules.BlogPost.BlogPost;
import com.nhdinh.profile.modules.BlogPost.BlogPostDAO;
import com.nhdinh.profile.modules.BlogTag.BlogTag;
import com.nhdinh.profile.modules.BlogTag.BlogTagDAO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogTagMapService {
    
    @Autowired
    private BlogTagMapDAO blogTagMapDAO;
    
    @Autowired
    private BlogPostDAO blogPostDAO;
    
    @Autowired
    private BlogTagDAO blogTagDAO;
    
    // Create new blog tag mapping
    public BlogTagMap createBlogTagMapping(UUID blogId, UUID tagId) {
        // Validate blog post exists and is not deleted
        Optional<BlogPost> blogPost = blogPostDAO.findById(blogId);
        if (!blogPost.isPresent() || blogPost.get().getIsDeleted()) {
            throw new IllegalArgumentException("Blog post not found or is deleted");
        }
        
        // Validate tag exists
        if (!blogTagDAO.existsById(tagId)) {
            throw new IllegalArgumentException("Blog tag not found");
        }
        
        // Check if mapping already exists
        if (blogTagMapDAO.existsByBlogIdAndTagId(blogId, tagId)) {
            throw new IllegalArgumentException("Tag is already assigned to this blog post");
        }
        
        BlogTagMap mapping = new BlogTagMap(blogId, tagId);
        return blogTagMapDAO.save(mapping);
    }
    
    // Create mapping using tag name
    public BlogTagMap createBlogTagMappingByName(UUID blogId, String tagName) {
        Optional<BlogTag> blogTag = blogTagDAO.findByNameIgnoreCase(tagName);
        if (!blogTag.isPresent()) {
            throw new IllegalArgumentException("Blog tag with name '" + tagName + "' not found");
        }
        
        return createBlogTagMapping(blogId, blogTag.get().getTagId());
    }
    
    // Get all tags for a blog post
    public List<BlogTag> getTagsForBlogPost(UUID blogId) {
        return blogTagMapDAO.findTagsByBlogId(blogId);
    }
    
    // Get all blog posts for a tag
    public List<BlogPost> getBlogPostsForTag(UUID tagId) {
        return blogTagMapDAO.findBlogPostsByTagId(tagId);
    }
    
    // Get all blog posts for a tag by name
    public List<BlogPost> getBlogPostsForTagByName(String tagName) {
        return blogTagMapDAO.findBlogPostsByTagName(tagName);
    }
    
    // Get specific mapping
    public Optional<BlogTagMap> getBlogTagMapping(UUID blogId, UUID tagId) {
        return blogTagMapDAO.findByBlogIdAndTagId(blogId, tagId);
    }
    
    // Check if mapping exists
    public boolean isBlogTagMappingExists(UUID blogId, UUID tagId) {
        return blogTagMapDAO.existsByBlogIdAndTagId(blogId, tagId);
    }
    
    // Delete specific mapping
    public void deleteBlogTagMapping(UUID blogId, UUID tagId) {
        if (!blogTagMapDAO.existsByBlogIdAndTagId(blogId, tagId)) {
            throw new IllegalArgumentException("Blog tag mapping not found");
        }
        
        blogTagMapDAO.deleteByBlogIdAndTagId(blogId, tagId);
    }
    
    // Delete all tags for a blog post
    public void deleteAllTagsForBlogPost(UUID blogId) {
        blogTagMapDAO.deleteByBlogId(blogId);
    }
    
    // Delete all mappings for a tag
    public void deleteAllMappingsForTag(UUID tagId) {
        blogTagMapDAO.deleteByTagId(tagId);
    }
    
    // Batch update tags for a blog post
    public List<BlogTagMap> updateBlogPostTags(UUID blogId, List<UUID> tagIds) {
        // Validate blog post exists
        Optional<BlogPost> blogPost = blogPostDAO.findById(blogId);
        if (!blogPost.isPresent() || blogPost.get().getIsDeleted()) {
            throw new IllegalArgumentException("Blog post not found or is deleted");
        }
        
        // Remove all existing tags
        blogTagMapDAO.deleteByBlogId(blogId);
        
        // Add new tags
        return tagIds.stream()
                .distinct() // Remove duplicates
                .map(tagId -> {
                    if (!blogTagDAO.existsById(tagId)) {
                        throw new IllegalArgumentException("Blog tag with ID " + tagId + " not found");
                    }
                    return blogTagMapDAO.save(new BlogTagMap(blogId, tagId));
                })
                .collect(Collectors.toList());
    }
    
    // Batch update tags for a blog post using tag names
    public List<BlogTagMap> updateBlogPostTagsByNames(UUID blogId, List<String> tagNames) {
        // Convert tag names to IDs
        List<UUID> tagIds = tagNames.stream()
                .map(tagName -> {
                    Optional<BlogTag> tag = blogTagDAO.findByNameIgnoreCase(tagName);
                    if (!tag.isPresent()) {
                        throw new IllegalArgumentException("Blog tag with name '" + tagName + "' not found");
                    }
                    return tag.get().getTagId();
                })
                .collect(Collectors.toList());
        
        return updateBlogPostTags(blogId, tagIds);
    }
    
    // Count tags for a blog post
    public long countTagsForBlogPost(UUID blogId) {
        return blogTagMapDAO.countTagsByBlogId(blogId);
    }
    
    // Count blog posts for a tag
    public long countBlogPostsForTag(UUID tagId) {
        return blogTagMapDAO.countBlogPostsByTagId(tagId);
    }
    
    // Get related blog posts (posts that share tags)
    public List<BlogPost> getRelatedBlogPosts(UUID blogId) {
        return blogTagMapDAO.findRelatedBlogPosts(blogId);
    }
    
    // Get related blog posts with limit
    public List<BlogPost> getRelatedBlogPosts(UUID blogId, int limit) {
        List<BlogPost> relatedPosts = blogTagMapDAO.findRelatedBlogPosts(blogId);
        return relatedPosts.stream().limit(limit).collect(Collectors.toList());
    }
    
    // Get popular tags with usage statistics
    public List<BlogTagPopularityResponse> getPopularTags() {
        List<Object[]> results = blogTagMapDAO.findMostPopularTags();
        return results.stream()
                .map(result -> {
                    BlogTag tag = (BlogTag) result[0];
                    Long usageCount = (Long) result[1];
                    return new BlogTagPopularityResponse(tag, usageCount);
                })
                .collect(Collectors.toList());
    }
    
    // Get popular tags with limit
    public List<BlogTagPopularityResponse> getPopularTags(int limit) {
        List<BlogTagPopularityResponse> popularTags = getPopularTags();
        return popularTags.stream().limit(limit).collect(Collectors.toList());
    }
    
    // Get tag co-occurrences (tags commonly used together)
    public List<BlogTagCoOccurrenceResponse> getTagCoOccurrences() {
        List<Object[]> results = blogTagMapDAO.findTagCoOccurrences();
        return results.stream()
                .map(result -> {
                    BlogTag tag1 = (BlogTag) result[0];
                    BlogTag tag2 = (BlogTag) result[1];
                    Long coOccurrence = (Long) result[2];
                    return new BlogTagCoOccurrenceResponse(tag1, tag2, coOccurrence);
                })
                .collect(Collectors.toList());
    }
    
    // Get tag co-occurrences with limit
    public List<BlogTagCoOccurrenceResponse> getTagCoOccurrences(int limit) {
        List<BlogTagCoOccurrenceResponse> coOccurrences = getTagCoOccurrences();
        return coOccurrences.stream().limit(limit).collect(Collectors.toList());
    }
    
    // Get blog post tag statistics
    public List<BlogPostTagStatsResponse> getBlogPostTagStatistics() {
        List<Object[]> results = blogTagMapDAO.findBlogPostTagCounts();
        return results.stream()
                .map(result -> {
                    UUID blogId = (UUID) result[0];
                    Long tagCount = (Long) result[1];
                    Optional<BlogPost> blogPost = blogPostDAO.findById(blogId);
                    return new BlogPostTagStatsResponse(
                        blogPost.orElse(null), 
                        tagCount != null ? tagCount : 0L
                    );
                })
                .filter(stats -> stats.getBlogPost() != null)
                .collect(Collectors.toList());
    }
}
