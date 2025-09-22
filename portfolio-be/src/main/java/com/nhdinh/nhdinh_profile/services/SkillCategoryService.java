package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.SkillCategory.SkillCategory;
import com.nhdinh.nhdinh_profile.modules.SkillCategory.SkillCategoryDAO;

@Service
@Transactional
public class SkillCategoryService {
    
    private final SkillCategoryDAO skillCategoryDAO;
    
    public SkillCategoryService(SkillCategoryDAO skillCategoryDAO) {
        this.skillCategoryDAO = skillCategoryDAO;
    }
    
    /**
     * Lấy tất cả categories active
     */
    public List<SkillCategory> findAllActive() {
        return skillCategoryDAO.findAllActive();
    }
    
    /**
     * Tìm category theo tên
     */
    public Optional<SkillCategory> findByName(String name) {
        return skillCategoryDAO.findByName(name);
    }
    
    /**
     * Kiểm tra category có tồn tại theo tên
     */
    public boolean existsByName(String name) {
        return skillCategoryDAO.existsByName(name);
    }
    
    /**
     * Lấy categories có skills
     */
    public List<SkillCategory> findCategoriesWithActiveSkills() {
        return skillCategoryDAO.findCategoriesWithActiveSkills();
    }
    
    /**
     * Đếm số skills trong category
     */
    public Long countActiveSkillsInCategory(UUID categoryId) {
        return skillCategoryDAO.countActiveSkillsInCategory(categoryId);
    }
    
    /**
     * Lưu SkillCategory
     */
    public SkillCategory save(SkillCategory skillCategory) {
        return skillCategoryDAO.save(skillCategory);
    }
    
    /**
     * Tìm SkillCategory theo ID
     */
    public Optional<SkillCategory> findById(UUID categoryId) {
        return skillCategoryDAO.findById(categoryId);
    }
    
    /**
     * Xóa SkillCategory theo ID
     */
    public void deleteById(UUID categoryId) {
        skillCategoryDAO.deleteById(categoryId);
    }
    
    /**
     * Lấy tất cả SkillCategories
     */
    public List<SkillCategory> findAll() {
        return skillCategoryDAO.findAll();
    }
}



