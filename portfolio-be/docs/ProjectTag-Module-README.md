# ProjectTag Module

## Mô tả
Module ProjectTag quản lý danh sách các tag công nghệ như React, TailwindCSS, Docker, v.v. Module này có mối quan hệ many-to-many với Project, nghĩa là một dự án có thể có nhiều tag và một tag có thể được sử dụng trong nhiều dự án.

## Cấu trúc bảng dữ liệu

### ProjectTag Table
```sql
CREATE TABLE dbo.ProjectTag (
    TagId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name  NVARCHAR(50) NOT NULL UNIQUE
);
```

### ProjectTags Junction Table
```sql
CREATE TABLE dbo.ProjectTags (
    ProjectId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    TagId     UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE,
    PRIMARY KEY (ProjectId, TagId)
);
```

### Các cột trong bảng ProjectTag:
- **TagId**: ID duy nhất của tag (Primary Key)
- **Name**: Tên tag công nghệ (bắt buộc, unique, tối đa 50 ký tự)

### Các cột trong bảng ProjectTags:
- **ProjectId**: ID dự án (Foreign Key)
- **TagId**: ID tag (Foreign Key)

## API Endpoints

### ProjectTag Management

#### 1. Lấy tất cả tags
```
GET /api/project-tags/all
```
Trả về danh sách tất cả tags được sắp xếp theo tên.

#### 2. Lấy tag theo ID
```
GET /api/project-tags/{id}
```
Trả về thông tin chi tiết của một tag.

#### 3. Lấy tag theo tên
```
GET /api/project-tags/by-name/{name}
```
Trả về thông tin tag theo tên.

#### 4. Tìm kiếm tags
```
GET /api/project-tags/search?keyword={keyword}
```
Tìm kiếm tags theo tên (partial match).

#### 5. Lấy tags phổ biến nhất
```
GET /api/project-tags/popular
```
Trả về danh sách tags được sử dụng nhiều nhất trong các dự án.

#### 6. Tạo tag mới
```
POST /api/project-tags/create
Content-Type: application/json

{
    "name": "string"
}
```

#### 7. Cập nhật tag
```
PUT /api/project-tags/{id}
Content-Type: application/json

{
    "name": "string"
}
```

#### 8. Xóa tag
```
DELETE /api/project-tags/{id}
```

### Project-Tag Relationship

#### 9. Lấy projects theo tag ID
```
GET /api/projects/tag/{tagId}
```

#### 10. Lấy projects theo tên tag
```
GET /api/projects/tag/name/{tagName}
```

## Usage trong Project APIs

### Tạo Project với tags:
```json
{
    "title": "Portfolio Website",
    "description": "Trang web portfolio cá nhân",
    "imageUrl": "https://example.com/portfolio-preview.jpg",
    "demoUrl": "https://portfolio.example.com",
    "sourceUrl": "https://github.com/username/portfolio",
    "categoryId": "123e4567-e89b-12d3-a456-426614174000",
    "tagNames": ["React", "TailwindCSS", "Node.js", "Express.js"]
}
```

### Response với tags:
```json
{
    "projectId": "987fcdeb-51a2-43d7-8456-123456789abc",
    "title": "Portfolio Website",
    "description": "Trang web portfolio cá nhân",
    "imageUrl": "https://example.com/portfolio-preview.jpg",
    "demoUrl": "https://portfolio.example.com",
    "sourceUrl": "https://github.com/username/portfolio",
    "category": {
        "categoryId": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Web Development"
    },
    "tags": [
        {
            "tagId": "111e1111-e11b-11d1-a111-111111111111",
            "name": "React"
        },
        {
            "tagId": "222e2222-e22b-22d2-a222-222222222222",
            "name": "TailwindCSS"
        },
        {
            "tagId": "333e3333-e33b-33d3-a333-333333333333",
            "name": "Node.js"
        },
        {
            "tagId": "444e4444-e44b-44d4-a444-444444444444",
            "name": "Express.js"
        }
    ],
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": null
}
```

## Validation Rules

### ProjectTagCreateRequest & ProjectTagUpdateRequest:
- **name**: Bắt buộc, tối đa 50 ký tự, phải unique

## Business Rules

1. **Unique Name**: Tên tag phải là duy nhất (case insensitive)
2. **Auto-create Tags**: Khi tạo/cập nhật project với tagNames, hệ thống sẽ tự động tạo tags mới nếu chưa tồn tại
3. **Cascade Delete**: Khi xóa Project hoặc ProjectTag, các record trong bảng junction sẽ tự động bị xóa
4. **Case Insensitive Search**: Tìm kiếm tags không phân biệt hoa thường

## Relationship với Project

### Many-to-Many Relationship:
- Một Project có thể có nhiều ProjectTag
- Một ProjectTag có thể được sử dụng trong nhiều Project
- Relationship được quản lý thông qua bảng junction `ProjectTags`

### JPA Mapping trong Project Entity:
```java
@ManyToMany(fetch = FetchType.LAZY)
@JoinTable(
    name = "ProjectTags",
    schema = "dbo",
    joinColumns = @JoinColumn(name = "ProjectId"),
    inverseJoinColumns = @JoinColumn(name = "TagId")
)
private Set<ProjectTag> tags = new HashSet<>();
```

## Cấu trúc File

```
ProjectTag/
├── ProjectTag.java                    # Entity
├── ProjectTagDAO.java                 # Repository
├── ProjectTagService.java             # Service Layer
├── ProjectTagAPI.java                 # REST Controller
├── ProjectTagResponse.java            # Response DTO
├── ProjectTagCreateRequest.java       # Create Request DTO
└── ProjectTagUpdateRequest.java       # Update Request DTO
```

## Pre-defined Tags

Hệ thống đã được thiết lập sẵn với các tags phổ biến:

### Frontend Technologies:
- React, Vue.js, Angular
- JavaScript, TypeScript
- TailwindCSS, Bootstrap, Material-UI, Ant Design
- Sass/SCSS

### Backend Technologies:
- Node.js, Express.js
- Spring Boot, Java
- C#, .NET, ASP.NET Core
- Python

### Databases:
- MongoDB, MySQL, PostgreSQL, SQL Server, Redis

### DevOps & Tools:
- Docker, Kubernetes
- AWS, Azure, Firebase
- Git, GitHub, GitLab
- CI/CD

### Development Concepts:
- REST API, GraphQL, WebSocket
- Microservices, Clean Architecture
- SOLID Principles, Design Patterns
- Progressive Web App, Responsive Design
- SEO, Performance Optimization

## Advanced Queries

### Tìm Projects có chứa bất kỳ tag nào:
```java
List<Project> projects = projectService.getProjectsByAnyTags(Arrays.asList(reactTagId, vueTagId));
```

### Tìm Projects có chứa tất cả tags:
```java
List<Project> projects = projectService.getProjectsByAllTags(Arrays.asList(reactTagId, tailwindTagId));
```

### Lấy tags phổ biến nhất:
```java
List<ProjectTag> popularTags = projectTagService.getMostUsedTags();
```

## Dependencies

Module này phụ thuộc vào:
- **Project Module**: Để tạo relationship
- **Spring Boot Starter Data JPA**: Cho database operations
- **Spring Boot Starter Web**: Cho REST APIs
- **Spring Boot Starter Validation**: Cho input validation
- **Lombok**: Cho code generation
