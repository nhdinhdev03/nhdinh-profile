/* =============================================================
   Database: nhdinh_profile
   Purpose : Schema for modules: accounts, profile/about, home, projects,
			 blog, contact, media, analytics, settings, history(audit).
   RDBMS   : Microsoft SQL Server
   Author  : Generated
   Notes   : Use NEWSEQUENTIALID for clustered PK efficiency.
			 All tables (business) include soft delete + audit + rowversion.
==============================================================*/

/* ---------- Safety & idempotency helpers ---------- */
IF NOT EXISTS (SELECT 1
FROM sys.databases
WHERE name = N'nhdinh_profile')
BEGIN
    PRINT 'Creating database nhdinh_profile';
    CREATE DATABASE nhdinh_profile;
END;
GO

USE nhdinh_profile;
GO

SET ANSI_NULLS ON;
SET QUOTED_IDENTIFIER ON;
GO

/* =============================================================
   Common: audit columns template (for reference)
   CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
   CreatedBy UNIQUEIDENTIFIER NULL,
   UpdatedAt DATETIME2 NULL,
   UpdatedBy UNIQUEIDENTIFIER NULL,
   IsDeleted BIT NOT NULL DEFAULT 0,
   RowVersion ROWVERSION
==============================================================*/

/* ================= MEDIA (placed early due FKs) ================= */
IF OBJECT_ID('dbo.Media','U') IS NULL
BEGIN
    CREATE TABLE dbo.Media
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        FileName NVARCHAR(256) NOT NULL,
        OriginalName NVARCHAR(256) NULL,
        ContentType NVARCHAR(128) NULL,
        Extension NVARCHAR(16) NULL,
        SizeBytes BIGINT NOT NULL,
        Url NVARCHAR(512) NOT NULL,
        ThumbnailUrl NVARCHAR(512) NULL,
        Width INT NULL,
        Height INT NULL,
        DurationSeconds DECIMAL(10,2) NULL,
        MediaType TINYINT NOT NULL DEFAULT 0,
        -- 0=Image,1=Video,2=Audio,3=Doc,4=Other
        HashSha256 CHAR(64) NULL,
        StorageProvider NVARCHAR(32) NOT NULL DEFAULT 'local',
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

/* ================= ACCOUNTS / AUTH ================= */
IF OBJECT_ID('dbo.Roles','U') IS NULL
BEGIN
    CREATE TABLE dbo.Roles
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(64) NOT NULL UNIQUE,
        DisplayName NVARCHAR(128) NULL,
        Description NVARCHAR(256) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Permissions','U') IS NULL
BEGIN
    CREATE TABLE dbo.Permissions
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Code NVARCHAR(100) NOT NULL UNIQUE,
        GroupName NVARCHAR(64) NULL,
        Description NVARCHAR(256) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Users','U') IS NULL
BEGIN
    CREATE TABLE dbo.Users
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        UserName NVARCHAR(64) NOT NULL UNIQUE,
        NormalizedUserName AS UPPER(UserName) PERSISTED,
        Email NVARCHAR(128) NOT NULL UNIQUE,
        EmailConfirmed BIT NOT NULL DEFAULT 0,
        PasswordHash NVARCHAR(256) NOT NULL,
        PasswordSalt NVARCHAR(128) NULL,
        Phone NVARCHAR(32) NULL,
        AvatarMediaId UNIQUEIDENTIFIER NULL,
        Status TINYINT NOT NULL DEFAULT 1,
        -- 0=Locked,1=Active
        LastLoginAt DATETIME2 NULL,
        FailedAccessCount INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_Users_AvatarMedia FOREIGN KEY (AvatarMediaId) REFERENCES dbo.Media(Id)
    );
END;
GO

IF OBJECT_ID('dbo.RolePermissions','U') IS NULL
BEGIN
    CREATE TABLE dbo.RolePermissions
    (
        RoleId UNIQUEIDENTIFIER NOT NULL,
        PermissionId UNIQUEIDENTIFIER NOT NULL,
        PRIMARY KEY(RoleId, PermissionId),
        CONSTRAINT FK_RolePermissions_Role FOREIGN KEY (RoleId) REFERENCES dbo.Roles(Id),
        CONSTRAINT FK_RolePermissions_Permission FOREIGN KEY (PermissionId) REFERENCES dbo.Permissions(Id)
    );
END;
GO

IF OBJECT_ID('dbo.UserRoles','U') IS NULL
BEGIN
    CREATE TABLE dbo.UserRoles
    (
        UserId UNIQUEIDENTIFIER NOT NULL,
        RoleId UNIQUEIDENTIFIER NOT NULL,
        PRIMARY KEY(UserId, RoleId),
        CONSTRAINT FK_UserRoles_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id),
        CONSTRAINT FK_UserRoles_Role FOREIGN KEY (RoleId) REFERENCES dbo.Roles(Id)
    );
END;
GO

/* ================= PROFILE / ABOUT ================= */
IF OBJECT_ID('dbo.Profiles','U') IS NULL
BEGIN
    CREATE TABLE dbo.Profiles
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        UserId UNIQUEIDENTIFIER NOT NULL UNIQUE,
        FullName NVARCHAR(128) NULL,
        Headline NVARCHAR(256) NULL,
        Bio NVARCHAR(MAX) NULL,
        Location NVARCHAR(128) NULL,
        WebsiteUrl NVARCHAR(256) NULL,
        GithubUrl NVARCHAR(256) NULL,
        LinkedinUrl NVARCHAR(256) NULL,
        TwitterUrl NVARCHAR(256) NULL,
        Birthday DATE NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_Profiles_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END;
GO

IF OBJECT_ID('dbo.AboutSections','U') IS NULL
BEGIN
    CREATE TABLE dbo.AboutSections
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Title NVARCHAR(128) NULL,
        Slug NVARCHAR(128) NULL UNIQUE,
        Content NVARCHAR(MAX) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        Visible BIT NOT NULL DEFAULT 1,
        SectionType TINYINT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Skills','U') IS NULL
BEGIN
    CREATE TABLE dbo.Skills
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(64) NOT NULL,
        Category NVARCHAR(64) NULL,
        Level TINYINT NULL,
        DisplayPercent TINYINT NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        IsHighlighted BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Experiences','U') IS NULL
BEGIN
    CREATE TABLE dbo.Experiences
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Company NVARCHAR(128) NULL,
        Role NVARCHAR(128) NULL,
        Location NVARCHAR(128) NULL,
        Description NVARCHAR(MAX) NULL,
        StartDate DATE NULL,
        EndDate DATE NULL,
        IsCurrent BIT NOT NULL DEFAULT 0,
        SortOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Educations','U') IS NULL
BEGIN
    CREATE TABLE dbo.Educations
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        School NVARCHAR(128) NULL,
        Degree NVARCHAR(128) NULL,
        FieldOfStudy NVARCHAR(128) NULL,
        Description NVARCHAR(MAX) NULL,
        StartDate DATE NULL,
        EndDate DATE NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

/* ================= HOME ================= */
IF OBJECT_ID('dbo.HomeSections','U') IS NULL
BEGIN
    CREATE TABLE dbo.HomeSections
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        SectionKey NVARCHAR(64) NOT NULL UNIQUE,
        Title NVARCHAR(128) NULL,
        ConfigJson NVARCHAR(MAX) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        Enabled BIT NOT NULL DEFAULT 1,
        CacheSeconds INT NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.StatsItems','U') IS NULL
BEGIN
    CREATE TABLE dbo.StatsItems
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Code NVARCHAR(64) NOT NULL UNIQUE,
        Label NVARCHAR(128) NULL,
        Value INT NOT NULL DEFAULT 0,
        Icon NVARCHAR(64) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        AutoCompute BIT NOT NULL DEFAULT 1,
        ComputeQuery NVARCHAR(MAX) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

/* ================= PROJECTS ================= */
IF OBJECT_ID('dbo.ProjectCategories','U') IS NULL
BEGIN
    CREATE TABLE dbo.ProjectCategories
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(128) NOT NULL,
        Slug NVARCHAR(128) NOT NULL UNIQUE,
        Description NVARCHAR(256) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        Visible BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.Projects','U') IS NULL
BEGIN
    CREATE TABLE dbo.Projects
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Title NVARCHAR(256) NOT NULL,
        Slug NVARCHAR(256) NOT NULL UNIQUE,
        Summary NVARCHAR(512) NULL,
        Description NVARCHAR(MAX) NULL,
        CategoryId UNIQUEIDENTIFIER NULL,
        Status TINYINT NOT NULL DEFAULT 1,
        Visibility TINYINT NOT NULL DEFAULT 1,
        RepoUrl NVARCHAR(256) NULL,
        DemoUrl NVARCHAR(256) NULL,
        CoverMediaId UNIQUEIDENTIFIER NULL,
        StartedAt DATE NULL,
        FinishedAt DATE NULL,
        Featured BIT NOT NULL DEFAULT 0,
        SortOrder INT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_Projects_Category FOREIGN KEY (CategoryId) REFERENCES dbo.ProjectCategories(Id),
        CONSTRAINT FK_Projects_CoverMedia FOREIGN KEY (CoverMediaId) REFERENCES dbo.Media(Id)
    );
END;
GO

IF OBJECT_ID('dbo.ProjectTags','U') IS NULL
BEGIN
    CREATE TABLE dbo.ProjectTags
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(64) NOT NULL,
        Slug NVARCHAR(64) NOT NULL UNIQUE,
        Color NVARCHAR(16) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.ProjectTagMap','U') IS NULL
