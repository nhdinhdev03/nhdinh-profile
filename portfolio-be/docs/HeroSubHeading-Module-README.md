# HeroSubHeading Module Documentation

## Overview
The HeroSubHeading module manages sub-headings for hero sections, providing support for multiple text items per hero with custom ordering capabilities.

## Database Schema

### Table: `dbo.HeroSubHeading`
```sql
CREATE TABLE dbo.HeroSubHeading (
    SubId     UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    HeroId    UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.Hero(HeroId) ON DELETE CASCADE,
    Text      NVARCHAR(256) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    RowVer    ROWVERSION,
    CONSTRAINT UQ_SubHeading UNIQUE (HeroId, Text)
);
```

### Constraints & Indexes
- **Primary Key**: `SubId` (UNIQUEIDENTIFIER)
- **Foreign Key**: `HeroId` references `dbo.Hero(HeroId)` with CASCADE DELETE
- **Unique Constraint**: `UQ_SubHeading` on `(HeroId, Text)` - prevents duplicate text per hero
- **Indexes**: 
  - `IX_HeroSubHeading_HeroId` on `HeroId`
  - `IX_HeroSubHeading_SortOrder` on `(HeroId, SortOrder)`
  - `IX_HeroSubHeading_CreatedAt` on `CreatedAt`

## Module Structure

```
HeroSubHeading/
├── HeroSubHeading.java                    # JPA Entity
├── HeroSubHeadingDAO.java                # Repository Interface
├── HeroSubHeadingService.java            # Business Logic Service
├── HeroSubHeadingAPI.java                # REST Controller
├── HeroSubHeadingCreateRequest.java      # DTO for creating sub-headings
├── HeroSubHeadingUpdateRequest.java      # DTO for updating sub-headings
├── HeroSubHeadingReorderRequest.java     # DTO for reordering sub-headings
└── HeroSubHeadingResponse.java           # DTO for API responses
```

## API Endpoints

### 1. Get SubHeadings by Hero ID
```http
GET /api/hero-subheadings/hero/{heroId}
```
**Response**: Array of `HeroSubHeadingResponse` ordered by `sortOrder`

### 2. Get SubHeadings by Locale
```http
GET /api/hero-subheadings/locale/{locale}
```
**Response**: Array of `HeroSubHeadingResponse` for the specified locale

### 3. Get SubHeading by ID
```http
GET /api/hero-subheadings/{subId}
```
**Response**: Single `HeroSubHeadingResponse`

### 4. Create SubHeading
```http
POST /api/hero-subheadings
Content-Type: application/json

{
  "heroId": "uuid",
  "text": "string (max 256)",
  "sortOrder": 1 // optional, auto-calculated if not provided
}
```
**Response**: Created `HeroSubHeadingResponse`

### 5. Update SubHeading
```http
PUT /api/hero-subheadings/{subId}
Content-Type: application/json

{
  "text": "string (max 256)",
  "sortOrder": 1 // optional
}
```
**Response**: Updated `HeroSubHeadingResponse`

### 6. Delete SubHeading
```http
DELETE /api/hero-subheadings/{subId}
```
**Response**: Success message

### 7. Reorder SubHeadings
```http
PUT /api/hero-subheadings/reorder
Content-Type: application/json

[
  {
    "subId": "uuid",
    "sortOrder": 1
  },
  {
    "subId": "uuid",
    "sortOrder": 2
  }
]
```
**Response**: Success message

## Entity Relationships

```
Hero (1) ──────── (Many) HeroSubHeading
     │                        │
     └─ heroId           └─ hero.heroId
```

### JPA Relationship Configuration
- **Hero Entity**: `@OneToMany(mappedBy = "hero", cascade = CascadeType.ALL, fetch = FetchType.LAZY, orphanRemoval = true)`
- **HeroSubHeading Entity**: `@ManyToOne(fetch = FetchType.LAZY) @JoinColumn(name = "HeroId")`

## Business Rules

1. **Unique Text per Hero**: Each hero can only have unique sub-heading texts
2. **Auto Sort Order**: If no sort order is provided during creation, it will be set to max + 1
3. **Cascade Delete**: When a hero is deleted, all its sub-headings are automatically deleted
4. **Validation**: Text is required and cannot exceed 256 characters

## Sample Data

```sql
-- Sample sub-headings for Vietnamese hero
INSERT INTO dbo.HeroSubHeading (HeroId, Text, SortOrder)
VALUES 
    ('hero-uuid-vi', 'Lập trình viên Full-stack', 1),
    ('hero-uuid-vi', 'Chuyên gia React & Spring Boot', 2),
    ('hero-uuid-vi', 'Đam mê tạo ra sản phẩm chất lượng', 3);

-- Sample sub-headings for English hero
INSERT INTO dbo.HeroSubHeading (HeroId, Text, SortOrder)
VALUES 
    ('hero-uuid-en', 'Full-stack Developer', 1),
    ('hero-uuid-en', 'React & Spring Boot Expert', 2),
    ('hero-uuid-en', 'Passionate about creating quality products', 3);
```

## Usage Examples

### Frontend Integration
```javascript
// Get sub-headings for a hero
const response = await fetch('/api/hero-subheadings/hero/{heroId}');
const subHeadings = await response.json();

// Display sub-headings
subHeadings.forEach(subHeading => {
  console.log(`${subHeading.sortOrder}: ${subHeading.text}`);
});

// Reorder sub-headings
const reorderRequests = [
  { subId: 'uuid1', sortOrder: 2 },
  { subId: 'uuid2', sortOrder: 1 }
];

await fetch('/api/hero-subheadings/reorder', {
  method: 'PUT',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(reorderRequests)
});
```

## Error Handling

The API provides detailed error messages for common scenarios:
- **404**: Hero or SubHeading not found
- **400**: Validation errors (duplicate text, missing required fields)
- **500**: Internal server errors

## Performance Considerations

1. **Lazy Loading**: SubHeadings are loaded lazily when accessing from Hero entity
2. **Indexed Queries**: All queries use indexed columns for optimal performance
3. **Bulk Operations**: Reordering supports bulk updates for efficiency
