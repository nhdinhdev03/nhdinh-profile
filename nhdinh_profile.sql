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

PRINT 'Schema + seed completed.';
GO

/* ================= OPTIONAL VIEWS / FUTURE ================= */
-- Example aggregation view (create if not exists pattern w/ dynamic SQL)
IF NOT EXISTS (SELECT 1
FROM sys.views
WHERE name = 'vw_ProjectBasic')
	EXEC('CREATE VIEW dbo.vw_ProjectBasic AS SELECT Id, Title, Slug, Status, Featured FROM dbo.Projects WHERE IsDeleted=0');
GO

/* End of script */
