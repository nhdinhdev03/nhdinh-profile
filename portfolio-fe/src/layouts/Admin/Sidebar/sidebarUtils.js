/**
 * Utility functions for managing sidebar state persistence
 */

const SIDEBAR_STORAGE_KEY = 'admin-sidebar-state';

export const sidebarStorage = {
  /**
   * Save expanded groups to localStorage
   */
  saveExpandedGroups: (expandedGroups) => {
    try {
      localStorage.setItem(`${SIDEBAR_STORAGE_KEY}-expanded`, JSON.stringify(expandedGroups));
    } catch (error) {
      console.warn('Failed to save sidebar expanded groups:', error);
    }
  },

  /**
   * Load expanded groups from localStorage
   */
  loadExpandedGroups: () => {
    try {
      const saved = localStorage.getItem(`${SIDEBAR_STORAGE_KEY}-expanded`);
      return saved ? JSON.parse(saved) : [];
    } catch (error) {
      console.warn('Failed to load sidebar expanded groups:', error);
      return [];
    }
  },

  /**
   * Save scroll position
   */
  saveScrollPosition: (scrollTop) => {
    try {
      localStorage.setItem(`${SIDEBAR_STORAGE_KEY}-scroll`, scrollTop.toString());
    } catch (error) {
      console.warn('Failed to save sidebar scroll position:', error);
    }
  },

  /**
   * Load scroll position
   */
  loadScrollPosition: () => {
    try {
      const saved = localStorage.getItem(`${SIDEBAR_STORAGE_KEY}-scroll`);
      return saved ? parseInt(saved, 10) : 0;
    } catch (error) {
      console.warn('Failed to load sidebar scroll position:', error);
      return 0;
    }
  },

  /**
   * Clear all sidebar state
   */
  clearState: () => {
    try {
      localStorage.removeItem(`${SIDEBAR_STORAGE_KEY}-expanded`);
      localStorage.removeItem(`${SIDEBAR_STORAGE_KEY}-scroll`);
    } catch (error) {
      console.warn('Failed to clear sidebar state:', error);
    }
  }
};

/**
 * Find which group contains a specific route
 */
export const findGroupForRoute = (route, navigationGroups) => {
  for (const group of navigationGroups) {
    const foundItem = group.items.find(item => item.href === route);
    if (foundItem) {
      return group.id;
    }
  }
  return null;
};

/**
 * Get initial expanded groups based on current route
 */
export const getInitialExpandedGroups = (currentPath, navigationGroups) => {
  // First try to load from localStorage
  const savedGroups = sidebarStorage.loadExpandedGroups();
  if (savedGroups.length > 0) {
    return savedGroups;
  }

  // If no saved state, auto-expand group containing current route
  const currentGroup = findGroupForRoute(currentPath, navigationGroups);
  return currentGroup ? [currentGroup] : ['overview']; // Default to overview
};
