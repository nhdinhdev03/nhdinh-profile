package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Experience.Experience;
import com.nhdinh.nhdinh_profile.modules.Experience.ExperienceDAO;

@Service
@Transactional
public class ExperienceService {
    
    private final ExperienceDAO experienceDAO;
    
    public ExperienceService(ExperienceDAO experienceDAO) {
        this.experienceDAO = experienceDAO;
    }
    
    /**
     * Lấy tất cả experiences của một profile
     */
    public List<Experience> findByProfileId(UUID profileId) {
        return experienceDAO.findByProfileId(profileId);
    }
    
    /**
     * Lấy current experiences
     */
    public List<Experience> findCurrentExperiencesByProfileId(UUID profileId) {
        return experienceDAO.findCurrentExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy past experiences
     */
    public List<Experience> findPastExperiencesByProfileId(UUID profileId) {
        return experienceDAO.findPastExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy experiences theo company
     */
    public List<Experience> findByProfileIdAndCompany(UUID profileId, String company) {
        return experienceDAO.findByProfileIdAndCompany(profileId, company);
    }
    
    /**
     * Lấy max sort order của profile
     */
    public Integer findMaxSortOrderByProfileId(UUID profileId) {
        return experienceDAO.findMaxSortOrderByProfileId(profileId);
    }
    
    /**
     * Đếm số experiences của profile
     */
    public Long countByProfileId(UUID profileId) {
        return experienceDAO.countByProfileId(profileId);
    }
    
    /**
     * Lưu Experience
     */
    public Experience save(Experience experience) {
        return experienceDAO.save(experience);
    }
    
    /**
     * Tìm Experience theo ID
     */
    public Optional<Experience> findById(UUID experienceId) {
        return experienceDAO.findById(experienceId);
    }
    
    /**
     * Xóa Experience theo ID
     */
    public void deleteById(UUID experienceId) {
        experienceDAO.deleteById(experienceId);
    }
    
    /**
     * Lấy tất cả Experiences
     */
    public List<Experience> findAll() {
        return experienceDAO.findAll();
    }
}



