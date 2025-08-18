# Project Module

## Mô tả
Module Project quản lý thông tin các dự án cá nhân, bao gồm tiêu đề, mô tả, hình ảnh, demo URL, source URL và danh mục dự án.

## Cấu trúc bảng dữ liệu

### Project Table
```sql
CREATE TABLE dbo.Project (
    ProjectId   UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Title       NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255) NULL,
    ImageUrl    NVARCHAR(512) NULL,
    DemoUrl     NVARCHAR(512) NULL,
    SourceUrl   NVARCHAR(512) NULL,
    CategoryId  UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProjectCategory(CategoryId),
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2 NULL,
    RowVer      ROWVERSION
);
```

### Các cột trong bảng:
- **ProjectId**: ID duy nhất của dự án (Primary Key)
- **Title**: Tiêu đề dự án (bắt buộc, tối đa 100 ký tự)
- **Description**: Mô tả dự án (tùy chọn, tối đa 255 ký tự)
- **ImageUrl**: URL hình ảnh preview của dự án (tùy chọn, tối đa 512 ký tự)
- **DemoUrl**: URL demo dự án (tùy chọn, tối đa 512 ký tự)
- **SourceUrl**: URL source code dự án (tùy chọn, tối đa 512 ký tự)
- **CategoryId**: ID danh mục dự án (Foreign Key, bắt buộc)
- **CreatedAt**: Thời gian tạo
- **UpdatedAt**: Thời gian cập nhật cuối
- **RowVer**: Version cho optimistic concurrency control

## API Endpoints

### 1. Lấy tất cả dự án
```
GET /api/projects/all
```
Trả về danh sách tất cả dự án được sắp xếp theo thời gian tạo mới nhất.

### 2. Lấy dự án theo ID
```
GET /api/projects/{id}
```
Trả về thông tin chi tiết của một dự án.

### 3. Lấy dự án theo danh mục
```
GET /api/projects/category/{categoryId}
```
Trả về danh sách dự án thuộc một danh mục cụ thể.

### 4. Tìm kiếm dự án
```
GET /api/projects/search?keyword={keyword}
```
Tìm kiếm dự án theo tiêu đề hoặc mô tả.

### 5. Tạo dự án mới
```
POST /api/projects/create
Content-Type: application/json

{
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "demoUrl": "string",
    "sourceUrl": "string",
    "categoryId": "uuid"
}
```

### 6. Cập nhật dự án
```
PUT /api/projects/{id}
Content-Type: application/json

{
    "title": "string",
    "description": "string",
    "imageUrl": "string",
    "demoUrl": "string",
    "sourceUrl": "string",
    "categoryId": "uuid"
}
```

### 7. Xóa dự án
```
DELETE /api/projects/{id}
```

### 8. Đếm số dự án theo danh mục
```
GET /api/projects/category/{categoryId}/count
```

## Validation Rules

### ProjectCreateRequest & ProjectUpdateRequest:
- **title**: Bắt buộc, tối đa 100 ký tự
- **description**: Tùy chọn, tối đa 255 ký tự
- **imageUrl**: Tùy chọn, tối đa 512 ký tự
- **demoUrl**: Tùy chọn, tối đa 512 ký tự
- **sourceUrl**: Tùy chọn, tối đa 512 ký tự
- **categoryId**: Bắt buộc, phải là UUID hợp lệ và tồn tại trong bảng ProjectCategory

## Business Rules

1. **Unique Title**: Tiêu đề dự án phải là duy nhất (case insensitive)
2. **Category Reference**: CategoryId phải tham chiếu đến một ProjectCategory hợp lệ
3. **Automatic Timestamps**: CreatedAt được tự động set khi tạo, UpdatedAt được tự động set khi cập nhật
4. **Optimistic Locking**: Sử dụng RowVersion để tránh conflicts khi cập nhật đồng thời

## Cấu trúc File

```
Project/
├── Project.java                    # Entity
├── ProjectDAO.java                 # Repository
├── ProjectService.java             # Service Layer
├── ProjectAPI.java                 # REST Controller
├── ProjectResponse.java            # Response DTO
├── ProjectCreateRequest.java       # Create Request DTO
└── ProjectUpdateRequest.java       # Update Request DTO
```

## Dependencies

Module này phụ thuộc vào:
- **ProjectCategory Module**: Để tham chiếu danh mục dự án
- **Spring Boot Starter Data JPA**: Cho database operations
- **Spring Boot Starter Web**: Cho REST APIs
- **Spring Boot Starter Validation**: Cho input validation
- **Lombok**: Cho code generation

## Examples

### Tạo dự án mới:
```json
{
    "title": "Portfolio Website",
    "description": "Trang web portfolio cá nhân được xây dựng với React và Spring Boot",
    "imageUrl": "https://example.com/portfolio-preview.jpg",
    "demoUrl": "https://portfolio.example.com",
    "sourceUrl": "https://github.com/username/portfolio",
    "categoryId": "123e4567-e89b-12d3-a456-426614174000"
}
```

### Response:
```json
{
    "projectId": "987fcdeb-51a2-43d7-8456-123456789abc",
    "title": "Portfolio Website",
    "description": "Trang web portfolio cá nhân được xây dựng với React và Spring Boot",
    "imageUrl": "https://example.com/portfolio-preview.jpg",
    "demoUrl": "https://portfolio.example.com",
    "sourceUrl": "https://github.com/username/portfolio",
    "category": {
        "categoryId": "123e4567-e89b-12d3-a456-426614174000",
        "name": "Web Development"
    },
    "createdAt": "2024-01-15T10:30:00",
    "updatedAt": null
}
```
