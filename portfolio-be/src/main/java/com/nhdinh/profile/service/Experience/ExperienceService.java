package com.nhdinh.profile.service.Experience;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.Experience.Experience;
import com.nhdinh.profile.modules.Experience.ExperienceDAO;
import com.nhdinh.profile.request.Experience.ExperienceCreateRequest;
import com.nhdinh.profile.request.Experience.ExperienceUpdateRequest;

@Service
@Transactional
public class ExperienceService {
    
    @Autowired
    private ExperienceDAO experienceDAO;
    
    /**
     * Lấy tất cả Experience của một Profile
     */
    public List<Experience> getExperiencesByProfileId(UUID profileId) {
        return experienceDAO.findByProfileIdOrderBySortOrder(profileId);
    }
    
    /**
     * Lấy tất cả Experience của một Profile sắp xếp theo năm
     */
    public List<Experience> getExperiencesByProfileIdOrderByYear(UUID profileId) {
        return experienceDAO.findByProfileIdOrderByStartYearDesc(profileId);
    }
    
    /**
     * Lấy Experience hiện tại của một Profile
     */
    public List<Experience> getCurrentExperiencesByProfileId(UUID profileId) {
        return experienceDAO.findCurrentExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy Experience theo ID
     */
    public Optional<Experience> getExperienceById(UUID expId) {
        return experienceDAO.findById(expId);
    }
    
    /**
     * Tìm kiếm Experience theo từ khóa
     */
    public List<Experience> searchExperiences(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return experienceDAO.findAll();
        }
        return experienceDAO.searchByKeyword(keyword.trim());
    }
    
    /**
     * Tìm Experience theo Company
     */
    public List<Experience> getExperiencesByCompany(String company) {
        return experienceDAO.findByCompanyIgnoreCase(company);
    }
    
    /**
     * Tìm Experience theo Position
     */
    public List<Experience> getExperiencesByPosition(String position) {
        return experienceDAO.findByPositionIgnoreCase(position);
    }
    
    /**
     * Tạo Experience mới
     */
    public Experience createExperience(ExperienceCreateRequest request) {
        Experience experience = request.toEntity();
        
        // Nếu sortOrder không được set, lấy sortOrder cao nhất + 1
        if (experience.getSortOrder() <= 0) {
            int maxSortOrder = experienceDAO.getMaxSortOrderByProfileId(request.getProfileId());
            experience.setSortOrder(maxSortOrder + 1);
        }
        
        return experienceDAO.save(experience);
    }
    
    /**
     * Cập nhật Experience
     */
    public Experience updateExperience(UUID expId, ExperienceUpdateRequest request) {
        Optional<Experience> existingExpOpt = experienceDAO.findById(expId);
        
        if (!existingExpOpt.isPresent()) {
            throw new RuntimeException("Không tìm thấy Experience với ID: " + expId);
        }
        
        Experience existingExp = existingExpOpt.get();
        
        // Cập nhật các field
        if (request.getPosition() != null) {
            existingExp.setPosition(request.getPosition());
        }
        if (request.getCompany() != null) {
            existingExp.setCompany(request.getCompany());
        }
        if (request.getDescription() != null) {
            existingExp.setDescription(request.getDescription());
        }
        if (request.getStartYear() != null) {
            existingExp.setStartYear(request.getStartYear());
        }
        if (request.getEndYear() != null) {
            existingExp.setEndYear(request.getEndYear());
        }
        if (request.getIsCurrent() != null) {
            existingExp.setCurrent(request.getIsCurrent());
        }
        if (request.getSortOrder() != null) {
            existingExp.setSortOrder(request.getSortOrder());
        }
        
        return experienceDAO.save(existingExp);
    }
    
    /**
     * Xóa Experience
     */
    public void deleteExperience(UUID expId) {
        if (!experienceDAO.existsById(expId)) {
            throw new RuntimeException("Không tìm thấy Experience với ID: " + expId);
        }
        experienceDAO.deleteById(expId);
    }
    
    /**
     * Xóa tất cả Experience của một Profile
     */
    public void deleteAllExperiencesByProfileId(UUID profileId) {
        experienceDAO.deleteByProfileId(profileId);
    }
    
    /**
     * Đếm số lượng Experience của một Profile
     */
    public long getExperienceCountByProfileId(UUID profileId) {
        return experienceDAO.countByProfileId(profileId);
    }
    
    /**
     * Đếm số lượng Experience hiện tại của một Profile
     */
    public long getCurrentExperienceCountByProfileId(UUID profileId) {
        return experienceDAO.countCurrentExperiencesByProfileId(profileId);
    }
    
    /**
     * Lấy những Company phổ biến nhất
     */
    public List<Object[]> getMostPopularCompanies() {
        return experienceDAO.findMostPopularCompanies();
    }
    
    /**
     * Lấy những Position phổ biến nhất
     */
    public List<Object[]> getMostPopularPositions() {
        return experienceDAO.findMostPopularPositions();
    }
}
