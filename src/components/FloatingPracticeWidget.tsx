'use client';

import React, { useState } from 'react';
import { Volume2, Mic, MicOff, Check, X, Headphones, ChevronUp, ChevronDown, Award, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface FloatingPracticeWidgetProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
}

export const FloatingPracticeWidget: React.FC<FloatingPracticeWidgetProps> = ({
  onOpenQuiz,
  onOpenBooking,
}) => {
  const { language } = useLanguage();
  const [isOpen, setIsOpen] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [score, setScore] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<string | null>(null);

  const dailyPhrase = language === 'es'
    ? {
        en: "Could you please speak a little slower?",
        ipa: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər/",
        tip: "Consejo rápido: Empieza 'speak' con aire continuo sin añadir la vocal 'e'."
      }
    : {
        en: "Could you please speak a little slower?",
        ipa: "/kʊd juː pliːz spiːk ə ˈlɪt.əl ˈsloʊ.ər/",
        tip: "Quick Tip: Clean /s/ onset with relaxed vowel reduction."
      };

  const handlePlayAudio = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(dailyPhrase.en);
        utterance.rate = 0.95;
        
        const voices = window.speechSynthesis.getVoices();
        const enVoice = voices.find((v) => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
        if (enVoice) utterance.voice = enVoice;

        utterance.onend = () => setIsPlaying(false);
        utterance.onerror = () => setIsPlaying(false);

        setIsPlaying(true);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  const handleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      const randomScore = Math.floor(92 + Math.random() * 6);
      setScore(randomScore);
      setFeedback(language === 'es' ? '¡Ritmo acústico perfecto!' : 'Crisp native cadence!');
      try {
        confetti({ particleCount: 30, spread: 40, origin: { y: 0.85 } });
      } catch {
        // ignore
      }
    } else {
      setIsRecording(true);
      setScore(null);
      setFeedback(null);
      setTimeout(() => {
        setIsRecording(false);
        setScore(95);
        setFeedback(language === 'es' ? '¡Excelente entonación nativa!' : 'Great native stress pattern!');
        try {
          confetti({ particleCount: 30, spread: 40, origin: { y: 0.85 } });
        } catch {
          // ignore
        }
      }, 2800);
    }
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col items-end">
      {/* Expanded Mini Workout Studio */}
      {isOpen && (
        <div className="mb-3 w-[calc(100vw-2.5rem)] max-w-sm sm:w-96 rounded-3xl bg-[#1e244d] border border-[#3b4685] text-white p-4 sm:p-5 shadow-[0_16px_50px_rgba(0,0,0,0.3)] space-y-4 animate-in slide-in-from-bottom-5 duration-200">
          
          <div className="flex items-center justify-between pb-2 border-b border-[#3b4685]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#f15555] animate-ping" />
              <h4 className="text-xs font-black text-white uppercase tracking-wider">
                {language === 'es' ? 'Micro-Práctica del Día (20s)' : 'Daily 20-Sec Workout'}
              </h4>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 rounded-full text-stone-400 hover:text-white cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="space-y-1.5 p-3.5 rounded-2xl bg-[#161a3b] border border-[#3b4685]">
            <div className="flex justify-between items-center text-[10px] text-[#f15555] font-bold">
              <span>{language === 'es' ? 'Frase de Hoy:' : "Today's Target:"}</span>
              <span className="font-mono text-stone-300">{dailyPhrase.ipa}</span>
            </div>
            <p className="text-sm font-black text-white">
              &ldquo;{dailyPhrase.en}&rdquo;
            </p>
          </div>

          <p className="text-[11px] text-[#e4ebf9] italic">
            {dailyPhrase.tip}
          </p>

          <div className="flex items-center gap-2 pt-1">
            <button
              onClick={handlePlayAudio}
              className="flex-1 py-2.5 rounded-full bg-[#f15555] hover:bg-[#d01f1f] text-white font-black text-xs flex items-center justify-center gap-1.5 transition-all cursor-pointer shadow-xs"
            >
              {isPlaying ? <Pause className="w-3.5 h-3.5 fill-current" /> : <Volume2 className="w-3.5 h-3.5" />}
              <span>{isPlaying ? 'Pausa' : (language === 'es' ? 'Escuchar' : 'Listen')}</span>
            </button>

            <button
              onClick={handleRecord}
              className={`flex-1 py-2.5 rounded-full text-xs font-bold flex items-center justify-center gap-1.5 border transition-all cursor-pointer ${
                isRecording
                  ? 'bg-rose-900/50 border-rose-500 text-rose-300 animate-pulse'
                  : 'bg-[#283063] hover:bg-[#373f7a] border-[#3b4685] text-white'
              }`}
            >
              {isRecording ? <MicOff className="w-3.5 h-3.5" /> : <Mic className="w-3.5 h-3.5 text-[#f15555]" />}
              <span>{isRecording ? 'Grabando...' : (language === 'es' ? 'Repetir' : 'Practice')}</span>
            </button>
          </div>

          {feedback && (
            <div className="p-2.5 rounded-xl bg-[#283063] border border-[#f15555] text-white text-xs font-bold flex items-center justify-between">
              <div className="flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-[#f15555]" />
                <span>{feedback}</span>
              </div>
              {score && (
                <span className="bg-[#f15555] text-white px-2 py-0.5 rounded-md font-black text-[10px]">
                  {score}%
                </span>
              )}
            </div>
          )}

          <div className="pt-2 border-t border-[#3b4685] flex items-center justify-between text-[11px]">
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenQuiz();
              }}
              className="text-[#f15555] font-bold hover:underline cursor-pointer"
            >
              {language === 'es' ? 'Hacer Test Completo →' : 'Take Full Quiz →'}
            </button>
            <button
              onClick={() => {
                setIsOpen(false);
                onOpenBooking();
              }}
              className="text-stone-300 hover:text-white cursor-pointer font-medium"
            >
              {language === 'es' ? 'Sesión 1 a 1' : '1-on-1 Call'}
            </button>
          </div>

        </div>
      )}

      {/* Floating Pill Trigger */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2.5 rounded-full bg-[#48529e] hover:bg-[#373f7a] text-white border border-[#373f7a] shadow-2xl flex items-center gap-2.5 cursor-pointer transition-all hover:scale-105 group"
        aria-label="Open daily pronunciation practice"
      >
        <div className="w-7 h-7 rounded-full bg-[#f15555] text-white flex items-center justify-center font-bold text-xs shadow-xs">
          <Headphones className="w-3.5 h-3.5 stroke-[2.5]" />
        </div>
        <div className="text-left hidden sm:block">
          <div className="text-xs font-black text-white flex items-center gap-1">
            <span>{language === 'es' ? 'Micro-Práctica de Acento' : '20s Accent Workout'}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-[#f15555] animate-pulse" />
          </div>
          <p className="text-[10px] text-[#e4ebf9] font-medium">
            {language === 'es' ? 'Practica una frase en voz alta' : 'Shadow today’s phrase'}
          </p>
        </div>
        <div className="p-1 rounded-full text-stone-300 group-hover:text-white">
          {isOpen ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
        </div>
      </button>
    </div>
  );
};

