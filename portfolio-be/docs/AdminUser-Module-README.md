# AdminUser Module

## Overview
The AdminUser module manages administrative user accounts for the portfolio management system. It provides comprehensive authentication, user management, and security features including password hashing, account status management, and detailed analytics for administrative oversight.

## Features
- **User Authentication**: Secure login with phone number or username
- **Password Management**: Strong password requirements, hashing, and change/reset functionality
- **Account Management**: Create, update, activate/deactivate, and delete admin accounts
- **Security Features**: BCrypt password hashing, account status control, and optimistic locking
- **Search & Filtering**: Advanced search capabilities and filtering options
- **Analytics**: User statistics, growth metrics, and activity tracking
- **Batch Operations**: Bulk operations for efficient user management
- **Audit Trail**: Creation timestamps and version control

## Database Schema
The AdminUser module uses the `AdminUser` table:

```sql
CREATE TABLE dbo.AdminUser (
    UserId        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    PhoneNumber   NVARCHAR(20) NOT NULL UNIQUE,
    Username      NVARCHAR(50) UNIQUE NULL,
    PasswordHash  NVARCHAR(256) NOT NULL,
    FullName      NVARCHAR(100) NULL,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    IsActive      BIT DEFAULT 1,
    RowVer        ROWVERSION
);
```

### Key Constraints
- **Phone Number**: Unique, required, 10-20 characters, supports international format
- **Username**: Unique, optional, 3-50 characters, alphanumeric and underscores only
- **Password**: BCrypt hashed, strong requirements enforced
- **Row Version**: Optimistic concurrency control

## Module Structure

### Entity
- **AdminUser.java**: JPA entity representing admin users
  - UUID primary key with sequential generation
  - Comprehensive validation constraints
  - Automatic timestamp management
  - Business logic methods (activate/deactivate)
  - Optimistic locking with @Version

### Data Access Object (DAO)
- **AdminUserDAO.java**: Repository interface for database operations
  - Extends JpaRepository for basic CRUD operations
  - Authentication queries (phone/username login)
  - Advanced search and filtering capabilities
  - Statistical and analytics queries
  - User management and status queries

### Service Layer
- **AdminUserService.java**: Business logic and service methods
  - User creation and validation
  - Authentication and password management
  - Account status management
  - Search and filtering logic
  - Statistics calculation
  - Batch operations

### API Controller
- **AdminUserAPI.java**: REST endpoints for admin user operations
  - User registration and authentication
  - Profile management endpoints
  - Administrative user management
  - Search and analytics endpoints
  - Batch operation endpoints

### DTOs (Data Transfer Objects)
- **AdminUserRequest.java**: User creation request DTO
- **AdminUserUpdateRequest.java**: User update request DTO
- **ChangePasswordRequest.java**: Password change request DTO
- **ResetPasswordRequest.java**: Password reset request DTO
- **LoginRequest.java**: Authentication request DTO
- **AdminUserStatsResponse.java**: Statistics response DTO
- **AdminUserMonthlyStats.java**: Monthly analytics DTO
- **AdminUserSummaryResponse.java**: Dashboard summary DTO

## API Endpoints

### Authentication Endpoints

#### User Registration
```http
POST /api/admin-users/create
Content-Type: application/json

{
    "phoneNumber": "+84123456789",
    "username": "admin01",
    "password": "SecurePass123!",
    "fullName": "John Doe"
}
```

**Password Requirements**:
- Minimum 8 characters, maximum 100 characters
- At least one lowercase letter
- At least one uppercase letter
- At least one digit
- At least one special character (@$!%*?&)

#### User Authentication
```http
POST /api/admin-users/authenticate
Content-Type: application/json

{
    "identifier": "+84123456789",  // Phone number or username
    "password": "SecurePass123!"
}
```

**Response**: `200 OK` with AdminUser object (password hash excluded)
**Error**: `401 Unauthorized` for invalid credentials

### User Management Endpoints

