-- Tạo bảng ProjectTag để lưu danh sách tag công nghệ
CREATE TABLE dbo.ProjectTag (
    TagId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name  NVARCHAR(50) NOT NULL UNIQUE
);

-- Tạo index cho việc tìm kiếm
CREATE INDEX IX_ProjectTag_Name ON dbo.ProjectTag(Name);

-- Thêm comment cho bảng và các cột
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng lưu danh sách tag công nghệ: React, TailwindCSS, Docker...',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID tag (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag', 'COLUMN', 'TagId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Tên tag công nghệ (unique)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag', 'COLUMN', 'Name';

-- Tạo bảng junction cho many-to-many relationship giữa Project và ProjectTag
CREATE TABLE dbo.ProjectTags (
    ProjectId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    TagId     UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE,
    PRIMARY KEY (ProjectId, TagId)
);

-- Tạo index cho việc tìm kiếm
CREATE INDEX IX_ProjectTags_ProjectId ON dbo.ProjectTags(ProjectId);
CREATE INDEX IX_ProjectTags_TagId ON dbo.ProjectTags(TagId);

-- Thêm comment cho bảng junction
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng junction cho many-to-many relationship giữa Project và ProjectTag',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTags';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID dự án (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTags', 'COLUMN', 'ProjectId';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID tag (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTags', 'COLUMN', 'TagId';

-- Insert một số tag phổ biến
INSERT INTO dbo.ProjectTag (Name) VALUES 
('React'),
('Vue.js'),
('Angular'),
('Node.js'),
('Express.js'),
('Spring Boot'),
('Java'),
('JavaScript'),
('TypeScript'),
('Python'),
('C#'),
('.NET'),
('ASP.NET Core'),
('MongoDB'),
('MySQL'),
('PostgreSQL'),
('SQL Server'),
('Redis'),
('Docker'),
('Kubernetes'),
('AWS'),
('Azure'),
('Firebase'),
('TailwindCSS'),
('Bootstrap'),
('Material-UI'),
('Ant Design'),
('Sass/SCSS'),
('Webpack'),
('Vite'),
('Jest'),
('Cypress'),
('Git'),
('GitHub'),
('GitLab'),
('Figma'),
('Adobe XD'),
('Postman'),
('Swagger'),
('REST API'),
('GraphQL'),
('WebSocket'),
('Progressive Web App'),
('Responsive Design'),
('Mobile First'),
('SEO'),
('Performance Optimization'),
('CI/CD'),
('Microservices'),
('Clean Architecture'),
('SOLID Principles'),
('Design Patterns');
