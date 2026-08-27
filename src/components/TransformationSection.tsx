'use client';

import React from 'react';
import { Star, CheckCircle2, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const TransformationSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].transformation;

  return (
    <section className="py-20 sm:py-28 bg-[#f8f9f7] border-b border-stone-200/70 overflow-hidden relative">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] bg-[#62c110]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edfbe6] border border-[#b2e896] text-[#07221a] text-xs font-black uppercase tracking-wider shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#62c110]" />
            <span>{language === 'es' ? 'Historias Reales de Alumnos' : 'Real Student Stories'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07221a] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Imagina finalmente hablar inglés <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#164c3c]">
                  con total soltura y confianza
                </span>
              </>
            ) : (
              <>
                Imagine finally speaking English <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#164c3c]">
                  with effortless confidence
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto leading-relaxed font-normal">
            {language === 'es'
              ? 'Historias reales de profesionales y estudiantes que eliminaron la ansiedad de traducir y encontraron su voz.'
              : 'Real breakthrough stories from professionals who eliminated translation anxiety and found their voice.'}
          </p>
        </div>

        {/* Featured Breakthrough Spotlight: David's Review Only */}
        <div className="max-w-3xl mx-auto">
          
          <div className="bg-white rounded-3xl p-5 sm:p-8 md:p-10 border border-stone-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.04)] space-y-5 sm:space-y-6 hover:border-[#62c110]/60 transition-all group relative overflow-hidden">
            
            {/* Top decorative gradient line */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#62c110] to-[#07221a]" />

            <div className="space-y-5 sm:space-y-6">
              
              {/* Header inside card */}
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 sm:w-13 sm:h-13 rounded-2xl bg-[#07221a] text-[#82e635] font-black flex items-center justify-center text-lg sm:text-xl border border-[#164c3c] shadow-xs shrink-0">
                    D
                  </div>
                  <div>
                    <h4 className="font-black text-stone-900 text-base sm:text-xl leading-tight">{t.student1}</h4>
                    <span className="inline-block text-[11px] sm:text-xs font-bold text-[#164c3c] bg-[#edfbe6] px-2 sm:px-2.5 py-0.5 rounded-md border border-[#c4eeb0] mt-0.5">
                      {t.country1}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 sm:gap-1 text-[#f59e0b] shrink-0">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#f59e0b]" />
                  ))}
                </div>
              </div>

              {/* Quote text */}
              <blockquote className="text-stone-800 text-sm sm:text-lg md:text-xl leading-relaxed italic font-serif pt-1 border-l-3 border-[#62c110] pl-4 sm:pl-5">
                &ldquo;{language === 'es' ? t.quote1 : (t.quote1En || t.quote1)}&rdquo;
              </blockquote>

              {/* Before vs After Milestone Chip */}
              <div className="p-4 sm:p-5 rounded-2xl bg-[#f8faf7] border border-stone-200/80 space-y-2.5 sm:space-y-3 text-xs sm:text-sm">
                <div className="text-stone-600 flex items-start gap-2.5">
                  <span className="font-bold text-stone-800 uppercase text-[10px] sm:text-xs tracking-wider bg-stone-200 px-2 py-0.5 rounded shrink-0">
                    {language === 'es' ? 'Antes' : 'Before'}
                  </span>
                  <span className="leading-snug">{language === 'es' ? 'Vergüenza al ordenar en restaurantes y sonreír por no entender preguntas básicas.' : 'Freezing at basic restaurant orders and smiling to hide confusion.'}</span>
                </div>
                <div className="text-[#07221a] font-semibold flex items-start gap-2.5 pt-2 border-t border-stone-200/60">
                  <span className="font-black text-[#07221a] uppercase text-[10px] sm:text-xs tracking-wider bg-[#d2edd6] px-2 py-0.5 rounded flex items-center gap-1 shrink-0">
                    <CheckCircle2 className="w-3.5 h-3.5 text-[#164c3c]" />
                    {language === 'es' ? 'Ahora' : 'Now'}
                  </span>
                  <span className="leading-snug">{language === 'es' ? 'Seguridad total al responder, interactuar y mantener conversaciones fluidas.' : 'Total confidence answering naturally and sustaining conversations.'}</span>
                </div>
              </div>

            </div>

            {/* Bottom Verification Footer */}
            <div className="pt-3 sm:pt-4 border-t border-stone-100 flex items-center justify-between text-xs sm:text-sm">
              <span className="font-bold text-[#164c3c] flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-[#62c110]" />
                <span>{language === 'es' ? 'Alumno 1 a 1 Verificado' : 'Verified 1-on-1 Student'}</span>
              </span>
              <span className="text-stone-500 font-medium text-[11px] sm:text-xs">WhatsApp Guided Practice</span>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};


