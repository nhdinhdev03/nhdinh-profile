package com.nhdinh.profile.modules.BlogPost;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.text.Normalizer;
import java.util.List;
import java.util.Optional;
import java.util.UUID;
import java.util.regex.Pattern;
import java.util.stream.Collectors;

@Service
@Transactional
public class BlogPostService {
    
    @Autowired
    private BlogPostDAO blogPostDAO;
    
    // Get all active blog posts
    public List<BlogPost> getAllActiveBlogPosts() {
        return blogPostDAO.findByIsDeletedFalseOrderByCreatedAtDesc();
    }
    
    // Get blog post by ID
    public Optional<BlogPost> getBlogPostById(UUID id) {
        Optional<BlogPost> blogPost = blogPostDAO.findById(id);
        if (blogPost.isPresent() && !blogPost.get().getIsDeleted()) {
            return blogPost;
        }
        return Optional.empty();
    }
    
    // Get blog post by slug
    public Optional<BlogPost> getBlogPostBySlug(String slug) {
        return blogPostDAO.findBySlugAndIsDeletedFalse(slug);
    }
    
    // Create new blog post
    public BlogPost createBlogPost(BlogPostRequest request) {
        // Generate slug from title if not provided
        String slug = request.getSlug();
        if (slug == null || slug.trim().isEmpty()) {
            slug = generateSlugFromTitle(request.getTitle());
        } else {
            slug = normalizeSlug(slug);
        }
        
        // Check if slug already exists
        if (blogPostDAO.existsBySlugAndIsDeletedFalse(slug)) {
            slug = generateUniqueSlug(slug);
        }
        
        BlogPost blogPost = new BlogPost(
            request.getTitle(),
            slug,
            request.getDescription(),
            request.getThumbnail(),
            request.getContent()
        );
        
        return blogPostDAO.save(blogPost);
    }
    
    // Update blog post
    public BlogPost updateBlogPost(UUID id, BlogPostRequest request) {
        Optional<BlogPost> existingBlogPost = blogPostDAO.findById(id);
        if (!existingBlogPost.isPresent() || existingBlogPost.get().getIsDeleted()) {
            throw new IllegalArgumentException("Blog post not found");
        }
        
        BlogPost blogPost = existingBlogPost.get();
        
        // Update fields
        blogPost.setTitle(request.getTitle());
        blogPost.setDescription(request.getDescription());
        blogPost.setThumbnail(request.getThumbnail());
        blogPost.setContent(request.getContent());
        
        // Update slug if provided and different
        if (request.getSlug() != null && !request.getSlug().equals(blogPost.getSlug())) {
            String newSlug = normalizeSlug(request.getSlug());
            if (blogPostDAO.existsBySlugAndIsDeletedFalse(newSlug) && !newSlug.equals(blogPost.getSlug())) {
                newSlug = generateUniqueSlug(newSlug);
            }
            blogPost.setSlug(newSlug);
        }
        
        return blogPostDAO.save(blogPost);
    }
    
    // Soft delete blog post
    public void deleteBlogPost(UUID id) {
        Optional<BlogPost> blogPost = blogPostDAO.findById(id);
        if (!blogPost.isPresent() || blogPost.get().getIsDeleted()) {
            throw new IllegalArgumentException("Blog post not found");
        }
        
        BlogPost post = blogPost.get();
        post.markAsDeleted();
        blogPostDAO.save(post);
    }
    
    // Search blog posts
    public List<BlogPost> searchBlogPosts(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return getAllActiveBlogPosts();
        }
        return blogPostDAO.searchByKeywordAndIsDeletedFalse(keyword.trim());
    }
    
    // Get recent blog posts with limit
    public List<BlogPost> getRecentBlogPosts(int limit) {
        List<BlogPost> allPosts = blogPostDAO.findRecentBlogPosts();
        return allPosts.stream().limit(limit).collect(Collectors.toList());
    }
    
    // Get blog posts by year
    public List<BlogPost> getBlogPostsByYear(int year) {
        return blogPostDAO.findByCreatedAtYearAndIsDeletedFalse(year);
    }
    
    // Get blog posts by year and month
    public List<BlogPost> getBlogPostsByYearAndMonth(int year, int month) {
        return blogPostDAO.findByCreatedAtYearAndMonthAndIsDeletedFalse(year, month);
    }
    
    // Count active blog posts
    public long countActiveBlogPosts() {
        return blogPostDAO.countByIsDeletedFalse();
    }
    
    // Admin: Get all blog posts including deleted ones
    public List<BlogPost> getAllBlogPostsForAdmin() {
        return blogPostDAO.findAllByOrderByCreatedAtDesc();
    }
    
    // Admin: Restore deleted blog post
    public BlogPost restoreBlogPost(UUID id) {
        Optional<BlogPost> blogPost = blogPostDAO.findById(id);
        if (!blogPost.isPresent()) {
            throw new IllegalArgumentException("Blog post not found");
        }
        
        BlogPost post = blogPost.get();
        post.restore();
        return blogPostDAO.save(post);
    }
    
    // Admin: Permanently delete blog post
    public void permanentlyDeleteBlogPost(UUID id) {
        if (!blogPostDAO.existsById(id)) {
            throw new IllegalArgumentException("Blog post not found");
        }
        blogPostDAO.deleteById(id);
    }
    
    // Utility: Generate slug from title
    private String generateSlugFromTitle(String title) {
        if (title == null || title.trim().isEmpty()) {
            return "untitled-" + System.currentTimeMillis();
        }
        
        return normalizeSlug(title);
    }
    
    // Utility: Normalize slug
    private String normalizeSlug(String input) {
        // Remove accents and normalize unicode
        String normalized = Normalizer.normalize(input, Normalizer.Form.NFD);
        Pattern pattern = Pattern.compile("\\p{InCombiningDiacriticalMarks}+");
        normalized = pattern.matcher(normalized).replaceAll("");
        
        // Convert to lowercase and replace spaces/special chars with hyphens
        return normalized.toLowerCase()
                .replaceAll("[^a-z0-9\\s-]", "") // Remove special characters except spaces and hyphens
                .replaceAll("\\s+", "-")          // Replace spaces with hyphens
                .replaceAll("-+", "-")            // Replace multiple hyphens with single hyphen
                .replaceAll("^-|-$", "");         // Remove leading/trailing hyphens
    }
    
    // Utility: Generate unique slug by appending number
    private String generateUniqueSlug(String baseSlug) {
        String uniqueSlug = baseSlug;
        int counter = 1;
        
        while (blogPostDAO.existsBySlugAndIsDeletedFalse(uniqueSlug)) {
            uniqueSlug = baseSlug + "-" + counter;
            counter++;
        }
        
        return uniqueSlug;
    }
}
