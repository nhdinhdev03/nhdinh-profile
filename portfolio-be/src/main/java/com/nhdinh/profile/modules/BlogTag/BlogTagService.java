package com.nhdinh.profile.modules.BlogTag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogTagService {
    
    @Autowired
    private BlogTagDAO blogTagDAO;
    
    // Get all blog tags
    public List<BlogTag> getAllBlogTags() {
        return blogTagDAO.findAllByOrderByNameAsc();
    }
    
    // Get blog tag by ID
    public Optional<BlogTag> getBlogTagById(UUID id) {
        return blogTagDAO.findById(id);
    }
    
    // Get blog tag by name (case insensitive)
    public Optional<BlogTag> getBlogTagByName(String name) {
        return blogTagDAO.findByNameIgnoreCase(name);
    }
    
    // Create new blog tag
    public BlogTag createBlogTag(BlogTagRequest request) {
        // Check if tag already exists (case insensitive)
        if (blogTagDAO.existsByNameIgnoreCase(request.getName())) {
            throw new IllegalArgumentException("Tag with name '" + request.getName() + "' already exists");
        }
        
        BlogTag blogTag = new BlogTag(request.getName().trim());
        return blogTagDAO.save(blogTag);
    }
    
    // Update blog tag
    public BlogTag updateBlogTag(UUID id, BlogTagRequest request) {
        Optional<BlogTag> existingTag = blogTagDAO.findById(id);
        if (!existingTag.isPresent()) {
            throw new IllegalArgumentException("Blog tag not found");
        }
        
        BlogTag blogTag = existingTag.get();
        String newName = request.getName().trim();
        
        // Check if new name conflicts with existing tag (except current one)
        Optional<BlogTag> conflictingTag = blogTagDAO.findByNameIgnoreCase(newName);
        if (conflictingTag.isPresent() && !conflictingTag.get().getTagId().equals(id)) {
            throw new IllegalArgumentException("Tag with name '" + newName + "' already exists");
        }
        
        blogTag.setName(newName);
        return blogTagDAO.save(blogTag);
    }
    
    // Delete blog tag
    public void deleteBlogTag(UUID id) {
        if (!blogTagDAO.existsById(id)) {
            throw new IllegalArgumentException("Blog tag not found");
        }
        
        // Check if tag is being used in any blog posts
        long usageCount = blogTagDAO.countBlogPostsByTagId(id);
        if (usageCount > 0) {
            throw new IllegalArgumentException("Cannot delete tag that is being used in " + usageCount + " blog post(s)");
        }
        
        blogTagDAO.deleteById(id);
    }
    
    // Force delete blog tag (removes from all blog posts first)
    public void forceDeleteBlogTag(UUID id) {
        if (!blogTagDAO.existsById(id)) {
            throw new IllegalArgumentException("Blog tag not found");
        }
        
        // Note: This would require BlogTagMap operations
        // For now, we'll just delete if not used
        long usageCount = blogTagDAO.countBlogPostsByTagId(id);
        if (usageCount > 0) {
            throw new IllegalArgumentException("Cannot force delete tag. Please remove from blog posts first.");
        }
        
        blogTagDAO.deleteById(id);
    }
    
    // Search blog tags
    public List<BlogTag> searchBlogTags(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllBlogTags();
        }
        return blogTagDAO.findByNameContainingIgnoreCase(keyword.trim());
    }
    
    // Get popular blog tags
    public List<BlogTag> getPopularBlogTags() {
        return blogTagDAO.findPopularTags();
    }
    
    // Get top popular blog tags with limit
    public List<BlogTag> getTopPopularBlogTags(int limit) {
        List<BlogTag> popularTags = blogTagDAO.findTopPopularTags();
        return popularTags.stream().limit(limit).collect(Collectors.toList());
    }
    
    // Get blog tags with usage statistics
    public List<BlogTagUsageResponse> getBlogTagsWithUsage() {
        List<Object[]> results = blogTagDAO.findTagsWithUsageCount();
        return results.stream()
                .map(result -> {
                    BlogTag tag = (BlogTag) result[0];
                    Long usageCount = (Long) result[1];
                    return new BlogTagUsageResponse(tag, usageCount != null ? usageCount : 0L);
                })
                .collect(Collectors.toList());
    }
    
    // Get unused blog tags
    public List<BlogTag> getUnusedBlogTags() {
        return blogTagDAO.findUnusedTags();
    }
    
    // Get blog tags by blog post ID
    public List<BlogTag> getBlogTagsByBlogId(UUID blogId) {
        return blogTagDAO.findTagsByBlogId(blogId);
    }
    
    // Get blog tags starting with specific prefix
    public List<BlogTag> getBlogTagsStartingWith(String prefix) {
        if (prefix == null || prefix.trim().isEmpty()) {
            return getAllBlogTags();
        }
        return blogTagDAO.findByNameStartingWithIgnoreCase(prefix.trim());
    }
    
    // Count blog posts for a tag
    public long countBlogPostsForTag(UUID tagId) {
        return blogTagDAO.countBlogPostsByTagId(tagId);
    }
    
    // Batch create blog tags
    public List<BlogTag> createBlogTagsBatch(List<String> tagNames) {
        return tagNames.stream()
                .map(name -> {
                    if (!blogTagDAO.existsByNameIgnoreCase(name)) {
                        return blogTagDAO.save(new BlogTag(name.trim()));
                    }
                    return blogTagDAO.findByNameIgnoreCase(name).orElse(null);
                })
                .filter(tag -> tag != null)
                .collect(Collectors.toList());
    }
    
    // Get or create blog tag by name
    public BlogTag getOrCreateBlogTag(String name) {
        Optional<BlogTag> existingTag = blogTagDAO.findByNameIgnoreCase(name);
        if (existingTag.isPresent()) {
            return existingTag.get();
        }
        
        BlogTag newTag = new BlogTag(name.trim());
        return blogTagDAO.save(newTag);
    }
}
