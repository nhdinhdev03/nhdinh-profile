-- ============================================================================
-- Portfolio Database Schema - Complete Implementation
-- Created: August 19, 2025
-- Description: Complete database schema for portfolio management system
-- ============================================================================

-- ============================================================================
-- 1. PROJECT CATEGORY TABLE
-- ============================================================================
-- Danh mục dự án: Web Development, Mobile App, Desktop App, etc.
CREATE TABLE dbo.ProjectCategory (
    CategoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name       NVARCHAR(50) NOT NULL UNIQUE
);

-- Indexes for ProjectCategory
CREATE INDEX IX_ProjectCategory_Name ON dbo.ProjectCategory(Name);

-- Comments for ProjectCategory
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng danh mục dự án',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectCategory';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID danh mục (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectCategory', 'COLUMN', 'CategoryId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Tên danh mục dự án',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectCategory', 'COLUMN', 'Name';

-- ============================================================================
-- 2. PROJECT TAG TABLE
-- ============================================================================
-- Danh sách tag công nghệ: React, TailwindCSS, Docker...
CREATE TABLE dbo.ProjectTag (
    TagId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name  NVARCHAR(50) NOT NULL UNIQUE
);

-- Indexes for ProjectTag
CREATE INDEX IX_ProjectTag_Name ON dbo.ProjectTag(Name);

-- Comments for ProjectTag
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng tag công nghệ',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID tag (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag', 'COLUMN', 'TagId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Tên tag công nghệ',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTag', 'COLUMN', 'Name';

-- ============================================================================
-- 3. PROJECT TABLE
-- ============================================================================
-- Thông tin từng dự án cá nhân
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

-- Indexes for Project
CREATE INDEX IX_Project_CategoryId ON dbo.Project(CategoryId);
CREATE INDEX IX_Project_Title ON dbo.Project(Title);
CREATE INDEX IX_Project_CreatedAt ON dbo.Project(CreatedAt DESC);

-- Comments for Project
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

-- ============================================================================
-- 4. PROJECT TAG MAP TABLE (Junction Table)
-- ============================================================================
-- Liên kết nhiều tag cho một project (nhiều-nhiều)
CREATE TABLE dbo.ProjectTagMap (
    ProjectId  UNIQUEIDENTIFIER NOT NULL,
    TagId      UNIQUEIDENTIFIER NOT NULL,
    SortOrder  INT DEFAULT 1,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE
);

-- Indexes for ProjectTagMap
CREATE INDEX IX_ProjectTagMap_ProjectId ON dbo.ProjectTagMap(ProjectId);
CREATE INDEX IX_ProjectTagMap_TagId ON dbo.ProjectTagMap(TagId);
CREATE INDEX IX_ProjectTagMap_SortOrder ON dbo.ProjectTagMap(ProjectId, SortOrder);

-- Constraints for ProjectTagMap
ALTER TABLE dbo.ProjectTagMap ADD CONSTRAINT CK_ProjectTagMap_SortOrder CHECK (SortOrder >= 1);

-- Comments for ProjectTagMap
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng liên kết nhiều tag cho một project (many-to-many relationship)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTagMap';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID dự án (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTagMap', 'COLUMN', 'ProjectId';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID tag (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTagMap', 'COLUMN', 'TagId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Thứ tự sắp xếp của tag trong project (mặc định = 1)',
    'SCHEMA', 'dbo', 'TABLE', 'ProjectTagMap', 'COLUMN', 'SortOrder';

-- ============================================================================
-- 5. SAMPLE DATA INSERTION
-- ============================================================================

-- Insert Project Categories
INSERT INTO dbo.ProjectCategory (Name) VALUES 
('Web Development'),
('Mobile Application'),
('Desktop Application'),
('API Development'),
('DevOps & Infrastructure'),
('Data Science'),
('Game Development'),
('E-commerce'),
('Portfolio & Personal'),
('Educational');

-- Insert Project Tags
INSERT INTO dbo.ProjectTag (Name) VALUES 
-- Frontend Technologies
('React'),
('Vue.js'),
('Angular'),
('JavaScript'),
('TypeScript'),
('HTML5'),
('CSS3'),
('SASS/SCSS'),
('TailwindCSS'),
('Bootstrap'),
('Material-UI'),
('Ant Design'),

-- Backend Technologies
('Node.js'),
('Express.js'),
('Spring Boot'),
('Java'),
('C#'),
('.NET'),
('ASP.NET Core'),
('Python'),
('Django'),
('Flask'),
('PHP'),
('Laravel'),

-- Mobile Development
('React Native'),
('Flutter'),
('Android'),
('iOS'),
('Swift'),
('Kotlin'),

-- Databases
('MongoDB'),
('MySQL'),
('PostgreSQL'),
('SQL Server'),
('Redis'),
('SQLite'),
('Firebase'),

-- DevOps & Tools
('Docker'),
('Kubernetes'),
('AWS'),
('Azure'),
('Google Cloud'),
('Git'),
('GitHub'),
('GitLab'),
('CI/CD'),
('Jenkins'),

-- Development Concepts
('REST API'),
('GraphQL'),
('WebSocket'),
('Microservices'),
('Clean Architecture'),
('SOLID Principles'),
('Design Patterns'),
('Progressive Web App'),
('Responsive Design'),
('SEO'),
('Performance Optimization');

-- ============================================================================
-- 6. USEFUL VIEWS
-- ============================================================================
GO

-- View: Complete Project Information with Category and Tags
CREATE VIEW vw_ProjectsWithDetails AS
SELECT 
    p.ProjectId,
    p.Title,
    p.Description,
    p.ImageUrl,
    p.DemoUrl,
    p.SourceUrl,
    p.CreatedAt,
    p.UpdatedAt,
    pc.Name AS CategoryName,
    pc.CategoryId,
    STRING_AGG(pt.Name, ', ') WITHIN GROUP (ORDER BY ptm.SortOrder) AS Tags,
    COUNT(ptm.TagId) AS TagCount
FROM dbo.Project p
INNER JOIN dbo.ProjectCategory pc ON p.CategoryId = pc.CategoryId
LEFT JOIN dbo.ProjectTagMap ptm ON p.ProjectId = ptm.ProjectId
LEFT JOIN dbo.ProjectTag pt ON ptm.TagId = pt.TagId
GROUP BY 
    p.ProjectId, p.Title, p.Description, p.ImageUrl, p.DemoUrl, p.SourceUrl,
    p.CreatedAt, p.UpdatedAt, pc.Name, pc.CategoryId;
GO

-- View: Tag Usage Statistics
CREATE VIEW vw_TagStatistics AS
SELECT 
    pt.TagId,
    pt.Name AS TagName,
    COUNT(ptm.ProjectId) AS UsageCount,
    COUNT(ptm.ProjectId) * 100.0 / (SELECT COUNT(*) FROM dbo.Project) AS UsagePercentage
FROM dbo.ProjectTag pt
LEFT JOIN dbo.ProjectTagMap ptm ON pt.TagId = ptm.TagId
GROUP BY pt.TagId, pt.Name;
GO

-- View: Category Statistics
CREATE VIEW vw_CategoryStatistics AS
SELECT 
    pc.CategoryId,
    pc.Name AS CategoryName,
    COUNT(p.ProjectId) AS ProjectCount,
    COUNT(p.ProjectId) * 100.0 / (SELECT COUNT(*) FROM dbo.Project) AS ProjectPercentage
FROM dbo.ProjectCategory pc
LEFT JOIN dbo.Project p ON pc.CategoryId = p.CategoryId
GROUP BY pc.CategoryId, pc.Name;
GO

-- ============================================================================
-- 7. STORED PROCEDURES
-- ============================================================================

-- Procedure: Get Projects by Technology Stack
CREATE PROCEDURE sp_GetProjectsByTechnologyStack
    @TechnologyNames NVARCHAR(MAX) -- Comma-separated list of technology names
AS
BEGIN
    SET NOCOUNT ON;
    
    DECLARE @TagTable TABLE (TagName NVARCHAR(50));
    
    -- Parse comma-separated technology names
    INSERT INTO @TagTable (TagName)
    SELECT TRIM(value) FROM STRING_SPLIT(@TechnologyNames, ',');
    
    -- Find projects that use ALL specified technologies
    SELECT DISTINCT
        p.ProjectId,
        p.Title,
        p.Description,
        p.ImageUrl,
        p.DemoUrl,
        p.SourceUrl,
        p.CreatedAt,
        pc.Name AS CategoryName
    FROM dbo.Project p
    INNER JOIN dbo.ProjectCategory pc ON p.CategoryId = pc.CategoryId
    INNER JOIN dbo.ProjectTagMap ptm ON p.ProjectId = ptm.ProjectId
    INNER JOIN dbo.ProjectTag pt ON ptm.TagId = pt.TagId
    WHERE pt.Name IN (SELECT TagName FROM @TagTable)
    GROUP BY 
        p.ProjectId, p.Title, p.Description, p.ImageUrl, p.DemoUrl, p.SourceUrl,
        p.CreatedAt, pc.Name
    HAVING COUNT(DISTINCT pt.Name) = (SELECT COUNT(*) FROM @TagTable);
END;
GO

-- ============================================================================
-- 8. SAMPLE PROJECT DATA (OPTIONAL)
-- ============================================================================

/*
-- Insert sample projects (uncomment to use)
DECLARE @WebDevCategoryId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.ProjectCategory WHERE Name = 'Web Development');
DECLARE @MobileCategoryId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.ProjectCategory WHERE Name = 'Mobile Application');

-- Sample Project 1: Portfolio Website
DECLARE @Project1Id UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.Project (ProjectId, Title, Description, ImageUrl, DemoUrl, SourceUrl, CategoryId)
VALUES (
    @Project1Id,
    'Personal Portfolio Website',
    'A responsive portfolio website built with React and TailwindCSS',
    'https://example.com/portfolio-preview.jpg',
    'https://portfolio.example.com',
    'https://github.com/username/portfolio',
    @WebDevCategoryId
);

-- Add tags for Project 1
INSERT INTO dbo.ProjectTagMap (ProjectId, TagId, SortOrder)
SELECT @Project1Id, TagId, ROW_NUMBER() OVER (ORDER BY Name)
FROM dbo.ProjectTag 
WHERE Name IN ('React', 'TailwindCSS', 'JavaScript', 'Responsive Design');

-- Sample Project 2: E-commerce App
DECLARE @Project2Id UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.Project (ProjectId, Title, Description, ImageUrl, DemoUrl, SourceUrl, CategoryId)
VALUES (
    @Project2Id,
    'E-commerce Mobile App',
    'Full-stack e-commerce mobile application with React Native',
    'https://example.com/ecommerce-preview.jpg',
    'https://play.google.com/store/apps/details?id=com.example.ecommerce',
    'https://github.com/username/ecommerce-app',
    @MobileCategoryId
);

-- Add tags for Project 2
INSERT INTO dbo.ProjectTagMap (ProjectId, TagId, SortOrder)
SELECT @Project2Id, TagId, ROW_NUMBER() OVER (ORDER BY Name)
FROM dbo.ProjectTag 
WHERE Name IN ('React Native', 'Node.js', 'MongoDB', 'Express.js');
*/

PRINT 'Portfolio database schema created successfully!';
PRINT 'Tables created: ProjectCategory, ProjectTag, Project, ProjectTagMap';
PRINT 'Views created: vw_ProjectsWithDetails, vw_TagStatistics, vw_CategoryStatistics';
PRINT 'Procedures created: sp_GetProjectsByTechnologyStack';
PRINT 'Sample categories and tags inserted successfully!';
