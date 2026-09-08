'use client';

import React, { useEffect } from 'react';

/**
 * ScrollObserver automatically detects every section, card, and content block
 * on the website and applies a buttery-smooth 60fps scroll reveal animation.
 */
export const ScrollObserver: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  useEffect(() => {
    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) return;

    const setupObservers = () => {
      // Target all sections, main containers, grid items, and cards
      const targetSelectors = [
        'section',
        'main > div',
        'main > header',
        'main > footer',
        '[data-reveal]',
        '.reveal-on-scroll',
        'section .grid > *',
        'section .flex > .card',
        'section article',
      ];

      const elements = Array.from(
        document.querySelectorAll(targetSelectors.join(', '))
      ) as HTMLElement[];

      if (!elements.length) return;

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const target = entry.target as HTMLElement;
              target.classList.add('is-revealed');
              observer.unobserve(target);
            }
          });
        },
        {
          threshold: 0.08,
          rootMargin: '0px 0px -30px 0px',
        }
      );

      elements.forEach((el, index) => {
        // Only apply reveal class if not explicitly excluded
        if (!el.classList.contains('no-reveal')) {
          el.classList.add('reveal-on-scroll');

          // Check if element is already in the upper viewport on load
          const rect = el.getBoundingClientRect();
          if (rect.top < window.innerHeight * 0.85) {
            el.classList.add('is-revealed');
          } else {
            // Apply lightweight stagger delay based on parent sibling index
            const parent = el.parentElement;
            if (parent && parent.children.length > 1) {
              const siblingIndex = Array.from(parent.children).indexOf(el);
              const delay = Math.min(siblingIndex * 70, 350); // cap max delay at 350ms for snappy feel
              el.style.setProperty('--reveal-delay', `${delay}ms`);
            }
            observer.observe(el);
          }
        }
      });

      return observer;
    };

    // Run setup after brief DOM tick for Next.js hydration
    const timer = setTimeout(() => {
      setupObservers();
    }, 40);

    return () => clearTimeout(timer);
  }, []);

  return <>{children}</>;
};

export const TextStagger: React.FC<{
  text: string;
  className?: string;
  delayStepMs?: number;
}> = ({ text, className = '', delayStepMs = 35 }) => {
  const words = text.split(' ');

  return (
    <span className={`inline-block ${className}`}>
      {words.map((word, wIdx) => (
        <span key={wIdx} className="inline-block whitespace-nowrap mr-[0.25em]">
          {word.split('').map((char, cIdx) => {
            const overallIndex = wIdx * 4 + cIdx;
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
