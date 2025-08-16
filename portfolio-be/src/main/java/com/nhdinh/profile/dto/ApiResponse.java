package com.nhdinh.profile.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
    private Long totalElements;
    private Integer totalPages;
    private Integer currentPage;
    private Integer pageSize;
    private LocalDateTime timestamp;
    
    public static <T> ApiResponse<T> success(T data) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Thành công");
        response.setData(data);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
    
    public static <T> ApiResponse<T> success(T data, String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage(message);
        response.setData(data);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
    
    public static <T> ApiResponse<List<T>> success(List<T> data, Long totalElements, Integer totalPages, Integer currentPage, Integer pageSize) {
        ApiResponse<List<T>> response = new ApiResponse<>();
        response.setSuccess(true);
        response.setMessage("Lấy dữ liệu thành công - sắp xếp từ cao xuống thấp");
        response.setData(data);
        response.setTotalElements(totalElements);
        response.setTotalPages(totalPages);
        response.setCurrentPage(currentPage);
        response.setPageSize(pageSize);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
    
    public static <T> ApiResponse<T> error(String message) {
        ApiResponse<T> response = new ApiResponse<>();
        response.setSuccess(false);
        response.setMessage(message);
        response.setTimestamp(LocalDateTime.now());
        return response;
    }
}
