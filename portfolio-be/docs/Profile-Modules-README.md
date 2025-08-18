# Profile Modules Documentation

## Overview
This document describes the ProfileInfo, ProfileTag, and Experience modules for the portfolio management system.

## Module Structure

### 1. ProfileInfo Module
**Purpose**: Manages user profile information including basic details like name, title, bio, and avatar.

**Location**: `src/main/java/com/nhdinh/profile/modules/ProfileInfo/`

**Files**:
- `ProfileInfo.java` - Entity class
- `ProfileInfoDAO.java` - Data access interface
- `ProfileInfoService.java` - Business logic service
- `ProfileInfoAPI.java` - REST API controller
- `ProfileInfoResponse.java` - Response DTO
- `ProfileInfoCreateRequest.java` - Create request DTO
- `ProfileInfoUpdateRequest.java` - Update request DTO

**Database Table**: `dbo.ProfileInfo`

**API Endpoints**:
- `GET /api/profile-info/all` - Get all profiles
- `GET /api/profile-info/{id}` - Get profile by ID
- `GET /api/profile-info/by-name/{fullName}` - Get profile by full name
- `GET /api/profile-info/search?keyword=` - Search profiles
- `POST /api/profile-info/create` - Create new profile
- `PUT /api/profile-info/{id}` - Update profile
- `DELETE /api/profile-info/{id}` - Delete profile
- `GET /api/profile-info/check-fullname/{fullName}` - Check if full name exists
- `GET /api/profile-info/count` - Get total profile count

### 2. ProfileTag Module
**Purpose**: Manages skills/tags associated with user profiles.

**Location**: `src/main/java/com/nhdinh/profile/modules/ProfileTag/`

**Files**:
- `ProfileTag.java` - Entity class
- `ProfileTagDAO.java` - Data access interface
- `ProfileTagService.java` - Business logic service
- `ProfileTagAPI.java` - REST API controller
- `ProfileTagResponse.java` - Response DTO
- `ProfileTagCreateRequest.java` - Create request DTO
- `ProfileTagUpdateRequest.java` - Update request DTO

**Database Table**: `dbo.ProfileTag`

**API Endpoints**:
- `GET /api/profile-tags/profile/{profileId}` - Get tags by profile ID
- `GET /api/profile-tags/{id}` - Get tag by ID
- `GET /api/profile-tags/search?keyword=` - Search tags
- `POST /api/profile-tags/create` - Create new tag
- `PUT /api/profile-tags/{id}` - Update tag
- `DELETE /api/profile-tags/{id}` - Delete tag
- `DELETE /api/profile-tags/profile/{profileId}` - Delete all tags by profile
- `GET /api/profile-tags/profile/{profileId}/count` - Get tag count by profile
- `GET /api/profile-tags/most-used` - Get most used tags

### 3. Experience Module
**Purpose**: Manages work experience information for user profiles.

**Location**: `src/main/java/com/nhdinh/profile/modules/Experience/`

**Files**:
- `Experience.java` - Entity class
- `ExperienceDAO.java` - Data access interface
- `ExperienceService.java` - Business logic service
- `ExperienceAPI.java` - REST API controller
- `ExperienceResponse.java` - Response DTO
- `ExperienceCreateRequest.java` - Create request DTO
- `ExperienceUpdateRequest.java` - Update request DTO

**Database Table**: `dbo.Experience`

**API Endpoints**:
- `GET /api/experiences/profile/{profileId}` - Get experiences by profile ID
- `GET /api/experiences/profile/{profileId}/by-year` - Get experiences ordered by year
- `GET /api/experiences/profile/{profileId}/current` - Get current experiences
- `GET /api/experiences/{id}` - Get experience by ID
- `GET /api/experiences/search?keyword=` - Search experiences
- `GET /api/experiences/company/{company}` - Get experiences by company
- `GET /api/experiences/position/{position}` - Get experiences by position
- `POST /api/experiences/create` - Create new experience
- `PUT /api/experiences/{id}` - Update experience
- `DELETE /api/experiences/{id}` - Delete experience
- `DELETE /api/experiences/profile/{profileId}` - Delete all experiences by profile
- `GET /api/experiences/profile/{profileId}/count` - Get experience count by profile
- `GET /api/experiences/profile/{profileId}/current/count` - Get current experience count
- `GET /api/experiences/companies/popular` - Get most popular companies
- `GET /api/experiences/positions/popular` - Get most popular positions

