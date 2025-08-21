package com.nhdinh.profile.service.email;

import java.io.UnsupportedEncodingException;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import com.nhdinh.profile.modules.ContactMessage.ContactMessage;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Service
public class EmailService {

    private final JavaMailSender javaMailSender;
    private final String fromEmail;
    private final String adminEmail;
    private final EmailMonitoringService monitoringService;

    public EmailService(JavaMailSender javaMailSender,
                       @Value("${spring.mail.username}") String fromEmail,
                       @Value("${app.admin.email:nhdinhpc03@gmail.com}") String adminEmail,
                       EmailMonitoringService monitoringService) {
        this.javaMailSender = javaMailSender;
        this.fromEmail = fromEmail;
        this.adminEmail = adminEmail;
        this.monitoringService = monitoringService;
    }

    // Template Constants with Enhanced Professional CSS
    private static final String EMAIL_STYLE = """
                <style>
                    @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');
                    
                    * {
                        margin: 0;
                        padding: 0;
                        box-sizing: border-box;
                    }
                    
                    body { 
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif; 
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%);
                        margin: 0; 
                        padding: 20px;
                        line-height: 1.6;
                        font-size: 16px;
                        color: #333333;
                        -webkit-font-smoothing: antialiased;
                        -moz-osx-font-smoothing: grayscale;
                        min-height: 100vh;
                    }
                    
                    .container { 
                        max-width: 650px; 
                        margin: 0 auto; 
                        background-color: #ffffff; 
                        border-radius: 20px; 
                        box-shadow: 0 25px 50px rgba(0,0,0,0.15), 0 10px 20px rgba(0,0,0,0.1); 
                        overflow: hidden;
                        border: 1px solid rgba(255,255,255,0.2);
                    }
                    
                    .header { 
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); 
                        color: white; 
                        padding: 50px 40px; 
                        text-align: center; 
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .header::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        bottom: 0;
                        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.1"/><circle cx="10" cy="60" r="0.5" fill="white" opacity="0.1"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(#grain)"/></svg>');
                        opacity: 0.3;
                    }
                    
                    .header h1 { 
                        margin: 0; 
                        font-size: 36px; 
                        font-weight: 700; 
                        letter-spacing: -0.02em;
                        position: relative;
                        z-index: 1;
                        text-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    .header p { 
                        margin: 12px 0 0 0; 
                        font-size: 18px; 
                        opacity: 0.95; 
                        font-weight: 400;
                        position: relative;
                        z-index: 1;
                    }
                    
                    .content { 
                        padding: 50px 40px; 
                        background-color: #ffffff;
                        position: relative;
                    }
                    
                    .highlight { 
                        background: linear-gradient(135deg, #f8faff 0%%, #f3f4f6 100%%); 
                        border-left: 5px solid #667eea; 
                        padding: 25px; 
                        margin: 30px 0; 
                        border-radius: 12px;
                        box-shadow: 0 4px 6px rgba(0,0,0,0.05);
                        position: relative;
                    }
                    
                    .highlight::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 3px;
                        background: linear-gradient(90deg, #667eea 0%%, #764ba2 100%%);
                        border-radius: 12px 12px 0 0;
                    }
                    
                    .button { 
                        display: inline-block; 
                        background: linear-gradient(135deg, #667eea 0%%, #764ba2 100%%); 
                        color: white !important; 
                        padding: 16px 32px; 
                        text-decoration: none; 
                        border-radius: 12px; 
                        font-weight: 600; 
                        margin: 30px 0;
                        box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
                        transition: all 0.3s ease;
                        font-size: 16px;
                        letter-spacing: 0.025em;
                        border: none;
                        cursor: pointer;
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .button::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: -100%%;
                        width: 100%%;
                        height: 100%%;
                        background: linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent);
                        transition: left 0.5s;
                    }
                    
                    .button:hover::before {
                        left: 100%%;
                    }
                    
                    .footer { 
                        background: linear-gradient(135deg, #f8faff 0%%, #f3f4f6 100%%); 
                        padding: 40px; 
                        text-align: center; 
                        font-size: 15px; 
                        color: #6b7280;
                        border-top: 1px solid #e5e7eb;
                        position: relative;
                    }
                    
                    .footer strong {
                        color: #374151;
                        font-weight: 600;
                    }
                    
                    .message-box { 
                        background: linear-gradient(135deg, #ffffff 0%%, #fafbff 100%%);
                        border: 2px solid #e5e7eb; 
                        border-radius: 16px; 
                        padding: 30px; 
                        margin: 25px 0;
                        box-shadow: 0 4px 12px rgba(0,0,0,0.08);
                        position: relative;
                        overflow: hidden;
                    }
                    
                    .message-box::before {
                        content: '';
                        position: absolute;
                        top: 0;
                        left: 0;
                        right: 0;
                        height: 4px;
                        background: linear-gradient(90deg, #667eea 0%%, #764ba2 100%%);
                    }
                    
                    .label { 
                        font-weight: 600; 
                        color: #4b5563; 
                        display: inline-block; 
                        min-width: 120px;
                        font-size: 14px;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-bottom: 8px;
                    }
                    
                    .divider { 
                        height: 2px; 
                        background: linear-gradient(90deg, transparent, #e5e7eb 20%%, #e5e7eb 80%%, transparent); 
                        margin: 30px 0; 
                        border-radius: 1px;
                    }
                    
                    .status-badge {
                        display: inline-block;
                        padding: 8px 16px;
                        border-radius: 25px;
                        font-size: 12px;
                        font-weight: 600;
                        text-transform: uppercase;
                        letter-spacing: 0.05em;
                        margin-bottom: 20px;
                        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                    }
                    
                    .status-new {
                        background: linear-gradient(135deg, #dbeafe 0%%, #bfdbfe 100%%);
                        color: #1e40af;
                        border: 1px solid #93c5fd;
                    }
                    
                    .status-success {
                        background: linear-gradient(135deg, #dcfce7 0%%, #bbf7d0 100%%);
                        color: #166534;
                        border: 1px solid #86efac;
                    }
                    
                    .vietnamese-text {
                        font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', system-ui, sans-serif;
                        line-height: 1.8;
                        color: #374151;
                    }
                    
                    .contact-info {
                        background: linear-gradient(135deg, #f8faff 0%%, #f3f4f6 100%%);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 20px 0;
                        border-left: 4px solid #667eea;
                    }
                    
                    .contact-info strong {
                        color: #667eea;
                        font-weight: 600;
                    }
                    
                    .contact-info p {
                        margin: 10px 0;
                        font-size: 15px;
                    }
                    
                    .emoji {
                        font-size: 22px;
                        margin-right: 10px;
                        filter: drop-shadow(0 1px 2px rgba(0,0,0,0.1));
                    }
                    
                    .info-card {
                        background: linear-gradient(135deg, #f0f9ff 0%%, #e0f2fe 100%%);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 25px 0;
                        border-left: 4px solid #0891b2;
                        box-shadow: 0 2px 8px rgba(8, 145, 178, 0.1);
                    }
                    
                    .warning-card {
                        background: linear-gradient(135deg, #fef3c7 0%%, #fde68a 100%%);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 25px 0;
                        border-left: 4px solid #f59e0b;
                        box-shadow: 0 2px 8px rgba(245, 158, 11, 0.1);
                    }
                    
                    .success-card {
                        background: linear-gradient(135deg, #f0fdf4 0%%, #dcfce7 100%%);
                        border-radius: 12px;
                        padding: 20px;
                        margin: 25px 0;
                        border-left: 4px solid #22c55e;
                        box-shadow: 0 2px 8px rgba(34, 197, 94, 0.1);
                    }
                    
                    .signature {
                        text-align: center;
                        margin-top: 40px;
                        padding-top: 30px;
                        border-top: 2px solid #f3f4f6;
                    }
                    
                    .signature .name {
                        font-size: 20px;
                        font-weight: 700;
                        color: #1f2937;
                        margin: 10px 0;
                    }
                    
                    .signature .title {
                        font-size: 16px;
                        color: #6b7280;
                        font-weight: 500;
                    }
                    
                    /* Responsive Design */
                    @media only screen and (max-width: 600px) {
                        body { padding: 10px; }
                        .container { 
                            border-radius: 12px;
                            margin: 10px 0;
                        }
                        .header { 
                            padding: 40px 25px; 
                        }
                        .header h1 { 
                            font-size: 28px; 
                        }
                        .content { 
                            padding: 30px 25px; 
                        }
                        .footer { 
                            padding: 25px; 
                        }
                        .message-box { 
                            padding: 20px; 
                        }
                        .button { 
                            padding: 14px 28px;
                            font-size: 15px;
                        }
                        .contact-info {
                            padding: 16px;
                        }
                        .highlight {
                            padding: 20px;
                        }
                    }
                    
                    /* Dark mode support */
                    @media (prefers-color-scheme: dark) {
                        .container {
                            background-color: #1f2937;
                            color: #f9fafb;
                        }
                        .content {
                            background-color: #1f2937;
                        }
                        .vietnamese-text {
                            color: #f3f4f6;
                        }
                        .message-box {
                            background: linear-gradient(135deg, #374151 0%%, #4b5563 100%%);
                            border-color: #6b7280;
                        }
                        .label {
                            color: #d1d5db;
                        }
                    }
                    
                    /* Animation for professional touch */
                    @keyframes fadeInUp {
                        from {
                            opacity: 0;
                            transform: translateY(20px);
                        }
                        to {
                            opacity: 1;
                            transform: translateY(0);
                        }
                    }
                    
                    .content > * {
                        animation: fadeInUp 0.6s ease-out;
                    }
                </style>
            """;

