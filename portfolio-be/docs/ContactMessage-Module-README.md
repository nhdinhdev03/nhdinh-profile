# ContactMessage Module

## Overview
The ContactMessage module manages contact form submissions for the portfolio website. It provides comprehensive contact message management functionality including submission handling, spam prevention, message tracking, and detailed analytics for administrative purposes.

## Features
- **Contact Form Submission**: Public endpoint for visitors to submit contact messages
- **Message Management**: Complete CRUD operations for contact messages
- **Spam Prevention**: Rate limiting to prevent abuse (1 message per hour per email)
- **Duplicate Detection**: Prevents duplicate message content within 24 hours
- **Reply Tracking**: Mark messages as replied/unreplied with timestamps
- **Advanced Search**: Search messages by keywords, email, date ranges
- **Analytics**: Comprehensive statistics, monthly trends, and email domain analysis
- **Batch Operations**: Bulk operations for efficient message management
- **Admin Dashboard**: Summary view with key metrics and recent activity

## Database Schema
The ContactMessage module uses the `contact_message` table:

```sql
CREATE TABLE contact_message (
    id UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWID(),
    name NVARCHAR(100) NOT NULL,
    email NVARCHAR(255) NOT NULL,
    subject NVARCHAR(100),
    message NVARCHAR(1000) NOT NULL,
    is_replied BIT DEFAULT 0,
    created_at DATETIME DEFAULT GETDATE(),
    updated_at DATETIME DEFAULT GETDATE()
);

CREATE INDEX idx_contact_message_email ON contact_message(email);
CREATE INDEX idx_contact_message_created_at ON contact_message(created_at);
CREATE INDEX idx_contact_message_is_replied ON contact_message(is_replied);
```

## Module Structure

### Entity
- **ContactMessage.java**: JPA entity representing contact messages
  - UUID primary key with auto-generation
  - Validation constraints for name, email, and message
  - Automatic timestamp management
  - Email format validation

### Data Access Object (DAO)
- **ContactMessageDAO.java**: Repository interface for database operations
  - Extends JpaRepository for basic CRUD operations
  - Custom query methods for advanced filtering and searching
  - Analytics queries for statistics and reporting
  - Batch operation support

### Service Layer
- **ContactMessageService.java**: Business logic and service methods
  - Rate limiting and spam prevention
  - Duplicate detection logic
  - Message status management
  - Analytics and statistics calculation
  - Batch processing capabilities

### API Controller
- **ContactMessageAPI.java**: REST endpoints for contact message operations
  - Public contact form submission endpoint
  - Admin endpoints for message management
  - Analytics and reporting endpoints
  - Batch operation endpoints

### DTOs (Data Transfer Objects)
- **ContactMessageRequest.java**: Request DTO for contact form submission
- **ContactMessageResponse.java**: Response DTO for message data
- **ContactMessageStatsResponse.java**: Statistics summary response
- **ContactMessageMonthlyStats.java**: Monthly analytics data
- **EmailDomainStats.java**: Email domain analytics
- **ContactMessageSummaryResponse.java**: Admin dashboard summary

## API Endpoints

### Public Endpoints

#### Submit Contact Message
```http
POST /api/contact-messages/submit
Content-Type: application/json

{
    "name": "John Doe",
    "email": "john@example.com",
    "subject": "Project Inquiry",
    "message": "I would like to discuss a potential project collaboration."
}
```

**Response**: `201 Created` with ContactMessage object

**Validation Rules**:
- Name: 2-100 characters, required
- Email: Valid email format, max 255 characters, required
- Subject: Max 100 characters, optional
- Message: 10-1000 characters, required

**Rate Limiting**: 1 message per hour per email address

### Admin Endpoints

#### Get All Messages
```http
GET /api/contact-messages/all
```

#### Get Message by ID
```http
GET /api/contact-messages/{id}
```

#### Get Pending Messages
```http
GET /api/contact-messages/pending
```

#### Get Replied Messages
```http
GET /api/contact-messages/replied
```

#### Mark as Replied
```http
PUT /api/contact-messages/{id}/mark-replied
```

#### Mark as Unreplied
```http
PUT /api/contact-messages/{id}/mark-unreplied
```

#### Delete Message
```http
DELETE /api/contact-messages/{id}
```

#### Search Messages
```http
GET /api/contact-messages/search?keyword=project
```

#### Get Messages by Email
```http
GET /api/contact-messages/by-email/{email}
```

#### Get Recent Messages
```http
GET /api/contact-messages/recent?days=7
```

#### Get Messages by Date Range
```http
GET /api/contact-messages/date-range?startDate=2024-01-01T00:00:00&endDate=2024-01-31T23:59:59
```

#### Get Messages by Year
```http
GET /api/contact-messages/year/2024
```

#### Get Messages by Year and Month
```http
GET /api/contact-messages/year/2024/month/1
```

### Analytics Endpoints

