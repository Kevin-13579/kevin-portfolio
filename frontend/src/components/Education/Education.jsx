import React from 'react';
import './Education.jsx';
import './Education.css';

const Education = () => {
  return (
    <section id="education" className="education-split-layout reveal-hidden">
      <div className="section-container-fluid edu-grid-wrapper">
        
        <div className="edu-left-wing glass-surface">
          <span className="edu-status-pill">2024 - 2027 (Expected)</span>
          <h3 className="edu-degree-label">BCA Specialised in DevOps & Automation</h3>
          <h4 className="edu-college-label">Rathinam College of Arts and Science</h4>
          <p className="edu-loc">Coimbatore, Tamil Nadu</p>
          <div className="edu-metrics-badge">
            <span className="metrics-lbl">Cumulative Grade Point Average</span>
            <span className="metrics-val">7.70 / 10.0 CGPA</span>
          </div>
        </div>

        <div className="edu-right-wing glass-surface">
          <h3 className="achievements-block-title">Achievements / Events</h3>
          <div className="achievements-vertical-list">
            <div className="achievement-item-row">
              <h4 className="ach-title">HackerRank Silver Badge | Java & Problem Solving</h4>
              <p className="ach-desc">Demonstrated mastery over core Java mechanics, multi-threading concepts, memory efficiency, and robust algorithmic problem-solving.</p>
            </div>
            <div className="achievement-item-row">
              <h4 className="ach-title">Hack with GDG S3 | KSR Engineering College</h4>
              <p className="ach-desc">Spearheaded a cross-functional team through a high-pressure, 36-hour hackathon to rapidly design, develop, and deploy the "Elite-Sponsorship" platform.</p>
            </div>
            <div className="achievement-item-row">
              <h4 className="ach-title">Interofest Hackathon Champion Mindset</h4>
              <p className="ach-desc">Demonstrated strong stakeholder management and mental resilience by dissecting critical judge evaluations under pressure.</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Education;