    /**
     * Phương thức chung để gửi email HTML với monitoring
     */
    public void sendEmail(String to, String subject, String htmlContent) throws MessagingException {
        sendEmail(to, subject, htmlContent, "general");
    }
    
    /**
     * Phương thức chung để gửi email HTML với monitoring và email type
     */
    public void sendEmail(String to, String subject, String htmlContent, String emailType) throws MessagingException {
        long startTime = System.currentTimeMillis();
        monitoringService.logEmailStart(emailType, to, subject);
        
        try {
            MimeMessage mimeMessage = javaMailSender.createMimeMessage();
            MimeMessageHelper helper = new MimeMessageHelper(mimeMessage, true, "UTF-8");

            helper.setTo(to);
            try {
                helper.setFrom(fromEmail, "NhDinh Portfolio");
            } catch (UnsupportedEncodingException e) {
                helper.setFrom(fromEmail);
            }
            helper.setSubject(subject);
            helper.setText(htmlContent, true);

            javaMailSender.send(mimeMessage);
            
            long duration = System.currentTimeMillis() - startTime;
            monitoringService.logEmailSent(emailType, to, subject);
            monitoringService.logPerformanceMetric("sendEmail", duration);
            
        } catch (MessagingException e) {
            monitoringService.logEmailFailed(emailType, to, subject, e);
            throw e;
        }
    }

