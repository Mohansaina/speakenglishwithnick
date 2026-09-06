'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, ChevronDown, Search, ArrowRight, BookOpen, Headphones, Shield, Video } from 'lucide-react';
import { InstagramIcon, YoutubeIcon, FacebookIcon, TwitterIcon } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

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
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [coursesDropdown, setCoursesDropdown] = useState(false);
  const [lessonsDropdown, setLessonsDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 15);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 bg-white transition-all duration-200 border-b border-stone-200 ${
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-2 sm:py-2.5' : 'py-2.5 sm:py-3.5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-2.5 sm:px-6 lg:px-8 flex items-center justify-between gap-1.5 sm:gap-4">
        
        {/* 1. Left: Official Brand Logo (Nick Avatar + Text) */}
        <Link href="/" className="flex items-center gap-2 shrink-0 group">
          <div className="relative h-9 w-9 sm:h-11 sm:w-11 rounded-full overflow-hidden border-2 border-[#164c3c] shadow-xs shrink-0 ring-2 ring-[#62c110]/40">
            <Image
              src="/nick.png"
              alt="Coach Nick"
              width={48}
              height={48}
              priority
              className="h-full w-full object-cover object-top transition-transform group-hover:scale-105"
            />
          </div>
          <div className="font-black text-[#07221a] tracking-tight text-xs sm:text-base leading-tight flex items-center gap-1">
            <span>Speak English</span>
            <span className="hidden min-[380px]:inline font-serif italic font-normal text-[#164c3c]">with Nick</span>
          </div>
        </Link>

        {/* 2. Middle: English & Español Switcher Box */}
        <div className="hidden md:flex items-center justify-center">
          <div className="flex items-center p-1 rounded-2xl bg-stone-100 border border-stone-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-[#07221a] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'es'
                  ? 'bg-[#07221a] text-[#82e635] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <span>🇪🇸</span>
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
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/60 text-stone-800 hover:text-amber-900 transition-colors cursor-pointer"
                    >
                      <Shield className="w-4 h-4 text-[#07221a] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{language === 'es' ? 'Mentoría VIP 1 a 1' : '1-on-1 VIP Mentorship'}</div>
                        <div className="text-[11px] text-stone-500 font-normal">{language === 'es' ? 'Sesiones privadas con Nick' : 'Live private coaching'}</div>
                      </div>
                    </button>
                    <a
                      href="#programs"
                      onClick={() => setCoursesDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-amber-50/60 text-stone-800 hover:text-amber-900 transition-colors"
                    >
                      <Video className="w-4 h-4 text-[#07221a] mt-0.5 shrink-0" />
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
              <button className="flex items-center gap-1 py-1 hover:text-amber-600 transition-colors cursor-pointer font-bold">
                <span>{language === 'es' ? 'Lecciones Gratis' : 'Free Lessons'}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${lessonsDropdown ? 'rotate-180 text-amber-600' : 'text-stone-400'}`} />
              </button>

              {lessonsDropdown && (
                <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                  <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-2xl space-y-1">
                    <a
                      href="#drills"
                      onClick={() => setLessonsDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#07221a] transition-colors"
                    >
                      <Headphones className="w-4 h-4 text-emerald-600 mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{t.drills}</div>
                        <div className="text-[11px] text-stone-500 font-normal">Acoustic shadowing lab</div>
                      </div>
                    </a>
                    <a
                      href="#spanish-hub"
                      onClick={() => setLessonsDropdown(false)}
                      className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#edfbe6] text-[#07221a] transition-colors"
                    >
                      <BookOpen className="w-4 h-4 text-[#62c110] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">{t.spanishGuide}</div>
                        <div className="text-[11px] text-stone-600 font-normal">Fix 4 Spanish accent traps</div>
                      </div>
                    </a>
                    <button
                      onClick={() => {
                        setLessonsDropdown(false);
                        onOpenLeadMagnet();
                      }}
                      className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#07221a] transition-colors cursor-pointer"
                    >
                      <BookOpen className="w-4 h-4 text-[#07221a] mt-0.5 shrink-0" />
                      <div>
                        <div className="text-xs font-bold">Accent Cheat Sheet (PDF)</div>
                        <div className="text-[11px] text-stone-500 font-normal">Instant 50 phrase guide</div>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Contact */}
            <button
              onClick={onOpenBooking}
              className="py-1 hover:text-amber-600 transition-colors cursor-pointer font-bold"
            >
              {language === 'es' ? 'Contacto' : 'Contact'}
            </button>
          </nav>

          {/* Social Icons row (YouTube, Instagram, Facebook, Twitter) - exactly like reference */}
          <div className="flex items-center gap-3 text-stone-900">
            <a
              href="https://www.youtube.com/@speakenglishwithnick"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 hover:text-red-600 transition-colors"
              title="YouTube"
            >
              <YoutubeIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.instagram.com/speak.english.with.nick/?hl=en"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 hover:text-pink-600 transition-colors"
              title="Instagram"
            >
              <InstagramIcon className="w-4 h-4" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 hover:text-blue-600 transition-colors"
              title="Facebook"
            >
              <FacebookIcon className="w-4 h-4" />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-stone-900 hover:text-sky-500 transition-colors"
              title="Twitter / X"
            >
              <TwitterIcon className="w-4 h-4" />
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

          {/* Mobile Sleek Single-Tap Language Toggle Pill */}
          <button
            type="button"
            onClick={() => setLanguage(language === 'en' ? 'es' : 'en')}
            className="flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-[#07221a] text-white border border-[#164c3c] text-[11px] font-black cursor-pointer shadow-2xs hover:bg-[#0c3629] transition-all active:scale-95 shrink-0"
            title="Switch Language"
          >
            <span>{language === 'en' ? '🇺🇸' : '🇪🇸'}</span>
            <span className={language === 'en' ? 'text-white' : 'text-stone-400'}>EN</span>
            <span className="text-[#62c110] font-normal">/</span>
            <span className={language === 'es' ? 'text-[#82e635]' : 'text-stone-400'}>ES</span>
          </button>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-xl bg-stone-100 hover:bg-stone-200/80 text-stone-900 transition-colors cursor-pointer active:scale-95 shrink-0"
            aria-label="Toggle mobile navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-[#07221a]" /> : <Menu className="w-5 h-5 text-[#07221a]" />}
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
                  language === 'en' ? 'bg-[#07221a] text-white shadow-xs' : 'text-stone-600'
                }`}
              >
                <span>🇺🇸</span>
                <span>English</span>
              </button>
              <button
                type="button"
                onClick={() => setLanguage('es')}
                className={`px-3 py-1 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                  language === 'es' ? 'bg-[#07221a] text-[#82e635] shadow-xs' : 'text-stone-600'
                }`}
              >
                <span>🇪🇸</span>
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
              className="p-3 rounded-xl hover:bg-stone-50 text-[#07221a] flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Inicio' : 'Home'}</span>
            </Link>

            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl hover:bg-stone-50 text-stone-800 flex items-center justify-between"
            >
              <span>{language === 'es' ? 'Cursos y Programas 1 a 1' : '1-on-1 Coaching & Programs'}</span>
              <span className="text-[10px] uppercase font-black text-[#164c3c] bg-[#edfbe6] px-2 py-0.5 rounded-md border border-[#c4eeb0]">
                {language === 'es' ? 'Populares' : 'Popular'}
              </span>
            </a>

            <a
              href="#spanish-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="p-3 rounded-xl bg-[#edfbe6] text-[#07221a] font-black flex items-center justify-between"
            >
              <span>{t.spanishGuide}</span>
              <span className="w-2 h-2 rounded-full bg-[#62c110]"></span>
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
              className="w-full py-4 rounded-2xl bg-[#62c110] hover:bg-[#82e635] text-[#07221a] font-black text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all active:scale-[0.99]"
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


