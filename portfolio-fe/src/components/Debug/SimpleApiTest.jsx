import React, { useState } from 'react';

const SimpleApiTest = () => {
  const [testResult, setTestResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testDirectConnection = async () => {
    setLoading(true);
    setTestResult('Testing...');
    
    try {
      // Test direct fetch to backend
      const baseURL = process.env.REACT_APP_Profile_PRODUCTION_REST_API || 'http://localhost:8080';
      const testURL = `${baseURL}/api/projects/all`;
      
      console.log('🧪 Testing direct connection to:', testURL);
      
      const response = await fetch(testURL, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log('📡 Response status:', response.status);
      console.log('📡 Response headers:', response.headers);
      
      if (response.ok) {
        const data = await response.json();
        console.log('✅ Success! Data received:', data);
        setTestResult(`✅ Success! Received ${data.length} projects\n${JSON.stringify(data, null, 2)}`);
      } else {
        const errorText = await response.text();
        console.error('❌ HTTP Error:', response.status, errorText);
        setTestResult(`❌ HTTP Error ${response.status}: ${errorText}`);
      }
    } catch (error) {
      console.error('❌ Network Error:', error);
      setTestResult(`❌ Network Error: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const checkEnvironment = () => {
    const baseURL = process.env.REACT_APP_Profile_PRODUCTION_REST_API;
    const nodeEnv = process.env.NODE_ENV;
    
    const envInfo = `
🌍 Environment Info:
- NODE_ENV: ${nodeEnv}
- Base URL: ${baseURL || 'Not set'}
- Current origin: ${window.location.origin}
- Full API URL: ${baseURL}/api/projects/all
    `;
    
    console.log(envInfo);
    setTestResult(envInfo);
  };

  return (
    <div className="simple-api-test p-4 border border-gray-300 rounded-lg bg-white mb-4">
      <h3 className="text-lg font-semibold mb-3">🧪 Simple API Connection Test</h3>
      
      <div className="flex gap-2 mb-4">
        <button 
          onClick={checkEnvironment}
          className="px-3 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          🌍 Check Environment
        </button>
        <button 
          onClick={testDirectConnection}
          disabled={loading}
          className="px-3 py-2 bg-green-500 text-white rounded hover:bg-green-600 disabled:opacity-50"
        >
          {loading ? '⏳ Testing...' : '🚀 Test API'}
        </button>
      </div>
      
      <div className="bg-gray-100 p-3 rounded font-mono text-sm whitespace-pre-wrap">
        {testResult || 'Click "Check Environment" or "Test API" to see results'}
      </div>
    </div>
  );
};

export default SimpleApiTest;
