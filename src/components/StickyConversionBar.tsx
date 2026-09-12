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
          setIsVisible(window.scrollY > 250 && !isDismissed);
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
    <div className="fixed bottom-3 left-3 right-3 sm:left-auto sm:right-6 sm:bottom-6 z-50 max-w-2xl w-full transition-all animate-bounce-subtle">
      <div className="relative bg-[#e9f0fc] backdrop-blur-xl text-stone-900 p-4 sm:p-5 rounded-3xl border-2 border-[#c4d4f7] shadow-[0_15px_40px_rgba(0,0,0,0.18)] flex flex-col sm:flex-row items-center justify-between gap-4">
        
        {/* Dismiss Button */}
        <button
          onClick={() => setIsDismissed(true)}
          className="absolute -top-2.5 -right-2.5 w-7 h-7 bg-stone-900 text-white hover:bg-black rounded-full flex items-center justify-center text-xs transition-transform hover:scale-110 shadow-md cursor-pointer border border-stone-700"
          title="Dismiss"
          aria-label="Close sticky questions bar"
        >
          <X className="w-3.5 h-3.5 stroke-[2.5]" />
        </button>

        {/* Text Content matching screenshot */}
        <div className="space-y-1 text-center sm:text-left">
          <h4 className="font-black text-[#18181b] text-sm sm:text-base tracking-tight">
            {language === 'es' ? '¿Tienes alguna pregunta para Teacher Nick?' : 'Have any questions for Teacher Nick?'}
          </h4>
          <p className="text-xs text-stone-700 font-medium flex flex-wrap items-center justify-center sm:justify-start gap-1">
            <span>{language === 'es' ? 'Envía un correo directamente a:' : 'Send an email directly to:'}</span>
            <a
              href={emailUrls.gmailWebUrl}
              onClick={(e) => handleSmartEmailClick(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="font-black text-[#48529e] hover:underline hover:text-[#f15555] transition-colors"
            >
              speakenglishwithnick@gmail.com
            </a>
          </p>
        </div>

        {/* Action Buttons matching screenshot */}
        <div className="flex items-center gap-2.5 w-full sm:w-auto shrink-0 justify-center">
          <a
            href={emailUrls.gmailWebUrl}
            onClick={(e) => handleSmartEmailClick(e)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-full bg-white hover:bg-stone-50 text-[#48529e] border border-[#c2d4f8] font-extrabold text-xs shadow-xs flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5 text-[#f15555]" />
            <span>{language === 'es' ? 'Enviar Email' : 'Send Email'}</span>
          </a>

          <button
            onClick={onOpenBooking}
            className="px-4 py-2.5 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-extrabold text-xs shadow-md flex items-center justify-center gap-1.5 transition-all hover:scale-[1.02] active:scale-95 cursor-pointer"
          >
            <span>{language === 'es' ? 'Agendar Sesión' : 'Book Session'}</span>
            <ArrowRight className="w-3.5 h-3.5 text-white" />
          </button>
        </div>

      </div>
    </div>
  );
};
