-- HeroSubHeading Table Creation Script
-- Database: nhdinh_portfolio
-- Table: HeroSubHeading

USE [nhdinh_portfolio]
GO

-- Drop table if exists (for recreation)
IF OBJECT_ID('dbo.HeroSubHeading', 'U') IS NOT NULL
    DROP TABLE dbo.HeroSubHeading;
GO

-- Create HeroSubHeading Table
CREATE TABLE dbo.HeroSubHeading (
    SubId     UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    HeroId    UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.Hero(HeroId) ON DELETE CASCADE,
    Text      NVARCHAR(256) NOT NULL,
    SortOrder INT NOT NULL DEFAULT 1,
    CreatedAt DATETIME2 DEFAULT SYSUTCDATETIME(),
    UpdatedAt DATETIME2 NULL,
    RowVer    ROWVERSION,
    CONSTRAINT UQ_SubHeading UNIQUE (HeroId, Text)
);
GO

-- Create indexes for better performance
CREATE INDEX IX_HeroSubHeading_HeroId ON dbo.HeroSubHeading(HeroId);
CREATE INDEX IX_HeroSubHeading_SortOrder ON dbo.HeroSubHeading(HeroId, SortOrder);
CREATE INDEX IX_HeroSubHeading_CreatedAt ON dbo.HeroSubHeading(CreatedAt);
GO

-- Insert sample data (optional)
INSERT INTO dbo.HeroSubHeading (HeroId, Text, SortOrder)
SELECT 
    h.HeroId,
    CASE h.Locale
        WHEN 'vi' THEN 'Lập trình viên Full-stack'
        WHEN 'en' THEN 'Full-stack Developer'
    END,
    1
FROM dbo.Hero h
WHERE h.IsDeleted = 0;

INSERT INTO dbo.HeroSubHeading (HeroId, Text, SortOrder)
SELECT 
    h.HeroId,
    CASE h.Locale
        WHEN 'vi' THEN 'Chuyên gia React & Spring Boot'
        WHEN 'en' THEN 'React & Spring Boot Expert'
    END,
    2
FROM dbo.Hero h
WHERE h.IsDeleted = 0;

INSERT INTO dbo.HeroSubHeading (HeroId, Text, SortOrder)
SELECT 
    h.HeroId,
    CASE h.Locale
        WHEN 'vi' THEN 'Đam mê tạo ra sản phẩm chất lượng'
        WHEN 'en' THEN 'Passionate about creating quality products'
    END,
    3
FROM dbo.Hero h
WHERE h.IsDeleted = 0;
GO

-- Verify the table creation
SELECT 
    hs.*,
    h.Locale,
    h.Heading
FROM dbo.HeroSubHeading hs
INNER JOIN dbo.Hero h ON hs.HeroId = h.HeroId
ORDER BY h.Locale, hs.SortOrder;
GO

PRINT 'HeroSubHeading table created successfully!';