BEGIN
    CREATE TABLE dbo.ProjectTagMap
    (
        ProjectId UNIQUEIDENTIFIER NOT NULL,
        TagId UNIQUEIDENTIFIER NOT NULL,
        PRIMARY KEY(ProjectId, TagId),
        CONSTRAINT FK_ProjectTagMap_Project FOREIGN KEY (ProjectId) REFERENCES dbo.Projects(Id),
        CONSTRAINT FK_ProjectTagMap_Tag FOREIGN KEY (TagId) REFERENCES dbo.ProjectTags(Id)
    );
END;
GO

IF OBJECT_ID('dbo.TechStacks','U') IS NULL
BEGIN
    CREATE TABLE dbo.TechStacks
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(64) NOT NULL,
        Slug NVARCHAR(64) NOT NULL UNIQUE,
        Category NVARCHAR(64) NULL,
        Icon NVARCHAR(64) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.ProjectTechMap','U') IS NULL
BEGIN
    CREATE TABLE dbo.ProjectTechMap
    (
        ProjectId UNIQUEIDENTIFIER NOT NULL,
        TechId UNIQUEIDENTIFIER NOT NULL,
        PRIMARY KEY(ProjectId, TechId),
        CONSTRAINT FK_ProjectTechMap_Project FOREIGN KEY (ProjectId) REFERENCES dbo.Projects(Id),
        CONSTRAINT FK_ProjectTechMap_Tech FOREIGN KEY (TechId) REFERENCES dbo.TechStacks(Id)
    );
END;
GO

IF OBJECT_ID('dbo.ProjectMedia','U') IS NULL
BEGIN
    CREATE TABLE dbo.ProjectMedia
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        ProjectId UNIQUEIDENTIFIER NOT NULL,
        MediaId UNIQUEIDENTIFIER NOT NULL,
        Caption NVARCHAR(256) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        IsPrimary BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        CONSTRAINT FK_ProjectMedia_Project FOREIGN KEY (ProjectId) REFERENCES dbo.Projects(Id),
        CONSTRAINT FK_ProjectMedia_Media FOREIGN KEY (MediaId) REFERENCES dbo.Media(Id)
    );
END;
GO

/* ================= BLOG ================= */
IF OBJECT_ID('dbo.BlogCategories','U') IS NULL
BEGIN
    CREATE TABLE dbo.BlogCategories
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(128) NOT NULL,
        Slug NVARCHAR(128) NOT NULL UNIQUE,
        Description NVARCHAR(256) NULL,
        ParentId UNIQUEIDENTIFIER NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        Visible BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_BlogCategories_Parent FOREIGN KEY (ParentId) REFERENCES dbo.BlogCategories(Id)
    );
END;
GO

IF OBJECT_ID('dbo.BlogTags','U') IS NULL
BEGIN
    CREATE TABLE dbo.BlogTags
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(64) NOT NULL,
        Slug NVARCHAR(64) NOT NULL UNIQUE,
        Color NVARCHAR(16) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.BlogPosts','U') IS NULL
BEGIN
    CREATE TABLE dbo.BlogPosts
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Title NVARCHAR(256) NOT NULL,
        Slug NVARCHAR(256) NOT NULL UNIQUE,
        Excerpt NVARCHAR(512) NULL,
        Content NVARCHAR(MAX) NULL,
        CategoryId UNIQUEIDENTIFIER NULL,
        CoverMediaId UNIQUEIDENTIFIER NULL,
        AuthorId UNIQUEIDENTIFIER NOT NULL,
        Status TINYINT NOT NULL DEFAULT 0,
        PublishedAt DATETIME2 NULL,
        Views INT NOT NULL DEFAULT 0,
        Featured BIT NOT NULL DEFAULT 0,
        AllowComments BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_BlogPosts_Category FOREIGN KEY (CategoryId) REFERENCES dbo.BlogCategories(Id),
        CONSTRAINT FK_BlogPosts_CoverMedia FOREIGN KEY (CoverMediaId) REFERENCES dbo.Media(Id),
        CONSTRAINT FK_BlogPosts_Author FOREIGN KEY (AuthorId) REFERENCES dbo.Users(Id)
    );
END;
GO

IF OBJECT_ID('dbo.BlogPostTag','U') IS NULL
BEGIN
    CREATE TABLE dbo.BlogPostTag
    (
        PostId UNIQUEIDENTIFIER NOT NULL,
        TagId UNIQUEIDENTIFIER NOT NULL,
        PRIMARY KEY(PostId, TagId),
        CONSTRAINT FK_BlogPostTag_Post FOREIGN KEY (PostId) REFERENCES dbo.BlogPosts(Id),
        CONSTRAINT FK_BlogPostTag_Tag FOREIGN KEY (TagId) REFERENCES dbo.BlogTags(Id)
    );
END;
GO

IF OBJECT_ID('dbo.BlogComments','U') IS NULL
BEGIN
    CREATE TABLE dbo.BlogComments
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        PostId UNIQUEIDENTIFIER NOT NULL,
        ParentId UNIQUEIDENTIFIER NULL,
        UserId UNIQUEIDENTIFIER NULL,
        GuestName NVARCHAR(128) NULL,
        GuestEmail NVARCHAR(128) NULL,
        Content NVARCHAR(MAX) NOT NULL,
        Status TINYINT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_BlogComments_Post FOREIGN KEY (PostId) REFERENCES dbo.BlogPosts(Id),
        CONSTRAINT FK_BlogComments_Parent FOREIGN KEY (ParentId) REFERENCES dbo.BlogComments(Id),
        CONSTRAINT FK_BlogComments_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END;
GO

/* ================= CONTACT ================= */
IF OBJECT_ID('dbo.ContactSettings','U') IS NULL
BEGIN
    CREATE TABLE dbo.ContactSettings
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        EmailTo NVARCHAR(128) NULL,
        AutoReplySubject NVARCHAR(256) NULL,
        AutoReplyBody NVARCHAR(MAX) NULL,
        EnableAutoReply BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

IF OBJECT_ID('dbo.ContactMessages','U') IS NULL
BEGIN
    CREATE TABLE dbo.ContactMessages
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Name NVARCHAR(128) NOT NULL,
        Email NVARCHAR(128) NOT NULL,
        Subject NVARCHAR(256) NULL,
        Message NVARCHAR(MAX) NOT NULL,
        Status TINYINT NOT NULL DEFAULT 0,
        SourceIp NVARCHAR(64) NULL,
        UserAgent NVARCHAR(256) NULL,
        Replied BIT NOT NULL DEFAULT 0,
        RepliedAt DATETIME2 NULL,
        RepliedBy UNIQUEIDENTIFIER NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT FK_ContactMessages_RepliedBy FOREIGN KEY (RepliedBy) REFERENCES dbo.Users(Id)
    );
END;
GO

IF OBJECT_ID('dbo.SocialLinks','U') IS NULL
BEGIN
    CREATE TABLE dbo.SocialLinks
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Platform NVARCHAR(64) NOT NULL,
        Url NVARCHAR(256) NOT NULL,
        Icon NVARCHAR(64) NULL,
        SortOrder INT NOT NULL DEFAULT 0,
        Visible BIT NOT NULL DEFAULT 1,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION
    );
END;
GO

/* ================= ANALYTICS ================= */
IF OBJECT_ID('dbo.PageViews','U') IS NULL
BEGIN
    CREATE TABLE dbo.PageViews
    (
        Id BIGINT IDENTITY(1,1) PRIMARY KEY,
        Path NVARCHAR(256) NOT NULL,
        Referrer NVARCHAR(256) NULL,
        UserAgent NVARCHAR(256) NULL,
        IpHash CHAR(64) NULL,
        CountryCode CHAR(2) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME()
    );
END;
GO