#### Update User Profile
```http
PUT /api/admin-users/{id}
Content-Type: application/json

{
    "phoneNumber": "+84987654321",
    "username": "newusername",
    "fullName": "Updated Name"
}
```

#### Change Password
```http
PUT /api/admin-users/{id}/change-password
Content-Type: application/json

{
    "currentPassword": "OldPass123!",
    "newPassword": "NewPass456!",
    "confirmPassword": "NewPass456!"
}
```

#### Reset Password (Admin Function)
```http
PUT /api/admin-users/{id}/reset-password
Content-Type: application/json

{
    "newPassword": "ResetPass789!"
}
```

### Administrative Endpoints

#### Get All Users
```http
GET /api/admin-users/all
```

#### Get User by ID
```http
GET /api/admin-users/{id}
```

#### Get User by Phone Number
```http
GET /api/admin-users/phone/{phoneNumber}
```

#### Get User by Username
```http
GET /api/admin-users/username/{username}
```

#### Get Active Users
```http
GET /api/admin-users/active
```

#### Get Inactive Users
```http
GET /api/admin-users/inactive
```

#### Activate User
```http
PUT /api/admin-users/{id}/activate
```

#### Deactivate User
```http
PUT /api/admin-users/{id}/deactivate
```

#### Delete User
```http
DELETE /api/admin-users/{id}
```

### Search and Filtering

#### Search Users
```http
GET /api/admin-users/search?keyword=john
```

#### Get Users by Date Range
```http
GET /api/admin-users/date-range?startDate=2024-01-01T00:00:00&endDate=2024-01-31T23:59:59
```

#### Get Recent Users
```http
GET /api/admin-users/recent?days=30
```

### Validation Endpoints

#### Check Phone Number Availability
```http
GET /api/admin-users/check-phone/{phoneNumber}
```

#### Check Username Availability
```http
GET /api/admin-users/check-username/{username}
```

### Analytics Endpoints

#### Count Users
```http
GET /api/admin-users/count/total
GET /api/admin-users/count/active
GET /api/admin-users/count/inactive
```

#### Get User Statistics
```http
GET /api/admin-users/statistics
```

**Response**:
```json
{
    "totalUsers": 25,
    "activeUsers": 20,
    "inactiveUsers": 5,
    "activeRate": 80.0,
    "usersCreatedToday": 2,
    "usersCreatedThisWeek": 8,
    "usersCreatedThisMonth": 15,
    "usersCreatedThisYear": 25
}
```

#### Get Monthly Statistics
```http
GET /api/admin-users/statistics/monthly
```

### Utility Endpoints

#### Get Users Without Username
```http
GET /api/admin-users/without-username
```

#### Get Users Without Full Name
```http
GET /api/admin-users/without-fullname
```

### Batch Operations

#### Batch Activate Users
```http
PUT /api/admin-users/batch/activate
Content-Type: application/json

["uuid1", "uuid2", "uuid3"]
```

#### Batch Deactivate Users
```http
PUT /api/admin-users/batch/deactivate
Content-Type: application/json

["uuid1", "uuid2", "uuid3"]
```

#### Batch Delete Users
```http
DELETE /api/admin-users/batch
Content-Type: application/json

["uuid1", "uuid2", "uuid3"]
```

### Dashboard

#### Get Admin Summary
```http
GET /api/admin-users/admin/summary
```

**Response**: Comprehensive summary including:
- Overall statistics
- Recent users
- Active/inactive user lists
- Monthly statistics

## Security Features

### Password Security
- **BCrypt Hashing**: All passwords are hashed using BCrypt with salt
- **Strong Requirements**: Enforced complexity requirements
- **No Plain Text**: Passwords are never stored in plain text
- **Secure Transmission**: Password fields are excluded from API responses

### Account Security
- **Account Status**: Users can be activated/deactivated
- **Unique Identifiers**: Phone numbers and usernames must be unique
- **Optimistic Locking**: Prevents concurrent modification conflicts
- **Audit Trail**: Creation timestamps for user tracking

