package com.nhdinh.nhdinh_profile.modules.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.HeroTranslationRepository;

@Service
@Transactional
public class HeroTranslationService {
    
    private final HeroTranslationRepository heroTranslationRepository;
    
    public HeroTranslationService(HeroTranslationRepository heroTranslationRepository) {
        this.heroTranslationRepository = heroTranslationRepository;
    }
    
    /**
     * Lấy tất cả translations của một Hero
     */
    public List<HeroTranslation> findByHeroId(UUID heroId) {
        return heroTranslationRepository.findByHeroId(heroId);
    }
    
    /**
     * Lấy translation theo Hero và language code
     */
    public Optional<HeroTranslation> findByHeroIdAndLanguageCode(UUID heroId, String languageCode) {
        return heroTranslationRepository.findByHeroIdAndLanguageCode(heroId, languageCode);
    }
    
    /**
     * Kiểm tra translation có tồn tại
     */
    public boolean existsByHeroIdAndLanguageCode(UUID heroId, String languageCode) {
        return heroTranslationRepository.existsByHeroIdAndLanguageCode(heroId, languageCode);
    }
    
    /**
     * Lấy tất cả language codes của một Hero
     */
    public List<String> findLanguageCodesByHeroId(UUID heroId) {
        return heroTranslationRepository.findLanguageCodesByHeroId(heroId);
    }
    
    /**
     * Lưu HeroTranslation
     */
    public HeroTranslation save(HeroTranslation heroTranslation) {
        return heroTranslationRepository.save(heroTranslation);
    }
    
    /**
     * Tìm HeroTranslation theo ID
     */
    public Optional<HeroTranslation> findById(UUID translationId) {
        return heroTranslationRepository.findById(translationId);
    }
    
    /**
     * Xóa HeroTranslation theo ID
     */
    public void deleteById(UUID translationId) {
        heroTranslationRepository.deleteById(translationId);
    }
    
    /**
     * Lấy tất cả HeroTranslations
     */
    public List<HeroTranslation> findAll() {
        return heroTranslationRepository.findAll();
    }
}