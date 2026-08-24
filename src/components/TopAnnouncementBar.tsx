'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { FileText, LogIn, Globe } from 'lucide-react';

interface TopAnnouncementBarProps {
  onOpenLeadMagnet: () => void;
  onOpenLogin: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({
  onOpenLeadMagnet,
  onOpenLogin,
}) => {
  const { language, toggleLanguage, setLanguage } = useLanguage();
  const t = translations[language].banner;

  return (
    <aside aria-label="Announcement" className="bg-[#66c310] text-[#0b2d22] py-2 sm:py-2.5 px-4 sm:px-6 relative z-50 border-b border-[#54a40d]/40 shadow-xs">
      <div className="max-w-6xl mx-auto flex flex-wrap items-center justify-between gap-2.5 text-xs font-semibold">
        
        {/* Left / Center: Cheat Sheet Offer */}
        <div className="flex items-center gap-2 sm:gap-3 flex-1 min-w-[260px]">
          <span className="hidden md:inline-block px-2 py-0.5 rounded-full bg-[#0d382c] text-[#66c310] text-[10px] font-black uppercase tracking-wider">
            {t.tag}
          </span>
          <span className="text-[#0d382c] text-xs sm:text-[13px] font-bold tracking-tight">
            {t.text}
          </span>
          <button
            onClick={onOpenLeadMagnet}
            className="px-3.5 py-1 rounded-full bg-white text-[#0d382c] hover:bg-[#f0fbf0] font-extrabold text-[11px] sm:text-xs shadow-2xs transition-all hover:scale-105 border border-[#488e0c]/30 cursor-pointer shrink-0"
          >
            {t.btn}
          </button>
        </div>

        {/* Right side: Student Login + EN/ES Toggle */}
        <div className="flex items-center gap-4 text-xs shrink-0 ml-auto">
          
          {/* Student Login link */}
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-1.5 text-[#0d382c] hover:text-black font-extrabold transition-colors cursor-pointer"
          >
            <LogIn className="w-3.5 h-3.5 stroke-[2.5]" />
            <span className="hidden sm:inline">{t.login}</span>
            <span className="sm:hidden">Login</span>
            <span className="text-[11px]">→</span>
          </button>

          {/* Bilingual Switcher (EN / ES) */}
          <div className="inline-flex items-center gap-1 bg-[#53a40b] p-0.5 rounded-full text-[11px] font-black border border-[#428409]">
            <Globe className="w-3 h-3 text-[#0d382c] ml-1.5 mr-0.5" />
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'en'
                  ? 'bg-white text-[#0d382c] shadow-2xs font-extrabold'
                  : 'text-[#0d382c] hover:text-white'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-0.5 rounded-full transition-all cursor-pointer ${
                language === 'es'
                  ? 'bg-white text-[#0d382c] shadow-2xs font-extrabold'
                  : 'text-[#0d382c] hover:text-white'
              }`}
            >
              ES
            </button>
          </div>

        </div>

      </div>
    </aside>
  );
};
