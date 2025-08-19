package com.nhdinh.profile.modules.BlogTag;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.nhdinh.profile.request.BlogTag.BlogTagRequest;
import com.nhdinh.profile.response.BlogTag.BlogTagUsageResponse;
import com.nhdinh.profile.service.BlogTag.BlogTagService;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/blog-tags")
@CrossOrigin(origins = "*")
public class BlogTagAPI {
    
    @Autowired
    private BlogTagService blogTagService;
    
    // Get all blog tags
    @GetMapping("/all")
    public ResponseEntity<List<BlogTag>> getAllBlogTags() {
        try {
            List<BlogTag> blogTags = blogTagService.getAllBlogTags();
            return ResponseEntity.ok(blogTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog tag by ID
    @GetMapping("/{id}")
    public ResponseEntity<BlogTag> getBlogTagById(@PathVariable UUID id) {
        try {
            Optional<BlogTag> blogTag = blogTagService.getBlogTagById(id);
            return blogTag.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog tag by name
    @GetMapping("/by-name/{name}")
    public ResponseEntity<BlogTag> getBlogTagByName(@PathVariable String name) {
        try {
            Optional<BlogTag> blogTag = blogTagService.getBlogTagByName(name);
            return blogTag.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create new blog tag
    @PostMapping("/create")
    public ResponseEntity<BlogTag> createBlogTag(@Valid @RequestBody BlogTagRequest request) {
        try {
            BlogTag blogTag = blogTagService.createBlogTag(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(blogTag);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update blog tag
    @PutMapping("/{id}")
    public ResponseEntity<BlogTag> updateBlogTag(@PathVariable UUID id, 
                                               @Valid @RequestBody BlogTagRequest request) {
        try {
            BlogTag updatedBlogTag = blogTagService.updateBlogTag(id, request);
            return ResponseEntity.ok(updatedBlogTag);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete blog tag
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogTag(@PathVariable UUID id) {
        try {
            blogTagService.deleteBlogTag(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Force delete blog tag (removes from all blog posts)
    @DeleteMapping("/{id}/force")
    public ResponseEntity<Void> forceDeleteBlogTag(@PathVariable UUID id) {
        try {
            blogTagService.forceDeleteBlogTag(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Search blog tags
    @GetMapping("/search")
    public ResponseEntity<List<BlogTag>> searchBlogTags(@RequestParam String keyword) {
        try {
            List<BlogTag> blogTags = blogTagService.searchBlogTags(keyword);
            return ResponseEntity.ok(blogTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get popular blog tags
    @GetMapping("/popular")
    public ResponseEntity<List<BlogTag>> getPopularBlogTags() {
        try {
            List<BlogTag> popularTags = blogTagService.getPopularBlogTags();
            return ResponseEntity.ok(popularTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get top popular blog tags with limit
    @GetMapping("/popular/top")
    public ResponseEntity<List<BlogTag>> getTopPopularBlogTags(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<BlogTag> topTags = blogTagService.getTopPopularBlogTags(limit);
            return ResponseEntity.ok(topTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog tags with usage statistics
    @GetMapping("/with-usage")
    public ResponseEntity<List<BlogTagUsageResponse>> getBlogTagsWithUsage() {
        try {
            List<BlogTagUsageResponse> tagsWithUsage = blogTagService.getBlogTagsWithUsage();
            return ResponseEntity.ok(tagsWithUsage);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get unused blog tags
    @GetMapping("/unused")
    public ResponseEntity<List<BlogTag>> getUnusedBlogTags() {
        try {
            List<BlogTag> unusedTags = blogTagService.getUnusedBlogTags();
            return ResponseEntity.ok(unusedTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog tags by blog post ID
    @GetMapping("/blog/{blogId}")
    public ResponseEntity<List<BlogTag>> getBlogTagsByBlogId(@PathVariable UUID blogId) {
        try {
            List<BlogTag> blogTags = blogTagService.getBlogTagsByBlogId(blogId);
            return ResponseEntity.ok(blogTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog tags starting with prefix
    @GetMapping("/starting-with/{prefix}")
    public ResponseEntity<List<BlogTag>> getBlogTagsStartingWith(@PathVariable String prefix) {
        try {
            List<BlogTag> blogTags = blogTagService.getBlogTagsStartingWith(prefix);
            return ResponseEntity.ok(blogTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count blog posts for a tag
    @GetMapping("/{id}/count")
    public ResponseEntity<Long> countBlogPostsForTag(@PathVariable UUID id) {
        try {
            long count = blogTagService.countBlogPostsForTag(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch create blog tags
    @PostMapping("/batch")
    public ResponseEntity<List<BlogTag>> createBlogTagsBatch(@RequestBody List<String> tagNames) {
        try {
            List<BlogTag> createdTags = blogTagService.createBlogTagsBatch(tagNames);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get or create blog tag by name
    @PostMapping("/get-or-create")
    public ResponseEntity<BlogTag> getOrCreateBlogTag(@RequestBody BlogTagRequest request) {
        try {
            BlogTag blogTag = blogTagService.getOrCreateBlogTag(request.getName());
            return ResponseEntity.ok(blogTag);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
