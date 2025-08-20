package com.nhdinh.profile.modules.BlogPost;

import com.nhdinh.profile.service.BlogPost.BlogPostService;
import com.nhdinh.profile.request.BlogPost.BlogPostRequest;
import com.nhdinh.profile.request.BlogPost.BlogPostUpdateRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/blog-posts")
@CrossOrigin(origins = "*")
public class BlogPostAPI {
    
    @Autowired
    private BlogPostService blogPostService;
    
    // Get all active blog posts
    @GetMapping("/all")
    public ResponseEntity<List<BlogPost>> getAllBlogPosts() {
        try {
            List<BlogPost> blogPosts = blogPostService.getAllActiveBlogPosts();
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog post by ID
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable UUID id) {
        try {
            Optional<BlogPost> blogPost = blogPostService.getBlogPostById(id);
            return blogPost.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog post by slug
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogPost> getBlogPostBySlug(@PathVariable String slug) {
        try {
            Optional<BlogPost> blogPost = blogPostService.getBlogPostBySlug(slug);
            return blogPost.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create new blog post
    @PostMapping("/create")
    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPostRequest request) {
        try {
            BlogPost blogPost = blogPostService.createBlogPost(request);
            return ResponseEntity.status(HttpStatus.CREATED).body(blogPost);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Update blog post
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable UUID id, 
                                                  @Valid @RequestBody BlogPostUpdateRequest request) {
        try {
            BlogPost updatedBlogPost = blogPostService.updateBlogPost(id, request);
            return ResponseEntity.ok(updatedBlogPost);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Soft delete blog post
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable UUID id) {
        try {
            blogPostService.deleteBlogPost(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Search blog posts
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchBlogPosts(@RequestParam String keyword) {
        try {
            List<BlogPost> blogPosts = blogPostService.searchBlogPosts(keyword);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get recent blog posts
    @GetMapping("/recent")
    public ResponseEntity<List<BlogPost>> getRecentBlogPosts(@RequestParam(defaultValue = "5") int limit) {
        try {
            List<BlogPost> blogPosts = blogPostService.getRecentBlogPosts(limit);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog posts by year
    @GetMapping("/year/{year}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByYear(@PathVariable int year) {
        try {
            List<BlogPost> blogPosts = blogPostService.getBlogPostsByYear(year);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog posts by year and month
    @GetMapping("/year/{year}/month/{month}")
    public ResponseEntity<List<BlogPost>> getBlogPostsByYearAndMonth(@PathVariable int year, 
                                                                   @PathVariable int month) {
        try {
            List<BlogPost> blogPosts = blogPostService.getBlogPostsByYearAndMonth(year, month);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count active blog posts
    @GetMapping("/count")
    public ResponseEntity<Long> countBlogPosts() {
        try {
            long count = blogPostService.countActiveBlogPosts();
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Admin: Get all blog posts including deleted ones
    @GetMapping("/admin/all")
    public ResponseEntity<List<BlogPost>> getAllBlogPostsForAdmin() {
        try {
            List<BlogPost> blogPosts = blogPostService.getAllBlogPostsForAdmin();
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Admin: Restore deleted blog post
    @PutMapping("/admin/{id}/restore")
    public ResponseEntity<BlogPost> restoreBlogPost(@PathVariable UUID id) {
        try {
            BlogPost restoredBlogPost = blogPostService.restoreBlogPost(id);
            return ResponseEntity.ok(restoredBlogPost);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Admin: Permanently delete blog post
    @DeleteMapping("/admin/{id}/permanent")
    public ResponseEntity<Void> permanentlyDeleteBlogPost(@PathVariable UUID id) {
        try {
            blogPostService.permanentlyDeleteBlogPost(id);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
