/**
 * API Optimization utilities for Admin panel
 * Provides caching, request deduplication, and performance monitoring
 */

// Request cache with TTL
class APICache {
  constructor(ttl = 5 * 60 * 1000) { // 5 minutes default
    this.cache = new Map();
    this.ttl = ttl;
  }

  generateKey(url, params = {}) {
    const sortedParams = Object.keys(params)
      .sort()
      .reduce((result, key) => {
        result[key] = params[key];
        return result;
      }, {});
    
    return `${url}:${JSON.stringify(sortedParams)}`;
  }

  set(key, data) {
    this.cache.set(key, {
      data,
      timestamp: Date.now(),
      hits: 0
    });
  }

  get(key) {
    const cached = this.cache.get(key);
    if (!cached) return null;

    const now = Date.now();
    if (now - cached.timestamp > this.ttl) {
      this.cache.delete(key);
      return null;
    }

    cached.hits++;
    return cached.data;
  }

  clear() {
    this.cache.clear();
  }

  getStats() {
    const entries = Array.from(this.cache.values());
    return {
      size: this.cache.size,
      totalHits: entries.reduce((sum, entry) => sum + entry.hits, 0),
      avgHits: entries.length > 0 ? entries.reduce((sum, entry) => sum + entry.hits, 0) / entries.length : 0
    };
  }
}

// Request deduplication
class RequestDeduplicator {
  constructor() {
    this.pendingRequests = new Map();
  }

  async dedupe(key, requestFn) {
    if (this.pendingRequests.has(key)) {
      return this.pendingRequests.get(key);
    }

    const promise = requestFn().finally(() => {
      this.pendingRequests.delete(key);
    });

    this.pendingRequests.set(key, promise);
    return promise;
  }

  clear() {
    this.pendingRequests.clear();
  }
}

// Performance monitor
class PerformanceMonitor {
  constructor() {
    this.metrics = new Map();
  }

  startTiming(key) {
    this.metrics.set(key, {
      startTime: performance.now(),
      endTime: null,
      duration: null
    });
  }

  endTiming(key) {
    const metric = this.metrics.get(key);
    if (metric) {
      metric.endTime = performance.now();
      metric.duration = metric.endTime - metric.startTime;
    }
    return metric?.duration || 0;
  }

  getMetric(key) {
    return this.metrics.get(key);
  }

  getAllMetrics() {
    return Array.from(this.metrics.entries()).map(([key, value]) => ({
      key,
      ...value
    }));
  }

  getAverageTime(key) {
    const allMetrics = this.getAllMetrics().filter(m => m.key.startsWith(key));
    if (allMetrics.length === 0) return 0;
    
    const totalTime = allMetrics.reduce((sum, metric) => sum + (metric.duration || 0), 0);
    return totalTime / allMetrics.length;
  }

  clear() {
    this.metrics.clear();
  }
}

// Main API Optimizer class
export class APIOptimizer {
  constructor(options = {}) {
    this.cache = new APICache(options.cacheTTL);
    this.deduplicator = new RequestDeduplicator();
    this.monitor = new PerformanceMonitor();
    this.options = {
      enableCache: true,
      enableDeduplication: true,
      enableMonitoring: true,
      enableRetry: true,
      maxRetries: 3,
      retryDelay: 1000,
      ...options
    };
  }

  // Optimize API request
  async optimizeRequest(key, requestFn, options = {}) {
    const {
      useCache = this.options.enableCache,
      useDeduplication = this.options.enableDeduplication,
      useMonitoring = this.options.enableMonitoring,
      cacheKey = key,
      params = {}
    } = options;

    // Check cache first
    if (useCache) {
      const cached = this.cache.get(this.cache.generateKey(cacheKey, params));
      if (cached) {
        return cached;
      }
    }

    // Start monitoring
    if (useMonitoring) {
      this.monitor.startTiming(key);
    }

    try {
      const executeRequest = async () => {
        if (this.options.enableRetry) {
          return this.retryRequest(requestFn, this.options.maxRetries, this.options.retryDelay);
        }
        return requestFn();
      };

      // Execute with or without deduplication
      const result = useDeduplication 
        ? await this.deduplicator.dedupe(key, executeRequest)
        : await executeRequest();

      // Cache result
      if (useCache && result) {
        this.cache.set(this.cache.generateKey(cacheKey, params), result);
      }

      return result;
    } finally {
      // End monitoring
      if (useMonitoring) {
        this.monitor.endTiming(key);
      }
    }
  }

