'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface SpanishSpeakersHubProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const SpanishSpeakersHub: React.FC<SpanishSpeakersHubProps> = ({
  onOpenBooking,
  onOpenLeadMagnet,
}) => {
  const { language } = useLanguage();
  const t = translations[language].spanishSection;

  const [activeAudioTrap, setActiveAudioTrap] = useState<string | null>(null);

  const traps = [
    {
      id: 'trap-1',
      title: t.trap1Title,
      desc: t.trap1Desc,
      incorrect: 'espeak, eschool, estudent',
      correct: 'speak, school, student (/s-/)',
      audioPrompt: 'School. Speak. Student. Notice how the sound starts with pure air, not an extra E vowel.',
    },
    {
      id: 'trap-2',
      title: t.trap2Title,
      desc: t.trap2Desc,
      incorrect: 'vote sounds like boat',
      correct: 'vote (teeth on lower lip) vs boat (both lips)',
      audioPrompt: 'Vote. Boat. For vote, place your upper teeth on your lower lip and vibrate your vocal cords.',
    },
    {
      id: 'trap-3',
      title: t.trap3Title,
      desc: t.trap3Desc,
      incorrect: 'Pronouncing every single syllable with equal volume',
      correct: 'Stress the core words, reduce the rest with the Schwa /ə/',
      audioPrompt: 'I want to go to the store. In natural speech, to the reduces to t-thuh.',
    },
    {
      id: 'trap-4',
      title: t.trap4Title,
      desc: t.trap4Desc,
      incorrect: 'Translating word-by-word with 4-second hesitation pauses',
      correct: 'Instant rescue templates like "Let me put it this way..."',
      audioPrompt: 'Let me put it this way: our main goal is to make things easier for everyone.',
    },
  ];

  const handlePlayAudio = (id: string, text: string) => {
    setActiveAudioTrap(id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = 0.95;
      
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en-US'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => setActiveAudioTrap(null);
      utterance.onerror = () => setActiveAudioTrap(null);
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="spanish-hub" className="py-20 sm:py-28 bg-[#0d382c] text-white relative overflow-hidden">
      
      {/* Background Accent Wave */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#66c310]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#164c3c] border border-[#277a62] text-[#66c310] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            {t.badge}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-white leading-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-200 leading-relaxed max-w-2xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* 4 Sound Traps Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {traps.map((trap) => (
            <div
              key={trap.id}
              className="rounded-3xl bg-[#09241c] border border-[#1e614d] p-6 sm:p-7 space-y-4 shadow-xl flex flex-col justify-between hover:border-[#66c310]/60 transition-colors"
            >
              <div className="space-y-3">
                <h3 className="text-lg sm:text-xl font-extrabold text-[#66c310] flex items-center gap-2">
                  <span>{trap.title}</span>
                </h3>

                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {trap.desc}
                </p>

                {/* Incorrect vs Correct Breakdown */}
                <div className="pt-2 space-y-2">
                  <div className="p-3 rounded-xl bg-[#1c1316] border border-rose-900/50 text-rose-300 text-xs flex items-center gap-2">
                    <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                    <span><strong>Habit to drop:</strong> {trap.incorrect}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-[#0e3323] border border-[#277a62] text-[#b9f58c] text-xs flex items-center gap-2 font-semibold">
                    <CheckCircle2 className="w-4 h-4 text-[#66c310] shrink-0" />
                    <span><strong>Natural English:</strong> {trap.correct}</span>
                  </div>
                </div>
              </div>

              {/* Audio Listen Button */}
              <div className="pt-4 border-t border-[#164c3c] flex items-center justify-between">
                <button
                  onClick={() => handlePlayAudio(trap.id, trap.audioPrompt)}
                  className="px-4 py-2.5 rounded-full bg-[#164c3c] hover:bg-[#20634f] text-white text-xs font-bold flex items-center gap-2 transition-colors cursor-pointer border border-[#277a62]"
                >
                  <Volume2 className="w-3.5 h-3.5 text-[#66c310]" />
                  <span>{activeAudioTrap === trap.id ? 'Playing Acoustic Audio...' : 'Listen to Native Comparison'}</span>
                </button>
                <span className="text-[10px] text-stone-400 font-mono">Accent Audio</span>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#103e30] border-2 border-[#66c310]/50 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl">
          <div className="space-y-1">
            <h3 className="text-xl sm:text-2xl font-black text-white">
              {language === 'es' ? '¿Quieres corregir tu acento y hablar con fluidez?' : 'Want to eliminate your speaking barriers with Nick?'}
            </h3>
            <p className="text-xs sm:text-sm text-stone-300 max-w-xl">
              {language === 'es'
                ? 'Agenda una sesión diagnóstica privada 1 a 1 para evaluar tu pronunciación y crear tu plan de acento.'
                : 'Book a 1-on-1 diagnostic speaking session to analyze your accent and get a personalized training plan.'}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="px-7 py-3.5 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>{language === 'es' ? 'Agendar Sesión 1 a 1' : 'Book 1-on-1 Session'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};
