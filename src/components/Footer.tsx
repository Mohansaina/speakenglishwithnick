'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { 
  InstagramIcon, 
  YoutubeIcon, 
  FacebookIcon, 
  TikTokIcon 
} from '@/components/icons/BrandIcons';
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

  return (
    <div className="w-full font-sans text-left">
      
      {/* 1. Pre-Footer Course Banner (Exact match to top half of screenshot) */}
      <section className="bg-[#e4ebf9] py-12 sm:py-16 border-b border-[#c8d4f0] relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 flex flex-col lg:flex-row items-center justify-between gap-10">
          
          {/* Left Column: Feature List & Coral-Red CTA Button */}
          <div className="space-y-6 max-w-xl text-stone-900">
            <ul className="space-y-3 text-sm sm:text-base font-semibold text-stone-800">
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#48529e] flex items-center justify-center text-[#48529e] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white stroke-[2.5]" />
                </div>
                <span>
                  {language === 'es'
                    ? 'Ejercicios interactivos con retroalimentación instantánea'
                    : 'Interactive exercises with instant feedback'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#48529e] flex items-center justify-center text-[#48529e] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white stroke-[2.5]" />
                </div>
                <span>
                  {language === 'es'
                    ? 'Lecciones adicionales para profundizar en el material'
                    : 'Extra lessons that dive deeper into the material'}
                </span>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full border-2 border-[#48529e] flex items-center justify-center text-[#48529e] shrink-0">
                  <CheckCircle2 className="w-3.5 h-3.5 fill-current text-white stroke-[2.5]" />
                </div>
                <span>
                  {language === 'es'
                    ? 'Ejercicios de examen final en el día 5'
                    : 'Final Exam exercises on Day 5'}
                </span>
              </li>
            </ul>

            {/* Coral-Red Pill Button (Exact match to screenshot) */}
            <button
              onClick={onOpenBooking}
              className="px-8 py-3.5 sm:py-4 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-extrabold text-sm sm:text-base shadow-md hover:shadow-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] cursor-pointer inline-flex items-center gap-2"
            >
              <span>
                {language === 'es' ? '¡Agendar Sesión 1 a 1!' : 'Book 1-on-1 Session!'}
              </span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Right Column: Floating Device Mockup showing 5-Day Challenge */}
          <div className="relative w-full max-w-md lg:max-w-lg flex justify-center">
            <div className="relative w-full aspect-[16/10] bg-[#1e244d] rounded-2xl overflow-hidden shadow-2xl border-4 border-stone-800 flex items-center justify-center group">
              <Image
                src="/nick-hero.jpg"
                alt="1-on-1 English Coaching with Coach Nick"
                width={600}
                height={380}
                className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1e244d]/90 via-[#1e244d]/40 to-transparent flex flex-col justify-end p-6 text-white text-left">
                <span className="px-3 py-1 rounded-md bg-[#f15555] text-white text-xs font-black uppercase tracking-wider self-start mb-2">
                  {language === 'es' ? 'Clases 1 a 1' : '1-on-1 Coaching'}
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white leading-tight">
                  {language === 'es' ? 'APRENDE CON TEACHER NICK' : 'LEARN WITH TEACHER NICK'}
                </h3>
                <p className="text-xs text-stone-300 font-medium mt-1">
                  {language === 'es' ? 'Inglés Americano Natural y Fluidez Real' : 'Master Natural American English & Real Fluency'}
                </p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 2. Main Blue Footer (Exact match to bottom half of screenshot) */}
      <footer className="bg-[#48529e] text-white pt-16 sm:pt-20 pb-10 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
          
          {/* Main Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 sm:gap-14 pb-16 items-start">
            
            {/* Left Column: Big Brand Logo, Tagline, Email & Social Icons */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8">
              
              {/* English with Lucy Style Exact Logo Layout */}
              <Link href="/" className="inline-flex flex-col items-start group">
                <div className="flex items-baseline gap-1 font-black text-white text-3xl sm:text-4xl lg:text-5xl tracking-tight leading-none">
                  <span>Speak English</span>
                </div>
                <div className="font-serif italic font-normal text-white text-2xl sm:text-3xl lg:text-4xl leading-none mt-1 pl-6 sm:pl-8">
                  with Nick
                </div>
              </Link>

              {/* Tagline */}
              <div className="space-y-2">
                <p className="text-sm sm:text-base text-white/90 font-medium max-w-md leading-relaxed">
                  {language === 'es'
                    ? 'Inglés Americano Natural, estés donde estés.'
                    : 'Natural American English, wherever you are.'}
                </p>

                {/* Email Support Badge */}
                <div className="pt-1">
                  <a
                    href="mailto:speakenglishwithnick@gmail.com"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-3.5 py-1.5 rounded-full border border-white/20 transition-all hover:border-white cursor-pointer"
                  >
                    <Mail className="w-3.5 h-3.5 text-[#f15555]" />
                    <span>speakenglishwithnick@gmail.com</span>
                  </a>
                </div>
              </div>

              {/* Minimalist Line Art Social Icons (Matching screenshot line style) */}
              <div className="flex items-center gap-4 pt-2 text-white">
                <a
                  href="https://www.youtube.com/@speakenglishwithnick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="YouTube"
                >
                  <YoutubeIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Instagram"
                >
                  <InstagramIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://www.tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="TikTok"
                >
                  <TikTokIcon className="w-4 h-4 fill-current" />
                </a>
                <a
                  href="https://www.facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg border border-white/40 hover:border-white hover:bg-white/10 transition-all cursor-pointer"
                  aria-label="Facebook"
                >
                  <FacebookIcon className="w-4 h-4 fill-current" />
                </a>
              </div>

            </div>

            {/* Right Column: Explore & Legal Links */}
            <div className="lg:col-span-5 grid grid-cols-2 gap-8 sm:gap-12 lg:pl-6">
              
              {/* Explore Column */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-extrabold text-white text-lg sm:text-xl tracking-tight mb-4">
                  {language === 'es' ? 'Explorar' : 'Explore'}
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-white/85 font-medium">
                  <li>
                    <a href="#popular-lessons" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Lecciones' : 'Lessons'}
                    </a>
                  </li>
                  <li>
                    <a href="#about" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Acerca de' : 'About'}
                    </a>
                  </li>
                  <li>
                    <a href="#programs" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Cursos' : 'Courses'}
                    </a>
                  </li>
                  <li>
                    <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-left cursor-pointer">
                      {language === 'es' ? 'Test de nivel' : 'Level test'}
                    </button>
                  </li>
                </ul>
              </div>

              {/* Legal Column */}
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-extrabold text-white text-lg sm:text-xl tracking-tight mb-4">
                  {language === 'es' ? 'Legal' : 'Legal'}
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-white/85 font-medium">
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Política de uso aceptable' : 'Acceptable use policy'}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Términos de uso' : 'Terms of use'}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Política de privacidad' : 'Privacy Policy'}
                    </a>
                  </li>
                </ul>
              </div>

            </div>

          </div>

          {/* Bottom Copyright & Attribution Bar */}
          <div className="pt-8 sm:pt-10 border-t border-white/20 text-center space-y-2 text-xs sm:text-sm text-white/90 font-medium">
            <p>© {new Date().getFullYear()} All Rights Reserved.</p>
            <p className="text-white/75 text-xs">
              Created with ❤️ by <span className="font-semibold text-white">Convert Impact</span>
            </p>
          </div>

        </div>
      </footer>

    </div>
  );
};
