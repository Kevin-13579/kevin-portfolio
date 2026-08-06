import React, { useEffect, useRef } from 'react';
import './Skills.css';

const Skills = () => {
  const cardsRef = useRef([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      cardsRef.current.forEach(card => {
        if (!card) return;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      });
    };

    const container = document.getElementById('skills-cards-container');
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const skillCategories = [
    {
      title: "Frontend",
      skills: ["React.js (v18+)", "CSS3", "JavaScript (ES6+)", "HTML5"]
    },
    {
      title: "Backend",
      skills: ["Java (JDK 17/21 LTS)", "Spring Boot (v3.x)", "C/C++ (C11/C++17)"]
    },
    {
      title: "Database & Tools",
      skills: ["MySQL (v8.0)", "Git (v2.x)"]
    }
  ];

  return (
    <section id="skills" className="skills-section reveal-hidden">
      <div className="skills-bg-animation"></div>
      <div className="section-container-fluid">
        <h2 className="core-section-title">Technical Expertise</h2>
        <div className="glass-surface" style={{ padding: '3rem', width: '100%', borderRadius: '24px' }}>
          <div id="skills-cards-container" className="skills-grid">
            {skillCategories.map((category, idx) => (
              <div 
                key={idx} 
                className="skill-card-wrapper stagger-reveal" 
                style={{ animationDelay: `${idx * 0.15}s` }}
                ref={el => cardsRef.current[idx] = el}
              >
                <div className="skill-card-content">
                  <h3 className="skill-category-title">{category.title}</h3>
                  <ul className="skill-list">
                    {category.skills.map((skill, sIdx) => (
                      <li key={sIdx} className="skill-item">{skill}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
