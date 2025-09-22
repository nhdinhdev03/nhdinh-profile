package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPost;
import com.nhdinh.nhdinh_profile.modules.BlogPost.BlogPostDAO;

@Service
@Transactional
public class BlogPostService {
    
    private final BlogPostDAO blogPostDAO;
    
    public BlogPostService(BlogPostDAO blogPostDAO) {
        this.blogPostDAO = blogPostDAO;
    }
    
    /**
     * Lấy tất cả blog posts active
     */
    public List<BlogPost> findAllActive() {
        return blogPostDAO.findAllActive();
    }
    
    /**
     * Lấy blog post theo slug
     */
    public Optional<BlogPost> findBySlug(String slug) {
        return blogPostDAO.findBySlug(slug);
    }
    
    /**
     * Kiểm tra slug có tồn tại
     */
    public boolean existsBySlug(String slug) {
        return blogPostDAO.existsBySlug(slug);
    }
    
    /**
     * Lấy blog post với translations và tags
     */
    public Optional<BlogPost> findByIdWithTranslationsAndTags(UUID blogId) {
        return blogPostDAO.findByIdWithTranslationsAndTags(blogId);
    }
    
    /**
     * Lấy blog posts với phân trang
     */
    public Page<BlogPost> findAllActiveWithPagination(Pageable pageable) {
        return blogPostDAO.findAllActiveWithPagination(pageable);
    }
    
    /**
     * Soft delete blog post
     */
    public void softDeleteById(UUID blogId) {
        blogPostDAO.softDeleteById(blogId);
    }
    
    /**
     * Tìm kiếm posts theo slug pattern
     */
    public List<BlogPost> searchBySlug(String keyword) {
        return blogPostDAO.searchBySlug(keyword);
    }
    
    /**
     * Lưu BlogPost
     */
    public BlogPost save(BlogPost blogPost) {
        return blogPostDAO.save(blogPost);
    }
    
    /**
     * Tìm BlogPost theo ID
     */
    public Optional<BlogPost> findById(UUID blogId) {
        return blogPostDAO.findById(blogId);
    }
    
    /**
     * Xóa BlogPost theo ID
     */
    public void deleteById(UUID blogId) {
        blogPostDAO.deleteById(blogId);
    }
    
    /**
     * Lấy tất cả BlogPosts
     */
    public List<BlogPost> findAll() {
        return blogPostDAO.findAll();
    }
}



