import React from 'react';
import './CometBanner.css';

const CometBanner = () => {
  return (
    <div className="comet-banner">
      <div className="banner-content">
        <h2>Join the waitlist to get early access to Comet</h2>
        <p>Introducing Comet, a new browser for agentic search</p>
      </div>
      <div className="banner-image">
        <img src="/comet-illustration.png" alt="Comet browser illustration" />
      </div>
    </div>
  );
};

export default CometBanner;