IF OBJECT_ID('dbo.Events','U') IS NULL
BEGIN
    CREATE TABLE dbo.Events
    (
        Id BIGINT IDENTITY(1,1) PRIMARY KEY,
        EventName NVARCHAR(64) NOT NULL,
        Category NVARCHAR(64) NULL,
        Label NVARCHAR(128) NULL,
        Value FLOAT NULL,
        Path NVARCHAR(256) NULL,
        UserId UNIQUEIDENTIFIER NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_Events_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END;
GO

IF OBJECT_ID('dbo.DailyAggregates','U') IS NULL
BEGIN
    CREATE TABLE dbo.DailyAggregates
    (
        Date DATE NOT NULL,
        Metric NVARCHAR(64) NOT NULL,
        Value BIGINT NOT NULL DEFAULT 0,
        PRIMARY KEY(Date, Metric)
    );
END;
GO

/* ================= SETTINGS ================= */
IF OBJECT_ID('dbo.Settings','U') IS NULL
BEGIN
    CREATE TABLE dbo.Settings
    (
        Id UNIQUEIDENTIFIER NOT NULL DEFAULT NEWSEQUENTIALID() PRIMARY KEY,
        Scope TINYINT NOT NULL DEFAULT 0,
        -- 0=Global,1=User
        UserId UNIQUEIDENTIFIER NULL,
        KeyName NVARCHAR(128) NOT NULL,
        Value NVARCHAR(MAX) NULL,
        ValueType TINYINT NOT NULL DEFAULT 0,
        -- 0=String,1=Number,2=Bool,3=Json
        Description NVARCHAR(256) NULL,
        IsEncrypted BIT NOT NULL DEFAULT 0,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CreatedBy UNIQUEIDENTIFIER NULL,
        UpdatedAt DATETIME2 NULL,
        UpdatedBy UNIQUEIDENTIFIER NULL,
        IsDeleted BIT NOT NULL DEFAULT 0,
        RowVersion ROWVERSION,
        CONSTRAINT UQ_Settings UNIQUE (Scope, UserId, KeyName),
        CONSTRAINT FK_Settings_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END;
GO

/* ================= HISTORY / AUDIT ================= */
IF OBJECT_ID('dbo.AuditLogs','U') IS NULL
BEGIN
    CREATE TABLE dbo.AuditLogs
    (
        Id BIGINT IDENTITY(1,1) PRIMARY KEY,
        CorrelationId UNIQUEIDENTIFIER NULL,
        UserId UNIQUEIDENTIFIER NULL,
        Action NVARCHAR(128) NOT NULL,
        EntityName NVARCHAR(128) NULL,
        EntityId NVARCHAR(64) NULL,
        ChangesJson NVARCHAR(MAX) NULL,
        IpAddress NVARCHAR(64) NULL,
        UserAgent NVARCHAR(256) NULL,
        CreatedAt DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
        CONSTRAINT FK_AuditLogs_User FOREIGN KEY (UserId) REFERENCES dbo.Users(Id)
    );
END;
GO

/* ================= INDEXES (selective) ================= */
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_Users_Email' AND object_id = OBJECT_ID('dbo.Users'))
	CREATE INDEX IX_Users_Email ON dbo.Users(Email);
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_BlogPosts_Status_PublishedAt' AND object_id = OBJECT_ID('dbo.BlogPosts'))
	CREATE INDEX IX_BlogPosts_Status_PublishedAt ON dbo.BlogPosts(Status, PublishedAt DESC);
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_Projects_Status_Featured' AND object_id = OBJECT_ID('dbo.Projects'))
	CREATE INDEX IX_Projects_Status_Featured ON dbo.Projects(Status, Featured DESC, SortOrder);
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_PageViews_Path' AND object_id = OBJECT_ID('dbo.PageViews'))
	CREATE INDEX IX_PageViews_Path ON dbo.PageViews(Path);
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_Events_EventName' AND object_id = OBJECT_ID('dbo.Events'))
	CREATE INDEX IX_Events_EventName ON dbo.Events(EventName, CreatedAt);
IF NOT EXISTS (SELECT 1
FROM sys.indexes
WHERE name='IX_AuditLogs_Action' AND object_id = OBJECT_ID('dbo.AuditLogs'))
	CREATE INDEX IX_AuditLogs_Action ON dbo.AuditLogs(Action, CreatedAt DESC);
GO

/* ================= SEED DATA (idempotent) ================= */
DECLARE @now DATETIME2 = SYSUTCDATETIME();

-- Roles
IF NOT EXISTS (SELECT 1
FROM dbo.Roles
WHERE Name='admin')
	INSERT INTO dbo.Roles
    (Id,Name,DisplayName,Description,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'admin', 'Administrator', 'Full access', @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Roles
WHERE Name='user')
	INSERT INTO dbo.Roles
    (Id,Name,DisplayName,Description,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'user', 'User', 'Standard user', @now);

-- Basic permissions (sample)
IF NOT EXISTS (SELECT 1
FROM dbo.Permissions
WHERE Code='admin.dashboard.view')
	INSERT INTO dbo.Permissions
    (Id,Code,GroupName,Description,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'admin.dashboard.view', 'dashboard', 'View admin dashboard', @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Permissions
WHERE Code='admin.projects.manage')
	INSERT INTO dbo.Permissions
    (Id,Code,GroupName,Description,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'admin.projects.manage', 'projects', 'Manage projects', @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Permissions
WHERE Code='admin.blog.manage')
	INSERT INTO dbo.Permissions
    (Id,Code,GroupName,Description,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'admin.blog.manage', 'blog', 'Manage blog', @now);

-- StatsItems sample
IF NOT EXISTS (SELECT 1
FROM dbo.StatsItems
WHERE Code='totalProjects')
	INSERT INTO dbo.StatsItems
    (Id,Code,Label,Value,Icon,AutoCompute,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'totalProjects', 'Projects', 0, 'projects', 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.StatsItems
WHERE Code='totalPosts')
	INSERT INTO dbo.StatsItems
    (Id,Code,Label,Value,Icon,AutoCompute,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'totalPosts', 'Posts', 0, 'posts', 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.StatsItems
WHERE Code='totalViews')
	INSERT INTO dbo.StatsItems
    (Id,Code,Label,Value,Icon,AutoCompute,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'totalViews', 'Views', 0, 'views', 1, @now);

-- HomeSections sample
IF NOT EXISTS (SELECT 1
FROM dbo.HomeSections
WHERE SectionKey='hero')
	INSERT INTO dbo.HomeSections
    (Id,SectionKey,Title,ConfigJson,SortOrder,Enabled,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'hero', 'Hero Banner', N'{"headline":"Welcome","sub":"Portfolio"}', 0, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.HomeSections
WHERE SectionKey='featuredProjects')
	INSERT INTO dbo.HomeSections
    (Id,SectionKey,Title,ConfigJson,SortOrder,Enabled,CreatedAt)
VALUES
    (NEWSEQUENTIALID(), 'featuredProjects', 'Featured Projects', N'{"limit":6}', 10, 1, @now);

-- Sample Users
DECLARE @AdminUserId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @UserUserId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE UserName='nhdinh_admin')
    INSERT INTO dbo.Users (Id, UserName, Email, EmailConfirmed, PasswordHash, PasswordSalt, Status, CreatedAt)
    VALUES (@AdminUserId, 'nhdinh_admin', 'admin@nhdinh.dev', 1, 'hashed_password_admin', 'salt_admin', 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Users WHERE UserName='nhdinh_user')
    INSERT INTO dbo.Users (Id, UserName, Email, EmailConfirmed, PasswordHash, PasswordSalt, Status, CreatedAt)
    VALUES (@UserUserId, 'nhdinh_user', 'user@nhdinh.dev', 1, 'hashed_password_user', 'salt_user', 1, @now);

-- Assign roles to users
DECLARE @AdminRoleId UNIQUEIDENTIFIER = (SELECT Id FROM dbo.Roles WHERE Name='admin');
DECLARE @UserRoleId UNIQUEIDENTIFIER = (SELECT Id FROM dbo.Roles WHERE Name='user');

IF NOT EXISTS (SELECT 1 FROM dbo.UserRoles WHERE UserId=@AdminUserId AND RoleId=@AdminRoleId)
    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@AdminUserId, @AdminRoleId);

IF NOT EXISTS (SELECT 1 FROM dbo.UserRoles WHERE UserId=@UserUserId AND RoleId=@UserRoleId)
    INSERT INTO dbo.UserRoles (UserId, RoleId) VALUES (@UserUserId, @UserRoleId);

-- Sample Media
DECLARE @AvatarMediaId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @CoverImageId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @ProjectImage1Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @ProjectImage2Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.Media WHERE FileName='avatar.jpg')
    INSERT INTO dbo.Media (Id, FileName, OriginalName, ContentType, Extension, SizeBytes, Url, MediaType, CreatedAt)
    VALUES (@AvatarMediaId, 'avatar.jpg', 'nhdinh_avatar.jpg', 'image/jpeg', '.jpg', 102400, '/uploads/avatar.jpg', 0, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Media WHERE FileName='cover-image.jpg')
    INSERT INTO dbo.Media (Id, FileName, OriginalName, ContentType, Extension, SizeBytes, Url, MediaType, CreatedAt)
    VALUES (@CoverImageId, 'cover-image.jpg', 'portfolio_cover.jpg', 'image/jpeg', '.jpg', 512000, '/uploads/cover-image.jpg', 0, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Media WHERE FileName='project1.png')
    INSERT INTO dbo.Media (Id, FileName, OriginalName, ContentType, Extension, SizeBytes, Url, MediaType, CreatedAt)
    VALUES (@ProjectImage1Id, 'project1.png', 'ecommerce_project.png', 'image/png', '.png', 256000, '/uploads/project1.png', 0, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Media WHERE FileName='project2.png')
    INSERT INTO dbo.Media (Id, FileName, OriginalName, ContentType, Extension, SizeBytes, Url, MediaType, CreatedAt)
    VALUES (@ProjectImage2Id, 'project2.png', 'blog_system.png', 'image/png', '.png', 384000, '/uploads/project2.png', 0, @now);

-- Sample Profile
IF NOT EXISTS (SELECT 1 FROM dbo.Profiles WHERE UserId=@AdminUserId)
    INSERT INTO dbo.Profiles (Id, UserId, FullName, Headline, Bio, Location, WebsiteUrl, GithubUrl, LinkedinUrl, TwitterUrl, Birthday, CreatedAt)
    VALUES (NEWSEQUENTIALID(), @AdminUserId, N'Nguyễn Hồng Đinh', N'Full Stack Developer & Software Engineer', 
            N'Passionate full-stack developer with 5+ years of experience in building web applications using modern technologies like React, Node.js, and .NET Core. I love creating efficient, scalable solutions and contributing to open-source projects.',
            N'Ho Chi Minh City, Vietnam', N'https://nhdinh.dev', N'https://github.com/nhdinhdev', N'https://linkedin.com/in/nhdinh', N'https://twitter.com/nhdinh_dev', '1995-03-15', @now);

