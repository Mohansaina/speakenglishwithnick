'use client';

import React, { useEffect } from 'react';
import { X, Users, User, CheckCircle2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

type ProgramType = 'english-from-0' | 'specific-english' | 'conversation-practice';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes = '',
}) => {
  const { language } = useLanguage();

  const getProgramType = (notes: string): ProgramType => {
    const lower = notes.toLowerCase();
    if (lower.includes('conversation') || lower.includes('conversación')) {
      return 'conversation-practice';
    }
    if (lower.includes('specific') || lower.includes('específico')) {
      return 'specific-english';
    }
    return 'english-from-0';
  };

  const activeProgram = getProgramType(prefilledNotes);

  // Prevent background scrolling when modal is active
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  // Tier 1 & 2 Pricing (English from 0 & Specific English)
  const standardPrices = [
    {
      studentsEn: '1 student',
      studentsEs: '1 estudiante',
      price: '$85',
      noteEn: 'per class',
      noteEs: 'por clase',
      iconCount: 1,
    },
    {
      studentsEn: '2 students',
      studentsEs: '2 estudiantes',
      price: '$50',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 2,
    },
    {
      studentsEn: '3 students',
      studentsEs: '3 estudiantes',
      price: '$45',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 3,
    },
    {
      studentsEn: '4 students',
      studentsEs: '4 estudiantes',
      price: '$40',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 4,
    },
    {
      studentsEn: '5-8 students',
      studentsEs: '5-8 estudiantes',
      price: '$30',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 5,
    },
  ];

  // Tier 3 Pricing (Conversation Practice)
  const conversationPrices = [
    {
      studentsEn: '1 student',
      studentsEs: '1 estudiante',
      price: '$65',
      noteEn: 'per class',
      noteEs: 'por clase',
      iconCount: 1,
    },
    {
      studentsEn: '2 students',
      studentsEs: '2 estudiantes',
      price: '$40',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 2,
    },
    {
      studentsEn: '3-4 students',
      studentsEs: '3-4 estudiantes',
      price: '$30',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 4,
    },
  ];

  const currentPrices =
    activeProgram === 'conversation-practice' ? conversationPrices : standardPrices;

  const getProgramTitle = () => {
    switch (activeProgram) {
      case 'english-from-0':
        return language === 'es' ? 'Inglés desde 0' : 'English from 0';
      case 'specific-english':
        return language === 'es' ? 'Inglés Específico' : 'Specific English';
      case 'conversation-practice':
        return language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice';
    }
  };

  const getBadgeLabel = () => {
    if (activeProgram === 'conversation-practice') {
      return language === 'es' ? 'Precios por clase' : 'Prices per class';
    }
    return language === 'es' ? 'Precios' : 'Prices';
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-5 flex min-h-full items-center justify-center animate-modal-backdrop">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col my-auto max-h-[85vh] animate-modal-pop">
        
        {/* Modal Header Bar */}
        <div className="bg-[#48529e] p-4 sm:p-5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="space-y-1 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#f15555]" />
              <span>{getBadgeLabel()}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              {getProgramTitle()}
            </h2>
          </div>
        </div>

        {/* Prices List Body (Guaranteed Scrolling & Compact Fit) */}
        <div className="flex-1 overflow-y-auto max-h-[58vh] p-4 sm:p-5 space-y-2.5 min-h-0 touch-pan-y shadow-inner">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wider">
              {getProgramTitle()}
            </span>
            <span className="text-xs font-black text-[#f15555] bg-[#f15555]/10 px-3 py-0.5 rounded-full border border-[#f15555]/20">
              {getBadgeLabel()}
            </span>
          </div>

          <div className="space-y-2">
            {currentPrices.map((item, idx) => (
              <div
                key={idx}
                className="p-3 sm:p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 flex items-center justify-between shadow-2xs hover:border-[#48529e] transition-colors"
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#e4ebf9] text-[#48529e] flex items-center justify-center shrink-0 border border-[#c4d4f7]">
                    {item.iconCount === 1 ? (
                      <User className="w-4 h-4 stroke-[2.5]" />
                    ) : (
                      <Users className="w-4 h-4 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <div className="font-black text-xs sm:text-sm text-stone-900 leading-tight">
                      {language === 'es' ? item.studentsEs : item.studentsEn}
                    </div>
                    <div className="text-[10px] sm:text-xs text-stone-500 font-semibold">
                      {language === 'es' ? item.noteEs : item.noteEn}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg sm:text-xl font-black text-[#48529e]">
                    {item.price}
                  </span>
                  <span className="text-[10px] sm:text-xs font-bold text-stone-600 block leading-none mt-0.5">
                    {language === 'es' ? item.noteEs : item.noteEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3 rounded-2xl bg-[#e4ebf9]/60 border border-[#c4d4f7] flex items-start gap-2 mt-2">
            <CheckCircle2 className="w-4 h-4 text-[#48529e] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-[11px] sm:text-xs text-[#373f7a] font-medium leading-relaxed">
              {language === 'es'
                ? 'Todas las clases incluyen 1 sesión semanal en vivo con Teacher Nick + 3-5 días por semana de práctica guiada por voz en WhatsApp.'
                : 'All classes include 1 live weekly session with Teacher Nick + 3-5 days per week of guided voice practice on WhatsApp.'}
            </p>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-500 font-medium">
            {language === 'es' ? '¿Listo para empezar tu programa?' : 'Ready to start your program with Nick?'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2 sm:py-2.5 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center"
          >
            <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
