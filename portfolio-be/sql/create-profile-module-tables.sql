-- ============================================================================
-- Profile Module Tables - ProfileInfo, ProfileTag, Experience
-- Created: August 19, 2025
-- Description: Database schema for user profile information management
-- ============================================================================

-- ============================================================================
-- 1. PROFILE INFO TABLE
-- ============================================================================
-- Thông tin cơ bản của người dùng/profile
CREATE TABLE dbo.ProfileInfo (
    ProfileId  UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    FullName   NVARCHAR(100),
    Title      NVARCHAR(100),
    Bio        NVARCHAR(MAX),
    AvatarUrl  NVARCHAR(512),
    CreatedAt  DATETIME2 DEFAULT SYSUTCDATETIME(),
    RowVer     ROWVERSION
);

-- Indexes for ProfileInfo
CREATE INDEX IX_ProfileInfo_FullName ON dbo.ProfileInfo(FullName);
CREATE INDEX IX_ProfileInfo_CreatedAt ON dbo.ProfileInfo(CreatedAt DESC);

-- Comments for ProfileInfo
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng thông tin cơ bản của profile/người dùng',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID profile (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'ProfileId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Họ và tên đầy đủ',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'FullName';

EXEC sp_addextendedproperty 
    'MS_Description', 'Chức danh/vị trí công việc',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'Title';

EXEC sp_addextendedproperty 
    'MS_Description', 'Giới thiệu bản thân',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'Bio';

EXEC sp_addextendedproperty 
    'MS_Description', 'URL ảnh đại diện',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'AvatarUrl';

EXEC sp_addextendedproperty 
    'MS_Description', 'Ngày tạo profile',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'CreatedAt';

EXEC sp_addextendedproperty 
    'MS_Description', 'Row version cho optimistic concurrency',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileInfo', 'COLUMN', 'RowVer';

-- ============================================================================
-- 2. PROFILE TAG TABLE
-- ============================================================================
-- Các tag/kỹ năng của profile
CREATE TABLE dbo.ProfileTag (
    TagId     UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ProfileId UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProfileInfo(ProfileId) ON DELETE CASCADE,
    Label     NVARCHAR(100),
    SortOrder INT DEFAULT 1,
    RowVer    ROWVERSION
);

-- Indexes for ProfileTag
CREATE INDEX IX_ProfileTag_ProfileId ON dbo.ProfileTag(ProfileId);
CREATE INDEX IX_ProfileTag_SortOrder ON dbo.ProfileTag(SortOrder);
CREATE INDEX IX_ProfileTag_ProfileId_SortOrder ON dbo.ProfileTag(ProfileId, SortOrder);

