# BlogPost Module Documentation

## 📝 **Overview**

The BlogPost module manages technical blog posts and articles for the portfolio website. It provides comprehensive functionality for creating, managing, and organizing blog content with features like slug generation, soft deletion, search capabilities, and tag management.

## 🗃️ **Database Schema**

### **BlogPost Table**
```sql
CREATE TABLE dbo.BlogPost (
    BlogId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Title       NVARCHAR(200) NOT NULL,
    Slug        NVARCHAR(200) NOT NULL UNIQUE,
    Description NVARCHAR(300) NULL,
    Thumbnail   NVARCHAR(512) NULL,
    Content     NVARCHAR(MAX) NULL,
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2 NULL,
    IsDeleted   BIT DEFAULT 0,
    RowVer      ROWVERSION
);
```

### **Key Features:**
- **UUID Primary Key**: `BlogId` for secure, non-sequential identification
- **SEO-Friendly URLs**: `Slug` field for clean, readable URLs
- **Rich Content**: `Content` field supports HTML for rich text formatting
- **Soft Deletion**: `IsDeleted` flag for safe content management
- **Automatic Timestamps**: Creation and update tracking
- **Version Control**: `RowVer` for optimistic locking

## 🏗️ **Architecture**

### **File Structure:**
```
BlogPost/
├── BlogPost.java           # JPA Entity
├── BlogPostDAO.java        # Repository Interface
├── BlogPostService.java    # Business Logic
├── BlogPostAPI.java        # REST Controller
├── BlogPostRequest.java    # Request DTO
└── BlogPostResponse.java   # Response DTO
```

### **Component Overview:**
- **Entity**: JPA mapping with validation annotations
- **DAO**: Custom queries for search, filtering, and pagination
- **Service**: Business logic including slug generation and content management
- **API**: RESTful endpoints with comprehensive CRUD operations
- **DTOs**: Separate request/response objects for clean API design

## 📡 **API Endpoints**

### **Public Blog APIs**
```http
GET    /api/blog-posts/all                    # Get all active blog posts
GET    /api/blog-posts/{id}                   # Get blog post by ID
GET    /api/blog-posts/slug/{slug}            # Get blog post by slug
GET    /api/blog-posts/search?keyword={keyword}        # Search blog posts
GET    /api/blog-posts/recent?limit={limit}   # Get recent blog posts
GET    /api/blog-posts/year/{year}            # Get posts by year
GET    /api/blog-posts/year/{year}/month/{month}       # Get posts by year/month
GET    /api/blog-posts/count                  # Count active blog posts
```

### **Content Management APIs**
```http
POST   /api/blog-posts/create                 # Create new blog post
PUT    /api/blog-posts/{id}                   # Update blog post
DELETE /api/blog-posts/{id}                   # Soft delete blog post
```

### **Admin APIs**
```http
GET    /api/blog-posts/admin/all              # Get all posts (including deleted)
PUT    /api/blog-posts/admin/{id}/restore     # Restore deleted blog post
DELETE /api/blog-posts/admin/{id}/permanent   # Permanently delete blog post
```

## 🔧 **Usage Examples**

### **1. Create a New Blog Post**
```json
POST /api/blog-posts/create
{
    "title": "Getting Started with Spring Boot and React",
    "slug": "spring-boot-react-tutorial",     // Optional - auto-generated from title
    "description": "Learn to build full-stack apps with Spring Boot and React",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "content": "<h1>Introduction</h1><p>In this tutorial...</p>"
}

Response:
{
    "blogId": "uuid-string",
    "title": "Getting Started with Spring Boot and React",
    "slug": "spring-boot-react-tutorial",
    "description": "Learn to build full-stack apps with Spring Boot and React",
    "thumbnail": "https://example.com/thumbnail.jpg",
    "content": "<h1>Introduction</h1><p>In this tutorial...</p>",
    "createdAt": "2025-08-19T01:30:00",
    "updatedAt": null,
    "isDeleted": false
}
```

### **2. Get Blog Post by Slug (SEO-Friendly)**
```http
GET /api/blog-posts/slug/spring-boot-react-tutorial

Response: {Full blog post object with content}
```

### **3. Search Blog Posts**
```http
GET /api/blog-posts/search?keyword=spring boot

Response: [Array of matching blog posts]
```

### **4. Get Recent Blog Posts**
```http
GET /api/blog-posts/recent?limit=5

Response: [Array of 5 most recent blog posts]
```

### **5. Update Blog Post**
```json
PUT /api/blog-posts/{blog-id}
{
    "title": "Updated: Getting Started with Spring Boot and React",
    "slug": "updated-spring-boot-react-tutorial",
    "description": "Updated description with more details",
    "thumbnail": "https://example.com/new-thumbnail.jpg",
    "content": "<h1>Updated Introduction</h1><p>Updated content...</p>"
}
```

## ⚡ **Key Features**

### **1. Automatic Slug Generation**
- Generates SEO-friendly URLs from blog post titles
- Handles special characters, accents, and unicode
- Ensures uniqueness by appending numbers if needed
- Normalizes text to create clean URLs

**Example:**
```
Title: "Getting Started with Spring Boot & React"
Generated Slug: "getting-started-with-spring-boot-react"
```

### **2. Smart Content Management**
- **Soft Deletion**: Blog posts are marked as deleted, not permanently removed
- **Version Control**: Uses `@Version` annotation for optimistic locking
- **Automatic Timestamps**: Tracks creation and update times
- **Rich Content Support**: HTML content for formatted blog posts

