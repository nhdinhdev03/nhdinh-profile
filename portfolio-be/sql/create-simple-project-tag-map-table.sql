-- Alternative: Simple ProjectTagMap table without SortOrder (for basic @ManyToMany mapping)
CREATE TABLE dbo.ProjectTagMap (
    ProjectId  UNIQUEIDENTIFIER NOT NULL,
    TagId      UNIQUEIDENTIFIER NOT NULL,
    PRIMARY KEY (ProjectId, TagId),
    FOREIGN KEY (ProjectId) REFERENCES dbo.Project(ProjectId) ON DELETE CASCADE,
    FOREIGN KEY (TagId) REFERENCES dbo.ProjectTag(TagId) ON DELETE CASCADE
);

-- Tạo index để tối ưu hóa truy vấn
CREATE INDEX IX_ProjectTagMap_ProjectId ON dbo.ProjectTagMap(ProjectId);
CREATE INDEX IX_ProjectTagMap_TagId ON dbo.ProjectTagMap(TagId);

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
