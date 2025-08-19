package com.nhdinh.profile.modules.Skill;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;


/**
 * Skill Data Access Object
 * Handles database operations for Skill entities
 */
public class SkillDAO {
    
    private Connection connection;
    
    // public SkillDAO() {
    //     this.connection = DatabaseConnection.getConnection();
    // }
    
    /**
     * Get all active skills ordered by sortOrder
     */
    public List<Skill> getAllActiveSkills() throws SQLException {
        String sql = "SELECT s.SkillId, s.CategoryId, s.Name, s.SortOrder, s.IsActive, s.CreatedAt, " +
                    "sc.Name as CategoryName " +
                    "FROM dbo.Skill s " +
                    "LEFT JOIN dbo.SkillCategory sc ON s.CategoryId = sc.CategoryId " +
                    "WHERE s.IsActive = 1 " +
                    "ORDER BY sc.SortOrder ASC, s.SortOrder ASC, s.Name ASC";
        
        List<Skill> skills = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Skill skill = new Skill();
                skill.setSkillId(UUID.fromString(rs.getString("SkillId")));
                skill.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                skill.setName(rs.getString("Name"));
                skill.setSortOrder(rs.getInt("SortOrder"));
                skill.setActive(rs.getBoolean("IsActive"));
                skill.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                skills.add(skill);
            }
        }
        
        return skills;
    }
    
    /**
     * Get all skills by category ID
     */
    public List<Skill> getSkillsByCategory(UUID categoryId) throws SQLException {
        String sql = "SELECT SkillId, CategoryId, Name, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.Skill " +
                    "WHERE CategoryId = ? AND IsActive = 1 " +
                    "ORDER BY SortOrder ASC, Name ASC";
        
        List<Skill> skills = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, categoryId.toString());
            
            try (ResultSet rs = stmt.executeQuery()) {
                while (rs.next()) {
                    Skill skill = new Skill();
                    skill.setSkillId(UUID.fromString(rs.getString("SkillId")));
                    skill.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                    skill.setName(rs.getString("Name"));
                    skill.setSortOrder(rs.getInt("SortOrder"));
                    skill.setActive(rs.getBoolean("IsActive"));
                    skill.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                    
                    skills.add(skill);
                }
            }
        }
        
        return skills;
    }
    
    /**
     * Get all skills (including inactive)
     */
    public List<Skill> getAllSkills() throws SQLException {
        String sql = "SELECT s.SkillId, s.CategoryId, s.Name, s.SortOrder, s.IsActive, s.CreatedAt, " +
                    "sc.Name as CategoryName " +
                    "FROM dbo.Skill s " +
                    "LEFT JOIN dbo.SkillCategory sc ON s.CategoryId = sc.CategoryId " +
                    "ORDER BY sc.SortOrder ASC, s.SortOrder ASC, s.Name ASC";
        
        List<Skill> skills = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                Skill skill = new Skill();
                skill.setSkillId(UUID.fromString(rs.getString("SkillId")));
                skill.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                skill.setName(rs.getString("Name"));
                skill.setSortOrder(rs.getInt("SortOrder"));
                skill.setActive(rs.getBoolean("IsActive"));
                skill.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                skills.add(skill);
            }
        }
        
        return skills;
    }
    
    /**
     * Get skill by ID
     */
    public Skill getSkillById(UUID skillId) throws SQLException {
        String sql = "SELECT SkillId, CategoryId, Name, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.Skill " +
                    "WHERE SkillId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, skillId.toString());
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    Skill skill = new Skill();
                    skill.setSkillId(UUID.fromString(rs.getString("SkillId")));
                    skill.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                    skill.setName(rs.getString("Name"));
                    skill.setSortOrder(rs.getInt("SortOrder"));
                    skill.setActive(rs.getBoolean("IsActive"));
                    skill.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                    
                    return skill;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Create new skill
     */
    public Skill createSkill(Skill skill) throws SQLException {
        String sql = "INSERT INTO dbo.Skill (CategoryId, Name, SortOrder, IsActive) " +
                    "VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, skill.getCategoryId().toString());
            stmt.setString(2, skill.getName());
            stmt.setInt(3, skill.getSortOrder());
            stmt.setBoolean(4, skill.isActive());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                // Get the created skill with generated ID
                return getLatestSkill();
            }
        }
        
        return null;
    }
    
    /**
     * Update skill
     */
    public boolean updateSkill(Skill skill) throws SQLException {
        String sql = "UPDATE dbo.Skill " +
                    "SET CategoryId = ?, Name = ?, SortOrder = ?, IsActive = ? " +
                    "WHERE SkillId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, skill.getCategoryId().toString());
            stmt.setString(2, skill.getName());
            stmt.setInt(3, skill.getSortOrder());
            stmt.setBoolean(4, skill.isActive());
            stmt.setString(5, skill.getSkillId().toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Delete skill (soft delete - set IsActive to false)
     */
    public boolean deleteSkill(UUID skillId) throws SQLException {
        String sql = "UPDATE dbo.Skill SET IsActive = 0 WHERE SkillId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, skillId.toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Hard delete skill
     */
    public boolean hardDeleteSkill(UUID skillId) throws SQLException {
        String sql = "DELETE FROM dbo.Skill WHERE SkillId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, skillId.toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Get the latest created skill
     */
    private Skill getLatestSkill() throws SQLException {
        String sql = "SELECT TOP 1 SkillId, CategoryId, Name, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.Skill " +
                    "ORDER BY CreatedAt DESC";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            if (rs.next()) {
                Skill skill = new Skill();
                skill.setSkillId(UUID.fromString(rs.getString("SkillId")));
                skill.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                skill.setName(rs.getString("Name"));
                skill.setSortOrder(rs.getInt("SortOrder"));
                skill.setActive(rs.getBoolean("IsActive"));
                skill.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                return skill;
            }
        }
        
        return null;
    }
}
