package com.nhdinh.nhdinh_profile.modules.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.repositories.HeroRepository;

@Service
@Transactional
public class HeroService {
    
    private final HeroRepository heroRepository;
    
    public HeroService(HeroRepository heroRepository) {
        this.heroRepository = heroRepository;
    }
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    public List<Hero> findAllActive() {
        return heroRepository.findAllActive();
    }
    
    /**
     * Lấy Hero đầu tiên chưa bị xóa với translations
     */
    public Optional<Hero> findFirstActiveWithTranslations() {
        return heroRepository.findFirstActiveWithTranslations();
    }
    
    /**
     * Lấy Hero theo ID với translations và subheadings
     */
    public Optional<Hero> findByIdWithTranslations(UUID heroId) {
        return heroRepository.findByIdWithTranslations(heroId);
    }
    
    /**
     * Soft delete Hero
     */
    public void softDeleteById(UUID heroId) {
        heroRepository.softDeleteById(heroId);
    }
    
    /**
     * Lấy Hero theo translation language
     */
    public List<Hero> findByLanguageCode(String languageCode) {
        return heroRepository.findByLanguageCode(languageCode);
    }
    
    /**
     * Lưu Hero
     */
    public Hero save(Hero hero) {
        return heroRepository.save(hero);
    }
    
    /**
     * Tìm Hero theo ID
     */
    public Optional<Hero> findById(UUID heroId) {
        return heroRepository.findById(heroId);
    }
    
    /**
     * Xóa Hero theo ID
     */
    public void deleteById(UUID heroId) {
        heroRepository.deleteById(heroId);
    }
    
    /**
     * Lấy tất cả Heroes
     */
    public List<Hero> findAll() {
        return heroRepository.findAll();
    }
}