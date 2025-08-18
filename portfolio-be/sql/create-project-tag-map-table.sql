-- Tạo bảng ProjectTagMap để liên kết nhiều tag cho một project (nhiều-nhiều)
CREATE TABLE dbo.ProjectTagMap (
    ProjectId  UNIQUEIDENTIFIER NOT NULL,
    TagId      UNIQUEIDENTIFIER NOT NULL,
    SortOrder  INT DEFAULT 1,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE
);

-- Tạo index để tối ưu hóa truy vấn
CREATE INDEX IX_ProjectTagMap_ProjectId ON dbo.ProjectTagMap(ProjectId);
CREATE INDEX IX_ProjectTagMap_TagId ON dbo.ProjectTagMap(TagId);
CREATE INDEX IX_ProjectTagMap_SortOrder ON dbo.ProjectTagMap(ProjectId, SortOrder);

-- Thêm constraint để đảm bảo SortOrder >= 1
ALTER TABLE dbo.ProjectTagMap ADD CONSTRAINT CK_ProjectTagMap_SortOrder CHECK (SortOrder >= 1);

-- Thêm comment cho bảng và các cột
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

-- Insert một số dữ liệu mẫu (tùy chọn)
-- Giả sử đã có Project và ProjectTag được tạo trước đó
/*
INSERT INTO dbo.ProjectTagMap (ProjectId, TagId, SortOrder) VALUES
-- Project 1: Portfolio Website
('project-id-1', 'react-tag-id', 1),
('project-id-1', 'tailwindcss-tag-id', 2),
('project-id-1', 'nodejs-tag-id', 3),
('project-id-1', 'express-tag-id', 4),

-- Project 2: E-commerce App
('project-id-2', 'react-tag-id', 1),
('project-id-2', 'mongodb-tag-id', 2),
('project-id-2', 'docker-tag-id', 3),
('project-id-2', 'aws-tag-id', 4);
*/
