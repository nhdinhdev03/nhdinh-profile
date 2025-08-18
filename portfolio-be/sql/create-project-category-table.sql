-- ProjectCategory Table Creation Script
-- Database: nhdinh_portfolio
-- Table: ProjectCategory

USE [nhdinh_portfolio]
GO

-- Drop table if exists (for recreation)
IF OBJECT_ID('dbo.ProjectCategory', 'U') IS NOT NULL
    DROP TABLE dbo.ProjectCategory;
GO

-- Create ProjectCategory Table
CREATE TABLE dbo.ProjectCategory (
    CategoryId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name       NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- Create indexes for better performance
CREATE INDEX IX_ProjectCategory_Name ON dbo.ProjectCategory(Name);
GO

-- Insert sample data
INSERT INTO dbo.ProjectCategory (Name)
VALUES 
    ('Frontend'),
    ('Backend'),
    ('Full-stack'),
    ('Mobile'),
    ('AI/ML'),
    ('DevOps'),
    ('Desktop'),
    ('Game Development'),
    ('Data Science'),
    ('Blockchain');
GO

-- Verify the table creation
SELECT * FROM dbo.ProjectCategory ORDER BY Name;
GO

PRINT 'ProjectCategory table created successfully!';
