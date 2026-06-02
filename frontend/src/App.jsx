import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import LandingPage from './pages/LandingPage';
import AdminPage from './pages/AdminPage';
import './index.css';

const splashLines = [
  'Kevin P.',
  'BCA Student',
  'Initializing portfolio shell...',
  'Building developer experience...',
  'Running services...',
  'Executing landing page...'
];

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [typedLine, setTypedLine] = useState('');
  const [currentLineIndex, setCurrentLineIndex] = useState(0);
  const [redirectToLanding, setRedirectToLanding] = useState(false);

  useEffect(() => {
    const splashTimer = setTimeout(() => {
      setShowSplash(false);
      setRedirectToLanding(true);
    }, 5000);

    return () => clearTimeout(splashTimer);
  }, []);

  useEffect(() => {
    if (!showSplash || currentLineIndex >= splashLines.length) {
      return;
    }

    const currentText = splashLines[currentLineIndex];
    let charIndex = 0;
    setTypedLine('');

    const typingInterval = setInterval(() => {
      charIndex += 1;
      setTypedLine(currentText.slice(0, charIndex));
      if (charIndex >= currentText.length) {
        clearInterval(typingInterval);
        setTimeout(() => {
          setCurrentLineIndex((prev) => Math.min(prev + 1, splashLines.length));
        }, 220);
      }
    }, 35);

    return () => clearInterval(typingInterval);
  }, [currentLineIndex, showSplash]);

  return (
    <Router>
      {showSplash && (
        <div className="splash-screen">
          <div className="splash-panel">
            <div className="splash-header">
              <span className="header-button red"></span>
              <span className="header-button yellow"></span>
              <span className="header-button green"></span>
            </div>
            <div className="splash-terminal">
              <div className="terminal-title">dev@portfolio: ~</div>
              <div className="terminal-lines">
                {splashLines.slice(0, currentLineIndex).map((line, index) => (
                  <div key={index} className="terminal-line">
                    <span className="terminal-prompt">$</span>
                    <span>{line}</span>
                  </div>
                ))}
                {currentLineIndex < splashLines.length && (
                  <div className="terminal-line terminal-active">
                    <span className="terminal-prompt">$</span>
                    <span>{typedLine}</span>
                    <span className="terminal-cursor">▌</span>
                  </div>
                )}
              </div>
            </div>
            <div className="splash-footer">
              <div className="progress-label">Loading developer environment</div>
              <div className="progress-bar">
                <div className="progress-fill"></div>
              </div>
            </div>
          </div>
        </div>
      )}
      {redirectToLanding && <Navigate to="/" replace />}
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/admin-panel-secure" element={<AdminPage />} />
      </Routes>
    </Router>
  );
}

export default App;