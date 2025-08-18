-- =============================================
-- BLOG / BÀI VIẾT KỸ THUẬT - MODULE: Blog
-- =============================================

USE nhdinh_portfolio;
GO

-- Bảng BlogPost: Bài viết kỹ thuật
CREATE TABLE dbo.BlogPost (
    BlogId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Title       NVARCHAR(200) NOT NULL,
    Slug        NVARCHAR(200) NOT NULL UNIQUE,
    Description NVARCHAR(300) NULL,
    Thumbnail   NVARCHAR(512) NULL,
    Content     NVARCHAR(MAX) NULL,
    CreatedAt   DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    UpdatedAt   DATETIME2 NULL,
    IsDeleted   BIT DEFAULT 0,
    RowVer      ROWVERSION
);
GO

-- Bảng BlogTag: Danh sách tag cho blog
CREATE TABLE dbo.BlogTag (
    TagId UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    Name  NVARCHAR(50) NOT NULL UNIQUE
);
GO

-- Bảng BlogTagMap: Gắn nhiều tag cho blog (nhiều-nhiều)
CREATE TABLE dbo.BlogTagMap (
    BlogId UNIQUEIDENTIFIER NOT NULL,
    TagId  UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (BlogId, TagId),
    FOREIGN KEY (BlogId) REFERENCES dbo.BlogPost(BlogId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.BlogTag(TagId) ON DELETE CASCADE
);
GO

-- Indexes for better performance
CREATE INDEX IX_BlogPost_CreatedAt ON dbo.BlogPost(CreatedAt DESC);
CREATE INDEX IX_BlogPost_IsDeleted ON dbo.BlogPost(IsDeleted);
CREATE INDEX IX_BlogPost_Slug ON dbo.BlogPost(Slug);
CREATE INDEX IX_BlogPost_Title ON dbo.BlogPost(Title);
GO

-- Sample data for BlogTag
INSERT INTO dbo.BlogTag (TagId, Name) VALUES
(NEWID(), 'Java'),
(NEWID(), 'Spring Boot'),
(NEWID(), 'React'),
(NEWID(), 'JavaScript'),
(NEWID(), 'TypeScript'),
(NEWID(), 'Node.js'),
(NEWID(), 'Python'),
(NEWID(), 'Docker'),
(NEWID(), 'AWS'),
(NEWID(), 'Azure'),
(NEWID(), 'DevOps'),
(NEWID(), 'CI/CD'),
(NEWID(), 'Microservices'),
(NEWID(), 'API Design'),
(NEWID(), 'Database'),
(NEWID(), 'SQL Server'),
(NEWID(), 'MongoDB'),
(NEWID(), 'Redis'),
(NEWID(), 'Frontend'),
(NEWID(), 'Backend'),
(NEWID(), 'Full Stack'),
(NEWID(), 'Architecture'),
(NEWID(), 'Performance'),
(NEWID(), 'Security'),
(NEWID(), 'Testing'),
(NEWID(), 'Tutorial'),
(NEWID(), 'Best Practices'),
(NEWID(), 'Code Review'),
(NEWID(), 'Clean Code'),
(NEWID(), 'Design Patterns');
GO

-- Sample blog posts
DECLARE @JavaTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Java');
DECLARE @SpringBootTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Spring Boot');
DECLARE @ReactTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'React');
DECLARE @DockerTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Docker');
DECLARE @TutorialTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Tutorial');
DECLARE @BestPracticesTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Best Practices');

-- Blog Post 1
DECLARE @BlogId1 UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.BlogPost (BlogId, Title, Slug, Description, Thumbnail, Content, CreatedAt, UpdatedAt, IsDeleted) VALUES
(@BlogId1, 
 'Getting Started with Spring Boot and React', 
 'getting-started-spring-boot-react',
 'Learn how to build a full-stack application using Spring Boot for backend and React for frontend.',
 'https://example.com/thumbnails/spring-boot-react.jpg',
 '<h1>Getting Started with Spring Boot and React</h1>
<p>In this comprehensive tutorial, we will walk through the process of building a modern full-stack application using Spring Boot for the backend and React for the frontend.</p>
<h2>Prerequisites</h2>
<ul>
<li>Java 17 or higher</li>
<li>Node.js 16 or higher</li>
<li>Basic knowledge of Java and JavaScript</li>
</ul>
<h2>Setting up Spring Boot</h2>
<p>First, let''s create a new Spring Boot project...</p>',
 SYSUTCDATETIME(),
 NULL,
 0);

-- Add tags for Blog Post 1
INSERT INTO dbo.BlogTagMap (BlogId, TagId) VALUES
(@BlogId1, @JavaTagId),
(@BlogId1, @SpringBootTagId),
(@BlogId1, @ReactTagId),
(@BlogId1, @TutorialTagId);

