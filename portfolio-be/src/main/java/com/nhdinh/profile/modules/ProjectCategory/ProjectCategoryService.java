package com.nhdinh.profile.modules.ProjectCategory;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
public class ProjectCategoryService {
    
    @Autowired
    private ProjectCategoryDAO projectCategoryDAO;
    
    /**
     * Lấy tất cả ProjectCategory
     */
    @Transactional(readOnly = true)
    public List<ProjectCategory> getAllCategories() {
        return projectCategoryDAO.findAllOrderByName();
    }
    
    /**
     * Lấy ProjectCategory theo ID
     */
    @Transactional(readOnly = true)
    public Optional<ProjectCategory> getCategoryById(UUID categoryId) {
        return projectCategoryDAO.findById(categoryId);
    }
    
    /**
     * Lấy ProjectCategory theo tên
     */
    @Transactional(readOnly = true)
    public Optional<ProjectCategory> getCategoryByName(String name) {
        return projectCategoryDAO.findByNameIgnoreCase(name);
    }
    
    /**
     * Tìm kiếm ProjectCategory theo từ khóa
     */
    @Transactional(readOnly = true)
    public List<ProjectCategory> searchCategories(String keyword) {
        return projectCategoryDAO.findByNameContainingIgnoreCase(keyword);
    }
    
    /**
     * Tạo mới ProjectCategory
     */
    public ProjectCategory createCategory(ProjectCategoryCreateRequest request) {
        // Kiểm tra tên đã tồn tại chưa
        if (projectCategoryDAO.existsByNameIgnoreCase(request.getName())) {
            throw new RuntimeException("Tên category '" + request.getName() + "' đã tồn tại");
        }
        
        ProjectCategory category = new ProjectCategory();
        category.setName(request.getName().trim());
        
        return projectCategoryDAO.save(category);
    }
    
    /**
     * Cập nhật ProjectCategory
     */
    public ProjectCategory updateCategory(UUID categoryId, ProjectCategoryUpdateRequest request) {
        ProjectCategory existingCategory = projectCategoryDAO.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectCategory với ID: " + categoryId));
        
        // Kiểm tra tên đã tồn tại chưa (trừ chính nó)
        if (!existingCategory.getName().equalsIgnoreCase(request.getName()) && 
            projectCategoryDAO.existsByNameIgnoreCaseAndNotSelf(request.getName(), categoryId)) {
            throw new RuntimeException("Tên category '" + request.getName() + "' đã tồn tại");
        }
        
        existingCategory.setName(request.getName().trim());
        
        return projectCategoryDAO.save(existingCategory);
    }
    
    /**
     * Xóa ProjectCategory
     */
    public void deleteCategory(UUID categoryId) {
        ProjectCategory category = projectCategoryDAO.findById(categoryId)
                .orElseThrow(() -> new RuntimeException("Không tìm thấy ProjectCategory với ID: " + categoryId));
        
        // TODO: Kiểm tra xem category có đang được sử dụng bởi project nào không
        // Có thể thêm query để check foreign key references
        
        projectCategoryDAO.delete(category);
    }
    
    /**
     * Kiểm tra ProjectCategory có tồn tại không
     */
    @Transactional(readOnly = true)
    public boolean existsById(UUID categoryId) {
        return projectCategoryDAO.existsById(categoryId);
    }
    
    /**
     * Kiểm tra tên category có tồn tại không
     */
    @Transactional(readOnly = true)
    public boolean existsByName(String name) {
        return projectCategoryDAO.existsByNameIgnoreCase(name);
    }
}
