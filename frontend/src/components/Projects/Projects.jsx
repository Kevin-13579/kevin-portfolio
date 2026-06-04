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
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;