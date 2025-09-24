package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Skill.Skill;
import com.nhdinh.nhdinh_profile.modules.Skill.SkillDAO;

@Service
@Transactional
public class SkillService {
    
    private final SkillDAO skillDAO;
    
    public SkillService(SkillDAO skillDAO) {
        this.skillDAO = skillDAO;
    }
    
    /**
     * Lấy tất cả skills active
     */
    public List<Skill> findAllActive() {
        return skillDAO.findAllActive();
    }
    
    /**
     * Lấy tất cả skills active với phân trang
     */
    public Page<Skill> findAllActiveWithPagination(Pageable pageable) {
        return skillDAO.findAllActiveWithPagination(pageable);
    }
    
    /**
     * Lấy skills theo category
     */
    public List<Skill> findByCategoryId(UUID categoryId) {
        return skillDAO.findByCategoryId(categoryId);
    }
    
    /**
     * Tìm skill theo tên trong category
     */
    public Optional<Skill> findByCategoryIdAndName(UUID categoryId, String name) {
        return skillDAO.findByCategoryIdAndName(categoryId, name);
    }
    
    /**
     * Kiểm tra skill có tồn tại trong category
     */
    public boolean existsByCategoryIdAndName(UUID categoryId, String name) {
        return skillDAO.existsByCategoryIdAndName(categoryId, name);
    }
    
    /**
     * Lấy max sort order trong category
     */
    public Integer findMaxSortOrderByCategoryId(UUID categoryId) {
        return skillDAO.findMaxSortOrderByCategoryId(categoryId);
    }
    
    /**
     * Tìm kiếm skills theo tên
     */
    public List<Skill> searchByName(String keyword) {
        return skillDAO.searchByName(keyword);
    }
    
    /**
     * Lưu Skill
     */
    public Skill save(Skill skill) {
        return skillDAO.save(skill);
    }
    
    /**
     * Tìm Skill theo ID
     */
    public Optional<Skill> findById(UUID skillId) {
        return skillDAO.findById(skillId);
    }
    
    /**
     * Xóa Skill theo ID
     */
    public void deleteById(UUID skillId) {
        skillDAO.deleteById(skillId);
    }
    
    /**
     * Lấy tất cả Skills
     */
    public List<Skill> findAll() {
        return skillDAO.findAll();
    }
}



