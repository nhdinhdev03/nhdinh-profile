package com.nhdinh.nhdinh_profile.service.Hero;

import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Hero.Hero;
import com.nhdinh.nhdinh_profile.modules.Hero.HeroDAO;
import com.nhdinh.nhdinh_profile.modules.Hero.HeroTranslation;
import com.nhdinh.nhdinh_profile.modules.Hero.HeroTranslationDAO;
import com.nhdinh.nhdinh_profile.modules.HeroSubHeading.HeroSubHeading;
import com.nhdinh.nhdinh_profile.modules.HeroSubHeading.HeroSubHeadingDAO;
import com.nhdinh.nhdinh_profile.request.Hero.HeroCreateRequest;
import com.nhdinh.nhdinh_profile.request.Hero.HeroSubHeadingRequest;
import com.nhdinh.nhdinh_profile.request.Hero.HeroTranslationRequest;
import com.nhdinh.nhdinh_profile.request.Hero.HeroUpdateRequest;
import com.nhdinh.nhdinh_profile.response.Hero.HeroResponse;
import com.nhdinh.nhdinh_profile.response.Hero.HeroSubHeadingResponse;
import com.nhdinh.nhdinh_profile.response.Hero.HeroTranslationResponse;

@Service
@Transactional
public class HeroService {

    @Autowired
    private HeroDAO heroDAO;
    
    @Autowired
    private HeroTranslationDAO heroTranslationDAO;
    
