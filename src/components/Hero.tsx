'use client';

import React from 'react';
import { Calendar, MessageCircle, ArrowRight, Check, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HeroProps {
  onOpenQuiz?: () => void;
  onOpenBooking?: (focusTopic?: string) => void;
  onOpenLeadMagnet?: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuiz,
  onOpenBooking = () => {},
  onOpenLeadMagnet,
}) => {
  const { language } = useLanguage();

  return (
    <section className="relative bg-white border-b border-stone-200 overflow-hidden py-6 sm:py-12 lg:py-16">
      <div className="max-w-7xl mx-auto px-3.5 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-center">
          
          {/* Left Column: Teacher Nick Photo */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[260px] xs:max-w-[300px] sm:max-w-[420px] rounded-3xl overflow-hidden shadow-xl border border-stone-200 bg-white group">
              <img
                src="/nick-hero.jpg"
                alt="Teacher Nick - Native American English Teacher"
                className="w-full h-auto object-cover object-center group-hover:scale-102 transition-transform duration-500"
              />
              
              {/* Bottom Credential Bar */}
              <div className="p-3 sm:p-3.5 bg-[#48529e] text-white flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-xs sm:text-sm flex items-center gap-1.5">
                    <span>Teacher Nick</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
                  </div>
                </div>
                <span className="text-[9px] sm:text-[10px] uppercase font-black px-2 sm:px-2.5 py-1 rounded-full bg-[#f15555] text-white shrink-0">
                  5 Languages
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Exact Content from Reference */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5 text-left">
            
            {/* Top Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#e4ebf9] text-[#48529e] text-xs font-black uppercase tracking-wider border border-[#c4d4f7] shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#f15555]" />
              <span>SPEAK ENGLISH WITH NICK</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-[22px] xs:text-[26px] sm:text-4xl lg:text-5xl xl:text-[54px] font-black text-stone-900 tracking-tight leading-[1.12] break-words">
              {language === 'es' ? (
                <>
                  Donde hablar inglés <br />
                  <span className="font-serif italic font-black text-[#48529e]">es posible</span>
                </>
              ) : (
                <>
                  Where speaking English <br />
                  <span className="font-serif italic font-black text-[#48529e]">is possible</span>
                </>
              )}
            </h1>

            {/* Nick Introduction Bio */}
            <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed font-normal">
              {language === 'es'
                ? 'Hola, soy Nick. He aprendido a hablar 5 idiomas con fluidez y estoy aprendiendo otros idiomas. Estaré encantado de guiarte pacientemente en el proceso de aprender inglés y ganar más confianza al hablarlo.'
                : "Hi, I'm Nick. I have learned to speak 5 languages fluently and I'm learning other languages. I would be happy to patiently guide you through the process of learning English and get more confident speaking it."}
            </p>

            {/* Class Layout Schedule Box */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#1e244d] text-white border border-[#373f7a] shadow-md space-y-3">
              <div className="space-y-2 sm:space-y-3 text-xs sm:text-sm text-stone-200 font-medium">
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <Calendar className="w-4 h-4 text-[#f15555] shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-stone-100 font-semibold text-xs sm:text-sm md:text-base leading-snug">
                    {language === 'es'
                      ? '1 sesión por semana (Presencial u online)'
                      : '1 session per week (In person or online)'}
                  </span>
                </div>
                <div className="flex items-start sm:items-center gap-2.5 sm:gap-3">
                  <MessageCircle className="w-4 h-4 text-[#f15555] shrink-0 mt-0.5 sm:mt-0" />
                  <span className="text-stone-100 font-semibold text-xs sm:text-sm md:text-base leading-snug">
                    {language === 'es'
                      ? '3-5 días de práctica guiada a través de WhatsApp'
                      : '3-5 days of practice through WhatsApp'}
                  </span>
                </div>
              </div>

              {/* Arrow Link to Email at the bottom of the blue box */}
              <div className="pt-3 border-t border-white/15 flex items-center justify-between">
                <button
                  onClick={() => onOpenBooking('Inquiry: Questions & Group Size')}
                  className="group inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-stone-200 hover:text-white transition-colors cursor-pointer"
                >
                  <span className="group-hover:underline">speakenglishwithnick@gmail.com</span>
                  <div className="w-7 h-7 rounded-full bg-[#f15555] group-hover:bg-[#e04444] flex items-center justify-center transition-all shadow-sm group-hover:scale-105">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 3 Prominent Large Option Boxes Positioned Underneath */}
        <div className="mt-8 sm:mt-16 pt-6 sm:pt-10 border-t border-stone-200/80">
          <div className="text-center mb-5 sm:mb-7">
            <span className="text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#48529e] bg-[#e4ebf9] px-3.5 py-1 rounded-full border border-[#c4d4f7] shadow-2xs">
              {language === 'es' ? '• SELECCIONA TU PROGRAMA •' : '• SELECT YOUR LEARNING FOCUS •'}
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-6 lg:gap-7 items-stretch">
            
            {/* Box 1: English from 0 */}
            <div className="group p-5 xs:p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] text-white border-2 border-[#373f7a]/80 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_12px_35px_rgba(72,82,158,0.18)] hover:shadow-[0_20px_45px_rgba(72,82,158,0.32)] flex flex-col justify-between min-h-[auto] md:min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#f15555]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#e4ebf9] leading-tight tracking-tight transition-colors">
                  {language === 'es' ? 'Inglés desde 0' : 'English from 0'}
                </h3>
                
                <ul className="space-y-2 text-xs sm:text-sm text-stone-100 font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Lee, escribe y habla oraciones básicas' : 'Read, write, and speak basic English sentences'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Construye vocabulario clave paso a paso' : 'Build core vocabulary step-by-step'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Ambiente paciente y libre de juicio' : 'Patient, zero-judgment learning environment'}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 relative z-10 mt-4 pt-3 border-t border-white/20">
                {/* SEE PRICES button */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Inglés desde 0' : 'English from 0')}
                  className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-between text-white transition-all group/btn cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e4ebf9] group-hover/btn:text-white transition-colors">
                    {language === 'es' ? 'Ver Precios' : 'See Prices'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f15555] border border-white/30 group-hover/btn:bg-[#e04444] flex items-center justify-center transition-all duration-300 shadow-sm group-hover/btn:scale-110 shrink-0">
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </div>
                </button>

                {/* HAVE ANY QUESTIONS bar inside this box */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Preguntas sobre Inglés desde 0' : 'Questions about English from 0')}
                  className="w-full p-2.5 rounded-2xl bg-[#e4ebf9]/15 hover:bg-[#e4ebf9]/25 border border-[#c4d4f7]/30 flex items-center justify-between text-stone-100 text-[11px] sm:text-xs font-semibold transition-all group/q cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#f15555] shrink-0" />
                    <span className="truncate">
                      {language === 'es' ? '¿Tienes alguna pregunta?' : 'Have any questions?'} speakenglishwithnick@gmail.com
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-200 group-hover/q:translate-x-0.5 transition-transform stroke-[2.5] shrink-0" />
                </button>
              </div>
            </div>

            {/* Box 2: Specific English */}
            <div className="group p-5 xs:p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] text-white border-2 border-[#f15555]/90 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_15px_40px_rgba(241,85,85,0.22)] hover:shadow-[0_22px_50px_rgba(241,85,85,0.35)] flex flex-col justify-between min-h-[auto] md:min-h-[300px] relative overflow-hidden ring-4 ring-[#f15555]/15">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#f15555]/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#e4ebf9] leading-tight tracking-tight transition-colors">
                  {language === 'es' ? 'Inglés Específico' : 'Specific English'}
                </h3>
                
                <ul className="space-y-2 text-xs sm:text-sm text-stone-100 font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Work: Uber, Doordash, Restaurant, etc.' : 'Work: Uber, Doordash, Restaurant, etc.'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Business: Painting, Flooring, Cars, etc.' : 'Business: Painting, Flooring, Cars, etc.'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Práctica adaptada a tu meta personal' : 'Customized roleplays tailored to your goals'}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 relative z-10 mt-4 pt-3 border-t border-white/20">
                {/* SEE PRICES button */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Inglés Específico' : 'Specific English')}
                  className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-between text-white transition-all group/btn cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white group-hover/btn:text-[#e4ebf9] transition-colors">
                    {language === 'es' ? 'Ver Precios' : 'See Prices'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f15555] border border-white/30 group-hover/btn:bg-[#e04444] flex items-center justify-center transition-all duration-300 shadow-sm group-hover/btn:scale-110 shrink-0">
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </div>
                </button>

                {/* HAVE ANY QUESTIONS bar inside this box */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Preguntas sobre Inglés Específico' : 'Questions about Specific English')}
                  className="w-full p-2.5 rounded-2xl bg-[#e4ebf9]/15 hover:bg-[#e4ebf9]/25 border border-[#c4d4f7]/30 flex items-center justify-between text-stone-100 text-[11px] sm:text-xs font-semibold transition-all group/q cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#f15555] shrink-0" />
                    <span className="truncate">
                      {language === 'es' ? '¿Tienes alguna pregunta?' : 'Have any questions?'} speakenglishwithnick@gmail.com
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-200 group-hover/q:translate-x-0.5 transition-transform stroke-[2.5] shrink-0" />
                </button>
              </div>
            </div>

            {/* Box 3: Conversation Practice */}
            <div className="group p-5 xs:p-6 sm:p-7 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] text-white border-2 border-[#373f7a]/80 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_12px_35px_rgba(72,82,158,0.18)] hover:shadow-[0_20px_45px_rgba(72,82,158,0.32)] flex flex-col justify-between min-h-[auto] md:min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#f15555]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#e4ebf9] leading-tight tracking-tight transition-colors">
                  {language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice'}
                </h3>
                
                <ul className="space-y-2 text-xs sm:text-sm text-stone-100 font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Gana confianza total al hablar' : 'Gain real speaking confidence'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Domina el ritmo del acento americano' : 'Master natural American cadence'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Aprende vocabulario y corrige tus errores' : 'Instant feedback & error correction'}</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-2 relative z-10 mt-4 pt-3 border-t border-white/20">
                {/* SEE PRICES button */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice')}
                  className="w-full p-3 rounded-2xl bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-between text-white transition-all group/btn cursor-pointer"
                >
                  <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e4ebf9] group-hover/btn:text-white transition-colors">
                    {language === 'es' ? 'Ver Precios' : 'See Prices'}
                  </span>
                  <div className="w-7 h-7 rounded-full bg-[#f15555] border border-white/30 group-hover/btn:bg-[#e04444] flex items-center justify-center transition-all duration-300 shadow-sm group-hover/btn:scale-110 shrink-0">
                    <ArrowRight className="w-4 h-4 text-white group-hover/btn:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </div>
                </button>

                {/* HAVE ANY QUESTIONS bar inside this box */}
                <button
                  onClick={() => onOpenBooking(language === 'es' ? 'Preguntas sobre Práctica de Conversación' : 'Questions about Conversation Practice')}
                  className="w-full p-2.5 rounded-2xl bg-[#e4ebf9]/15 hover:bg-[#e4ebf9]/25 border border-[#c4d4f7]/30 flex items-center justify-between text-stone-100 text-[11px] sm:text-xs font-semibold transition-all group/q cursor-pointer"
                >
                  <div className="flex items-center gap-1.5 truncate">
                    <Mail className="w-3.5 h-3.5 text-[#f15555] shrink-0" />
                    <span className="truncate">
                      {language === 'es' ? '¿Tienes alguna pregunta?' : 'Have any questions?'} speakenglishwithnick@gmail.com
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-stone-200 group-hover/q:translate-x-0.5 transition-transform stroke-[2.5] shrink-0" />
                </button>
              </div>
            </div>

          </div>

          {/* Any Questions Email Bar */}
          <div className="mt-6 sm:mt-8 text-center">
            <button
              onClick={() => onOpenBooking('Inquiry: Questions & Group Size')}
              className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-[#e4ebf9] hover:bg-[#c2d4f8] text-[#48529e] text-xs sm:text-sm font-bold border border-[#c4d4f7] transition-all shadow-2xs hover:scale-[1.02] cursor-pointer"
            >
              <Mail className="w-4 h-4 text-[#f15555]" />
              <span>
                {language === 'es'
                  ? '¿Tienes alguna pregunta? speakenglishwithnick@gmail.com'
                  : 'Have any questions? speakenglishwithnick@gmail.com'}
              </span>
              <ArrowRight className="w-4 h-4 text-[#48529e] stroke-[2.5]" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
};


