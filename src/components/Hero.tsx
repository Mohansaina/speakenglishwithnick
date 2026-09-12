'use client';

import React from 'react';
import { Calendar, MessageCircle, ArrowRight, Check } from 'lucide-react';
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
                  <p className="text-[10px] sm:text-[11px] text-white/80 font-medium">
                    {language === 'es' ? 'Especialista en Acento y Fluidez' : 'Accent & Fluency Specialist'}
                  </p>
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
                  <span className="font-serif italic font-normal text-[#48529e]">es posible</span>
                </>
              ) : (
                <>
                  Where speaking English <br />
                  <span className="font-serif italic font-normal text-[#48529e]">is possible</span>
                </>
              )}
            </h1>

            {/* Nick Introduction Bio */}
            <p className="text-xs sm:text-sm md:text-base text-stone-700 leading-relaxed font-normal">
              {language === 'es'
                ? 'Hola, soy Nick. He aprendido a hablar 5 idiomas con fluidez y entiendo las bases de muchos otros. Será un verdadero placer guiarte con paciencia en el proceso de aprender a hablar inglés o ganar total confianza al comunicarte.'
                : "Hi, I'm Nick. I have learned to speak 5 languages fluently, and I'm learning the basics of many other languages. I would be happy to patiently guide you through the process of learning how to speak English or get more confident with your English speaking."}
            </p>

            {/* Class Layout Schedule Box */}
            <div className="p-3.5 sm:p-5 rounded-2xl bg-[#1e244d] text-white border border-[#373f7a] shadow-md">
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
            
            {/* Box 1: Work (Uber, Doordash, Restaurant) */}
            <button
              onClick={() => onOpenBooking(language === 'es' ? 'Trabajo (Uber, Doordash, Restaurante)' : 'Work (Uber, Doordash, Restaurant)')}
              className="group p-5 xs:p-6 sm:p-7 lg:p-8 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] hover:from-[#3a4387] hover:to-[#2e356e] text-white border-2 border-[#373f7a]/80 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_12px_35px_rgba(72,82,158,0.18)] hover:shadow-[0_20px_45px_rgba(72,82,158,0.32)] hover:-translate-y-1.5 flex flex-col justify-between min-h-[auto] md:min-h-[280px] cursor-pointer relative overflow-hidden active:scale-[0.98]"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#f15555]/15 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#e4ebf9] leading-tight tracking-tight transition-colors">
                  {language === 'es' ? 'Trabajo' : 'Work'}
                </h3>
                
                <ul className="space-y-2 text-xs sm:text-sm text-stone-100 font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Uber, Doordash, Restaurantes y atención al cliente' : 'Uber, Doordash, Restaurant & delivery'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Comunicación diaria y situaciones laborales reales' : 'Daily communication & real work scenarios'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/20 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]/40">
                      <Check className="w-3 h-3 text-[#f15555] stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Ambiente paciente y libre de juicio' : 'Patient, zero-judgment learning environment'}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-white/20 flex items-center justify-between relative z-10 mt-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e4ebf9] group-hover:text-white transition-colors">
                  {language === 'es' ? 'Inglés de trabajo' : 'Workplace English'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 group-hover:bg-[#f15555] group-hover:border-[#f15555] flex items-center justify-center transition-all duration-300 shadow-sm">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Box 2: Business (Painting, Flooring, Cars) */}
            <button
              onClick={() => onOpenBooking(language === 'es' ? 'Negocios (Pintura, Pisos, Vehículos)' : 'Business (Painting, Flooring, Cars)')}
              className="group p-5 xs:p-6 sm:p-7 lg:p-8 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] hover:from-[#3a4387] hover:to-[#2e356e] text-white border-2 border-[#f15555]/90 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_15px_40px_rgba(241,85,85,0.22)] hover:shadow-[0_22px_50px_rgba(241,85,85,0.35)] hover:-translate-y-1.5 flex flex-col justify-between min-h-[auto] md:min-h-[280px] cursor-pointer relative overflow-hidden active:scale-[0.98] ring-4 ring-[#f15555]/15"
            >
              <div className="absolute top-0 right-0 w-36 h-36 bg-[#f15555]/25 rounded-full blur-2xl pointer-events-none group-hover:scale-125 transition-transform duration-500" />

              <div className="space-y-3 relative z-10">
                <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-white group-hover:text-[#e4ebf9] leading-tight tracking-tight transition-colors">
                  {language === 'es' ? 'Negocios' : 'Business'}
                </h3>
                
                <ul className="space-y-2 text-xs sm:text-sm text-stone-100 font-medium">
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Pintura, Pisos, Vehículos y contratistas' : 'Painting, Flooring, Cars & contracting'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Presupuestos, clientes y proyectos de trabajo' : 'Client quotes, negotiations & job sites'}</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <div className="w-4 h-4 rounded-full bg-[#f15555]/30 flex items-center justify-center shrink-0 mt-0.5 border border-[#f15555]">
                      <Check className="w-3 h-3 text-white stroke-[3]" />
                    </div>
                    <span>{language === 'es' ? 'Práctica adaptada a tu negocio personal' : 'Customized roleplays tailored to your business'}</span>
                  </li>
                </ul>
              </div>

              <div className="pt-4 sm:pt-5 border-t border-white/20 flex items-center justify-between relative z-10 mt-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-white group-hover:text-[#e4ebf9] transition-colors">
                  {language === 'es' ? 'Inglés de negocios' : 'Business English'}
                </span>
                <div className="w-8 h-8 rounded-full bg-[#f15555] border border-white/30 group-hover:bg-[#e04444] flex items-center justify-center transition-all duration-300 shadow-sm">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

            {/* Box 3: Conversation Practice */}
            <button
              onClick={() => onOpenBooking(language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice')}
              className="group p-5 xs:p-6 sm:p-7 lg:p-8 rounded-3xl bg-gradient-to-b from-[#48529e] to-[#3a4387] hover:from-[#3a4387] hover:to-[#2e356e] text-white border-2 border-[#373f7a]/80 hover:border-[#f15555] text-left transition-all duration-300 shadow-[0_12px_35px_rgba(72,82,158,0.18)] hover:shadow-[0_20px_45px_rgba(72,82,158,0.32)] hover:-translate-y-1.5 flex flex-col justify-between min-h-[auto] md:min-h-[280px] cursor-pointer relative overflow-hidden active:scale-[0.98]"
            >
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

              <div className="pt-4 sm:pt-5 border-t border-white/20 flex items-center justify-between relative z-10 mt-4">
                <span className="text-xs sm:text-sm font-black uppercase tracking-wider text-[#e4ebf9] group-hover:text-white transition-colors">
                  {language === 'es' ? 'Hablar con confianza' : 'Confidence speaking'}
                </span>
                <div className="w-8 h-8 rounded-full bg-white/10 border border-white/20 group-hover:bg-[#f15555] group-hover:border-[#f15555] flex items-center justify-center transition-all duration-300 shadow-sm">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </div>
            </button>

          </div>
        </div>

      </div>
    </section>
  );
};


