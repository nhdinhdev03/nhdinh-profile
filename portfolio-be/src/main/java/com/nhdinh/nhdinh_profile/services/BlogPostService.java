package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPost;
import com.nhdinh.nhdinh_profile.repositories.BlogPostRepository;

@Service
@Transactional
public class BlogPostService {
    
    private final BlogPostRepository blogPostRepository;
    
    public BlogPostService(BlogPostRepository blogPostRepository) {
        this.blogPostRepository = blogPostRepository;
    }
    
    /**
     * Lấy tất cả blog posts active
     */
    public List<BlogPost> findAllActive() {
        return blogPostRepository.findAllActive();
    }
    
    /**
     * Lấy blog post theo slug
     */
    public Optional<BlogPost> findBySlug(String slug) {
        return blogPostRepository.findBySlug(slug);
    }
    
    /**
     * Kiểm tra slug có tồn tại
     */
    public boolean existsBySlug(String slug) {
        return blogPostRepository.existsBySlug(slug);
    }
    
    /**
     * Lấy blog post với translations và tags
     */
    public Optional<BlogPost> findByIdWithTranslationsAndTags(UUID blogId) {
        return blogPostRepository.findByIdWithTranslationsAndTags(blogId);
    }
    
    /**
     * Lấy blog posts với phân trang
     */
    public Page<BlogPost> findAllActiveWithPagination(Pageable pageable) {
        return blogPostRepository.findAllActiveWithPagination(pageable);
    }
    
    /**
     * Soft delete blog post
     */
    public void softDeleteById(UUID blogId) {
        blogPostRepository.softDeleteById(blogId);
    }
    
    /**
     * Tìm kiếm posts theo slug pattern
     */
    public List<BlogPost> searchBySlug(String keyword) {
        return blogPostRepository.searchBySlug(keyword);
    }
    
    /**
     * Lưu BlogPost
     */
    public BlogPost save(BlogPost blogPost) {
        return blogPostRepository.save(blogPost);
    }
    
    /**
     * Tìm BlogPost theo ID
     */
    public Optional<BlogPost> findById(UUID blogId) {
        return blogPostRepository.findById(blogId);
    }
    
    /**
     * Xóa BlogPost theo ID
     */
    public void deleteById(UUID blogId) {
        blogPostRepository.deleteById(blogId);
    }
    
    /**
     * Lấy tất cả BlogPosts
     */
    public List<BlogPost> findAll() {
        return blogPostRepository.findAll();
    }
}