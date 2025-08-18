package com.nhdinh.profile.modules.BlogTagMap;

import com.nhdinh.profile.modules.BlogPost.BlogPost;
import com.nhdinh.profile.modules.BlogTag.BlogTag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import jakarta.validation.Valid;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@RestController
@RequestMapping("/api/blog-tag-maps")
@CrossOrigin(origins = "*")
public class BlogTagMapAPI {
    
    @Autowired
    private BlogTagMapService blogTagMapService;
    
    // Get all tags for a specific blog post
    @GetMapping("/blog/{blogId}")
    public ResponseEntity<List<BlogTag>> getTagsForBlogPost(@PathVariable UUID blogId) {
        try {
            List<BlogTag> tags = blogTagMapService.getTagsForBlogPost(blogId);
            return ResponseEntity.ok(tags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get all blog posts for a specific tag
    @GetMapping("/tag/{tagId}")
    public ResponseEntity<List<BlogPost>> getBlogPostsForTag(@PathVariable UUID tagId) {
        try {
            List<BlogPost> blogPosts = blogTagMapService.getBlogPostsForTag(tagId);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get all blog posts for a specific tag by name
    @GetMapping("/tag/name/{tagName}")
    public ResponseEntity<List<BlogPost>> getBlogPostsForTagByName(@PathVariable String tagName) {
        try {
            List<BlogPost> blogPosts = blogTagMapService.getBlogPostsForTagByName(tagName);
            return ResponseEntity.ok(blogPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get specific blog tag mapping
    @GetMapping("/blog/{blogId}/tag/{tagId}")
    public ResponseEntity<BlogTagMap> getBlogTagMapping(@PathVariable UUID blogId, @PathVariable UUID tagId) {
        try {
            Optional<BlogTagMap> mapping = blogTagMapService.getBlogTagMapping(blogId, tagId);
            return mapping.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create new blog tag mapping
    @PostMapping("/create")
    public ResponseEntity<BlogTagMap> createBlogTagMapping(@Valid @RequestBody BlogTagMapRequest request) {
        try {
            BlogTagMap mapping = blogTagMapService.createBlogTagMapping(request.getBlogId(), request.getTagId());
            return ResponseEntity.status(HttpStatus.CREATED).body(mapping);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Create blog tag mapping using tag name
    @PostMapping("/create-by-name")
    public ResponseEntity<BlogTagMap> createBlogTagMappingByName(@Valid @RequestBody BlogTagMapByNameRequest request) {
        try {
            BlogTagMap mapping = blogTagMapService.createBlogTagMappingByName(request.getBlogId(), request.getTagName());
            return ResponseEntity.status(HttpStatus.CREATED).body(mapping);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete specific blog tag mapping
    @DeleteMapping("/blog/{blogId}/tag/{tagId}")
    public ResponseEntity<Void> deleteBlogTagMapping(@PathVariable UUID blogId, @PathVariable UUID tagId) {
        try {
            blogTagMapService.deleteBlogTagMapping(blogId, tagId);
            return ResponseEntity.noContent().build();
        } catch (IllegalArgumentException e) {
            return ResponseEntity.notFound().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete all tags for a blog post
    @DeleteMapping("/blog/{blogId}/all")
    public ResponseEntity<Void> deleteAllTagsForBlogPost(@PathVariable UUID blogId) {
        try {
            blogTagMapService.deleteAllTagsForBlogPost(blogId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Delete all mappings for a tag
    @DeleteMapping("/tag/{tagId}/all")
    public ResponseEntity<Void> deleteAllMappingsForTag(@PathVariable UUID tagId) {
        try {
            blogTagMapService.deleteAllMappingsForTag(tagId);
            return ResponseEntity.noContent().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch update tags for a blog post
    @PutMapping("/blog/batch")
    public ResponseEntity<List<BlogTagMap>> updateBlogPostTags(@Valid @RequestBody BlogTagMapBatchRequest request) {
        try {
            List<BlogTagMap> mappings = blogTagMapService.updateBlogPostTags(request.getBlogId(), request.getTagIds());
            return ResponseEntity.ok(mappings);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Batch update tags for a blog post using tag names
    @PutMapping("/blog/batch-by-names")
    public ResponseEntity<List<BlogTagMap>> updateBlogPostTagsByNames(@Valid @RequestBody BlogTagMapBatchByNameRequest request) {
        try {
            List<BlogTagMap> mappings = blogTagMapService.updateBlogPostTagsByNames(request.getBlogId(), request.getTagNames());
            return ResponseEntity.ok(mappings);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.badRequest().build();
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count tags for a blog post
    @GetMapping("/blog/{blogId}/count")
    public ResponseEntity<Long> countTagsForBlogPost(@PathVariable UUID blogId) {
        try {
            long count = blogTagMapService.countTagsForBlogPost(blogId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Count blog posts for a tag
    @GetMapping("/tag/{tagId}/count")
    public ResponseEntity<Long> countBlogPostsForTag(@PathVariable UUID tagId) {
        try {
            long count = blogTagMapService.countBlogPostsForTag(tagId);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get related blog posts (posts that share tags)
    @GetMapping("/blog/{blogId}/related")
    public ResponseEntity<List<BlogPost>> getRelatedBlogPosts(@PathVariable UUID blogId, 
                                                            @RequestParam(defaultValue = "5") int limit) {
        try {
            List<BlogPost> relatedPosts = blogTagMapService.getRelatedBlogPosts(blogId, limit);
            return ResponseEntity.ok(relatedPosts);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get popular tags with usage statistics
    @GetMapping("/popular-tags")
    public ResponseEntity<List<BlogTagPopularityResponse>> getPopularTags(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<BlogTagPopularityResponse> popularTags = blogTagMapService.getPopularTags(limit);
            return ResponseEntity.ok(popularTags);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get tag co-occurrences (tags commonly used together)
    @GetMapping("/tag-cooccurrences")
    public ResponseEntity<List<BlogTagCoOccurrenceResponse>> getTagCoOccurrences(@RequestParam(defaultValue = "10") int limit) {
        try {
            List<BlogTagCoOccurrenceResponse> coOccurrences = blogTagMapService.getTagCoOccurrences(limit);
            return ResponseEntity.ok(coOccurrences);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Get blog post tag statistics
    @GetMapping("/blog-post-stats")
    public ResponseEntity<List<BlogPostTagStatsResponse>> getBlogPostTagStatistics() {
        try {
            List<BlogPostTagStatsResponse> stats = blogTagMapService.getBlogPostTagStatistics();
            return ResponseEntity.ok(stats);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
    
    // Check if mapping exists
    @GetMapping("/blog/{blogId}/tag/{tagId}/exists")
    public ResponseEntity<Boolean> isBlogTagMappingExists(@PathVariable UUID blogId, @PathVariable UUID tagId) {
        try {
            boolean exists = blogTagMapService.isBlogTagMappingExists(blogId, tagId);
            return ResponseEntity.ok(exists);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }
}
