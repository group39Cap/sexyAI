import React from 'react';
import SearchHeader from './SearchHeader';
import CometBanner from './CometBanner';
import WeatherWidget from './WeatherWidget';
import NewsCards from './NewsCards';
import Footer from './Footer';
import './MainContent.css';

const MainContent = () => {
  return (
    <div className="main-content">
      <SearchHeader />
      <CometBanner />
      <div className="widgets-container">
        <WeatherWidget />
        <NewsCards />
      </div>
      <Footer />
    </div>
  );
};

export default MainContent;
