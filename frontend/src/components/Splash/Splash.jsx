import React, { useEffect, useState } from 'react';
import './Splash.css';

const Splash = ({ onComplete }) => {
  const [lines, setLines] = useState([]);
  
  const terminalLogs = [
    ">> npx create-react-app kevin-portfolio --premium...",
    ">> Fetching baseline dependencies for Core Profile...",
    ">> Initializing Kevin P. [Full-Stack Developer & DevOps Engineer]...",
    ">> Loading Java & Spring Boot enterprise microservices pipeline...",
    ">> Mounting responsive React JS reactive components layout architecture...",
    ">> Securing multi-role MySQL localized credentials vault logging structures...",
    ">> Optimizing Gemini AI pothole live geospatial vector recognition algorithms...",
    ">> Compiling production production build assets cleanly...",
    ">> Deploying localized build matrix vectors onto staging clusters...",
    ">> System Deployment Complete. Initializing Portfolio Interface."
  ];

  useEffect(() => {
    let currentIdx = 0;
    const interval = setInterval(() => {
      if (currentIdx < terminalLogs.length) {
        setLines(prev => [...prev, terminalLogs[currentIdx]]);
        currentIdx++;
      } else {
        clearInterval(interval);
        setTimeout(() => {
          onComplete();
        }, 800);
      }
    }, 400); // Perfect sequential processing step pacing over 4-5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="splash-viewport">
      <div className="terminal-shell glass-surface">
        <div className="terminal-window-bar">
          <span className="dot red"></span>
          <span className="dot yellow"></span>
          <span className="dot green"></span>
          <p className="bar-title">kevin@devops-engine:~</p>
        </div>
        <div className="terminal-body-output">
          <h1 className="terminal-primary-identity">KEVIN P</h1>
          <h2 className="terminal-sub-identity">FULL STACK DEVELOPER</h2>
          <div className="terminal-divider"></div>
          {lines.map((line, i) => (
            <p key={i} className="terminal-log-row">{line}</p>
          ))}
          <div className="terminal-cursor-indicator"></div>
        </div>
      </div>
    </div>
  );
};

export default Splash;