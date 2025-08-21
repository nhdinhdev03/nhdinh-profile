package com.nhdinh.profile.utils;

public class SuccessResponse<T> {
    private String message;
    private T data;
    private int status;
    private long timestamp;
    
    public SuccessResponse() {
        this.timestamp = System.currentTimeMillis();
    }
    
    public SuccessResponse(String message, T data, int status) {
        this();
        this.message = message;
        this.data = data;
        this.status = status;
    }
    
    public SuccessResponse(T data, int status) {
        this();
        this.data = data;
        this.status = status;
        this.message = "Thành công";
    }
    
    // Getters and setters
    public String getMessage() {
        return message;
    }
    
    public void setMessage(String message) {
        this.message = message;
    }
    
    public T getData() {
        return data;
    }
    
    public void setData(T data) {
        this.data = data;
    }
    
    public int getStatus() {
        return status;
    }
    
    public void setStatus(int status) {
        this.status = status;
    }
    
    public long getTimestamp() {
        return timestamp;
    }
    
    public void setTimestamp(long timestamp) {
        this.timestamp = timestamp;
    }
}
