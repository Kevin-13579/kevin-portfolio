import React from 'react';
import './Contact.css';

const Contact = () => {
  return (
    <section id="contact" className="contact-full-width-view reveal-hidden">
      <div className="contact-bounded-surface glass-surface">
        <h2 className="contact-main-headline">Initialize Connection</h2>
        
        <div className="contact-matrix-grid">
          <div className="matrix-pill">
            <span className="matrix-lbl">Secure Mailbox</span>
            <span className="matrix-val">kevinlokesh555@gmail.com</span>
          </div>
          <div className="matrix-pill">
            <span className="matrix-lbl">Mobile Vector</span>
            <span className="matrix-val">+91 7907703495</span>
          </div>
        </div>

        {/* Form removed as per request */}

        <footer className="footer-copyright-row">
          <p>© {new Date().getFullYear()} KEVIN P • FULL STACK SYSTEM</p>
        </footer>
      </div>
    </section>
  );
};

export default Contact;