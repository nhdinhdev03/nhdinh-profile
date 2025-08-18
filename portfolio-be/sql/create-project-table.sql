-- Tạo bảng Project để lưu thông tin từng dự án cá nhân
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

-- Tạo index cho việc tìm kiếm
CREATE INDEX IX_Project_CategoryId ON dbo.Project(CategoryId);
CREATE INDEX IX_Project_Title ON dbo.Project(Title);
CREATE INDEX IX_Project_CreatedAt ON dbo.Project(CreatedAt DESC);

-- Thêm comment cho bảng và các cột
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng lưu thông tin từng dự án cá nhân',
    'SCHEMA', 'dbo', 'TABLE', 'Project';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID dự án (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'ProjectId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Tiêu đề dự án',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'Title';

EXEC sp_addextendedproperty 
    'MS_Description', 'Mô tả dự án',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'Description';

EXEC sp_addextendedproperty 
    'MS_Description', 'URL hình ảnh preview dự án',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'ImageUrl';

EXEC sp_addextendedproperty 
    'MS_Description', 'URL demo dự án',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'DemoUrl';

EXEC sp_addextendedproperty 
    'MS_Description', 'URL source code dự án',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'SourceUrl';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID danh mục dự án (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'CategoryId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Thời gian tạo',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'CreatedAt';

EXEC sp_addextendedproperty 
    'MS_Description', 'Thời gian cập nhật cuối',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'UpdatedAt';

EXEC sp_addextendedproperty 
    'MS_Description', 'Row version cho optimistic concurrency',
    'SCHEMA', 'dbo', 'TABLE', 'Project', 'COLUMN', 'RowVer';
