# ProjectTagMap Module

## Mô tả
Module ProjectTagMap quản lý mối quan hệ many-to-many giữa Project và ProjectTag với khả năng sắp xếp thứ tự (sort order). Module này cung cấp kiểm soát chi tiết hơn so với việc sử dụng @ManyToMany annotation đơn thuần của JPA.

## Cấu trúc bảng dữ liệu

### ProjectTagMap Table
```sql
CREATE TABLE dbo.ProjectTagMap (
    ProjectId  UNIQUEIDENTIFIER NOT NULL,
    TagId      UNIQUEIDENTIFIER NOT NULL,
    SortOrder  INT DEFAULT 1,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE
);
```

### Các cột trong bảng:
- **ProjectId**: ID dự án (Foreign Key, part of composite primary key)
- **TagId**: ID tag (Foreign Key, part of composite primary key)
- **SortOrder**: Thứ tự sắp xếp của tag trong project (mặc định = 1)

### Composite Primary Key:
- Sử dụng composite key (ProjectId, TagId) để đảm bảo mỗi cặp project-tag chỉ xuất hiện một lần
- Implement bằng `@IdClass(ProjectTagMapId.class)`

## API Endpoints

### Mapping Management

#### 1. Lấy tất cả tags của một project
```
GET /api/project-tag-maps/project/{projectId}
```
Trả về danh sách tags của project được sắp xếp theo SortOrder.

#### 2. Lấy tất cả projects sử dụng một tag
```
GET /api/project-tag-maps/tag/{tagId}
```
Trả về danh sách projects sử dụng tag cụ thể.

#### 3. Lấy mapping cụ thể
```
GET /api/project-tag-maps/project/{projectId}/tag/{tagId}
```
Trả về thông tin mapping giữa project và tag cụ thể.

#### 4. Tạo mapping mới
```
POST /api/project-tag-maps/create
Content-Type: application/json

{
    "projectId": "uuid",
    "tagId": "uuid",
    "sortOrder": 1
}
```

#### 5. Cập nhật mapping (sortOrder)
```
PUT /api/project-tag-maps/project/{projectId}/tag/{tagId}
Content-Type: application/json

{
    "sortOrder": 2
}
```

#### 6. Xóa mapping cụ thể
```
DELETE /api/project-tag-maps/project/{projectId}/tag/{tagId}
```

#### 7. Xóa tất cả mappings của project
```
DELETE /api/project-tag-maps/project/{projectId}/all
```

#### 8. Cập nhật batch mappings cho project
```
PUT /api/project-tag-maps/project/batch
Content-Type: application/json

{
    "projectId": "uuid",
    "tagMappings": [
        {
            "tagId": "uuid1",
            "sortOrder": 1
        },
        {
            "tagId": "uuid2",
            "sortOrder": 2
        }
    ]
}
```

### Statistics & Utilities

#### 9. Đếm số tag của project
```
GET /api/project-tag-maps/project/{projectId}/count
```

#### 10. Đếm số project sử dụng tag
```
GET /api/project-tag-maps/tag/{tagId}/count
```

#### 11. Kiểm tra mapping tồn tại
```
GET /api/project-tag-maps/project/{projectId}/tag/{tagId}/exists
```

#### 12. Thống kê tags phổ biến nhất
```
GET /api/project-tag-maps/statistics/popular-tags
```

## Validation Rules

### ProjectTagMapCreateRequest:
- **projectId**: Bắt buộc, phải là UUID hợp lệ và tồn tại
- **tagId**: Bắt buộc, phải là UUID hợp lệ và tồn tại
- **sortOrder**: Tùy chọn, >= 1 (mặc định = 1)

### ProjectTagMapUpdateRequest:
- **sortOrder**: Tùy chọn, >= 1

### ProjectTagMapBatchRequest:
- **projectId**: Bắt buộc, phải là UUID hợp lệ và tồn tại
- **tagMappings**: Bắt buộc, danh sách không rỗng
  - **tagId**: Bắt buộc cho mỗi mapping
  - **sortOrder**: Tùy chọn (mặc định = 1)

## Business Rules

1. **Unique Mapping**: Mỗi cặp (projectId, tagId) chỉ có thể tồn tại một lần
2. **Cascade Delete**: Khi xóa Project hoặc ProjectTag, các mappings liên quan sẽ tự động bị xóa
3. **Auto Sort Order**: Nếu không chỉ định sortOrder khi tạo mapping, hệ thống tự động gán = max + 1
4. **Batch Update**: Khi cập nhật batch, tất cả mappings cũ sẽ bị xóa và thay thế bằng mappings mới

## Use Cases

