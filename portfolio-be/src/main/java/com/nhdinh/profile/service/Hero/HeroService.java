package com.nhdinh.profile.service.Hero;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.CacheEvict;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.nhdinh.profile.modules.Hero.Hero;
import com.nhdinh.profile.modules.Hero.HeroDAO;



@Service
@Transactional
public class HeroService {

    @Autowired
    private HeroDAO heroDAO;

    /**
     * Lấy tất cả Hero chưa bị xóa
     */
    public List<Hero> getAllHeroes() {
        return heroDAO.findAllNotDeleted();
    }

    /**
     * Lấy tất cả Hero đã bị xóa (lưu trữ)
     */
    public List<Hero> getDeletedHeroes() {
        return heroDAO.findAllDeleted();
    }

    /**
     * Lấy tất cả Hero bao gồm cả bị xóa
     */
    public List<Hero> getAllHeroesIncludeDeleted() {
        return heroDAO.findAll();
    }

    /**
     * Lấy Hero by UUID
     */
    public Optional<Hero> getHeroById(UUID heroId) {
        return heroDAO.findById(heroId);
    }

    /**
     * Lấy Hero by Long ID
     */
    public Optional<Hero> getHeroById(Long heroId) {
        return heroDAO.findById(UUID.fromString(heroId.toString()));
    }

    /**
     * Lấy Hero đang hoạt động (chưa bị xóa) - sử dụng cache
     */
    @Cacheable(value = "activeHero")
    public Optional<Hero> getActiveHero() {
        return heroDAO.findFirstNotDeleted();
    }

    /**
     * Tạo mới Hero
     */
    @CacheEvict(value = "activeHero", allEntries = true)
    public Hero createHero(Hero hero) {
        // Kiểm tra có Hero nào đang hoạt động không
        Optional<Hero> existingHero = heroDAO.findFirstNotDeleted();
        if (existingHero.isPresent()) {
            throw new RuntimeException("Đã tồn tại Hero. Chỉ được phép có 1 Hero duy nhất.");
        }
        
        hero.setIsDeleted(false);
        return heroDAO.save(hero);
    }

    /**
     * Cập nhật Hero
     */
    @CacheEvict(value = "activeHero", allEntries = true)
    public Hero updateHero(UUID heroId, Hero heroDetails) {
        Hero hero = heroDAO.findById(heroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));

        // Cập nhật các trường
        hero.setPreHeading(heroDetails.getPreHeading());
        hero.setHeading(heroDetails.getHeading());
        hero.setIntroHtml(heroDetails.getIntroHtml());

        return heroDAO.save(hero);
    }

    /**
     * Xóa mềm Hero
     */
    @CacheEvict(value = "activeHero", allEntries = true)
    public void deleteHero(UUID heroId) {
        Hero hero = heroDAO.findById(heroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));

        hero.setIsDeleted(true);
        heroDAO.save(hero);
    }

    /**
     * Xóa vĩnh viễn Hero
     */
    @CacheEvict(value = "activeHero", allEntries = true)
    public void permanentDeleteHero(UUID heroId) {
        Hero hero = heroDAO.findById(heroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));

        heroDAO.delete(hero);
    }

    /**
     * Khôi phục Hero đã xóa
     */
    @CacheEvict(value = "activeHero", allEntries = true)
    public Hero restoreHero(UUID heroId) {
        Hero hero = heroDAO.findById(heroId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + heroId));

        if (!hero.getIsDeleted()) {
            throw new RuntimeException("Hero chưa bị xóa");
        }

        // Kiểm tra xem có Hero nào khác đang hoạt động không
        Optional<Hero> existingActiveHero = heroDAO.findFirstNotDeleted();
        if (existingActiveHero.isPresent()) {
            throw new RuntimeException("Không thể khôi phục: Đã tồn tại Hero khác đang hoạt động");
        }

        hero.setIsDeleted(false);
        return heroDAO.save(hero);
    }
}
