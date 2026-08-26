'use client';

import React, { useState } from 'react';
import { Sparkles, Volume2, CheckCircle2, AlertTriangle, ArrowRight, ShieldCheck, Mic, MicOff, Check, Pause, Activity, Flame, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import confetti from 'canvas-confetti';

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
  const [playingVariant, setPlayingVariant] = useState<'bad' | 'good' | null>(null);
  const [recordingTrapId, setRecordingTrapId] = useState<string | null>(null);
  const [recordedFeedbackId, setRecordedFeedbackId] = useState<string | null>(null);

  const traps = [
    {
      id: 'trap-1',
      title: t.trap1Title,
      desc: t.trap1Desc,
      incorrect: 'espeak, eschool, estudent',
      correct: 'speak, school, student (/s-/)',
      audioPromptBad: 'E-speak. E-school. E-student.',
      audioPromptGood: 'Speak. School. Student.',
      tip: language === 'es' ? 'Pon tus labios en posición de S y deja salir el aire antes de activar las cuerdas vocales.' : 'Start with gentle airflow before vocal chord engagement.'
    },
    {
      id: 'trap-2',
      title: t.trap2Title,
      desc: t.trap2Desc,
      incorrect: 'vote sounds like boat (both lips touch)',
      correct: 'vote (upper teeth on lower lip) vs boat (both lips)',
      audioPromptBad: 'Boat. Boat.',
      audioPromptGood: 'Vote. Boat. Feel the vibration on your lower lip.',
      tip: language === 'es' ? 'Para la V en inglés, muerde ligeramente el labio inferior con los dientes superiores.' : 'Upper teeth lightly touch the lower lip with continuous vocal vibration.'
    },
    {
      id: 'trap-3',
      title: t.trap3Title,
      desc: t.trap3Desc,
      incorrect: 'Pronouncing every single syllable with equal volume',
      correct: 'Stress the core words, reduce the rest with the Schwa /ə/',
      audioPromptBad: 'I want to go to the store.',
      audioPromptGood: 'I wanna go to the store.',
      tip: language === 'es' ? 'En inglés las palabras pequeñas (to, the, of, for) se reducen al sonido Schwa /ə/.' : 'Small functional words reduce to the ultra-short Schwa sound.'
    },
    {
      id: 'trap-4',
      title: t.trap4Title,
      desc: t.trap4Desc,
      incorrect: 'Translating word-by-word with 4-second hesitation pauses',
      correct: 'Instant rescue templates like "Let me put it this way..."',
      audioPromptBad: 'I think... um... the goal is... uh...',
      audioPromptGood: 'Let me put it this way: our main goal is clarity.',
      tip: language === 'es' ? 'Usa estructuras automáticas para ganar tiempo mientras tu cerebro procesa la idea.' : 'Automatic conversational templates buy you 3-5 seconds of seamless thinking time.'
    },
  ];

  const handlePlayComparison = (trapId: string, variant: 'bad' | 'good', text: string) => {
    if (activeAudioTrap === trapId && playingVariant === variant) {
      window.speechSynthesis?.cancel();
      setActiveAudioTrap(null);
      setPlayingVariant(null);
      return;
    }

    setActiveAudioTrap(trapId);
    setPlayingVariant(variant);

    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = variant === 'bad' ? 0.85 : 1.0;
      utterance.pitch = variant === 'bad' ? 0.9 : 1.05;
      
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => {
        setActiveAudioTrap(null);
        setPlayingVariant(null);
      };
      utterance.onerror = () => {
        setActiveAudioTrap(null);
        setPlayingVariant(null);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleRecordTrap = (id: string) => {
    if (recordingTrapId === id) {
      setRecordingTrapId(null);
      setRecordedFeedbackId(id);
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      setRecordingTrapId(id);
      setRecordedFeedbackId(null);
      setTimeout(() => {
        setRecordingTrapId(null);
        setRecordedFeedbackId(id);
        try {
          confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
      }, 2800);
    }
  };

  return (
    <section id="spanish-hub" className="py-20 sm:py-28 bg-[#0d382c] text-white relative overflow-hidden">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#66c310]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#164c3c]/60 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#164c3c] border border-[#277a62] text-[#66c310] text-xs font-black uppercase tracking-wider shadow-2xs">
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

        {/* Visual Rhythm Comparison Banner (Spanish flat syllable vs English musical stress waves) */}
        <div className="mb-10 p-5 sm:p-6 rounded-3xl bg-[#09241c] border-2 border-[#1e614d] shadow-xl">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            
            {/* Spanish side */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                  {language === 'es' ? 'Ritmo del Español: Silábico y Constante' : 'Spanish Rhythm: Syllable-Timed'}
                </h4>
              </div>
              <p className="text-xs text-stone-300">
                {language === 'es' ? 'Cada sílaba recibe casi el mismo tiempo y peso (Ta-Ta-Ta-Ta).' : 'Every syllable has equal duration and volume (Ta-Ta-Ta-Ta).'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 h-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <span key={i} className="w-6 h-2 bg-amber-400/80 rounded-full" />
                ))}
              </div>
            </div>

            {/* Middle Divider */}
            <div className="hidden md:flex flex-col items-center justify-center px-4 text-[#66c310] font-black text-sm">
              <span>VS</span>
            </div>

            {/* English side */}
            <div className="flex-1 space-y-2 text-center md:text-left">
              <div className="flex items-center justify-center md:justify-start gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#66c310]"></span>
                <h4 className="font-extrabold text-white text-sm uppercase tracking-wide">
                  {language === 'es' ? 'Ritmo del Inglés: Acentual y Musical' : 'English Rhythm: Stress-Timed Waves'}
                </h4>
              </div>
              <p className="text-xs text-stone-300">
                {language === 'es' ? 'Las palabras clave suben y las de enlace se comprimen con el Schwa (DA-da-DA-da).' : 'Content words pop high, grammatical words shrink into the Schwa (DA-da-DA-da).'}
              </p>
              <div className="flex items-center justify-center md:justify-start gap-1.5 h-6">
                <span className="w-8 h-4 bg-[#66c310] rounded-full animate-pulse" />
                <span className="w-3 h-1.5 bg-[#66c310]/50 rounded-full" />
                <span className="w-10 h-5 bg-[#66c310] rounded-full animate-pulse" />
                <span className="w-3 h-1.5 bg-[#66c310]/50 rounded-full" />
                <span className="w-7 h-3 bg-[#66c310] rounded-full" />
              </div>
            </div>

          </div>
        </div>

        {/* 4 Sound Traps Grid with Interactive Comparative Audio */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {traps.map((trap) => (
            <div
              key={trap.id}
              className="rounded-3xl bg-[#09241c] border-2 border-[#1e614d] p-6 sm:p-7 space-y-5 shadow-xl flex flex-col justify-between hover:border-[#66c310]/70 transition-all duration-300 group"
            >
              <div className="space-y-3.5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg sm:text-xl font-black text-[#66c310] flex items-center gap-2">
                    <span>{trap.title}</span>
                  </h3>
                  
                  {/* Active Soundwave */}
                  {activeAudioTrap === trap.id && (
                    <div className="flex items-center gap-1 h-4">
                      <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-1" />
                      <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-2" />
                      <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-3" />
                    </div>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-stone-200 leading-relaxed">
                  {trap.desc}
                </p>

                {/* Incorrect vs Correct Interactive Comparison */}
                <div className="space-y-2.5 pt-1">
                  
                  {/* Spanish Habit Box with Audio button */}
                  <div className="p-3.5 rounded-2xl bg-[#1c1316] border border-rose-900/60 text-rose-300 text-xs flex items-center justify-between gap-2.5">
                    <div className="flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4 text-rose-400 shrink-0" />
                      <div>
                        <strong>{language === 'es' ? 'Hábito a corregir:' : 'Habit to drop:'}</strong>
                        <div className="font-mono text-[11px] opacity-90">{trap.incorrect}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayComparison(trap.id, 'bad', trap.audioPromptBad)}
                      className={`px-3 py-1 rounded-full text-[10px] font-bold border transition-colors cursor-pointer shrink-0 ${
                        activeAudioTrap === trap.id && playingVariant === 'bad'
                          ? 'bg-rose-600 text-white border-rose-400'
                          : 'bg-rose-950/80 border-rose-800 text-rose-200 hover:bg-rose-900'
                      }`}
                    >
                      {activeAudioTrap === trap.id && playingVariant === 'bad' ? 'Pausar' : 'Oír Hábito'}
                    </button>
                  </div>

                  {/* Native Flow Box with Audio button */}
                  <div className="p-3.5 rounded-2xl bg-[#0e3323] border border-[#277a62] text-[#b9f58c] text-xs flex items-center justify-between gap-2.5 font-semibold">
                    <div className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-[#66c310] shrink-0" />
                      <div>
                        <strong>{language === 'es' ? 'Inglés natural fluido:' : 'Natural English:'}</strong>
                        <div className="font-mono text-[11px] text-white">{trap.correct}</div>
                      </div>
                    </div>
                    <button
                      onClick={() => handlePlayComparison(trap.id, 'good', trap.audioPromptGood)}
                      className={`px-3 py-1 rounded-full text-[10px] font-black transition-colors cursor-pointer shrink-0 ${
                        activeAudioTrap === trap.id && playingVariant === 'good'
                          ? 'bg-white text-[#0b2d22]'
                          : 'bg-[#66c310] text-[#0b2d22] hover:bg-[#54a50b]'
                      }`}
                    >
                      {activeAudioTrap === trap.id && playingVariant === 'good' ? 'Pausar' : 'Oír Nativo'}
                    </button>
                  </div>

                </div>

                {/* Pro tip snippet */}
                <div className="text-[11px] text-stone-300 italic pt-1 flex items-center gap-1.5">
                  <Sparkles className="w-3 h-3 text-[#66c310] shrink-0" />
                  <span>{trap.tip}</span>
                </div>
              </div>

              {/* Audio Listen & Live Microphone Practice */}
              <div className="pt-4 border-t border-[#164c3c] space-y-3">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  
                  {/* Complete Model Button */}
                  <button
                    onClick={() => handlePlayComparison(trap.id, 'good', trap.audioPromptGood)}
                    className="flex-1 sm:flex-initial px-4 py-2.5 rounded-full bg-[#164c3c] hover:bg-[#20634f] text-white text-xs font-bold flex items-center justify-center gap-2 transition-all cursor-pointer border border-[#277a62] hover:scale-[1.02]"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[#66c310]" />
                    <span>{language === 'es' ? 'Escuchar Modelo Completo' : 'Listen Full Model'}</span>
                  </button>

                  {/* Practice with Mic Button */}
                  <button
                    onClick={() => handleRecordTrap(trap.id)}
                    className={`px-4 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                      recordingTrapId === trap.id
                        ? 'bg-rose-900/50 border-rose-500 text-rose-300 animate-pulse'
                        : 'bg-[#103e30] hover:bg-[#164c3c] border-[#246f58] text-stone-200'
                    }`}
                  >
                    {recordingTrapId === trap.id ? (
                      <>
                        <MicOff className="w-3.5 h-3.5" />
                        <span>{language === 'es' ? 'Grabando...' : 'Listening...'}</span>
                      </>
                    ) : (
                      <>
                        <Mic className="w-3.5 h-3.5 text-[#66c310]" />
                        <span>{language === 'es' ? 'Probar Mi Voz' : 'Practice Saying It'}</span>
                      </>
                    )}
                  </button>

                </div>

                {/* Live Feedback Toast */}
                {recordedFeedbackId === trap.id && (
                  <div className="p-2.5 rounded-xl bg-[#164c3c] border border-[#66c310] text-[#d1f7b0] text-xs font-bold flex items-center justify-between animate-in fade-in duration-150">
                    <div className="flex items-center gap-2">
                      <Check className="w-3.5 h-3.5 text-[#66c310]" />
                      <span>{language === 'es' ? '¡Excelente corrección! Ritmo natural sin vocal extra.' : 'Great accent adjustment! Pure onset with clean airflow.'}</span>
                    </div>
                    <span className="text-[10px] bg-[#66c310] text-[#0b2d22] px-2 py-0.5 rounded-md font-black">
                      96% Match
                    </span>
                  </div>
                )}
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Box */}
        <div className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-[#103e30] border-2 border-[#66c310]/50 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl glow-lime-sm">
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

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onOpenBooking}
              className="px-7 py-3.5 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{language === 'es' ? 'Agendar Sesión 1 a 1' : 'Book 1-on-1 Session'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
            <button
              onClick={onOpenLeadMagnet}
              className="px-5 py-3.5 rounded-full bg-transparent hover:bg-[#164c3c] border border-white/30 text-white font-bold text-xs shrink-0 transition-colors cursor-pointer"
            >
              <span>{language === 'es' ? 'Guía en PDF' : 'Free PDF Guide'}</span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