#### Count Pending Messages
```http
GET /api/contact-messages/count/pending
```

#### Count Replied Messages
```http
GET /api/contact-messages/count/replied
```

#### Count Total Messages
```http
GET /api/contact-messages/count/total
```

#### Get Message Statistics
```http
GET /api/contact-messages/statistics
```

**Response**:
```json
{
    "totalMessages": 150,
    "pendingMessages": 25,
    "repliedMessages": 125,
    "replyRate": 83.33,
    "messagesThisMonth": 12,
    "messagesLastMonth": 8,
    "monthlyGrowthRate": 50.0,
    "messagesThisWeek": 3,
    "messagesToday": 1
}
```

#### Get Monthly Statistics
```http
GET /api/contact-messages/statistics/monthly
```

#### Get Email Domain Statistics
```http
GET /api/contact-messages/statistics/email-domains
```

### Batch Operations

#### Batch Mark as Replied
```http
PUT /api/contact-messages/batch/mark-replied
Content-Type: application/json

["uuid1", "uuid2", "uuid3"]
```

#### Batch Delete Messages
```http
DELETE /api/contact-messages/batch
Content-Type: application/json

["uuid1", "uuid2", "uuid3"]
```

### Admin Dashboard

#### Get Dashboard Summary
```http
GET /api/contact-messages/admin/summary
```

**Response**: Comprehensive summary including:
- Overall statistics
- Recent messages (last 10)
- Pending messages
- Monthly statistics (last 12 months)
- Top email domains

### Utility Endpoints

#### Check Recent Message from Email
```http
GET /api/contact-messages/check-recent/{email}?hours=1
```

## Business Logic

### Spam Prevention
- **Rate Limiting**: Maximum 1 message per hour per email address
- **Duplicate Detection**: Prevents identical message content within 24 hours
- **Validation**: Comprehensive input validation and sanitization

### Message Status Management
- **Pending**: Default status for new messages
- **Replied**: Messages that have been responded to
- **Status Tracking**: Automatic timestamp updates when status changes

### Search and Filtering
- **Keyword Search**: Search across name, email, subject, and message content
- **Email Filtering**: Find all messages from specific email addresses
- **Date Range Filtering**: Filter messages by creation date
- **Status Filtering**: Filter by reply status

### Analytics Features
- **Reply Rate Calculation**: Percentage of messages that have been replied to
- **Growth Metrics**: Month-over-month and week-over-week comparisons
- **Email Domain Analysis**: Popular email providers and domains
- **Temporal Analysis**: Monthly and yearly message trends

## Error Handling
All endpoints include comprehensive error handling:
- **400 Bad Request**: Invalid input data or validation errors
- **404 Not Found**: Message not found
- **429 Too Many Requests**: Rate limit exceeded
- **500 Internal Server Error**: Server-side errors

## Security Considerations
- **Input Validation**: All inputs are validated and sanitized
- **Rate Limiting**: Prevents spam and abuse
- **XSS Prevention**: Safe handling of message content
- **Admin Authorization**: Admin endpoints should be protected (implement as needed)

## Usage Examples

### Frontend Integration
```javascript
// Submit contact form
const submitContactForm = async (formData) => {
    try {
        const response = await fetch('/api/contact-messages/submit', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(formData)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Failed to submit message');
        }
    } catch (error) {
        console.error('Error submitting contact form:', error);
        throw error;
    }
};

// Check if user can send another message
const canSendMessage = async (email) => {
    try {
        const response = await fetch(`/api/contact-messages/check-recent/${email}`);
        const hasRecent = await response.json();
        return !hasRecent;
    } catch (error) {
        console.error('Error checking message status:', error);
        return false;
    }
};
```

### Admin Dashboard Integration
```javascript
// Get dashboard summary
const getDashboardSummary = async () => {
    try {
        const response = await fetch('/api/contact-messages/admin/summary');
        return await response.json();
    } catch (error) {
        console.error('Error fetching dashboard summary:', error);
        throw error;
    }
};

// Mark messages as replied
const markMessagesAsReplied = async (messageIds) => {
    try {
        const response = await fetch('/api/contact-messages/batch/mark-replied', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(messageIds)
        });
        
        return await response.json();
    } catch (error) {
        console.error('Error marking messages as replied:', error);
        throw error;
    }
};
```

## Performance Considerations
- **Database Indexes**: Optimized queries with proper indexing
- **Pagination**: Implement pagination for large result sets
- **Caching**: Consider caching for frequently accessed statistics
- **Batch Operations**: Efficient bulk operations for admin tasks

## Future Enhancements
- **Email Templates**: Automated response templates
- **Notification System**: Real-time notifications for new messages
- **Advanced Analytics**: More detailed reporting and insights
- **Message Categories**: Categorization system for better organization
- **File Attachments**: Support for file uploads with messages
- **Integration**: Email service integration for automated responses
