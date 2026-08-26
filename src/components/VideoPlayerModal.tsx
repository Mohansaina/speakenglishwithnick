'use client';

import React, { useState, useEffect, useRef } from 'react';
import { X, Play, Pause, Volume2, VolumeX, RotateCcw, Sparkles, Check, Bookmark, ExternalLink, Flame, MessageSquare, Headphones, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

export interface VideoModalData {
  id: string;
  title: string;
  category: string;
  duration: string;
  views?: string;
  likes?: string;
  desc?: string;
  hook?: string;
  keyTakeaway?: string;
  thumbnailUrl?: string;
  transcript?: string[];
  practicePhrase?: string;
  isReel?: boolean;
}

interface VideoPlayerModalProps {
  isOpen: boolean;
  video: VideoModalData | null;
  onClose: () => void;
  onOpenBooking?: () => void;
}

export const VideoPlayerModal: React.FC<VideoPlayerModalProps> = ({
  isOpen,
  video,
  onClose,
  onOpenBooking,
}) => {
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(15);
  const [playbackSpeed, setPlaybackSpeed] = useState(1.0);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [isPracticingAudio, setIsPracticingAudio] = useState(false);
  const [activeSubtitleIndex, setActiveSubtitleIndex] = useState(0);

  const subtitles = video?.transcript && video.transcript.length > 0
    ? video.transcript
    : [
        "Welcome! In this quick lesson, Coach Nick breaks down natural American phrasing.",
        "Notice how native speakers connect the end of one word to the beginning of the next.",
        "Instead of pausing between words, let the airflow continue smoothly without hesitation.",
        "Repeat this phrase with me: 'Let me put it this way: our main goal is clarity.'",
        "Keep practicing 20 minutes a day on your commute or coffee break!"
      ];

  // Simulate progress bar timer
  useEffect(() => {
    if (!isOpen || !isPlaying) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          return 0;
        }
        const next = prev + 1.2 * playbackSpeed;
        const subIndex = Math.min(
          Math.floor((next / 100) * subtitles.length),
          subtitles.length - 1
        );
        setActiveSubtitleIndex(subIndex);
        return next;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [isOpen, isPlaying, playbackSpeed, subtitles.length]);

  if (!isOpen || !video) return null;

  const handleSpeakPhrase = (text: string) => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (isPracticingAudio) {
        setIsPracticingAudio(false);
        return;
      }
      setIsPracticingAudio(true);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = playbackSpeed;
      
      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find(v => v.lang.startsWith('en-US'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => setIsPracticingAudio(false);
      utterance.onerror = () => setIsPracticingAudio(false);
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleBookmarkToggle = () => {
    setIsBookmarked(!isBookmarked);
    if (!isBookmarked) {
      try {
        confetti({ particleCount: 35, spread: 45, origin: { y: 0.7 } });
      } catch {
        // ignore
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-3xl max-h-[92vh] overflow-y-auto rounded-3xl bg-[#09241c] border border-[#1e614d] text-white shadow-2xl animate-in zoom-in-95 duration-150 flex flex-col">
        
        {/* Modal Top Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-[#164c3c] bg-[#07221a]/90 backdrop-blur-sm sticky top-0 z-20">
          <div className="flex items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-[#66c310] text-[#0b2d22] text-[11px] font-black uppercase tracking-wider">
              {video.category}
            </span>
            <span className="text-xs text-stone-300 font-medium hidden sm:inline">
              Coach Nick Masterclass
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleBookmarkToggle}
              className={`p-2 rounded-full border transition-all cursor-pointer ${
                isBookmarked
                  ? 'bg-[#66c310] text-[#0b2d22] border-[#66c310]'
                  : 'bg-[#103e30] text-stone-300 border-[#1e614d] hover:text-white'
              }`}
              title="Save to favorites"
            >
              <Bookmark className="w-4 h-4 fill-current" />
            </button>
            <button
              onClick={onClose}
              className="p-2 rounded-full bg-[#103e30] border border-[#1e614d] text-stone-300 hover:text-white transition-colors cursor-pointer"
              aria-label="Close modal"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Video Canvas Arena */}
        <div className="relative aspect-video sm:aspect-[16/9] bg-black overflow-hidden flex items-center justify-center group">
          {/* Mock Video Backdrop with cinematic lighting */}
          <img
            src={video.thumbnailUrl || "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=1000&auto=format&fit=crop&q=80"}
            alt={video.title}
            className={`w-full h-full object-cover filter transition-transform duration-700 ${isPlaying ? 'scale-105 opacity-60' : 'opacity-40'}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#09241c] via-black/40 to-black/60" />

          {/* Center Play/Pause Large Pulse Button */}
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="absolute z-10 w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#66c310] hover:bg-[#54a50b] text-[#0b2d22] flex items-center justify-center shadow-2xl transition-transform hover:scale-110 cursor-pointer glow-lime-lg"
          >
            {isPlaying ? (
              <Pause className="w-8 h-8 fill-[#0b2d22]" />
            ) : (
              <Play className="w-8 h-8 fill-[#0b2d22] ml-1" />
            )}
          </button>

          {/* Coach Overlay Badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-md px-3 py-1.5 rounded-full border border-white/10 text-xs">
            <div className="w-2 h-2 rounded-full bg-[#66c310] animate-ping" />
            <span className="font-bold text-white">Live Lesson Demonstration</span>
          </div>

          {/* Floating Subtitle Bar */}
          <div className="absolute bottom-16 left-4 right-4 text-center z-10">
            <div className="inline-block bg-black/85 backdrop-blur-md px-4 py-2 rounded-xl border border-white/10 text-xs sm:text-sm font-semibold text-white shadow-lg max-w-xl">
              &ldquo;{subtitles[activeSubtitleIndex]}&rdquo;
            </div>
          </div>

          {/* Bottom Player Controls Bar */}
          <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-black via-black/80 to-transparent flex flex-col gap-2 z-10">
            {/* Scrubber Bar */}
            <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden cursor-pointer">
              <div
                className="bg-[#66c310] h-full transition-all duration-150 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="flex items-center justify-between text-xs text-stone-300">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="hover:text-[#66c310] transition-colors cursor-pointer"
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </button>
                <button
                  onClick={() => setIsMuted(!isMuted)}
                  className="hover:text-[#66c310] transition-colors cursor-pointer"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
                <span className="font-mono text-[11px]">
                  {Math.floor((progress / 100) * 120)}s / 120s
                </span>
              </div>

              {/* Speed Switcher */}
              <div className="flex items-center gap-1.5">
                {[0.75, 1.0, 1.25].map((spd) => (
                  <button
                    key={spd}
                    onClick={() => setPlaybackSpeed(spd)}
                    className={`px-2 py-0.5 rounded-md font-bold text-[11px] transition-colors cursor-pointer ${
                      playbackSpeed === spd
                        ? 'bg-[#66c310] text-[#0b2d22]'
                        : 'text-stone-300 hover:text-white'
                    }`}
                  >
                    {spd}x
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Video Information & Shadowing Practice Deck */}
        <div className="p-5 sm:p-7 space-y-6">
          <div className="space-y-2">
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              {video.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-300 leading-relaxed">
              {video.desc || video.keyTakeaway || "In this masterclass, discover Coach Nick's proven method to eliminate hesitation and speak English with crisp American cadence."}
            </p>
          </div>

          {/* Interactive Shadowing Practice Box */}
          <div className="p-5 rounded-2xl bg-[#0d382c] border border-[#237058] space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-black text-[#66c310] uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                {language === 'es' ? 'Frase Clave para Repetir en Voz Alta' : 'Key Phrase for Acoustic Shadowing'}
              </span>
              <span className="text-[10px] text-stone-400 font-mono">
                {video.duration}
              </span>
            </div>

            <p className="text-base sm:text-lg font-black text-white">
              &ldquo;{video.practicePhrase || subtitles[activeSubtitleIndex]}&rdquo;
            </p>

            <div className="flex flex-wrap items-center justify-between gap-3 pt-1">
              <button
                onClick={() => handleSpeakPhrase(video.practicePhrase || subtitles[activeSubtitleIndex])}
                className="px-5 py-2.5 rounded-full bg-[#66c310] hover:bg-[#54a50b] text-[#0b2d22] font-black text-xs flex items-center gap-2 transition-all cursor-pointer"
              >
                {isPracticingAudio ? (
                  <>
                    <Pause className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Pausar Pronunciación' : 'Pause Pronunciation'}</span>
                  </>
                ) : (
                  <>
                    <Volume2 className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Escuchar Modelo Acústico' : 'Listen to Acoustic Model'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center gap-3 text-xs text-stone-400 font-semibold">
                {video.views && <span>👁️ {video.views} learners watched</span>}
                {video.likes && <span className="text-rose-400">❤️ {video.likes} likes</span>}
              </div>
            </div>
          </div>

          {/* Call to Action Footer */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-3 border-t border-[#164c3c]">
            <span className="text-xs text-stone-300 text-center sm:text-left">
              {language === 'es' ? '¿Quieres feedback en vivo de tu pronunciación?' : 'Want personalized 1-on-1 feedback with Nick?'}
            </span>
            <button
              onClick={() => {
                onClose();
                if (onOpenBooking) onOpenBooking();
              }}
              className="w-full sm:w-auto px-6 py-3 rounded-full bg-[#164c3c] hover:bg-[#20634f] text-white font-bold text-xs border border-[#277a62] flex items-center justify-center gap-2 transition-all cursor-pointer"
            >
              <span>{language === 'es' ? 'Agendar Sesión Privada' : 'Book 1-on-1 Diagnostic Call'}</span>
              <Award className="w-3.5 h-3.5 text-[#66c310]" />
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
