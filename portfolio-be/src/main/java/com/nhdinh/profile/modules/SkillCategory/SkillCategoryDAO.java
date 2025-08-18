package com.nhdinh.profile.modules.SkillCategory;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

import com.nhdinh.profile.config.DatabaseConnection;

/**
 * SkillCategory Data Access Object
 * Handles database operations for SkillCategory entities
 */
public class SkillCategoryDAO {
    
    private Connection connection;
    
    public SkillCategoryDAO() {
        this.connection = DatabaseConnection.getConnection();
    }
    
    /**
     * Get all active skill categories ordered by sortOrder
     */
    public List<SkillCategory> getAllActiveCategories() throws SQLException {
        String sql = "SELECT CategoryId, Name, IconUrl, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.SkillCategory " +
                    "WHERE IsActive = 1 " +
                    "ORDER BY SortOrder ASC, Name ASC";
        
        List<SkillCategory> categories = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                SkillCategory category = new SkillCategory();
                category.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                category.setName(rs.getString("Name"));
                category.setIconUrl(rs.getString("IconUrl"));
                category.setSortOrder(rs.getInt("SortOrder"));
                category.setActive(rs.getBoolean("IsActive"));
                category.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                categories.add(category);
            }
        }
        
        return categories;
    }
    
    /**
     * Get all skill categories (including inactive)
     */
    public List<SkillCategory> getAllCategories() throws SQLException {
        String sql = "SELECT CategoryId, Name, IconUrl, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.SkillCategory " +
                    "ORDER BY SortOrder ASC, Name ASC";
        
        List<SkillCategory> categories = new ArrayList<>();
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            while (rs.next()) {
                SkillCategory category = new SkillCategory();
                category.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                category.setName(rs.getString("Name"));
                category.setIconUrl(rs.getString("IconUrl"));
                category.setSortOrder(rs.getInt("SortOrder"));
                category.setActive(rs.getBoolean("IsActive"));
                category.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                categories.add(category);
            }
        }
        
        return categories;
    }
    
    /**
     * Get skill category by ID
     */
    public SkillCategory getCategoryById(UUID categoryId) throws SQLException {
        String sql = "SELECT CategoryId, Name, IconUrl, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.SkillCategory " +
                    "WHERE CategoryId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, categoryId.toString());
            
            try (ResultSet rs = stmt.executeQuery()) {
                if (rs.next()) {
                    SkillCategory category = new SkillCategory();
                    category.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                    category.setName(rs.getString("Name"));
                    category.setIconUrl(rs.getString("IconUrl"));
                    category.setSortOrder(rs.getInt("SortOrder"));
                    category.setActive(rs.getBoolean("IsActive"));
                    category.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                    
                    return category;
                }
            }
        }
        
        return null;
    }
    
    /**
     * Create new skill category
     */
    public SkillCategory createCategory(SkillCategory category) throws SQLException {
        String sql = "INSERT INTO dbo.SkillCategory (Name, IconUrl, SortOrder, IsActive) " +
                    "VALUES (?, ?, ?, ?)";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getIconUrl());
            stmt.setInt(3, category.getSortOrder());
            stmt.setBoolean(4, category.isActive());
            
            int rowsAffected = stmt.executeUpdate();
            
            if (rowsAffected > 0) {
                // Get the created category with generated ID
                return getLatestCategory();
            }
        }
        
        return null;
    }
    
    /**
     * Update skill category
     */
    public boolean updateCategory(SkillCategory category) throws SQLException {
        String sql = "UPDATE dbo.SkillCategory " +
                    "SET Name = ?, IconUrl = ?, SortOrder = ?, IsActive = ? " +
                    "WHERE CategoryId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, category.getName());
            stmt.setString(2, category.getIconUrl());
            stmt.setInt(3, category.getSortOrder());
            stmt.setBoolean(4, category.isActive());
            stmt.setString(5, category.getCategoryId().toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Delete skill category (soft delete - set IsActive to false)
     */
    public boolean deleteCategory(UUID categoryId) throws SQLException {
        String sql = "UPDATE dbo.SkillCategory SET IsActive = 0 WHERE CategoryId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, categoryId.toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Hard delete skill category
     */
    public boolean hardDeleteCategory(UUID categoryId) throws SQLException {
        String sql = "DELETE FROM dbo.SkillCategory WHERE CategoryId = ?";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql)) {
            stmt.setString(1, categoryId.toString());
            
            int rowsAffected = stmt.executeUpdate();
            return rowsAffected > 0;
        }
    }
    
    /**
     * Get the latest created category
     */
    private SkillCategory getLatestCategory() throws SQLException {
        String sql = "SELECT TOP 1 CategoryId, Name, IconUrl, SortOrder, IsActive, CreatedAt " +
                    "FROM dbo.SkillCategory " +
                    "ORDER BY CreatedAt DESC";
        
        try (PreparedStatement stmt = connection.prepareStatement(sql);
             ResultSet rs = stmt.executeQuery()) {
            
            if (rs.next()) {
                SkillCategory category = new SkillCategory();
                category.setCategoryId(UUID.fromString(rs.getString("CategoryId")));
                category.setName(rs.getString("Name"));
                category.setIconUrl(rs.getString("IconUrl"));
                category.setSortOrder(rs.getInt("SortOrder"));
                category.setActive(rs.getBoolean("IsActive"));
                category.setCreatedAt(rs.getTimestamp("CreatedAt").toLocalDateTime());
                
                return category;
            }
        }
        
        return null;
    }
}
