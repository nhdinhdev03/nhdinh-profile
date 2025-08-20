package com.nhdinh.profile.response.ContactMessage;

public class ContactMessageStatsResponse {
    
    private long totalMessages;
    private long pendingMessages;
    private long repliedMessages;
    private double replyRate;
    private long messagesThisMonth;
    private long messagesLastMonth;
    private double monthlyGrowthRate;
    private long messagesThisWeek;
    private long messagesToday;
    
    public ContactMessageStatsResponse() {
    }
    
    // Simple constructor for basic stats
    public ContactMessageStatsResponse(long totalMessages, long pendingMessages, long repliedMessages,
                                     long recentCount, long thisMonthCount) {
        this.totalMessages = totalMessages;
        this.pendingMessages = pendingMessages;
        this.repliedMessages = repliedMessages;
        this.replyRate = totalMessages > 0 ? (double) repliedMessages / totalMessages * 100 : 0.0;
        this.messagesThisMonth = thisMonthCount;
        this.messagesLastMonth = 0; // Default value
        this.monthlyGrowthRate = 0.0; // Default value
        this.messagesThisWeek = recentCount;
        this.messagesToday = 0; // Default value
    }
    
    public ContactMessageStatsResponse(long totalMessages, long pendingMessages, long repliedMessages,
                                     double replyRate, long messagesThisMonth, long messagesLastMonth,
                                     double monthlyGrowthRate, long messagesThisWeek, long messagesToday) {
        this.totalMessages = totalMessages;
        this.pendingMessages = pendingMessages;
        this.repliedMessages = repliedMessages;
        this.replyRate = replyRate;
        this.messagesThisMonth = messagesThisMonth;
        this.messagesLastMonth = messagesLastMonth;
        this.monthlyGrowthRate = monthlyGrowthRate;
        this.messagesThisWeek = messagesThisWeek;
        this.messagesToday = messagesToday;
    }
    
    // Getters and Setters
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
    
    public double getReplyRate() {
        return replyRate;
    }
    
    public void setReplyRate(double replyRate) {
        this.replyRate = replyRate;
    }
    
    public long getMessagesThisMonth() {
        return messagesThisMonth;
    }
    
    public void setMessagesThisMonth(long messagesThisMonth) {
        this.messagesThisMonth = messagesThisMonth;
    }
    
    public long getMessagesLastMonth() {
        return messagesLastMonth;
    }
    
    public void setMessagesLastMonth(long messagesLastMonth) {
        this.messagesLastMonth = messagesLastMonth;
    }
    
    public double getMonthlyGrowthRate() {
        return monthlyGrowthRate;
    }
    
    public void setMonthlyGrowthRate(double monthlyGrowthRate) {
        this.monthlyGrowthRate = monthlyGrowthRate;
    }
    
    public long getMessagesThisWeek() {
        return messagesThisWeek;
    }
    
    public void setMessagesThisWeek(long messagesThisWeek) {
        this.messagesThisWeek = messagesThisWeek;
    }
    
    public long getMessagesToday() {
        return messagesToday;
    }
    
    public void setMessagesToday(long messagesToday) {
        this.messagesToday = messagesToday;
    }
    
    @Override
    public String toString() {
        return "ContactMessageStatsResponse{" +
                "totalMessages=" + totalMessages +
                ", pendingMessages=" + pendingMessages +
                ", repliedMessages=" + repliedMessages +
                ", replyRate=" + replyRate +
                ", messagesThisMonth=" + messagesThisMonth +
                ", messagesLastMonth=" + messagesLastMonth +
                ", monthlyGrowthRate=" + monthlyGrowthRate +
                ", messagesThisWeek=" + messagesThisWeek +
                ", messagesToday=" + messagesToday +
                '}';
    }
}
