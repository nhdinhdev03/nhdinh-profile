package com.nhdinh.profile.modules.BlogPost;

public class BlogPostMonthlyStats {
    
    private int year;
    private int month;
    private long postCount;
    private String monthName;
    
    public BlogPostMonthlyStats() {
    }
    
    public BlogPostMonthlyStats(int year, int month, long postCount) {
        this.year = year;
        this.month = month;
        this.postCount = postCount;
        this.monthName = getMonthName(month);
    }
    
    // Getters and Setters
    public int getYear() {
        return year;
    }
    
    public void setYear(int year) {
        this.year = year;
    }
    
    public int getMonth() {
        return month;
    }
    
    public void setMonth(int month) {
        this.month = month;
        this.monthName = getMonthName(month);
    }
    
    public long getPostCount() {
        return postCount;
    }
    
    public void setPostCount(long postCount) {
        this.postCount = postCount;
    }
    
    public String getMonthName() {
        return monthName;
    }
    
    public void setMonthName(String monthName) {
        this.monthName = monthName;
    }
    
    private String getMonthName(int month) {
        String[] months = {
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        };
        return month >= 1 && month <= 12 ? months[month - 1] : "Unknown";
    }
    
    @Override
    public String toString() {
        return "BlogPostMonthlyStats{" +
                "year=" + year +
                ", month=" + month +
                ", postCount=" + postCount +
                ", monthName='" + monthName + '\'' +
                '}';
    }
}
