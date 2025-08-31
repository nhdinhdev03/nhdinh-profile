import React from 'react';
import HeroSection from './sections/HeroSection';
import FeaturesSection from './sections/FeaturesSection';
import StatsSection from './sections/StatsSection';
import './Home.scss';

const Home = () => {
  return (
    <div className="home-page">
      <HeroSection />
      <FeaturesSection />
      <StatsSection />
    </div>
  );
};

export default Home;
