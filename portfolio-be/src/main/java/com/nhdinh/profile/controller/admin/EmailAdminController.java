// package com.nhdinh.profile.controller.admin;

// import org.springframework.http.ResponseEntity;
// import org.springframework.web.bind.annotation.*;
// import org.springframework.security.access.prepost.PreAuthorize;

// import com.nhdinh.profile.service.email.EmailMonitoringService;
// import com.nhdinh.profile.service.email.EmailMonitoringService.EmailStats;

// /**
//  * Admin Controller để quản lý và xem thống kê email
//  */
// @RestController
// @RequestMapping("/api/admin/email")
// @PreAuthorize("hasRole('ADMIN')")
// @CrossOrigin(origins = "*")
// public class EmailAdminController {

//     private final EmailMonitoringService monitoringService;

//     public EmailAdminController(EmailMonitoringService monitoringService) {
//         this.monitoringService = monitoringService;
//     }

//     /**
//      * Lấy thống kê email
//      */
//     @GetMapping("/stats")
//     public ResponseEntity<EmailStats> getEmailStats() {
//         EmailStats stats = monitoringService.getEmailStats();
//         return ResponseEntity.ok(stats);
//     }

//     /**
//      * Lấy tỷ lệ thành công
//      */
//     @GetMapping("/success-rate")
//     public ResponseEntity<Double> getSuccessRate() {
//         double successRate = monitoringService.getSuccessRate();
//         return ResponseEntity.ok(successRate);
//     }

//     /**
//      * Log thống kê email vào console
//      */
//     @PostMapping("/log-stats")
//     public ResponseEntity<String> logEmailStats() {
//         monitoringService.logEmailStats();
//         return ResponseEntity.ok("Email statistics logged to console");
//     }

//     /**
//      * Reset counters (chỉ dành cho testing)
//      */
//     @PostMapping("/reset-counters")
//     public ResponseEntity<String> resetCounters() {
//         monitoringService.resetCounters();
//         return ResponseEntity.ok("Email statistics counters have been reset");
//     }

//     /**
//      * Lấy dashboard data đầy đủ
//      */
//     @GetMapping("/dashboard")
//     public ResponseEntity<EmailDashboard> getEmailDashboard() {
//         EmailStats stats = monitoringService.getEmailStats();
//         double successRate = monitoringService.getSuccessRate();
        
//         EmailDashboard dashboard = new EmailDashboard(
//             stats,
//             successRate,
//             calculateTotalEmails(stats),
//             getMostUsedEmailType(stats)
//         );
        
//         return ResponseEntity.ok(dashboard);
//     }

//     private long calculateTotalEmails(EmailStats stats) {
//         return stats.totalSent() + stats.totalFailed();
//     }

//     private String getMostUsedEmailType(EmailStats stats) {
//         long max = Math.max(
//             Math.max(stats.contactNotifications(), stats.confirmations()),
//             Math.max(stats.replies(), stats.systemNotifications())
//         );
        
//         if (max == 0) return "Chưa có dữ liệu";
        
//         if (max == stats.contactNotifications()) return "Thông báo liên hệ";
//         if (max == stats.confirmations()) return "Email xác nhận";
//         if (max == stats.replies()) return "Email phản hồi";
//         if (max == stats.systemNotifications()) return "Thông báo hệ thống";
        
//         return "Không xác định";
//     }

//     /**
//      * Record class cho email dashboard
//      */
//     public record EmailDashboard(
//         EmailStats stats,
//         double successRate,
//         long totalEmails,
//         String mostUsedType
//     ) {}
// }