### Authentication
- **Flexible Login**: Users can login with phone number or username
- **Active Status Check**: Only active users can authenticate
- **Secure Validation**: Password verification using BCrypt

## Business Logic

### User Creation
- **Uniqueness Validation**: Phone number and username must be unique
- **Password Hashing**: Automatic BCrypt hashing during creation
- **Default Status**: New users are active by default
- **Timestamp Management**: Automatic creation timestamp

### User Updates
- **Partial Updates**: Only provided fields are updated
- **Uniqueness Checks**: Ensures uniqueness when updating identifiers
- **Validation**: All constraints are enforced during updates

### Password Management
- **Current Password Verification**: Required for password changes
- **Admin Reset**: Administrators can reset passwords without current password
- **Secure Hashing**: New passwords are automatically hashed

### Search and Filtering
- **Keyword Search**: Search across name, username, and phone number
- **Case-Insensitive**: Search is not case-sensitive
- **Date Range Filtering**: Filter users by creation date
- **Status Filtering**: Filter by active/inactive status

## Error Handling
All endpoints include comprehensive error handling:
- **400 Bad Request**: Invalid input data or validation errors
- **401 Unauthorized**: Authentication failures
- **404 Not Found**: User not found
- **409 Conflict**: Uniqueness constraint violations
- **500 Internal Server Error**: Server-side errors

## Usage Examples

### Frontend Authentication
```javascript
// User login
const login = async (identifier, password) => {
    try {
        const response = await fetch('/api/admin-users/authenticate', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ identifier, password })
        });
        
        if (response.ok) {
            const user = await response.json();
            localStorage.setItem('adminUser', JSON.stringify(user));
            return user;
        } else {
            throw new Error('Authentication failed');
        }
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

// Create new admin user
const createAdminUser = async (userData) => {
    try {
        const response = await fetch('/api/admin-users/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            const error = await response.text();
            throw new Error(error);
        }
    } catch (error) {
        console.error('User creation error:', error);
        throw error;
    }
};
```

### Password Management
```javascript
// Change password
const changePassword = async (userId, passwords) => {
    try {
        const response = await fetch(`/api/admin-users/${userId}/change-password`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(passwords)
        });
        
        if (response.ok) {
            return await response.json();
        } else {
            throw new Error('Password change failed');
        }
    } catch (error) {
        console.error('Password change error:', error);
        throw error;
    }
};
```

### User Management
```javascript
// Search users
const searchUsers = async (keyword) => {
    try {
        const response = await fetch(`/api/admin-users/search?keyword=${encodeURIComponent(keyword)}`);
        return await response.json();
    } catch (error) {
        console.error('Search error:', error);
        throw error;
    }
};

// Get user statistics
const getUserStatistics = async () => {
    try {
        const response = await fetch('/api/admin-users/statistics');
        return await response.json();
    } catch (error) {
        console.error('Statistics error:', error);
        throw error;
    }
};
```

## Performance Considerations
- **Database Indexes**: Optimized queries with proper indexing on phone, username, and status
- **Pagination**: Implement pagination for large user lists
- **Caching**: Consider caching for frequently accessed statistics
- **Batch Operations**: Efficient bulk operations for administrative tasks

## Security Considerations
- **Input Validation**: All inputs are validated and sanitized
- **SQL Injection Prevention**: Using parameterized queries
- **Password Security**: BCrypt with appropriate cost factor
- **Session Management**: Implement proper session handling (not included in this module)
- **Access Control**: Implement role-based access control as needed

## Future Enhancements
- **Role-Based Access Control**: User roles and permissions system
- **Two-Factor Authentication**: 2FA support for enhanced security
- **Password Recovery**: Email/SMS-based password recovery
- **Session Management**: Complete session handling with JWT
- **Audit Logging**: Detailed user activity logging
- **Profile Pictures**: User avatar support
- **Email Notifications**: Account status change notifications
