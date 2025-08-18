# BlogTagMap Module Documentation

## 📋 **Overview**

The BlogTagMap module manages the many-to-many relationship between BlogPost and BlogTag entities. It provides comprehensive functionality for assigning tags to blog posts, analyzing tag relationships, tracking usage statistics, and finding content correlations through advanced querying capabilities.

## 🗃️ **Database Schema**

### **BlogTagMap Table**
```sql
CREATE TABLE dbo.BlogTagMap (
    BlogId UNIQUEIDENTIFIER NOT NULL,
    TagId  UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (BlogId, TagId),
    FOREIGN KEY (BlogId) REFERENCES dbo.BlogPost(BlogId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.BlogTag(TagId) ON DELETE CASCADE
);
```

### **Key Features:**
- **Composite Primary Key**: `(BlogId, TagId)` ensures unique relationships
- **Foreign Key Constraints**: Maintains referential integrity with CASCADE deletes
- **Many-to-Many Mapping**: Links blog posts with multiple tags efficiently
- **Junction Table Pattern**: Clean separation of concerns for relationship management

## 🏗️ **Architecture**

### **File Structure:**
```
BlogTagMap/
├── BlogTagMap.java                         # JPA Entity with Composite Key
├── BlogTagMapId.java                       # Composite Key Class
├── BlogTagMapDAO.java                      # Repository Interface
├── BlogTagMapService.java                  # Business Logic
├── BlogTagMapAPI.java                      # REST Controller
├── BlogTagMapRequest.java                  # Basic Request DTO
├── BlogTagMapByNameRequest.java            # Tag by Name Request DTO
├── BlogTagMapBatchRequest.java             # Batch Operations DTO
├── BlogTagMapBatchByNameRequest.java       # Batch by Names DTO
├── BlogTagPopularityResponse.java          # Tag Popularity Stats DTO
├── BlogTagCoOccurrenceResponse.java        # Tag Co-occurrence DTO
└── BlogPostTagStatsResponse.java           # Blog Post Tag Statistics DTO
```

### **Component Overview:**
- **Entity**: JPA mapping with composite key and lazy-loaded relationships
- **DAO**: Advanced queries for analytics, statistics, and relationship discovery
- **Service**: Business logic with batch operations and validation
- **API**: Comprehensive REST endpoints for all mapping operations
- **DTOs**: Specialized data transfer objects for different use cases

## 📡 **API Endpoints**

### **Basic Relationship Management**
```http
GET    /api/blog-tag-maps/blog/{blogId}                    # Get tags for blog post
GET    /api/blog-tag-maps/tag/{tagId}                      # Get blog posts for tag
GET    /api/blog-tag-maps/tag/name/{tagName}               # Get blog posts by tag name
GET    /api/blog-tag-maps/blog/{blogId}/tag/{tagId}        # Get specific mapping
POST   /api/blog-tag-maps/create                          # Create new mapping
POST   /api/blog-tag-maps/create-by-name                  # Create mapping by tag name
DELETE /api/blog-tag-maps/blog/{blogId}/tag/{tagId}       # Delete specific mapping
```

### **Batch Operations**
```http
PUT    /api/blog-tag-maps/blog/batch                      # Batch update blog post tags
PUT    /api/blog-tag-maps/blog/batch-by-names             # Batch update by tag names
DELETE /api/blog-tag-maps/blog/{blogId}/all               # Delete all tags for blog post
DELETE /api/blog-tag-maps/tag/{tagId}/all                 # Delete all mappings for tag
```

### **Analytics & Statistics**
```http
GET    /api/blog-tag-maps/blog/{blogId}/count             # Count tags for blog post
GET    /api/blog-tag-maps/tag/{tagId}/count               # Count blog posts for tag
GET    /api/blog-tag-maps/blog/{blogId}/related?limit=5   # Get related blog posts
GET    /api/blog-tag-maps/popular-tags?limit=10           # Get popular tags
GET    /api/blog-tag-maps/tag-cooccurrences?limit=10      # Get tag co-occurrences
GET    /api/blog-tag-maps/blog-post-stats                 # Get blog post tag statistics
```