-- Blog Post 2
DECLARE @BlogId2 UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.BlogPost (BlogId, Title, Slug, Description, Thumbnail, Content, CreatedAt, UpdatedAt, IsDeleted) VALUES
(@BlogId2,
 'Dockerizing Your Spring Boot Application',
 'dockerizing-spring-boot-application',
 'A step-by-step guide to containerize your Spring Boot application using Docker.',
 'https://example.com/thumbnails/docker-spring-boot.jpg',
 '<h1>Dockerizing Your Spring Boot Application</h1>
<p>Docker has revolutionized the way we deploy applications. In this post, we''ll learn how to containerize a Spring Boot application.</p>
<h2>Why Docker?</h2>
<p>Docker provides consistency across different environments, making deployment easier and more reliable.</p>
<h2>Creating a Dockerfile</h2>
<p>Let''s start by creating a Dockerfile for our Spring Boot application...</p>',
 DATEADD(DAY, -5, SYSUTCDATETIME()),
 NULL,
 0);

-- Add tags for Blog Post 2
INSERT INTO dbo.BlogTagMap (BlogId, TagId) VALUES
(@BlogId2, @JavaTagId),
(@BlogId2, @SpringBootTagId),
(@BlogId2, @DockerTagId),
(@BlogId2, @TutorialTagId),
(@BlogId2, @BestPracticesTagId);

-- Blog Post 3
DECLARE @BlogId3 UNIQUEIDENTIFIER = NEWID();
INSERT INTO dbo.BlogPost (BlogId, Title, Slug, Description, Thumbnail, Content, CreatedAt, UpdatedAt, IsDeleted) VALUES
(@BlogId3,
 'Modern JavaScript Best Practices',
 'modern-javascript-best-practices',
 'Explore the latest JavaScript features and best practices for writing clean, maintainable code.',
 'https://example.com/thumbnails/javascript-best-practices.jpg',
 '<h1>Modern JavaScript Best Practices</h1>
<p>JavaScript has evolved significantly over the years. Let''s explore the modern best practices for writing clean, efficient JavaScript code.</p>
<h2>ES6+ Features</h2>
<p>Modern JavaScript includes many powerful features that can make your code more readable and efficient.</p>
<h2>Code Organization</h2>
<p>Proper code organization is crucial for maintainable applications...</p>',
 DATEADD(DAY, -10, SYSUTCDATETIME()),
 NULL,
 0);

-- Add tags for Blog Post 3
DECLARE @JSTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'JavaScript');
DECLARE @CleanCodeTagId UNIQUEIDENTIFIER = (SELECT TagId FROM dbo.BlogTag WHERE Name = 'Clean Code');
INSERT INTO dbo.BlogTagMap (BlogId, TagId) VALUES
(@BlogId3, @JSTagId),
(@BlogId3, @BestPracticesTagId),
(@BlogId3, @CleanCodeTagId);

GO

-- View to get blog posts with tag count
CREATE VIEW vw_BlogPostSummary AS
SELECT 
    bp.BlogId,
    bp.Title,
    bp.Slug,
    bp.Description,
    bp.Thumbnail,
    bp.CreatedAt,
    bp.UpdatedAt,
    bp.IsDeleted,
    COUNT(btm.TagId) as TagCount
FROM dbo.BlogPost bp
LEFT JOIN dbo.BlogTagMap btm ON bp.BlogId = btm.BlogId
GROUP BY bp.BlogId, bp.Title, bp.Slug, bp.Description, bp.Thumbnail, bp.CreatedAt, bp.UpdatedAt, bp.IsDeleted;
GO

-- Stored procedure to get popular blog tags
CREATE PROCEDURE sp_GetPopularBlogTags
    @TopCount INT = 10
AS
BEGIN
    SELECT TOP (@TopCount)
        bt.TagId,
        bt.Name,
        COUNT(btm.BlogId) as UsageCount
    FROM dbo.BlogTag bt
    LEFT JOIN dbo.BlogTagMap btm ON bt.TagId = btm.TagId
    LEFT JOIN dbo.BlogPost bp ON btm.BlogId = bp.BlogId AND bp.IsDeleted = 0
    GROUP BY bt.TagId, bt.Name
    ORDER BY UsageCount DESC, bt.Name ASC;
END;
GO

-- Stored procedure to search blog posts
CREATE PROCEDURE sp_SearchBlogPosts
    @Keyword NVARCHAR(200),
    @MaxResults INT = 50
AS
BEGIN
    SELECT TOP (@MaxResults)
        bp.BlogId,
        bp.Title,
        bp.Slug,
        bp.Description,
        bp.Thumbnail,
        bp.CreatedAt,
        bp.UpdatedAt
    FROM dbo.BlogPost bp
    WHERE bp.IsDeleted = 0
    AND (
        bp.Title LIKE '%' + @Keyword + '%'
        OR bp.Description LIKE '%' + @Keyword + '%'
        OR bp.Content LIKE '%' + @Keyword + '%'
    )
    ORDER BY bp.CreatedAt DESC;
END;
GO

PRINT 'Blog module tables and sample data created successfully!';
