'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { BookOpen, ArrowRight, CheckCircle2, Download, Check } from 'lucide-react';

interface FreeGuideBannerProps {
  onOpenLeadMagnet: () => void;
}

export const FreeGuideBanner: React.FC<FreeGuideBannerProps> = ({ onOpenLeadMagnet }) => {
  const { language } = useLanguage();

  return (
    <section className="relative py-20 sm:py-24 overflow-hidden border-b border-[#373f7a] bg-[#48529e] text-white">
      
      {/* Subtle atmospheric glow */}
      <div className="absolute top-0 right-1/3 w-[500px] h-[500px] bg-white/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.15)_1px,transparent_1px)] [background-size:24px_24px] opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Copy & Action */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/20 border border-white/30 text-[#d4dcff] text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
              <span>{language === 'es' ? 'Guía Exclusiva Descargable' : 'Free Downloadable Guide'}</span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
              {language === 'es' ? (
                <>
                  Descarga la Guía de <br />
                  <span className="font-serif italic font-normal text-[#d4dcff]">Fluidez y Acento Americano</span>
                </>
              ) : (
                <>
                  Get Your Free Accent & <br />
                  <span className="font-serif italic font-normal text-[#d4dcff]">Fluency Blueprint (PDF)</span>
                </>
              )}
            </h2>

            <p className="text-base sm:text-lg text-white/90 leading-relaxed max-w-xl font-normal">
              {language === 'es'
                ? '“Los 5 Pasos para Convertirte en un Hablante Seguro de Inglés” te dará las herramientas fonéticas y plantillas de rescate para hablar sin vergüenza ni bloqueos.'
                : '“5 Steps to becoming a confident English Speaker” will give you the practical acoustic drills and conversational templates to speak without anxiety.'}
            </p>

            <div className="space-y-2.5 max-w-lg text-xs sm:text-sm text-white/90 text-left mx-auto lg:mx-0">
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f15555] shrink-0" />
                <span>{language === 'es' ? 'Los 5 sonidos de vocales americanas que confunden a hispanohablantes' : 'The 5 American vowel nuances that transform your accent'}</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Check className="w-4 h-4 text-[#f15555] shrink-0" />
                <span>{language === 'es' ? 'Plantillas de rescate verbal para ganar tiempo sin decir "ehhh..."' : 'Verbal rescue bridges to buy thinking time smoothly in meetings'}</span>
              </div>
            </div>

            <div className="pt-2">
              <button
                onClick={onOpenLeadMagnet}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-sm sm:text-base shadow-xl transition-all hover:scale-105 cursor-pointer inline-flex items-center justify-center gap-2"
              >
                <Download className="w-4 h-4 text-white stroke-[2.5]" />
                <span>{language === 'es' ? 'DESCARGAR GUÍA GRATIS (PDF)' : 'DOWNLOAD FREE PDF GUIDE'}</span>
                <ArrowRight className="w-4 h-4 text-white stroke-[2.5]" />
              </button>
            </div>

          </div>

          {/* Right: 3D Guide Mockup */}
          <div className="lg:col-span-5 flex justify-center">
            <div
              onClick={onOpenLeadMagnet}
              className="relative w-full max-w-[280px] sm:max-w-[320px] aspect-[1/1.38] rounded-3xl bg-[#373f7a] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.4)] border-2 border-white/20 transition-all hover:scale-105 cursor-pointer flex flex-col justify-between group"
            >
              {/* Top Title */}
              <div className="space-y-2 text-center pt-2">
                <div className="text-[10px] font-black uppercase tracking-widest text-white bg-[#f15555] py-1 px-3 rounded-full inline-block">
                  {language === 'es' ? 'Guía Digital' : 'Official Guide'}
                </div>
                <h3 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight font-serif pt-1">
                  5 Steps To Becoming A Confident English Speaker
                </h3>
              </div>

              {/* Middle Badge */}
              <div className="p-3 bg-white/10 rounded-2xl border border-white/20 text-center shadow-xs">
                <p className="text-xs font-bold text-[#d4dcff]">
                  {language === 'es' ? 'Por Teacher Nick • 5 Idiomas' : 'By Teacher Nick • 5 Languages'}
                </p>
              </div>

              {/* Bottom Avatar Tag */}
              <div className="flex items-center gap-3 p-2 bg-white/10 rounded-2xl border border-white/20">
                <div className="w-10 h-10 rounded-xl overflow-hidden bg-white shrink-0 border border-white/40">
                  <img src="/nick.png" alt="Teacher Nick" className="w-full h-full object-cover" />
                </div>
                <div className="text-left">
                  <div className="text-xs font-black leading-tight text-white">Speak English</div>
                  <div className="text-[10px] font-bold text-[#d4dcff]">with Nick</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

