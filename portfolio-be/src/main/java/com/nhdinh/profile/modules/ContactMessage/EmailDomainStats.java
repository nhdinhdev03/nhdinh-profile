package com.nhdinh.profile.modules.ContactMessage;

public class EmailDomainStats {
    
    private String domain;
    private long messageCount;
    private double percentage;
    
    public EmailDomainStats() {
    }
    
    public EmailDomainStats(String domain, long messageCount) {
        this.domain = domain;
        this.messageCount = messageCount;
    }
    
    public EmailDomainStats(String domain, long messageCount, double percentage) {
        this.domain = domain;
        this.messageCount = messageCount;
        this.percentage = percentage;
    }
    
    // Getters and Setters
    public String getDomain() {
        return domain;
    }
    
    public void setDomain(String domain) {
        this.domain = domain;
    }
    
    public long getMessageCount() {
        return messageCount;
    }
    
    public void setMessageCount(long messageCount) {
        this.messageCount = messageCount;
    }
    
    public double getPercentage() {
        return percentage;
    }
    
    public void setPercentage(double percentage) {
        this.percentage = percentage;
    }
    
    @Override
    public String toString() {
        return "EmailDomainStats{" +
                "domain='" + domain + '\'' +
                ", messageCount=" + messageCount +
                ", percentage=" + percentage +
                '}';
    }
}
