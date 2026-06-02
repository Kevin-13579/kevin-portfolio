import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './AdminPage.css';

function AdminPage() {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Active Tab State
  const [activeTab, setActiveTab] = useState('profile');

  // Loading & Global Notifications
  const [loading, setLoading] = useState(true);
  const [globalMessage, setGlobalMessage] = useState({ text: '', type: '' });

  // Data States
  const [profile, setProfile] = useState({
    name: '',
    title: '',
    bio: '',
    email: '',
    location: '',
    phone: '',
    githubLink: '',
    linkedinLink: '',
    twitterLink: '',
    websiteLink: '',
    imageUrl: '',
    adminPassword: '13579'
  });
  
  const [projects, setProjects] = useState([]);
  const [skills, setSkills] = useState([]);
  const [certifications, setCertifications] = useState([]);
  const [events, setEvents] = useState([]);
  const [timelineItems, setTimelineItems] = useState([]);

  // Form States
  const [projectForm, setProjectForm] = useState({ id: null, title: '', description: '', techStack: '', githubLink: '' });
  const [skillForm, setSkillForm] = useState({ name: '', category: 'Frontend' });
  const [certForm, setCertForm] = useState({ id: null, name: '', issuer: '', date: '', link: '' });
  const [eventForm, setEventForm] = useState({ id: null, title: '', date: '', location: '', description: '' });
  const [timelineForm, setTimelineForm] = useState({
    id: null,
    role: '',
    company: '',
    duration: '',
    startDate: '',
    endDate: '',
    status: 'COMPLETED',
    location: '',
    gpaOrDetails: '',
    description: '',
    type: 'EXPERIENCE'
  });

  // Section Customization State
  const [sectionConfig, setSectionConfig] = useState({
    hero: { enabled: true, order: 1 },
    skills: { enabled: true, order: 2 },
    projects: { enabled: true, order: 3 },
    experience: { enabled: true, order: 4 },
    education: { enabled: true, order: 5 },
    certifications: { enabled: true, order: 6 },
    events: { enabled: true, order: 7 }
  });

  // Fetch all data
  const fetchData = () => {
    setLoading(true);
    Promise.all([
      axios.get('https://kevin-portfolio-k577.onrender.com/api/profile'),
      axios.get('https://kevin-portfolio-k577.onrender.com/api/projects'),
      axios.get('https://kevin-portfolio-k577.onrender.com/api/skills'),
      axios.get('https://kevin-portfolio-k577.onrender.com/api/certifications'),
      axios.get('https://kevin-portfolio-k577.onrender.com/api/events'),
      axios.get('https://kevin-portfolio-k577.onrender.com/api/timeline')
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
        console.error("Error loading admin dashboard details:", error);
        setLoading(false);
        showNotification("Failed to fetch backend data. Make sure backend is running on https://kevin-portfolio-k577.onrender.com", "error");
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Notification helper
  const showNotification = (text, type = 'info') => {
    setGlobalMessage({ text, type });
    setTimeout(() => {
      setGlobalMessage({ text: '', type: '' });
    }, 4000);
  };

  // Theme toggle handler
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

  // Password Unlock Gate handler
  const handleUnlock = (e) => {
    e.preventDefault();
    const correctPassword = profile.adminPassword || '13579';
    if (passwordInput === correctPassword) {
      setIsAuthenticated(true);
      setAuthError('');
      showNotification("Welcome back, Kevin!", "success");
    } else {
      setAuthError("Incorrect authorization key. Try again!");
    }
  };

  // 1. PROFILE METHODS
  const handleProfileChange = (e) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfile({ ...profile, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileSubmit = (e) => {
    e.preventDefault();
    axios.put('https://kevin-portfolio-k577.onrender.com/api/profile', profile)
      .then(response => {
        setProfile(response.data);
        showNotification("Profile details successfully updated!", "success");
      })
      .catch(error => {
        console.error("Error updating profile settings:", error);
        showNotification("Failed to save profile changes.", "error");
      });
  };

  // 2. PROJECT METHODS
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    if (projectForm.id) {
      axios.put(`https://kevin-portfolio-k577.onrender.com/api/projects/${projectForm.id}`, projectForm)
        .then(res => {
          setProjects(projects.map(p => p.id === projectForm.id ? res.data : p));
          showNotification("Project updated successfully!", "success");
          resetProjectForm();
        })
        .catch(() => showNotification("Failed to update project.", "error"));
    } else {
      axios.post('https://kevin-portfolio-k577.onrender.com/api/projects', projectForm)
        .then(res => {
          setProjects([...projects, res.data]);
          showNotification("Project added successfully!", "success");
          resetProjectForm();
        })
        .catch(() => showNotification("Failed to publish project.", "error"));
    }
  };

  const handleEditProject = (p) => {
    setProjectForm(p);
  };

  const handleDeleteProject = (id) => {
    if (window.confirm("Delete project item?")) {
      axios.delete(`https://kevin-portfolio-k577.onrender.com/api/projects/${id}`)
        .then(() => {
          setProjects(projects.filter(p => p.id !== id));
          showNotification("Project deleted successfully.", "success");
        });
    }
  };

  const resetProjectForm = () => {
    setProjectForm({ id: null, title: '', description: '', techStack: '', githubLink: '' });
  };

  // 3. SKILL METHODS
  const handleSkillSubmit = (e) => {
    e.preventDefault();
    axios.post('https://kevin-portfolio-k577.onrender.com/api/skills', skillForm)
      .then(res => {
        setSkills([...skills, res.data]);
        setSkillForm({ name: '', category: 'Frontend' });
        showNotification("Skill tag registered successfully!", "success");
      })
      .catch(() => showNotification("Failed to add skill.", "error"));
  };

  const handleDeleteSkill = (id) => {
    axios.delete(`https://kevin-portfolio-k577.onrender.com/api/skills/${id}`)
      .then(() => {
        setSkills(skills.filter(s => s.id !== id));
        showNotification("Skill removed successfully.", "success");
      });
  };

  // 4. TIMELINE METHODS
  const handleTimelineSubmit = (e) => {
    e.preventDefault();
    const preparedItem = {
      ...timelineForm,
      duration: timelineForm.duration || (timelineForm.startDate ? `${timelineForm.startDate} - ${timelineForm.status === 'ONGOING' ? 'Present' : timelineForm.endDate || 'Present'}` : ''),
      endDate: timelineForm.status === 'ONGOING' ? '' : timelineForm.endDate
    };

    const request = timelineForm.id
      ? axios.put(`https://kevin-portfolio-k577.onrender.com/api/timeline/${timelineForm.id}`, preparedItem)
      : axios.post('https://kevin-portfolio-k577.onrender.com/api/timeline', preparedItem);

    request
      .then(res => {
        if (timelineForm.id) {
          setTimelineItems(timelineItems.map(item => item.id === timelineForm.id ? res.data : item));
          showNotification("Timeline item updated successfully!", "success");
        } else {
          setTimelineItems([...timelineItems, res.data]);
          showNotification("Timeline item published!", "success");
        }
        resetTimelineForm();
      })
      .catch(() => showNotification("Failed to save timeline item.", "error"));
  };

  const handleEditTimeline = (item) => {
    setTimelineForm({
      ...item,
      startDate: item.startDate || '',
      endDate: item.endDate || '',
      status: item.status || 'COMPLETED',
      duration: item.duration || (item.startDate ? `${item.startDate} - ${item.status === 'ONGOING' ? 'Present' : item.endDate || 'Present'}` : '')
    });
  };

  const handleDeleteTimeline = (id) => {
    if (window.confirm("Delete timeline item?")) {
      axios.delete(`https://kevin-portfolio-k577.onrender.com/api/timeline/${id}`)
        .then(() => {
          setTimelineItems(timelineItems.filter(item => item.id !== id));
          showNotification("Timeline item removed.", "success");
        });
    }
  };

  const resetTimelineForm = () => {
    setTimelineForm({
      id: null,
      role: '',
      company: '',
      duration: '',
      startDate: '',
      endDate: '',
      status: 'COMPLETED',
      location: '',
      gpaOrDetails: '',
      description: '',
      type: 'EXPERIENCE'
    });
  };

  // 5. CERTIFICATION METHODS
  const handleCertSubmit = (e) => {
    e.preventDefault();
    if (certForm.id) {
      axios.put(`https://kevin-portfolio-k577.onrender.com/api/certifications/${certForm.id}`, certForm)
        .then(res => {
          setCertifications(certifications.map(c => c.id === certForm.id ? res.data : c));
          showNotification("Certification updated successfully!", "success");
          resetCertForm();
        })
        .catch(() => showNotification("Failed to update certification.", "error"));
    } else {
      axios.post('https://kevin-portfolio-k577.onrender.com/api/certifications', certForm)
        .then(res => {
          setCertifications([...certifications, res.data]);
          showNotification("Certification registered!", "success");
          resetCertForm();
        })
        .catch(() => showNotification("Failed to add certification.", "error"));
    }
  };

  const handleEditCert = (c) => {
    setCertForm(c);
  };

  const handleDeleteCert = (id) => {
    if (window.confirm("Delete certification item?")) {
      axios.delete(`https://kevin-portfolio-k577.onrender.com/api/certifications/${id}`)
        .then(() => {
          setCertifications(certifications.filter(c => c.id !== id));
          showNotification("Certification removed.", "success");
        });
    }
  };

  const resetCertForm = () => {
    setCertForm({ id: null, name: '', issuer: '', date: '', link: '' });
  };

  // 6. EVENT METHODS
  const handleEventSubmit = (e) => {
    e.preventDefault();
    if (eventForm.id) {
      axios.put(`https://kevin-portfolio-k577.onrender.com/api/events/${eventForm.id}`, eventForm)
        .then(res => {
          setEvents(events.map(ev => ev.id === eventForm.id ? res.data : ev));
          showNotification("Event updated successfully!", "success");
          resetEventForm();
        })
        .catch(() => showNotification("Failed to update event.", "error"));
    } else {
      axios.post('https://kevin-portfolio-k577.onrender.com/api/events', eventForm)
        .then(res => {
          setEvents([...events, res.data]);
          showNotification("Event registered successfully!", "success");
          resetEventForm();
        })
        .catch(() => showNotification("Failed to publish event.", "error"));
    }
  };

  const handleEditEvent = (ev) => {
    setEventForm(ev);
  };

  const handleDeleteEvent = (id) => {
    if (window.confirm("Delete event item?")) {
      axios.delete(`https://kevin-portfolio-k577.onrender.com/api/events/${id}`)
        .then(() => {
          setEvents(events.filter(ev => ev.id !== id));
          showNotification("Event removed.", "success");
        });
    }
  };

  const resetEventForm = () => {
    setEventForm({ id: null, title: '', date: '', location: '', description: '' });
  };

  // --- PASSWORD LOCK SCREEN DISPLAY ---
  if (!isAuthenticated) {
    return (
      <div className="auth-gate-container container">
        <div className="auth-card glass-panel">
          <div className="lock-icon">
            <svg viewBox="0 0 24 24" width="48" height="48" stroke="var(--accent-cyan)" strokeWidth="2" fill="none">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
              <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
            </svg>
          </div>
          <h2>Access Keys Required</h2>
          <p className="auth-hint">Please enter your authorization credential to unlock the admin dashboard panels.</p>
          
          <form onSubmit={handleUnlock} className="auth-form">
            <div className="form-group">
              <input 
                type="password" 
                placeholder="Enter Authorization PIN..." 
                value={passwordInput} 
                onChange={(e) => setPasswordInput(e.target.value)} 
                required 
                autoFocus
              />
            </div>
            {authError && <div className="auth-error-badge">{authError}</div>}
            <button type="submit" className="action-btn-primary full-width">Authenticate Gateway</button>
          </form>
        </div>
      </div>
    );
  }

  // --- ADMIN MAIN CONTROLLER LAYOUT ---
  return (
    <div className="admin-container container">
      {globalMessage.text && (
        <div className={`global-toast-notification ${globalMessage.type}`}>
          {globalMessage.text}
        </div>
      )}

      <header className="admin-header glass-panel">
        <div className="header-text">
          <h1>Admin Command Panel</h1>
          <p className="admin-subtitle">Fully dynamic control to modify resume details, skills, certifications, experience, hackathons, and projects in real-time.</p>
        </div>
        <div className="header-actions">
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
          <button className="logout-btn" onClick={() => { setIsAuthenticated(false); setPasswordInput(''); }}>
            Lock Dashboard
          </button>
        </div>
      </header>

      {/* DASHBOARD GRID FOR NAVIGATION & TABS */}
      <div className="admin-dashboard-tabs-wrapper">
        <div className="admin-sidebar glass-panel">
          <button className={`sidebar-tab-btn ${activeTab === 'profile' ? 'active' : ''}`} onClick={() => setActiveTab('profile')}>
            Profile Settings
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'skills' ? 'active' : ''}`} onClick={() => setActiveTab('skills')}>
            Technical Skills
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'timeline' ? 'active' : ''}`} onClick={() => setActiveTab('timeline')}>
            Work & Education
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => setActiveTab('projects')}>
            Projects Showcase
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'certifications' ? 'active' : ''}`} onClick={() => setActiveTab('certifications')}>
            Certifications
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'events' ? 'active' : ''}`} onClick={() => setActiveTab('events')}>
            Events & Achievements
          </button>
          <button className={`sidebar-tab-btn ${activeTab === 'customization' ? 'active' : ''}`} onClick={() => setActiveTab('customization')}>
            Layout & Sections
          </button>
        </div>

        <div className="admin-tab-content-container">
          {/* TAB 1: PROFILE */}
          {activeTab === 'profile' && (
            <section className="admin-card glass-panel animate-fade">
              <h2 className="admin-card-title">Customize Bio & Contacts</h2>
              <form onSubmit={handleProfileSubmit} className="admin-form">
                <div className="form-grid">
                  <div className="form-group">
                    <label>Full Name</label>
                    <input type="text" name="name" value={profile.name} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label>Job Title/Headline</label>
                    <input type="text" name="title" value={profile.title} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label>Email Address</label>
                    <input type="email" name="email" value={profile.email} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label>Phone Number</label>
                    <input type="text" name="phone" value={profile.phone || ''} onChange={handleProfileChange} placeholder="+91 XXXXX XXXXX" />
                  </div>
                  <div className="form-group">
                    <label>Location</label>
                    <input type="text" name="location" value={profile.location} onChange={handleProfileChange} required />
                  </div>
                  <div className="form-group">
                    <label>Admin Gateway Password</label>
                    <input type="text" name="adminPassword" value={profile.adminPassword || ''} onChange={handleProfileChange} required />
                  </div>
                </div>

                <div className="form-group">
                  <label>Bio Summary (About Description)</label>
                  <textarea name="bio" value={profile.bio} onChange={handleProfileChange} rows="5" required></textarea>
                </div>

                <h3 className="sub-section-header">External Social Profile URLs</h3>
                <div className="form-grid">
                  <div className="form-group">
                    <label>GitHub Profile Link</label>
                    <input type="url" name="githubLink" value={profile.githubLink || ''} onChange={handleProfileChange} />
                  </div>
                  <div className="form-group">
                    <label>LinkedIn Profile Link</label>
                    <input type="url" name="linkedinLink" value={profile.linkedinLink || ''} onChange={handleProfileChange} />
                  </div>
                  <div className="form-group">
                    <label>Twitter/X Profile Link</label>
                    <input type="url" name="twitterLink" value={profile.twitterLink || ''} onChange={handleProfileChange} />
                  </div>
                  <div className="form-group">
                    <label>Personal Website Link</label>
                    <input type="url" name="websiteLink" value={profile.websiteLink || ''} onChange={handleProfileChange} />
                  </div>
                </div>

                {/* PROFILE IMAGE AVATAR UPLOAD */}
                <div className="form-group">
                  <label>Profile Avatar Source</label>
                  <div className="image-source-options">
                    <div className="file-upload-wrapper">
                      <input type="file" id="avatar-upload" accept="image/*" onChange={handleImageUpload} className="file-input-hidden" />
                      <label htmlFor="avatar-upload" className="file-upload-label">
                        <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" style={{ marginRight: '6px' }}>
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M17 8l-5-5-5 5M12 3v12" />
                        </svg>
                        Upload Image File
                      </label>
                    </div>
                    <span className="upload-separator">OR</span>
                    <input type="url" name="imageUrl" value={profile.imageUrl || ''} placeholder="Paste external image URL..." onChange={handleProfileChange} className="image-url-input" />
                  </div>

                  {profile.imageUrl && (
                    <div className="avatar-preview-box">
                      <img src={profile.imageUrl} alt="Avatar Preview" className="preview-thumbnail" />
                      <button type="button" onClick={() => setProfile({ ...profile, imageUrl: '' })} className="clear-preview-btn">Remove Avatar</button>
                    </div>
                  )}
                </div>

                <button type="submit" className="action-btn-primary">Save Profile Setup</button>
              </form>
            </section>
          )}

          {/* TAB 2: SKILLS */}
          {activeTab === 'skills' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">Register Skillsets</h2>
                <form onSubmit={handleSkillSubmit} className="admin-form inline-form">
                  <div className="form-group flex-2">
                    <label>Skill Name</label>
                    <input type="text" value={skillForm.name} onChange={(e) => setSkillForm({ ...skillForm, name: e.target.value })} placeholder="e.g. Spring Boot, React, Docker..." required />
                  </div>
                  <div className="form-group flex-1">
                    <label>Skill Category</label>
                    <select value={skillForm.category} onChange={(e) => setSkillForm({ ...skillForm, category: e.target.value })}>
                      <option value="Frontend">Frontend</option>
                      <option value="Backend">Backend</option>
                      <option value="Database">Database</option>
                      <option value="Tools">Tools & DevOps</option>
                    </select>
                  </div>
                  <button type="submit" className="action-btn-primary self-end">Add Skill</button>
                </form>
              </section>

              <section className="admin-card glass-panel list-section">
                <h2 className="admin-card-title">Current Skill Inventory</h2>
                <div className="skills-admin-list">
                  {['Frontend', 'Backend', 'Database', 'Tools'].map(cat => {
                    const groupSkills = skills.filter(s => s.category.toLowerCase().startsWith(cat.toLowerCase().substring(0,4)));
                    return (
                      <div key={cat} className="skill-admin-category-block">
                        <h3>{cat}</h3>
                        <div className="skills-pill-flex">
                          {groupSkills.length === 0 ? <span className="empty-subtext">No tags added yet.</span> : 
                            groupSkills.map(s => (
                              <span key={s.id} className="skill-admin-pill">
                                {s.name}
                                <button type="button" onClick={() => handleDeleteSkill(s.id)} className="delete-pill-btn">&times;</button>
                              </span>
                            ))
                          }
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}

          {/* TAB 3: WORK & EDUCATION */}
          {activeTab === 'timeline' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">{timelineForm.id ? "Edit Timeline Entry" : "Publish Timeline Entry"}</h2>
                <form onSubmit={handleTimelineSubmit} className="admin-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Timeline Entry Type</label>
                      <select value={timelineForm.type} onChange={(e) => setTimelineForm({ ...timelineForm, type: e.target.value })}>
                        <option value="EXPERIENCE">Work Experience</option>
                        <option value="EDUCATION">Education</option>
                      </select>
                    </div>
                    <div className="form-group">
                      <label>{timelineForm.type === 'EDUCATION' ? 'Degree / Program' : 'Role / Position'}</label>
                      <input type="text" value={timelineForm.role} onChange={(e) => setTimelineForm({ ...timelineForm, role: e.target.value })} placeholder={timelineForm.type === 'EDUCATION' ? 'BCA' : 'Lead Engineer'} required />
                    </div>
                    <div className="form-group">
                      <label>{timelineForm.type === 'EDUCATION' ? 'Institution Name' : 'Company / Sponsor'}</label>
                      <input type="text" value={timelineForm.company} onChange={(e) => setTimelineForm({ ...timelineForm, company: e.target.value })} placeholder={timelineForm.type === 'EDUCATION' ? 'Rathinam College' : 'Freelance'} required />
                    </div>
                    <div className="form-group">
                      <label>Start Date</label>
                      <input type="month" value={timelineForm.startDate} onChange={(e) => setTimelineForm({ ...timelineForm, startDate: e.target.value })} required />
                    </div>
                    <div className="form-group">
                      <label>Status</label>
                      <select value={timelineForm.status} onChange={(e) => setTimelineForm({ ...timelineForm, status: e.target.value, endDate: e.target.value === 'ONGOING' ? '' : timelineForm.endDate })}>
                        <option value="COMPLETED">Completed</option>
                        <option value="ONGOING">Currently Ongoing</option>
                      </select>
                    </div>
                    {timelineForm.status !== 'ONGOING' && (
                      <div className="form-group">
                        <label>End Date</label>
                        <input type="month" value={timelineForm.endDate} onChange={(e) => setTimelineForm({ ...timelineForm, endDate: e.target.value })} required={timelineForm.type === 'EDUCATION' || timelineForm.type === 'EXPERIENCE'} />
                      </div>
                    )}
                    <div className="form-group">
                      <label>Duration (optional)</label>
                      <input type="text" value={timelineForm.duration} onChange={(e) => setTimelineForm({ ...timelineForm, duration: e.target.value })} placeholder="e.g. Feb 2025 - Present" />
                    </div>
                    <div className="form-group">
                      <label>{timelineForm.type === 'EDUCATION' ? 'CGPA / Grade (optional)' : 'Key Metric / Label'}</label>
                      <input type="text" value={timelineForm.gpaOrDetails} onChange={(e) => setTimelineForm({ ...timelineForm, gpaOrDetails: e.target.value })} placeholder="e.g. CGPA: 7.70 or Lead dev" />
                    </div>
                  </div>

                  <div className="form-group">
                    <label>Description</label>
                    <textarea value={timelineForm.description} onChange={(e) => setTimelineForm({ ...timelineForm, description: e.target.value })} rows="4" placeholder="Mention key duties, technologies learned, or project goals..." required></textarea>
                  </div>

                  <div className="form-actions">
                    <button type="submit" className="action-btn-primary">{timelineForm.id ? "Update Timeline Item" : "Publish Timeline Item"}</button>
                    {timelineForm.id && <button type="button" onClick={resetTimelineForm} className="action-btn-secondary">Cancel Edit</button>}
                  </div>
                </form>
              </section>

              <section className="admin-card glass-panel list-section">
                <h2 className="admin-card-title">Timeline Inventory</h2>
                <div className="inventory-timeline-list">
                  {timelineItems.length === 0 ? <p className="empty-subtext">No historical timeline items found.</p> : (
                    <div className="timeline-items-table-flex">
                      {timelineItems.map(item => (
                        <div key={item.id} className="timeline-table-row glass-panel">
                          <div className="row-meta-info">
                            <span className={`badge-type ${item.type.toLowerCase()}`}>{item.type}</span>
                            <h4>{item.role}</h4>
                            <span className="row-subtitle">{item.company} | {item.duration}</span>
                          </div>
                          <div className="row-actions">
                            <button onClick={() => handleEditTimeline(item)} className="edit-btn">Edit</button>
                            <button onClick={() => handleDeleteTimeline(item.id)} className="delete-btn">Delete</button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </section>
            </div>
          )}

          {/* TAB 4: PROJECTS */}
          {activeTab === 'projects' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">{projectForm.id ? "Edit Showcase Project" : "Publish New Showcase Project"}</h2>
                <form onSubmit={handleProjectSubmit} className="admin-form">
                  <div className="form-group">
                    <label>Project Title</label>
                    <input type="text" value={projectForm.title} onChange={(e) => setProjectForm({ ...projectForm, title: e.target.value })} placeholder="e.g. AI Road Hazard Tracker..." required />
                  </div>
                  <div className="form-group">
                    <label>Description</label>
                    <textarea value={projectForm.description} onChange={(e) => setProjectForm({ ...projectForm, description: e.target.value })} rows="5" placeholder="Deeply explain the project framework, core architecture, API endpoints, etc..." required></textarea>
                  </div>
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Tech Stack (comma separated)</label>
                      <input type="text" value={projectForm.techStack} onChange={(e) => setProjectForm({ ...projectForm, techStack: e.target.value })} placeholder="e.g. React JS, Spring Boot, MySQL" required />
                    </div>
                    <div className="form-group">
                      <label>GitHub Repository URL</label>
                      <input type="url" value={projectForm.githubLink} onChange={(e) => setProjectForm({ ...projectForm, githubLink: e.target.value })} placeholder="https://github.com/..." />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="action-btn-primary">{projectForm.id ? "Update Project Item" : "Publish Project Item"}</button>
                    {projectForm.id && <button type="button" onClick={resetProjectForm} className="action-btn-secondary">Cancel Edit</button>}
                  </div>
                </form>
              </section>

              <section className="admin-card glass-panel list-section">
                <h2 className="admin-card-title">Projects Inventory</h2>
                <div className="projects-table-flex">
                  {projects.length === 0 ? <p className="empty-subtext">No active showcase projects in DB.</p> : 
                    projects.map(p => (
                      <div key={p.id} className="project-table-row glass-panel">
                        <div className="row-meta-info">
                          <h4>{p.title}</h4>
                          <span className="row-subtitle"><strong>Stack:</strong> {p.techStack}</span>
                        </div>
                        <div className="row-actions">
                          <button onClick={() => handleEditProject(p)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDeleteProject(p.id)} className="delete-btn">Delete</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            </div>
          )}

          {/* TAB 5: CERTIFICATIONS */}
          {activeTab === 'certifications' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">{certForm.id ? "Edit Certification Details" : "Register Certification"}</h2>
                <form onSubmit={handleCertSubmit} className="admin-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Certification Name</label>
                      <input type="text" value={certForm.name} onChange={(e) => setCertForm({ ...certForm, name: e.target.value })} placeholder="e.g. AWS Certified Developer" required />
                    </div>
                    <div className="form-group">
                      <label>Credential Issuer</label>
                      <input type="text" value={certForm.issuer} onChange={(e) => setCertForm({ ...certForm, issuer: e.target.value })} placeholder="e.g. AWS / Amazon" required />
                    </div>
                    <div className="form-group">
                      <label>Date Earned</label>
                      <input type="text" value={certForm.date} onChange={(e) => setCertForm({ ...certForm, date: e.target.value })} placeholder="e.g. March 2026" required />
                    </div>
                    <div className="form-group">
                      <label>Verification Link / URL</label>
                      <input type="url" value={certForm.link} onChange={(e) => setCertForm({ ...certForm, link: e.target.value })} placeholder="https://..." />
                    </div>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="action-btn-primary">{certForm.id ? "Update Certification" : "Add Certification"}</button>
                    {certForm.id && <button type="button" onClick={resetCertForm} className="action-btn-secondary">Cancel Edit</button>}
                  </div>
                </form>
              </section>

              <section className="admin-card glass-panel list-section">
                <h2 className="admin-card-title">Certifications Inventory</h2>
                <div className="certifications-table-flex">
                  {certifications.length === 0 ? <p className="empty-subtext">No certifications found inside DB.</p> : 
                    certifications.map(c => (
                      <div key={c.id} className="cert-table-row glass-panel">
                        <div className="row-meta-info">
                          <h4>{c.name}</h4>
                          <span className="row-subtitle">{c.issuer} | {c.date}</span>
                        </div>
                        <div className="row-actions">
                          <button onClick={() => handleEditCert(c)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDeleteCert(c.id)} className="delete-btn">Delete</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            </div>
          )}

          {/* TAB 6: EVENTS & ACHIEVEMENTS */}
          {activeTab === 'events' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">{eventForm.id ? "Edit Event / Hackathon Item" : "Register Event / Hackathon Item"}</h2>
                <form onSubmit={handleEventSubmit} className="admin-form">
                  <div className="form-grid">
                    <div className="form-group">
                      <label>Event Title</label>
                      <input type="text" value={eventForm.title} onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })} placeholder="e.g. Interofest Hackathon" required />
                    </div>
                    <div className="form-group">
                      <label>Date</label>
                      <input type="text" value={eventForm.date} onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })} placeholder="e.g. Feb 2026" required />
                    </div>
                    <div className="form-group">
                      <label>Location / College</label>
                      <input type="text" value={eventForm.location} onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })} placeholder="e.g. KSR Engineering College" required />
                    </div>
                  </div>
                  <div className="form-group">
                    <label>Achievement Description</label>
                    <textarea value={eventForm.description} onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })} rows="4" placeholder="Briefly details goals achieved, projects engineered, or ranks won..." required></textarea>
                  </div>
                  <div className="form-actions">
                    <button type="submit" className="action-btn-primary">{eventForm.id ? "Update Event Item" : "Publish Event Item"}</button>
                    {eventForm.id && <button type="button" onClick={resetEventForm} className="action-btn-secondary">Cancel Edit</button>}
                  </div>
                </form>
              </section>

              <section className="admin-card glass-panel list-section">
                <h2 className="admin-card-title">Events / Hackathons Inventory</h2>
                <div className="events-table-flex">
                  {events.length === 0 ? <p className="empty-subtext">No hackathons or event items found.</p> : 
                    events.map(ev => (
                      <div key={ev.id} className="event-table-row glass-panel">
                        <div className="row-meta-info">
                          <h4>{ev.title}</h4>
                          <span className="row-subtitle">{ev.location} | {ev.date}</span>
                        </div>
                        <div className="row-actions">
                          <button onClick={() => handleEditEvent(ev)} className="edit-btn">Edit</button>
                          <button onClick={() => handleDeleteEvent(ev.id)} className="delete-btn">Delete</button>
                        </div>
                      </div>
                    ))
                  }
                </div>
              </section>
            </div>
          )}

          {/* TAB 7: CUSTOMIZATION & LAYOUT */}
          {activeTab === 'customization' && (
            <div className="tab-pane animate-fade">
              <section className="admin-card glass-panel">
                <h2 className="admin-card-title">Landing Page Layout & Sections</h2>
                <p className="section-description">Customize which sections appear on your landing page and in what order. You can also toggle the visibility of each section.</p>
                
                <div className="customization-container">
                  <div className="customization-grid">
                    {Object.entries(sectionConfig).map(([key, config]) => (
                      <div key={key} className="customization-item glass-panel">
                        <div className="item-header">
                          <label className="toggle-label">
                            <input 
                              type="checkbox" 
                              checked={config.enabled}
                              onChange={(e) => setSectionConfig({
                                ...sectionConfig,
                                [key]: { ...config, enabled: e.target.checked }
                              })}
                              className="section-toggle"
                            />
                            <span className="toggle-text">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                          </label>
                        </div>
                        <div className="item-order">
                          <label>Display Order: </label>
                          <input 
                            type="number" 
                            min="1" 
                            max="7"
                            value={config.order}
                            onChange={(e) => setSectionConfig({
                              ...sectionConfig,
                              [key]: { ...config, order: parseInt(e.target.value) }
                            })}
                            disabled={!config.enabled}
                            className="order-input"
                          />
                        </div>
                        <p className="item-description">
                          {key === 'hero' && 'Main introduction and profile section'}
                          {key === 'skills' && 'Technical skills organized by category'}
                          {key === 'projects' && 'Featured projects showcase carousel'}
                          {key === 'experience' && 'Work experience timeline'}
                          {key === 'education' && 'Education and academic background'}
                          {key === 'certifications' && 'Licenses and certifications'}
                          {key === 'events' && 'Hackathons and events achievements'}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="customization-preview">
                  <h3>Preview Order</h3>
                  <div className="preview-list">
                    {Object.entries(sectionConfig)
                      .filter(([_, config]) => config.enabled)
                      .sort((a, b) => a[1].order - b[1].order)
                      .map(([key, config], index) => (
                        <div key={key} className="preview-item">
                          <span className="preview-number">{index + 1}</span>
                          <span className="preview-name">{key.charAt(0).toUpperCase() + key.slice(1)}</span>
                        </div>
                      ))}
                  </div>
                </div>

                <button 
                  type="button" 
                  className="action-btn-primary"
                  onClick={() => {
                    // Save configuration to localStorage
                    localStorage.setItem('sectionConfig', JSON.stringify(sectionConfig));
                    showNotification("Layout customization saved! Refresh landing page to see changes.", "success");
                  }}
                >
                  Save Layout Configuration
                </button>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;