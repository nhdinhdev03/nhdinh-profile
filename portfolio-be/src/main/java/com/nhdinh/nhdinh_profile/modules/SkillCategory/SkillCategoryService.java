package com.nhdinh.nhdinh_profile.modules.SkillCategory;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.SkillCategoryRepository;

@Service
@Transactional
public class SkillCategoryService {
    
    private final SkillCategoryRepository skillCategoryRepository;
    
    public SkillCategoryService(SkillCategoryRepository skillCategoryRepository) {
        this.skillCategoryRepository = skillCategoryRepository;
    }
    
    /**
     * Lấy tất cả categories active
     */
    public List<SkillCategory> findAllActive() {
        return skillCategoryRepository.findAllActive();
    }
    
    /**
     * Tìm category theo tên
     */
    public Optional<SkillCategory> findByName(String name) {
        return skillCategoryRepository.findByName(name);
    }
    
    /**
     * Kiểm tra category có tồn tại theo tên
     */
    public boolean existsByName(String name) {
        return skillCategoryRepository.existsByName(name);
    }
    
    /**
     * Lấy categories có skills
     */
    public List<SkillCategory> findCategoriesWithActiveSkills() {
        return skillCategoryRepository.findCategoriesWithActiveSkills();
    }
    
    /**
     * Đếm số skills trong category
     */
    public Long countActiveSkillsInCategory(UUID categoryId) {
        return skillCategoryRepository.countActiveSkillsInCategory(categoryId);
    }
    
    /**
     * Lưu SkillCategory
     */
    public SkillCategory save(SkillCategory skillCategory) {
        return skillCategoryRepository.save(skillCategory);
    }
    
    /**
     * Tìm SkillCategory theo ID
     */
    public Optional<SkillCategory> findById(UUID categoryId) {
        return skillCategoryRepository.findById(categoryId);
    }
    
    /**
     * Xóa SkillCategory theo ID
     */
    public void deleteById(UUID categoryId) {
        skillCategoryRepository.deleteById(categoryId);
    }
    
    /**
     * Lấy tất cả SkillCategories
     */
    public List<SkillCategory> findAll() {
        return skillCategoryRepository.findAll();
    }
}