-- Sample Skills
IF NOT EXISTS (SELECT 1 FROM dbo.Skills WHERE Name='JavaScript')
    INSERT INTO dbo.Skills (Id, Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'JavaScript', 'Programming', 90, 90, 1, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Skills WHERE Name='React')
    INSERT INTO dbo.Skills (Id, Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'React', 'Frontend', 85, 85, 2, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Skills WHERE Name='Node.js')
    INSERT INTO dbo.Skills (Id, Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'Node.js', 'Backend', 80, 80, 3, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Skills WHERE Name='C#')
    INSERT INTO dbo.Skills (Id, Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'C#', 'Programming', 85, 85, 4, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Skills WHERE Name='SQL Server')
    INSERT INTO dbo.Skills (Id, Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'SQL Server', 'Database', 80, 80, 5, 1, @now);

-- Sample Experiences
IF NOT EXISTS (SELECT 1 FROM dbo.Experiences WHERE Company='Tech Solutions Inc.')
    INSERT INTO dbo.Experiences (Id, Company, Role, Location, Description, StartDate, EndDate, IsCurrent, SortOrder, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'Tech Solutions Inc.', 'Senior Full Stack Developer', 'Ho Chi Minh City', 
            N'Leading development of enterprise web applications using React, .NET Core, and SQL Server. Mentoring junior developers and implementing best practices for code quality and performance optimization.',
            '2022-01-01', NULL, 1, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Experiences WHERE Company='Digital Agency Vietnam')
    INSERT INTO dbo.Experiences (Id, Company, Role, Location, Description, StartDate, EndDate, IsCurrent, SortOrder, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'Digital Agency Vietnam', 'Full Stack Developer', 'Ho Chi Minh City',
            N'Developed responsive web applications and e-commerce platforms using modern JavaScript frameworks. Collaborated with design teams to implement pixel-perfect user interfaces.',
            '2020-03-01', '2021-12-31', 0, 2, @now);

-- Sample Education
IF NOT EXISTS (SELECT 1 FROM dbo.Educations WHERE School='University of Technology Ho Chi Minh City')
    INSERT INTO dbo.Educations (Id, School, Degree, FieldOfStudy, Description, StartDate, EndDate, SortOrder, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'University of Technology Ho Chi Minh City', 'Bachelor of Engineering', 'Computer Science',
            N'Studied fundamental computer science concepts, algorithms, data structures, and software engineering principles.',
            '2017-09-01', '2021-06-30', 1, @now);

-- Sample Project Categories
DECLARE @WebAppCategoryId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @MobileCategoryId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectCategories WHERE Slug='web-applications')
    INSERT INTO dbo.ProjectCategories (Id, Name, Slug, Description, SortOrder, Visible, CreatedAt)
    VALUES (@WebAppCategoryId, 'Web Applications', 'web-applications', 'Full-stack web applications and websites', 1, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectCategories WHERE Slug='mobile-apps')
    INSERT INTO dbo.ProjectCategories (Id, Name, Slug, Description, SortOrder, Visible, CreatedAt)
    VALUES (@MobileCategoryId, 'Mobile Apps', 'mobile-apps', 'Mobile applications for iOS and Android', 2, 1, @now);

-- Sample Tech Stacks
DECLARE @ReactTechId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @NodeTechId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @DotNetTechId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @SqlServerTechId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.TechStacks WHERE Slug='react')
    INSERT INTO dbo.TechStacks (Id, Name, Slug, Category, Icon, CreatedAt)
    VALUES (@ReactTechId, 'React', 'react', 'Frontend', 'react-icon', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.TechStacks WHERE Slug='nodejs')
    INSERT INTO dbo.TechStacks (Id, Name, Slug, Category, Icon, CreatedAt)
    VALUES (@NodeTechId, 'Node.js', 'nodejs', 'Backend', 'nodejs-icon', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.TechStacks WHERE Slug='dotnet-core')
    INSERT INTO dbo.TechStacks (Id, Name, Slug, Category, Icon, CreatedAt)
    VALUES (@DotNetTechId, '.NET Core', 'dotnet-core', 'Backend', 'dotnet-icon', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.TechStacks WHERE Slug='sql-server')
    INSERT INTO dbo.TechStacks (Id, Name, Slug, Category, Icon, CreatedAt)
    VALUES (@SqlServerTechId, 'SQL Server', 'sql-server', 'Database', 'sqlserver-icon', @now);

-- Sample Project Tags
DECLARE @ReactTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @EcommerceTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @ResponsiveTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTags WHERE Slug='react')
    INSERT INTO dbo.ProjectTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@ReactTagId, 'React', 'react', '#61DAFB', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTags WHERE Slug='ecommerce')
    INSERT INTO dbo.ProjectTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@EcommerceTagId, 'E-commerce', 'ecommerce', '#FF6B6B', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTags WHERE Slug='responsive')
    INSERT INTO dbo.ProjectTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@ResponsiveTagId, 'Responsive', 'responsive', '#4ECDC4', @now);

-- Sample Projects
DECLARE @Project1Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @Project2Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.Projects WHERE Slug='ecommerce-platform')
    INSERT INTO dbo.Projects (Id, Title, Slug, Summary, Description, CategoryId, Status, Visibility, RepoUrl, DemoUrl, CoverMediaId, StartedAt, FinishedAt, Featured, SortOrder, CreatedAt, CreatedBy)
    VALUES (@Project1Id, 'E-commerce Platform', 'ecommerce-platform', 
            'A modern e-commerce platform built with React and .NET Core',
            N'Complete e-commerce solution featuring user authentication, product catalog, shopping cart, payment integration, and admin dashboard. Built with React frontend, .NET Core API, and SQL Server database.',
            @WebAppCategoryId, 1, 1, 'https://github.com/nhdinhdev/ecommerce-platform', 'https://demo.ecommerce.nhdinh.dev', @ProjectImage1Id, '2023-01-15', '2023-06-30', 1, 1, @now, @AdminUserId);

IF NOT EXISTS (SELECT 1 FROM dbo.Projects WHERE Slug='blog-management-system')
    INSERT INTO dbo.Projects (Id, Title, Slug, Summary, Description, CategoryId, Status, Visibility, RepoUrl, DemoUrl, CoverMediaId, StartedAt, FinishedAt, Featured, SortOrder, CreatedAt, CreatedBy)
    VALUES (@Project2Id, 'Blog Management System', 'blog-management-system',
            'A comprehensive blog management system with CMS features',
            N'Full-featured blog platform with content management, user roles, commenting system, SEO optimization, and responsive design. Built with modern web technologies and best practices.',
            @WebAppCategoryId, 1, 1, 'https://github.com/nhdinhdev/blog-system', 'https://blog.nhdinh.dev', @ProjectImage2Id, '2023-07-01', '2023-11-15', 1, 2, @now, @AdminUserId);

-- Link projects with tech stacks
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTechMap WHERE ProjectId=@Project1Id AND TechId=@ReactTechId)
    INSERT INTO dbo.ProjectTechMap (ProjectId, TechId) VALUES (@Project1Id, @ReactTechId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTechMap WHERE ProjectId=@Project1Id AND TechId=@DotNetTechId)
    INSERT INTO dbo.ProjectTechMap (ProjectId, TechId) VALUES (@Project1Id, @DotNetTechId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTechMap WHERE ProjectId=@Project1Id AND TechId=@SqlServerTechId)
    INSERT INTO dbo.ProjectTechMap (ProjectId, TechId) VALUES (@Project1Id, @SqlServerTechId);

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTechMap WHERE ProjectId=@Project2Id AND TechId=@ReactTechId)
    INSERT INTO dbo.ProjectTechMap (ProjectId, TechId) VALUES (@Project2Id, @ReactTechId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTechMap WHERE ProjectId=@Project2Id AND TechId=@NodeTechId)
    INSERT INTO dbo.ProjectTechMap (ProjectId, TechId) VALUES (@Project2Id, @NodeTechId);

-- Link projects with tags
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTagMap WHERE ProjectId=@Project1Id AND TagId=@ReactTagId)
    INSERT INTO dbo.ProjectTagMap (ProjectId, TagId) VALUES (@Project1Id, @ReactTagId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTagMap WHERE ProjectId=@Project1Id AND TagId=@EcommerceTagId)
    INSERT INTO dbo.ProjectTagMap (ProjectId, TagId) VALUES (@Project1Id, @EcommerceTagId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTagMap WHERE ProjectId=@Project1Id AND TagId=@ResponsiveTagId)
    INSERT INTO dbo.ProjectTagMap (ProjectId, TagId) VALUES (@Project1Id, @ResponsiveTagId);

IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTagMap WHERE ProjectId=@Project2Id AND TagId=@ReactTagId)
    INSERT INTO dbo.ProjectTagMap (ProjectId, TagId) VALUES (@Project2Id, @ReactTagId);
IF NOT EXISTS (SELECT 1 FROM dbo.ProjectTagMap WHERE ProjectId=@Project2Id AND TagId=@ResponsiveTagId)
    INSERT INTO dbo.ProjectTagMap (ProjectId, TagId) VALUES (@Project2Id, @ResponsiveTagId);

-- Sample Blog Categories
DECLARE @TechBlogCategoryId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @TutorialCategoryId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.BlogCategories WHERE Slug='technology')
    INSERT INTO dbo.BlogCategories (Id, Name, Slug, Description, SortOrder, Visible, CreatedAt)
    VALUES (@TechBlogCategoryId, 'Technology', 'technology', 'Articles about latest technology trends', 1, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.BlogCategories WHERE Slug='tutorials')
    INSERT INTO dbo.BlogCategories (Id, Name, Slug, Description, SortOrder, Visible, CreatedAt)
    VALUES (@TutorialCategoryId, 'Tutorials', 'tutorials', 'Step-by-step programming tutorials', 2, 1, @now);

