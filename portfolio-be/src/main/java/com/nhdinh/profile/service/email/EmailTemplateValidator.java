package com.nhdinh.profile.service.email;

import org.springframework.stereotype.Service;
import java.util.ArrayList;
import java.util.List;
import java.util.regex.Pattern;

/**
 * Service để validate email templates và content
 */
@Service
public class EmailTemplateValidator {

    private static final Pattern EMAIL_PATTERN = Pattern.compile(
        "^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\\.[a-zA-Z]{2,}$"
    );
    
    private static final int MAX_SUBJECT_LENGTH = 200;
    private static final int MAX_CONTENT_LENGTH = 10000;
    private static final int MIN_CONTENT_LENGTH = 10;

    /**
     * Validate email address
     */
    public boolean isValidEmail(String email) {
        return email != null && EMAIL_PATTERN.matcher(email).matches();
    }

    /**
     * Validate email subject
     */
    public ValidationResult validateSubject(String subject) {
        List<String> errors = new ArrayList<>();
        
        if (subject == null || subject.trim().isEmpty()) {
            errors.add("Subject không được để trống");
        } else if (subject.length() > MAX_SUBJECT_LENGTH) {
            errors.add("Subject không được vượt quá " + MAX_SUBJECT_LENGTH + " ký tự");
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }

    /**
     * Validate email content
     */
    public ValidationResult validateContent(String content) {
        List<String> errors = new ArrayList<>();
        
        if (content == null || content.trim().isEmpty()) {
            errors.add("Nội dung email không được để trống");
        } else {
            int contentLength = content.trim().length();
            if (contentLength < MIN_CONTENT_LENGTH) {
                errors.add("Nội dung email phải có ít nhất " + MIN_CONTENT_LENGTH + " ký tự");
            } else if (contentLength > MAX_CONTENT_LENGTH) {
                errors.add("Nội dung email không được vượt quá " + MAX_CONTENT_LENGTH + " ký tự");
            }
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }

    /**
     * Validate toàn bộ email request
     */
    public ValidationResult validateEmailRequest(String to, String subject, String content) {
        List<String> allErrors = new ArrayList<>();
        
        // Validate email address
        if (!isValidEmail(to)) {
            allErrors.add("Email người nhận không hợp lệ: " + to);
        }
        
        // Validate subject
        ValidationResult subjectResult = validateSubject(subject);
        if (!subjectResult.isValid()) {
            allErrors.addAll(subjectResult.errors());
        }
        
        // Validate content
        ValidationResult contentResult = validateContent(content);
        if (!contentResult.isValid()) {
            allErrors.addAll(contentResult.errors());
        }
        
        return new ValidationResult(allErrors.isEmpty(), allErrors);
    }

    /**
     * Validate contact message cho email
     */
    public ValidationResult validateContactMessage(String fullName, String email, String message) {
        List<String> errors = new ArrayList<>();
        
        // Validate full name
        if (fullName == null || fullName.trim().isEmpty()) {
            errors.add("Họ tên không được để trống");
        } else if (fullName.trim().length() < 2) {
            errors.add("Họ tên phải có ít nhất 2 ký tự");
        } else if (fullName.trim().length() > 100) {
            errors.add("Họ tên không được vượt quá 100 ký tự");
        }
        
        // Validate email
        if (!isValidEmail(email)) {
            errors.add("Email không hợp lệ");
        }
        
        // Validate message
        ValidationResult messageResult = validateContent(message);
        if (!messageResult.isValid()) {
            errors.addAll(messageResult.errors());
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }

    /**
     * Kiểm tra HTML content có an toàn không
     */
    public ValidationResult validateHtmlContent(String htmlContent) {
        List<String> errors = new ArrayList<>();
        
        if (htmlContent == null || htmlContent.trim().isEmpty()) {
            errors.add("HTML content không được để trống");
            return new ValidationResult(false, errors);
        }
        
        // Kiểm tra các thẻ nguy hiểm
        String[] dangerousTags = {"<script", "<iframe", "<object", "<embed", "<form"};
        String lowerContent = htmlContent.toLowerCase();
        
        for (String tag : dangerousTags) {
            if (lowerContent.contains(tag)) {
                errors.add("HTML content chứa thẻ không an toàn: " + tag);
            }
        }
        
        // Kiểm tra javascript events
        String[] dangerousEvents = {"onclick", "onload", "onerror", "onmouseover"};
        for (String event : dangerousEvents) {
            if (lowerContent.contains(event)) {
                errors.add("HTML content chứa JavaScript event không an toàn: " + event);
            }
        }
        
        return new ValidationResult(errors.isEmpty(), errors);
    }

    /**
     * Sanitize content để loại bỏ các ký tự nguy hiểm
     */
    public String sanitizeContent(String content) {
        if (content == null) return "";
        
        return content
            .replace("<script", "&lt;script")
            .replace("</script>", "&lt;/script&gt;")
            .replace("javascript:", "")
            .replace("vbscript:", "")
            .replace("onload=", "")
            .replace("onerror=", "")
            .replace("onclick=", "");
    }

    /**
     * Format Vietnamese text để hiển thị đúng
     */
    public String formatVietnameseText(String text) {
        if (text == null) return "";
        
        // Normalize Vietnamese characters
        return text.trim()
                  .replaceAll("\\s+", " ") // Remove multiple spaces
                  .replaceAll("[\r\n]+", "\n"); // Normalize line breaks
    }

    /**
     * Kiểm tra spam content
     */
    public ValidationResult checkSpamContent(String content) {
        List<String> errors = new ArrayList<>();
        
        if (content == null) {
            return new ValidationResult(true, errors);
        }
        
        String lowerContent = content.toLowerCase();
        
        // Spam keywords
        String[] spamKeywords = {
            "click here", "free money", "limited time", "act now",
            "congratulations", "you've won", "urgent", "immediate"
        };
        
        int spamScore = 0;
        for (String keyword : spamKeywords) {
            if (lowerContent.contains(keyword)) {
                spamScore++;
            }
        }
        
        // Kiểm tra CAPS LOCK abuse
        long capsCount = content.chars().filter(Character::isUpperCase).count();
        double capsPercentage = (double) capsCount / content.length() * 100;
        
        if (capsPercentage > 50) {
            spamScore += 2;
            errors.add("Nội dung có quá nhiều chữ hoa");
        }
        
        // Kiểm tra repeated characters
        if (content.matches(".*([a-zA-Z])\\1{4,}.*")) {
            spamScore++;
            errors.add("Nội dung có ký tự lặp lại quá nhiều");
        }
        
        if (spamScore >= 3) {
            errors.add("Nội dung có dấu hiệu spam (điểm: " + spamScore + ")");
        }
        
        return new ValidationResult(spamScore < 3, errors);
    }

    /**
     * Record class cho validation result
     */
    public record ValidationResult(
        boolean isValid,
        List<String> errors
    ) {
        public String getErrorsAsString() {
            return String.join(", ", errors);
        }
        
        public boolean hasErrors() {
            return !errors.isEmpty();
        }
    }
}
