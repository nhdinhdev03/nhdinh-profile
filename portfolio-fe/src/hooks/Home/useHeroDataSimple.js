import { useState, useEffect } from 'react';
import userHeroApi from 'api/services/userHeroApi';

/**
 * Custom hook to fetch hero data for user pages - Single Hero
 */
const useHeroData = () => {
  const [heroData, setHeroData] = useState(null);
  const [subHeadings, setSubHeadings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHeroData = async () => {
      try {
        setLoading(true);
        setError(null);

        // console.log('🔍 Fetching hero data...'); // Debug log - removed for production

        // Fetch active hero using user API
        const heroResponse = await userHeroApi.getActiveHero();
        // console.log('📥 Hero response:', heroResponse); // Debug log - removed for production
        
        if (heroResponse.data) {
          setHeroData(heroResponse.data);
          // console.log('✅ Hero data set:', heroResponse.data); // Debug log - removed for production
          
          // Fetch sub-headings for this hero
          try {
            const subHeadingsResponse = await userHeroApi.getActiveSubHeadings(heroResponse.data.heroId);
            // console.log('📥 Sub-headings response:', subHeadingsResponse); // Debug log - removed for production
            setSubHeadings(subHeadingsResponse.data || []);
            // console.log('✅ Sub-headings set:', subHeadingsResponse.data || []); // Debug log - removed for production
          } catch (subError) {
            console.warn('⚠️ Could not fetch sub-headings:', subError);
            setSubHeadings([]);
          }
        } else {
          // console.log('❌ No hero data found'); // Debug log - removed for production
          setHeroData(null);
          setSubHeadings([]);
        }
      } catch (err) {
        console.error('💥 Error fetching hero data:', err);
        setError(err);
        setHeroData(null);
        setSubHeadings([]);
      } finally {
        setLoading(false);
        // console.log('✅ Loading complete'); // Debug log - removed for production
      }
    };

    fetchHeroData();
  }, []); // No locale dependency

  return {
    heroData,
    subHeadings,
    loading,
    error,
    hasData: !!heroData
  };
};

export default useHeroData;
