import { useState, useEffect, useCallback, useMemo } from 'react';
import { message } from 'antd';

/**
 * Custom hook for managing admin data with CRUD operations
 * @param {Object} api - API service object with CRUD methods
 * @param {Object} options - Configuration options
 */
export const useAdminData = (api, options = {}) => {
  const {
    initialData = [],
    autoFetch = true,
    cacheKey = null,
    transformResponse = null,
    onError = null,
    onSuccess = null,
    enableCache = false,
    cacheTimeout = 5 * 60 * 1000 // 5 minutes
  } = options;

  const [data, setData] = useState(initialData);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [lastFetch, setLastFetch] = useState(null);

  // Cache management
  const getCachedData = useCallback(() => {
    if (!enableCache || !cacheKey) return null;
    
    try {
      const cached = localStorage.getItem(`admin_cache_${cacheKey}`);
      if (!cached) return null;
      
      const { data: cachedData, timestamp } = JSON.parse(cached);
      const now = Date.now();
      
      if (now - timestamp > cacheTimeout) {
        localStorage.removeItem(`admin_cache_${cacheKey}`);
        return null;
      }
      
      return cachedData;
    } catch (error) {
      console.warn('Error reading cache:', error);
      return null;
    }
  }, [enableCache, cacheKey, cacheTimeout]);

  const setCachedData = useCallback((data) => {
    if (!enableCache || !cacheKey) return;
    
    try {
      const cacheData = {
        data,
        timestamp: Date.now()
      };
      localStorage.setItem(`admin_cache_${cacheKey}`, JSON.stringify(cacheData));
    } catch (error) {
      console.warn('Error setting cache:', error);
    }
  }, [enableCache, cacheKey]);

  // Fetch data
  const fetchData = useCallback(async (showLoading = true) => {
    if (!api || !api.getAll) {
      console.error('API object must have getAll method');
      return;
    }

    // Check cache first
    if (enableCache) {
      const cachedData = getCachedData();
      if (cachedData) {
        setData(cachedData);
        setLastFetch(Date.now());
        return cachedData;
      }
    }

    if (showLoading) setLoading(true);
    setError(null);

    try {
      const response = await api.getAll();
      const responseData = response?.data || response;
      
      // Transform data if transformer provided
      const finalData = transformResponse ? transformResponse(responseData) : responseData;
      
      setData(finalData);
      setLastFetch(Date.now());
      
      // Cache the data
      setCachedData(finalData);
      
      if (onSuccess) onSuccess('fetch', finalData);
      
      return finalData;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Lỗi tải dữ liệu';
      setError(errorMessage);
      
      if (onError) {
        onError('fetch', err);
      } else {
        message.error(`Lỗi tải dữ liệu: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      if (showLoading) setLoading(false);
    }
  }, [api, transformResponse, onError, onSuccess, enableCache, getCachedData, setCachedData]);

  // Create item
  const createItem = useCallback(async (itemData) => {
    if (!api || !api.create) {
      throw new Error('API object must have create method');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.create(itemData);
      const newItem = response?.data || response;
      
      // Transform if needed
      const finalItem = transformResponse ? transformResponse([newItem])[0] : newItem;
      
      // Update local state
      setData(prevData => [finalItem, ...prevData]);
      
      // Clear cache
      if (enableCache && cacheKey) {
        localStorage.removeItem(`admin_cache_${cacheKey}`);
      }
      
      if (onSuccess) onSuccess('create', finalItem);
      message.success('Tạo mới thành công!');
      
      return finalItem;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Lỗi tạo mới';
      setError(errorMessage);
      
      if (onError) {
        onError('create', err);
      } else {
        message.error(`Lỗi tạo mới: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, transformResponse, onError, onSuccess, enableCache, cacheKey]);

  // Update item
  const updateItem = useCallback(async (id, itemData) => {
    if (!api || !api.update) {
      throw new Error('API object must have update method');
    }

    setLoading(true);
    setError(null);

    try {
      const response = await api.update(id, itemData);
      const updatedItem = response?.data || response;
      
      // Transform if needed
      const finalItem = transformResponse ? transformResponse([updatedItem])[0] : updatedItem;
      
      // Update local state
      setData(prevData => 
        prevData.map(item => 
          item.id === id ? finalItem : item
        )
      );
      
      // Clear cache
      if (enableCache && cacheKey) {
        localStorage.removeItem(`admin_cache_${cacheKey}`);
      }
      
      if (onSuccess) onSuccess('update', finalItem);
      message.success('Cập nhật thành công!');
      
      return finalItem;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Lỗi cập nhật';
      setError(errorMessage);
      
      if (onError) {
        onError('update', err);
      } else {
        message.error(`Lỗi cập nhật: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, transformResponse, onError, onSuccess, enableCache, cacheKey]);

  // Delete item
  const deleteItem = useCallback(async (id) => {
    if (!api || !api.delete) {
      throw new Error('API object must have delete method');
    }

    setLoading(true);
    setError(null);

    try {
      await api.delete(id);
      
      // Update local state
      setData(prevData => prevData.filter(item => item.id !== id));
      
      // Clear cache
      if (enableCache && cacheKey) {
        localStorage.removeItem(`admin_cache_${cacheKey}`);
      }
      
      if (onSuccess) onSuccess('delete', id);
      message.success('Xóa thành công!');
      
      return id;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Lỗi xóa';
      setError(errorMessage);
      
      if (onError) {
        onError('delete', err);
      } else {
        message.error(`Lỗi xóa: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, onError, onSuccess, enableCache, cacheKey]);

  // Bulk operations
  const bulkDelete = useCallback(async (ids) => {
    if (!Array.isArray(ids) || ids.length === 0) return;

    setLoading(true);
    setError(null);

    try {
      const promises = ids.map(id => api.delete(id));
      await Promise.all(promises);
      
      // Update local state
      setData(prevData => prevData.filter(item => !ids.includes(item.id)));
      
      // Clear cache
      if (enableCache && cacheKey) {
        localStorage.removeItem(`admin_cache_${cacheKey}`);
      }
      
      if (onSuccess) onSuccess('bulkDelete', ids);
      message.success(`Xóa thành công ${ids.length} mục!`);
      
      return ids;
    } catch (err) {
      const errorMessage = err?.response?.data?.message || err?.message || 'Lỗi xóa hàng loạt';
      setError(errorMessage);
      
      if (onError) {
        onError('bulkDelete', err);
      } else {
        message.error(`Lỗi xóa hàng loạt: ${errorMessage}`);
      }
      
      throw err;
    } finally {
      setLoading(false);
    }
  }, [api, onError, onSuccess, enableCache, cacheKey]);

  // Refresh data
  const refresh = useCallback(() => {
    return fetchData(true);
  }, [fetchData]);

  // Clear cache
  const clearCache = useCallback(() => {
    if (enableCache && cacheKey) {
      localStorage.removeItem(`admin_cache_${cacheKey}`);
    }
  }, [enableCache, cacheKey]);

  // Auto fetch on mount
  useEffect(() => {
    if (autoFetch) {
      fetchData();
    }
  }, [autoFetch, fetchData]);

  // Computed values
  const stats = useMemo(() => {
    return {
      total: data.length,
      lastUpdated: lastFetch,
      hasError: !!error,
      isEmpty: data.length === 0,
      isStale: enableCache && lastFetch && (Date.now() - lastFetch > cacheTimeout)
    };
  }, [data.length, lastFetch, error, enableCache, cacheTimeout]);

  return {
    // Data
    data,
    loading,
    error,
    stats,
    
    // Actions
    fetchData,
    createItem,
    updateItem,
    deleteItem,
    bulkDelete,
    refresh,
    clearCache,
    
    // Utilities
    setData,
    setLoading,
    setError
  };
};

export default useAdminData;
