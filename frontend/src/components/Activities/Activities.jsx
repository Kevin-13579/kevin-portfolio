import React from 'react';
import './Activities.css';

const Activities = () => {
  const images = [
    '/activities/hack with GDG/image_1.jpg',
    '/activities/hack with GDG/image_6.jpg',
    '/activities/PC day/image_1.jpg',
    '/activities/PC day/image_4.jpg',
    '/activities/cycling/image_2.jpeg',
    '/activities/cycling/image_3.jpg',
  ];

  return (
    <section id="activities" className="activities-section reveal-hidden">
      <div className="section-container-fluid">
        <h2 className="core-section-title">Activities & Hackathons</h2>
        
        <div className="carousel-container">
          <div className="carousel-track">
            {images.concat(images).map((src, index) => (
              <div className="carousel-slide" key={index}>
                <img src={src} alt={`Activity ${index}`} className="activity-img" />
              </div>
            ))}
          </div>
        </div>

        <div className="activities-summary glass-surface">
          <p>
            Beyond coding, I actively participate in tech communities, hackathons like Hack with GDG, and personal pursuits such as PC building and solo cycling. These experiences fuel my creativity, problem-solving mindset, and teamwork skills, translating directly into how I approach software engineering challenges.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Activities;