-- Sample Blog Tags
DECLARE @JavaScriptBlogTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @ReactBlogTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @WebDevTagId UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.BlogTags WHERE Slug='javascript')
    INSERT INTO dbo.BlogTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@JavaScriptBlogTagId, 'JavaScript', 'javascript', '#F7DF1E', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.BlogTags WHERE Slug='react-blog')
    INSERT INTO dbo.BlogTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@ReactBlogTagId, 'React', 'react-blog', '#61DAFB', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.BlogTags WHERE Slug='web-development')
    INSERT INTO dbo.BlogTags (Id, Name, Slug, Color, CreatedAt)
    VALUES (@WebDevTagId, 'Web Development', 'web-development', '#42A5F5', @now);

-- Sample Blog Posts
DECLARE @BlogPost1Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();
DECLARE @BlogPost2Id UNIQUEIDENTIFIER = NEWSEQUENTIALID();

IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug='getting-started-with-react-hooks')
    INSERT INTO dbo.BlogPosts (Id, Title, Slug, Excerpt, Content, CategoryId, CoverMediaId, AuthorId, Status, PublishedAt, Views, Featured, CreatedAt, CreatedBy)
    VALUES (@BlogPost1Id, 'Getting Started with React Hooks', 'getting-started-with-react-hooks',
            'Learn how to use React Hooks to manage state and side effects in functional components.',
            N'React Hooks revolutionized how we write React components. In this comprehensive guide, we''ll explore useState, useEffect, and other essential hooks...',
            @TutorialCategoryId, @CoverImageId, @AdminUserId, 1, @now, 150, 1, @now, @AdminUserId);

IF NOT EXISTS (SELECT 1 FROM dbo.BlogPosts WHERE Slug='modern-web-development-trends-2024')
    INSERT INTO dbo.BlogPosts (Id, Title, Slug, Excerpt, Content, CategoryId, CoverMediaId, AuthorId, Status, PublishedAt, Views, Featured, CreatedAt, CreatedBy)
    VALUES (@BlogPost2Id, 'Modern Web Development Trends 2024', 'modern-web-development-trends-2024',
            'Explore the latest trends and technologies shaping web development in 2024.',
            N'Web development continues to evolve rapidly. Let''s dive into the most significant trends that are shaping the industry this year...',
            @TechBlogCategoryId, @CoverImageId, @AdminUserId, 1, @now, 230, 1, @now, @AdminUserId);

-- Link blog posts with tags
IF NOT EXISTS (SELECT 1 FROM dbo.BlogPostTag WHERE PostId=@BlogPost1Id AND TagId=@ReactBlogTagId)
    INSERT INTO dbo.BlogPostTag (PostId, TagId) VALUES (@BlogPost1Id, @ReactBlogTagId);
IF NOT EXISTS (SELECT 1 FROM dbo.BlogPostTag WHERE PostId=@BlogPost1Id AND TagId=@JavaScriptBlogTagId)
    INSERT INTO dbo.BlogPostTag (PostId, TagId) VALUES (@BlogPost1Id, @JavaScriptBlogTagId);

IF NOT EXISTS (SELECT 1 FROM dbo.BlogPostTag WHERE PostId=@BlogPost2Id AND TagId=@WebDevTagId)
    INSERT INTO dbo.BlogPostTag (PostId, TagId) VALUES (@BlogPost2Id, @WebDevTagId);
IF NOT EXISTS (SELECT 1 FROM dbo.BlogPostTag WHERE PostId=@BlogPost2Id AND TagId=@JavaScriptBlogTagId)
    INSERT INTO dbo.BlogPostTag (PostId, TagId) VALUES (@BlogPost2Id, @JavaScriptBlogTagId);

-- Sample Contact Settings
IF NOT EXISTS (SELECT 1 FROM dbo.ContactSettings)
    INSERT INTO dbo.ContactSettings (Id, EmailTo, AutoReplySubject, AutoReplyBody, EnableAutoReply, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'contact@nhdinh.dev', 'Thank you for your message!',
            N'Thank you for reaching out! I''ve received your message and will get back to you as soon as possible.', 1, @now);

-- Sample Social Links
IF NOT EXISTS (SELECT 1 FROM dbo.SocialLinks WHERE Platform='GitHub')
    INSERT INTO dbo.SocialLinks (Id, Platform, Url, Icon, SortOrder, Visible, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'GitHub', 'https://github.com/nhdinhdev', 'github', 1, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.SocialLinks WHERE Platform='LinkedIn')
    INSERT INTO dbo.SocialLinks (Id, Platform, Url, Icon, SortOrder, Visible, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'LinkedIn', 'https://linkedin.com/in/nhdinh', 'linkedin', 2, 1, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.SocialLinks WHERE Platform='Twitter')
    INSERT INTO dbo.SocialLinks (Id, Platform, Url, Icon, SortOrder, Visible, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'Twitter', 'https://twitter.com/nhdinh_dev', 'twitter', 3, 1, @now);

-- Sample About Sections
IF NOT EXISTS (SELECT 1 FROM dbo.AboutSections WHERE Slug='about-me')
    INSERT INTO dbo.AboutSections (Id, Title, Slug, Content, SortOrder, Visible, SectionType, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'About Me', 'about-me',
            N'I''m a passionate full-stack developer with over 5 years of experience in building modern web applications. I love working with cutting-edge technologies and solving complex problems.',
            1, 1, 0, @now);

IF NOT EXISTS (SELECT 1 FROM dbo.AboutSections WHERE Slug='what-i-do')
    INSERT INTO dbo.AboutSections (Id, Title, Slug, Content, SortOrder, Visible, SectionType, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 'What I Do', 'what-i-do',
            N'I specialize in full-stack web development, creating responsive and user-friendly applications using modern frameworks like React, Vue.js, and backend technologies such as .NET Core and Node.js.',
            2, 1, 0, @now);

-- Sample Settings
IF NOT EXISTS (SELECT 1 FROM dbo.Settings WHERE KeyName='site_title')
    INSERT INTO dbo.Settings (Id, Scope, KeyName, Value, ValueType, Description, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 0, 'site_title', 'NH Dinh - Full Stack Developer', 0, 'Website title', @now);

IF NOT EXISTS (SELECT 1 FROM dbo.Settings WHERE KeyName='site_description')
    INSERT INTO dbo.Settings (Id, Scope, KeyName, Value, ValueType, Description, CreatedAt)
    VALUES (NEWSEQUENTIALID(), 0, 'site_description', 'Portfolio website of NH Dinh - Full Stack Developer specializing in modern web technologies', 0, 'Website description for SEO', @now);

