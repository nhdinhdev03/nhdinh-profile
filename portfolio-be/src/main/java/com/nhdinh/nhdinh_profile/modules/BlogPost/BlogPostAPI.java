package com.nhdinh.nhdinh_profile.modules.BlogPost;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.nhdinh.nhdinh_profile.services.BlogPostService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/v2/blog-posts")
@CrossOrigin(origins = "*", maxAge = 3600)
public class BlogPostAPI {

    private final BlogPostService blogPostService;

    public BlogPostAPI(BlogPostService blogPostService) {
        this.blogPostService = blogPostService;
    }

    /**
     * Lấy tất cả blog posts active với pagination và translations
     */
    @GetMapping
    public ResponseEntity<Page<BlogPost>> getAllActiveBlogPosts(Pageable pageable) {
        try {
            Page<BlogPost> blogPosts = blogPostService.findAllActiveWithPaginationAndTranslations(pageable);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy tất cả blog posts active (không phân trang)
     */
    @GetMapping("/all")
    public ResponseEntity<List<BlogPost>> getAllActiveBlogPostsList() {
        try {
            List<BlogPost> blogPosts = blogPostService.findAllActive();
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy blog post theo ID với translations và tags
     */
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable UUID id) {
        try {
            Optional<BlogPost> blogPost = blogPostService.findByIdWithTranslationsAndTags(id);
            return blogPost.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Lấy blog post theo slug
     */
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogPost> getBlogPostBySlug(@PathVariable String slug) {
        try {
            Optional<BlogPost> blogPost = blogPostService.findBySlug(slug);
            return blogPost.map(ResponseEntity::ok)
                          .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tìm kiếm blog posts theo slug pattern
     */
    @GetMapping("/search")
    public ResponseEntity<List<BlogPost>> searchBlogPosts(@RequestParam String keyword) {
        try {
            List<BlogPost> blogPosts = blogPostService.searchBySlug(keyword);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Kiểm tra slug có tồn tại
     */
    @GetMapping("/slug/{slug}/exists")
    public ResponseEntity<Boolean> checkSlugExists(@PathVariable String slug) {
        try {
            boolean exists = blogPostService.existsBySlug(slug);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    /**
     * Tạo blog post mới
     */
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@Valid @RequestBody BlogPost blogPost) {
        try {
            BlogPost createdBlogPost = blogPostService.save(blogPost);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdBlogPost);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Cập nhật blog post
     */
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable UUID id, 
                                                  @Valid @RequestBody BlogPost blogPost) {
        try {
            Optional<BlogPost> existingBlogPost = blogPostService.findById(id);
            if (existingBlogPost.isPresent()) {
                blogPost.setBlogId(id);
                BlogPost updatedBlogPost = blogPostService.save(blogPost);
                return ResponseEntity.ok(updatedBlogPost);
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).build();
        }
    }

    /**
     * Soft delete blog post
     */
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable UUID id) {
        try {
            Optional<BlogPost> existingBlogPost = blogPostService.findById(id);
            if (existingBlogPost.isPresent()) {
                blogPostService.softDeleteById(id);
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}