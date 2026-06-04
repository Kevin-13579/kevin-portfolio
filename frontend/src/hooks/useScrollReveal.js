import { useEffect } from 'react';

export const useScrollReveal = (deps = []) => {
  useEffect(() => {
    // Small delay to ensure DOM is fully ready
    const setupTimer = setTimeout(() => {
      const observerOptions = {
        root: null,
        threshold: 0.1,
        rootMargin: "0px"
      };

      const revealElement = (element) => {
        element.classList.add('reveal-visible');
        
        // Stagger child elements
        const children = element.querySelectorAll(
          '.project-premium-glass-card, .experience-milestone-card, .achievement-item-row, .matrix-pill'
        );
        
        children.forEach((child, index) => {
          child.style.animationDelay = `${index * 0.15}s`;
          child.classList.add('stagger-reveal');
        });
      };

      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            revealElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, observerOptions);

      const elements = document.querySelectorAll('.reveal-hidden');
      
      elements.forEach((el) => {
        // Check if element is already in viewport
        const rect = el.getBoundingClientRect();
        const isInViewport = (
          rect.top < window.innerHeight &&
          rect.bottom > 0
        );
        
        if (isInViewport) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      });

      return () => {
        elements.forEach((el) => observer.unobserve(el));
      };
    }, 50);

    return () => clearTimeout(setupTimer);
  }, deps);
};