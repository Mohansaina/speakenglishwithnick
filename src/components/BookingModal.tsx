'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, User, CheckCircle2, Sparkles, BookOpen, Target, MessageSquare } from 'lucide-react';
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

  const getTabFromNotes = (notes: string): ProgramType => {
    const lower = notes.toLowerCase();
    if (lower.includes('conversation') || lower.includes('conversación')) {
      return 'conversation-practice';
    }
    if (lower.includes('specific') || lower.includes('específico')) {
      return 'specific-english';
    }
    return 'english-from-0';
  };

  const [activeTab, setActiveTab] = useState<ProgramType>('english-from-0');

  useEffect(() => {
    setActiveTab(getTabFromNotes(prefilledNotes));
  }, [prefilledNotes, isOpen]);

  // Lock background scroll when modal is open
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
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
      iconCount: 2,
    },
    {
      studentsEn: '3 students',
      studentsEs: '3 estudiantes',
      price: '$45',
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
      iconCount: 3,
    },
    {
      studentsEn: '4 students',
      studentsEs: '4 estudiantes',
      price: '$40',
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
      iconCount: 4,
    },
    {
      studentsEn: '5-8 students',
      studentsEs: '5-8 estudiantes',
      price: '$30',
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
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
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
      iconCount: 2,
    },
    {
      studentsEn: '3-4 students',
      studentsEs: '3-4 estudiantes',
      price: '$30',
      noteEn: 'per person / class',
      noteEs: 'por persona / clase',
      iconCount: 4,
    },
  ];

  const currentPrices =
    activeTab === 'conversation-practice' ? conversationPrices : standardPrices;

  const getProgramTitle = () => {
    switch (activeTab) {
      case 'english-from-0':
        return language === 'es' ? 'Inglés desde 0' : 'English from 0';
      case 'specific-english':
        return language === 'es' ? 'Inglés Específico' : 'Specific English';
      case 'conversation-practice':
        return language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice';
    }
  };

  const getProgramSubtitle = () => {
    switch (activeTab) {
      case 'english-from-0':
        return language === 'es'
          ? 'Tarifas por clase persona para principiantes'
          : 'Per-class & per-person rates for beginners';
      case 'specific-english':
        return language === 'es'
          ? 'Tarifas por clase persona para trabajo y negocios'
          : 'Per-class & per-person rates for work and specific goals';
      case 'conversation-practice':
        return language === 'es'
          ? 'Tarifas por clase persona para fluidez y conversación'
          : 'Per-class & per-person rates for conversational fluency';
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 xs:p-3 sm:p-5 bg-black/80 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-2xl max-h-[90vh] sm:max-h-[85vh] bg-white border border-stone-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col animate-modal-pop">
        
        {/* Modal Header Bar (Fixed / non-scrolling) */}
        <div className="bg-[#48529e] p-4 xs:p-5 sm:p-6 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="space-y-1.5 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 border border-white/20 text-[10px] sm:text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3 h-3 sm:w-3.5 sm:h-3.5 text-[#f15555]" />
              <span>{language === 'es' ? 'Precios por Clase / Persona' : 'Prices Per Class / Person'}</span>
            </div>
            <h2 className="text-xl xs:text-2xl sm:text-3xl font-black tracking-tight text-white leading-tight">
              {getProgramTitle()}
            </h2>
            <p className="text-xs sm:text-sm text-white/85 font-medium leading-snug">
              {getProgramSubtitle()}
            </p>
          </div>
        </div>

        {/* 3 Separate Program Tabs (Fixed / non-scrolling) */}
        <div className="p-2.5 sm:p-4 bg-stone-50 border-b border-stone-200 shrink-0">
          <div className="grid grid-cols-3 gap-1 sm:gap-1.5 p-1 bg-stone-200/80 rounded-2xl">
            
            <button
              onClick={() => setActiveTab('english-from-0')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-1 leading-tight ${
                activeTab === 'english-from-0'
                  ? 'bg-white text-[#48529e] shadow-md border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span>{language === 'es' ? 'Inglés desde 0' : 'English from 0'}</span>
            </button>

            <button
              onClick={() => setActiveTab('specific-english')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-1 leading-tight ${
                activeTab === 'specific-english'
                  ? 'bg-white text-[#48529e] shadow-md border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <Target className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span>{language === 'es' ? 'Inglés Específico' : 'Specific English'}</span>
            </button>

            <button
              onClick={() => setActiveTab('conversation-practice')}
              className={`py-2 px-1.5 sm:px-3 rounded-xl text-[10px] xs:text-[11px] sm:text-xs font-black transition-all cursor-pointer text-center flex items-center justify-center gap-1 leading-tight ${
                activeTab === 'conversation-practice'
                  ? 'bg-white text-[#48529e] shadow-md border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5 shrink-0 hidden sm:inline" />
              <span>{language === 'es' ? 'Conversación' : 'Conversation'}</span>
            </button>

          </div>
        </div>

        {/* Prices List Body (Fluid Scrollable Area) */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-3.5 min-h-0 touch-pan-y">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs sm:text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              {getProgramTitle()}
            </span>
            <span className="text-[11px] sm:text-xs font-bold text-[#f15555] bg-[#f15555]/10 px-2.5 py-0.5 rounded-full border border-[#f15555]/20">
              {language === 'es' ? 'Precios por clase / persona' : 'Prices per class / person'}
            </span>
          </div>

          <div className="space-y-2.5">
            {currentPrices.map((item, idx) => (
              <div
                key={idx}
                className="p-3.5 sm:p-4 rounded-2xl bg-white border border-stone-200/90 hover:border-[#48529e] transition-all flex items-center justify-between shadow-2xs hover:shadow-sm group"
              >
                <div className="flex items-center gap-2.5 sm:gap-3">
                  <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#e4ebf9] text-[#48529e] flex items-center justify-center shrink-0 border border-[#c4d4f7] group-hover:bg-[#48529e] group-hover:text-white transition-colors">
                    {item.iconCount === 1 ? (
                      <User className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    ) : (
                      <Users className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-xs sm:text-base text-stone-900 leading-tight">
                      {language === 'es' ? item.studentsEs : item.studentsEn}
                    </div>
                    <div className="text-[10px] sm:text-xs text-stone-500 font-medium">
                      {language === 'es' ? item.noteEs : item.noteEn}
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-lg sm:text-2xl font-black text-[#48529e]">
                    {item.price}
                  </span>
                  <span className="text-[10px] sm:text-[11px] font-bold text-stone-500 block leading-none mt-0.5">
                    {language === 'es' ? item.noteEs : item.noteEn}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-3.5 rounded-2xl bg-[#e4ebf9]/60 border border-[#c4d4f7] flex items-start gap-2.5 mt-3">
            <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[#48529e] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-xs text-[#373f7a] font-medium leading-relaxed">
              {language === 'es'
                ? 'Todas las clases incluyen 1 sesión semanal en vivo con Teacher Nick + 3-5 días por semana de práctica guiada por voz en WhatsApp.'
                : 'All classes include 1 live weekly session with Teacher Nick + 3-5 days per week of guided voice practice on WhatsApp.'}
            </p>
          </div>
        </div>

        {/* Modal Footer (Fixed / non-scrolling) */}
        <div className="p-3.5 sm:p-5 bg-stone-50 border-t border-stone-200 flex flex-row items-center justify-between gap-3 shrink-0">
          <div className="text-xs text-stone-500 font-medium">
            {language === 'es' ? '¿Listo para empezar?' : 'Ready to start with Nick?'}
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
