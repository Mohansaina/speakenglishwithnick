'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, User, CheckCircle2, MessageCircle, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes = '',
}) => {
  const { language } = useLanguage();

  const isConversationPrefill =
    prefilledNotes.toLowerCase().includes('conversation') ||
    prefilledNotes.toLowerCase().includes('conversación');

  const [activeTab, setActiveTab] = useState<'general' | 'conversation'>(
    isConversationPrefill ? 'conversation' : 'general'
  );

  useEffect(() => {
    if (
      prefilledNotes.toLowerCase().includes('conversation') ||
      prefilledNotes.toLowerCase().includes('conversación')
    ) {
      setActiveTab('conversation');
    } else {
      setActiveTab('general');
    }
  }, [prefilledNotes]);

  if (!isOpen) return null;

  const generalPrices = [
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
    activeTab === 'general' ? generalPrices : conversationPrices;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-modal-backdrop overflow-y-auto">
      <div className="relative w-full max-w-2xl bg-white border border-stone-200 shadow-2xl rounded-3xl overflow-hidden animate-modal-pop my-auto">
        
        {/* Modal Header Bar */}
        <div className="bg-[#48529e] p-5 sm:p-7 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="space-y-2 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#f15555]" />
              <span>{language === 'es' ? 'Precios por Clase' : 'Prices Per Class'}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              {language === 'es' ? 'Planes de Precios' : 'Class Pricing & Rates'}
            </h2>
            <p className="text-xs sm:text-sm text-white/80 font-medium">
              {language === 'es'
                ? 'Elige el programa para ver las tarifas por clase según la cantidad de estudiantes.'
                : 'Select your program to view transparent per-class rates based on group size.'}
            </p>
          </div>
        </div>

        {/* Tab Switcher Buttons */}
        <div className="p-4 sm:p-6 bg-stone-50 border-b border-stone-200">
          <div className="grid grid-cols-2 gap-2 p-1.5 bg-stone-200/70 rounded-2xl">
            <button
              onClick={() => setActiveTab('general')}
              className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center ${
                activeTab === 'general'
                  ? 'bg-white text-[#48529e] shadow-md border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'es' ? 'Inglés desde 0 & Específico' : 'English From 0 & Specific English'}
            </button>

            <button
              onClick={() => setActiveTab('conversation')}
              className={`py-3 px-3 sm:px-4 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer text-center ${
                activeTab === 'conversation'
                  ? 'bg-white text-[#48529e] shadow-md border border-stone-200/80'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice'}
            </button>
          </div>
        </div>

        {/* Prices List Body */}
        <div className="p-5 sm:p-7 space-y-4 max-h-[55vh] overflow-y-auto">
          <div className="flex items-center justify-between pb-2 border-b border-stone-200">
            <span className="text-xs sm:text-sm font-extrabold text-stone-900 uppercase tracking-wider">
              {activeTab === 'general'
                ? language === 'es'
                  ? 'Inglés desde 0 / Inglés Específico'
                  : 'English From 0 & Specific English'
                : language === 'es'
                ? 'Práctica de Conversación'
                : 'Conversation Practice'}
            </span>
            <span className="text-xs font-bold text-[#f15555] bg-[#f15555]/10 px-2.5 py-1 rounded-full border border-[#f15555]/20">
              {language === 'es' ? 'Precios por clase' : 'Prices per class'}
            </span>
          </div>

          <div className="space-y-3">
            {currentPrices.map((item, idx) => (
              <div
                key={idx}
                className="p-4 sm:p-4.5 rounded-2xl bg-white border border-stone-200/90 hover:border-[#48529e] transition-all flex items-center justify-between shadow-2xs hover:shadow-sm group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-[#e4ebf9] text-[#48529e] flex items-center justify-center shrink-0 border border-[#c4d4f7] group-hover:bg-[#48529e] group-hover:text-white transition-colors">
                    {item.iconCount === 1 ? (
                      <User className="w-5 h-5 stroke-[2.5]" />
                    ) : (
                      <Users className="w-5 h-5 stroke-[2.5]" />
                    )}
                  </div>
                  <div>
                    <div className="font-extrabold text-sm sm:text-base text-stone-900">
                      {language === 'es' ? item.studentsEs : item.studentsEn}
                    </div>
                    <div className="text-xs text-stone-500 font-medium">
                      {language === 'es' ? item.noteEs : item.noteEn}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-xl sm:text-2xl font-black text-[#48529e]">
                    {item.price}
                  </span>
                  <span className="text-[11px] font-bold text-stone-500 block">
                    {language === 'es' ? 'por clase' : 'per class'}
                  </span>
                </div>
              </div>
            ))}
          </div>

          <div className="p-4 rounded-2xl bg-[#e4ebf9]/60 border border-[#c4d4f7] flex items-start gap-3 mt-4">
            <CheckCircle2 className="w-5 h-5 text-[#48529e] shrink-0 mt-0.5 stroke-[2.5]" />
            <p className="text-xs text-[#373f7a] font-medium leading-relaxed">
              {language === 'es'
                ? 'Todas las clases incluyen 1 sesión semanal en vivo con Teacher Nick + 3-5 días por semana de práctica guiada por voz en WhatsApp.'
                : 'All classes include 1 live weekly session with Teacher Nick + 3-5 days per week of guided voice practice on WhatsApp.'}
            </p>
          </div>
        </div>

        {/* Modal Footer / Action Button */}
        <div className="p-4 sm:p-6 bg-stone-50 border-t border-stone-200 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-xs text-stone-500 text-center sm:text-left font-medium">
            {language === 'es' ? '¿Listo para reservar?' : 'Ready to reserve your spot?'}
          </div>
          <button
            onClick={onClose}
            className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] cursor-pointer flex items-center justify-center gap-2"
          >
            <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
          </button>
        </div>

      </div>
    </div>
  );
};