    /**
     * Gửi email thông báo cho admin khi có contact message mới
     */
    public void sendNewContactMessageNotification(ContactMessage contactMessage) throws MessagingException {
        String subject = "📧 Tin nhắn mới - " + contactMessage.getSubject();
        String content = createNewContactMessageEmailContent(contactMessage);
        sendEmail(adminEmail, subject, content, "contact_notification");
    }

    /**
     * Gửi email xác nhận cho người gửi contact message
     */
    public void sendContactConfirmationEmail(ContactMessage contactMessage) throws MessagingException {
        String subject = "✅ Đã nhận tin nhắn - Cảm ơn bạn đã liên hệ";
        String content = createContactConfirmationEmailContent(contactMessage);
        sendEmail(contactMessage.getEmail(), subject, content, "confirmation");
    }

    /**
     * Gửi email phản hồi contact message
     */
    public void sendContactReplyEmail(String toEmail, String originalSubject, String originalMessage,
            String replyMessage) throws MessagingException {
        String subject = "📩 Phản hồi: " + originalSubject;
        String content = createContactReplyEmailContent(originalSubject, originalMessage, replyMessage);
        sendEmail(toEmail, subject, content, "reply");
    }

    /**
     * Tạo nội dung email thông báo contact message mới cho admin
     */
    private String createNewContactMessageEmailContent(ContactMessage contactMessage) {
        return EMAIL_STYLE + 
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1><span class=\"emoji\">📧</span>Tin nhắn mới từ Portfolio</h1>" +
                        "<p class=\"vietnamese-text\">Bạn có một tin nhắn mới từ website cá nhân</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<div class=\"status-badge status-new\">Tin nhắn mới</div>" +
                        
                        "<div class=\"message-box\">" +
                            "<div class=\"contact-info\">" +
                                "<p><span class=\"label\">Người gửi:</span> <strong>" + contactMessage.getFullName() + "</strong></p>" +
                                "<p><span class=\"label\">Email:</span> <a href=\"mailto:" + contactMessage.getEmail() + "\" style=\"color: #667eea; text-decoration: none; font-weight: 600;\">" + contactMessage.getEmail() + "</a></p>" +
                                "<p><span class=\"label\">Chủ đề:</span> <span class=\"vietnamese-text\" style=\"font-weight: 600;\">" + (contactMessage.getSubject() != null ? contactMessage.getSubject() : "Không có chủ đề") + "</span></p>" +
                                "<p><span class=\"label\">Thời gian:</span> <span style=\"font-weight: 500;\">" + formatDateTime(contactMessage.getCreatedAt()) + "</span></p>" +
                            "</div>" +

                            "<div class=\"divider\"></div>" +

                            "<div class=\"highlight\">" +
                                "<strong style=\"color: #374151; font-size: 18px; display: block; margin-bottom: 15px;\">💬 Nội dung tin nhắn:</strong>" +
                                "<div class=\"vietnamese-text\" style=\"font-size: 16px; line-height: 1.8; color: #4b5563; background: white; padding: 20px; border-radius: 8px; border-left: 4px solid #667eea;\">" +
                                    formatMessageContent(contactMessage.getContent()) +
                                "</div>" +
                            "</div>" +
                        "</div>" +

                        "<div style=\"text-align: center; margin: 40px 0;\">" +
                            "<a href=\"mailto:" + contactMessage.getEmail() + "?subject=Re: " + (contactMessage.getSubject() != null ? contactMessage.getSubject() : "Tin nhắn từ Portfolio") + "\" class=\"button\">" +
                                "<span class=\"emoji\">💬</span>Trả lời ngay" +
                            "</a>" +
                        "</div>" +
                        
                        "<div class=\"info-card\">" +
                            "<p style=\"margin: 0; font-size: 15px; color: #0891b2; font-weight: 500;\">" +
                                "<span class=\"emoji\">💡</span><strong>Mẹo chuyên nghiệp:</strong> Nhấn vào nút \"Trả lời ngay\" để mở ứng dụng email với nội dung đã chuẩn bị sẵn, bao gồm cả subject line phù hợp." +
                            "</p>" +
                        "</div>" +
                        
                        "<div class=\"warning-card\">" +
                            "<p style=\"margin: 0; font-size: 14px; color: #92400e; font-weight: 500;\">" +
                                "<span class=\"emoji\">⚡</span><strong>Lưu ý:</strong> Tin nhắn này được gửi thông qua hệ thống portfolio có tích hợp rate limiting (15 phút/lần) để tránh spam." +
                            "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<div class=\"signature\">" +
                            "<p class=\"vietnamese-text\">Thông báo tự động từ</p>" +
                            "<p class=\"name\">NhDinh Portfolio System</p>" +
                            "<p class=\"title\">Professional Contact Management</p>" +
                        "</div>" +
                        "<div class=\"divider\" style=\"margin: 25px 0;\"></div>" +
                        "<p style=\"font-size: 12px; opacity: 0.7; margin: 10px 0;\">ID tin nhắn: <code style=\"background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', monospace;\">" + contactMessage.getMessageId() + "</code></p>" +
                        "<p style=\"font-size: 12px; margin-top: 20px;\">" +
                            "© 2024 Nguyễn Hoàng Dinh | Full Stack Developer Portfolio" +
                        "</p>" +
                    "</div>" +
                "</div>";
    }

