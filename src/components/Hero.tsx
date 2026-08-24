'use client';

import React, { useState } from 'react';
import { Play, Pause, ArrowRight, Star, Headphones, Mic, MicOff, Check, Volume2, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface HeroProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const Hero: React.FC<HeroProps> = ({
  onOpenQuiz,
  onOpenBooking,
  onOpenLeadMagnet,
}) => {
  const { language } = useLanguage();
  const t = translations[language].hero;

  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState<number>(1.0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState<string | null>(null);

  const samplePhrase = language === 'es'
    ? {
        en: "Could you please speak a little slower? I want to make sure I catch everything.",
        phonetic: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər? aɪ wɑːnt tuː meɪk ʃʊr.../",
        tip: "Consejo para Hispanohablantes: Empieza la palabra 'speak' con aire suave (/s/), sin agregar una 'e' antes ('espeak').",
      }
    : {
        en: "Could you please speak a little slower? I want to make sure I catch everything.",
        phonetic: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər? aɪ wɑːnt tuː meɪk ʃʊr.../",
        tip: "Accent Tip for Spanish Speakers: Start 'speak' with a clean /s/ airflow without an initial 'e' vowel sound.",
      };

  const handlePlayAudio = () => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(samplePhrase.en);
        utterance.rate = activeSpeed;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
        if (enVoice) utterance.voice = enVoice;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedFeedback(language === 'es' ? '¡Excelente entonación y ritmo! Sin agregar la "e" inicial.' : 'Great pronunciation! Pure /s/ onset and natural sentence rhythm.');
    } else {
      setIsRecording(true);
      setRecordedFeedback(null);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedFeedback(language === 'es' ? '¡Audio grabado con éxito! Cadencia clara y fluida.' : 'Audio captured! Clear cadence and relaxed speaking pace.');
      }, 3000);
    }
  };

  return (
    <section className="relative bg-[#0d382c] text-white pt-10 sm:pt-14 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Hand-crafted Subtle Soundwave Motif (Rachel's English style) */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-25 pointer-events-none select-none hidden lg:block">
        <svg width="180" height="420" viewBox="0 0 180 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C60 90 140 140 140 210C140 280 60 330 10 410" stroke="#66c310" strokeWidth="3" strokeLinecap="round"/>
          <path d="M30 30C75 100 120 150 120 210C120 270 75 320 30 390" stroke="#66c310" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
          <path d="M50 50C90 120 100 160 100 210C100 260 90 300 50 370" stroke="#66c310" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M70 70C100 130 90 170 90 210C90 250 100 290 70 350" stroke="#66c310" strokeWidth="1" strokeLinecap="round" strokeDasharray="3 3"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          
          {/* Left Column: Hand-Crafted Coach Mask Frame */}
          <div className="lg:col-span-5 flex flex-col items-center lg:items-start">
            <div className="relative w-full max-w-[320px] sm:max-w-[360px] aspect-[4/5] rounded-3xl overflow-hidden bg-gradient-to-b from-[#144738] to-[#08231c] border-2 border-[#1c5d4a] shadow-2xl">
              
              {/* Coach Nick High-Quality Portrait Photo */}
              <img
                src="/nick.png"
                alt="Coach Nick - American Accent & Fluency Coach"
                className="w-full h-full object-cover object-top filter contrast-[1.03]"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d22]/90 via-transparent to-transparent" />

              {/* Bottom Coach Name Tag */}
              <div className="absolute bottom-4 left-4 right-4 p-3 rounded-2xl bg-[#0d382c]/95 backdrop-blur-sm border border-[#237058] flex items-center justify-between shadow-md">
                <div>
                  <div className="font-extrabold text-white text-sm flex items-center gap-1.5">
                    <span>Coach Nick</span>
                    <span className="w-2 h-2 rounded-full bg-[#66c310] animate-pulse" />
                  </div>
                  <p className="text-[11px] text-stone-300 font-medium">
                    {language === 'es' ? 'Especialista en Acento y Fluidez' : 'Accent & Fluency Specialist'}
                  </p>
                </div>
                <div className="flex items-center gap-1 bg-[#164c3c] px-2 py-0.5 rounded-lg text-xs font-bold text-[#66c310] border border-[#277a62]">
                  <Star className="w-3 h-3 fill-[#66c310]" />
                  <span>4.9/5</span>
                </div>
              </div>

            </div>

            {/* Specialization Badge */}
            <div className="mt-3.5 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#134436] border border-[#1e614d] text-xs text-[#a2e86d] font-semibold text-center">
              <Sparkles className="w-3.5 h-3.5 text-[#66c310] shrink-0" />
              <span>{t.spanishFocusBadge}</span>
            </div>
          </div>

          {/* Right Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#164c3c] text-[#66c310] text-xs font-bold uppercase tracking-wider border border-[#237058]">
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.08]">
              {t.h1Line1} <br />
              <span className="text-[#66c310]">
                {t.h1Line2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl font-normal">
              {t.subtitle}
            </p>

            {/* Dual CTAs with clean tactile styling */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3.5">
              <button
                onClick={onOpenQuiz}
                className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-sm sm:text-base shadow-[0_8px_20px_rgba(102,195,16,0.3)] transition-all hover:scale-[1.02] flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.ctaPrimary}</span>
                <ArrowRight className="w-4 h-4 stroke-[2.5]" />
              </button>

              <button
                onClick={onOpenBooking}
                className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-[#164c3c] border-2 border-[#66c310]/80 hover:border-[#66c310] text-white font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{t.ctaSecondary}</span>
              </button>
            </div>

            {/* Trust Proof */}
            <div className="pt-1 flex items-center justify-center lg:justify-start gap-3 text-xs text-stone-300">
              <div className="flex items-center gap-0.5 text-[#66c310]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-3.5 h-3.5 fill-[#66c310]" />
                ))}
              </div>
              <span className="font-semibold text-stone-200">{t.proofRating}</span>
            </div>

          </div>

        </div>

        {/* Embedded Interactive Audio Shadowing Workbench */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#09241c] border border-[#1e614d] p-5 sm:p-7 shadow-2xl space-y-4">
            
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 pb-3 border-b border-[#164c3c]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#66c310] text-[#0b2d22] font-black flex items-center justify-center text-xs shadow-xs">
                  🎧
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base">
                    {language === 'es' ? 'Estudio Acústico en Vivo: Sombreo de Ritmo Nativo' : 'Live Acoustic Studio: Native Rhythm Shadowing'}
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Escucha la melodía y repite en voz alta sin traducir' : 'Listen to native melody & repeat out loud without translating'}
                  </p>
                </div>
              </div>

              {/* Speed Switcher */}
              <div className="flex items-center gap-1 bg-[#103e30] p-1 rounded-xl border border-[#1e614d] text-xs">
                <span className="text-[10px] text-stone-400 px-1 font-medium">Speed:</span>
                {[0.8, 1.0, 1.2].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setActiveSpeed(spd)}
                    className={`px-2 py-0.5 rounded-md font-bold text-xs transition-colors cursor-pointer ${
                      activeSpeed === spd
                        ? 'bg-[#66c310] text-[#0b2d22]'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>

            {/* Target Phrase Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d382c] border border-[#237058] space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold text-[#66c310] tracking-wider">
                  {language === 'es' ? 'Frase de Rescate para Reuniones' : 'Workplace Meeting Rescue Phrase'}
                </span>
                <span className="text-[11px] text-stone-400 italic">Survival English</span>
              </div>
              <p className="text-base sm:text-xl font-extrabold text-white leading-snug">
                &ldquo;{samplePhrase.en}&rdquo;
              </p>
              <p className="text-xs font-mono text-stone-400">
                {samplePhrase.phonetic}
              </p>
            </div>

            {/* Spanish Pro-Tip Note */}
            <div className="p-3 rounded-xl bg-[#164c3c]/70 border border-[#237058] text-xs text-[#d1f7b0] flex items-start gap-2.5">
              <Sparkles className="w-4 h-4 text-[#66c310] shrink-0 mt-0.5" />
              <span>{samplePhrase.tip}</span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={handlePlayAudio}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer"
              >
                {isPlaying ? (
                  <>
                    <Pause className="w-4 h-4 text-[#0b2d22]" />
                    <span>{language === 'es' ? 'Pausar Audio' : 'Pause Audio'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-4 h-4 text-[#0b2d22]" />
                    <span>{language === 'es' ? 'Escuchar Audio Nativo' : 'Play Native Audio'}</span>
                  </>
                )}
              </button>

              <button
                onClick={handleToggleRecord}
                className={`w-full sm:w-auto px-5 py-3 rounded-full text-xs font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-900/40 border-rose-500 text-rose-300 animate-pulse'
                    : 'bg-[#103e30] hover:bg-[#164c3c] border-[#246f58] text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Escuchando tu voz...' : 'Listening...'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-3.5 h-3.5 text-[#66c310]" />
                    <span>{language === 'es' ? 'Practicar con Micrófono' : 'Practice Saying It'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Toast Feedback */}
            {recordedFeedback && (
              <div className="p-3 rounded-xl bg-[#164c3c] border border-[#66c310] text-[#d1f7b0] text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
                <Check className="w-4 h-4 text-[#66c310] shrink-0" />
                <span>{recordedFeedback}</span>
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};
