package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Skill.Skill;
import com.nhdinh.nhdinh_profile.repositories.SkillRepository;

@Service
@Transactional
public class SkillService {
    
    private final SkillRepository skillRepository;
    
    public SkillService(SkillRepository skillRepository) {
        this.skillRepository = skillRepository;
    }
    
    /**
     * Lấy tất cả skills active
     */
    public List<Skill> findAllActive() {
        return skillRepository.findAllActive();
    }
    
    /**
     * Lấy skills theo category
     */
    public List<Skill> findByCategoryId(UUID categoryId) {
        return skillRepository.findByCategoryId(categoryId);
    }
    
    /**
     * Tìm skill theo tên trong category
     */
    public Optional<Skill> findByCategoryIdAndName(UUID categoryId, String name) {
        return skillRepository.findByCategoryIdAndName(categoryId, name);
    }
    
    /**
     * Kiểm tra skill có tồn tại trong category
     */
    public boolean existsByCategoryIdAndName(UUID categoryId, String name) {
        return skillRepository.existsByCategoryIdAndName(categoryId, name);
    }
    
    /**
     * Lấy max sort order trong category
     */
    public Integer findMaxSortOrderByCategoryId(UUID categoryId) {
        return skillRepository.findMaxSortOrderByCategoryId(categoryId);
    }
    
    /**
     * Tìm kiếm skills theo tên
     */
    public List<Skill> searchByName(String keyword) {
        return skillRepository.searchByName(keyword);
    }
    
    /**
     * Lưu Skill
     */
    public Skill save(Skill skill) {
        return skillRepository.save(skill);
    }
    
    /**
     * Tìm Skill theo ID
     */
    public Optional<Skill> findById(UUID skillId) {
        return skillRepository.findById(skillId);
    }
    
    /**
     * Xóa Skill theo ID
     */
    public void deleteById(UUID skillId) {
        skillRepository.deleteById(skillId);
    }
    
    /**
     * Lấy tất cả Skills
     */
    public List<Skill> findAll() {
        return skillRepository.findAll();
    }
}