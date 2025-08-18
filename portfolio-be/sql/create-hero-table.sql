-- Hero Table Creation Script
-- Database: nhdinh_portfolio
-- Table: Hero

USE [nhdinh_portfolio]
GO

-- Drop table if exists (for recreation)
IF OBJECT_ID('dbo.Hero', 'U') IS NOT NULL
    DROP TABLE dbo.Hero;
GO

-- Create Hero Table
CREATE TABLE dbo.Hero (
    HeroId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Locale      NVARCHAR(10) NOT NULL UNIQUE,                 -- Ngôn ngữ (vi, en, ...)
    PreHeading  NVARCHAR(256) NULL,                          -- Dòng giới thiệu đầu
    Heading     NVARCHAR(256) NOT NULL,                      -- Tên hiển thị chính
    IntroHtml   NVARCHAR(MAX) NULL,                          -- Mô tả HTML giới thiệu chi tiết
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2 NULL,
    IsDeleted   BIT NOT NULL DEFAULT 0,                      -- Soft delete
    RowVer      ROWVERSION
);
GO

-- Create indexes for better performance
CREATE INDEX IX_Hero_Locale ON dbo.Hero(Locale) WHERE IsDeleted = 0;
CREATE INDEX IX_Hero_IsDeleted ON dbo.Hero(IsDeleted);
CREATE INDEX IX_Hero_CreatedAt ON dbo.Hero(CreatedAt);
GO

-- Insert sample data (optional)
INSERT INTO dbo.Hero (Locale, PreHeading, Heading, IntroHtml)
VALUES 
    ('vi', 'Xin chào, tôi là', 'Nguyễn Hoàng Đình', '<p>Tôi là một <strong>Full-stack Developer</strong> với niềm đam mê tạo ra những ứng dụng web hiện đại và thân thiện với người dùng.</p>'),
    ('en', 'Hello, I am', 'Nguyen Hoang Dinh', '<p>I am a <strong>Full-stack Developer</strong> passionate about creating modern and user-friendly web applications.</p>');
GO

-- Verify the table creation
SELECT * FROM dbo.Hero;
GO

PRINT 'Hero table created successfully!';
