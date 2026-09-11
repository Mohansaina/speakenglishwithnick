'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Search, ArrowRight, BookOpen, Headphones, Shield, Video, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { USAFlag, SpainFlag } from '@/components/icons/FlagIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { handleSmartEmailClick, getSmartEmailUrls } from '@/utils/emailClient';

interface NavbarProps {
  onOpenQuiz: () => void;
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
  onOpenSearch: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  onOpenQuiz,
  onOpenBooking,
  onOpenLeadMagnet,
  onOpenSearch,
}) => {
  const { language, setLanguage } = useLanguage();
  const t = translations[language].nav;
  const emailUrls = getSmartEmailUrls();
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [lessonsDropdown, setLessonsDropdown] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 15);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-300 ease-out border-b border-stone-200/80 ${
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2 sm:py-2.5 bg-white/98' : 'py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* 1. Left: Official Brand Logo (Nick Avatar + Text) */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden border-2 border-[#48529e] shadow-xs shrink-0 ring-2 ring-[#48529e]/30">
            <Image
              src="/nick.png"
              alt="Teacher Nick"
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover object-top transition-transform group-hover:scale-105"
            />
          </div>
          <div className="font-black text-[#18181b] tracking-tight text-xs sm:text-base leading-tight flex items-center gap-1">
            <span>Speak English</span>
            <span className="hidden min-[380px]:inline font-serif italic font-normal text-[#48529e]">with Nick</span>
          </div>
        </Link>

        {/* 2. Middle: English & Español Switcher Box */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                language === 'en'
                  ? 'bg-[#48529e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <USAFlag className="w-5 h-3.5" />
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-2 ${
                language === 'es'
                  ? 'bg-[#48529e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <SpainFlag className="w-5 h-3.5" />
              <span>Español</span>
            </button>
          </div>
        </div>

        {/* 3. Right: Exact Reference Navigation Menu + Social Icons */}
        <div className="hidden lg:flex items-center gap-6">
          
          <nav className="flex items-center gap-6 text-sm sm:text-[15px] font-bold text-stone-900">
            {/* Home with active golden underline (just like Vanessa's site) */}
            <Link
              href="/"
              className="relative py-1 font-extrabold text-stone-950 hover:text-amber-600 transition-colors after:content-[''] after:absolute after:bottom-0 after:left-0 after:right-0 after:h-0.5 after:bg-amber-500"
            >
              {language === 'es' ? 'Inicio' : 'Home'}
            </Link>

            {/* English Courses Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setCoursesDropdown(true)}
              onMouseLeave={() => setCoursesDropdown(false)}
            >
              <button className="flex items-center gap-1 py-1 hover:text-amber-600 transition-colors cursor-pointer font-bold">
                <span>{language === 'es' ? 'Cursos de Inglés' : 'English Courses'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${coursesDropdown ? 'rotate-180 text-amber-600' : 'text-stone-400'}`} />
              </button>

              {coursesDropdown && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-2xl space-y-1">
                    <a
                      href="#programs"
                      onClick={() => setCoursesDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/60 text-stone-800 hover:text-amber-900 transition-colors"
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#e4ebf9]/60 text-stone-800 hover:text-[#48529e] transition-colors"
                    >
                      <Headphones className="w-4 h-4 text-amber-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{language === 'es' ? 'Método 20 Minutos al Día' : '20-Min Daily Commute'}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? 'Audio diario paso a paso' : 'Hands-free daily audio'}</div>
                      </div>
                    </a>
                    <button
                      onClick={() => {
                        setCoursesDropdown(false);
                        onOpenBooking();
                      }}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#e4ebf9]/60 text-stone-800 hover:text-[#48529e] transition-colors cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-[#48529e] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{language === 'es' ? 'Mentoría VIP 1 a 1' : '1-on-1 VIP Mentorship'}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? 'Sesiones privadas con Nick' : 'Live private sessions'}</div>
                      </div>
                    </button>
                    <a
                      href="#programs"
                      onClick={() => setCoursesDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#e4ebf9]/60 text-stone-800 hover:text-[#48529e] transition-colors"
                    >
                      <Video className="w-4 h-4 text-[#48529e] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{language === 'es' ? 'Masterclass de Conversación' : 'Conversation Vault'}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? '60+ lecciones en video' : '60+ HD video lessons'}</div>
                      </div>
                    </a>
                  </div>
                </div>
              )}
            </div>

            {/* Free Lessons Dropdown */}
            <div
              className="relative"
              onMouseEnter={() => setLessonsDropdown(true)}
              onMouseLeave={() => setLessonsDropdown(false)}
            >
              <button className="flex items-center gap-1 py-1 hover:text-[#48529e] transition-colors cursor-pointer font-bold">
                <span>{language === 'es' ? 'Lecciones Gratis' : 'Free Lessons'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${lessonsDropdown ? 'rotate-180 text-[#48529e]' : 'text-stone-400'}`} />
              </button>

              {lessonsDropdown && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-2xl space-y-1">
                    <a
                      href="#drills"
                      onClick={() => setLessonsDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#48529e] transition-colors"
                    >
                      <Headphones className="w-4 h-4 text-[#f15555] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{t.drills}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? 'Estudio de audio interactivo' : 'Interactive audio studio'}</div>
                      </div>
                    </a>
                    <a
                      href="#spanish-hub"
                      onClick={() => setLessonsDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#e4ebf9] text-[#48529e] transition-colors font-semibold"
                    >
                      <BookOpen className="w-4 h-4 text-[#48529e] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{t.spanishGuide}</div>
                        <div className="text-[11px] text-stone-600 font-normal">Fix 4 Spanish accent traps</div>
                      </div>
                    </a>
                    <button
                      onClick={() => {
                        setLessonsDropdown(false);
                        onOpenQuiz();
                      }}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#48529e] transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#48529e] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{language === 'es' ? 'Test de Diagnóstico' : 'Fluency Diagnostic'}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? 'Prueba tu nivel en 2 min' : 'Test your level in 2 mins'}</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={onOpenBooking}
              className="py-1 hover:text-[#48529e] transition-colors cursor-pointer font-bold"
            >
              {language === 'es' ? 'Contacto' : 'Contact'}
            </button>
          </nav>

          {/* Social Icons row (YouTube, Instagram, Facebook, Twitter) - exactly like reference */}
          {/* Social / Email Links (Only Instagram & Email) */}
          <div className="flex items-center gap-2.5 text-stone-900">
            <a
              href="https://www.instagram.com/speak.english.with.nick/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-stone-700 hover:text-[#48529e] hover:bg-[#e4ebf9]/60 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href={emailUrls.gmailWebUrl}
              onClick={(e) => handleSmartEmailClick(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="p-1.5 rounded-lg text-stone-700 hover:text-[#f15555] hover:bg-stone-100 transition-colors"
              title="Email Teacher Nick"
            >
              <Mail className="w-4 h-4 text-[#f15555]" />
            </a>
          </div>

          {/* Quick Search */}
          <button
            onClick={onOpenSearch}
            className="p-2 rounded-full hover:bg-stone-100 text-stone-700 hover:text-black transition-colors cursor-pointer"
            title="Search"
          >
            <Search className="w-4 h-4" />
          </button>

        </div>

        {/* Mobile Header: Search, Language Switcher & Hamburger Toggle */}
        <div className="flex lg:hidden items-center gap-1 sm:gap-2 shrink-0">
          {/* Quick Search on mobile header */}
          <button
            onClick={onOpenSearch}
            className="p-1.5 rounded-xl text-stone-700 hover:bg-stone-100 transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Mobile Language Toggle with Full Names & SVG Flags */}
          <div className="flex items-center p-0.5 rounded-xl bg-stone-100 border border-stone-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-[#48529e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <USAFlag className="w-4 h-3" />
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-lg text-[11px] font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'es'
                  ? 'bg-[#48529e] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <SpainFlag className="w-4 h-3" />
              <span>Español</span>
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-900 transition-colors cursor-pointer active:scale-95 shrink-0"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#48529e]" /> : <Menu className="w-5 h-5 text-[#48529e]" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-stone-200 bg-white px-4 py-5 space-y-4 animate-in slide-in-from-top-3 duration-200 shadow-2xl max-h-[85vh] overflow-y-auto touch-scroll">
          
          {/* Language Selector inside mobile drawer */}
          <div className="flex items-center justify-between p-2 rounded-2xl bg-stone-100 border border-stone-200">
            <span className="text-xs font-bold text-stone-600 pl-2">
              {language === 'es' ? 'Idioma / Language:' : 'Language / Idioma:'}
            </span>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setLanguage('en')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === 'en' ? 'bg-[#48529e] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <USAFlag className="w-4 h-3" />
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === 'es' ? 'bg-[#48529e] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <SpainFlag className="w-4 h-3" />
                <span>Español</span>
              </button>
            </div>
          </div>
          
          {/* Quick Search bar in mobile drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-500 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
          >
            <span>{language === 'es' ? 'Buscar lecciones, sonidos, acento...' : 'Search drills, sounds, lessons...'}</span>
            <Search className="w-4 h-4 text-stone-400" />
          </button>

          <nav className="flex flex-col space-y-1 text-sm font-bold text-stone-800">
            <Link
              href="/"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-stone-50 text-[#48529e] flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
            </Link>

            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-stone-50 text-stone-800 flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Cursos y Programas 1 a 1' : '1-on-1 Programs & Classes'}</span>
              <span className="text-[10px] uppercase font-black text-[#48529e] bg-[#e4ebf9] px-2 py-0.5 rounded-md border border-[#c2d4f8]">
                {language === 'es' ? 'Populares' : 'Popular'}
              </span>
            </a>

            <a
              href="#spanish-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#e4ebf9] text-[#48529e] font-black flex items-center justify-between"
            >
              <span>{t.spanishGuide}</span>
              <span className="w-2 h-2 rounded-full bg-[#f15555]"></span>
            </a>

            <a
              href="#drills"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-stone-50 text-stone-800 flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Estudio de Práctica de Audio' : 'Audio Practice Studio'}</span>
            </a>

            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="p-3 rounded-xl hover:bg-stone-50 text-stone-800 text-left cursor-pointer flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Test de Diagnóstico de Fluidez' : 'Fluency Diagnostic Quiz'}</span>
            </button>

            <a
              href="#faq"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-stone-50 text-stone-800 flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}</span>
            </a>
          </nav>

          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full py-4 rounded-2xl bg-[#f15555] hover:bg-[#d01f1f] text-white font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
            >
              <span>{language === 'es' ? 'Agendar Sesión 1 a 1 con Nick' : 'Book 1-on-1 Session with Nick'}</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>

          {/* Social icons in mobile drawer */}
          <div className="pt-3 border-t border-stone-200 flex items-center justify-center gap-4 text-stone-600">
            <a
              href="https://www.youtube.com/@speakenglishwithnick"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-100 text-stone-700 hover:text-red-600 transition-colors"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/speak.english.with.nick/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="p-2 rounded-full bg-stone-100 text-stone-700 hover:text-pink-600 transition-colors"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
          </div>

        </div>
      )}
    </header>
  );
};