### **Utility Endpoints**
```http
GET    /api/blog-tag-maps/blog/{blogId}/tag/{tagId}/exists # Check if mapping exists
```

## 🔧 **Usage Examples**

### **1. Assign Tags to Blog Post**
```json
POST /api/blog-tag-maps/create
{
    "blogId": "blog-uuid",
    "tagId": "tag-uuid"
}

Response:
{
    "blogId": "blog-uuid",
    "tagId": "tag-uuid"
}
```

### **2. Assign Tag by Name**
```json
POST /api/blog-tag-maps/create-by-name
{
    "blogId": "blog-uuid",
    "tagName": "Spring Boot"
}
```

### **3. Batch Update Blog Post Tags**
```json
PUT /api/blog-tag-maps/blog/batch
{
    "blogId": "blog-uuid",
    "tagIds": [
        "java-tag-uuid",
        "spring-boot-tag-uuid",
        "tutorial-tag-uuid"
    ]
}

Response: [Array of created BlogTagMap objects]
```

### **4. Batch Update by Tag Names**
```json
PUT /api/blog-tag-maps/blog/batch-by-names
{
    "blogId": "blog-uuid",
    "tagNames": ["Java", "Spring Boot", "Tutorial", "Best Practices"]
}
```

### **5. Get Tags for Blog Post**
```http
GET /api/blog-tag-maps/blog/{blog-uuid}

Response:
[
    {"tagId": "uuid1", "name": "Java"},
    {"tagId": "uuid2", "name": "Spring Boot"},
    {"tagId": "uuid3", "name": "Tutorial"}
]
```

### **6. Get Related Blog Posts**
```http
GET /api/blog-tag-maps/blog/{blog-uuid}/related?limit=5

Response: [Array of related BlogPost objects sharing tags]
```

### **7. Get Popular Tags with Statistics**
```http
GET /api/blog-tag-maps/popular-tags?limit=10

Response:
[
    {
        "tagId": "uuid1",
        "tagName": "Java",
        "usageCount": 15,
        "popularityPercentage": null,
        "popularityLevel": "Very High",
        "usageDescription": "15 blog posts"
    },
    {
        "tagId": "uuid2",
        "tagName": "Spring Boot",
        "usageCount": 12,
        "popularityPercentage": null,
        "popularityLevel": "Very High",
        "usageDescription": "12 blog posts"
    }
]
```

### **8. Get Tag Co-occurrences**
```http
GET /api/blog-tag-maps/tag-cooccurrences?limit=10

Response:
[
    {
        "tag1Id": "java-uuid",
        "tag1Name": "Java",
        "tag2Id": "spring-boot-uuid",
        "tag2Name": "Spring Boot",
        "coOccurrenceCount": 8,
        "relationshipStrength": "Very Strong",
        "tagPairDisplay": "Java + Spring Boot"
    }
]
```

## ⚡ **Key Features**

### **1. Comprehensive Relationship Management**
- **Individual Mappings**: Create, read, update, delete single tag assignments
- **Batch Operations**: Update all tags for a blog post in one operation
- **Tag Name Support**: Assign tags using names instead of UUIDs
- **Validation**: Ensures blog posts and tags exist before creating mappings

### **2. Advanced Analytics**
- **Tag Popularity**: Track which tags are most frequently used
- **Co-occurrence Analysis**: Find tags commonly used together
- **Related Content**: Discover blog posts sharing similar tags
- **Usage Statistics**: Comprehensive metrics for content analysis

### **3. Smart Batch Processing**
- **Replace All Tags**: Complete tag replacement for blog posts
- **Duplicate Prevention**: Automatic deduplication in batch operations
- **Transaction Safety**: All batch operations are transactional
- **Error Handling**: Detailed validation for all batch inputs

