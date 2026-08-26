'use client';

import React from 'react';
import { Award, CheckCircle, ShieldCheck, Heart, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface AboutNickProps {
  onOpenBooking: () => void;
}

export const AboutNick: React.FC<AboutNickProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();

  return (
    <section id="about" className="py-20 sm:py-28 bg-white border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left: Nick's Portrait & Credentials Badge */}
          <div className="lg:col-span-5 relative flex justify-center">
            <div className="relative w-full max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-[#0d382c]">
              <img
                src="/nick.png"
                alt="Coach Nick"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d22]/90 via-transparent to-transparent" />
              
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="font-black text-lg">Teacher Nick</div>
                <p className="text-xs text-[#66c310] font-bold">
                  {language === 'es' ? 'Especialista en Acento y Fluidez para Hispanohablantes' : 'Accent & Fluency Specialist for Spanish Speakers'}
                </p>
              </div>
            </div>

            {/* Experience Pill */}
            <div className="absolute -bottom-4 bg-white px-5 py-2.5 rounded-full border-2 border-[#66c310] shadow-lg flex items-center gap-2 text-xs font-black text-[#0d382c]">
              <Sparkles className="w-4 h-4 text-[#66c310]" />
              <span>{language === 'es' ? '10+ Años de Experiencia' : '10+ Years Coaching Experience'}</span>
            </div>
          </div>

          {/* Right: Nick's Story & Philosophy */}
          <div className="lg:col-span-7 space-y-6 text-stone-800">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
              <Award className="w-3.5 h-3.5 text-[#66c310]" />
              <span>{language === 'es' ? 'Conoce a tu Entrenador' : 'Meet Your Coach'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight leading-tight">
              {language === 'es' ? (
                <>
                  Fluidez Real. Sin memorizar <br />
                  <span className="text-[#66c310]">tablas de gramática aburridas.</span>
                </>
              ) : (
                <>
                  Real English Fluency. <br />
                  <span className="text-[#66c310]">Without the textbook grammar anxiety.</span>
                </>
              )}
            </h2>

            <div className="space-y-4 text-sm sm:text-base text-stone-600 leading-relaxed">
              <p>
                {language === 'es'
                  ? 'Hola, soy Nick. Durante más de una década he ayudado a miles de hispanohablantes, ingenieros, analistas y profesionales a derribar su barrera al hablar inglés.'
                  : "Hi, I'm Nick. For over a decade, I've coached thousands of Spanish speakers, software engineers, and global executives to break through their English speaking plateau."}
              </p>
              <p>
                {language === 'es'
                  ? 'El problema nunca fue tu inteligencia: es que te enseñaron inglés como una materia académica en lugar de un entrenamiento acústico y motor. Mi método te da la melodía, el ritmo y las frases automáticas para que hables con soltura y sin miedo a equivocarte.'
                  : "The problem was never your intelligence—traditional schools taught you English as an academic memorization subject rather than a physical acoustic skill. My 20-minute daily method builds natural muscle memory and rhythm."}
              </p>
            </div>

            {/* 3 Core Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
              <div className="p-4 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-1">
                <div className="text-sm font-black text-[#0d382c]">
                  {language === 'es' ? '1. Inglés desde 0' : '1. English from 0'}
                </div>
                <p className="text-xs text-stone-500">
                  {language === 'es' ? 'Aprende las bases sin estrés ni confusión' : 'Step-by-step basics with patient support'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-1">
                <div className="text-sm font-black text-[#0d382c]">
                  {language === 'es' ? '2. Inglés Específico' : '2. Specific English'}
                </div>
                <p className="text-xs text-stone-500">
                  {language === 'es' ? 'Restaurantes, trabajo y situaciones reales' : 'Restaurants, work & everyday social life'}
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-1">
                <div className="text-sm font-black text-[#0d382c]">
                  {language === 'es' ? '3. Práctica por WhatsApp' : '3. WhatsApp Practice'}
                </div>
                <p className="text-xs text-stone-500">
                  {language === 'es' ? '5 días a la semana con audios directos' : '5 days a week of personal voice notes'}
                </p>
              </div>
            </div>

            {/* CTA */}
            <div className="pt-2">
              <button
                onClick={onOpenBooking}
                className="px-7 py-3.5 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                <span>{language === 'es' ? 'Agendar Sesión Privada con Nick' : 'Book 1-on-1 Strategy Session with Nick'}</span>
                <ArrowRight className="w-4 h-4 text-[#66c310]" />
              </button>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};
