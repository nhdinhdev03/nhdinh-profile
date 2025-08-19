package com.nhdinh.profile.service.HeroSubHeading;

import com.nhdinh.profile.modules.Hero.Hero;
import com.nhdinh.profile.modules.Hero.HeroDAO;
import com.nhdinh.profile.modules.HeroSubHeading.HeroSubHeading;
import com.nhdinh.profile.modules.HeroSubHeading.HeroSubHeadingDAO;
import com.nhdinh.profile.request.HeroSubHeading.HeroSubHeadingCreateRequest;
import com.nhdinh.profile.request.HeroSubHeading.HeroSubHeadingReorderRequest;
import com.nhdinh.profile.request.HeroSubHeading.HeroSubHeadingUpdateRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class HeroSubHeadingService {
    
    @Autowired
    private HeroSubHeadingDAO heroSubHeadingDAO;
    
    @Autowired
    private HeroDAO heroDAO;
    
    /**
     * Lấy tất cả SubHeading theo HeroId
     */
    @Transactional(readOnly = true)
    public List<HeroSubHeading> getSubHeadingsByHeroId(UUID heroId) {
        return heroSubHeadingDAO.findByHeroIdOrderBySortOrder(heroId);
    }
    
    /**
     * Lấy tất cả SubHeading theo locale
     */
    @Transactional(readOnly = true)
    public List<HeroSubHeading> getSubHeadingsByLocale(String locale) {
        return heroSubHeadingDAO.findByHeroLocaleOrderBySortOrder(locale);
    }
    
    /**
     * Lấy SubHeading theo ID
     */
    @Transactional(readOnly = true)
    public Optional<HeroSubHeading> getSubHeadingById(UUID subId) {
        return heroSubHeadingDAO.findById(subId);
    }
    
    /**
     * Tạo mới SubHeading
     */
    public HeroSubHeading createSubHeading(HeroSubHeadingCreateRequest request) {
        // Kiểm tra Hero có tồn tại không
        Hero hero = heroDAO.findById(request.getHeroId())
                .filter(h -> !h.getIsDeleted())
                .orElseThrow(() -> new RuntimeException("Không tìm thấy Hero với ID: " + request.getHeroId()));
        
        // Kiểm tra text đã tồn tại cho Hero này chưa
        if (heroSubHeadingDAO.existsByHeroIdAndText(request.getHeroId(), request.getText())) {
            throw new RuntimeException("Text '" + request.getText() + "' đã tồn tại cho Hero này");
        }
        
        HeroSubHeading subHeading = new HeroSubHeading();
        subHeading.setHero(hero);
        subHeading.setText(request.getText());
        
        // Nếu không có sortOrder, lấy max + 1
        if (request.getSortOrder() == null) {
            Integer maxOrder = heroSubHeadingDAO.getMaxSortOrderByHeroId(request.getHeroId());
            subHeading.setSortOrder(maxOrder + 1);
        } else {
            subHeading.setSortOrder(request.getSortOrder());
        }
        
        subHeading.setCreatedAt(LocalDateTime.now());
        
        return heroSubHeadingDAO.save(subHeading);
    }
    
    /**
     * Cập nhật SubHeading
     */
    public HeroSubHeading updateSubHeading(UUID subId, HeroSubHeadingUpdateRequest request) {
        HeroSubHeading existingSubHeading = heroSubHeadingDAO.findById(subId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy SubHeading với ID: " + subId));
        
        // Kiểm tra text đã tồn tại cho Hero này chưa (trừ chính nó)
        if (!existingSubHeading.getText().equals(request.getText()) && 
            heroSubHeadingDAO.existsByHeroIdAndTextAndNotSelf(
                    existingSubHeading.getHero().getHeroId(), 
                    request.getText(), 
                    subId)) {
            throw new RuntimeException("Text '" + request.getText() + "' đã tồn tại cho Hero này");
        }
        
        // Cập nhật các field
        existingSubHeading.setText(request.getText());
        
        if (request.getSortOrder() != null) {
            existingSubHeading.setSortOrder(request.getSortOrder());
        }
        
        existingSubHeading.setUpdatedAt(LocalDateTime.now());
        
        return heroSubHeadingDAO.save(existingSubHeading);
    }
    
    /**
     * Xóa SubHeading
     */
    public void deleteSubHeading(UUID subId) {
        HeroSubHeading subHeading = heroSubHeadingDAO.findById(subId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy SubHeading với ID: " + subId));
        
        heroSubHeadingDAO.delete(subHeading);
    }
    
    /**
     * Cập nhật thứ tự SubHeadings
     */
    public void reorderSubHeadings(List<HeroSubHeadingReorderRequest> requests) {
        for (HeroSubHeadingReorderRequest request : requests) {
            HeroSubHeading subHeading = heroSubHeadingDAO.findById(request.getSubId())
                    .orElseThrow(() -> new RuntimeException("Không tìm thấy SubHeading với ID: " + request.getSubId()));
            
            subHeading.setSortOrder(request.getSortOrder());
            subHeading.setUpdatedAt(LocalDateTime.now());
            heroSubHeadingDAO.save(subHeading);
        }
    }
    
    /**
     * Xóa tất cả SubHeading của Hero
     */
    public void deleteByHeroId(UUID heroId) {
        heroSubHeadingDAO.deleteByHeroId(heroId);
    }
    
    /**
     * Đếm số lượng SubHeading của Hero
     */
    @Transactional(readOnly = true)
    public long countByHeroId(UUID heroId) {
        return heroSubHeadingDAO.countByHeroId(heroId);
    }
}
