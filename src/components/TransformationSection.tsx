'use client';

import React from 'react';
import { Star, CheckCircle2, MessageSquare, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const TransformationSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].transformation;

  return (
    <section className="py-20 sm:py-28 bg-[#fafafa] border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight leading-tight">
            {t.titlePrefix} <br className="hidden sm:inline" />
            <span className="text-[#66c310] underline decoration-[#66c310]/40 underline-offset-8">
              {t.titleHighlight}
            </span>
          </h2>
        </div>

        {/* 2-Column Balanced Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-stretch max-w-4xl mx-auto">
          
          {/* Card 1: David's Review */}
          <div className="bg-white rounded-3xl p-7 sm:p-8 border-2 border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between hover:border-[#66c310]/60 transition-all">
            <div className="space-y-4">
              
              {/* Quote Mark & Category Tag */}
              <div className="flex items-center justify-between">
                <div className="text-[#66c310] text-5xl font-serif font-black leading-none select-none">
                  “
                </div>
                <span className="px-3 py-1 rounded-full bg-[#f4fbf0] text-[#0d382c] border border-[#c4eeb0] text-xs font-extrabold">
                  {t.country1}
                </span>
              </div>

              {/* Author Info */}
              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-full bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center text-lg border-2 border-[#66c310]/40 shadow-xs">
                  D
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-900 text-lg leading-tight">{t.student1}</h4>
                  <p className="text-xs text-[#237059] font-bold mt-0.5">{t.country1}</p>
                </div>
              </div>

              {/* Quote text */}
              <p className="text-stone-800 text-base sm:text-lg leading-relaxed italic font-serif pt-1">
                &ldquo;{t.quote1}&rdquo;
              </p>
            </div>

            {/* 5/5 Rating */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#66c310]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#66c310] text-[#66c310]" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-500">
                {language === 'es' ? 'Alumno Verificado' : 'Verified Student'}
              </span>
            </div>
          </div>

          {/* Card 2: Slot ready for second student review */}
          <div className="bg-white/80 rounded-3xl p-7 sm:p-8 border-2 border-dashed border-stone-300 space-y-5 flex flex-col justify-between hover:border-[#66c310]/60 transition-all">
            <div className="space-y-4">
              
              <div className="flex items-center justify-between">
                <div className="text-stone-300 text-5xl font-serif font-black leading-none select-none">
                  “
                </div>
                <span className="px-3 py-1 rounded-full bg-stone-100 text-stone-600 border border-stone-200 text-xs font-extrabold">
                  {language === 'es' ? 'Próxima Historia' : 'Student Story #2'}
                </span>
              </div>

              <div className="flex items-center gap-3.5">
                <div className="w-13 h-13 rounded-full bg-stone-100 text-stone-400 font-black flex items-center justify-center text-base border border-stone-200">
                  <MessageSquare className="w-5 h-5 text-stone-400" />
                </div>
                <div>
                  <h4 className="font-extrabold text-stone-800 text-base leading-tight">
                    {language === 'es' ? 'Historia de Alumno' : 'Student Review'}
                  </h4>
                  <p className="text-xs text-stone-400 font-medium">
                    {language === 'es' ? 'Espacio listo para el segundo testimonio' : 'Ready for second testimonial'}
                  </p>
                </div>
              </div>

              <p className="text-stone-500 text-sm sm:text-base leading-relaxed italic font-serif pt-1">
                {language === 'es' 
                  ? 'Comparte cómo las clases y prácticas de Teacher Nick te ayudaron a ganar confianza.'
                  : 'Share how Teacher Nick’s personalized classes helped you speak English with confidence.'}
              </p>
            </div>

            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#66c310]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#66c310] text-[#66c310]" />
                ))}
              </div>
              <span className="text-xs font-bold text-stone-400">
                {language === 'es' ? 'Alumno Verificado' : 'Verified Student'}
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};