## Database Schema

### ProfileInfo Table
```sql
CREATE TABLE dbo.ProfileInfo (
    ProfileId  UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    FullName   NVARCHAR(100),
    Title      NVARCHAR(100),
    Bio        NVARCHAR(MAX),
    AvatarUrl  NVARCHAR(512),
    CreatedAt  DATETIME2 DEFAULT SYSUTCDATETIME(),
    RowVer     ROWVERSION
);
```

### ProfileTag Table
```sql
CREATE TABLE dbo.ProfileTag (
    TagId     UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ProfileId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProfileInfo(ProfileId) ON DELETE CASCADE,
    Label     NVARCHAR(100),
    SortOrder INT DEFAULT 1,
    RowVer    ROWVERSION
);
```

### Experience Table
```sql
CREATE TABLE dbo.Experience (
    ExpId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ProfileId  UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProfileInfo(ProfileId) ON DELETE CASCADE,
    Position   NVARCHAR(100),
    Company    NVARCHAR(100),
    Description NVARCHAR(MAX),
    StartYear  INT,
    EndYear    INT NULL,
    IsCurrent  BIT DEFAULT 0,
    SortOrder  INT DEFAULT 1,
    RowVer     ROWVERSION
);
```

## Key Features

### ProfileInfo
- Store basic user profile information
- Unique full name constraint
- Automatic timestamp management
- Search functionality by name, title, or bio
- Profile count statistics

### ProfileTag
- Associate multiple skills/tags with profiles
- Sortable tags for display ordering
- Duplicate tag prevention per profile
- Most used tags statistics
- Batch operations support

### Experience
- Track work history and experiences
- Support for current and past positions
- Date range tracking (start/end year)
- Company and position-based filtering
- Popular companies/positions analytics
- Sortable experiences for timeline display

## Usage Examples

### Creating a Profile with Tags and Experience

1. **Create Profile**:
```json
POST /api/profile-info/create
{
  "fullName": "John Doe",
  "title": "Full Stack Developer",
  "bio": "Experienced developer with 5+ years in web development",
  "avatarUrl": "/assets/images/john-doe.jpg"
}
```

2. **Add Skills/Tags**:
```json
POST /api/profile-tags/create
{
  "profileId": "profile-uuid-here",
  "label": "Java",
  "sortOrder": 1
}
```

3. **Add Work Experience**:
```json
POST /api/experiences/create
{
  "profileId": "profile-uuid-here",
  "position": "Senior Developer",
  "company": "Tech Corp",
  "description": "Led development of web applications",
  "startYear": 2020,
  "endYear": null,
  "isCurrent": true,
  "sortOrder": 1
}
```

## Validation Rules

### ProfileInfo
- FullName: Maximum 100 characters, must be unique
- Title: Maximum 100 characters
- AvatarUrl: Maximum 512 characters

### ProfileTag
- Label: Required, maximum 100 characters, unique per profile
- ProfileId: Required, must reference existing profile

### Experience
- Position: Maximum 100 characters
- Company: Maximum 100 characters
- ProfileId: Required, must reference existing profile
- StartYear: Must be valid year
- EndYear: Optional, must be after StartYear if provided

## Technical Notes

- All entities use UUID as primary keys
- ROWVERSION is used for optimistic concurrency control
- Cascade delete is configured for related records
- Indexes are created for optimal query performance
- All operations support transaction management
- Validation is implemented at both entity and request level
