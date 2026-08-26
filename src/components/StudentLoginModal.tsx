'use client';

import React, { useState } from 'react';
import { X, LogIn, Lock, Mail, ArrowRight, ShieldCheck, Sparkles, Flame, Play, Pause, CheckCircle2, Award, Calendar, BookOpen, Volume2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface StudentLoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const StudentLoginModal: React.FC<StudentLoginModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDemoUser, setIsDemoUser] = useState(false);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [activeLessonIndex, setActiveLessonIndex] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsDemoUser(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleDemoLogin = () => {
    setEmail('maria.gonzalez@example.com');
    setPassword('••••••••');
    setIsDemoUser(true);
    try {
      confetti({ particleCount: 40, spread: 50, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const studentLessons = [
    { title: "Day 14: Workplace Meeting Rescue Phrases", duration: "18 mins", completed: true },
    { title: "Day 15: Eliminating the Initial 'E' in S-Clusters", duration: "20 mins", completed: false },
    { title: "Day 16: Connected Speech & The Schwa /ə/ Drill", duration: "22 mins", completed: false },
    { title: "Day 17: American Intonation & Pitch Glides", duration: "19 mins", completed: false },
  ];

  const handlePlayLesson = (title: string) => {
    if ('speechSynthesis' in window) {
      if (isPlayingAudio) {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(false);
      } else {
        window.speechSynthesis.cancel();
        setIsPlayingAudio(true);
        const utterance = new SpeechSynthesisUtterance(`Starting audio workout: ${title}. Relax your shoulders, take a deep breath, and shadow each phrase.`);
        utterance.rate = 1.0;
        utterance.onend = () => setIsPlayingAudio(false);
        utterance.onerror = () => setIsPlayingAudio(false);
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
      <div className="w-[calc(100vw-1.5rem)] max-w-xl bg-white rounded-3xl border-2 border-stone-200 shadow-2xl p-5 sm:p-8 space-y-5 animate-in zoom-in-95 duration-150 relative max-h-[90vh] overflow-y-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {!isDemoUser ? (
          <div className="space-y-5">
            {/* Modal Header */}
            <div className="text-center space-y-2">
              <div className="w-14 h-14 rounded-2xl bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center mx-auto text-xl shadow-sm border border-[#164c3c]">
                N
              </div>
              <h3 className="text-2xl font-black text-[#0d382c]">
                {language === 'es' ? 'Portal del Estudiante' : 'Student Portal Login'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                {language === 'es'
                  ? 'Accede a tus cursos activos, audios diarios de 20 min y grabaciones de mentoría.'
                  : 'Access your active academy modules, 20-min daily audio workouts, and 1-on-1 coaching portal.'}
              </p>
            </div>

            {/* Quick Demo Student Button */}
            <button
              onClick={handleDemoLogin}
              className="w-full p-3 rounded-2xl bg-[#eefae8] hover:bg-[#ddf5cb] border-2 border-[#c4eeb0] text-[#0d382c] font-black text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer shadow-xs hover:scale-[1.01]"
            >
              <Sparkles className="w-4 h-4 text-[#66c310]" />
              <span>{language === 'es' ? '⚡ Probar Cuenta Demo de Estudiante (Acceso Inmediato)' : '⚡ Explore Student Dashboard Demo (Instant Access)'}</span>
            </button>

            <div className="relative flex py-1 items-center">
              <div className="flex-grow border-t border-stone-200"></div>
              <span className="flex-shrink mx-4 text-xs font-bold text-stone-400 uppercase">
                {language === 'es' ? 'O ingresa con tus credenciales' : 'Or with existing account'}
              </span>
              <div className="flex-grow border-t border-stone-200"></div>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3.5">
              <div className="space-y-1">
                <label className="text-xs font-bold text-stone-700">
                  {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                </label>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus-within:border-[#0d382c] focus-within:bg-white transition-all">
                  <Mail className="w-4 h-4 text-stone-400" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="student@company.com"
                    className="w-full bg-transparent text-xs sm:text-sm focus:outline-hidden"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-stone-700">
                    {language === 'es' ? 'Contraseña' : 'Password'}
                  </label>
                  <span className="text-[11px] text-[#0d382c] font-bold hover:underline cursor-pointer">
                    {language === 'es' ? '¿Olvidaste?' : 'Forgot?'}
                  </span>
                </div>
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus-within:border-[#0d382c] focus-within:bg-white transition-all">
                  <Lock className="w-4 h-4 text-stone-400" />
                  <input
                    type="password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full bg-transparent text-xs sm:text-sm focus:outline-hidden"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-4 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01]"
              >
                <span>{language === 'es' ? 'Ingresar a mi Cuenta' : 'Log In to Academy'}</span>
                <ArrowRight className="w-4 h-4 text-[#66c310]" />
              </button>
            </form>
          </div>
        ) : (
          /* Interactive Student Learning Dashboard */
          <div className="space-y-5 animate-in zoom-in-95 duration-150">
            {/* Dashboard Student Header */}
            <div className="flex items-center justify-between p-4 rounded-2xl bg-[#0d382c] text-white">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-[#164c3c] border-2 border-[#66c310] flex items-center justify-center font-black text-lg text-[#66c310]">
                  MG
                </div>
                <div>
                  <div className="font-extrabold text-sm flex items-center gap-1.5">
                    <span>Maria Gonzalez</span>
                    <span className="bg-[#66c310] text-[#0b2d22] text-[10px] px-2 py-0.5 rounded-full font-black">VIP Student</span>
                  </div>
                  <p className="text-xs text-stone-300">
                    20-Minute Commute Blueprint • Module 3
                  </p>
                </div>
              </div>

              {/* Streak Badge */}
              <div className="flex items-center gap-1.5 bg-[#164c3c] px-3 py-1.5 rounded-xl border border-[#277a62]">
                <Flame className="w-4 h-4 text-amber-400 fill-amber-400" />
                <span className="text-xs font-black text-white">14 Days</span>
              </div>
            </div>

            {/* Course Progress Bar */}
            <div className="p-4 rounded-2xl bg-[#fafafa] border border-stone-200 space-y-2">
              <div className="flex items-center justify-between text-xs font-bold text-stone-700">
                <span>Overall Blueprint Progress</span>
                <span className="text-[#0d382c] font-black">75% Completed (15/20)</span>
              </div>
              <div className="w-full bg-stone-200 h-2.5 rounded-full overflow-hidden">
                <div className="bg-[#66c310] h-full rounded-full" style={{ width: '75%' }} />
              </div>
            </div>

            {/* Daily Audio Workout Playlist */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-xs font-black text-[#0d382c] uppercase tracking-wider flex items-center gap-1.5">
                  <Volume2 className="w-4 h-4 text-[#66c310]" />
                  <span>{language === 'es' ? 'Tus Lecciones de Audio de Hoy' : 'Your Audio Workouts'}</span>
                </h4>
                <span className="text-[11px] text-stone-500 font-semibold">100% Hands-Free</span>
              </div>

              <div className="space-y-2">
                {studentLessons.map((les, idx) => (
                  <div
                    key={idx}
                    onClick={() => {
                      setActiveLessonIndex(idx);
                      handlePlayLesson(les.title);
                    }}
                    className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between gap-3 ${
                      activeLessonIndex === idx
                        ? 'bg-[#f4fbf0] border-[#66c310] shadow-xs'
                        : 'bg-white border-stone-200 hover:bg-stone-50'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        activeLessonIndex === idx ? 'bg-[#66c310] text-[#0b2d22]' : 'bg-stone-100 text-stone-700'
                      }`}>
                        {activeLessonIndex === idx && isPlayingAudio ? (
                          <Pause className="w-4 h-4 fill-current" />
                        ) : (
                          <Play className="w-4 h-4 fill-current ml-0.5" />
                        )}
                      </div>
                      <div>
                        <div className="text-xs font-bold text-stone-900">{les.title}</div>
                        <div className="text-[10px] text-stone-500">{les.duration} • Commute audio</div>
                      </div>
                    </div>

                    {les.completed ? (
                      <span className="text-[10px] font-bold text-[#0d382c] bg-[#eefae8] px-2 py-0.5 rounded-full border border-[#c4eeb0] flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3 text-[#66c310]" /> Done
                      </span>
                    ) : (
                      <span className="text-[10px] font-bold text-stone-500">Pending</span>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming 1-on-1 Call with Nick */}
            <div className="p-4 rounded-2xl bg-[#0d382c] text-white flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="p-2.5 rounded-xl bg-[#164c3c] text-[#66c310]">
                  <Calendar className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-xs font-black">Next 1-on-1 Live Call with Nick</div>
                  <p className="text-[11px] text-stone-300">Thursday @ 3:00 PM EST (Zoom)</p>
                </div>
              </div>
              <a
                href="https://zoom.us"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3.5 py-1.5 rounded-full bg-[#66c310] text-[#0b2d22] font-black text-xs hover:bg-[#58a80d] transition-colors"
              >
                Join
              </a>
            </div>

            <button
              onClick={() => {
                setIsDemoUser(false);
                onClose();
              }}
              className="w-full py-3 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer transition-colors"
            >
              Log Out / Close Dashboard
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
