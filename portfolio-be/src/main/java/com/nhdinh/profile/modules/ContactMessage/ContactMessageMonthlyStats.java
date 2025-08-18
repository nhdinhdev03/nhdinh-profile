package com.nhdinh.profile.modules.ContactMessage;

public class ContactMessageMonthlyStats {
    
    private int year;
    private int month;
    private long totalMessages;
    private long pendingMessages;
    private long repliedMessages;
    private String monthName;
    
    public ContactMessageMonthlyStats() {
    }
    
    public ContactMessageMonthlyStats(int year, int month, long totalMessages, 
                                    long pendingMessages, long repliedMessages) {
        this.year = year;
        this.month = month;
        this.totalMessages = totalMessages;
        this.pendingMessages = pendingMessages;
        this.repliedMessages = repliedMessages;
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
    
    public long getTotalMessages() {
        return totalMessages;
    }
    
    public void setTotalMessages(long totalMessages) {
        this.totalMessages = totalMessages;
    }
    
    public long getPendingMessages() {
        return pendingMessages;
    }
    
    public void setPendingMessages(long pendingMessages) {
        this.pendingMessages = pendingMessages;
    }
    
    public long getRepliedMessages() {
        return repliedMessages;
    }
    
    public void setRepliedMessages(long repliedMessages) {
        this.repliedMessages = repliedMessages;
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
        return "ContactMessageMonthlyStats{" +
                "year=" + year +
                ", month=" + month +
                ", totalMessages=" + totalMessages +
                ", pendingMessages=" + pendingMessages +
                ", repliedMessages=" + repliedMessages +
                ", monthName='" + monthName + '\'' +
                '}';
    }
}
