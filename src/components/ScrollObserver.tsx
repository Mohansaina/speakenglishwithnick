'use client';

import React, { useEffect } from 'react';

/**
 * ScrollObserver automatically attaches an IntersectionObserver to elements 
 * with `[data-reveal]`, `.reveal-on-scroll`, `.reveal-stagger`, or section tags,
 * animating them smoothly into view as the user scrolls down the page.
 */
export const ScrollObserver: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    // Fallback for SSR or legacy browsers
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const revealElements = document.querySelectorAll(
      '[data-reveal], .reveal-on-scroll, section > div > h2, section > div > div > .grid > div, section > div > .grid > div'
    );

    revealElements.forEach((el, index) => {
      // Add base class if missing
      if (!el.classList.contains('reveal-on-scroll')) {
        el.classList.add('reveal-on-scroll');
      }

      // Add stagger index data attribute for sequential child animations
      const element = el as HTMLElement;
      if (!element.style.getPropertyValue('--reveal-delay')) {
        const delay = (index % 6) * 90; // smooth 90ms step
        element.style.setProperty('--reveal-delay', `${delay}ms`);
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            // Unobserve after revealing for optimal performance
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  return <>{children}</>;
};

/**
 * TextStagger Component splits a string into animated words/letters
 * that pop up smoothly when scrolled into view.
 */
export const TextStagger: React.FC<{
  text: string;
  className?: string;
  delayStepMs?: number;
}> = ({ text, className = '', delayStepMs = 40 }) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => {
            const overallIndex = wIdx * 5 + cIdx;
            return (
              <span
                key={cIdx}
                className="inline-block reveal-letter"
                style={{ animationDelay: `${overallIndex * delayStepMs}ms` }}
              >
                {char}
              </span>
            );
          })}
        </span>
      ))}
    </span>
  );
};
