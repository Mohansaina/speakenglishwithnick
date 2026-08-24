'use client';

import React, { useState } from 'react';
import { drills } from '@/data/drills';
import { Headphones, Volume2, Pause, Check, AlertCircle, Lightbulb, Mic, MicOff, Sparkles } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const PracticeDrill: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].drills;

  const [selectedDrillId, setSelectedDrillId] = useState(drills[0].id);
  const [isPlaying, setIsPlaying] = useState(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1.0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState<string | null>(null);

  const activeDrill = drills.find(d => d.id === selectedDrillId) || drills[0];

  const handleSpeak = (text: string) => {
    if ('speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
        return;
      }

      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      utterance.pitch = 1.0;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);

      setIsPlaying(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleRecording = () => {
    if (isRecording) {
      setIsRecording(false);
      setRecordedFeedback(language === 'es' ? '¡Excelente pronunciación! Ritmo relajado y buena entonación.' : 'Great pronunciation! Relaxed speed and natural stress pattern.');
    } else {
      setIsRecording(true);
      setRecordedFeedback(null);
      setTimeout(() => {
        setIsRecording(false);
        setRecordedFeedback(language === 'es' ? '¡Audio capturado! Cadencia clara y fluida.' : 'Audio recorded! Clear rhythm and smooth flow.');
      }, 3200);
    }
  };

  return (
    <section id="drills" className="py-20 sm:py-28 relative bg-[#fbfbf9] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-14">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
            <Headphones className="w-3.5 h-3.5 text-[#66c310]" />
            {t.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Drill Selector Tabs */}
        <div className="flex items-center justify-start lg:justify-center gap-2 overflow-x-auto pb-4 scrollbar-none mb-6 sm:mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
          {drills.map((drill) => (
            <button
              key={drill.id}
              onClick={() => {
                if (isPlaying) window.speechSynthesis?.cancel();
                setIsPlaying(false);
                setRecordedFeedback(null);
                setSelectedDrillId(drill.id);
              }}
              className={`px-4 py-2.5 rounded-full text-xs sm:text-sm font-bold whitespace-nowrap transition-all flex items-center gap-2 shrink-0 cursor-pointer ${
                selectedDrillId === drill.id
                  ? 'bg-[#0d382c] text-white shadow-sm'
                  : 'bg-white text-stone-700 hover:text-[#0d382c] hover:bg-stone-50 border border-stone-200'
              }`}
            >
              <span>{drill.title}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-extrabold ${
                selectedDrillId === drill.id ? 'bg-[#66c310] text-[#0b2d22]' : 'bg-stone-100 text-stone-500'
              }`}>
                {drill.difficulty}
              </span>
            </button>
          ))}
        </div>

        {/* Main Acoustic Workout Arena */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-stretch">
          
          {/* Main Phrase & Audio Deck (7 cols) */}
          <div className="lg:col-span-7 rounded-3xl bg-white border border-stone-200/90 p-6 sm:p-8 space-y-6 flex flex-col justify-between shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
            
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="px-3 py-1 rounded-full text-xs font-bold bg-[#eefae8] text-[#0d382c] border border-[#c4eeb0]">
                  {t.scenarioLabel}: {activeDrill.category}
                </span>
                <span className="text-xs text-stone-500 italic">
                  &ldquo;{activeDrill.scenario}&rdquo;
                </span>
              </div>

              {/* Target Phrase Box */}
              <div className="p-5 sm:p-6 rounded-2xl bg-[#f4fbf0] border-2 border-[#d0f4bd] space-y-2">
                <span className="text-[11px] uppercase tracking-wider font-extrabold text-[#0d382c]">
                  {t.phraseLabel}
                </span>
                <p className="text-lg sm:text-2xl font-black text-[#0d382c] leading-snug">
                  &ldquo;{activeDrill.phrase}&rdquo;
                </p>
                <p className="text-xs font-mono text-stone-600 font-medium">
                  Phonetics: {activeDrill.phonetic}
                </p>
              </div>

              {/* Context */}
              <div className="space-y-1">
                <h4 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {language === 'es' ? 'Cuándo y Por Qué Usarla' : 'When & Why to Use This'}
                </h4>
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                  {activeDrill.meaning}
                </p>
              </div>
            </div>

            {/* Audio Deck Controls */}
            <div className="space-y-3 pt-4 border-t border-stone-100">
              <div className="flex flex-wrap items-center justify-between gap-2.5">
                
                {/* Play Button */}
                <button
                  onClick={() => handleSpeak(activeDrill.phrase)}
                  className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-bold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 text-[#66c310]" />
                      <span>{t.pauseAudio}</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-4 h-4 text-[#66c310]" />
                      <span>{t.playNative}</span>
                    </>
                  )}
                </button>

                {/* Speed Controls */}
                <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-full text-xs font-semibold">
                  <span className="text-[10px] text-stone-500 px-1 font-medium">{t.speed}:</span>
                  {[0.8, 1.0, 1.2].map((spd) => (
                    <button
                      key={spd}
                      onClick={() => setPlaybackSpeed(spd)}
                      className={`px-2.5 py-0.5 rounded-full font-bold transition-colors cursor-pointer ${
                        playbackSpeed === spd
                          ? 'bg-[#0d382c] text-white shadow-2xs'
                          : 'text-stone-600 hover:text-stone-900'
                      }`}
                    >
                      {spd}x
                    </button>
                  ))}
                </div>

                {/* Voice Record Practice */}
                <button
                  onClick={toggleRecording}
                  className={`w-full sm:w-auto px-5 py-3 rounded-full font-bold text-xs flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                    isRecording
                      ? 'bg-rose-50 border-rose-300 text-rose-700 animate-pulse'
                      : 'bg-white text-stone-800 hover:bg-stone-50 border-stone-200'
                  }`}
                >
                  {isRecording ? (
                    <>
                      <MicOff className="w-3.5 h-3.5" />
                      <span>{t.listening}</span>
                    </>
                  ) : (
                    <>
                      <Mic className="w-3.5 h-3.5 text-[#0d382c]" />
                      <span>{t.practiceMic}</span>
                    </>
                  )}
                </button>

              </div>

              {/* Toast Feedback */}
              {recordedFeedback && (
                <div className="p-3 rounded-2xl bg-[#eefae8] border border-[#c4eeb0] text-[#0d382c] text-xs font-bold flex items-center gap-2 animate-in fade-in duration-150">
                  <Check className="w-4 h-4 shrink-0 text-[#66c310]" />
                  <span>{recordedFeedback}</span>
                </div>
              )}
            </div>

          </div>

          {/* Educational Pro Tips & Common Mistakes (5 cols) */}
          <div className="lg:col-span-5 space-y-4 flex flex-col justify-between">
            
            {/* Why It Works */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#0d382c] text-xs font-black uppercase tracking-wider">
                <Lightbulb className="w-4 h-4 text-[#66c310]" />
                <span>{language === 'es' ? 'Por Qué Funciona Tan Bien' : 'Why Native Speakers Use This'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-700 leading-relaxed">
                {activeDrill.whyItWorks}
              </p>
            </div>

            {/* Unnatural Phrasing to Avoid */}
            <div className="p-5 sm:p-6 rounded-3xl bg-white border border-stone-200/90 space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-rose-800 text-xs font-black uppercase tracking-wider">
                <AlertCircle className="w-4 h-4 text-rose-600" />
                <span>{language === 'es' ? 'Frase No Natural a Evitar' : 'Unnatural Phrasing to Avoid'}</span>
              </div>
              <p className="text-xs sm:text-sm text-stone-600 line-through decoration-rose-400">
                {activeDrill.commonMistake}
              </p>
            </div>

            {/* Bonus Natural Variation */}
            <div className="p-5 sm:p-6 rounded-3xl bg-[#eefae8] border border-[#c4eeb0] space-y-2 shadow-2xs">
              <div className="flex items-center gap-2 text-[#0d382c] text-xs font-black uppercase tracking-wider">
                <Sparkles className="w-4 h-4 text-[#66c310]" />
                <span>{language === 'es' ? 'Variación Natural Recomendada' : 'Bonus Casual Alternative'}</span>
              </div>
              <p className="text-xs sm:text-sm font-extrabold text-[#0d382c]">
                {activeDrill.betterAlternative}
              </p>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