    /**
     * Tạo nội dung email xác nhận cho người gửi
     */
    private String createContactConfirmationEmailContent(ContactMessage contactMessage) {
        return EMAIL_STYLE + 
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1><span class=\"emoji\">✅</span>Đã nhận được tin nhắn</h1>" +
                        "<p class=\"vietnamese-text\">Cảm ơn bạn đã liên hệ với NhDinh Portfolio</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<div class=\"status-badge status-success\">Đã tiếp nhận</div>" +
                        
                        "<p class=\"vietnamese-text\" style=\"font-size: 18px; margin: 30px 0; text-align: center;\">" +
                            "Xin chào <strong style=\"color: #667eea; font-size: 20px;\">" + contactMessage.getFullName() + "</strong>! 👋" +
                        "</p>" +

                        "<p class=\"vietnamese-text\" style=\"line-height: 1.8; margin-bottom: 30px; font-size: 16px; text-align: center;\">" +
                            "Cảm ơn bạn đã dành thời gian liên hệ thông qua website cá nhân của tôi. Tin nhắn của bạn đã được tiếp nhận thành công và tôi sẽ phản hồi trong thời gian sớm nhất có thể." +
                        "</p>" +

                        "<div class=\"highlight\">" +
                            "<strong style=\"color: #374151; font-size: 18px; display: block; margin-bottom: 20px;\">📋 Tóm tắt tin nhắn của bạn:</strong>" +
                            "<div class=\"vietnamese-text\">" +
                                "<div style=\"display: grid; gap: 12px;\">" +
                                    "<p style=\"margin: 0; display: flex; justify-content: space-between;\"><span class=\"label\" style=\"min-width: auto;\">Chủ đề:</span> <span style=\"font-weight: 600; text-align: right; flex: 1; margin-left: 20px;\">" + (contactMessage.getSubject() != null ? contactMessage.getSubject() : "Không có chủ đề") + "</span></p>" +
                                    "<p style=\"margin: 0; display: flex; justify-content: space-between;\"><span class=\"label\" style=\"min-width: auto;\">Thời gian gửi:</span> <span style=\"font-weight: 500; text-align: right; flex: 1; margin-left: 20px;\">" + formatDateTime(contactMessage.getCreatedAt()) + "</span></p>" +
                                    "<p style=\"margin: 0; display: flex; justify-content: space-between; align-items: center;\"><span class=\"label\" style=\"min-width: auto;\">Trạng thái:</span> <span class=\"status-badge status-success\" style=\"margin: 0; margin-left: 20px;\">Đang xử lý</span></p>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +

                        "<div class=\"warning-card\">" +
                            "<p class=\"vietnamese-text\" style=\"margin: 0; font-size: 16px; color: #92400e; line-height: 1.7; text-align: center;\">" +
                                "<span class=\"emoji\">⏱️</span><strong>Thời gian phản hồi dự kiến</strong><br><br>" +
                                "Tôi thường trả lời tin nhắn trong vòng <strong>24-48 giờ</strong> trong các ngày làm việc. Nếu câu hỏi của bạn cần xử lý gấp, vui lòng liên hệ trực tiếp qua email bên dưới." +
                            "</p>" +
                        "</div>" +

                        "<div style=\"text-align: center; margin: 40px 0;\">" +
                            "<a href=\"mailto:" + adminEmail + "\" class=\"button\">" +
                                "<span class=\"emoji\">📧</span>Liên hệ trực tiếp" +
                            "</a>" +
                        "</div>" +
                        
                        "<div class=\"success-card\">" +
                            "<p style=\"margin: 0; font-size: 16px; color: #166534; font-weight: 500; text-align: center; line-height: 1.7;\">" +
                                "<span class=\"emoji\">🤝</span><strong>Tôi rất mong được hợp tác và hỗ trợ bạn!</strong><br><br>" +
                                "Cảm ơn bạn đã tin tưởng và lựa chọn liên hệ với tôi. Tôi sẽ cố gắng hết sức để cung cấp thông tin hữu ích và phù hợp nhất." +
                            "</p>" +
                        "</div>" +
                        
                        "<div class=\"info-card\">" +
                            "<p style=\"margin: 0; font-size: 14px; color: #0891b2; font-weight: 500; text-align: center;\">" +
                                "<span class=\"emoji\">🔒</span><strong>Bảo mật thông tin:</strong> Thông tin liên hệ của bạn được bảo mật tuyệt đối và chỉ được sử dụng để phản hồi yêu cầu của bạn." +
                            "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<div class=\"signature\">" +
                            "<p class=\"vietnamese-text\"><strong>Trân trọng,</strong></p>" +
                            "<p class=\"name\">Nguyễn Hoàng Dinh</p>" +
                            "<p class=\"title\">Full Stack Developer | NhDinh Portfolio</p>" +
                            "<p style=\"margin-top: 15px; font-size: 14px; color: #6b7280;\">📧 " + adminEmail + "</p>" +
                        "</div>" +
                        "<div class=\"divider\" style=\"margin: 25px 0;\"></div>" +
                        "<p style=\"font-size: 12px; opacity: 0.7; margin: 10px 0;\">Mã tham chiếu: <code style=\"background: #f3f4f6; padding: 2px 6px; border-radius: 4px; font-family: 'Monaco', monospace;\">" + contactMessage.getMessageId() + "</code></p>" +
                        "<p style=\"font-size: 12px; margin-top: 20px;\">" +
                            "© 2024 Nguyễn Hoàng Dinh | Portfolio System" +
                        "</p>" +
                    "</div>" +
                "</div>";
    }

