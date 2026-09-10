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
      // Target key section components and explicitly marked elements
      const targetSelectors = [
        'section',
        'main > header',
        'main > footer',
        '[data-reveal]',
        '.reveal-on-scroll',
        '.card-reveal'
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
              requestAnimationFrame(() => {
                target.classList.add('is-revealed');
              });
              observer.unobserve(target);
            }
          });
        },
        {
          threshold: 0.02,
          rootMargin: '60px 0px 0px 0px', // Trigger early so elements reveal before scrolling past
        }
      );

      elements.forEach((el) => {
        if (!el.classList.contains('no-reveal')) {
          el.classList.add('reveal-on-scroll');
          observer.observe(el);
        }
      });

      return observer;
    };

    const idleId = window.requestIdleCallback 
      ? window.requestIdleCallback(() => setupObservers())
      : setTimeout(setupObservers, 30);

    return () => {
      if (window.cancelIdleCallback && typeof idleId === 'number') {
        window.cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId as any);
      }
    };
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
