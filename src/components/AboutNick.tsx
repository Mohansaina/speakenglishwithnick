'use client';

import React from 'react';
import { Award, CheckCircle2, ShieldCheck, ArrowRight, Globe, MessageSquare } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AboutNickProps {
  onOpenBooking: () => void;
}

export const AboutNick: React.FC<AboutNickProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-[#fdfdfc] border-b border-stone-200/70 overflow-hidden relative">
      
      {/* Ambient background glow */}
      <div className="absolute top-1/2 -left-20 w-96 h-96 bg-[#48529e]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Teacher Nick Profile Card */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="w-full max-w-[380px] rounded-3xl bg-white border border-stone-200/90 p-5 shadow-[0_12px_40px_rgba(0,0,0,0.06)] space-y-4 relative group">
              
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-[#48529e] border border-stone-200 shadow-inner">
                <img
                  src="/nick.png"
                  alt="Teacher Nick"
                  className="w-full h-full object-cover object-top filter contrast-[1.02] group-hover:scale-103 transition-transform duration-700"
                />
                
                {/* Floating pill badge */}
                <div className="absolute top-3 left-3 bg-[#48529e]/90 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1.5 shadow-sm">
                  <Globe className="w-3.5 h-3.5 text-[#f15555]" />
                  <span>5 Fluent Languages</span>
                </div>
              </div>

              <div className="space-y-1.5 text-center sm:text-left pt-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-black text-xl sm:text-2xl text-stone-900 leading-tight">
                    Teacher Nick
                  </h3>
                  <span className="text-[11px] font-bold text-[#48529e] bg-[#e4ebf9] px-2.5 py-0.5 rounded-full border border-[#c4d4f7]">
                    Accent & Fluency Coach
                  </span>
                </div>
                <p className="text-xs sm:text-sm text-stone-600 font-medium">
                  {language === 'es' ? 'Profesor nativo de EE.UU., paciente y especializado en hispanohablantes.' : 'Native American accent coach from the USA for global professionals.'}
                </p>
              </div>

            </div>
          </div>

          {/* Right: Nick's Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-stone-800">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#48529e]" />
              <span>{language === 'es' ? 'Conoce a tu Profesor' : 'Meet Your Teacher'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-stone-900 tracking-tight leading-tight">
              {language === 'es' ? (
                <>
                  Fluidez Real. Sin memorizar <br />
                  <span className="font-serif italic font-normal text-[#48529e]">tablas de gramática aburridas.</span>
                </>
              ) : (
                <>
                  Real English Fluency. <br />
                  <span className="font-serif italic font-normal text-[#48529e]">Without the textbook grammar anxiety.</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed font-normal">
              <p>
                {language === 'es'
                  ? 'Hola, soy Nick, profesor nativo de inglés de Estados Unidos (EE.UU.). He aprendido a hablar 5 idiomas con fluidez y entiendo exactamente qué se siente estar del otro lado y temer equivocarte al hablar.'
                  : "Hi, I'm Nick, a native American English coach from the USA. I have personally learned to speak 5 languages fluently and I know firsthand the vulnerability of speaking in a foreign tongue."}
              </p>
              <p>
                {language === 'es'
                  ? 'El obstáculo nunca fue tu capacidad: es que las escuelas tradicionales enseñan inglés como un ejercicio de memoria escrita en lugar de una habilidad acústica y motora. Mi método te da la melodía, el ritmo y las estructuras automáticas para hablar con soltura.'
                  : "The hurdle was never your capability—traditional methods teach English as a grammar memorization test rather than an intuitive acoustic skill. My method trains rhythm, stress timing, and subconscious response."}
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5 pt-2">
              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-1 shadow-2xs hover:border-[#48529e] transition-colors">
                <div className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
                  <span>{language === 'es' ? '1. Inglés desde 0' : '1. English from 0'}</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'es' ? 'Aprende las bases con paciencia y guía' : 'Step-by-step basics with patient support'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-white border border-stone-200/90 space-y-1 shadow-2xs hover:border-[#48529e] transition-colors">
                <div className="text-xs font-black text-stone-900 uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
                  <span>{language === 'es' ? '2. Inglés Específico' : '2. Specific English'}</span>
                </div>
                <p className="text-xs text-stone-500 font-medium">
                  {language === 'es' ? 'Restaurantes, trabajo y situaciones reales' : 'Work, social meetings & real situations'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#e4ebf9] border border-[#c4d4f7] space-y-1 shadow-2xs">
                <div className="text-xs font-black text-[#48529e] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48529e]" />
                  <span>{language === 'es' ? '3. Práctica WhatsApp' : '3. WhatsApp Voice'}</span>
                </div>
                <p className="text-xs text-[#373f7a] font-bold">
                  {language === 'es' ? '3-5 días por semana de feedback de voz' : '3-5 days a week of direct voice guidance'}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-8 py-4 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-bold text-xs sm:text-sm shadow-md flex items-center gap-2.5 transition-all hover:scale-[1.02] cursor-pointer"
              >
                <span>{language === 'es' ? 'Agendar Sesión Privada con Nick' : 'Book 1-on-1 Strategy Session with Nick'}</span>
                <ArrowRight className="w-4 h-4 text-white" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