    /**
     * Tạo nội dung email phản hồi
     */
    private String createContactReplyEmailContent(String originalSubject, String originalMessage, String replyMessage) {
        return EMAIL_STYLE + 
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1><span class=\"emoji\">💬</span>Phản hồi từ NhDinh</h1>" +
                        "<p class=\"vietnamese-text\">Cảm ơn bạn đã kiên nhẫn chờ đợi</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<div class=\"status-badge status-success\">Đã phản hồi</div>" +
                        
                        "<p class=\"vietnamese-text\" style=\"font-size: 18px; margin: 30px 0; text-align: center;\">" +
                            "Xin chào! 👋" +
                        "</p>" +

                        "<p class=\"vietnamese-text\" style=\"line-height: 1.8; margin-bottom: 30px; font-size: 16px; text-align: center;\">" +
                            "Cảm ơn bạn đã liên hệ với tôi thông qua website cá nhân. Tôi rất vui khi được trả lời câu hỏi của bạn. Dưới đây là phản hồi chi tiết:" +
                        "</p>" +

                        "<div class=\"highlight\">" +
                            "<strong style=\"color: #374151; font-size: 18px; display: block; margin-bottom: 20px;\"><span class=\"emoji\">✍️</span>Phản hồi của tôi:</strong>" +
                            "<div class=\"vietnamese-text\" style=\"font-size: 16px; line-height: 1.8; color: #4b5563; background: white; padding: 25px; border-radius: 12px; border-left: 4px solid #22c55e; box-shadow: 0 2px 8px rgba(0,0,0,0.05);\">" +
                                formatMessageContent(replyMessage) +
                            "</div>" +
                        "</div>" +

                        "<div class=\"divider\"></div>" +

                        "<div class=\"message-box\">" +
                            "<p style=\"margin: 0 0 20px 0; text-align: center;\"><strong style=\"color: #374151; font-size: 16px;\">📋 Tin nhắn gốc của bạn</strong></p>" +
                            "<div class=\"contact-info\">" +
                                "<p style=\"margin: 12px 0; display: flex; justify-content: space-between; align-items: center;\">" +
                                    "<span class=\"label\" style=\"min-width: auto;\">Chủ đề:</span>" +
                                    "<span class=\"vietnamese-text\" style=\"font-weight: 600; text-align: right; flex: 1; margin-left: 20px;\">" + originalSubject + "</span>" +
                                "</p>" +
                                "<div style=\"margin: 20px 0;\">" +
                                    "<strong style=\"display: block; margin-bottom: 10px; color: #374151;\">Nội dung:</strong>" +
                                    "<div class=\"vietnamese-text\" style=\"font-size: 15px; line-height: 1.7; color: #6b7280; padding: 16px; background: #f9fafb; border-radius: 8px; border-left: 3px solid #e5e7eb;\">" +
                                        formatMessageContent(originalMessage) +
                                    "</div>" +
                                "</div>" +
                            "</div>" +
                        "</div>" +

                        "<div class=\"success-card\">" +
                            "<p class=\"vietnamese-text\" style=\"margin: 0; font-size: 16px; color: #166534; line-height: 1.7; text-align: center;\">" +
                                "<span class=\"emoji\">💡</span><strong>Có thêm câu hỏi?</strong><br><br>" +
                                "Nếu bạn có bất kỳ câu hỏi nào khác hoặc cần thảo luận thêm về vấn đề này, đừng ngần ngại liên hệ trực tiếp với tôi. Tôi luôn sẵn sàng hỗ trợ!" +
                            "</p>" +
                        "</div>" +

                        "<div style=\"text-align: center; margin: 40px 0;\">" +
                            "<a href=\"mailto:" + adminEmail + "\" class=\"button\">" +
                                "<span class=\"emoji\">💬</span>Tiếp tục cuộc trò chuyện" +
                            "</a>" +
                        "</div>" +
                        
                        "<div class=\"info-card\">" +
                            "<p style=\"margin: 0; font-size: 15px; color: #0891b2; font-weight: 500; text-align: center; line-height: 1.6;\">" +
                                "<span class=\"emoji\">🌟</span><strong>Đánh giá phản hồi:</strong><br>" +
                                "Nếu phản hồi này hữu ích, bạn có thể chia sẻ kinh nghiệm với bạn bè hoặc để lại phản hồi về chất lượng dịch vụ." +
                            "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<div class=\"signature\">" +
                            "<p class=\"vietnamese-text\"><strong>Trân trọng,</strong></p>" +
                            "<p class=\"name\">Nguyễn Hoàng Dinh</p>" +
                            "<p class=\"title\">Full Stack Developer | Portfolio Consultant</p>" +
                            "<p style=\"margin-top: 15px; font-size: 14px; color: #6b7280;\">📧 " + adminEmail + "</p>" +
                            "<p style=\"margin-top: 5px; font-size: 14px; color: #6b7280;\">🌐 Portfolio: nhdinh.dev</p>" +
                        "</div>" +
                        "<div class=\"divider\" style=\"margin: 25px 0;\"></div>" +
                        "<p style=\"font-size: 12px; color: #6b7280; text-align: center;\">Cảm ơn bạn đã tin tưởng và lựa chọn nhdinh.dev</p>" +
                        "<p style=\"font-size: 12px; margin-top: 20px;\">" +
                            "© 2024 Nguyễn Hoàng Dinh | Professional Portfolio System" +
                        "</p>" +
                    "</div>" +
                "</div>";
    }

