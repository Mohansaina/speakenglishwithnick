'use client';

import React from 'react';
import { Sparkles, ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SpanishSpeakersHubProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet?: () => void;
}

export const SpanishSpeakersHub: React.FC<SpanishSpeakersHubProps> = ({
  onOpenBooking,
}) => {
  const { language } = useLanguage();

  const points = [
    {
      number: '01',
      title: language === 'es' ? 'Eliminar la "E" Inicial' : 'Eliminating the Initial "E" Sound',
      desc: language === 'es' 
        ? 'Aprende a arrancar palabras como "speak" o "school" con aire limpio sin agregar una "e" antes ("espeak").' 
        : 'Learn to start words like "speak" or "school" with clean airflow without adding an extra "e" at the beginning.',
      badge: 'espeak ➔ speak',
    },
    {
      number: '02',
      title: language === 'es' ? 'Diferencia Clara de "V" vs "B"' : 'Clear "V" vs "B" Distinction',
      desc: language === 'es' 
        ? 'Domina la posición exacta de labios y dientes para diferenciar palabras clave como "vote" y "boat".' 
        : 'Master exact lip-and-teeth mechanics so key words like "vote" and "boat" are easily understood.',
      badge: 'vote vs boat',
    },
    {
      number: '03',
      title: language === 'es' ? 'Ritmo y Conexión de Palabras' : 'Natural Rhythm & Connected Speech',
      desc: language === 'es' 
        ? 'Deja de pronunciar palabra por palabra. Aprende a conectar frases con entonación natural y sin sonar robótico.' 
        : 'Stop pronouncing every single word separately. Learn native word connections and speech rhythm.',
      badge: 'I want to go ➔ I wanna go',
    },
    {
      number: '04',
      title: language === 'es' ? 'Habla Sin Traducir Mentalmente' : 'Speaking Without Mental Translation',
      desc: language === 'es' 
        ? 'Supera la ansiedad en reuniones de trabajo o llamadas usando estructuras automáticas de conversación.' 
        : 'Overcome anxiety in work meetings or calls using automatic conversational patterns that buy thinking time.',
      badge: language === 'es' ? 'Fluidez Automática' : 'Automatic Fluency',
    },
  ];

  return (
    <section id="spanish-hub" className="py-16 sm:py-24 bg-[#f8f9f7] border-b border-stone-200/80 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[600px] h-[350px] bg-[#48529e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#48529e]" />
            <span>{language === 'es' ? 'Especial Para Hispanohablantes' : 'Tailored For Spanish Speakers'}</span>
          </div>

          <h2 className="text-2xl sm:text-4xl font-black text-[#18181b] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Por qué los hispanohablantes se bloquean al hablar <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#48529e]">
                  (Y cómo solucionarlo con Teacher Nick)
                </span>
              </>
            ) : (
              <>
                Why Spanish Speakers Get Stuck in English <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#48529e]">
                  (And How to Fix It With Teacher Nick)
                </span>
              </>
            )}
          </h2>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            {language === 'es'
              ? 'Con Teacher Nick aprendes la pronunciación real y el ritmo del inglés para hablar con fluidez y total confianza sin traducir mentalmente.'
              : 'Teacher Nick teaches you real American pronunciation and speech flow so you can speak naturally without pausing to translate.'}
          </p>
        </div>

        {/* Clean 4-Point Solution Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {points.map((pt) => (
            <div
              key={pt.number}
              className="bg-white rounded-2xl p-5 sm:p-7 border border-stone-200/90 shadow-2xs hover:shadow-md hover:border-[#48529e]/50 transition-all duration-200 flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="w-7 h-7 rounded-full bg-[#48529e] text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {pt.number}
                  </span>
                  <span className="px-2.5 py-0.5 rounded-md bg-[#e4ebf9] text-[#48529e] font-mono text-[11px] font-bold">
                    {pt.badge}
                  </span>
                </div>

                <h3 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                  {pt.title}
                </h3>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {pt.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-stone-100 flex items-center gap-1.5 text-xs text-[#48529e] font-bold">
                <CheckCircle2 className="w-3.5 h-3.5 text-[#48529e]" />
                <span>{language === 'es' ? 'Entrenamiento guiado con Nick' : 'Guided practice with Nick'}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-9 rounded-3xl bg-[#48529e] text-white border border-[#373f7a] shadow-xl flex flex-col md:flex-row items-center justify-between gap-5 text-center md:text-left relative overflow-hidden">
          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-[#d4dcff] text-xs font-black uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Diagnóstico Personalizado' : 'Personalized Diagnostic'}</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
              {language === 'es'
                ? '¿Quieres identificar tus bloqueos de acento con Teacher Nick?'
                : 'Want to identify your specific speaking bottlenecks with Teacher Nick?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#d4dcff] max-w-xl">
              {language === 'es'
                ? 'En una sesión 1 a 1 evaluamos tu pronunciación exacta, velocidad y confianza, creando tu plan de práctica de 3-5 días por WhatsApp.'
                : 'In a private 1-on-1 session, we diagnose your exact pronunciation patterns and design your 3-5 day WhatsApp practice routine.'}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-7 py-4 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-lg transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2 cursor-pointer relative z-10 active:scale-95"
          >
            <span>{language === 'es' ? 'Agendar Sesión 1 a 1 con Nick' : 'Book 1-on-1 Session with Nick'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
