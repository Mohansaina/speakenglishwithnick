'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Globe, 
  ChevronDown, 
  Mail, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  Calendar,
  Lock,
  Headphones
} from 'lucide-react';
import { 
  InstagramIcon, 
  YoutubeIcon, 
  FacebookIcon, 
  TikTokIcon, 
  TwitterIcon 
} from '@/components/icons/BrandIcons';
import { USAFlag, SpainFlag } from '@/components/icons/FlagIcons';
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
  const { language, setLanguage } = useLanguage();

  return (
    <footer className="bg-[#111111] text-stone-300 pt-16 pb-12 border-t border-stone-800 text-left font-sans">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* 6-Column Navigation Grid (Exact GoDaddy Layout) */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 sm:gap-10 pb-16">
          
          {/* Col 1: About Coach Nick */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Sobre Coach Nick' : 'About Coach Nick'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Biografía de Nick' : 'About Us'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Método 5 Idiomas' : '5-Language Method'}
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Sesión de Estrategia' : 'Strategy Session'}
                </button>
              </li>
              <li>
                <a href="mailto:Speakenglishwithnick@gmail.com" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Contacto Directo' : 'Contact Coach Nick'}
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Historias de Alumnos' : 'Student Breakthroughs'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Centro de Confianza' : 'Trust Center'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Programs & Coaching */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Programas' : 'Programs & Coaching'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Inglés desde 0' : 'English from 0'}
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Inglés Específico' : 'Specific English'}
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Práctica Conversación' : 'Conversation Practice'}
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Mentoría VIP 1 a 1' : '1-on-1 VIP Mentorship'}
                </button>
              </li>
              <li>
                <a href="#intake-form" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Plan de 5 Días' : '5-Day WhatsApp Routine'}
                </a>
              </li>
              <li>
                <a href="#programs" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Garantía de 30 Días' : '30-Day Guarantee'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Resources & Audio */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Recursos Gratis' : 'Resources & Drills'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <a href="#drills" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Estudio de Sonidos' : 'Sound Practice Lab'}
                </a>
              </li>
              <li>
                <button onClick={onOpenLeadMagnet} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Guía de Acento (PDF)' : 'Accent Cheat Sheet'}
                </button>
              </li>
              <li>
                <a href="#spanish-hub" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Hub Hispanohablantes' : 'Spanish Accent Traps'}
                </a>
              </li>
              <li>
                <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Test de Diagnóstico' : 'Fluency Quiz'}
                </button>
              </li>
              <li>
                <a href="#intake-form" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Calculadora de Fluidez' : 'Fluency Ratio Tool'}
                </a>
              </li>
              <li>
                <a href="#popular-lessons" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Lecciones en Video' : 'Video Masterclasses'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 4: Community & Socials */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Comunidad' : 'Community & Media'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <a href="https://www.youtube.com/@speakenglishwithnick" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  YouTube (@speakenglishwithnick)
                </a>
              </li>
              <li>
                <a href="https://www.instagram.com/speak.english.with.nick/?hl=en" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Instagram (@speak.english.with.nick)
                </a>
              </li>
              <li>
                <a href="https://www.tiktok.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  TikTok Channel
                </a>
              </li>
              <li>
                <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  Facebook Speaking Group
                </a>
              </li>
              <li>
                <a href="#transformation" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Testimonios Reales' : 'Student Success Stories'}
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Práctica por WhatsApp' : 'WhatsApp Daily Voice'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 5: Account & Portal */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Mi Cuenta' : 'Student Account'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition-colors text-left cursor-pointer flex items-center gap-1.5 font-bold text-[#82e635]">
                  <Lock className="w-3.5 h-3.5 text-[#62c110]" />
                  <span>{language === 'es' ? 'Ingresar al Portal' : 'Sign In to Portal'}</span>
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Cuenta Demo de Alumno' : 'Student Demo Login'}
                </button>
              </li>
              <li>
                <button onClick={onOpenLogin} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Audios de 20 Minutos' : 'Daily 20-Min Audio'}
                </button>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Crear Nueva Cuenta' : 'Enroll in Academy'}
                </button>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Soporte de Acceso' : 'Portal Support'}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 6: Support & Contact */}
          <div className="space-y-4">
            <h4 className="font-bold text-white text-sm sm:text-base tracking-tight">
              {language === 'es' ? 'Ayuda y Contacto' : 'Help & Contact'}
            </h4>
            <ul className="space-y-2.5 text-xs sm:text-[13px] text-stone-400 font-normal">
              <li>
                <a href="mailto:Speakenglishwithnick@gmail.com" className="hover:text-white transition-colors flex items-center gap-1 text-stone-300">
                  <Mail className="w-3.5 h-3.5 text-[#62c110] shrink-0" />
                  <span className="truncate">Speakenglishwithnick@gmail.com</span>
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-white transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Agendar Llamada 1 a 1' : 'Book 1-on-1 Strategy Call'}
                </button>
              </li>
              <li>
                <a href="https://wa.me/" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Atención por WhatsApp' : 'WhatsApp Support'}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Preguntas Frecuentes' : 'FAQ & Knowledge Base'}
                </a>
              </li>
              <li>
                <a href="#intake-form" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Enviar Diagnóstico' : 'Submit Diagnostic'}
                </a>
              </li>
              <li>
                <a href="#about" className="hover:text-white transition-colors">
                  {language === 'es' ? 'Horarios Disponibles' : 'Class Availability'}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Divider & Brand Bar (GoDaddy Style Logo, Language Toggle, and Social Icons) */}
        <div className="pt-8 pb-10 border-t border-stone-800 flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Left: Brand Logo + Region Selector */}
          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
            
            {/* Logo */}
            <Link href="/" className="flex items-center gap-2.5 shrink-0 group">
              <div className="relative h-9 w-9 rounded-full overflow-hidden border border-stone-600 shadow-xs shrink-0 ring-2 ring-[#62c110]/30">
                <Image
                  src="/nick.png"
                  alt="Coach Nick"
                  width={40}
                  height={40}
                  className="h-full w-full object-cover object-top transition-transform group-hover:scale-105"
                />
              </div>
              <div className="flex items-center gap-1.5 font-bold text-white text-lg tracking-tight">
                <span>Speak English</span>
                <span className="font-serif italic font-normal text-[#82e635]">with Nick</span>
              </div>
            </Link>

            {/* Region / Language Dropdown button */}
            <div className="flex items-center gap-2">
              <div className="flex items-center p-1 rounded-xl bg-stone-900 border border-stone-700 text-xs">
                <button
                  type="button"
                  onClick={() => setLanguage('en')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    language === 'en'
                      ? 'bg-stone-800 text-white shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <USAFlag className="w-4 h-3" />
                  <span>English</span>
                </button>
                <button
                  type="button"
                  onClick={() => setLanguage('es')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all cursor-pointer flex items-center gap-2 ${
                    language === 'es'
                      ? 'bg-stone-800 text-[#82e635] shadow-xs'
                      : 'text-stone-400 hover:text-white'
                  }`}
                >
                  <SpainFlag className="w-4 h-3" />
                  <span>Español</span>
                </button>
              </div>

              <div className="hidden sm:flex items-center gap-1 text-xs text-stone-400 bg-stone-900 border border-stone-700 px-3 py-1.5 rounded-xl font-medium">
                <Globe className="w-3.5 h-3.5 text-stone-400" />
                <span>Global • USD ($)</span>
              </div>
            </div>

          </div>

          {/* Right: Social Media Icons Row */}
          <div className="flex items-center gap-4 text-stone-300">
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:text-blue-400 transition-all hover:scale-110"
              aria-label="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/speak.english.with.nick/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:text-pink-400 transition-all hover:scale-110"
              aria-label="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:text-stone-100 transition-all hover:scale-110"
              aria-label="TikTok"
            >
              <TikTokIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:text-sky-400 transition-all hover:scale-110"
              aria-label="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.youtube.com/@speakenglishwithnick"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-900 hover:bg-stone-800 border border-stone-700 hover:text-red-500 transition-all hover:scale-110"
              aria-label="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
          </div>

        </div>

        {/* Legal & Copyright Section (GoDaddy Style) */}
        <div className="pt-8 border-t border-stone-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 text-[11px] sm:text-xs text-stone-500">
          
          <div className="space-y-1 max-w-2xl">
            <p className="text-stone-400">
              Copyright © 1999 - {new Date().getFullYear()} Speak English with Nick, LLC. All Rights Reserved. The Coach Nick word mark is a registered trademark of Speak English with Nick, LLC in the US and other countries.
            </p>
            <p className="text-stone-500">
              Use of this Site is subject to express terms of use. By using this site, you signify that you agree to be bound by these Universal Terms of Service.
            </p>
          </div>

          {/* Legal Links List */}
          <div className="flex flex-wrap items-center gap-4 text-stone-400 font-medium shrink-0">
            <a href="#faq" className="hover:text-white transition-colors">Legal</a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">Privacy Policy</a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">Terms of Service</a>
            <span>•</span>
            <a href="#faq" className="hover:text-white transition-colors">Cookies</a>
            <span>•</span>
            <a href="mailto:Speakenglishwithnick@gmail.com" className="hover:text-white transition-colors">Do not sell my personal information</a>
          </div>

        </div>

      </div>
    </footer>
  );
};
