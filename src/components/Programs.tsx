'use client';

import React from 'react';
import { Check, ArrowRight, Sparkles, MessageCircle, Calendar, ShieldCheck, Zap } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface ProgramsProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();

  const programs = [
    {
      id: 'program-0',
      levelBadge: language === 'es' ? 'Nivel 1 • Principiante' : 'Level 1 • Beginner',
      title: language === 'es' ? 'Inglés desde 0' : 'Start English from 0',
      tagline: language === 'es'
        ? 'Aprende las bases del idioma paso a paso con paciencia absoluta y sin frustraciones.'
        : 'Build your core foundation step-by-step with patient, zero-judgment guidance.',
      duration: language === 'es' ? '1 Clase Semanal + 5 Días WhatsApp' : '1 Live Session/Wk + 5 Days WhatsApp',
      isPopular: false,
      features: language === 'es'
        ? [
            '1 sesión privada en vivo por semana con Teacher Nick',
            '5 días de práctica guiada por audios en WhatsApp',
            'Estructuras de oraciones simples y vocabulario básico',
            'Corrección paciente de pronunciación desde el primer día',
            'Sin libros de gramática aburridos ni exámenes',
          ]
        : [
            '1 private live coaching session per week with Nick',
            '5 days of guided daily voice drills on WhatsApp',
            'Essential sentence structures & fundamental vocabulary',
            'Patient pronunciation corrections from day one',
            'No boring grammar memorization or pressure tests',
          ],
      ctaText: language === 'es' ? 'Empezar desde Cero' : 'Start English from 0',
    },
    {
      id: 'program-specific',
      levelBadge: language === 'es' ? 'Nivel 2 • Específico (Más Popular)' : 'Level 2 • Specific (Most Popular)',
      title: language === 'es' ? 'Inglés Específico' : 'Specific English',
      tagline: language === 'es'
        ? 'Preparación para situaciones reales: trabajo, entrevistas, reuniones, viajes o restaurantes.'
        : 'Targeted preparation for real scenarios: job interviews, meetings, work, and travel.',
      duration: language === 'es' ? '1 Clase Semanal + 5 Días WhatsApp' : '1 Live Session/Wk + 5 Days WhatsApp',
      isPopular: true,
      features: language === 'es'
        ? [
            '1 sesión privada en vivo enfocada en tu objetivo exacto',
            'Roleplays reales para tus reuniones o entrevistas de trabajo',
            '5 días de audios en WhatsApp con situaciones de tu día a día',
            'Plantillas de rescate para hablar con fluidez bajo presión',
            'Vocabulario adaptado a tu profesión o necesidades de viaje',
          ]
        : [
            '1 private live coaching session tailored to your exact goal',
            'Realistic roleplays for your job interviews & meetings',
            '5 days of WhatsApp audio tasks matching your routine',
            'Conversational rescue templates for high-stakes speaking',
            'Custom vocabulary for your profession and travel needs',
          ],
      ctaText: language === 'es' ? 'Elegir Inglés Específico' : 'Start Specific English',
    },
    {
      id: 'program-conversation',
      levelBadge: language === 'es' ? 'Nivel 3 • Conversación' : 'Level 3 • Conversation',
      title: language === 'es' ? 'Práctica de Conversación' : 'English Conversation Practice',
      tagline: language === 'es'
        ? 'Gana soltura natural, elimina la traducción mental y domina el ritmo del acento americano.'
        : 'Master effortless flow, stop mental translating, and speak with American cadence.',
      duration: language === 'es' ? '1 Clase Semanal + 5 Días WhatsApp' : '1 Live Session/Wk + 5 Days WhatsApp',
      isPopular: false,
      features: language === 'es'
        ? [
            '1 sesión privada en vivo de conversación 100% fluida',
            'Técnicas de ritmo y reducción de vocales (el sonido Schwa)',
            '5 días de notas de voz en WhatsApp con feedback inmediato',
            'Herramientas psicológicas para perder el miedo a equivocarte',
            'Feedback detallado en pronunciación y entonación',
          ]
        : [
            '1 private live 100% conversational session with Nick',
            'American stress-timing & vowel reduction mechanics',
            '5 days of spontaneous voice note drills on WhatsApp',
            'Psychological tools to eliminate speaking hesitation',
            'Deep acoustic polish and native phrasing habits',
          ],
      ctaText: language === 'es' ? 'Unirme a Conversación' : 'Join Conversation Practice',
    },
  ];

  return (
    <section id="programs" className="py-20 sm:py-28 relative bg-[#f8f9f7] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edfbe6] border border-[#b2e896] text-[#07221a] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#62c110]" />
            <span>{language === 'es' ? 'PLANES DE APRENDIZAJE 1 A 1' : '1-ON-1 COACHING PROGRAMS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07221a] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Elige tu Camino hacia la <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#164c3c]">Fluidez en Inglés</span>
              </>
            ) : (
              <>
                Choose Your Path to <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#164c3c]">English Fluency</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
            {language === 'es'
              ? 'Todos los planes incluyen 1 sesión privada semanal con Teacher Nick más 5 días de práctica activa por WhatsApp.'
              : 'All programs feature 1 private weekly session with Teacher Nick plus 5 days of guided speaking practice on WhatsApp.'}
          </p>
        </div>

        {/* Clean 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          {programs.map((program) => {
            return (
              <div
                key={program.id}
                className={`relative rounded-3xl p-6 sm:p-9 flex flex-col justify-between transition-all bg-white ${
                  program.isPopular
                    ? 'border-2 border-[#07221a] shadow-[0_20px_50px_rgba(7,34,26,0.12)] lg:-translate-y-2'
                    : 'border border-stone-200 shadow-sm hover:border-[#62c110] hover:shadow-md'
                }`}
              >
                {/* Popular Pill */}
                {program.isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-black tracking-wider uppercase bg-[#07221a] text-[#82e635] shadow-md flex items-center gap-1.5 whitespace-nowrap">
                    <Zap className="w-3 h-3 text-[#62c110] fill-[#62c110]" />
                    <span>{language === 'es' ? 'Opción Recomendada' : 'Most Popular'}</span>
                  </div>
                )}

                <div className="space-y-5 sm:space-y-6">
                  
                  {/* Top Badge & Title */}
                  <div className="space-y-2">
                    <span className="inline-block text-[10px] sm:text-[11px] font-black uppercase tracking-wider px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#f2f4f0] text-stone-700">
                      {program.levelBadge}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-black text-[#07221a] tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed font-normal">
                      {program.tagline}
                    </p>
                  </div>

                  {/* Format Pill Banner */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#edfbe6]/70 border border-[#b2e896] flex items-center gap-2.5 text-xs font-bold text-[#07221a]">
                    <MessageCircle className="w-4 h-4 text-[#62c110] shrink-0" />
                    <span>{program.duration}</span>
                  </div>

                  {/* Included Features List */}
                  <div className="space-y-2.5 sm:space-y-3 pt-1 sm:pt-2">
                    <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider block">
                      {language === 'es' ? 'Lo que incluye este programa:' : 'What is included:'}
                    </span>
                    <ul className="space-y-2 sm:space-y-2.5">
                      {program.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs sm:text-sm text-stone-700 font-normal">
                          <Check className="w-4 h-4 text-[#62c110] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 sm:pt-8 mt-auto">
                  <button
                    onClick={onOpenBooking}
                    className={`w-full py-4 rounded-full font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] ${
                      program.isPopular
                        ? 'bg-[#62c110] hover:bg-[#82e635] text-[#07221a] hover:scale-[1.02] shadow-md'
                        : 'bg-[#07221a] hover:bg-[#164c3c] text-white hover:scale-[1.02]'
                    }`}
                  >
                    <span>{program.ctaText}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* Reassurance Footer Pill */}
        <div className="mt-12 text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-5 py-2.5 rounded-full bg-white border border-stone-200 text-xs text-stone-600 font-medium shadow-2xs">
            <ShieldCheck className="w-4 h-4 text-[#62c110]" />
            <span>{language === 'es' ? 'Clases individuales personalizadas • Reserva flexible • Sin contratos forzados' : '1-on-1 personalized coaching • Flexible scheduling • No locked-in contracts'}</span>
          </div>
        </div>

      </div>
    </section>
  );
};

