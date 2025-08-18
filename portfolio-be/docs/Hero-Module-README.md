# Hero Module Documentation

## Overview
The Hero module manages the hero/banner section of the portfolio website, supporting multiple languages (locales) with content management capabilities.

## Database Schema

### Table: `dbo.Hero`
```sql
CREATE TABLE dbo.Hero (
    HeroId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Locale      NVARCHAR(10) NOT NULL UNIQUE,                 -- Language (vi, en, ...)
    PreHeading  NVARCHAR(256) NULL,                          -- Pre-heading text
    Heading     NVARCHAR(256) NOT NULL,                      -- Main heading
    IntroHtml   NVARCHAR(MAX) NULL,                          -- Introduction HTML content
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2 NULL,
    IsDeleted   BIT NOT NULL DEFAULT 0,                      -- Soft delete flag
    RowVer      ROWVERSION                                   -- Optimistic concurrency
);
```

### Constraints & Indexes
- **Primary Key**: `HeroId` (UNIQUEIDENTIFIER)
- **Unique Constraint**: `Locale` (ensures one hero per language)
- **Indexes**: 
  - `IX_Hero_Locale` on `Locale` where `IsDeleted = 0`
  - `IX_Hero_IsDeleted` on `IsDeleted`
  - `IX_Hero_CreatedAt` on `CreatedAt`

## Module Structure

```
Hero/
├── Hero.java                    # JPA Entity
├── HeroDAO.java                # Repository Interface
├── HeroService.java            # Business Logic Service
├── HeroAPI.java                # REST Controller
├── HeroCreateRequest.java      # DTO for creating heroes
├── HeroUpdateRequest.java      # DTO for updating heroes
└── HeroResponse.java           # DTO for API responses
```

## API Endpoints

### 1. Get All Heroes
```http
GET /api/heroes
```
**Response**: Array of `HeroResponse`

### 2. Get Hero by ID
```http
GET /api/heroes/{heroId}
```
**Response**: `HeroResponse` or 404

### 3. Get Hero by Locale
```http
GET /api/heroes/locale/{locale}
```
**Response**: `HeroResponse` or 404

### 4. Create Hero
```http
POST /api/heroes
Content-Type: application/json

{
    "locale": "vi",
    "preHeading": "Xin chào, tôi là",
    "heading": "Nguyễn Hoàng Đình",
    "introHtml": "<p>Tôi là một <strong>Full-stack Developer</strong>...</p>"
}
```
**Response**: `HeroResponse` (201) or Error (400)

### 5. Update Hero
```http
PUT /api/heroes/{heroId}
Content-Type: application/json

{
    "locale": "vi",
    "preHeading": "Updated pre-heading",
    "heading": "Updated heading",
    "introHtml": "<p>Updated intro...</p>"
}
```
**Response**: `HeroResponse` or Error (400/404)

### 6. Delete Hero (Soft Delete)
```http
DELETE /api/heroes/{heroId}
```
**Response**: Success message or Error (400/404)

### 7. Restore Hero
```http
POST /api/heroes/{heroId}/restore
```
**Response**: `HeroResponse` or Error (400/404)

## Validation Rules

### HeroCreateRequest & HeroUpdateRequest
- `locale`: Required, max 10 characters, must be unique
- `preHeading`: Optional, max 256 characters
- `heading`: Required, max 256 characters
- `introHtml`: Optional, unlimited length

## Business Logic

### Create Hero
1. Validates input data
2. Checks if locale already exists
3. Sets default values (isDeleted = false, createdAt)
4. Saves to database

### Update Hero
1. Finds existing hero by ID
2. Validates input data
3. Checks locale uniqueness (excluding current record)
4. Updates fields and sets updatedAt
5. Saves to database

### Delete Hero (Soft Delete)
1. Finds existing hero by ID
2. Sets isDeleted = true and updatedAt
3. Saves to database

### Restore Hero
1. Finds hero by ID (including deleted ones)
2. Checks if hero is actually deleted
3. Validates locale doesn't conflict with existing active records
4. Sets isDeleted = false and updatedAt
5. Saves to database

## Error Handling
- **400 Bad Request**: Validation errors, business rule violations
- **404 Not Found**: Hero not found
- **500 Internal Server Error**: Unexpected system errors

## Sample Data
The module includes sample data for Vietnamese and English locales:

```sql
INSERT INTO dbo.Hero (Locale, PreHeading, Heading, IntroHtml)
VALUES 
    ('vi', 'Xin chào, tôi là', 'Nguyễn Hoàng Đình', '<p>Tôi là một <strong>Full-stack Developer</strong>...</p>'),
    ('en', 'Hello, I am', 'Nguyen Hoang Dinh', '<p>I am a <strong>Full-stack Developer</strong>...</p>');
```

## Testing
- Unit tests available in `HeroAPITest.java`
- Uses H2 in-memory database for testing
- Covers CRUD operations and validation scenarios

## Usage Example

### Frontend Integration
```javascript
// Get hero content for current locale
const getHeroContent = async (locale) => {
    const response = await fetch(`/api/heroes/locale/${locale}`);
    return response.json();
};

// Usage
const heroData = await getHeroContent('vi');
console.log(heroData.heading); // "Nguyễn Hoàng Đình"
```

## Security Notes
- CORS enabled for all origins (development setting)
- Soft delete ensures data integrity
- Row versioning prevents concurrent modification issues
- Input validation prevents XSS and data corruption
