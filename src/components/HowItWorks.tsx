'use client';

import React from 'react';
import { Calendar, MessageCircle, Sparkles, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface HowItWorksProps {
  onOpenBooking: () => void;
}

export const HowItWorks: React.FC<HowItWorksProps> = () => {
  const { language } = useLanguage();

  const steps = [
    {
      step: '01',
      icon: Calendar,
      title: language === 'es' ? '1 Sesión Privada Semanal' : '1 Live Weekly 1-on-1 Session',
      desc: language === 'es'
        ? 'Practica en vivo con Teacher Nick. Eliminamos tus bloqueos al hablar y corregimos errores de pronunciación en tiempo real.'
        : 'Connect 1-on-1 with Teacher Nick to overcome hesitation, build core structures, and fix pronunciation on the spot.',
      badge: language === 'es' ? 'Presencial u Online' : 'In Person or Online',
    },
    {
      step: '02',
      icon: MessageCircle,
      title: language === 'es' ? '3-5 Días de Práctica por WhatsApp' : '3-5 Days of WhatsApp Voice Drills',
      desc: language === 'es'
        ? 'Envía audios cortos durante la semana y recibe retroalimentación directa de Nick para crear memoria muscular de voz.'
        : 'Send short daily audio notes on WhatsApp and get direct voice feedback from Nick to build natural muscle memory.',
      badge: language === 'es' ? 'Feedback Diario de Voz' : 'Daily Voice Feedback',
    },
    {
      step: '03',
      icon: CheckCircle2,
      title: language === 'es' ? 'Habla con Soltura sin Traducir' : 'Real Speaking Confidence & Flow',
      desc: language === 'es'
        ? 'Deja de traducir en tu cabeza. Gana confianza para responder automáticamente en reuniones, trabajo y vida diaria.'
        : 'Stop translating word-for-word in your head. Respond with natural cadence in work meetings, travel, and daily conversations.',
      badge: language === 'es' ? 'Fluidez Automática' : 'Automatic Cadence',
    },
  ];

  return (
    <section id="how-it-works" className="py-16 sm:py-24 relative bg-[#fcfcfb] border-b border-stone-200/70 overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-[#48529e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#48529e]" />
            <span>{language === 'es' ? 'CÓMO FUNCIONA' : 'HOW IT WORKS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Tu Ruta de 3 Pasos hacia la{' '}
                <span className="font-serif italic font-normal text-[#48529e]">Fluidez en Inglés</span>
              </>
            ) : (
              <>
                Your 3-Step Path to{' '}
                <span className="font-serif italic font-normal text-[#48529e]">Speaking English</span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal max-w-md mx-auto leading-relaxed">
            {language === 'es'
              ? 'Un método sencillo, paciente y guiado para ganar confianza cada semana.'
              : 'A simple, proven routine designed to build real speaking confidence every single week.'}
          </p>
        </div>

        {/* 3 Step Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {steps.map((s, idx) => {
            const Icon = s.icon;
            return (
              <div
                key={idx}
                className="group relative rounded-3xl p-6 sm:p-8 bg-white border border-stone-200/90 shadow-sm hover:border-[#48529e] hover:shadow-lg transition-all duration-300 flex flex-col justify-between"
              >
                <div className="space-y-4">
                  {/* Top Step Pill & Number */}
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-black text-[#48529e] bg-[#e4ebf9] px-3 py-1 rounded-full border border-[#c4d4f7]">
                      {s.badge}
                    </span>
                    <span className="text-2xl font-black text-stone-300 group-hover:text-[#f15555] transition-colors">
                      {s.step}
                    </span>
                  </div>

                  {/* Icon */}
                  <div className="w-12 h-12 rounded-2xl bg-[#48529e] text-white flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                    <Icon className="w-6 h-6 stroke-[2.5]" />
                  </div>

                  {/* Title & Desc */}
                  <div className="space-y-2 pt-1">
                    <h3 className="text-lg sm:text-xl font-black text-stone-900 leading-tight">
                      {s.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* Bottom line */}
                <div className="pt-4 mt-6 border-t border-stone-100 flex items-center justify-between text-xs font-bold text-[#48529e]">
                  <span>{language === 'es' ? 'Paso ' + (idx + 1) : 'Step ' + (idx + 1)}</span>
                  <CheckCircle2 className="w-4 h-4 text-[#f15555] stroke-[2.5]" />
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
