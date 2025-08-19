package com.nhdinh.profile.modules.ContactMessage;

import java.util.List;

public class ContactMessageSummaryResponse {
    
    private ContactMessageStatsResponse statistics;
    private List<ContactMessage> recentMessages;
    private List<ContactMessage> pendingMessages;
    private List<ContactMessageMonthlyStats> monthlyStats;
    private List<EmailDomainStats> topEmailDomains;
    
    public ContactMessageSummaryResponse() {
    }
    
    // Simple constructor for basic summary
    public ContactMessageSummaryResponse(List<ContactMessage> pendingMessages,
                                       List<ContactMessage> recentMessages,
                                       ContactMessageStatsResponse statistics) {
        this.pendingMessages = pendingMessages;
        this.recentMessages = recentMessages;
        this.statistics = statistics;
        this.monthlyStats = null; // Can be set later if needed
        this.topEmailDomains = null; // Can be set later if needed
    }
    
    public ContactMessageSummaryResponse(ContactMessageStatsResponse statistics,
                                       List<ContactMessage> recentMessages,
                                       List<ContactMessage> pendingMessages,
                                       List<ContactMessageMonthlyStats> monthlyStats,
                                       List<EmailDomainStats> topEmailDomains) {
        this.statistics = statistics;
        this.recentMessages = recentMessages;
        this.pendingMessages = pendingMessages;
        this.monthlyStats = monthlyStats;
        this.topEmailDomains = topEmailDomains;
    }
    
    // Getters and Setters
    public ContactMessageStatsResponse getStatistics() {
        return statistics;
    }
    
    public void setStatistics(ContactMessageStatsResponse statistics) {
        this.statistics = statistics;
    }
    
    public List<ContactMessage> getRecentMessages() {
        return recentMessages;
    }
    
    public void setRecentMessages(List<ContactMessage> recentMessages) {
        this.recentMessages = recentMessages;
    }
    
    public List<ContactMessage> getPendingMessages() {
        return pendingMessages;
    }
    
    public void setPendingMessages(List<ContactMessage> pendingMessages) {
        this.pendingMessages = pendingMessages;
    }
    
    public List<ContactMessageMonthlyStats> getMonthlyStats() {
        return monthlyStats;
    }
    
    public void setMonthlyStats(List<ContactMessageMonthlyStats> monthlyStats) {
        this.monthlyStats = monthlyStats;
    }
    
    public List<EmailDomainStats> getTopEmailDomains() {
        return topEmailDomains;
    }
    
    public void setTopEmailDomains(List<EmailDomainStats> topEmailDomains) {
        this.topEmailDomains = topEmailDomains;
    }
    
    @Override
    public String toString() {
        return "ContactMessageSummaryResponse{" +
                "statistics=" + statistics +
                ", recentMessages=" + (recentMessages != null ? recentMessages.size() + " messages" : "null") +
                ", pendingMessages=" + (pendingMessages != null ? pendingMessages.size() + " messages" : "null") +
                ", monthlyStats=" + (monthlyStats != null ? monthlyStats.size() + " months" : "null") +
                ", topEmailDomains=" + (topEmailDomains != null ? topEmailDomains.size() + " domains" : "null") +
                '}';
    }
}
