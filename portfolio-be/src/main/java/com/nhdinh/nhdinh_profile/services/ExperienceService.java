package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Experience.Experience;
import com.nhdinh.nhdinh_profile.repositories.ExperienceRepository;

@Service
@Transactional
public class ExperienceService {
    
    private final ExperienceRepository experienceRepository;
    
    public ExperienceService(ExperienceRepository experienceRepository) {
        this.experienceRepository = experienceRepository;
    }
    
    /**
     * Lấy tất cả experiences của một profile
     */
    public List<Experience> findByProfileId(UUID profileId) {
        return experienceRepository.findByProfileId(profileId);
    }
    
    /**
     * Lấy current experiences
     */
    public List<Experience> findCurrentExperiencesByProfileId(UUID profileId) {
        return experienceRepository.findCurrentExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy past experiences
     */
    public List<Experience> findPastExperiencesByProfileId(UUID profileId) {
        return experienceRepository.findPastExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy experiences theo company
     */
    public List<Experience> findByProfileIdAndCompany(UUID profileId, String company) {
        return experienceRepository.findByProfileIdAndCompany(profileId, company);
    }
    
    /**
     * Lấy max sort order của profile
     */
    public Integer findMaxSortOrderByProfileId(UUID profileId) {
        return experienceRepository.findMaxSortOrderByProfileId(profileId);
    }
    
    /**
     * Đếm số experiences của profile
     */
    public Long countByProfileId(UUID profileId) {
        return experienceRepository.countByProfileId(profileId);
    }
    
    /**
     * Lưu Experience
     */
    public Experience save(Experience experience) {
        return experienceRepository.save(experience);
    }
    
    /**
     * Tìm Experience theo ID
     */
    public Optional<Experience> findById(UUID experienceId) {
        return experienceRepository.findById(experienceId);
    }
    
    /**
     * Xóa Experience theo ID
     */
    public void deleteById(UUID experienceId) {
        experienceRepository.deleteById(experienceId);
    }
    
    /**
     * Lấy tất cả Experiences
     */
    public List<Experience> findAll() {
        return experienceRepository.findAll();
    }
}