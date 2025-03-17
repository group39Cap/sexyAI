import React from 'react';
import './WeatherWidget.css';

const WeatherWidget = () => {
  return (
    <div className="weather-widget">
      <div className="weather-info">
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M12 3v2"></path>
          <path d="M12 19v2"></path>
          <path d="M5 12H3"></path>
          <path d="M21 12h-2"></path>
          <path d="M4.22 19.78l1.42-1.42"></path>
          <path d="M18.36 5.64l1.42-1.42"></path>
          <path d="M4.22 4.22l1.42 1.42"></path>
          <path d="M18.36 18.36l1.42 1.42"></path>
          <circle cx="12" cy="12" r="5"></circle>
        </svg>
        <span className="temperature">28°C</span>
      </div>
      <div className="weather-details">
        <span className="weather-condition">Patchy rain nearby</span>
        <div className="location-info">
          <span className="location">Accra</span>
          <span className="high-low">H: 30° L: 27°</span>
        </div>
      </div>
    </div>
  );
};

export default WeatherWidget;