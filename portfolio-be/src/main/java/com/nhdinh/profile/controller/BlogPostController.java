package com.nhdinh.profile.controller;

import com.nhdinh.profile.model.BlogPost;
import com.nhdinh.profile.model.BlogCategory;
import com.nhdinh.profile.model.User;
import com.nhdinh.profile.repository.BlogPostRepository;
import com.nhdinh.profile.repository.BlogCategoryRepository;
import com.nhdinh.profile.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/blog/posts")
@RequiredArgsConstructor
public class BlogPostController {
    
    private final BlogPostRepository blogPostRepository;
    private final BlogCategoryRepository blogCategoryRepository;
    private final UserRepository userRepository;
    
    @GetMapping
    public ResponseEntity<Page<BlogPost>> getAllBlogPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "publishedAt") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir) {
        
        Sort sort = sortDir.equalsIgnoreCase("desc") 
            ? Sort.by(sortBy).descending() 
            : Sort.by(sortBy).ascending();
        
        Pageable pageable = PageRequest.of(page, size, sort);
        Page<BlogPost> postPage = blogPostRepository.findAllActive(pageable);
        
        return ResponseEntity.ok(postPage);
    }
    
    @GetMapping("/published")
    public ResponseEntity<Page<BlogPost>> getPublishedPosts(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPost> postPage = blogPostRepository.findPublishedPosts(pageable);
        
        return ResponseEntity.ok(postPage);
    }
    
    @GetMapping("/featured")
    public ResponseEntity<List<BlogPost>> getFeaturedPosts() {
        List<BlogPost> featuredPosts = blogPostRepository.findFeaturedPosts();
        return ResponseEntity.ok(featuredPosts);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<BlogPost> getBlogPostById(@PathVariable UUID id) {
        Optional<BlogPost> post = blogPostRepository.findByIdActive(id);
        return post.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/slug/{slug}")
    public ResponseEntity<BlogPost> getBlogPostBySlug(@PathVariable String slug) {
        Optional<BlogPost> post = blogPostRepository.findBySlug(slug);
        return post.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/status/{status}")
    public ResponseEntity<Page<BlogPost>> getBlogPostsByStatus(
            @PathVariable Integer status,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPost> postPage = blogPostRepository.findByStatus(status, pageable);
        
        return ResponseEntity.ok(postPage);
    }
    
    @GetMapping("/author/{authorId}")
    public ResponseEntity<Page<BlogPost>> getBlogPostsByAuthor(
            @PathVariable UUID authorId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Optional<User> author = userRepository.findByIdActive(authorId);
        if (author.isPresent()) {
            Pageable pageable = PageRequest.of(page, size);
            Page<BlogPost> postPage = blogPostRepository.findByAuthor(author.get(), pageable);
            return ResponseEntity.ok(postPage);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/category/{categoryId}")
    public ResponseEntity<Page<BlogPost>> getBlogPostsByCategory(
            @PathVariable UUID categoryId,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Optional<BlogCategory> category = blogCategoryRepository.findByIdActive(categoryId);
        if (category.isPresent()) {
            Pageable pageable = PageRequest.of(page, size);
            Page<BlogPost> postPage = blogPostRepository.findByCategory(category.get(), pageable);
            return ResponseEntity.ok(postPage);
        }
        return ResponseEntity.notFound().build();
    }
    
    @GetMapping("/tag/{tagSlug}")
    public ResponseEntity<Page<BlogPost>> getBlogPostsByTag(
            @PathVariable String tagSlug,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPost> postPage = blogPostRepository.findByTagSlug(tagSlug, pageable);
        
        return ResponseEntity.ok(postPage);
    }
    
    @GetMapping("/search")
    public ResponseEntity<Page<BlogPost>> searchBlogPosts(
            @RequestParam String keyword,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        
        Pageable pageable = PageRequest.of(page, size);
        Page<BlogPost> postPage = blogPostRepository.searchByKeyword(keyword, pageable);
        
        return ResponseEntity.ok(postPage);
    }
    
    @PostMapping
    public ResponseEntity<BlogPost> createBlogPost(@RequestBody BlogPost blogPost) {
        // Check if slug already exists
        if (blogPostRepository.existsBySlug(blogPost.getSlug())) {
            return ResponseEntity.badRequest().build(); // Slug already exists
        }
        
        BlogPost savedPost = blogPostRepository.save(blogPost);
        return ResponseEntity.ok(savedPost);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<BlogPost> updateBlogPost(@PathVariable UUID id, @RequestBody BlogPost blogPost) {
        Optional<BlogPost> existingPost = blogPostRepository.findByIdActive(id);
        if (existingPost.isPresent()) {
            blogPost.setId(id);
            BlogPost updatedPost = blogPostRepository.save(blogPost);
            return ResponseEntity.ok(updatedPost);
        }
        return ResponseEntity.notFound().build();
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteBlogPost(@PathVariable UUID id) {
        Optional<BlogPost> post = blogPostRepository.findByIdActive(id);
        if (post.isPresent()) {
            BlogPost postToDelete = post.get();
            postToDelete.setIsDeleted(true);
            blogPostRepository.save(postToDelete);
            return ResponseEntity.ok().build();
        }
        return ResponseEntity.notFound().build();
    }
}
