import React from 'react';

export const USAFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg 
    viewBox="0 0 640 480" 
    className={`inline-block rounded-2xs shadow-2xs shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path fill="#bd3d44" d="M0 0h640v480H0z"/>
    <path stroke="#fff" strokeWidth="37" d="M0 55.5h640M0 129.5h640M0 203.5h640M0 277.5h640M0 351.5h640M0 425.5h640"/>
    <path fill="#192f5d" d="M0 0h288v259H0z"/>
    <g fill="#fff">
      <g id="s18">
        <g id="s9">
          <polygon points="24 16 30.5 36 13.5 23.6 34.5 23.6 17.5 36"/>
          <polygon points="120 16 126.5 36 109.5 23.6 130.5 23.6 113.5 36"/>
          <polygon points="216 16 222.5 36 205.5 23.6 226.5 23.6 209.5 36"/>
        </g>
        <g id="s4">
          <polygon points="72 42 78.5 62 61.5 49.6 82.5 49.6 65.5 62"/>
          <polygon points="168 42 174.5 62 157.5 49.6 178.5 49.6 161.5 62"/>
        </g>
      </g>
      <use href="#s18" y="52"/>
      <use href="#s18" y="104"/>
      <use href="#s9" y="208"/>
    </g>
  </svg>
);

export const SpainFlag: React.FC<{ className?: string }> = ({ className = "w-5 h-3.5" }) => (
  <svg 
    viewBox="0 0 640 480" 
    className={`inline-block rounded-2xs shadow-2xs shrink-0 ${className}`}
    aria-hidden="true"
  >
    <path fill="#aa151b" d="M0 0h640v480H0z"/>
    <path fill="#f1bf00" d="M0 120h640v240H0z"/>
  </svg>
);