### **4. Relationship Discovery**
- **Related Posts**: Find content with shared tags
- **Tag Combinations**: Analyze which tags work well together
- **Content Clustering**: Group related content based on tag similarity
- **Trend Analysis**: Track tag usage patterns over time

## 🔍 **Service Layer Features**

### **Core Relationship Operations**
```java
public BlogTagMap createBlogTagMapping(UUID blogId, UUID tagId)              // Create mapping
public BlogTagMap createBlogTagMappingByName(UUID blogId, String tagName)   // Create by name
public void deleteBlogTagMapping(UUID blogId, UUID tagId)                   // Delete mapping
public Optional<BlogTagMap> getBlogTagMapping(UUID blogId, UUID tagId)      // Get mapping
public boolean isBlogTagMappingExists(UUID blogId, UUID tagId)              // Check existence
```

### **Content Retrieval**
```java
public List<BlogTag> getTagsForBlogPost(UUID blogId)                        // Get post's tags
public List<BlogPost> getBlogPostsForTag(UUID tagId)                        // Get tag's posts
public List<BlogPost> getBlogPostsForTagByName(String tagName)              // Get posts by tag name
```

### **Batch Operations**
```java
public List<BlogTagMap> updateBlogPostTags(UUID blogId, List<UUID> tagIds)  // Batch update
public List<BlogTagMap> updateBlogPostTagsByNames(UUID blogId, List<String> tagNames) // By names
public void deleteAllTagsForBlogPost(UUID blogId)                           // Clear all tags
public void deleteAllMappingsForTag(UUID tagId)                             // Remove tag from all posts
```

### **Analytics & Statistics**
```java
public List<BlogPost> getRelatedBlogPosts(UUID blogId, int limit)           // Related content
public List<BlogTagPopularityResponse> getPopularTags(int limit)            // Popular tags
public List<BlogTagCoOccurrenceResponse> getTagCoOccurrences(int limit)     // Tag pairs
public List<BlogPostTagStatsResponse> getBlogPostTagStatistics()            // Post statistics
```

### **Utility Functions**
```java
public long countTagsForBlogPost(UUID blogId)                               // Count post's tags
public long countBlogPostsForTag(UUID tagId)                                // Count tag's posts
```

## 🗄️ **Advanced Database Queries**

### **Relationship Queries**
```java
// Basic relationships
List<BlogTagMap> findByBlogId(UUID blogId)                    // All mappings for blog post
List<BlogTagMap> findByTagId(UUID tagId)                      // All mappings for tag
Optional<BlogTagMap> findByBlogIdAndTagId(UUID blogId, UUID tagId) // Specific mapping

// Entity retrieval
List<BlogTag> findTagsByBlogId(UUID blogId)                   // Tags for blog post
List<BlogPost> findBlogPostsByTagId(UUID tagId)               // Posts for tag
List<BlogPost> findBlogPostsByTagName(String tagName)         // Posts by tag name
```

### **Analytics Queries**
```java
// Usage statistics
long countTagsByBlogId(UUID blogId)                           // Count post's tags
long countBlogPostsByTagId(UUID tagId)                        // Count tag's posts

// Popular content
List<Object[]> findMostPopularTags()                          // Most used tags
List<BlogPost> findRelatedBlogPosts(UUID blogId)              // Related posts

// Advanced analytics
List<Object[]> findTagCoOccurrences()                         // Tag co-occurrence analysis
List<Object[]> findBlogPostTagCounts()                        // Post tag statistics
```

### **Batch Operations**
```java
// Bulk deletions
void deleteByBlogId(UUID blogId)                              // Remove all tags from post
void deleteByTagId(UUID tagId)                                // Remove tag from all posts
void deleteByBlogIdAndTagId(UUID blogId, UUID tagId)          // Remove specific mapping
```

## 🎯 **Frontend Integration**

