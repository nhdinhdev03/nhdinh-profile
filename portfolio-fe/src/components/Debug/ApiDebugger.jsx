import React, { useState, useEffect } from 'react';
import { ProjectApi, ProjectCategoryApi, ProjectTagApi } from 'api/admin';
import axiosClient from 'api/global/axiosClient';

const ApiDebugger = () => {
  const [debugInfo, setDebugInfo] = useState({
    baseURL: '',
    projectsEndpoint: '',
    categoriesEndpoint: '',
    tagsEndpoint: '',
    testResults: {}
  });

  useEffect(() => {
    const baseURL = axiosClient.defaults.baseURL;
    setDebugInfo(prev => ({
      ...prev,
      baseURL,
      projectsEndpoint: `${baseURL}/api/projects/all`,
      categoriesEndpoint: `${baseURL}/api/project-categories/all`,
      tagsEndpoint: `${baseURL}/api/project-tags/all`
    }));

    // Test API connections
    testAPIs();
  }, []);

  const testAPIs = async () => {
    const results = {};

    // Test Projects API
    try {
      console.log('🧪 Testing Projects API...');
      const projectsRes = await ProjectApi.getAll();
      results.projects = {
        status: 'success',
        data: projectsRes.data,
        count: projectsRes.data?.length || 0
      };
      console.log('✅ Projects API test successful:', projectsRes);
    } catch (error) {
      console.error('❌ Projects API test failed:', error);
      results.projects = {
        status: 'error',
        error: error.message,
        details: error.response?.data || 'Network error'
      };
    }

    // Test Categories API
    try {
      console.log('🧪 Testing Categories API...');
      const categoriesRes = await ProjectCategoryApi.getAll();
      results.categories = {
        status: 'success',
        data: categoriesRes.data,
        count: categoriesRes.data?.length || 0
      };
      console.log('✅ Categories API test successful:', categoriesRes);
    } catch (error) {
      console.error('❌ Categories API test failed:', error);
      results.categories = {
        status: 'error',
        error: error.message,
        details: error.response?.data || 'Network error'
      };
    }

    // Test Tags API
    try {
      console.log('🧪 Testing Tags API...');
      const tagsRes = await ProjectTagApi.getAll();
      results.tags = {
        status: 'success',
        data: tagsRes.data,
        count: tagsRes.data?.length || 0
      };
      console.log('✅ Tags API test successful:', tagsRes);
    } catch (error) {
      console.error('❌ Tags API test failed:', error);
      results.tags = {
        status: 'error',
        error: error.message,
        details: error.response?.data || 'Network error'
      };
    }

    setDebugInfo(prev => ({ ...prev, testResults: results }));
  };

  const createSampleData = async () => {
    try {
      console.log('🏗️ Creating sample data...');
      
      // Create sample category
      const categoryData = {
        name: 'Full-Stack Development',
        description: 'Dự án phát triển full-stack',
        icon: '💻',
        color: '#3b82f6'
      };
      
      const categoryRes = await ProjectCategoryApi.create(categoryData);
      console.log('✅ Sample category created:', categoryRes);
      
      // Create sample tags
      const tags = [
        { name: 'React', color: '#61dafb' },
        { name: 'Node.js', color: '#339933' },
        { name: 'MongoDB', color: '#47a248' }
      ];
      
      for (const tagData of tags) {
        try {
          const tagRes = await ProjectTagApi.create(tagData);
          console.log('✅ Sample tag created:', tagRes);
        } catch (error) {
          console.warn('Tag creation failed:', error);
        }
      }
      
      // Create sample project
      const projectData = {
        title: 'Portfolio Website',
        description: 'Website portfolio cá nhân với React và Node.js',
        imageUrl: 'https://via.placeholder.com/400x300',
        demoUrl: 'https://example.com',
        sourceUrl: 'https://github.com/example/portfolio',
        categoryId: categoryRes.data.id,
        tagNames: ['React', 'Node.js'],
        isFeatured: true,
        status: 'published',
        isPublic: true,
        sortOrder: 1
      };
      
      const projectRes = await ProjectApi.create(projectData);
      console.log('✅ Sample project created:', projectRes);
      
      // Refresh test results
      testAPIs();
      
    } catch (error) {
      console.error('❌ Error creating sample data:', error);
    }
  };

  return (
    <div className="api-debugger p-6 bg-gray-50 border rounded-lg mb-6">
      <h3 className="text-lg font-semibold mb-4">🔧 API Debug Information</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <h4 className="font-medium mb-2">API Endpoints:</h4>
          <div className="text-sm space-y-1">
            <div><strong>Base URL:</strong> {debugInfo.baseURL}</div>
            <div><strong>Projects:</strong> {debugInfo.projectsEndpoint}</div>
            <div><strong>Categories:</strong> {debugInfo.categoriesEndpoint}</div>
            <div><strong>Tags:</strong> {debugInfo.tagsEndpoint}</div>
          </div>
        </div>
        
        <div>
          <h4 className="font-medium mb-2">API Test Results:</h4>
          <div className="text-sm space-y-2">
            {Object.entries(debugInfo.testResults).map(([key, result]) => (
              <div key={key} className="flex items-center gap-2">
                <span className="capitalize font-medium">{key}:</span>
                <span className={`px-2 py-1 rounded text-xs ${
                  result.status === 'success' 
                    ? 'bg-green-100 text-green-800' 
                    : 'bg-red-100 text-red-800'
                }`}>
                  {result.status === 'success' 
                    ? `✅ ${result.count} items` 
                    : `❌ ${result.error}`
                  }
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="flex gap-2">
        <button 
          onClick={testAPIs}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🔄 Test APIs
        </button>
        <button 
          onClick={createSampleData}
          className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
        >
          🏗️ Create Sample Data
        </button>
      </div>
      
      {/* Detailed results */}
      <details className="mt-4">
        <summary className="cursor-pointer font-medium">📊 Detailed Results</summary>
        <pre className="mt-2 p-4 bg-gray-100 rounded text-xs overflow-auto">
          {JSON.stringify(debugInfo.testResults, null, 2)}
        </pre>
      </details>
    </div>
  );
};

export default ApiDebugger;
