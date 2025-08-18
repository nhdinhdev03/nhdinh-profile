-- ============================================================================
-- Portfolio Database - Quick Setup Script
-- Run this script to create all tables with basic structure only
-- ============================================================================

-- Drop existing tables if they exist (in correct order due to foreign keys)
IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProjectTagMap]') AND type in (N'U'))
    DROP TABLE [dbo].[ProjectTagMap];

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[Project]') AND type in (N'U'))
    DROP TABLE [dbo].[Project];

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProjectTag]') AND type in (N'U'))
    DROP TABLE [dbo].[ProjectTag];

IF EXISTS (SELECT * FROM sys.objects WHERE object_id = OBJECT_ID(N'[dbo].[ProjectCategory]') AND type in (N'U'))
    DROP TABLE [dbo].[ProjectCategory];

-- Create ProjectCategory table
CREATE TABLE dbo.ProjectCategory (
    CategoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name       NVARCHAR(50) NOT NULL UNIQUE
);

-- Create ProjectTag table
CREATE TABLE dbo.ProjectTag (
    TagId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name  NVARCHAR(50) NOT NULL UNIQUE
);

-- Create Project table
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

-- Create ProjectTagMap table (Junction table for many-to-many relationship)
CREATE TABLE dbo.ProjectTagMap (
    ProjectId  UNIQUEIDENTIFIER NOT NULL,
    TagId      UNIQUEIDENTIFIER NOT NULL,
    SortOrder  INT DEFAULT 1,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE
);

-- Create essential indexes
CREATE INDEX IX_Project_CategoryId ON dbo.Project(CategoryId);
CREATE INDEX IX_Project_CreatedAt ON dbo.Project(CreatedAt DESC);
CREATE INDEX IX_ProjectTagMap_ProjectId ON dbo.ProjectTagMap(ProjectId);
CREATE INDEX IX_ProjectTagMap_TagId ON dbo.ProjectTagMap(TagId);

-- Insert basic categories
INSERT INTO dbo.ProjectCategory (Name) VALUES 
('Web Development'),
('Mobile Application'),
('Desktop Application'),
('API Development'),
('DevOps & Infrastructure');

-- Insert basic tags
INSERT INTO dbo.ProjectTag (Name) VALUES 
('React'),
('Vue.js'),
('Angular'),
('JavaScript'),
('TypeScript'),
('Node.js'),
('Express.js'),
('Spring Boot'),
('Java'),
('TailwindCSS'),
('Bootstrap'),
('MongoDB'),
('MySQL'),
('PostgreSQL'),
('Docker'),
('AWS'),
('Azure'),
('Git'),
('GitHub');

PRINT 'Portfolio database setup completed successfully!';
PRINT 'Tables created: ProjectCategory, ProjectTag, Project, ProjectTagMap';
PRINT 'Basic sample data inserted.';

-- Display created tables
SELECT 'ProjectCategory' AS TableName, COUNT(*) AS RecordCount FROM dbo.ProjectCategory
UNION ALL
SELECT 'ProjectTag' AS TableName, COUNT(*) AS RecordCount FROM dbo.ProjectTag
UNION ALL
SELECT 'Project' AS TableName, COUNT(*) AS RecordCount FROM dbo.Project
UNION ALL
SELECT 'ProjectTagMap' AS TableName, COUNT(*) AS RecordCount FROM dbo.ProjectTagMap;
