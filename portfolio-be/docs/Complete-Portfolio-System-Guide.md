# Portfolio Management System - Complete Setup Guide

## 📋 **Overview**

This portfolio management system provides a complete backend solution for managing personal projects with categories and technology tags. The system consists of 4 main modules:

1. **ProjectCategory** - Project categorization (Web Dev, Mobile, etc.)
2. **ProjectTag** - Technology tags (React, Java, Docker, etc.)
3. **Project** - Individual projects with details
4. **ProjectTagMap** - Many-to-many relationship with sort ordering

## 🗃️ **Database Schema**

### **Table Structure:**
```
ProjectCategory (1) ←── Project (M) ←→ ProjectTagMap (M:M) ←→ ProjectTag (1)
```

### **Tables:**
- **`ProjectCategory`**: Categories like "Web Development", "Mobile App"
- **`ProjectTag`**: Technology tags like "React", "Java", "Docker"
- **`Project`**: Individual projects with title, description, URLs, etc.
- **`ProjectTagMap`**: Junction table linking projects to tags with sort order

## 🚀 **Quick Setup**

### **Step 1: Database Setup**
Choose one of these options:

#### **Option A: Quick Setup (Recommended)**
```sql
-- Run this file to create all tables with basic data
/sql/quick-setup-portfolio-db.sql
```

#### **Option B: Complete Setup**
```sql
-- Run this file for full setup with views, procedures, and sample data
/sql/create-complete-portfolio-schema.sql
```

### **Step 2: Application Configuration**
Ensure your `application.properties` points to the correct database:

```properties
spring.datasource.url=jdbc:sqlserver://localhost:1433;databaseName=YourPortfolioDB
spring.datasource.username=your_username
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=validate
```

### **Step 3: Run the Application**
```bash
cd portfolio-be
mvn spring-boot:run
```

## 📡 **API Endpoints**

### **Project Category APIs**
```http
GET    /api/project-categories/all           # Get all categories
GET    /api/project-categories/{id}          # Get category by ID
POST   /api/project-categories/create        # Create new category
PUT    /api/project-categories/{id}          # Update category
DELETE /api/project-categories/{id}          # Delete category
GET    /api/project-categories/search?keyword={keyword}  # Search categories
```

### **Project Tag APIs**
```http
GET    /api/project-tags/all                 # Get all tags
GET    /api/project-tags/{id}                # Get tag by ID
GET    /api/project-tags/by-name/{name}      # Get tag by name
POST   /api/project-tags/create              # Create new tag
PUT    /api/project-tags/{id}                # Update tag
DELETE /api/project-tags/{id}                # Delete tag
GET    /api/project-tags/search?keyword={keyword}       # Search tags
GET    /api/project-tags/popular             # Get popular tags
```

### **Project APIs**
```http
GET    /api/projects/all                     # Get all projects
GET    /api/projects/{id}                    # Get project by ID
GET    /api/projects/category/{categoryId}   # Get projects by category
GET    /api/projects/tag/{tagId}             # Get projects by tag
GET    /api/projects/tag/name/{tagName}      # Get projects by tag name
POST   /api/projects/create                  # Create new project
PUT    /api/projects/{id}                    # Update project
DELETE /api/projects/{id}                    # Delete project
GET    /api/projects/search?keyword={keyword}            # Search projects
GET    /api/projects/category/{categoryId}/count         # Count projects in category
```

### **Project Tag Map APIs**
```http
GET    /api/project-tag-maps/project/{projectId}         # Get project's tags (sorted)
GET    /api/project-tag-maps/tag/{tagId}                 # Get tag's projects
GET    /api/project-tag-maps/project/{projectId}/tag/{tagId}  # Get specific mapping
POST   /api/project-tag-maps/create                      # Create mapping
PUT    /api/project-tag-maps/project/{projectId}/tag/{tagId}  # Update mapping
DELETE /api/project-tag-maps/project/{projectId}/tag/{tagId}  # Delete mapping
PUT    /api/project-tag-maps/project/batch               # Batch update project tags
DELETE /api/project-tag-maps/project/{projectId}/all    # Delete all project tags
GET    /api/project-tag-maps/project/{projectId}/count   # Count project's tags
GET    /api/project-tag-maps/tag/{tagId}/count           # Count tag's projects
```

## 🔧 **Usage Examples**

### **1. Create a New Project with Tags**
```json
POST /api/projects/create
{
    "title": "E-commerce Website",
    "description": "Full-stack e-commerce platform with modern UI",
    "imageUrl": "https://example.com/preview.jpg",
    "demoUrl": "https://demo.example.com",
    "sourceUrl": "https://github.com/username/ecommerce",
    "categoryId": "web-development-category-id",
    "tagNames": ["React", "Node.js", "MongoDB", "TailwindCSS", "Docker"]
}
```

### **2. Update Project Tags with Custom Order**
```json
PUT /api/project-tag-maps/project/batch
{
    "projectId": "project-uuid",
    "tagMappings": [
        {"tagId": "react-uuid", "sortOrder": 1},       // Primary technology
        {"tagId": "nodejs-uuid", "sortOrder": 2},      // Backend
        {"tagId": "mongodb-uuid", "sortOrder": 3},     // Database
        {"tagId": "tailwind-uuid", "sortOrder": 4},    // Styling
        {"tagId": "docker-uuid", "sortOrder": 5}       // DevOps
    ]
}
```

