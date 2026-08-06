import React from 'react';
import './Projects.css';

const Projects = () => {
  const customProjects = [
    {
      title: "AI Pothole Detection & Mapping System",
      timeline: "Feb 2026 - Mar 2026",
      badges: ["React JS", "Spring Boot", "Gemini AI", "MySQL"],
      desc: [
        "Engineered a robust full-stack solution with a Spring Boot REST API and a responsive React.js frontend to stream, process, and log geospatial road hazard data efficiently.",
        "Integrated Gemini AI and React-Leaflet to deliver real-time, geolocated pothole analysis, enabling automated severity verification and live hazard mapping on a centralized dashboard."
      ]
    },
    {
      title: "Elite Sponsorship Platform",
      timeline: "Jan 2026 - Feb 2026",
      badges: ["Role Architecture", "RBAC", "REST API", "Full Stack"],
      desc: [
        "Architected a full-stack corporate sponsorship platform using Spring Boot and React, engineering role-based access control (RBAC) and an automated tracking system for student developer proposals."
      ]
    }
  ];

  return (
    <section id="projects" className="projects-grid-view reveal-hidden">
      <div className="section-container-fluid">
        <h2 className="core-section-title">Technical Architectures</h2>
        <div className="projects-flex-row">
          {customProjects.map((proj, idx) => (
            <div className="project-premium-glass-card glass-surface" key={idx}>
              <div className="project-card-header">
                <span className="project-timeline-marker">{proj.timeline}</span>
                <h3 className="project-heading-label">{proj.title}</h3>
              </div>
              <div className="project-tech-badges">
                {proj.badges.map((b, bIdx) => <span key={bIdx} className="badge-item">{b}</span>)}
              </div>
              <ul className="project-descriptive-bullets">
                {proj.desc.map((d, dIdx) => <li key={dIdx}>{d}</li>)}
              </ul>
              <div style={{ marginTop: '1.5rem' }}>
                <a href="#" target="_blank" rel="noreferrer" className="btn-dark-pill" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem', padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  View Code
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;