    /**
     * Format DateTime for display (Vietnamese format)
     */
    private String formatDateTime(LocalDateTime dateTime) {
        if (dateTime == null)
            return "Không xác định";
        
        // Vietnamese month names
        String[] vietnameseMonths = {
            "Thg 1", "Thg 2", "Thg 3", "Thg 4", "Thg 5", "Thg 6",
            "Thg 7", "Thg 8", "Thg 9", "Thg 10", "Thg 11", "Thg 12"
        };
        
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("dd 'tháng' MM, yyyy 'lúc' HH:mm");
        String formatted = dateTime.format(formatter);
        
        // Replace month number with Vietnamese month name
        for (int i = 1; i <= 12; i++) {
            String monthPattern = String.format("tháng %02d", i);
            String vietnameseMonth = vietnameseMonths[i - 1];
            formatted = formatted.replace(monthPattern, vietnameseMonth);
        }
        
        return formatted;
    }

    /**
     * Format message content with line breaks
     */
    private String formatMessageContent(String content) {
        if (content == null)
            return "";
        return content.replace("\n", "<br>").replace("\r", "");
    }

    /**
     * Gửi email thông báo hệ thống (dành cho admin)
     */
    public void sendSystemNotification(String subject, String message) throws MessagingException {
        String content = EMAIL_STYLE + 
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1><span class=\"emoji\">🔧</span>Thông báo hệ thống</h1>" +
                        "<p class=\"vietnamese-text\">Portfolio System Alert</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<div class=\"status-badge status-new\">System Alert</div>" +
                        
                        "<div class=\"highlight\">" +
                            "<strong style=\"color: #374151; font-size: 16px;\">📋 Chi tiết thông báo:</strong><br><br>" +
                            "<div class=\"vietnamese-text\" style=\"font-size: 15px; line-height: 1.7; color: #4b5563;\">" +
                                formatMessageContent(message) +
                            "</div>" +
                        "</div>" +
                        
                        "<div class=\"contact-info\">" +
                            "<p><strong>⏰ Thời gian:</strong> " + formatDateTime(LocalDateTime.now()) + "</p>" +
                            "<p><strong>🏷️ Loại:</strong> Thông báo hệ thống tự động</p>" +
                        "</div>" +
                        
                        "<div style=\"background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%); border-radius: 8px; padding: 16px; margin: 24px 0;\">" +
                            "<p style=\"margin: 0; font-size: 14px; color: #92400e; font-weight: 500;\">" +
                                "<span class=\"emoji\">⚠️</span>Đây là thông báo tự động từ hệ thống Portfolio. Vui lòng kiểm tra và xử lý nếu cần thiết." +
                            "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<p class=\"vietnamese-text\">Tin nhắn tự động từ <strong>Portfolio System</strong></p>" +
                        "<p style=\"margin-top: 16px; font-size: 12px;\">" +
                            "© 2024 Nguyễn Hoàng Dinh | Portfolio Admin System" +
                        "</p>" +
                    "</div>" +
                "</div>";

        sendEmail(adminEmail, "🔧 " + subject, content);
    }

