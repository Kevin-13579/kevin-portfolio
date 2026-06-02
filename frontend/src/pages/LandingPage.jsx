import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import './LandingPage.css';

function LandingPage() {
  const [profile, setProfile] = useState(null);
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [timelineItems, setTimelineItems] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modal State for Project Details
  const [selectedProject, setSelectedProject] = useState(null);

  // Carousel Ref
  const carouselTrackRef = useRef(null);

  useEffect(() => {
    // Fetch all portfolio components concurrently
    Promise.all([
      axios.get('http://localhost:8080/api/profile'),
      axios.get('http://localhost:8080/api/projects'),
      axios.get('http://localhost:8080/api/skills'),
      axios.get('http://localhost:8080/api/certifications'),
      axios.get('http://localhost:8080/api/events'),
      axios.get('http://localhost:8080/api/timeline')
    ])
      .then(([profileRes, projectsRes, skillsRes, certsRes, eventsRes, timelineRes]) => {
        setProfile(profileRes.data);
        setProjects(projectsRes.data);
        setSkills(skillsRes.data);
        setCertifications(certsRes.data);
        setEvents(eventsRes.data);
        setTimelineItems(timelineRes.data);
        setLoading(false);
      })
      .catch(error => {
        console.error("Error loading portfolio data from backend:", error);
        setLoading(false);
      });
  }, []);

  // Scroll carousel helper
  const handleScroll = (direction) => {
    const track = carouselTrackRef.current;
    if (track) {
      const scrollAmount = direction === 'left' ? -360 : 360;
      track.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (loading) {
    return (
      <div className="loading-screen">
        <div className="spinner"></div>
        <p>Loading Portfolio Spaces...</p>
      </div>
    );
  }

  // Fallback profile if backend isn't loaded
  const activeProfile = profile || {
    name: "Kevin P",
    title: "BCA Student | Full Stack Developer",
    bio: "Motivated and detail-oriented BCA student with skills in C/C++, JavaScript, Java, and MySQL, seeking an internship or entry-level role in programming or app development to apply and grow technical expertise.",
    email: "kevinlokesh333@gmail.com",
    location: "Coimbatore, Tamilnadu",
    phone: "+91 98765 43210",
    githubLink: "https://github.com",
    linkedinLink: "https://linkedin.com",
    twitterLink: "https://twitter.com",
    websiteLink: "https://kevinp.dev",
    imageUrl: ""
  };

  // Group timeline items
  const experiences = timelineItems.filter(item => item.type === 'EXPERIENCE');
  const education = timelineItems.filter(item => item.type === 'EDUCATION');

  const formatTimelineDuration = (item) => {
    if (item.startDate) {
      const start = item.startDate;
      if (item.status === 'ONGOING' || item.status === 'CURRENT') {
        return `${start} — Present`;
      }
      if (item.endDate) {
        return `${start} — ${item.endDate}`;
      }
      return item.duration || start;
    }
    return item.duration || '';
  };

  const sortTimeline = (items) => {
    return [...items].sort((a, b) => {
      const aDate = a.startDate ? new Date(a.startDate) : new Date(a.duration || 0);
      const bDate = b.startDate ? new Date(b.startDate) : new Date(b.duration || 0);
      return bDate - aDate;
    });
  };

  const sortedExperiences = sortTimeline(experiences);
  const sortedEducation = sortTimeline(education);

  // Group skills by category
  const categories = ['Frontend', 'Backend', 'Database', 'Tools'];
  const getSkillsByCategory = (cat) => {
    return skills.filter(s => {
      const category = s.category ? s.category.toLowerCase() : '';
      if (cat === 'Tools') {
        return category.includes('tool') || category.includes('devops');
      }
      return category.startsWith(cat.toLowerCase().substring(0, 4));
    });
  };

  // Helper toggle handler leveraging dataset modifications directly on document element to keep functional logic isolated
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    if (currentTheme === 'light') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else if (currentTheme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'light');
    } else {
      const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      document.documentElement.setAttribute('data-theme', systemPrefersDark ? 'light' : 'dark');
    }
  };

  return (
    <div className="landing-container">
      {/* 1. NAVBAR */}
      <nav className="global-navbar">
        <div className="navbar-brand">
          <span className="brand-dot"></span>.dev
        </div>
        <div className="navbar-actions">
          <button className="theme-toggle-btn" onClick={toggleTheme} aria-label="Toggle Theme Layout">
            <svg className="sun-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
              <circle cx="12" cy="12" r="5"></circle>
              <line x1="12" y1="1" x2="12" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="23"></line>
              <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
              <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
              <line x1="1" y1="12" x2="3" y2="12"></line>
              <line x1="21" y1="12" x2="23" y2="12"></line>
              <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
              <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg className="moon-icon" viewBox="0 0 24 24" width="20" height="20" stroke="currentColor" strokeWidth="2.5" fill="none">
              <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
          </button>
        </div>
      </nav>

      {/* 2. INTRODUCTION SECTION */}
      <section className="hero-section wrapper-block">
        <div className="hero-grid">
          <div className="hero-info">
            <h1 className="hero-name">{activeProfile.name}</h1>
            <h2 className="hero-title">{activeProfile.title}</h2>
            <p className="hero-bio">{activeProfile.bio}</p>
            
            <div className="hero-meta-grid">
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" strokeWidth="2" fill="none">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                <span>{activeProfile.email}</span>
              </div>
              <div className="meta-item">
                <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" strokeWidth="2" fill="none">
                  <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                  <circle cx="12" cy="10" r="3"></circle>
                </svg>
                <span>{activeProfile.location}</span>
              </div>
              {activeProfile.phone && (
                <div className="meta-item">
                  <svg viewBox="0 0 24 24" width="16" height="16" stroke="var(--accent-cyan)" strokeWidth="2" fill="none">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                  </svg>
                  <span>{activeProfile.phone}</span>
                </div>
              )}
            </div>

            <div className="social-links">
              {activeProfile.githubLink && (
                <a href={activeProfile.githubLink} target="_blank" rel="noopener noreferrer" className="social-btn github">
                  GitHub
                </a>
              )}
              {activeProfile.linkedinLink && (
                <a href={activeProfile.linkedinLink} target="_blank" rel="noopener noreferrer" className="social-btn linkedin">
                  LinkedIn
                </a>
              )}
              {activeProfile.twitterLink && (
                <a href={activeProfile.twitterLink} target="_blank" rel="noopener noreferrer" className="social-btn twitter">
                  Twitter
                </a>
              )}
              {activeProfile.websiteLink && (
                <a href={activeProfile.websiteLink} target="_blank" rel="noopener noreferrer" className="social-btn website">
                  Website
                </a>
              )}
            </div>
          </div>

          <div className="hero-image-wrapper">
            <div className="profile-square-frame">
              {activeProfile.imageUrl ? (
                <img 
                  src={activeProfile.imageUrl} 
                  alt={activeProfile.name} 
                  className="profile-img" 
                />
              ) : (
                <div className="profile-img-placeholder">
                  <div className="avatar-graphic">
                    <span className="avatar-initials">KP</span>
                    <div className="cyber-ring"></div>
                  </div>
                  <span className="placeholder-subtext">Portfolio Space</span>
                  <span className="placeholder-hint">Ready to customize</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* 3. TECHNICAL SKILLS SECTION */}
      <section className="skills-section wrapper-block">
        <h2 className="section-title">Technical Skills</h2>
        <div className="skills-grid">
          {skills.length === 0 ? (
            <div className="empty-state glass-panel">
              <p>Add skills in the Admin Panel to showcase them here.</p>
            </div>
          ) : (
            categories.map(cat => {
              const categorySkills = getSkillsByCategory(cat);
              if (categorySkills.length === 0) return null;
              return (
                <div key={cat} className="skills-card glass-panel animate-fade">
                  <h3 className="skills-category-title">{cat === 'Tools' ? 'Tools & DevOps' : cat}</h3>
                  <div className="skills-list">
                    {categorySkills.map(s => (
                      <span key={s.id} className="skill-pill">
                        {s.name}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })
          )}
        </div>
      </section>

      {/* 4. FEATURED PROJECTS SECTION (Marquee Viewport + Tracking Setup) */}
      <section className="projects-section wrapper-block">
        <div className="section-header-row">
          <h2 className="section-title">Featured Projects</h2>
          {projects.length > 3 && (
            <button className="view-all-projects-btn" onClick={() => handleScroll('right')}>
              View More 
              <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2.5" fill="none">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          )}
        </div>
        <div className="carousel-outer-wrapper">
          {projects.length > 0 && (
            <>
              <button className="carousel-control-btn left" onClick={() => handleScroll('left')}>
                &lt;
              </button>
              <button className="carousel-control-btn right" onClick={() => handleScroll('right')}>
                &gt;
              </button>
            </>
          )}

          <div className="projects-carousel-track active-marquee" ref={carouselTrackRef}>
            {projects.length === 0 ? (
              <div className="empty-projects glass-panel">
                <p>No active showcase projects found. Seed or publish projects in the Admin Panel.</p>
              </div>
            ) : (
              projects.map(proj => {
                const tags = proj.techStack
                  ? proj.techStack.split(',').map(t => t.trim()).filter(Boolean)
                  : [];
                return (
                  <div 
                    key={proj.id} 
                    className="carousel-project-card glass-panel"
                    onClick={() => setSelectedProject(proj)}
                  >
                    <div className="carousel-card-body">
                      <div className="card-top">
                        <span className="card-badge">Showcase</span>
                        <h3 className="carousel-card-title">{proj.title}</h3>
                      </div>
                      <p className="carousel-card-description">{proj.description}</p>
                      <div className="carousel-card-tags">
                        {tags.slice(0, 3).map((tag, i) => (
                          <span key={i} className="carousel-mini-tag">{tag}</span>
                        ))}
                        {tags.length > 3 && <span className="carousel-mini-tag-more">+{tags.length - 3}</span>}
                      </div>
                      <div className="carousel-click-hint">
                        <span>Tap for details</span>
                        <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none">
                          <polyline points="9 18 15 12 9 6"></polyline>
                        </svg>
                      </div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>
      </section>

      {/* 5. EXPERIENCE SECTION */}
      <section className="experience-section wrapper-block">
        <h2 className="section-title">Experience</h2>
        <div className="timeline-container glass-panel">
          {sortedExperiences.length === 0 ? (
            <p className="empty-subtext">No work experiences published. Add in Admin Panel.</p>
          ) : (
            <div className="linear-timeline-flow">
              {sortedExperiences.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot"></div>
                  <div className="timeline-content animate-fade">
                    <span className="timeline-date">{formatTimelineDuration(item)}</span>
                    <h3 className="timeline-title">{item.role}</h3>
                    <p className="timeline-institution">{item.company}</p>
                    {item.location && <p className="timeline-location">{item.location}</p>}
                    {item.gpaOrDetails && (
                      <div className="timeline-metric-badge">
                        {item.gpaOrDetails}
                      </div>
                    )}
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 6. EDUCATION SECTION */}
      <section className="education-section wrapper-block">
        <h2 className="section-title">Education</h2>
        <div className="timeline-container glass-panel">
          {sortedEducation.length === 0 ? (
            <p className="empty-subtext">No academic education items published. Add in Admin Panel.</p>
          ) : (
            <div className="linear-timeline-flow">
              {sortedEducation.map(item => (
                <div key={item.id} className="timeline-item">
                  <div className="timeline-dot education-dot"></div>
                  <div className="timeline-content animate-fade">
                    <span className="timeline-date">{formatTimelineDuration(item)}</span>
                    <h3 className="timeline-title">{item.role}</h3>
                    <p className="timeline-institution">{item.company}</p>
                    {item.location && <p className="timeline-location">{item.location}</p>}
                    {item.gpaOrDetails && (
                      <div className="timeline-cgpa">
                        <strong>Grade:</strong> {item.gpaOrDetails}
                      </div>
                    )}
                    <p className="timeline-description">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 7. LICENSES & CERTIFICATIONS SECTION */}
      <section className="certifications-section wrapper-block">
        <h2 className="section-title">Licenses & Certifications</h2>
        <div className="certs-list-container glass-panel">
          {certifications.length === 0 ? (
            <p className="empty-subtext">No licenses or certifications listed in backend database.</p>
          ) : (
            <div className="certs-display-grid">
              {certifications.map(c => (
                <div key={c.id} className="cert-display-card glass-panel animate-fade">
                  <div className="cert-meta">
                    <span className="cert-date">{c.date}</span>
                    <h3 className="cert-name">{c.name}</h3>
                    <p className="cert-issuer">{c.issuer}</p>
                  </div>
                  {c.link && (
                    <a href={c.link} target="_blank" rel="noopener noreferrer" className="cert-verify-link">
                      Verify Badge
                      <svg viewBox="0 0 24 24" width="14" height="14" stroke="currentColor" strokeWidth="2.5" fill="none" style={{ marginLeft: '4px' }}>
                        <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"></path>
                        <polyline points="15 3 21 3 21 9"></polyline>
                        <line x1="10" y1="14" x2="21" y2="3"></line>
                      </svg>
                    </a>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* 8. EVENTS & HACKATHONS SECTION */}
      <section className="hackathons-section wrapper-block">
        <h2 className="section-title">Events & Hackathons</h2>
        <div className="events-list-container">
          {events.length === 0 ? (
            <div className="empty-state glass-panel">
              <p>No achievements or hackathons registered in backend.</p>
            </div>
          ) : (
            <div className="hackathons-grid">
              {events.map(ev => (
                <div key={ev.id} className="hackathon-card glass-panel animate-fade">
                  <div className="hackathon-badge">{ev.date}</div>
                  <h3 className="hackathon-name">{ev.title}</h3>
                  {ev.location && <span className="hackathon-location">{ev.location}</span>}
                  <p className="hackathon-desc">{ev.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* GLOBAL FOOTER */}
      <footer className="landing-footer wrapper-block glass-panel">
        <p>&copy; {new Date().getFullYear()} {activeProfile.name}. All rights reserved.</p>
        <p className="footer-subtext">Secure Dynamic Space Built with React, Spring Boot, and MySQL.</p>
      </footer>

      {/* PROJECT DETAILED EXPLANATION OVERLAY MODAL */}
      {selectedProject && (
        <div className="modal-backdrop animate-fade" onClick={() => setSelectedProject(null)}>
          <div className="project-detail-modal glass-panel" onClick={(e) => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setSelectedProject(null)}>&times;</button>
            <div className="modal-header">
              <span className="modal-badge">Project Specs</span>
              <h2>{selectedProject.title}</h2>
            </div>
            <div className="modal-body">
              <div className="modal-meta-label">Descriptive Narrative:</div>
              <p className="modal-description">{selectedProject.description}</p>
              
              <div className="modal-meta-label">Technologies Incorporated:</div>
              <div className="modal-tags-container">
                {selectedProject.techStack && 
                  selectedProject.techStack.split(',').map((tech, idx) => (
                    <span key={idx} className="modal-tech-tag">{tech.trim()}</span>
                  ))
                }
              </div>
            </div>
            {selectedProject.githubLink && (
              <div className="modal-footer">
                <a 
                  href={selectedProject.githubLink} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="modal-repo-link"
                >
                  <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor">
                    <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.646.64.699 1.026 1.592 1.026 2.683 0 3.842-2.337 4.687-4.565 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.579.688.481C19.137 20.162 22 16.418 22 12c0-5.523-4.477-10-10-10z"></path>
                  </svg>
                  Access Codebase Repository
                </a>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default LandingPage;