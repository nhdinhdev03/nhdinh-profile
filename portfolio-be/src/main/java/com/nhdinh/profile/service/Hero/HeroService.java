package com.nhdinh.profile.service.Hero;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.Hero.Hero;
import com.nhdinh.profile.modules.Hero.HeroDAO;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class HeroService {
    
    @Autowired
    private HeroDAO heroDAO;
    
    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    @Transactional(readOnly = true)
    public List<Hero> getAllHeroes() {
        return heroDAO.findAllNotDeleted();
    }
    
    /**
     * Lấy Hero theo ID
     */
    @Transactional(readOnly = true)
    public Optional<Hero> getHeroById(UUID heroId) {
        return heroDAO.findById(heroId)
                .filter(hero -> !hero.getIsDeleted());
    }
    
    /**
     * Lấy Hero theo locale
     */
    @Transactional(readOnly = true)
    public Optional<Hero> getHeroByLocale(String locale) {
        return heroDAO.findByLocaleAndNotDeleted(locale);
    }
    
    /**
     * Tạo mới Hero
     */
    public Hero createHero(Hero hero) {
        // Kiểm tra locale đã tồn tại chưa
        if (heroDAO.existsByLocaleAndNotDeleted(hero.getLocale())) {
            throw new RuntimeException("Locale '" + hero.getLocale() + "' đã tồn tại");
        }
        
        hero.setHeroId(null); // Đảm bảo tạo mới
        hero.setIsDeleted(false);
        hero.setCreatedAt(LocalDateTime.now());
        
        return heroDAO.save(hero);
    }
    
    /**
     * Cập nhật Hero
     */
    public Hero updateHero(UUID heroId, Hero heroUpdate) {
        Hero existingHero = heroDAO.findById(heroId)
                .filter(hero -> !hero.getIsDeleted())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));
        
        // Kiểm tra locale đã tồn tại chưa (trừ chính nó)
        if (!existingHero.getLocale().equals(heroUpdate.getLocale()) && 
            heroDAO.existsByLocaleAndNotSelf(heroUpdate.getLocale(), heroId)) {
            throw new RuntimeException("Locale '" + heroUpdate.getLocale() + "' đã tồn tại");
        }
        
        // Cập nhật các field
        existingHero.setLocale(heroUpdate.getLocale());
        existingHero.setPreHeading(heroUpdate.getPreHeading());
        existingHero.setHeading(heroUpdate.getHeading());
        existingHero.setIntroHtml(heroUpdate.getIntroHtml());
        existingHero.setUpdatedAt(LocalDateTime.now());
        
        return heroDAO.save(existingHero);
    }
    
    /**
     * Xóa mềm Hero
     */
    public void deleteHero(UUID heroId) {
        Hero hero = heroDAO.findById(heroId)
                .filter(h -> !h.getIsDeleted())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));
        
        hero.setIsDeleted(true);
        hero.setUpdatedAt(LocalDateTime.now());
        heroDAO.save(hero);
    }
    
    /**
     * Khôi phục Hero đã xóa
     */
    public Hero restoreHero(UUID heroId) {
        Hero hero = heroDAO.findById(heroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));
        
        if (!hero.getIsDeleted()) {
            throw new RuntimeException("Hero chưa bị xóa");
        }
        
        // Kiểm tra locale có trùng với record khác không
        if (heroDAO.existsByLocaleAndNotDeleted(hero.getLocale())) {
            throw new RuntimeException("Không thể khôi phục: Locale '" + hero.getLocale() + "' đã tồn tại");
        }
        
        hero.setIsDeleted(false);
        hero.setUpdatedAt(LocalDateTime.now());
        
        return heroDAO.save(hero);
    }
}
