-- =============================================
-- Skills Module SQL Script
-- Creates tables for managing skills and skill categories
-- =============================================

USE PortfolioDB;
GO

-- Create SkillCategory table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'SkillCategory' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.SkillCategory (
        CategoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
        Name       NVARCHAR(100) NOT NULL,
        IconUrl    NVARCHAR(255),
        SortOrder  INT DEFAULT 1,
        IsActive   BIT DEFAULT 1,
        CreatedAt  DATETIME2 DEFAULT SYSUTCDATETIME(),
        RowVer     ROWVERSION
    );
    
    PRINT 'SkillCategory table created successfully';
END
ELSE
BEGIN
    PRINT 'SkillCategory table already exists';
END

-- Create Skill table
IF NOT EXISTS (SELECT * FROM sys.tables WHERE name = 'Skill' AND schema_id = SCHEMA_ID('dbo'))
BEGIN
    CREATE TABLE dbo.Skill (
        SkillId    UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
        CategoryId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.SkillCategory(CategoryId) ON DELETE CASCADE,
        Name       NVARCHAR(100) NOT NULL,
        SortOrder  INT DEFAULT 1,
        IsActive   BIT DEFAULT 1,
        CreatedAt  DATETIME2 DEFAULT SYSUTCDATETIME(),
        RowVer     ROWVERSION
    );
    
    PRINT 'Skill table created successfully';
END
ELSE
BEGIN
    PRINT 'Skill table already exists';
END

-- Create indexes for better performance
IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_SkillCategory_SortOrder_IsActive')
BEGIN
    CREATE INDEX IX_SkillCategory_SortOrder_IsActive ON dbo.SkillCategory (SortOrder, IsActive);
    PRINT 'Index IX_SkillCategory_SortOrder_IsActive created';
END

IF NOT EXISTS (SELECT * FROM sys.indexes WHERE name = 'IX_Skill_CategoryId_SortOrder_IsActive')
BEGIN
    CREATE INDEX IX_Skill_CategoryId_SortOrder_IsActive ON dbo.Skill (CategoryId, SortOrder, IsActive);
    PRINT 'Index IX_Skill_CategoryId_SortOrder_IsActive created';
END

-- Insert sample data
IF NOT EXISTS (SELECT * FROM dbo.SkillCategory)
BEGIN
    INSERT INTO dbo.SkillCategory (Name, IconUrl, SortOrder, IsActive) VALUES
    ('Programming Languages', 'fa-code', 1, 1),
    ('Web Technologies', 'fa-globe', 2, 1),
    ('Databases', 'fa-database', 3, 1),
    ('Tools & Frameworks', 'fa-tools', 4, 1),
    ('Cloud & DevOps', 'fa-cloud', 5, 1);
    
    PRINT 'Sample skill categories inserted';
END

-- Get CategoryIds for sample skills
DECLARE @ProgrammingId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.SkillCategory WHERE Name = 'Programming Languages');
DECLARE @WebTechId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.SkillCategory WHERE Name = 'Web Technologies');
DECLARE @DatabaseId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.SkillCategory WHERE Name = 'Databases');
DECLARE @ToolsId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.SkillCategory WHERE Name = 'Tools & Frameworks');
DECLARE @CloudId UNIQUEIDENTIFIER = (SELECT CategoryId FROM dbo.SkillCategory WHERE Name = 'Cloud & DevOps');

IF NOT EXISTS (SELECT * FROM dbo.Skill)
BEGIN
    INSERT INTO dbo.Skill (CategoryId, Name, SortOrder, IsActive) VALUES
    -- Programming Languages
    (@ProgrammingId, 'Java', 1, 1),
    (@ProgrammingId, 'JavaScript', 2, 1),
    (@ProgrammingId, 'Python', 3, 1),
    (@ProgrammingId, 'C#', 4, 1),
    (@ProgrammingId, 'TypeScript', 5, 1),
    
    -- Web Technologies
    (@WebTechId, 'React', 1, 1),
    (@WebTechId, 'Angular', 2, 1),
    (@WebTechId, 'Vue.js', 3, 1),
    (@WebTechId, 'HTML5', 4, 1),
    (@WebTechId, 'CSS3', 5, 1),
    (@WebTechId, 'Bootstrap', 6, 1),
    (@WebTechId, 'Tailwind CSS', 7, 1),
    
    -- Databases
    (@DatabaseId, 'SQL Server', 1, 1),
    (@DatabaseId, 'MySQL', 2, 1),
    (@DatabaseId, 'PostgreSQL', 3, 1),
    (@DatabaseId, 'MongoDB', 4, 1),
    (@DatabaseId, 'Redis', 5, 1),
    
    -- Tools & Frameworks
    (@ToolsId, 'Spring Boot', 1, 1),
    (@ToolsId, 'Node.js', 2, 1),
    (@ToolsId, 'Express.js', 3, 1),
    (@ToolsId, 'Git', 4, 1),
    (@ToolsId, 'Visual Studio Code', 5, 1),
    (@ToolsId, 'IntelliJ IDEA', 6, 1),
    
    -- Cloud & DevOps
    (@CloudId, 'AWS', 1, 1),
    (@CloudId, 'Azure', 2, 1),
    (@CloudId, 'Docker', 3, 1),
    (@CloudId, 'Kubernetes', 4, 1),
    (@CloudId, 'Jenkins', 5, 1);
    
    PRINT 'Sample skills inserted';
END

PRINT 'Skills module setup completed successfully!';
