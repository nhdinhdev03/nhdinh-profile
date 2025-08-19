import React from 'react';
import useHeroData from '../hooks/useHeroData';

/**
 * Simple test component to verify API connection
 */
const HeroDataTest = () => {
  const { heroData, subHeadings, loading, error, hasData } = useHeroData('vi');

  if (loading) return <div style={{background: 'yellow', padding: '10px', margin: '10px'}}>🔄 Loading hero data...</div>;
  if (error) return <div style={{background: 'red', color: 'white', padding: '10px', margin: '10px'}}>❌ Error: {error.message}</div>;

  return (
    <div style={{ 
      padding: '20px', 
      border: '2px solid #007bff', 
      margin: '20px',
      background: '#f8f9fa',
      borderRadius: '8px'
    }}>
      <h2 style={{color: '#007bff'}}>🧪 Hero Data API Test</h2>
      
      <div style={{background: hasData ? '#d4edda' : '#f8d7da', padding: '10px', borderRadius: '4px', marginBottom: '15px'}}>
        <strong>Status: {hasData ? '✅ Data Found' : '❌ No Data'}</strong>
      </div>
      
      {heroData && (
        <div style={{background: 'white', padding: '15px', borderRadius: '4px', marginBottom: '15px'}}>
          <h4>📄 Hero Information:</h4>
          <ul style={{listStyle: 'none', padding: 0}}>
            <li><strong>🆔 ID:</strong> {heroData.heroId}</li>
            <li><strong>🌍 Locale:</strong> <span style={{background: '#007bff', color: 'white', padding: '2px 6px', borderRadius: '3px'}}>{heroData.locale}</span></li>
            <li><strong>📝 Pre-heading:</strong> "{heroData.preHeading}"</li>
            <li><strong>📋 Heading:</strong> "{heroData.heading}"</li>
            <li><strong>📄 Intro HTML:</strong> <div dangerouslySetInnerHTML={{ __html: heroData.introHtml }} style={{border: '1px solid #ccc', padding: '5px', margin: '5px 0'}} /></li>
          </ul>
        </div>
      )}
      
      <div style={{background: 'white', padding: '15px', borderRadius: '4px'}}>
        <h4>🎯 Sub-headings ({subHeadings.length}):</h4>
        {subHeadings.length > 0 ? (
          <ol>
            {subHeadings.map((sub, index) => (
              <li key={sub.subId || index} style={{margin: '8px 0'}}>
                <span style={{background: '#28a745', color: 'white', padding: '2px 6px', borderRadius: '3px', marginRight: '8px'}}>
                  #{sub.sortOrder}
                </span>
                <strong>{sub.text}</strong>
              </li>
            ))}
          </ol>
        ) : (
          <p style={{color: '#6c757d', fontStyle: 'italic'}}>No sub-headings found</p>
        )}
      </div>
    </div>
  );
};

export default HeroDataTest;
