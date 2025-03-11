import React from 'react';
import './NewsCard.css';

const NewsCards = () => {
  const newsItems = [
    {
      id: 1,
      image: '/musk.jpg',
      title: 'Musk Says X Hit By "Massive Cyberattack"',
    },
    {
      id: 2,
      image: '/math.jpg',
      title: 'Student Cracks Century-Old Math Problem',
    }
  ];
  
  return (
    <div className="news-cards">
      {newsItems.map(item => (
        <div key={item.id} className="news-card">
          <div className="news-image">
            <img src={item.image} alt={item.title} />
          </div>
          <div className="news-title">{item.title}</div>
        </div>
      ))}
    </div>
  );
};

export default NewsCards;