-- Comments for ProfileTag
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng lưu các tag/kỹ năng của profile',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID tag (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag', 'COLUMN', 'TagId';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID profile (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag', 'COLUMN', 'ProfileId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Nhãn/tên của tag',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag', 'COLUMN', 'Label';

EXEC sp_addextendedproperty 
    'MS_Description', 'Thứ tự sắp xếp hiển thị',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag', 'COLUMN', 'SortOrder';

EXEC sp_addextendedproperty 
    'MS_Description', 'Row version cho optimistic concurrency',
    'SCHEMA', 'dbo', 'TABLE', 'ProfileTag', 'COLUMN', 'RowVer';

-- ============================================================================
-- 3. EXPERIENCE TABLE
-- ============================================================================
-- Kinh nghiệm làm việc của profile
CREATE TABLE dbo.Experience (
    ExpId      UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    ProfileId  UNIQUEIDENTIFIER NOT NULL FOREIGN KEY REFERENCES dbo.ProfileInfo(ProfileId) ON DELETE CASCADE,
    Position   NVARCHAR(100),
    Company    NVARCHAR(100),
    Description NVARCHAR(MAX),
    StartYear  INT,
    EndYear    INT NULL,
    IsCurrent  BIT DEFAULT 0,
    SortOrder  INT DEFAULT 1,
    RowVer     ROWVERSION
);

-- Indexes for Experience
CREATE INDEX IX_Experience_ProfileId ON dbo.Experience(ProfileId);
CREATE INDEX IX_Experience_StartYear ON dbo.Experience(StartYear DESC);
CREATE INDEX IX_Experience_ProfileId_SortOrder ON dbo.Experience(ProfileId, SortOrder);
CREATE INDEX IX_Experience_IsCurrent ON dbo.Experience(IsCurrent);

-- Comments for Experience
EXEC sp_addextendedproperty 
    'MS_Description', 'Bảng lưu kinh nghiệm làm việc của profile',
    'SCHEMA', 'dbo', 'TABLE', 'Experience';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID kinh nghiệm (Primary Key)',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'ExpId';

EXEC sp_addextendedproperty 
    'MS_Description', 'ID profile (Foreign Key)',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'ProfileId';

EXEC sp_addextendedproperty 
    'MS_Description', 'Vị trí công việc',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'Position';

EXEC sp_addextendedproperty 
    'MS_Description', 'Tên công ty',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'Company';

EXEC sp_addextendedproperty 
    'MS_Description', 'Mô tả công việc và thành tích',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'Description';

EXEC sp_addextendedproperty 
    'MS_Description', 'Năm bắt đầu làm việc',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'StartYear';

EXEC sp_addextendedproperty 
    'MS_Description', 'Năm kết thúc làm việc (NULL nếu đang làm)',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'EndYear';

EXEC sp_addextendedproperty 
    'MS_Description', 'Có đang làm việc hiện tại không',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'IsCurrent';

EXEC sp_addextendedproperty 
    'MS_Description', 'Thứ tự sắp xếp hiển thị',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'SortOrder';

EXEC sp_addextendedproperty 
    'MS_Description', 'Row version cho optimistic concurrency',
    'SCHEMA', 'dbo', 'TABLE', 'Experience', 'COLUMN', 'RowVer';

-- ============================================================================
-- SAMPLE DATA INSERT
-- ============================================================================

-- Insert sample ProfileInfo
INSERT INTO dbo.ProfileInfo (FullName, Title, Bio, AvatarUrl) VALUES
('Nguyễn Hoàng Dình', 'Full Stack Developer', 'Passionate software developer with 5+ years of experience in web development, specializing in React, Spring Boot, and cloud technologies.', '/assets/images/avatar.jpg');

-- Get the ProfileId for inserting related records
DECLARE @ProfileId UNIQUEIDENTIFIER = (SELECT TOP 1 ProfileId FROM dbo.ProfileInfo WHERE FullName = 'Nguyễn Hoàng Dình');

-- Insert sample ProfileTags
INSERT INTO dbo.ProfileTag (ProfileId, Label, SortOrder) VALUES
(@ProfileId, 'Java', 1),
(@ProfileId, 'Spring Boot', 2),
(@ProfileId, 'React', 3),
(@ProfileId, 'TypeScript', 4),
(@ProfileId, 'Docker', 5),
(@ProfileId, 'AWS', 6),
(@ProfileId, 'SQL Server', 7),
(@ProfileId, 'Git', 8);

-- Insert sample Experience
INSERT INTO dbo.Experience (ProfileId, Position, Company, Description, StartYear, EndYear, IsCurrent, SortOrder) VALUES
(@ProfileId, 'Senior Full Stack Developer', 'Tech Solutions Inc.', 'Led development of web applications using React and Spring Boot. Implemented microservices architecture and deployed on AWS cloud platform.', 2022, NULL, 1, 1),
(@ProfileId, 'Full Stack Developer', 'Digital Innovation Co.', 'Developed and maintained multiple web applications. Collaborated with cross-functional teams to deliver high-quality software solutions.', 2020, 2022, 0, 2),
(@ProfileId, 'Junior Developer', 'StartUp Tech', 'Started career as junior developer, worked on frontend development using React and backend APIs with Spring Boot.', 2019, 2020, 0, 3);
