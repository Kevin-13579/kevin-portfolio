import React from 'react';
import './Certifications.css';

const Certifications = () => {
  const certs = [
    {
      title: "AWS Solutions Architecture",
      issuer: "Forage (APAC Program)",
      file: "/certifications/aws architecture solution.pdf"
    },
    {
      title: "Software Engineering",
      issuer: "Electronic Arts (Forage)",
      file: "/certifications/ea certificate.pdf"
    },
    {
      title: "Developing Front-End Apps with React",
      issuer: "Coursera (IBM)",
      file: "/certifications/react js course certificate.pdf"
    },
    {
      title: "React Native",
      issuer: "Coursera (META)",
      file: "/certifications/react native.pdf"
    },
    {
      title: "Introduction to DevOps",
      issuer: "Coursera (IBM)",
      file: "/certifications/Introduction to DevOps.pdf"
    }
  ];

  return (
    <section id="certifications" className="certifications-section reveal-hidden">
      <div className="section-container-fluid">
        <h2 className="core-section-title">Certifications</h2>
        <div className="certs-grid">
          {certs.map((cert, idx) => (
            <div className="cert-card glass-surface" key={idx}>
              <h3 className="cert-title">{cert.title}</h3>
              <p className="cert-issuer">{cert.issuer}</p>
              <a 
                href={cert.file} 
                target="_blank" 
                rel="noreferrer" 
                className="btn-dark-pill"
                style={{ marginTop: '1rem', display: 'inline-block' }}
              >
                View Certificate
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Certifications;