-- Sample Analytics Data
INSERT INTO dbo.PageViews (Path, Referrer, UserAgent, CreatedAt)
VALUES 
    ('/', 'https://google.com', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', DATEADD(day, -1, @now)),
    ('/projects', 'https://google.com', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36', DATEADD(day, -2, @now)),
    ('/blog', '/', 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36', DATEADD(day, -1, @now)),
    ('/contact', '/projects', 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_7_1 like Mac OS X) AppleWebKit/605.1.15', @now);

INSERT INTO dbo.Events (EventName, Category, Label, Value, Path, CreatedAt)
VALUES 
    ('page_view', 'navigation', 'home', 1, '/', DATEADD(day, -1, @now)),
    ('project_click', 'engagement', 'ecommerce-platform', 1, '/projects', DATEADD(day, -2, @now)),
    ('contact_form_submit', 'conversion', 'contact', 1, '/contact', @now);

-- Update Stats Items with actual counts
UPDATE dbo.StatsItems SET Value = (SELECT COUNT(*) FROM dbo.Projects WHERE IsDeleted = 0) WHERE Code = 'totalProjects';
UPDATE dbo.StatsItems SET Value = (SELECT COUNT(*) FROM dbo.BlogPosts WHERE IsDeleted = 0 AND Status = 1) WHERE Code = 'totalPosts';
UPDATE dbo.StatsItems SET Value = (SELECT COUNT(*) FROM dbo.PageViews) WHERE Code = 'totalViews';

PRINT 'Schema + comprehensive seed data completed.';
GO

/* ================= OPTIONAL VIEWS / FUTURE ================= */
-- Example aggregation view (create if not exists pattern w/ dynamic SQL)
IF NOT EXISTS (SELECT 1
FROM sys.views
WHERE name = 'vw_ProjectBasic')
	EXEC('CREATE VIEW dbo.vw_ProjectBasic AS SELECT Id, Title, Slug, Status, Featured FROM dbo.Projects WHERE IsDeleted=0');
GO

/* End of script */
USE nhdinh_profile;
GO
SET NOCOUNT ON;

DECLARE @now DATETIME2 = SYSUTCDATETIME();

------------------------------------------------------------
-- MEDIA
------------------------------------------------------------
DECLARE @media_avatar UNIQUEIDENTIFIER, @media_proj1 UNIQUEIDENTIFIER, @media_proj2 UNIQUEIDENTIFIER, @media_blog1 UNIQUEIDENTIFIER;

IF NOT EXISTS (SELECT 1
FROM dbo.Media
WHERE FileName = N'avatar-default.png')
BEGIN
    INSERT INTO dbo.Media
        (FileName, OriginalName, ContentType, Extension, SizeBytes, Url, ThumbnailUrl, Width, Height, MediaType, HashSha256, StorageProvider, CreatedAt)
    VALUES
        (N'avatar-default.png', N'avatar-default.png', N'image/png', N'.png', 102400, N'/media/avatar-default.png', N'/media/avatar-default.thumb.png', 512, 512, 0, NULL, N'local', @now);
END
SELECT @media_avatar = Id
FROM dbo.Media
WHERE FileName = N'avatar-default.png';

IF NOT EXISTS (SELECT 1
FROM dbo.Media
WHERE FileName = N'proj-cover-portfolio.jpg')
BEGIN
    INSERT INTO dbo.Media
        (FileName, OriginalName, ContentType, Extension, SizeBytes, Url, ThumbnailUrl, Width, Height, MediaType, StorageProvider, CreatedAt)
    VALUES
        (N'proj-cover-portfolio.jpg', N'proj-cover-portfolio.jpg', N'image/jpeg', N'.jpg', 350000, N'/media/proj-cover-portfolio.jpg', N'/media/proj-cover-portfolio.thumb.jpg', 1600, 900, 0, N'local', @now);
END
SELECT @media_proj1 = Id
FROM dbo.Media
WHERE FileName = N'proj-cover-portfolio.jpg';

IF NOT EXISTS (SELECT 1
FROM dbo.Media
WHERE FileName = N'proj-cover-chat.jpg')
BEGIN
    INSERT INTO dbo.Media
        (FileName, OriginalName, ContentType, Extension, SizeBytes, Url, ThumbnailUrl, Width, Height, MediaType, StorageProvider, CreatedAt)
    VALUES
        (N'proj-cover-chat.jpg', N'proj-cover-chat.jpg', N'image/jpeg', N'.jpg', 420000, N'/media/proj-cover-chat.jpg', N'/media/proj-cover-chat.thumb.jpg', 1600, 900, 0, N'local', @now);
END
SELECT @media_proj2 = Id
FROM dbo.Media
WHERE FileName = N'proj-cover-chat.jpg';

IF NOT EXISTS (SELECT 1
FROM dbo.Media
WHERE FileName = N'blog-cover-sql.jpg')
BEGIN
    INSERT INTO dbo.Media
        (FileName, OriginalName, ContentType, Extension, SizeBytes, Url, ThumbnailUrl, Width, Height, MediaType, StorageProvider, CreatedAt)
    VALUES
        (N'blog-cover-sql.jpg', N'blog-cover-sql.jpg', N'image/jpeg', N'.jpg', 280000, N'/media/blog-cover-sql.jpg', N'/media/blog-cover-sql.thumb.jpg', 1600, 900, 0, N'local', @now);
END
SELECT @media_blog1 = Id
FROM dbo.Media
WHERE FileName = N'blog-cover-sql.jpg';

------------------------------------------------------------
-- ROLES & PERMISSIONS (đã seed trong schema, chỉ lấy Id)
------------------------------------------------------------
DECLARE @role_admin UNIQUEIDENTIFIER, @role_user UNIQUEIDENTIFIER;
SELECT @role_admin = Id
FROM dbo.Roles
WHERE Name = N'admin';
SELECT @role_user  = Id
FROM dbo.Roles
WHERE Name = N'user';

DECLARE @perm_dash UNIQUEIDENTIFIER, @perm_proj UNIQUEIDENTIFIER, @perm_blog UNIQUEIDENTIFIER;
SELECT @perm_dash = Id
FROM dbo.Permissions
WHERE Code = N'admin.dashboard.view';
SELECT @perm_proj = Id
FROM dbo.Permissions
WHERE Code = N'admin.projects.manage';
SELECT @perm_blog = Id
FROM dbo.Permissions
WHERE Code = N'admin.blog.manage';

-- Gán Role-Permissions
IF NOT EXISTS (SELECT 1
FROM dbo.RolePermissions
WHERE RoleId=@role_admin AND PermissionId=@perm_dash)
  INSERT INTO dbo.RolePermissions
    (RoleId, PermissionId)
VALUES(@role_admin, @perm_dash);
IF NOT EXISTS (SELECT 1
FROM dbo.RolePermissions
WHERE RoleId=@role_admin AND PermissionId=@perm_proj)
  INSERT INTO dbo.RolePermissions
    (RoleId, PermissionId)
VALUES(@role_admin, @perm_proj);
IF NOT EXISTS (SELECT 1
FROM dbo.RolePermissions
WHERE RoleId=@role_admin AND PermissionId=@perm_blog)
  INSERT INTO dbo.RolePermissions
    (RoleId, PermissionId)
VALUES(@role_admin, @perm_blog);

------------------------------------------------------------
-- USERS
------------------------------------------------------------
DECLARE @user_admin UNIQUEIDENTIFIER, @user_huy UNIQUEIDENTIFIER;

IF NOT EXISTS (SELECT 1
FROM dbo.Users
WHERE UserName = N'admin')
BEGIN
    INSERT INTO dbo.Users
        (UserName, Email, EmailConfirmed, PasswordHash, PasswordSalt, Phone, AvatarMediaId, Status, LastLoginAt, FailedAccessCount, CreatedAt)
    VALUES
        (N'admin', N'admin@example.com', 1, N'PBKDF2:10000:hash-admin', N'salt-admin', N'+0000000000', @media_avatar, 1, @now, 0, @now);
END
SELECT @user_admin = Id
FROM dbo.Users
WHERE UserName = N'admin';

IF NOT EXISTS (SELECT 1
FROM dbo.Users
WHERE UserName = N'quochuy')
BEGIN
    INSERT INTO dbo.Users
        (UserName, Email, EmailConfirmed, PasswordHash, PasswordSalt, Phone, AvatarMediaId, Status, CreatedAt)
    VALUES
        (N'quochuy', N'huy@example.com', 1, N'PBKDF2:10000:hash-huy', N'salt-huy', N'+84900000000', @media_avatar, 1, @now);
END
SELECT @user_huy = Id
FROM dbo.Users
WHERE UserName = N'quochuy';

-- USER ROLES
IF NOT EXISTS (SELECT 1
FROM dbo.UserRoles
WHERE UserId=@user_admin AND RoleId=@role_admin)
  INSERT INTO dbo.UserRoles
    (UserId, RoleId)
VALUES(@user_admin, @role_admin);
IF NOT EXISTS (SELECT 1
FROM dbo.UserRoles
WHERE UserId=@user_huy AND RoleId=@role_user)
  INSERT INTO dbo.UserRoles
    (UserId, RoleId)
VALUES(@user_huy, @role_user);

------------------------------------------------------------
-- PROFILES / ABOUT
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.Profiles
WHERE UserId=@user_huy)
BEGIN
    INSERT INTO dbo.Profiles
        (UserId, FullName, Headline, Bio, Location, WebsiteUrl, GithubUrl, LinkedinUrl, TwitterUrl, Birthday, CreatedAt)
    VALUES
        (@user_huy, N'Nguyễn Quốc Huy', N'Full-Stack Developer',
            N'Xây dựng web app với React, Node.js, Spring Boot. Yêu UI/UX và tối ưu hiệu năng.',
            N'Hồ Chí Minh, Việt Nam', N'https://nhdinh.dev', N'https://github.com/nhdinh',
            N'https://www.linkedin.com/in/nhdinh', N'https://x.com/nhdinh', '1998-08-12', @now);
END

IF NOT EXISTS (SELECT 1
FROM dbo.AboutSections
WHERE Slug=N'career-summary')
  INSERT INTO dbo.AboutSections
    (Title, Slug, Content, SortOrder, Visible, SectionType, CreatedAt)
VALUES
    (N'Tổng quan sự nghiệp', N'career-summary', N'Tôi phát triển hệ thống từ front-end đến back-end, chú trọng trải nghiệm người dùng.', 0, 1, 0, @now);

IF NOT EXISTS (SELECT 1
FROM dbo.AboutSections
WHERE Slug=N'services')
  INSERT INTO dbo.AboutSections
    (Title, Slug, Content, SortOrder, Visible, SectionType, CreatedAt)
VALUES
    (N'Dịch vụ', N'services', N'Web development, UI engineering, API & DevOps cơ bản.', 10, 1, 0, @now);

-- SKILLS
IF NOT EXISTS (SELECT 1
FROM dbo.Skills
WHERE Name=N'React')
  INSERT INTO dbo.Skills
    (Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
VALUES
    (N'React', N'Frontend', 5, 95, 0, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Skills
WHERE Name=N'TypeScript')
  INSERT INTO dbo.Skills
    (Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
VALUES
    (N'TypeScript', N'Frontend', 5, 90, 1, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Skills
WHERE Name=N'Spring Boot')
  INSERT INTO dbo.Skills
    (Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
VALUES
    (N'Spring Boot', N'Backend', 4, 85, 2, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.Skills
WHERE Name=N'SQL Server')
  INSERT INTO dbo.Skills
    (Name, Category, Level, DisplayPercent, SortOrder, IsHighlighted, CreatedAt)
VALUES
    (N'SQL Server', N'Database', 4, 80, 3, 0, @now);

-- EXPERIENCES
IF NOT EXISTS (SELECT 1
FROM dbo.Experiences
WHERE Company=N'Freelance' AND Role=N'Full-Stack Developer')
  INSERT INTO dbo.Experiences
    (Company, Role, Location, Description, StartDate, EndDate, IsCurrent, SortOrder, CreatedAt)
VALUES
    (N'Freelance', N'Full-Stack Developer', N'Hồ Chí Minh', N'Xây dựng portfolio, blog, hệ thống API và dashboard.', '2023-01-01', NULL, 1, 0, @now);

-- EDUCATIONS
IF NOT EXISTS (SELECT 1
FROM dbo.Educations
WHERE School=N'Ho Chi Minh City University' AND Degree=N'B.Eng')
  INSERT INTO dbo.Educations
    (School, Degree, FieldOfStudy, Description, StartDate, EndDate, SortOrder, CreatedAt)
VALUES
    (N'Ho Chi Minh City University', N'B.Eng', N'Software Engineering', N'Lập trình, CSDL, Hệ phân tán.', '2016-09-01', '2020-06-30', 0, @now);

------------------------------------------------------------
-- HOME SECTIONS (schema đã seed hero/featuredProjects). Bổ sung Stats
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.HomeSections
WHERE SectionKey=N'stats')
  INSERT INTO dbo.HomeSections
    (SectionKey, Title, ConfigJson, SortOrder, Enabled, CacheSeconds, CreatedAt)
VALUES
    (N'stats', N'Quick Stats', N'{"layout":"row"}', 5, 1, 300, @now);

------------------------------------------------------------
-- PROJECTS
------------------------------------------------------------
DECLARE @cat_web UNIQUEIDENTIFIER, @cat_mobile UNIQUEIDENTIFIER;

IF NOT EXISTS (SELECT 1
FROM dbo.ProjectCategories
WHERE Slug=N'web-apps')
  INSERT INTO dbo.ProjectCategories
    (Name, Slug, Description, SortOrder, Visible, CreatedAt)
VALUES
    (N'Web Apps', N'web-apps', N'Ứng dụng web', 0, 1, @now);
SELECT @cat_web = Id
FROM dbo.ProjectCategories
WHERE Slug=N'web-apps';

IF NOT EXISTS (SELECT 1
FROM dbo.ProjectCategories
WHERE Slug=N'mobile-apps')
  INSERT INTO dbo.ProjectCategories
    (Name, Slug, Description, SortOrder, Visible, CreatedAt)
VALUES
    (N'Mobile Apps', N'mobile-apps', N'Ứng dụng di động', 10, 1, @now);
SELECT @cat_mobile = Id
FROM dbo.ProjectCategories
WHERE Slug=N'mobile-apps';

DECLARE @proj_port UNIQUEIDENTIFIER, @proj_chat UNIQUEIDENTIFIER;

IF NOT EXISTS (SELECT 1
FROM dbo.Projects
WHERE Slug=N'nhdinh-portfolio')
BEGIN
    INSERT INTO dbo.Projects
        (Title, Slug, Summary, Description, CategoryId, Status, Visibility, RepoUrl, DemoUrl, CoverMediaId, StartedAt, FinishedAt, Featured, SortOrder, CreatedAt)
    VALUES
        (N'Personal Portfolio', N'nhdinh-portfolio', N'Portfolio + Blog + Admin',
            N'Hệ thống cá nhân gồm portfolio, blog, admin, analytics.', @cat_web, 1, 1,
            N'https://github.com/nhdinh/portfolio', N'https://nhdinh.dev', @media_proj1,
            '2024-05-01', NULL, 1, 0, @now);
END
SELECT @proj_port = Id
FROM dbo.Projects
WHERE Slug=N'nhdinh-portfolio';

IF NOT EXISTS (SELECT 1
FROM dbo.Projects
WHERE Slug=N'realtime-chatapp')
BEGIN
    INSERT INTO dbo.Projects
        (Title, Slug, Summary, Description, CategoryId, Status, Visibility, RepoUrl, DemoUrl, CoverMediaId, StartedAt, FinishedAt, Featured, SortOrder, CreatedAt)
    VALUES
        (N'Real-time Chat App', N'realtime-chatapp', N'Websocket/SignalR',
            N'Ứng dụng chat thời gian thực: rooms, typing, presence.', @cat_web, 1, 1,
            N'https://github.com/nhdinh/realtime-chat', NULL, @media_proj2,
            '2024-01-10', NULL, 0, 10, @now);
END
SELECT @proj_chat = Id
FROM dbo.Projects
WHERE Slug=N'realtime-chatapp';

-- PROJECT TAGS
DECLARE @tag_react UNIQUEIDENTIFIER, @tag_spring UNIQUEIDENTIFIER, @tag_sql UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTags
WHERE Slug=N'react')
  INSERT INTO dbo.ProjectTags
    (Name, Slug, Color, CreatedAt)
VALUES
    (N'React', N'react', N'#61dafb', @now);
SELECT @tag_react = Id
FROM dbo.ProjectTags
WHERE Slug=N'react';

IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTags
WHERE Slug=N'spring-boot')
  INSERT INTO dbo.ProjectTags
    (Name, Slug, Color, CreatedAt)
VALUES
    (N'Spring Boot', N'spring-boot', N'#6db33f', @now);
SELECT @tag_spring = Id
FROM dbo.ProjectTags
WHERE Slug=N'spring-boot';

IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTags
WHERE Slug=N'sql-server')
  INSERT INTO dbo.ProjectTags
    (Name, Slug, Color, CreatedAt)
VALUES
    (N'SQL Server', N'sql-server', N'#cc2927', @now);
SELECT @tag_sql = Id
FROM dbo.ProjectTags
WHERE Slug=N'sql-server';

-- PROJECT TAG MAP
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTagMap
WHERE ProjectId=@proj_port AND TagId=@tag_react)
  INSERT INTO dbo.ProjectTagMap
    (ProjectId, TagId)
