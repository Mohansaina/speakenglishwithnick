'use client';

import React from 'react';
import { Check, ArrowRight, Sparkles, MessageCircle, Zap } from 'lucide-react';
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
        ? 'Aprende las bases del inglés paso a paso con paciencia absoluta y sin frustraciones.'
        : 'Build your core foundation step-by-step with patient, zero-judgment guidance.',
      duration: language === 'es' ? '1 Clase Semanal + 3-5 Días WhatsApp' : '1 Live Session/Wk + 3-5 Days WhatsApp',
      isPopular: false,
      features: language === 'es'
        ? [
            '1 sesión privada en vivo por semana con Nick',
            '3-5 días de práctica de voz guiada por WhatsApp',
            'Bases sólidas y pronunciación desde el día uno',
          ]
        : [
            '1 private live coaching session per week with Nick',
            '3-5 days of guided daily voice drills on WhatsApp',
            'Solid foundation & pronunciation from day one',
          ],
      ctaText: language === 'es' ? 'Empezar desde Cero' : 'Start English from 0',
    },
    {
      id: 'program-specific',
      levelBadge: language === 'es' ? 'Nivel 2 • Más Popular' : 'Level 2 • Most Popular',
      title: language === 'es' ? 'Inglés Específico' : 'Specific English',
      tagline: language === 'es'
        ? 'Preparación para situaciones reales: trabajo, entrevistas, reuniones, viajes o restaurantes.'
        : 'Targeted preparation for real scenarios: job interviews, meetings, work, and travel.',
      duration: language === 'es' ? '1 Clase Semanal + 3-5 Días WhatsApp' : '1 Live Session/Wk + 3-5 Days WhatsApp',
      isPopular: true,
      features: language === 'es'
        ? [
            'Work: Uber, Doordash, Restaurant, etc.',
            'Business: Painting, Flooring, Cars, etc.',
            'Roleplays y práctica adaptada a tu meta personal',
          ]
        : [
            'Work: Uber, Doordash, Restaurant, etc.',
            'Business: Painting, Flooring, Cars, etc.',
            'Roleplays & practice tailored to your personal goals',
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
      duration: language === 'es' ? '1 Clase Semanal + 3-5 Días WhatsApp' : '1 Live Session/Wk + 3-5 Days WhatsApp',
      isPopular: false,
      features: language === 'es'
        ? [
            '1 sesión privada en vivo de conversación 100% fluida',
            '3-5 días de notas de voz en WhatsApp con feedback',
            'Técnicas de ritmo y reducción de vocales americanas',
          ]
        : [
            '1 private live 100% conversational session with Nick',
            '3-5 days of voice note drills with instant feedback',
            'American cadence & vowel reduction techniques',
          ],
      ctaText: language === 'es' ? 'Unirme a Conversación' : 'Join Conversation Practice',
    },
  ];

  return (
    <section id="programs" className="py-16 sm:py-24 relative bg-[#f8f9f7] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#48529e]" />
            <span>{language === 'es' ? 'PLANES DE APRENDIZAJE 1 A 1' : '1-ON-1 LEARNING PROGRAMS'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Elige tu Camino hacia la{' '}
                <span className="font-serif italic font-normal text-[#48529e]">Fluidez en Inglés</span>
              </>
            ) : (
              <>
                Choose Your Path to{' '}
                <span className="font-serif italic font-normal text-[#48529e]">English Fluency</span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-normal leading-relaxed">
            {language === 'es'
              ? 'Todos los planes incluyen 1 sesión privada semanal con Teacher Nick más 3-5 días de práctica activa por WhatsApp.'
              : 'All programs feature 1 private weekly session with Teacher Nick plus 3-5 days of guided speaking practice on WhatsApp.'}
          </p>
        </div>

        {/* Clean 3-Column Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch max-w-6xl mx-auto">
          {programs.map((program) => {
            return (
              <div
                key={program.id}
                className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all bg-white ${
                  program.isPopular
                    ? 'border-2 border-[#48529e] shadow-[0_20px_50px_rgba(72,82,158,0.15)] lg:-translate-y-1.5'
                    : 'border border-stone-200 shadow-sm hover:border-[#48529e] hover:shadow-md'
                }`}
              >
                <div className="space-y-5">
                  
                  {/* Title */}
                  <div className="space-y-2">
                    <h3 className="text-xl sm:text-2xl font-black text-[#18181b] tracking-tight">
                      {program.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                      {program.tagline}
                    </p>
                  </div>

                  {/* Duration Badge */}
                  <div className="p-3 rounded-2xl bg-[#f8fafe] border border-stone-200/80 text-xs font-bold text-[#48529e]">
                    {program.duration}
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2">
                    {program.features.map((feat, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 font-medium">
                        <Check className="w-4 h-4 text-[#f15555] shrink-0 mt-0.5 stroke-[2.5]" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>

                </div>

                {/* Bottom CTA Button */}
                <div className="pt-6 mt-6 border-t border-stone-100">
                  <button
                    onClick={onOpenBooking}
                    className="w-full py-3.5 rounded-full font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm active:scale-[0.99] bg-[#f15555] hover:bg-[#e04444] text-white hover:scale-[1.02]"
                  >
                    <span>{program.ctaText}</span>
                    <ArrowRight className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
