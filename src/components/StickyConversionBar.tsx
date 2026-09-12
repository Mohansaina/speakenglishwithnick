'use client';

import React, { useState, useEffect } from 'react';
import { X, Mail, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { handleSmartEmailClick, getSmartEmailUrls } from '@/utils/emailClient';

interface StickyConversionBarProps {
  onOpenBooking: () => void;
}

export const StickyConversionBar: React.FC<StickyConversionBarProps> = ({
  onOpenBooking,
}) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const emailUrls = getSmartEmailUrls();

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > 300 && !isDismissed);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-2.5 left-2.5 right-2.5 sm:left-auto sm:right-5 sm:bottom-5 z-50 max-w-sm sm:max-w-md w-auto transition-all animate-fade-in">
      <div className="relative bg-[#161a3b]/95 backdrop-blur-md text-white p-2.5 sm:p-3 rounded-2xl border border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.35)] flex items-center justify-between gap-2.5">
        
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-5 h-5 bg-stone-900 text-stone-300 hover:text-white rounded-full flex items-center justify-center text-[10px] transition-all shadow-md cursor-pointer border border-stone-700"
          title="Dismiss"
          aria-label="Close sticky bar"
        >
          <X className="w-3 h-3 stroke-[2.5]" />
        </button>

        {/* Left: Compact Icon & Text */}
        <div className="flex items-center gap-2 min-w-0">
          <div className="w-7 h-7 rounded-xl bg-[#f15555]/20 border border-[#f15555]/40 flex items-center justify-center shrink-0">
            <Mail className="w-3.5 h-3.5 text-[#f15555]" />
          </div>
          <div className="min-w-0">
            <h4 className="font-black text-white text-[11px] sm:text-xs truncate leading-tight">
              {language === 'es' ? '¿Preguntas para Nick?' : 'Questions for Nick?'}
            </h4>
            <a
              href={emailUrls.gmailWebUrl}
              onClick={(e) => handleSmartEmailClick(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[10px] text-stone-300 hover:text-white truncate block font-medium underline"
            >
              speakenglishwithnick@gmail.com
            </a>
          </div>
        </div>

        {/* Right: Compact Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <a
            href={emailUrls.gmailWebUrl}
            onClick={(e) => handleSmartEmailClick(e)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-2.5 py-1.5 rounded-xl bg-white/15 hover:bg-white/25 text-white font-bold text-[10.5px] sm:text-xs transition-colors flex items-center gap-1 cursor-pointer border border-white/20"
            title="Send Email"
          >
            <Mail className="w-3 h-3 text-[#f15555]" />
            <span className="hidden xs:inline">{language === 'es' ? 'Email' : 'Email'}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-xl bg-[#f15555] hover:bg-[#e04444] text-white font-black text-[10.5px] sm:text-xs flex items-center gap-1 transition-all shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
          >
            <span>{language === 'es' ? 'Agendar' : 'Book'}</span>
            <ArrowRight className="w-3 h-3 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
