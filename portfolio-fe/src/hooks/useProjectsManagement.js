import { useState, useEffect, useCallback, useMemo } from "react";
import { useDebounce } from "./useDebounce";
import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from "api/admin";

const useProjectsManagement = () => {
  const [projects, setProjects] = useState([]);
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");
  const [error, setError] = useState(null);

  // Debounce search term to avoid excessive API calls
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  // Memoized filtered projects to avoid unnecessary recalculations
  const filteredProjects = useMemo(() => {
    return projects.filter((project) => {
      const matchesFilter = filter === "all" || project.status === filter;
      const matchesSearch =
        !debouncedSearchTerm ||
        project.title
          .toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase()) ||
        project.description
          ?.toLowerCase()
          .includes(debouncedSearchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [projects, filter, debouncedSearchTerm]);

  // Memoized stats to avoid recalculation
  const stats = useMemo(() => {
    const total = projects.length;
    const published = projects.filter((p) => p.status === "published").length;
    const draft = projects.filter((p) => p.status === "draft").length;
    const featured = projects.filter((p) => p.isFeatured).length;

    return { total, published, draft, featured };
  }, [projects]);

  // Load initial data
  const loadData = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const [projectsRes, categoriesRes, tagsRes] = await Promise.allSettled([
        ProjectApi.getAll(),
        ProjectCategoryApi.getAll(),
        ProjectTagApi.getAll(),
      ]);

      // Handle projects
      if (projectsRes.status === "fulfilled") {
        setProjects(projectsRes.value.data || []);
      } else {
        console.error("Error loading projects:", projectsRes.reason);
      }

      // Handle categories
      if (categoriesRes.status === "fulfilled") {
        setCategories(categoriesRes.value.data || []);
      } else {
        console.error("Error loading categories:", categoriesRes.reason);
      }

      // Handle tags
      if (tagsRes.status === "fulfilled") {
        setTags(tagsRes.value.data || []);
      } else {
        console.error("Error loading tags:", tagsRes.reason);
      }
    } catch (error) {
      console.error("Error loading data:", error);
      setError("Có lỗi xảy ra khi tải dữ liệu");
    } finally {
      setLoading(false);
    }
  }, []);

  // Optimized create project - update state directly instead of reloading
  const createProject = useCallback(async (formData) => {
    try {
      const response = await ProjectApi.create(formData);
      const newProject = response.data;

      // Update state directly instead of reloading all data
      setProjects((prev) => [newProject, ...prev]);

      return newProject;
    } catch (error) {
      console.error("Error creating project:", error);
      setError("Có lỗi xảy ra khi tạo dự án");
      throw error;
    }
  }, []);

  // Optimized update project
  const updateProject = useCallback(async (projectId, formData) => {
    try {
      const response = await ProjectApi.update(projectId, formData);
      const updatedProject = response.data;

      // Update state directly
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId ? updatedProject : project
        )
      );

      return updatedProject;
    } catch (error) {
      console.error("Error updating project:", error);
      setError("Có lỗi xảy ra khi cập nhật dự án");
      throw error;
    }
  }, []);

  // Optimized delete project
  const deleteProject = useCallback(async (projectId) => {
    try {
      await ProjectApi.delete(projectId);

      // Update state directly
      setProjects((prev) => prev.filter((project) => project.id !== projectId));
    } catch (error) {
      console.error("Error deleting project:", error);
      setError("Có lỗi xảy ra khi xóa dự án");
      throw error;
    }
  }, []);

  // Optimized toggle featured
  const toggleFeatured = useCallback(async (projectId, currentStatus) => {
    try {
      await ProjectApi.toggleFeatured(projectId, !currentStatus);

      // Update state directly
      setProjects((prev) =>
        prev.map((project) =>
          project.id === projectId
            ? { ...project, isFeatured: !currentStatus }
            : project
        )
      );
    } catch (error) {
      console.error("Error toggling featured status:", error);
      setError("Có lỗi xảy ra khi cập nhật trạng thái nổi bật");
      throw error;
    }
  }, []);

  // Batch operations for better performance
  const batchUpdateProjects = useCallback(async (updates) => {
    try {
      const response = await ProjectApi.batchUpdate(updates);

      // Update state with all changes
      setProjects((prev) => {
        const updatedProjects = [...prev];
        response.data.forEach((updatedProject) => {
          const index = updatedProjects.findIndex(
            (p) => p.id === updatedProject.id
          );
          if (index !== -1) {
            updatedProjects[index] = updatedProject;
          }
        });
        return updatedProjects;
      });
    } catch (error) {
      console.error("Error batch updating projects:", error);
      setError("Có lỗi xảy ra khi cập nhật hàng loạt");
      throw error;
    }
  }, []);

  // Clear error
  const clearError = useCallback(() => {
    setError(null);
  }, []);

  // Load data on mount
  useEffect(() => {
    loadData();
  }, [loadData]);

  return {
    // Data
    projects,
    categories,
    tags,
    filteredProjects,
    stats,

    // States
    loading,
    error,
    filter,
    searchTerm,

    // Actions
    setFilter,
    setSearchTerm,
    loadData,
    createProject,
    updateProject,
    deleteProject,
    toggleFeatured,
    batchUpdateProjects,
    clearError,
  };
};

export default useProjectsManagement;
