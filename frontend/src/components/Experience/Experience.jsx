import React from 'react';
import './Experience.css';

const Experience = () => {
  const operationalHistory = [
    {
      platform: "AWS APAC Solutions Architecture Program",
      origin: "Forage Simulation | Mar 2025",
      highlights: [
        "Architected and deployed an AWS Elastic Beanstalk infrastructure to resolve critical system latency, delivering a scalable, cost-optimized hosting solution alongside clear, client-facing financial and technical roadmaps."
      ]
    },
    {
      platform: "Electronic Arts",
      origin: "Software Engineering Simulation | Dec 2024",
      highlights: [
        "Spearheaded a new EA Sports College Football feature proposal, successfully aligning stakeholders and engineering the underlying architecture using robust C++ class definitions.",
        "Enhanced runtime performance and system stability by identifying code bottlenecks, patching critical bugs, and refactoring legacy data structures."
      ]
    }
  ];

  return (
    <section id="experience" className="experience-stream-view reveal-hidden">
      <div className="section-container-fluid">
        <h2 className="core-section-title">Operational History</h2>
        <div className="experience-timeline-column">
          {operationalHistory.map((exp, idx) => (
            <div className="experience-milestone-card glass-surface" key={idx}>
              <div className="milestone-meta-row">
                <h3 className="milestone-platform-title">{exp.platform}</h3>
                <span className="milestone-origin-tag">{exp.origin}</span>
              </div>
              <ul className="milestone-highlights-stack">
                {exp.highlights.map((h, hIdx) => <li key={hIdx}>{h}</li>)}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;