'use client';

import React, { useState } from 'react';
import { ArrowRight, Mail, CheckCircle2, ShieldCheck, Heart, MessageCircle, Calendar, Sparkles } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TikTokIcon } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/context/LanguageContext';

interface FooterProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
  onOpenLogin: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onOpenQuiz,
  onOpenBooking,
  onOpenLeadMagnet,
  onOpenLogin,
}) => {
  const { language } = useLanguage();
  const [emailSub, setEmailSub] = useState('');
  const [subSuccess, setSubSuccess] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (emailSub.trim()) {
      setSubSuccess(true);
      setTimeout(() => setSubSuccess(false), 5000);
      setEmailSub('');
    }
  };

  return (
    <footer className="bg-[#07221a] text-stone-300 relative overflow-hidden border-t border-[#144737] pt-14 sm:pt-18">
      
      {/* Top Ambient Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px] bg-[#62c110]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

        {/* Main Footer Links & Information */}
        <div className="py-10 sm:py-18 grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 border-b border-[#144737]">
          
          {/* Brand Column (5 Cols) */}
          <div className="md:col-span-5 space-y-4 sm:space-y-5 text-left">
            <div className="space-y-2">
              <div className="font-black text-white tracking-tight text-2xl sm:text-3xl flex items-center gap-2">
                <span>Speak English</span>
                <span className="font-serif italic font-normal text-[#62c110]">with Nick</span>
                <span className="w-2 h-2 rounded-full bg-[#62c110]" />
              </div>
              <p className="text-xs sm:text-sm text-stone-400 font-normal leading-relaxed max-w-sm">
                {language === 'es'
                  ? 'Entrenamiento práctico de pronunciación, acento americano y confianza al hablar para hispanohablantes y profesionales de todo el mundo.'
                  : 'Practical acoustic pronunciation, American rhythm, and speaking confidence for motivated learners worldwide.'}
              </p>
            </div>

            {/* Newsletter Input */}
            <div className="space-y-2 max-w-sm">
              <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider block">
                {language === 'es' ? 'Recibe tips de pronunciación semanales' : 'Get weekly speaking tips'}
              </span>
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row items-stretch sm:items-center bg-[#051913] border border-[#164c3c] rounded-2xl sm:rounded-full p-1.5 sm:p-1 focus-within:border-[#62c110] transition-colors shadow-inner gap-1.5 sm:gap-0">
                <input
                  type="email"
                  required
                  value={emailSub}
                  onChange={(e) => setEmailSub(e.target.value)}
                  placeholder={language === 'es' ? 'Tu correo electrónico...' : 'Your email address...'}
                  className="w-full bg-transparent px-3 py-2 text-xs text-white placeholder-stone-500 focus:outline-none"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 sm:py-2 rounded-xl sm:rounded-full bg-[#62c110] hover:bg-[#82e635] text-[#07221a] font-black text-xs transition-all shrink-0 cursor-pointer shadow-xs active:scale-95"
                >
                  {language === 'es' ? 'Unirme' : 'Join'}
                </button>
              </form>
              {subSuccess && (
                <p className="text-xs text-[#82e635] font-bold animate-in fade-in flex items-center gap-1.5 pt-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{language === 'es' ? '¡Suscrito con éxito!' : 'Subscribed successfully!'}</span>
                </p>
              )}
            </div>

            {/* Social Pills */}
            <div className="flex flex-wrap items-center gap-2 pt-1">
              <a
                href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#0b3327] hover:bg-[#164c3c] border border-[#1a5a47] text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
                <span>Instagram</span>
              </a>
              <a
                href="https://www.youtube.com/@speakenglishwithnick"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#0b3327] hover:bg-[#164c3c] border border-[#1a5a47] text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <YoutubeIcon className="w-3.5 h-3.5 text-red-500" />
                <span>YouTube</span>
              </a>
              <a
                href="https://www.facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#0b3327] hover:bg-[#164c3c] border border-[#1a5a47] text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <FacebookIcon className="w-3.5 h-3.5 text-blue-400" />
                <span>Facebook</span>
              </a>
              <a
                href="https://www.tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-1.5 rounded-full bg-[#0b3327] hover:bg-[#164c3c] border border-[#1a5a47] text-stone-200 text-xs font-bold flex items-center gap-1.5 transition-all"
              >
                <TikTokIcon className="w-3.5 h-3.5 text-stone-300" />
                <span>TikTok</span>
              </a>
            </div>
          </div>

          {/* Navigation Columns (7 Cols) */}
          <div className="md:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-6 sm:gap-8">
            
            {/* Col 1: Learning Focus */}
            <div className="space-y-4 text-left">
              <h4 className="font-black text-white text-xs uppercase tracking-wider text-[#62c110]">
                {language === 'es' ? 'Programas' : 'Learning Focus'}
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-normal">
                <li>
                  <button onClick={onOpenBooking} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Inglés desde 0' : 'Start English from 0'}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenBooking} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Inglés Específico' : 'Specific English'}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenBooking} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice'}
                  </button>
                </li>
                <li>
                  <button onClick={onOpenBooking} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Mentoría 1 a 1' : '1-on-1 Mentorship'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 2: Free Content */}
            <div className="space-y-4 text-left">
              <h4 className="font-black text-white text-xs uppercase tracking-wider text-[#62c110]">
                {language === 'es' ? 'Contenido Gratis' : 'Free Lessons'}
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-normal">
                <li>
                  <a href="#popular-lessons" className="hover:text-white hover:underline transition-colors">
                    {language === 'es' ? 'Reels en Instagram' : 'Instagram Reels'}
                  </a>
                </li>
                <li>
                  <a href="#spanish-hub" className="hover:text-white hover:underline transition-colors">
                    {language === 'es' ? 'Sección Hispanohablantes' : 'Spanish Speakers Hub'}
                  </a>
                </li>
                <li>
                  <a href="#drills" className="hover:text-white hover:underline transition-colors">
                    {language === 'es' ? 'Laboratorio de Audio' : 'Audio Practice Lab'}
                  </a>
                </li>
                <li>
                  <button onClick={onOpenQuiz} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Test de Fluidez' : 'Fluency Quiz'}
                  </button>
                </li>
              </ul>
            </div>

            {/* Col 3: About & Support */}
            <div className="space-y-4 text-left col-span-2 sm:col-span-1">
              <h4 className="font-black text-white text-xs uppercase tracking-wider text-[#62c110]">
                {language === 'es' ? 'Información' : 'About & Help'}
              </h4>
              <ul className="space-y-3 text-xs sm:text-sm text-stone-300 font-normal">
                <li>
                  <a href="#about" className="hover:text-white hover:underline transition-colors">
                    {language === 'es' ? 'Sobre Teacher Nick' : 'About Teacher Nick'}
                  </a>
                </li>
                <li>
                  <a href="#faq" className="hover:text-white hover:underline transition-colors">
                    {language === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
                  </a>
                </li>
                <li>
                  <button onClick={onOpenBooking} className="hover:text-white hover:underline transition-colors text-left cursor-pointer">
                    {language === 'es' ? 'Horarios y Agenda' : 'Schedule & Booking'}
                  </button>
                </li>
                <li>
                  <a href="mailto:Speakenglishwithnick@gmail.com" className="hover:text-white hover:underline transition-colors flex items-center gap-1.5 text-stone-200">
                    <Mail className="w-3.5 h-3.5 text-[#62c110]" />
                    <span>Speakenglishwithnick@gmail.com</span>
                  </a>
                </li>
                <li>
                  <button onClick={onOpenLogin} className="hover:text-white hover:underline transition-colors text-left cursor-pointer font-bold text-[#82e635]">
                    {language === 'es' ? 'Portal de Alumnos ➔' : 'Student Portal ➔'}
                  </button>
                </li>
              </ul>
            </div>

          </div>

        </div>

        {/* Bottom Copyright & Security */}
        <div className="py-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-400 font-medium">
          <div className="flex items-center gap-2 text-stone-400">
            <ShieldCheck className="w-4 h-4 text-[#62c110]" />
            <span>© {new Date().getFullYear()} Speak English with Nick • Native USA English Instruction</span>
          </div>

          <div className="flex items-center gap-4 text-stone-400">
            <span className="hover:text-white transition-colors cursor-pointer">Privacy Policy</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Terms of Service</span>
            <span>•</span>
            <span className="hover:text-white transition-colors cursor-pointer">Student Code of Conduct</span>
          </div>
        </div>

      </div>
    </footer>
  );
};



