import React, { useState, useEffect } from 'react';
import Splash from './components/Splash/Splash';
import Navbar from './components/Navbar/Navbar';
import Hero from './components/Hero/Hero';
import Projects from './components/Projects/Projects';
import Experience from './components/Experience/Experience';
import Education from './components/Education/Education';
import Contact from './components/Contact/Contact';
import { useScrollReveal } from './hooks/useScrollReveal';

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState('dark');

  useScrollReveal([loading, theme]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  if (loading) {
    return <Splash onComplete={() => setLoading(false)} />;
  }

  return (
    <div style={{ width: '100vw', overflowX: 'hidden' }}>
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <Hero theme={theme} />
      <Projects />
      <Experience />
      <Education />
      <Contact />
    </div>
  );
}

export default App;