    @Autowired
    private HeroSubHeadingDAO heroSubHeadingDAO;

    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    @Cacheable(value = "heroes", key = "'all_active'")
    public List<HeroResponse> getAllActiveHeroes() {
        List<Hero> heroes = heroDAO.findAllActive();
        return heroes.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Lấy Hero đầu tiên với translations
     */
    @Cacheable(value = "heroes", key = "'first_active'")
    public Optional<HeroResponse> getFirstActiveHero() {
        Optional<Hero> hero = heroDAO.findFirstActiveWithTranslations();
        return hero.map(this::convertToResponse);
    }

    /**
     * Lấy Hero theo ID
     */
    @Cacheable(value = "heroes", key = "#heroId")
    public Optional<HeroResponse> getHeroById(UUID heroId) {
        Optional<Hero> hero = heroDAO.findByIdWithTranslations(heroId);
        return hero.map(this::convertToResponse);
    }

    /**
     * Lấy Hero theo language code
     */
    @Cacheable(value = "heroes", key = "'lang_' + #languageCode")
    public List<HeroResponse> getHeroesByLanguage(String languageCode) {
        List<Hero> heroes = heroDAO.findByLanguageCode(languageCode);
        return heroes.stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * Tạo Hero mới
     */
    @CacheEvict(value = "heroes", allEntries = true)
    public HeroResponse createHero(HeroCreateRequest request) {
        // Tạo Hero entity
        Hero hero = new Hero();
        hero.setIsDeleted(false);
        
        // Lưu Hero trước
        hero = heroDAO.save(hero);
        
        // Tạo translations
        if (request.getTranslations() != null) {
            for (Map.Entry<String, HeroTranslationRequest> entry : request.getTranslations().entrySet()) {
                HeroTranslation translation = createHeroTranslation(hero, entry.getKey(), entry.getValue());
                heroTranslationDAO.save(translation);
            }
        }
        
        // Tạo subheadings
        if (request.getSubHeadings() != null) {
            for (HeroSubHeadingRequest subReq : request.getSubHeadings()) {
                HeroSubHeading subHeading = createHeroSubHeading(hero, subReq);
                heroSubHeadingDAO.save(subHeading);
            }
        }
        
        // Lấy lại hero với đầy đủ thông tin
        Optional<Hero> savedHero = heroDAO.findByIdWithTranslations(hero.getHeroId());
        return savedHero.map(this::convertToResponse).orElse(null);
    }

    /**
     * Cập nhật Hero
     */
    @CacheEvict(value = "heroes", allEntries = true)
    public Optional<HeroResponse> updateHero(UUID heroId, HeroUpdateRequest request) {
        Optional<Hero> heroOpt = heroDAO.findByIdWithTranslations(heroId);
        if (!heroOpt.isPresent()) {
            return Optional.empty();
        }
        
        Hero hero = heroOpt.get();
        
        // Cập nhật translations
        if (request.getTranslations() != null) {
            // Xóa translations cũ
            heroTranslationDAO.deleteAll(hero.getTranslations());
            
            // Tạo translations mới
            for (Map.Entry<String, HeroTranslationRequest> entry : request.getTranslations().entrySet()) {
                HeroTranslation translation = createHeroTranslation(hero, entry.getKey(), entry.getValue());
                heroTranslationDAO.save(translation);
            }
        }
        
        // Cập nhật subheadings
        if (request.getSubHeadings() != null) {
            // Xóa subheadings cũ
            heroSubHeadingDAO.deleteAll(hero.getSubHeadings());
            
            // Tạo subheadings mới
            for (HeroSubHeadingRequest subReq : request.getSubHeadings()) {
                HeroSubHeading subHeading = createHeroSubHeading(hero, subReq);
                heroSubHeadingDAO.save(subHeading);
            }
        }
        
        // Lấy lại hero với đầy đủ thông tin
        Optional<Hero> updatedHero = heroDAO.findByIdWithTranslations(heroId);
        return updatedHero.map(this::convertToResponse);
    }

    /**
     * Soft delete Hero
     */
    @CacheEvict(value = "heroes", allEntries = true)
    public boolean deleteHero(UUID heroId) {
        try {
            heroDAO.softDeleteById(heroId);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // Helper methods
    private HeroTranslation createHeroTranslation(Hero hero, String languageCode, HeroTranslationRequest request) {
        HeroTranslation translation = new HeroTranslation();
        translation.setHero(hero);
        translation.setLanguageCode(languageCode);
        translation.setPreHeading(request.getPreHeading());
        translation.setHeading(request.getHeading());
        translation.setIntroHtml(request.getIntroHtml());
        return translation;
    }
    
    private HeroSubHeading createHeroSubHeading(Hero hero, HeroSubHeadingRequest request) {
        HeroSubHeading subHeading = new HeroSubHeading();
        subHeading.setHero(hero);
        subHeading.setLanguageCode(request.getLanguageCode());
        subHeading.setText(request.getText());
        subHeading.setSortOrder(request.getSortOrder());
        return subHeading;
    }
    
    private HeroResponse convertToResponse(Hero hero) {
        HeroResponse response = new HeroResponse();
        response.setHeroId(hero.getHeroId());
        response.setCreatedAt(hero.getCreatedAt());
        response.setUpdatedAt(hero.getUpdatedAt());
        response.setIsDeleted(hero.getIsDeleted());
        
        // Convert translations
        if (hero.getTranslations() != null) {
            List<HeroTranslationResponse> translationResponses = hero.getTranslations().stream()
                    .map(this::convertTranslationToResponse)
                    .collect(Collectors.toList());
            response.setTranslations(translationResponses);
        }
        
        // Convert subheadings
        if (hero.getSubHeadings() != null) {
            List<HeroSubHeadingResponse> subHeadingResponses = hero.getSubHeadings().stream()
                    .map(this::convertSubHeadingToResponse)
                    .collect(Collectors.toList());
            response.setSubHeadings(subHeadingResponses);
        }
        
        return response;
    }
    
    private HeroTranslationResponse convertTranslationToResponse(HeroTranslation translation) {
        HeroTranslationResponse response = new HeroTranslationResponse();
        response.setTranslationId(translation.getTranslationId());
        response.setLanguageCode(translation.getLanguageCode());
        response.setPreHeading(translation.getPreHeading());
        response.setHeading(translation.getHeading());
        response.setIntroHtml(translation.getIntroHtml());
        response.setCreatedAt(translation.getCreatedAt());
        response.setUpdatedAt(translation.getUpdatedAt());
        return response;
    }
    
    private HeroSubHeadingResponse convertSubHeadingToResponse(HeroSubHeading subHeading) {
        HeroSubHeadingResponse response = new HeroSubHeadingResponse();
        response.setSubId(subHeading.getSubId());
        response.setLanguageCode(subHeading.getLanguageCode());
        response.setText(subHeading.getText());
        response.setSortOrder(subHeading.getSortOrder());
        response.setCreatedAt(subHeading.getCreatedAt());
        response.setUpdatedAt(subHeading.getUpdatedAt());
        return response;
    }
}