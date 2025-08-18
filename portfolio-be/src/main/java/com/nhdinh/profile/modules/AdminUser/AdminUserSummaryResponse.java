package com.nhdinh.profile.modules.AdminUser;

import java.util.List;

public class AdminUserSummaryResponse {
    
    private AdminUserStatsResponse statistics;
    private List<AdminUser> recentUsers;
    private List<AdminUser> activeUsers;
    private List<AdminUser> inactiveUsers;
    private List<AdminUserMonthlyStats> monthlyStats;
    
    public AdminUserSummaryResponse() {
    }
    
    public AdminUserSummaryResponse(AdminUserStatsResponse statistics,
                                   List<AdminUser> recentUsers,
                                   List<AdminUser> activeUsers,
                                   List<AdminUser> inactiveUsers,
                                   List<AdminUserMonthlyStats> monthlyStats) {
        this.statistics = statistics;
        this.recentUsers = recentUsers;
        this.activeUsers = activeUsers;
        this.inactiveUsers = inactiveUsers;
        this.monthlyStats = monthlyStats;
    }
    
    // Getters and Setters
    public AdminUserStatsResponse getStatistics() {
        return statistics;
    }
    
    public void setStatistics(AdminUserStatsResponse statistics) {
        this.statistics = statistics;
    }
    
    public List<AdminUser> getRecentUsers() {
        return recentUsers;
    }
    
    public void setRecentUsers(List<AdminUser> recentUsers) {
        this.recentUsers = recentUsers;
    }
    
    public List<AdminUser> getActiveUsers() {
        return activeUsers;
    }
    
    public void setActiveUsers(List<AdminUser> activeUsers) {
        this.activeUsers = activeUsers;
    }
    
    public List<AdminUser> getInactiveUsers() {
        return inactiveUsers;
    }
    
    public void setInactiveUsers(List<AdminUser> inactiveUsers) {
        this.inactiveUsers = inactiveUsers;
    }
    
    public List<AdminUserMonthlyStats> getMonthlyStats() {
        return monthlyStats;
    }
    
    public void setMonthlyStats(List<AdminUserMonthlyStats> monthlyStats) {
        this.monthlyStats = monthlyStats;
    }
    
    @Override
    public String toString() {
        return "AdminUserSummaryResponse{" +
                "statistics=" + statistics +
                ", recentUsers=" + (recentUsers != null ? recentUsers.size() + " users" : "null") +
                ", activeUsers=" + (activeUsers != null ? activeUsers.size() + " users" : "null") +
                ", inactiveUsers=" + (inactiveUsers != null ? inactiveUsers.size() + " users" : "null") +
                ", monthlyStats=" + (monthlyStats != null ? monthlyStats.size() + " months" : "null") +
                '}';
    }
}
