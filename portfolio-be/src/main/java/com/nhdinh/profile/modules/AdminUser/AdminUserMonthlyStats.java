package com.nhdinh.profile.modules.AdminUser;

public class AdminUserMonthlyStats {
    
    private int year;
    private int month;
    private long userCount;
    private String monthName;
    
    public AdminUserMonthlyStats() {
    }
    
    public AdminUserMonthlyStats(int year, int month, long userCount) {
        this.year = year;
        this.month = month;
        this.userCount = userCount;
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
    
    public long getUserCount() {
        return userCount;
    }
    
    public void setUserCount(long userCount) {
        this.userCount = userCount;
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
        return "AdminUserMonthlyStats{" +
                "year=" + year +
                ", month=" + month +
                ", userCount=" + userCount +
                ", monthName='" + monthName + '\'' +
                '}';
    }
}
