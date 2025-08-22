import axiosClient from './axiosClient';

class BaseApi {
    constructor(uri) {
        this.uri = uri;
        this.axiosClient = axiosClient;
        this.cache = new Map();
        this.cacheTimeout = 5 * 60 * 1000; // 5 minutes
    }

    // Cache management methods
    _getCacheKey(method, params = {}) {
        return `${this.uri}_${method}_${JSON.stringify(params)}`;
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

    _clearCache(pattern = null) {
        if (pattern) {
            // Clear specific cache entries matching pattern
            for (const key of this.cache.keys()) {
                if (key.includes(pattern)) {
                    this.cache.delete(key);
                }
            }
        } else {
            // Clear all cache
            this.cache.clear();
        }
    }

    // Enhanced API methods with caching and error handling
    async getById(id, useCache = true) {
        const cacheKey = this._getCacheKey('getById', { id });
        
        if (useCache) {
            const cached = this._getCache(cacheKey);
            if (cached) return cached;
        }

        try {
            const response = await axiosClient.get(`${this.uri}/${id}`);
            if (useCache) {
                this._setCache(cacheKey, response);
            }
            return response;
        } catch (error) {
            console.error(`Error fetching ${this.uri} by ID ${id}:`, error);
            throw error;
        }
    }

    async getAll(useCache = true, params = {}) {
        const cacheKey = this._getCacheKey('getAll', params);
        
        if (useCache) {
            const cached = this._getCache(cacheKey);
            if (cached) return cached;
        }

        try {
            const response = await axiosClient.get(`${this.uri}/all`, { params });
            if (useCache) {
                this._setCache(cacheKey, response);
            }
            return response;
        } catch (error) {
            console.error(`Error fetching all ${this.uri}:`, error);
            throw error;
        }
    }

    async create(data) {
        try {
            const response = await axiosClient.post(`${this.uri}/create`, data);
            // Clear cache after create
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error creating ${this.uri}:`, error);
            throw error;
        }
    }

    async update(id, data) {
        try {
            const response = await axiosClient.put(`${this.uri}/${id}`, data);
            // Clear cache after update
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error updating ${this.uri} with ID ${id}:`, error);
            throw error;
        }
    }

    async delete(id) {
        try {
            const response = await axiosClient.delete(`${this.uri}/${id}`);
            // Clear cache after delete
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error deleting ${this.uri} with ID ${id}:`, error);
            throw error;
        }
    }

    // Enhanced pagination with caching
    async getByPage(page = 1, limit = 10, search = '', useCache = true) {
        const params = { page, limit, search };
        const cacheKey = this._getCacheKey('getByPage', params);
        
        if (useCache) {
            const cached = this._getCache(cacheKey);
            if (cached) return cached.data;
        }

        try {
            const response = await axiosClient.get(this.uri, { params });
            const result = response.data;
            
            if (useCache) {
                this._setCache(cacheKey, { data: result });
            }
            
            return result;
        } catch (error) {
            console.error(`Error fetching paginated ${this.uri}:`, error);
            throw error;
        }
    }

    // Batch operations for better performance
    async batchCreate(dataArray) {
        try {
            const response = await axiosClient.post(`${this.uri}/batch/create`, { items: dataArray });
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error batch creating ${this.uri}:`, error);
            throw error;
        }
    }

    async batchUpdate(updates) {
        try {
            const response = await axiosClient.put(`${this.uri}/batch/update`, { updates });
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error batch updating ${this.uri}:`, error);
            throw error;
        }
    }

    async batchDelete(ids) {
        try {
            const response = await axiosClient.delete(`${this.uri}/batch/delete`, { data: { ids } });
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error batch deleting ${this.uri}:`, error);
            throw error;
        }
    }

    // Utility methods
    clearCache() {
        this._clearCache();
    }

    // Search with debouncing support
    async search(keyword, params = {}, useCache = false) {
        if (!keyword || keyword.trim().length < 2) {
            return { data: [] };
        }

        const searchParams = { keyword: keyword.trim(), ...params };
        const cacheKey = this._getCacheKey('search', searchParams);
        
        if (useCache) {
            const cached = this._getCache(cacheKey);
            if (cached) return cached;
        }

        try {
            const response = await axiosClient.get(`${this.uri}/search`, { params: searchParams });
            
            if (useCache) {
                this._setCache(cacheKey, response);
            }
            
            return response;
        } catch (error) {
            console.error(`Error searching ${this.uri}:`, error);
            throw error;
        }
    }

    // Toggle methods for common boolean fields
    async toggle(id, field, value) {
        try {
            const response = await axiosClient.patch(`${this.uri}/${id}/toggle`, { 
                field, 
                value 
            });
            this._clearCache();
            return response;
        } catch (error) {
            console.error(`Error toggling ${field} for ${this.uri} with ID ${id}:`, error);
            throw error;
        }
    }

    // Specific toggle methods
    async toggleFeatured(id, value) {
        return this.toggle(id, 'isFeatured', value);
    }

    async togglePublic(id, value) {
        return this.toggle(id, 'isPublic', value);
    }

    async toggleStatus(id, status) {
        return this.toggle(id, 'status', status);
    }
}

export default BaseApi;