VALUES
    (@proj_port, @tag_react);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTagMap
WHERE ProjectId=@proj_port AND TagId=@tag_sql)
  INSERT INTO dbo.ProjectTagMap
    (ProjectId, TagId)
VALUES
    (@proj_port, @tag_sql);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTagMap
WHERE ProjectId=@proj_chat AND TagId=@tag_react)
  INSERT INTO dbo.ProjectTagMap
    (ProjectId, TagId)
VALUES
    (@proj_chat, @tag_react);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTagMap
WHERE ProjectId=@proj_chat AND TagId=@tag_spring)
  INSERT INTO dbo.ProjectTagMap
    (ProjectId, TagId)
VALUES
    (@proj_chat, @tag_spring);

-- TECH STACKS
DECLARE @tech_react UNIQUEIDENTIFIER, @tech_node UNIQUEIDENTIFIER, @tech_spring UNIQUEIDENTIFIER, @tech_sqlsrv UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.TechStacks
WHERE Slug=N'react')
  INSERT INTO dbo.TechStacks
    (Name, Slug, Category, Icon, CreatedAt)
VALUES
    (N'React', N'react', N'Frontend', N'lucide-react', @now);
SELECT @tech_react = Id
FROM dbo.TechStacks
WHERE Slug=N'react';

IF NOT EXISTS (SELECT 1
FROM dbo.TechStacks
WHERE Slug=N'nodejs')
  INSERT INTO dbo.TechStacks
    (Name, Slug, Category, Icon, CreatedAt)
VALUES
    (N'Node.js', N'nodejs', N'Backend', N'node', @now);
SELECT @tech_node = Id
FROM dbo.TechStacks
WHERE Slug=N'nodejs';

IF NOT EXISTS (SELECT 1
FROM dbo.TechStacks
WHERE Slug=N'spring-boot')
  INSERT INTO dbo.TechStacks
    (Name, Slug, Category, Icon, CreatedAt)
VALUES
    (N'Spring Boot', N'spring-boot', N'Backend', N'spring', @now);
SELECT @tech_spring = Id
FROM dbo.TechStacks
WHERE Slug=N'spring-boot';

IF NOT EXISTS (SELECT 1
FROM dbo.TechStacks
WHERE Slug=N'sql-server')
  INSERT INTO dbo.TechStacks
    (Name, Slug, Category, Icon, CreatedAt)
VALUES
    (N'SQL Server', N'sql-server', N'Database', N'database', @now);
SELECT @tech_sqlsrv = Id
FROM dbo.TechStacks
WHERE Slug=N'sql-server';

-- PROJECT TECH MAP
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTechMap
WHERE ProjectId=@proj_port AND TechId=@tech_react)
  INSERT INTO dbo.ProjectTechMap
    (ProjectId, TechId)
VALUES
    (@proj_port, @tech_react);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTechMap
WHERE ProjectId=@proj_port AND TechId=@tech_sqlsrv)
  INSERT INTO dbo.ProjectTechMap
    (ProjectId, TechId)
VALUES
    (@proj_port, @tech_sqlsrv);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTechMap
WHERE ProjectId=@proj_chat AND TechId=@tech_react)
  INSERT INTO dbo.ProjectTechMap
    (ProjectId, TechId)
VALUES
    (@proj_chat, @tech_react);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectTechMap
WHERE ProjectId=@proj_chat AND TechId=@tech_spring)
  INSERT INTO dbo.ProjectTechMap
    (ProjectId, TechId)
VALUES
    (@proj_chat, @tech_spring);

-- PROJECT MEDIA
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectMedia
WHERE ProjectId=@proj_port AND MediaId=@media_proj1)
  INSERT INTO dbo.ProjectMedia
    (ProjectId, MediaId, Caption, SortOrder, IsPrimary, CreatedAt)
VALUES
    (@proj_port, @media_proj1, N'Portfolio Cover', 0, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.ProjectMedia
WHERE ProjectId=@proj_chat AND MediaId=@media_proj2)
  INSERT INTO dbo.ProjectMedia
    (ProjectId, MediaId, Caption, SortOrder, IsPrimary, CreatedAt)
VALUES
    (@proj_chat, @media_proj2, N'Chat App Cover', 0, 1, @now);

