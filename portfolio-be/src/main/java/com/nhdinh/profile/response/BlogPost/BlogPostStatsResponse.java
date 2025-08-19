package com.nhdinh.profile.response.BlogPost;

public class BlogPostStatsResponse {
    
    private long totalPosts;
    private long publishedPosts;
    private long draftPosts;
    private long deletedPosts;
    private long postsThisMonth;
    private long postsThisYear;
    
    public BlogPostStatsResponse() {}
    
    public BlogPostStatsResponse(long totalPosts, long publishedPosts, long draftPosts, 
                                long deletedPosts, long postsThisMonth, long postsThisYear) {
        this.totalPosts = totalPosts;
        this.publishedPosts = publishedPosts;
        this.draftPosts = draftPosts;
        this.deletedPosts = deletedPosts;
        this.postsThisMonth = postsThisMonth;
        this.postsThisYear = postsThisYear;
    }
    
    // Getters and Setters
    public long getTotalPosts() {
        return totalPosts;
    }
    
    public void setTotalPosts(long totalPosts) {
        this.totalPosts = totalPosts;
    }
    
    public long getPublishedPosts() {
        return publishedPosts;
    }
    
    public void setPublishedPosts(long publishedPosts) {
        this.publishedPosts = publishedPosts;
    }
    
    public long getDraftPosts() {
        return draftPosts;
    }
    
    public void setDraftPosts(long draftPosts) {
        this.draftPosts = draftPosts;
    }
    
    public long getDeletedPosts() {
        return deletedPosts;
    }
    
    public void setDeletedPosts(long deletedPosts) {
        this.deletedPosts = deletedPosts;
    }
    
    public long getPostsThisMonth() {
        return postsThisMonth;
    }
    
    public void setPostsThisMonth(long postsThisMonth) {
        this.postsThisMonth = postsThisMonth;
    }
    
    public long getPostsThisYear() {
        return postsThisYear;
    }
    
    public void setPostsThisYear(long postsThisYear) {
        this.postsThisYear = postsThisYear;
    }
    
    @Override
    public String toString() {
        return "BlogPostStatsResponse{" +
                "totalPosts=" + totalPosts +
                ", publishedPosts=" + publishedPosts +
                ", draftPosts=" + draftPosts +
                ", deletedPosts=" + deletedPosts +
                ", postsThisMonth=" + postsThisMonth +
                ", postsThisYear=" + postsThisYear +
                '}';
    }
}
