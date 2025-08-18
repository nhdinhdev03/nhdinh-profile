# ProjectCategory Module Documentation

## Overview
The ProjectCategory module manages project categories/types for portfolio projects, providing a way to classify projects into different categories like Frontend, Backend, Full-stack, AI/ML, etc.

## Database Schema

### Table: `dbo.ProjectCategory`
```sql
CREATE TABLE dbo.ProjectCategory (
    CategoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name       NVARCHAR(50) NOT NULL UNIQUE
);
```

### Constraints & Indexes
- **Primary Key**: `CategoryId` (UNIQUEIDENTIFIER)
- **Unique Constraint**: `Name` - ensures no duplicate category names
- **Indexes**: 
  - `IX_ProjectCategory_Name` on `Name`

## Module Structure

```
ProjectCategory/
├── ProjectCategory.java                    # JPA Entity
├── ProjectCategoryDAO.java                # Repository Interface
├── ProjectCategoryService.java            # Business Logic Service
├── ProjectCategoryAPI.java                # REST Controller
├── ProjectCategoryCreateRequest.java      # DTO for creating categories
├── ProjectCategoryUpdateRequest.java      # DTO for updating categories
└── ProjectCategoryResponse.java           # DTO for API responses
```

## API Endpoints

### 1. Get All Categories
```http
GET /api/project-categories
```
**Response**: Array of `ProjectCategoryResponse` ordered by name

### 2. Get Category by ID
```http
GET /api/project-categories/{categoryId}
```
**Response**: Single `ProjectCategoryResponse`

### 3. Get Category by Name
```http
GET /api/project-categories/name/{name}
```
**Response**: Single `ProjectCategoryResponse`

### 4. Search Categories
```http
GET /api/project-categories/search?keyword={keyword}
```
**Response**: Array of `ProjectCategoryResponse` matching the keyword

### 5. Create Category
```http
POST /api/project-categories
Content-Type: application/json

{
  "name": "string (max 50)"
}
```
**Response**: Created `ProjectCategoryResponse`

### 6. Update Category
```http
PUT /api/project-categories/{categoryId}
Content-Type: application/json

{
  "name": "string (max 50)"
}
```
**Response**: Updated `ProjectCategoryResponse`

### 7. Delete Category
```http
DELETE /api/project-categories/{categoryId}
```
**Response**: Success message

### 8. Check if Category Name Exists
```http
GET /api/project-categories/exists?name={name}
```
**Response**: Boolean value

## Business Rules

1. **Unique Names**: Category names must be unique (case-insensitive)
2. **Required Name**: Category name is required and cannot be empty
3. **Length Limit**: Category name cannot exceed 50 characters
4. **Trim Whitespace**: Category names are automatically trimmed of leading/trailing whitespace

## Sample Data

The system comes with predefined categories:
- Frontend
- Backend
- Full-stack
- Mobile
- AI/ML
- DevOps
- Desktop
- Game Development
- Data Science
- Blockchain

## Usage Examples

### Frontend Integration
```javascript
// Get all categories
const response = await fetch('/api/project-categories');
const categories = await response.json();

// Create a dropdown/select
categories.forEach(category => {
  console.log(`${category.categoryId}: ${category.name}`);
});

// Create new category
const newCategory = {
  name: "Web3"
};

const createResponse = await fetch('/api/project-categories', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(newCategory)
});

// Search categories
const searchResponse = await fetch('/api/project-categories/search?keyword=web');
const searchResults = await searchResponse.json();
```

### Project Entity Integration
```java
// In Project entity, you can reference ProjectCategory
@ManyToOne(fetch = FetchType.LAZY)
@JoinColumn(name = "CategoryId")
private ProjectCategory category;
```

## Error Handling

The API provides detailed error messages for common scenarios:
- **404**: Category not found
- **400**: Validation errors (duplicate name, empty name, name too long)
- **500**: Internal server errors

Common error responses:
```json
{
  "message": "Tên category 'Frontend' đã tồn tại",
  "status": "error"
}
```

## Performance Considerations

1. **Simple Entity**: ProjectCategory is a lightweight entity with minimal fields
2. **Indexed Queries**: Name searches use indexed columns
3. **Case-Insensitive Search**: All name comparisons are case-insensitive
4. **Caching Opportunity**: Categories are good candidates for caching due to low change frequency

## Future Enhancements

1. **Category Hierarchy**: Support for parent-child category relationships
2. **Category Description**: Add optional description field
3. **Category Icons**: Support for category icons/images
4. **Category Colors**: Add color coding for UI display
5. **Category Usage Stats**: Track how many projects use each category