### **3. Search Projects by Technology**
```http
GET /api/projects/tag/name/React
GET /api/projects/search?keyword=e-commerce
GET /api/projects/category/{web-dev-category-id}
```

### **4. Get Complete Project Information**
```json
GET /api/projects/{project-id}

Response:
{
    "projectId": "uuid",
    "title": "E-commerce Website",
    "description": "Full-stack e-commerce platform",
    "imageUrl": "https://example.com/preview.jpg",
    "demoUrl": "https://demo.example.com",
    "sourceUrl": "https://github.com/username/ecommerce",
    "category": {
        "categoryId": "uuid",
        "name": "Web Development"
    },
    "tags": [
        {"tagId": "uuid1", "name": "React"},
        {"tagId": "uuid2", "name": "Node.js"},
        {"tagId": "uuid3", "name": "MongoDB"}
    ],
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": "2024-01-16T14:20:00"
}
```

## 🏗️ **Architecture Overview**

### **Backend Structure:**
```
portfolio-be/
├── src/main/java/com/nhdinh/profile/modules/
│   ├── ProjectCategory/          # Category management
│   ├── ProjectTag/               # Tag management  
│   ├── Project/                  # Project management
│   └── ProjectTagMap/            # Tag-Project relationships
├── sql/                          # Database scripts
└── docs/                         # Documentation
```

### **Module Components:**
Each module follows the same pattern:
- **Entity** (`.java`) - JPA entity with database mapping
- **DAO** (`.java`) - Repository interface with custom queries
- **Service** (`.java`) - Business logic layer
- **API** (`.java`) - REST controller with endpoints
- **DTOs** - Request/Response data transfer objects

## 🔍 **Advanced Features**

### **1. Tag Ordering**
Projects can have tags sorted by importance:
```sql
SELECT pt.Name FROM ProjectTagMap ptm
JOIN ProjectTag pt ON ptm.TagId = pt.TagId
WHERE ptm.ProjectId = @ProjectId
ORDER BY ptm.SortOrder;
```

### **2. Technology Statistics**
```sql
-- Most popular technologies
SELECT pt.Name, COUNT(*) as UsageCount
FROM ProjectTag pt
JOIN ProjectTagMap ptm ON pt.TagId = ptm.TagId
GROUP BY pt.TagId, pt.Name
ORDER BY UsageCount DESC;
```

### **3. Project Filtering**
- Filter by category
- Filter by technology stack
- Search by keywords
- Sort by creation date

### **4. Batch Operations**
- Bulk update project tags
- Bulk delete operations
- Batch import/export

## 🔧 **Configuration Options**

### **Database Configuration:**
```properties
# SQL Server
spring.datasource.driver-class-name=com.microsoft.sqlserver.jdbc.SQLServerDriver
spring.jpa.database-platform=org.hibernate.dialect.SQLServerDialect

# MySQL Alternative
spring.datasource.driver-class-name=com.mysql.cj.jdbc.Driver
spring.jpa.database-platform=org.hibernate.dialect.MySQL8Dialect

# PostgreSQL Alternative  
spring.datasource.driver-class-name=org.postgresql.Driver
spring.jpa.database-platform=org.hibernate.dialect.PostgreSQLDialect
```

### **JPA Configuration:**
```properties
spring.jpa.hibernate.ddl-auto=validate
spring.jpa.show-sql=false
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.properties.hibernate.dialect.storage_engine=innodb
```

## 🚀 **Deployment**

### **Production Checklist:**
- [ ] Database created and populated
- [ ] Connection strings configured
- [ ] Environment variables set
- [ ] SSL certificates configured
- [ ] CORS origins restricted
- [ ] Logging configured
- [ ] Health checks enabled

### **Docker Deployment:**
```dockerfile
FROM openjdk:17-jre-slim
COPY target/portfolio-service.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "/app.jar"]
```

## 📊 **Sample Data**

The system comes with pre-configured:
- **10 Project Categories**: Web Dev, Mobile, Desktop, API, DevOps, etc.
- **60+ Technology Tags**: React, Vue, Angular, Java, Python, Docker, AWS, etc.
- **Database Views**: For analytics and reporting
- **Stored Procedures**: For complex queries

## 🔧 **Troubleshooting**

### **Common Issues:**

1. **"Invalid object name 'dbo.ProjectTags'"**
   - **Solution**: Run the database setup script to create `ProjectTagMap` table

2. **"Cannot find symbol class ProjectCategory"**
   - **Solution**: Ensure `ProjectCategory.java` has lowercase `.java` extension

3. **Foreign Key Constraint Errors**
   - **Solution**: Create tables in the correct order (Category → Tag → Project → ProjectTagMap)

4. **Compilation Errors**
   - **Solution**: Run `mvn clean compile` to rebuild the project

This comprehensive system provides everything needed for managing a professional portfolio with full CRUD operations, search capabilities, and advanced relationship management!
