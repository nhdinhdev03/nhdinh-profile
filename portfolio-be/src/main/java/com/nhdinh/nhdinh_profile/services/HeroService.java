package com.nhdinh.nhdinh_profile.services;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.nhdinh_profile.modules.Hero.Hero;
import com.nhdinh.nhdinh_profile.modules.Hero.HeroDAO;

@Service
@Transactional
public class HeroService {
    
    private final HeroDAO heroDAO;
    
    public HeroService(HeroDAO heroDAO) {
        this.heroDAO = heroDAO;
    }
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    public List<Hero> findAllActive() {
        return heroDAO.findAllActive();
    }
    
    /**
     * Lấy Hero đầu tiên chưa bị xóa với translations
     */
    public Optional<Hero> findFirstActiveWithTranslations() {
        return heroDAO.findFirstActiveWithTranslations();
    }
    
    /**
     * Lấy Hero theo ID với translations và subheadings
     */
    public Optional<Hero> findByIdWithTranslations(UUID heroId) {
        return heroDAO.findByIdWithTranslations(heroId);
    }
    
    /**
     * Soft delete Hero
     */
    public void softDeleteById(UUID heroId) {
        heroDAO.softDeleteById(heroId);
    }
    
    /**
     * Lấy Hero theo translation language
     */
    public List<Hero> findByLanguageCode(String languageCode) {
        return heroDAO.findByLanguageCode(languageCode);
    }
    
    /**
     * Lưu Hero
     */
    public Hero save(Hero hero) {
        return heroDAO.save(hero);
    }
    
    /**
     * Tìm Hero theo ID
     */
    public Optional<Hero> findById(UUID heroId) {
        return heroDAO.findById(heroId);
    }
    
    /**
     * Xóa Hero theo ID
     */
    public void deleteById(UUID heroId) {
        heroDAO.deleteById(heroId);
    }
    
    /**
     * Lấy tất cả Heroes
     */
    public List<Hero> findAll() {
        return heroDAO.findAll();
    }
}



