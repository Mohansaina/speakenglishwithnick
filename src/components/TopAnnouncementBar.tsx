'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { LogIn, ArrowRight } from 'lucide-react';

interface TopAnnouncementBarProps {
  onOpenLeadMagnet: () => void;
  onOpenLogin: () => void;
}

export const TopAnnouncementBar: React.FC<TopAnnouncementBarProps> = ({
  onOpenLeadMagnet,
  onOpenLogin,
}) => {
  const { language } = useLanguage();
  const t = translations[language].banner;

  return (
    <aside aria-label="Announcement" className="bg-[#051c15] text-white py-2 sm:py-2.5 px-4 sm:px-6 relative z-50 border-b border-[#144737]/80 text-xs shadow-xs">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
        
        {/* Left: Free Cheat Sheet Announcement */}
        <div className="flex items-center justify-center sm:justify-start gap-2.5 flex-wrap text-center sm:text-left">
          <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-[#113d2f] text-[#82e635] text-[10px] font-black uppercase tracking-wider border border-[#216b53]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#62c110]" />
            <span>{t.tag}</span>
          </span>
          <span className="text-stone-200 text-xs sm:text-[13px] font-medium tracking-tight">
            {t.text}
          </span>
          <button
            onClick={onOpenLeadMagnet}
            className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-[#62c110] hover:bg-[#52a60d] text-[#07221a] font-black text-[11px] sm:text-xs shadow-xs transition-all hover:scale-105 cursor-pointer shrink-0"
          >
            <span>{t.btn}</span>
            <ArrowRight className="w-3 h-3 stroke-[2.5]" />
          </button>
        </div>

        {/* Right side: VIP Student Portal Login */}
        <div className="flex items-center justify-center gap-3 text-xs shrink-0">
          <button
            onClick={onOpenLogin}
            className="inline-flex items-center gap-1.5 text-stone-300 hover:text-[#82e635] font-semibold transition-colors cursor-pointer text-xs group"
          >
            <LogIn className="w-3.5 h-3.5 text-[#62c110] group-hover:translate-x-0.5 transition-transform" />
            <span>{t.login}</span>
            <span className="text-stone-400 group-hover:text-white transition-colors">→</span>
          </button>
        </div>

      </div>
    </aside>
  );
};