### **Blog Post Editor**
```javascript
// Get current tags for editing
const currentTags = await fetch(`/api/blog-tag-maps/blog/${blogId}`);

// Update all tags for blog post
const updatedTags = await fetch('/api/blog-tag-maps/blog/batch-by-names', {
    method: 'PUT',
    body: JSON.stringify({
        blogId: blogId,
        tagNames: ['Java', 'Spring Boot', 'Tutorial']
    })
});
```

### **Tag-based Navigation**
```javascript
// Get all posts for a specific tag
const taggedPosts = await fetch(`/api/blog-tag-maps/tag/name/Java`);

// Get related posts for recommendation system
const relatedPosts = await fetch(`/api/blog-tag-maps/blog/${blogId}/related?limit=5`);
```

### **Analytics Dashboard**
```javascript
// Popular tags for tag cloud
const popularTags = await fetch('/api/blog-tag-maps/popular-tags?limit=20');

// Tag relationships for visualization
const tagRelationships = await fetch('/api/blog-tag-maps/tag-cooccurrences?limit=50');

// Content statistics
const postStats = await fetch('/api/blog-tag-maps/blog-post-stats');
```

## 🛡️ **Security & Validation**

### **Input Validation**
- **BlogId**: Required UUID, must reference existing non-deleted blog post
- **TagId**: Required UUID, must reference existing tag
- **TagName**: Required string, must match existing tag (case-insensitive)
- **Batch Operations**: Non-empty lists, duplicate removal, existence validation

### **Business Rules**
- Cannot assign same tag to blog post multiple times
- Blog post must exist and not be deleted
- Tag must exist before assignment
- Batch operations are transactional (all or nothing)
- Cascade deletes maintain referential integrity

### **Error Handling**
- Clear error messages for validation failures
- Proper HTTP status codes (400, 404, 500)
- Graceful handling of missing entities
- Batch operation error collection and reporting

## 📈 **Performance Considerations**

### **Database Optimization**
```sql
-- Composite primary key index (automatic)
CREATE INDEX PK_BlogTagMap ON dbo.BlogTagMap(BlogId, TagId);

-- Individual foreign key indexes
CREATE INDEX IX_BlogTagMap_BlogId ON dbo.BlogTagMap(BlogId);
CREATE INDEX IX_BlogTagMap_TagId ON dbo.BlogTagMap(TagId);
```

### **Query Optimization**
- Efficient JOIN operations for entity retrieval
- Batch processing for multiple operations
- Lazy loading for related entities
- Optimized aggregate queries for statistics

### **Caching Strategies**
- Popular tags list (updated periodically)
- Tag co-occurrence data (computed daily)
- Related posts cache (tag-based similarity)
- Blog post tag counts (real-time updates)

## 🔗 **Module Integration**

### **BlogPost Integration**
```java
// In BlogPost service, when creating/updating:
blogTagMapService.updateBlogPostTagsByNames(blogId, request.getTagNames());

// When deleting blog post:
blogTagMapService.deleteAllTagsForBlogPost(blogId);
```

### **BlogTag Integration**
```java
// In BlogTag service, before deleting tag:
long usageCount = blogTagMapService.countBlogPostsForTag(tagId);
if (usageCount > 0) {
    throw new IllegalArgumentException("Tag is in use");
}
```

## 🔍 **Analytics Use Cases**

### **Content Discovery**
- **Related Articles**: Find posts with similar tag profiles
- **Topic Exploration**: Navigate content by technology stack
- **Content Gaps**: Identify underrepresented tag combinations

### **SEO & Marketing**
- **Popular Technologies**: Track trending topics for content planning
- **Tag Optimization**: Analyze optimal tag counts per post
- **Content Strategy**: Plan content based on tag popularity

### **User Experience**
- **Personalization**: Recommend content based on reading history
- **Navigation**: Tag-based filtering and search
- **Content Discovery**: "More like this" functionality

This BlogTagMap module provides the foundation for sophisticated content organization, analytics, and discovery features in your blog platform!
