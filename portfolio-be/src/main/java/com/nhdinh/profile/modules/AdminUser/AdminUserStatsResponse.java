package com.nhdinh.profile.modules.AdminUser;

public class AdminUserStatsResponse {
    
    private long totalUsers;
    private long activeUsers;
    private long inactiveUsers;
    private double activeRate;
    private long usersCreatedToday;
    private long usersCreatedThisWeek;
    private long usersCreatedThisMonth;
    private long usersCreatedThisYear;
    
    public AdminUserStatsResponse() {
    }
    
    public AdminUserStatsResponse(long totalUsers, long activeUsers, long inactiveUsers,
                                 double activeRate, long usersCreatedToday, long usersCreatedThisWeek,
                                 long usersCreatedThisMonth, long usersCreatedThisYear) {
        this.totalUsers = totalUsers;
        this.activeUsers = activeUsers;
        this.inactiveUsers = inactiveUsers;
        this.activeRate = activeRate;
        this.usersCreatedToday = usersCreatedToday;
        this.usersCreatedThisWeek = usersCreatedThisWeek;
        this.usersCreatedThisMonth = usersCreatedThisMonth;
        this.usersCreatedThisYear = usersCreatedThisYear;
    }
    
    // Getters and Setters
    public long getTotalUsers() {
        return totalUsers;
    }
    
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
    
    public long getActiveUsers() {
        return activeUsers;
    }
    
    public void setActiveUsers(long activeUsers) {
        this.activeUsers = activeUsers;
    }
    
    public long getInactiveUsers() {
        return inactiveUsers;
    }
    
    public void setInactiveUsers(long inactiveUsers) {
        this.inactiveUsers = inactiveUsers;
    }
    
    public double getActiveRate() {
        return activeRate;
    }
    
    public void setActiveRate(double activeRate) {
        this.activeRate = activeRate;
    }
    
    public long getUsersCreatedToday() {
        return usersCreatedToday;
    }
    
    public void setUsersCreatedToday(long usersCreatedToday) {
        this.usersCreatedToday = usersCreatedToday;
    }
    
    public long getUsersCreatedThisWeek() {
        return usersCreatedThisWeek;
    }
    
    public void setUsersCreatedThisWeek(long usersCreatedThisWeek) {
        this.usersCreatedThisWeek = usersCreatedThisWeek;
    }
    
    public long getUsersCreatedThisMonth() {
        return usersCreatedThisMonth;
    }
    
    public void setUsersCreatedThisMonth(long usersCreatedThisMonth) {
        this.usersCreatedThisMonth = usersCreatedThisMonth;
    }
    
    public long getUsersCreatedThisYear() {
        return usersCreatedThisYear;
    }
    
    public void setUsersCreatedThisYear(long usersCreatedThisYear) {
        this.usersCreatedThisYear = usersCreatedThisYear;
    }
    
    @Override
    public String toString() {
        return "AdminUserStatsResponse{" +
                "totalUsers=" + totalUsers +
                ", activeUsers=" + activeUsers +
                ", inactiveUsers=" + inactiveUsers +
                ", activeRate=" + activeRate +
                ", usersCreatedToday=" + usersCreatedToday +
                ", usersCreatedThisWeek=" + usersCreatedThisWeek +
                ", usersCreatedThisMonth=" + usersCreatedThisMonth +
                ", usersCreatedThisYear=" + usersCreatedThisYear +
                '}';
    }
}