### **3. Advanced Search Capabilities**
- Search in title, description, and content
- Case-insensitive keyword matching
- Excludes deleted posts from search results
- Ordered by relevance and creation date

### **4. Flexible Querying**
- Get posts by year/month for archive functionality
- Recent posts with configurable limits
- Count operations for pagination
- Admin queries including deleted posts

## 🔍 **Service Layer Features**

### **BlogPostService Methods:**

#### **Content Management**
```java
public BlogPost createBlogPost(BlogPostRequest request)          // Create with auto-slug
public BlogPost updateBlogPost(UUID id, BlogPostRequest request) // Update with validation
public void deleteBlogPost(UUID id)                             // Soft delete
```

#### **Content Retrieval**
```java
public List<BlogPost> getAllActiveBlogPosts()                   // All active posts
public Optional<BlogPost> getBlogPostById(UUID id)              // By ID (active only)
public Optional<BlogPost> getBlogPostBySlug(String slug)        // By slug (SEO)
public List<BlogPost> searchBlogPosts(String keyword)           // Full-text search
```

#### **Time-based Queries**
```java
public List<BlogPost> getBlogPostsByYear(int year)              // Archive by year
public List<BlogPost> getBlogPostsByYearAndMonth(int year, int month) // Monthly archive
public List<BlogPost> getRecentBlogPosts(int limit)             // Recent posts
```

#### **Admin Functions**
```java
public List<BlogPost> getAllBlogPostsForAdmin()                 // Including deleted
public BlogPost restoreBlogPost(UUID id)                       // Restore deleted
public void permanentlyDeleteBlogPost(UUID id)                 // Permanent deletion
```

### **Utility Functions**
```java
private String generateSlugFromTitle(String title)              // Auto-generate slug
private String normalizeSlug(String input)                      // Clean and normalize
private String generateUniqueSlug(String baseSlug)              // Ensure uniqueness
```

## 🗄️ **Database Queries**

### **Custom Repository Methods:**
```java
// SEO-friendly URL lookup
Optional<BlogPost> findBySlugAndIsDeletedFalse(String slug)

// Content search
List<BlogPost> searchByKeywordAndIsDeletedFalse(String keyword)

// Time-based filtering
List<BlogPost> findByCreatedAtYearAndIsDeletedFalse(int year)
List<BlogPost> findByCreatedAtYearAndMonthAndIsDeletedFalse(int year, int month)

// Validation helpers
boolean existsBySlugAndIsDeletedFalse(String slug)
long countByIsDeletedFalse()
```

## 🎯 **Frontend Integration**

### **Blog List Page**
```javascript
// Get recent blog posts for homepage
const recentPosts = await fetch('/api/blog-posts/recent?limit=3');

// Get all posts for blog listing
const allPosts = await fetch('/api/blog-posts/all');

// Search functionality
const searchResults = await fetch(`/api/blog-posts/search?keyword=${encodeURIComponent(query)}`);
```

### **Blog Detail Page**
```javascript
// Load blog post by slug (SEO-friendly URL)
const blogPost = await fetch(`/api/blog-posts/slug/${slug}`);
```

### **Archive Functionality**
```javascript
// Monthly archives
const monthlyPosts = await fetch(`/api/blog-posts/year/2025/month/8`);

// Yearly archives
const yearlyPosts = await fetch(`/api/blog-posts/year/2025`);
```

## 🛡️ **Security & Validation**

### **Input Validation**
- **Title**: Required, max 200 characters
- **Slug**: Optional, max 200 characters, unique
- **Description**: Optional, max 300 characters
- **Thumbnail**: Optional, max 512 characters (URL)
- **Content**: Optional, unlimited length (NVARCHAR(MAX))

### **Security Features**
- UUID primary keys (no sequential IDs exposed)
- Input sanitization for slug generation
- Soft deletion prevents accidental data loss
- Version control prevents concurrent modification issues

### **Error Handling**
- Validation errors return HTTP 400 with details
- Not found errors return HTTP 404
- Server errors return HTTP 500
- Unique constraint violations handled gracefully

## 📈 **Performance Considerations**

### **Database Indexes**
```sql
CREATE INDEX IX_BlogPost_CreatedAt ON dbo.BlogPost(CreatedAt DESC);  -- Time-based queries
CREATE INDEX IX_BlogPost_IsDeleted ON dbo.BlogPost(IsDeleted);       -- Active posts filter
CREATE INDEX IX_BlogPost_Slug ON dbo.BlogPost(Slug);                 -- SEO URL lookup
CREATE INDEX IX_BlogPost_Title ON dbo.BlogPost(Title);               -- Search optimization
```

### **Query Optimization**
- Separate queries for summary vs. full content
- Pagination support through limit parameters
- Efficient search using database indexes
- Soft deletion filter in all public queries

## 🚀 **Deployment & Configuration**

### **Application Properties**
```properties
# JPA Configuration for Blog Module
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true

# Connection pool for blog content queries
spring.datasource.hikari.maximum-pool-size=20
spring.datasource.hikari.minimum-idle=5
```

### **Sample Data**
The module includes sample blog posts with:
- Technical tutorials (Spring Boot, React, Docker)
- Best practices articles
- Code examples and demos
- Sample tags for content categorization

This BlogPost module provides a complete foundation for a technical blog with all the features needed for content management, SEO optimization, and user engagement!
