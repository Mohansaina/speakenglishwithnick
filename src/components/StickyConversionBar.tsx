'use client';

import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface StickyConversionBarProps {
  onOpenBooking: () => void;
  onOpenQuiz: () => void;
}

export const StickyConversionBar: React.FC<StickyConversionBarProps> = ({
  onOpenBooking,
  onOpenQuiz,
}) => {
  const { language } = useLanguage();
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300 && !isDismissed) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isDismissed]);

  if (!isVisible || isDismissed) return null;

  return (
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-lg w-full transition-all">
      <div className="relative bg-[#07221a]/98 backdrop-blur-md text-white p-3 sm:p-4 rounded-2xl sm:rounded-3xl border border-[#16a34a]/40 shadow-2xl shadow-[#07221a]/60 flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-2.5 sm:gap-3.5">
        
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2 -right-2 w-6 h-6 sm:w-7 sm:h-7 bg-stone-900 border border-stone-700 text-stone-300 hover:text-white rounded-full flex items-center justify-center text-xs transition-colors shadow-md cursor-pointer"
          title="Dismiss"
          aria-label="Close conversion bar"
        >
          <X className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
        </button>

        {/* Pure Typography Content */}
        <div className="space-y-0.5 text-left w-full sm:w-auto">
          <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-[#16a34a]/30 text-[#a1d99b] text-[9.5px] sm:text-[10.5px] font-black uppercase tracking-wider border border-[#16a34a]/40">
            <span>{language === 'es' ? 'SOLO 3 CUPOS ESTA SEMANA' : 'LIMITED: 3 SPOTS LEFT THIS WEEK'}</span>
          </div>
          <p className="text-[11.5px] sm:text-sm font-extrabold text-white tracking-tight line-clamp-1">
            {language === 'es' ? 'Plan de Fluidez de Inglés de 5 Días' : 'Personalized 5-Day English Fluency Plan'}
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center gap-2 w-full sm:w-auto justify-end shrink-0">
          <button
            onClick={onOpenQuiz}
            className="hidden sm:inline-flex px-3.5 py-2.5 rounded-xl bg-stone-800/90 hover:bg-stone-800 text-stone-200 hover:text-white text-xs font-extrabold tracking-tight transition-all border border-stone-700 cursor-pointer"
          >
            {language === 'es' ? 'Diagnóstico 2m' : '2-Min Diagnostic'}
          </button>
          
          <button
            onClick={onOpenBooking}
            className="w-full sm:w-auto px-4 py-2 sm:py-2.5 rounded-xl bg-[#62c110] hover:bg-[#52a60d] text-[#07221a] font-black text-xs tracking-tight flex items-center justify-center gap-1 transition-all shadow-lg shadow-[#62c110]/20 hover:scale-[1.01] active:scale-[0.98] cursor-pointer"
          >
            <span>{language === 'es' ? 'Reservar Clase Gratis →' : 'Book Free Session →'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