  // Retry mechanism
  async retryRequest(requestFn, maxRetries, delay) {
    let lastError;
    
    for (let attempt = 0; attempt <= maxRetries; attempt++) {
      try {
        return await requestFn();
      } catch (error) {
        lastError = error;
        
        // Don't retry on client errors (4xx)
        if (error.response?.status >= 400 && error.response?.status < 500) {
          throw error;
        }
        
        if (attempt < maxRetries) {
          await this.delay(delay * Math.pow(2, attempt)); // Exponential backoff
        }
      }
    }
    
    throw lastError;
  }

  // Utility delay function
  delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // Batch requests
  async batchRequests(requests, options = {}) {
    const {
      concurrency = 5,
      useMonitoring = this.options.enableMonitoring
    } = options;

    if (useMonitoring) {
      this.monitor.startTiming('batch_request');
    }

    try {
      const results = [];
      for (let i = 0; i < requests.length; i += concurrency) {
        const batch = requests.slice(i, i + concurrency);
        const batchResults = await Promise.allSettled(
          batch.map(request => this.optimizeRequest(
            request.key || `batch_${i}`,
            request.fn,
            request.options
          ))
        );
        results.push(...batchResults);
      }
      
      return results;
    } finally {
      if (useMonitoring) {
        this.monitor.endTiming('batch_request');
      }
    }
  }

  // Preload data
  async preloadData(preloadConfigs) {
    const preloadPromises = preloadConfigs.map(config => 
      this.optimizeRequest(config.key, config.requestFn, {
        ...config.options,
        useCache: true
      }).catch(error => {
        console.warn(`Preload failed for ${config.key}:`, error);
        return null;
      })
    );

    return Promise.allSettled(preloadPromises);
  }

  // Cache management
  invalidateCache(pattern) {
    if (pattern) {
      // Remove matching cache entries
      for (const key of this.cache.cache.keys()) {
        if (key.includes(pattern)) {
          this.cache.cache.delete(key);
        }
      }
    } else {
      this.cache.clear();
    }
  }

  warmupCache(configs) {
    return this.preloadData(configs);
  }

  // Statistics and monitoring
  getStats() {
    return {
      cache: this.cache.getStats(),
      performance: {
        averageRequestTime: this.monitor.getAverageTime(''),
        totalRequests: this.monitor.getAllMetrics().length,
        slowestRequest: Math.max(...this.monitor.getAllMetrics().map(m => m.duration || 0)),
        fastestRequest: Math.min(...this.monitor.getAllMetrics().map(m => m.duration || 0))
      },
      pendingRequests: this.deduplicator.pendingRequests.size
    };
  }

  // Health check
  async healthCheck(endpoints) {
    const healthPromises = endpoints.map(async endpoint => {
      const startTime = performance.now();
      try {
        await endpoint.checkFn();
        return {
          name: endpoint.name,
          status: 'healthy',
          responseTime: performance.now() - startTime,
          error: null
        };
      } catch (error) {
        return {
          name: endpoint.name,
          status: 'unhealthy',
          responseTime: performance.now() - startTime,
          error: error.message
        };
      }
    });

    return Promise.all(healthPromises);
  }

  // Cleanup
  cleanup() {
    this.cache.clear();
    this.deduplicator.clear();
    this.monitor.clear();
  }
}

// Singleton instance
export const apiOptimizer = new APIOptimizer();

// Helper functions for common use cases
export const optimizeApiCall = (key, requestFn, options) => {
  return apiOptimizer.optimizeRequest(key, requestFn, options);
};

export const batchApiCalls = (requests, options) => {
  return apiOptimizer.batchRequests(requests, options);
};

export const preloadApiData = (configs) => {
  return apiOptimizer.preloadData(configs);
};

export const invalidateApiCache = (pattern) => {
  return apiOptimizer.invalidateCache(pattern);
};

export const getApiStats = () => {
  return apiOptimizer.getStats();
};

// React hook for API optimization
export const useApiOptimizer = () => {
  return {
    optimizeRequest: apiOptimizer.optimizeRequest.bind(apiOptimizer),
    batchRequests: apiOptimizer.batchRequests.bind(apiOptimizer),
    invalidateCache: apiOptimizer.invalidateCache.bind(apiOptimizer),
    getStats: apiOptimizer.getStats.bind(apiOptimizer),
    preloadData: apiOptimizer.preloadData.bind(apiOptimizer)
  };
};

export default apiOptimizer;
