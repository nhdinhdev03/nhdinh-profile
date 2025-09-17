import BaseApi from "api/global/baseApi";
import axiosClient from "api/global/axiosClient";

class UserProjectApi extends BaseApi {
  constructor() {
    super("projects");
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
  }

  // Cache management
  _getCacheKey(method, params = {}) {
    return `${method}_${JSON.stringify(params)}`;
  }

  _setCache(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now()
    });
  }

  _getCache(key) {
    const cached = this.cache.get(key);
    if (cached && (Date.now() - cached.timestamp) < this.cacheTimeout) {
      return cached.data;
    }
    this.cache.delete(key);
    return null;
  }

  _clearCache() {
    this.cache.clear();
  }

  // Get public projects for user with caching
  async getPublicProjects(useCache = true) {
    const cacheKey = this._getCacheKey('getPublicProjects');
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/public`);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error fetching public projects:', error);
      throw error;
    }
  }

  // Get featured projects with caching
  async getFeaturedProjects(useCache = true) {
    const cacheKey = this._getCacheKey('getFeaturedProjects');
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/featured`);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }

  // Get projects by category with caching
  async getByCategory(categoryId, useCache = true) {
    const cacheKey = this._getCacheKey('getByCategory', { categoryId });
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/category/${categoryId}`);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error fetching projects by category:', error);
      throw error;
    }
  }

  // Get projects by tag
  async getByTag(tagId, useCache = true) {
    const cacheKey = this._getCacheKey('getByTag', { tagId });
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/tag/${tagId}`);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error fetching projects by tag:', error);
      throw error;
    }
  }

  // Get projects by tag name
  async getByTagName(tagName, useCache = true) {
    const cacheKey = this._getCacheKey('getByTagName', { tagName });
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/tag/name/${tagName}`);
      this._setCache(cacheKey, response);
      return response;
    } catch (error) {
      console.error('Error fetching projects by tag name:', error);
      throw error;
    }
  }

  // Search projects with debouncing support
  async search(keyword, useCache = false) {
    if (!keyword || keyword.trim().length < 2) {
      return { data: [] };
    }

    const cacheKey = this._getCacheKey('search', { keyword: keyword.trim() });
    
    if (useCache) {
      const cached = this._getCache(cacheKey);
      if (cached) return cached;
    }

    try {
      const response = await axiosClient.get(`${this.uri}/search`, { 
        params: { keyword: keyword.trim() } 
      });
      
      if (useCache) {
        this._setCache(cacheKey, response);
      }
      
      return response;
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  }

  // Increment view count (non-blocking)
  async incrementViewCount(projectId) {
    try {
      // Fire and forget - don't wait for response
      axiosClient.post(`${this.uri}/${projectId}/view`).catch(err => {
        console.warn('Failed to increment view count:', err);
      });
    } catch (error) {
      console.warn('Error setting up view count increment:', error);
    }
  }

  // OPTIMIZED: Get project by ID with optional view increment
  async getByIdAndView(projectId, shouldIncrementView = true) {
    try {
      // Increment view count asynchronously (non-blocking)
      if (shouldIncrementView) {
        this.incrementViewCount(projectId);
      }
      
      // Get project details
      const response = await axiosClient.get(`${this.uri}/${projectId}`);
      return response;
    } catch (error) {
      console.error('Error fetching project by ID:', error);
      throw error;
    }
  }

  // Batch operations for better performance
  async getMultipleByIds(projectIds) {
    try {
      const response = await axiosClient.post(`${this.uri}/batch`, { 
        ids: projectIds 
      });
      return response;
    } catch (error) {
      console.error('Error fetching multiple projects:', error);
      throw error;
    }
  }

  // Clear cache when needed (after updates)
  clearCache() {
    this._clearCache();
  }
}

const userProjectApi = new UserProjectApi();
export default userProjectApi;
