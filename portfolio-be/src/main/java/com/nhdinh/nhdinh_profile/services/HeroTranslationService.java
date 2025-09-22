package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.HeroTranslation.HeroTranslation;
import com.nhdinh.nhdinh_profile.modules.HeroTranslation.HeroTranslationDAO;

@Service
@Transactional
public class HeroTranslationService {
    
    private final HeroTranslationDAO heroTranslationDAO;
    
    public HeroTranslationService(HeroTranslationDAO heroTranslationDAO) {
        this.heroTranslationDAO = heroTranslationDAO;
    }
    
    /**
     * Lấy tất cả translations của một Hero
     */
    public List<HeroTranslation> findByHeroId(UUID heroId) {
        return heroTranslationDAO.findByHeroId(heroId);
    }
    
    /**
     * Lấy translation theo Hero và language code
     */
    public Optional<HeroTranslation> findByHeroIdAndLanguageCode(UUID heroId, String languageCode) {
        return heroTranslationDAO.findByHeroIdAndLanguageCode(heroId, languageCode);
    }
    
    /**
     * Kiểm tra translation có tồn tại
     */
    public boolean existsByHeroIdAndLanguageCode(UUID heroId, String languageCode) {
        return heroTranslationDAO.existsByHeroIdAndLanguageCode(heroId, languageCode);
    }
    
    /**
     * Lấy tất cả language codes của một Hero
     */
    public List<String> findLanguageCodesByHeroId(UUID heroId) {
        return heroTranslationDAO.findLanguageCodesByHeroId(heroId);
    }
    
    /**
     * Lưu HeroTranslation
     */
    public HeroTranslation save(HeroTranslation heroTranslation) {
        return heroTranslationDAO.save(heroTranslation);
    }
    
    /**
     * Tìm HeroTranslation theo ID
     */
    public Optional<HeroTranslation> findById(UUID translationId) {
        return heroTranslationDAO.findById(translationId);
    }
    
    /**
     * Xóa HeroTranslation theo ID
     */
    public void deleteById(UUID translationId) {
        heroTranslationDAO.deleteById(translationId);
    }
    
    /**
     * Lấy tất cả HeroTranslations
     */
    public List<HeroTranslation> findAll() {
        return heroTranslationDAO.findAll();
    }
}