------------------------------------------------------------
-- BLOG
------------------------------------------------------------
DECLARE @blog_cat_tech UNIQUEIDENTIFIER, @blog_cat_life UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.BlogCategories
WHERE Slug=N'tech')
  INSERT INTO dbo.BlogCategories
    (Name, Slug, Description, SortOrder, Visible, CreatedAt)
VALUES
    (N'Tech', N'tech', N'Kỹ thuật, lập trình', 0, 1, @now);
SELECT @blog_cat_tech = Id
FROM dbo.BlogCategories
WHERE Slug=N'tech';

IF NOT EXISTS (SELECT 1
FROM dbo.BlogCategories
WHERE Slug=N'career')
  INSERT INTO dbo.BlogCategories
    (Name, Slug, Description, SortOrder, Visible, CreatedAt)
VALUES
    (N'Career', N'career', N'Kinh nghiệm nghề nghiệp', 10, 1, @now);
SELECT @blog_cat_life = Id
FROM dbo.BlogCategories
WHERE Slug=N'career';

DECLARE @blog_tag_sql UNIQUEIDENTIFIER, @blog_tag_perf UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.BlogTags
WHERE Slug=N'sql')
  INSERT INTO dbo.BlogTags
    (Name, Slug, Color, CreatedAt)
VALUES
    (N'SQL', N'sql', N'#3366cc', @now);
SELECT @blog_tag_sql = Id
FROM dbo.BlogTags
WHERE Slug=N'sql';

IF NOT EXISTS (SELECT 1
FROM dbo.BlogTags
WHERE Slug=N'performance')
  INSERT INTO dbo.BlogTags
    (Name, Slug, Color, CreatedAt)
VALUES
    (N'Performance', N'performance', N'#ffaa00', @now);
SELECT @blog_tag_perf = Id
FROM dbo.BlogTags
WHERE Slug=N'performance';

DECLARE @post_sql UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.BlogPosts
WHERE Slug=N't-sql-seed-idempotent')
BEGIN
    INSERT INTO dbo.BlogPosts
        (Title, Slug, Excerpt, Content, CategoryId, CoverMediaId, AuthorId, Status, PublishedAt, Views, Featured, AllowComments, CreatedAt)
    VALUES
        (N'Viết seed T-SQL idempotent cho dự án', N't-sql-seed-idempotent',
            N'Mẹo viết seed chạy nhiều lần không trùng.',
            N'Bài viết mô tả các mẫu IF NOT EXISTS, khóa tự nhiên, và cách lấy Id để liên kết.',
            @blog_cat_tech, @media_blog1, @user_huy, 1, DATEADD(day,-7,@now), 123, 1, 1, @now);
END
SELECT @post_sql = Id
FROM dbo.BlogPosts
WHERE Slug=N't-sql-seed-idempotent';

-- BLOG POST TAG
IF NOT EXISTS (SELECT 1
FROM dbo.BlogPostTag
WHERE PostId=@post_sql AND TagId=@blog_tag_sql)
  INSERT INTO dbo.BlogPostTag
    (PostId, TagId)
VALUES
    (@post_sql, @blog_tag_sql);
IF NOT EXISTS (SELECT 1
FROM dbo.BlogPostTag
WHERE PostId=@post_sql AND TagId=@blog_tag_perf)
  INSERT INTO dbo.BlogPostTag
    (PostId, TagId)
VALUES
    (@post_sql, @blog_tag_perf);

-- COMMENTS (1 bình luận user + 1 reply khách)
DECLARE @cmt_parent UNIQUEIDENTIFIER;
IF NOT EXISTS (SELECT 1
FROM dbo.BlogComments
WHERE PostId=@post_sql AND UserId=@user_huy AND ParentId IS NULL)
BEGIN
    INSERT INTO dbo.BlogComments
        (PostId, ParentId, UserId, GuestName, GuestEmail, Content, Status, CreatedAt)
    VALUES
        (@post_sql, NULL, @user_huy, NULL, NULL, N'Cảm ơn bạn đã đọc!', 1, @now);
END
SELECT TOP 1
    @cmt_parent = Id
FROM dbo.BlogComments
WHERE PostId=@post_sql AND ParentId IS NULL
ORDER BY CreatedAt;

IF NOT EXISTS (SELECT 1
FROM dbo.BlogComments
WHERE PostId=@post_sql AND ParentId=@cmt_parent AND GuestEmail=N'guest@example.com')
BEGIN
    INSERT INTO dbo.BlogComments
        (PostId, ParentId, UserId, GuestName, GuestEmail, Content, Status, CreatedAt)
    VALUES
        (@post_sql, @cmt_parent, NULL, N'Guest', N'guest@example.com', N'Bài viết rất hữu ích!', 1, DATEADD(minute,5,@now));
END

------------------------------------------------------------
-- CONTACT
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.ContactSettings)
  INSERT INTO dbo.ContactSettings
    (EmailTo, AutoReplySubject, AutoReplyBody, EnableAutoReply, CreatedAt)
VALUES
    (N'contact@nhdinh.dev', N'Cảm ơn đã liên hệ', N'Chúng tôi sẽ phản hồi sớm nhất có thể.', 1, @now);

IF NOT EXISTS (SELECT 1
FROM dbo.ContactMessages
WHERE Email=N'test@example.com' AND Subject=N'Xin chào')
  INSERT INTO dbo.ContactMessages
    (Name, Email, Subject, Message, Status, SourceIp, UserAgent, Replied, CreatedAt)
VALUES
    (N'Khách', N'test@example.com', N'Xin chào', N'Mình muốn hợp tác dự án.', 0, N'127.0.0.1', N'Chrome', 0, @now);

-- SOCIAL LINKS
IF NOT EXISTS (SELECT 1
FROM dbo.SocialLinks
WHERE Platform=N'GitHub')
  INSERT INTO dbo.SocialLinks
    (Platform, Url, Icon, SortOrder, Visible, CreatedAt)
VALUES
    (N'GitHub', N'https://github.com/nhdinh', N'github', 0, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.SocialLinks
WHERE Platform=N'LinkedIn')
  INSERT INTO dbo.SocialLinks
    (Platform, Url, Icon, SortOrder, Visible, CreatedAt)
VALUES
    (N'LinkedIn', N'https://www.linkedin.com/in/nhdinh', N'linkedin', 1, 1, @now);
IF NOT EXISTS (SELECT 1
FROM dbo.SocialLinks
WHERE Platform=N'X')
  INSERT INTO dbo.SocialLinks
    (Platform, Url, Icon, SortOrder, Visible, CreatedAt)
VALUES
    (N'X', N'https://x.com/nhdinh', N'x', 2, 1, @now);

------------------------------------------------------------
-- ANALYTICS
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.PageViews
WHERE Path=N'/')
  INSERT INTO dbo.PageViews
    (Path, Referrer, UserAgent, IpHash, CountryCode, CreatedAt)
VALUES
    (N'/', N'https://google.com', N'Chrome', NULL, N'VN', DATEADD(day,-1,@now));

IF NOT EXISTS (SELECT 1
FROM dbo.PageViews
WHERE Path=N'/projects')
  INSERT INTO dbo.PageViews
    (Path, Referrer, UserAgent, IpHash, CountryCode, CreatedAt)
VALUES
    (N'/projects', N'https://github.com', N'Chrome', NULL, N'VN', @now);

IF NOT EXISTS (SELECT 1
FROM dbo.Events
WHERE EventName=N'cta_click' AND Path=N'/')
  INSERT INTO dbo.Events
    (EventName, Category, Label, Value, Path, UserId, CreatedAt)
VALUES
    (N'cta_click', N'homepage', N'hire_me', 1, N'/', @user_huy, @now);

IF NOT EXISTS (SELECT 1
FROM dbo.DailyAggregates
WHERE [Date]=CAST(@now AS DATE) AND Metric=N'pageviews')
  INSERT INTO dbo.DailyAggregates
    ([Date], Metric, Value)
VALUES
    (CAST(@now AS DATE), N'pageviews', 2);

------------------------------------------------------------
-- SETTINGS
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.Settings
WHERE Scope=0 AND UserId IS NULL AND KeyName=N'site.title')
  INSERT INTO dbo.Settings
    (Scope, UserId, KeyName, Value, ValueType, Description, IsEncrypted, CreatedAt)
VALUES
    (0, NULL, N'site.title', N'nhdinh.dev', 0, N'Tiêu đề trang web', 0, @now);

IF NOT EXISTS (SELECT 1
FROM dbo.Settings
WHERE Scope=1 AND UserId=@user_huy AND KeyName=N'theme')
  INSERT INTO dbo.Settings
    (Scope, UserId, KeyName, Value, ValueType, Description, IsEncrypted, CreatedAt)
VALUES
    (1, @user_huy, N'theme', N'dark', 0, N'Giao diện ưa thích', 0, @now);

------------------------------------------------------------
-- AUDIT LOGS
------------------------------------------------------------
IF NOT EXISTS (SELECT 1
FROM dbo.AuditLogs
WHERE Action=N'SEED_COMPLETE')
  INSERT INTO dbo.AuditLogs
    (CorrelationId, UserId, Action, EntityName, EntityId, ChangesJson, IpAddress, UserAgent, CreatedAt)
VALUES
    (NEWID(), @user_admin, N'SEED_COMPLETE', N'SeedScript', N'v1', N'{"status":"ok"}', N'127.0.0.1', N'SQL', @now);

PRINT '✅ Seed data inserted/ensured for all tables.';
GO
