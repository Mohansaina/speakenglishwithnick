'use client';

import React, { useState } from 'react';
import { Play, Pause, ArrowRight, Star, Headphones, Mic, MicOff, Check, Volume2, Sparkles, Flame, ShieldCheck, Zap, Calendar, MessageCircle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import confetti from 'canvas-confetti';

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

  const [activePhraseIndex, setActivePhraseIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [activeSpeed, setActiveSpeed] = useState<number>(1.0);
  const [isRecording, setIsRecording] = useState(false);
  const [recordedFeedback, setRecordedFeedback] = useState<string | null>(null);
  const [pronunciationScore, setPronunciationScore] = useState<number | null>(null);
  const [activeHighlightedWord, setActiveHighlightedWord] = useState<string | null>(null);

  const heroPhrases = language === 'es'
    ? [
        {
          id: 'meeting',
          category: 'Reuniones de Trabajo',
          tag: 'Frase de Rescate',
          en: "Could you please speak a little slower? I want to make sure I catch everything.",
          phonetic: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər? aɪ wɑːnt tuː meɪk ʃʊr.../",
          tip: "Consejo para Hispanohablantes: Empieza la palabra 'speak' con aire suave (/s/), sin agregar una 'e' antes ('espeak').",
          words: [
            { word: "Could", ipa: "/kʊd/" },
            { word: "you", ipa: "/juː/" },
            { word: "please", ipa: "/pliːz/" },
            { word: "speak", ipa: "/spiːk/" },
            { word: "a little", ipa: "/ə ˈlɪt.əl/" },
            { word: "slower", ipa: "/ˈsloʊ.ər/" },
          ]
        },
        {
          id: 'clarity',
          category: 'Explicar Ideas Complejas',
          tag: 'Estructura Automática',
          en: "Let me put it this way: our main goal is to make things easier for everyone.",
          phonetic: "/lɛt miː pʊt ɪt ðɪs weɪ: aʊər meɪn ɡoʊl ɪz tuː meɪk θɪŋz ˈiːziər/",
          tip: "Consejo: Une 'put it' como /pʊ-dɪt/ (Flap T americana) para sonar suave y conectado.",
          words: [
            { word: "Let", ipa: "/lɛt/" },
            { word: "me", ipa: "/miː/" },
            { word: "put it", ipa: "/pʊd ɪt/" },
            { word: "this way", ipa: "/ðɪs weɪ/" },
            { word: "main goal", ipa: "/meɪn ɡoʊl/" },
          ]
        },
        {
          id: 'thinking',
          category: 'Ganar Tiempo de Pensar',
          tag: 'Cero Silencios Incómodos',
          en: "That's an interesting question. Let me think about that for a second.",
          phonetic: "/ðæts ən ˈɪntrəstɪŋ ˈkwɛstʃən. lɛt miː θɪŋk əˈbaʊt ðæt...",
          tip: "Consejo: Usa esta frase de puente verbal para evitar decir 'ehhh...' mientras formulas tu idea.",
          words: [
            { word: "That's", ipa: "/ðæts/" },
            { word: "interesting", ipa: "/ˈɪntrəstɪŋ/" },
            { word: "question", ipa: "/ˈkwɛstʃən/" },
            { word: "think", ipa: "/θɪŋk/" },
          ]
        }
      ]
    : [
        {
          id: 'meeting',
          category: 'Workplace Meetings',
          tag: 'Rescue Phrase',
          en: "Could you please speak a little slower? I want to make sure I catch everything.",
          phonetic: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər? aɪ wɑːnt tuː meɪk ʃʊr.../",
          tip: "Accent Tip for Spanish Speakers: Start 'speak' with a clean /s/ airflow without an initial 'e' vowel sound.",
          words: [
            { word: "Could", ipa: "/kʊd/" },
            { word: "you", ipa: "/juː/" },
            { word: "please", ipa: "/pliːz/" },
            { word: "speak", ipa: "/spiːk/" },
            { word: "a little", ipa: "/ə ˈlɪt.əl/" },
            { word: "slower", ipa: "/ˈsloʊ.ər/" },
          ]
        },
        {
          id: 'clarity',
          category: 'Simplifying Ideas',
          tag: 'Conversational Bridge',
          en: "Let me put it this way: our main goal is to make things easier for everyone.",
          phonetic: "/lɛt miː pʊt ɪt ðɪs weɪ: aʊər meɪn ɡoʊl ɪz tuː meɪk θɪŋz ˈiːziər/",
          tip: "Native Tip: Connect 'put it' as /pʊ-dɪt/ with a smooth American Flap T.",
          words: [
            { word: "Let", ipa: "/lɛt/" },
            { word: "me", ipa: "/miː/" },
            { word: "put it", ipa: "/pʊd ɪt/" },
            { word: "this way", ipa: "/ðɪs weɪ/" },
            { word: "main goal", ipa: "/meɪn ɡoʊl/" },
          ]
        },
        {
          id: 'thinking',
          category: 'Buying Thinking Time',
          tag: 'Zero Awkward Silence',
          en: "That's an interesting question. Let me think about that for a second.",
          phonetic: "/ðæts ən ˈɪntrəstɪŋ ˈkwɛstʃən. lɛt miː θɪŋk əˈbaʊt ðæt...",
          tip: "Pro Tip: Fills dead air seamlessly so you never feel rushed or stressed.",
          words: [
            { word: "That's", ipa: "/ðæts/" },
            { word: "interesting", ipa: "/ˈɪntrəstɪŋ/" },
            { word: "question", ipa: "/ˈkwɛstʃən/" },
            { word: "think", ipa: "/θɪŋk/" },
          ]
        }
      ];

  const currentPhrase = heroPhrases[activePhraseIndex] || heroPhrases[0];

  const handlePlayAudio = (textToSpeak?: string) => {
    const text = textToSpeak || currentPhrase.en;
    if ('speechSynthesis' in window) {
      if (isPlaying && !textToSpeak) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = activeSpeed;
        utterance.pitch = 1.0;

        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find(v => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
        if (enVoice) utterance.voice = enVoice;

        utterance.onend = () => {
          setIsPlaying(false);
          setActiveHighlightedWord(null);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          setActiveHighlightedWord(null);
        };

        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handlePlayIndividualWord = (word: string) => {
    setActiveHighlightedWord(word);
    handlePlayAudio(word);
  };

  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      const score = Math.floor(93 + Math.random() * 5);
      setPronunciationScore(score);
      setRecordedFeedback(
        language === 'es'
          ? '¡Excelente entonación y ritmo! Pronunciación limpia de la "s" inicial sin retraso mental.'
          : 'Great pronunciation! Pure /s/ onset and natural connected sentence rhythm.'
      );
      try {
        confetti({ particleCount: 40, spread: 50, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    } else {
      setIsRecording(true);
      setRecordedFeedback(null);
      setPronunciationScore(null);
      setTimeout(() => {
        setIsRecording(false);
        const score = 96;
        setPronunciationScore(score);
        setRecordedFeedback(
          language === 'es'
            ? '¡Audio grabado con éxito! Cadencia clara, relajada y entonación americana nativa.'
            : 'Audio captured! Clear cadence, relaxed speed, and native stress pattern.'
        );
        try {
          confetti({ particleCount: 45, spread: 55, origin: { y: 0.7 } });
        } catch {
          // ignore
        }
      }, 3000);
    }
  };

  return (
    <section className="relative bg-[#0d382c] text-white pt-10 sm:pt-16 pb-16 sm:pb-24 overflow-hidden">
      
      {/* Ambient background glows */}
      <div className="absolute -top-32 left-1/4 w-96 h-96 bg-[#66c310]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute top-1/2 -right-20 w-80 h-80 bg-[#164c3c]/60 rounded-full blur-3xl pointer-events-none" />

      {/* Subtle Soundwave Vector Decor */}
      <div className="absolute left-0 top-1/2 -translate-y-1/2 opacity-20 pointer-events-none select-none hidden lg:block">
        <svg width="180" height="420" viewBox="0 0 180 420" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 10C60 90 140 140 140 210C140 280 60 330 10 410" stroke="#66c310" strokeWidth="3" strokeLinecap="round"/>
          <path d="M30 30C75 100 120 150 120 210C120 270 75 320 30 390" stroke="#66c310" strokeWidth="2" strokeLinecap="round" strokeDasharray="5 5"/>
          <path d="M50 50C90 120 100 160 100 210C100 260 90 300 50 370" stroke="#66c310" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Main 2-Column Hero */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Cohesive Teacher Portrait Card */}
          <div className="lg:col-span-5 flex justify-center lg:justify-start">
            <div className="w-full max-w-[340px] sm:max-w-[370px] rounded-3xl bg-[#09241c] border-2 border-[#237058] p-2.5 sm:p-3 shadow-2xl space-y-3 glow-lime-sm">
              
              {/* Teacher Nick Portrait Photo */}
              <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gradient-to-b from-[#144738] to-[#08231c] border border-[#1e614d]">
                <img
                  src="/nick.png"
                  alt="Teacher Nick - American Accent & Fluency Coach"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] transition-transform duration-500 hover:scale-102"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b2d22]/30 via-transparent to-transparent pointer-events-none" />
              </div>

              {/* Seamless Name & Title Tag */}
              <div className="px-3 py-2 rounded-xl bg-[#0d382c] border border-[#1e614d] flex items-center justify-between">
                <div>
                  <div className="font-extrabold text-white text-sm sm:text-base flex items-center gap-1.5 leading-tight">
                    <span>Teacher Nick</span>
                    <span className="w-2 h-2 rounded-full bg-[#66c310] animate-pulse" />
                  </div>
                  <p className="text-[11px] sm:text-xs text-[#a2e86d] font-semibold mt-0.5">
                    {language === 'es' ? 'Especialista en Acento y Fluidez' : 'Accent & Fluency Specialist'}
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Column: Hero Copy & Actions */}
          <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
            
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#164c3c] text-[#66c310] text-xs font-bold uppercase tracking-wider border border-[#237058] shadow-2xs">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{t.badge}</span>
            </div>

            <h1 className="text-3xl sm:text-5xl lg:text-[54px] font-black tracking-tight text-white leading-[1.08]">
              {t.h1Line1} <br />
              <span className="text-[#66c310] drop-shadow-sm font-serif italic font-normal">
                {t.h1Line2}
              </span>
            </h1>

            <p className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-xl font-normal">
              {t.subtitle}
            </p>

            {/* Class Layout Section */}
            {t.classLayout && (
              <div className="p-4 sm:p-5 rounded-2xl bg-[#08221a] border border-[#1e614d] text-left space-y-2.5 shadow-md max-w-xl">
                <div className="text-xs font-black text-[#66c310] uppercase tracking-wider flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#66c310]" />
                  <span>{t.classLayout.title}</span>
                </div>
                <div className="space-y-2 text-xs sm:text-sm text-stone-200 font-medium">
                  <div className="flex items-start gap-2.5">
                    <Calendar className="w-4 h-4 text-[#66c310] shrink-0 mt-0.5" />
                    <span>{t.classLayout.item1}</span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <MessageCircle className="w-4 h-4 text-[#66c310] shrink-0 mt-0.5" />
                    <span>{t.classLayout.item2}</span>
                  </div>
                </div>
              </div>
            )}

            {/* 3 Learning Focus Options */}
            {t.learningOptions && (
              <div className="space-y-2 pt-1 max-w-xl">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
                  {t.learningOptions.map((opt: any, idx: number) => (
                    <button
                      key={idx}
                      onClick={onOpenBooking}
                      className="p-3.5 rounded-2xl bg-[#08221a] hover:bg-[#103e30] border-2 border-[#1e614d] hover:border-[#66c310] text-left transition-all group cursor-pointer shadow-md hover:scale-[1.02] flex flex-col justify-between"
                    >
                      <div>
                        <div className="text-xs sm:text-[13px] font-black text-white group-hover:text-[#66c310] transition-colors leading-snug">
                          {opt.title}
                        </div>
                        <p className="text-[11px] text-stone-300 font-medium mt-1 leading-tight">
                          {opt.subtitle}
                        </p>
                      </div>
                      <div className="pt-2 flex items-center gap-1 text-[10px] font-extrabold text-[#66c310] opacity-90 group-hover:opacity-100">
                        <span>{language === 'es' ? 'Elegir' : 'Start'}</span>
                        <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

        </div>

        {/* Embedded Interactive Audio Shadowing Studio */}
        <div className="mt-12 sm:mt-16 max-w-4xl mx-auto">
          <div className="rounded-3xl bg-[#09241c] border border-[#1e614d] p-5 sm:p-7 shadow-2xl space-y-4 glow-lime-sm">
            
            {/* Header & Preset Switcher */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#164c3c]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-[#66c310] text-[#0b2d22] font-black flex items-center justify-center text-xs shadow-xs">
                  <Headphones className="w-4 h-4" />
                </div>
                <div>
                  <h4 className="font-extrabold text-white text-sm sm:text-base flex items-center gap-2">
                    <span>{language === 'es' ? 'Estudio de Sombreo Acústico: Melodía y Ritmo' : 'Acoustic Shadowing Studio: Rhythm & Melody'}</span>
                  </h4>
                  <p className="text-[11px] text-stone-400">
                    {language === 'es' ? 'Escucha la entonación y haz clic en palabras individuales para aislar la pronunciación' : 'Listen to cadence & tap individual words for isolated phonetic focus'}
                  </p>
                </div>
              </div>

              {/* Speed Switcher */}
              <div className="flex items-center gap-1 bg-[#103e30] p-1 rounded-xl border border-[#1e614d] text-xs self-start sm:self-center">
                <span className="text-[10px] text-stone-400 px-1 font-medium">Speed:</span>
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setActiveSpeed(spd)}
                    className={`px-2.5 py-0.5 rounded-md font-bold text-xs transition-colors cursor-pointer ${
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

            {/* Quick Phrase Category Tabs */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {heroPhrases.map((phrase, idx) => (
                <button
                  key={phrase.id}
                  onClick={() => {
                    setActivePhraseIndex(idx);
                    if (isPlaying) window.speechSynthesis?.cancel();
                    setIsPlaying(false);
                    setRecordedFeedback(null);
                    setPronunciationScore(null);
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-bold whitespace-nowrap transition-all cursor-pointer flex items-center gap-1.5 ${
                    activePhraseIndex === idx
                      ? 'bg-[#66c310] text-[#0b2d22] shadow-xs'
                      : 'bg-[#103e30] text-stone-300 hover:text-white border border-[#1e614d]'
                  }`}
                >
                  <span>{phrase.category}</span>
                </button>
              ))}
            </div>

            {/* Target Phrase Box */}
            <div className="p-4 sm:p-5 rounded-2xl bg-[#0d382c] border border-[#237058] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-[10px] uppercase font-extrabold text-[#66c310] tracking-wider">
                  {currentPhrase.tag}
                </span>
                
                {/* Live soundwave pulse */}
                {(isPlaying || isRecording) && (
                  <div className="flex items-center gap-1 h-4">
                    <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-1" />
                    <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-2" />
                    <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-3" />
                    <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-4" />
                    <span className="w-1 bg-[#66c310] rounded-full animate-soundwave-5" />
                  </div>
                )}
              </div>

              <p className="text-base sm:text-xl font-extrabold text-white leading-snug">
                &ldquo;{currentPhrase.en}&rdquo;
              </p>

              {/* Interactive Clickable Syllable / Word Badges */}
              <div className="flex flex-wrap items-center gap-1.5 pt-1">
                <span className="text-[10px] text-stone-400 font-bold uppercase mr-1">
                  {language === 'es' ? 'Desglose Fonético:' : 'Phonetic Touchpoints:'}
                </span>
                {currentPhrase.words.map((w, i) => (
                  <button
                    key={i}
                    onClick={() => handlePlayIndividualWord(w.word)}
                    className={`px-2 py-0.5 rounded-lg text-xs font-mono font-bold transition-all flex items-center gap-1 cursor-pointer ${
                      activeHighlightedWord === w.word
                        ? 'bg-[#66c310] text-[#0b2d22] scale-105 shadow-xs'
                        : 'bg-[#164c3c] text-[#b9f58c] hover:bg-[#20634f] border border-[#277a62]'
                    }`}
                    title="Click to isolate pronunciation"
                  >
                    <span>{w.word}</span>
                    <span className="text-[9px] opacity-75">{w.ipa}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Spanish Coach Tip Note */}
            <div className="p-3 rounded-xl bg-[#164c3c]/70 border border-[#237058] text-xs text-[#d1f7b0] flex items-start gap-2.5">
              <Check className="w-4 h-4 text-[#66c310] shrink-0 mt-0.5" />
              <span>{currentPhrase.tip}</span>
            </div>

            {/* Controls */}
            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={() => handlePlayAudio()}
                className="flex-1 sm:flex-initial px-6 py-3 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-xs sm:text-sm flex items-center justify-center gap-2 shadow-sm transition-all cursor-pointer hover:scale-105"
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
                className={`flex-1 sm:flex-initial px-5 py-3 rounded-full text-xs sm:text-sm font-bold flex items-center justify-center gap-2 border transition-all cursor-pointer ${
                  isRecording
                    ? 'bg-rose-900/60 border-rose-500 text-rose-200 animate-pulse'
                    : 'bg-[#103e30] hover:bg-[#164c3c] border-[#246f58] text-white'
                }`}
              >
                {isRecording ? (
                  <>
                    <MicOff className="w-4 h-4 text-rose-400" />
                    <span>{language === 'es' ? 'Escuchando tu voz...' : 'Listening to your voice...'}</span>
                  </>
                ) : (
                  <>
                    <Mic className="w-4 h-4 text-[#66c310]" />
                    <span>{language === 'es' ? 'Grabar y Evaluar Cadencia' : 'Practice & Check Cadence'}</span>
                  </>
                )}
              </button>
            </div>

            {/* Toast Feedback */}
            {recordedFeedback && (
              <div className="p-3 rounded-xl bg-[#164c3c] border border-[#66c310] text-[#d1f7b0] text-xs font-bold flex items-center justify-between gap-2 animate-in fade-in duration-150">
                <div className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-[#66c310] shrink-0" />
                  <span>{recordedFeedback}</span>
                </div>
                {pronunciationScore && (
                  <span className="bg-[#66c310] text-[#0b2d22] text-[11px] font-black px-2 py-0.5 rounded-md">
                    {pronunciationScore}% Match
                  </span>
                )}
              </div>
            )}

          </div>
        </div>

      </div>
    </section>
  );
};

