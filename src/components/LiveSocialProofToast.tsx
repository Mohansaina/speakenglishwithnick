'use client';

import React, { useState, useEffect } from 'react';
import { CheckCircle2, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SocialProofItem {
  id: string;
  name: string;
  location: string;
  actionEn: string;
  actionEs: string;
  timeAgoEn: string;
  timeAgoEs: string;
  initial: string;
}

const PROOF_DATA: SocialProofItem[] = [
  {
    id: '1',
    name: 'David',
    location: '1-on-1 Student',
    actionEn: 'Left a 5-star review for 1-on-1 Coaching',
    actionEs: 'Dejó una reseña de 5 estrellas en Clases 1-a-1',
    timeAgoEn: 'Verified Review',
    timeAgoEs: 'Reseña Verificada',
    initial: 'D',
  },
  {
    id: '2',
    name: 'Javier',
    location: 'Conversation Practice',
    actionEn: 'Completed Conversation Practice Session',
    actionEs: 'Completó Sesión de Práctica de Conversación',
    timeAgoEn: 'Verified Review',
    timeAgoEs: 'Reseña Verificada',
    initial: 'J',
  },
];

export const LiveSocialProofToast: React.FC<{ onOpenBooking: () => void }> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);

  useEffect(() => {
    const timerInitial = setTimeout(() => {
      if (!isDismissed) setIsVisible(true);
    }, 4000);

    return () => clearTimeout(timerInitial);
  }, [isDismissed]);

  useEffect(() => {
    if (isDismissed) return;

    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % PROOF_DATA.length);
        setIsVisible(true);
      }, 600);
    }, 12000);

    return () => clearInterval(interval);
  }, [isDismissed]);

  if (isDismissed || !isVisible) return null;

  const currentItem = PROOF_DATA[currentIndex];

  return (
    <div className="fixed bottom-4 left-4 z-40 hidden md:block max-w-xs">
      <div 
        onClick={onOpenBooking}
        className="relative bg-white/95 backdrop-blur-md border border-stone-200 shadow-xl shadow-stone-900/10 p-3 rounded-2xl flex items-center gap-3 cursor-pointer hover:border-[#48529e] transition-all hover:scale-[1.02] group"
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            setIsDismissed(true);
          }}
          className="absolute -top-1.5 -right-1.5 w-5 h-5 bg-stone-100 hover:bg-stone-200 text-stone-500 rounded-full flex items-center justify-center text-[10px] transition-colors"
          title="Close"
        >
          <X className="w-3 h-3" />
        </button>

        {/* Clean Styled Initial Badge */}
        <div className="w-10 h-10 rounded-2xl bg-[#48529e] text-white font-black flex items-center justify-center text-base border border-[#373f7a] shadow-xs shrink-0">
          {currentItem.initial}
        </div>

        <div className="space-y-0.5 text-left text-xs">
          <div className="flex items-center gap-1 text-stone-900 font-bold">
            <span>{currentItem.name}</span>
            <span className="text-[10px] text-stone-400 font-normal">({currentItem.location})</span>
            <CheckCircle2 className="w-3.5 h-3.5 text-[#f15555] ml-auto shrink-0" />
          </div>

          <p className="text-[11px] text-stone-600 font-medium line-clamp-1 group-hover:text-[#48529e] transition-colors">
            {language === 'es' ? currentItem.actionEs : currentItem.actionEn}
          </p>

          <div className="flex items-center gap-1.5 text-[10px] text-stone-400">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f15555] inline-block" />
            <span>{language === 'es' ? currentItem.timeAgoEs : currentItem.timeAgoEn}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
