import React from 'react';
import profileImg from '../../assets/profile.png';
import './Hero.css';

const Hero = ({ theme }) => {
  return (
    <section id="home" className={`hero-pane layout-${theme} reveal-hidden`}>
      {/* Background Aura Layers directly matching design templates */}
      {theme === 'dark' ? (
        <div className="dark-radial-aura-core"></div>
      ) : (
        <div className="light-fluid-teal-shape"></div>
      )}

      <div className="hero-structural-content">
        {theme === 'dark' ? (
          <>
            <div className="dark-left-card">
              <span className="hero-subtext-heading">Hello, I'm</span>
              <h1 className="hero-main-name">Kevin P</h1>
              
              {/* Social Accounts Sidebar stacked vertically as seen in image_30cf9d.jpg */}
              <div className="dark-social-vertical-bar">
                <a href="https://www.linkedin.com/in/kevin-p-873731321?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="social-icon-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                </a>
                <a href="https://github.com/Kevin-13579" target="_blank" rel="noreferrer" className="social-icon-link">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                </a>
              </div>
            </div>

            <div className="dark-center-avatar">
              <img src={profileImg} alt="Kevin Portrait" className="hero-avatar-graphic" />
            </div>

            <div className="dark-right-card">
              <span className="creative-badge-tag">Full Stack</span>
              <h2 className="creative-h2">Developer & DevOps Engineer</h2>
              <a href="#contact" className="dark-resume-anchor">LET'S TALK</a>
            </div>
          </>
        ) : (
          <div className="light-split-wrapper">
            <div className="light-text-block">
              <h1 className="light-greet-title">Hey! I am<br />Full Stack Developer</h1>
              <p className="light-para-summary">
                Full-Stack Developer & DevOps Enthusiast
I build scalable, secure, multi-role web applications from the ground up. Specializing in Java, Spring Boot, React, and MySQL, I blend clean code with robust architecture to turn complex ideas into high-performance digital products.
</p>
              <div className="light-buttons-cluster">
                <a href="#projects" className="btn-teal-fill">LEARN MORE</a>
                <a href="#contact" className="btn-dark-pill">HIRE ME</a>
                <div className="light-social-icons">
                  <a href="https://www.linkedin.com/in/kevin-p-873731321?utm_source=share_via&utm_content=profile&utm_medium=member_android" target="_blank" rel="noreferrer" className="social-icon-btn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zM7.119 20.452H3.554V9h3.565v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  </a>
                  <a href="https://github.com/Kevin-13579" target="_blank" rel="noreferrer" className="social-icon-btn">
                    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/></svg>
                  </a>
                </div>
              </div>
            </div>

            <div className="light-graphic-block">
              <div className="light-circular-frame-container">
                <div className="rotating-dashed-border"></div>
                <div className="avatar-circle-inner">
                  <img src={profileImg} alt="Kevin Web Developer" className="hero-avatar-graphic" />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Hero;
// Source reference: Explicitly rendering the structural content matching file image_30cf9d.jpg and image_30d2c4.jpg[cite: 5]