    /**
     * Gửi email theo mẫu chuyên nghiệp với các tùy chọn nâng cao
     */
    public void sendProfessionalEmail(String to, String subject, String title, String content, 
            String buttonText, String buttonUrl, String footerNote) throws MessagingException {
        String buttonHtml = "";
        if (buttonText != null && buttonUrl != null) {
            buttonHtml = "<div style=\"text-align: center; margin: 32px 0;\">" +
                        "<a href=\"" + buttonUrl + "\" class=\"button\">" + buttonText + "</a>" +
                        "</div>";
        }
        
        String footerNoteHtml = "";
        if (footerNote != null) {
            footerNoteHtml = "<p style=\"font-size: 12px; opacity: 0.7; margin-top: 8px;\">" + footerNote + "</p>";
        }
        
        String emailContent = EMAIL_STYLE + 
                "<div class=\"container\">" +
                    "<div class=\"header\">" +
                        "<h1><span class=\"emoji\">📬</span>" + title + "</h1>" +
                        "<p class=\"vietnamese-text\">NhDinh Portfolio</p>" +
                    "</div>" +
                    "<div class=\"content\">" +
                        "<div class=\"vietnamese-text\" style=\"font-size: 16px; line-height: 1.7; margin-bottom: 24px;\">" +
                            formatMessageContent(content) +
                        "</div>" +
                        
                        buttonHtml +
                        
                        "<div style=\"background: linear-gradient(135deg, #f0f9ff 0%, #e0f2fe 100%); border-radius: 8px; padding: 16px; margin: 24px 0;\">" +
                            "<p style=\"margin: 0; font-size: 14px; color: #0891b2; font-weight: 500; text-align: center;\">" +
                                "<span class=\"emoji\">🌟</span>Cảm ơn bạn đã tin tướng và hỗ trợ!" +
                            "</p>" +
                        "</div>" +
                    "</div>" +
                    "<div class=\"footer\">" +
                        "<p class=\"vietnamese-text\"><strong>Trân trọng,</strong></p>" +
                        "<p style=\"margin: 8px 0;\"><strong>Nguyễn Hoàng Dinh</strong></p>" +
                        "<p style=\"margin: 8px 0; color: #6b7280;\">Full Stack Developer | NhDinh Portfolio</p>" +
                        footerNoteHtml +
                        "<p style=\"margin-top: 16px; font-size: 12px;\">" +
                            "© 2024 Nguyễn Hoàng Dinh | Portfolio System" +
                        "</p>" +
                    "</div>" +
                "</div>";

        sendEmail(to, subject, emailContent);
    }
}
