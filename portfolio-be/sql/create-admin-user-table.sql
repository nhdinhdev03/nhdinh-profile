-- AdminUser table creation script
-- Tài khoản admin dùng để login

CREATE TABLE dbo.AdminUser (
    UserId        UNIQUEIDENTIFIER PRIMARY KEY DEFAULT NEWSEQUENTIALID(),
    PhoneNumber   NVARCHAR(20) NOT NULL UNIQUE,
    Username      NVARCHAR(50) UNIQUE NULL,
    PasswordHash  NVARCHAR(256) NOT NULL,
    FullName      NVARCHAR(100) NULL,
    CreatedAt     DATETIME2 NOT NULL DEFAULT SYSUTCDATETIME(),
    IsActive      BIT DEFAULT 1,
    RowVer        ROWVERSION
);

-- Create indexes for better performance
CREATE INDEX IX_AdminUser_PhoneNumber ON dbo.AdminUser(PhoneNumber);
CREATE INDEX IX_AdminUser_Username ON dbo.AdminUser(Username);
CREATE INDEX IX_AdminUser_IsActive ON dbo.AdminUser(IsActive);
CREATE INDEX IX_AdminUser_CreatedAt ON dbo.AdminUser(CreatedAt);

-- Create composite index for login queries
CREATE INDEX IX_AdminUser_Login ON dbo.AdminUser(PhoneNumber, IsActive) INCLUDE (Username, PasswordHash, FullName);
CREATE INDEX IX_AdminUser_Username_Login ON dbo.AdminUser(Username, IsActive) INCLUDE (PhoneNumber, PasswordHash, FullName);

-- Add check constraints
ALTER TABLE dbo.AdminUser ADD CONSTRAINT CK_AdminUser_PhoneNumber_Format 
    CHECK (PhoneNumber LIKE '+%' AND LEN(PhoneNumber) BETWEEN 10 AND 20 OR 
           PhoneNumber NOT LIKE '+%' AND LEN(PhoneNumber) BETWEEN 10 AND 15);

ALTER TABLE dbo.AdminUser ADD CONSTRAINT CK_AdminUser_Username_Format 
    CHECK (Username IS NULL OR (LEN(Username) >= 3 AND Username NOT LIKE '%[^a-zA-Z0-9_]%'));

ALTER TABLE dbo.AdminUser ADD CONSTRAINT CK_AdminUser_PasswordHash_NotEmpty 
    CHECK (LEN(PasswordHash) > 0);

-- Insert sample admin user (password: Admin123!)
-- Password hash for 'Admin123!' using BCrypt
INSERT INTO dbo.AdminUser (PhoneNumber, Username, PasswordHash, FullName, IsActive)
VALUES 
    ('+84123456789', 'admin', '$2a$10$example.hash.here.replace.with.actual.bcrypt.hash', 'System Administrator', 1);

-- Add comments
EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Admin user accounts for portfolio management system authentication', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Unique identifier for admin user', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'UserId';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Phone number for login (unique)', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'PhoneNumber';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Optional username for login (unique)', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'Username';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'BCrypt hashed password', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'PasswordHash';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Full name of admin user', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'FullName';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Account creation timestamp', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'CreatedAt';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Account active status (1=active, 0=inactive)', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'IsActive';

EXEC sp_addextendedproperty 
    @name = N'MS_Description', 
    @value = N'Row version for optimistic concurrency control', 
    @level0type = N'SCHEMA', @level0name = N'dbo', 
    @level1type = N'TABLE', @level1name = N'AdminUser', 
    @level2type = N'COLUMN', @level2name = N'RowVer';