### 1. Hiển thị tags theo thứ tự ưu tiên
```java
// Lấy tags của project được sắp xếp theo thứ tự quan trọng
List<ProjectTagMap> projectTags = projectTagMapService.getProjectTagsByProjectId(projectId);
```

### 2. Quản lý thứ tự tags trong UI
```json
// Frontend có thể drag-and-drop để thay đổi thứ tự tags
PUT /api/project-tag-maps/project/batch
{
    "projectId": "...",
    "tagMappings": [
        {"tagId": "react-id", "sortOrder": 1},      // Quan trọng nhất
        {"tagId": "typescript-id", "sortOrder": 2},  // Thứ hai
        {"tagId": "tailwind-id", "sortOrder": 3}     // Thứ ba
    ]
}
```

### 3. Tìm projects liên quan qua tags
```java
// Tìm tất cả projects sử dụng React
List<ProjectTagMap> reactProjects = projectTagMapService.getProjectsByTagId(reactTagId);
```

### 4. Phân tích thống kê
```java
// Tìm tags được sử dụng nhiều nhất
List<Object[]> stats = projectTagMapService.getMostUsedTagsStatistics();
```

## Cấu trúc File

```
ProjectTagMap/
├── ProjectTagMapId.java                    # Composite Key Class
├── ProjectTagMap.java                      # Entity
├── ProjectTagMapDAO.java                   # Repository
├── ProjectTagMapService.java               # Service Layer
├── ProjectTagMapAPI.java                   # REST Controller
├── ProjectTagMapResponse.java              # Response DTO
├── ProjectTagMapCreateRequest.java         # Create Request DTO
├── ProjectTagMapUpdateRequest.java         # Update Request DTO
└── ProjectTagMapBatchRequest.java          # Batch Update Request DTO
```

## Ưu điểm so với @ManyToMany

### Traditional @ManyToMany:
```java
@ManyToMany
@JoinTable(name = "project_tags")
private Set<ProjectTag> tags;
```

### ProjectTagMap Approach:
✅ **Kiểm soát sortOrder**: Có thể sắp xếp tags theo thứ tự ưu tiên  
✅ **Audit fields**: Có thể thêm createdAt, updatedAt nếu cần  
✅ **Business logic**: Có thể thêm validation phức tạp  
✅ **Performance**: Tối ưu hóa queries tốt hơn  
✅ **Flexibility**: Dễ mở rộng thêm fields khác  

## Advanced Queries

### Tìm projects có cùng technology stack:
```sql
-- Tìm projects sử dụng cả React và TypeScript
SELECT p.* FROM Project p
WHERE p.ProjectId IN (
    SELECT ptm1.ProjectId FROM ProjectTagMap ptm1
    JOIN ProjectTagMap ptm2 ON ptm1.ProjectId = ptm2.ProjectId
    WHERE ptm1.TagId = 'react-id' AND ptm2.TagId = 'typescript-id'
);
```

### Top technologies theo project count:
```sql
-- Top 10 technologies được sử dụng nhiều nhất
SELECT pt.Name, COUNT(ptm.ProjectId) as ProjectCount
FROM ProjectTag pt
JOIN ProjectTagMap ptm ON pt.TagId = ptm.TagId
GROUP BY pt.TagId, pt.Name
ORDER BY ProjectCount DESC
LIMIT 10;
```

## Examples

### Tạo mapping mới:
```json
POST /api/project-tag-maps/create
{
    "projectId": "987fcdeb-51a2-43d7-8456-123456789abc",
    "tagId": "111e1111-e11b-11d1-a111-111111111111",
    "sortOrder": 1
}
```

### Response:
```json
{
    "projectId": "987fcdeb-51a2-43d7-8456-123456789abc",
    "tagId": "111e1111-e11b-11d1-a111-111111111111",
    "sortOrder": 1,
    "project": null,
    "tag": null
}
```

### Batch update:
```json
PUT /api/project-tag-maps/project/batch
{
    "projectId": "987fcdeb-51a2-43d7-8456-123456789abc",
    "tagMappings": [
        {"tagId": "react-tag-id", "sortOrder": 1},
        {"tagId": "typescript-tag-id", "sortOrder": 2},
        {"tagId": "tailwind-tag-id", "sortOrder": 3},
        {"tagId": "docker-tag-id", "sortOrder": 4}
    ]
}
```

## Dependencies

Module này phụ thuộc vào:
- **Project Module**: Để reference projects
- **ProjectTag Module**: Để reference tags
- **Spring Boot Starter Data JPA**: Cho database operations
- **Spring Boot Starter Web**: Cho REST APIs
- **Spring Boot Starter Validation**: Cho input validation
- **Lombok**: Cho code generation
