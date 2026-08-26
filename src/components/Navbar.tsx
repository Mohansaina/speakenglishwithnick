'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, ArrowRight, Sparkles, BookOpen, Headphones, Shield, Video, Globe } from 'lucide-react';
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
  const [videosDropdown, setVideosDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md transition-all duration-200 border-b border-stone-200/80 ${
        isScrolled ? 'shadow-[0_4px_24px_rgba(0,0,0,0.05)] py-2.5 sm:py-3' : 'py-3.5 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        
        {/* 1. Brand Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-2xl bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center text-base tracking-tighter shadow-xs group-hover:scale-105 transition-all border border-[#1a5d49]">
            N
          </div>
          <div>
            <div className="font-extrabold text-[#0d382c] tracking-tight text-lg sm:text-xl flex items-center gap-1.5 leading-none">
              <span>Speak English</span>
              <span className="font-serif italic font-normal text-[#237059]">with Nick</span>
            </div>
            <p className="text-[10px] text-stone-500 font-bold tracking-wider uppercase mt-1">
              American Accent & Fluency
            </p>
          </div>
        </Link>

        {/* 2. Center Navigation Links (Clean, Spacious & Refined) */}
        <nav className="hidden lg:flex items-center gap-1 xl:gap-2 text-sm font-semibold text-stone-700">
          
          <a
            href="#about"
            className="px-3.5 py-2 rounded-full hover:bg-stone-100/90 hover:text-[#0d382c] transition-all"
          >
            {t.about}
          </a>

          {/* Free Videos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setVideosDropdown(true)}
            onMouseLeave={() => setVideosDropdown(false)}
          >
            <button className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-stone-100/90 hover:text-[#0d382c] transition-all cursor-pointer">
              <span>{t.freeVideos}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${videosDropdown ? 'rotate-180 text-[#0d382c]' : 'text-stone-400'}`} />
            </button>

            {videosDropdown && (
              <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="bg-white rounded-2xl border border-stone-200/90 p-2 shadow-2xl space-y-1">
                  <a
                    href="#popular-lessons"
                    onClick={() => setVideosDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f4fbf0] text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Video className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">10 Real Conversations</div>
                      <div className="text-[11px] text-stone-500 font-normal">Stop translating in your head</div>
                    </div>
                  </a>
                  <a
                    href="#popular-lessons"
                    onClick={() => setVideosDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f4fbf0] text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">5 Vowels Masterclass</div>
                      <div className="text-[11px] text-stone-500 font-normal">American vowel secrets</div>
                    </div>
                  </a>
                  <a
                    href="#reels"
                    onClick={() => setVideosDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f4fbf0] text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">60-Sec Instagram Drills</div>
                      <div className="text-[11px] text-stone-500 font-normal">Quick commute tips</div>
                    </div>
                  </a>
                </div>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setResourcesDropdown(true)}
            onMouseLeave={() => setResourcesDropdown(false)}
          >
            <button className="flex items-center gap-1 px-3.5 py-2 rounded-full hover:bg-stone-100/90 hover:text-[#0d382c] transition-all cursor-pointer">
              <span>{t.resources}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${resourcesDropdown ? 'rotate-180 text-[#0d382c]' : 'text-stone-400'}`} />
            </button>

            {resourcesDropdown && (
              <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150 z-50">
                <div className="bg-white rounded-2xl border border-stone-200/90 p-2 shadow-2xl space-y-1">
                  <a
                    href="#drills"
                    onClick={() => setResourcesDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-[#f4fbf0] text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-[#0d382c] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.drills}</div>
                      <div className="text-[11px] text-stone-500 font-normal">Acoustic shadowing studio</div>
                    </div>
                  </a>
                  <a
                    href="#spanish-hub"
                    onClick={() => setResourcesDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl bg-[#eefae8] text-[#0d382c] transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.spanishGuide}</div>
                      <div className="text-[11px] text-stone-600 font-normal">Fix 4 biggest Spanish traps</div>
                    </div>
                  </a>
                  <button
                    onClick={() => {
                      setResourcesDropdown(false);
                      onOpenQuiz();
                    }}
                    className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors cursor-pointer"
                  >
                    <Shield className="w-4 h-4 text-[#0d382c] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.quiz}</div>
                      <div className="text-[11px] text-stone-500 font-normal">2-Min speaking diagnostic</div>
                    </div>
                  </button>
                  <button
                    onClick={() => {
                      setResourcesDropdown(false);
                      onOpenLeadMagnet();
                    }}
                    className="w-full text-left flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors cursor-pointer"
                  >
                    <BookOpen className="w-4 h-4 text-[#0d382c] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">Accent Cheat Sheet (PDF)</div>
                      <div className="text-[11px] text-stone-500 font-normal">Downloadable reference guide</div>
                    </div>
                  </button>
                </div>
              </div>
            )}
          </div>

          <a
            href="#spanish-hub"
            className="px-3.5 py-2 rounded-full text-[#0d382c] font-bold hover:bg-[#eefae8] transition-all flex items-center gap-1.5"
          >
            <span className="w-2 h-2 rounded-full bg-[#66c310] animate-pulse"></span>
            <span>{t.spanishGuide}</span>
          </a>

          <a
            href="#programs"
            className="px-3.5 py-2 rounded-full hover:bg-stone-100/90 hover:text-[#0d382c] transition-all"
          >
            {t.programs}
          </a>

        </nav>

        {/* 3. Right Side: Refined Segmented Language Control + Search + CTA */}
        <div className="hidden sm:flex items-center gap-2.5 lg:gap-3 shrink-0">
          
          {/* Dual-Box Language Switcher */}
          <div className="flex items-center p-1 rounded-2xl bg-stone-100/90 border border-stone-200/90 shadow-2xs">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'en'
                  ? 'bg-[#0d382c] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`px-3 py-1.5 rounded-xl text-xs font-black transition-all cursor-pointer flex items-center gap-1.5 ${
                language === 'es'
                  ? 'bg-[#0d382c] text-[#66c310] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-white/60'
              }`}
            >
              <span>🇲🇽</span>
              <span>Español</span>
            </button>
          </div>

          {/* Quick Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-10 h-10 rounded-2xl border border-stone-200 hover:border-stone-400 hover:bg-stone-50 text-stone-700 flex items-center justify-center transition-all cursor-pointer shadow-2xs"
            aria-label="Search site"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Join Academy CTA Button */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-2xl bg-[#0d382c] hover:bg-[#164c3c] text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.joinAcademy}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#66c310]" />
          </button>

        </div>

        {/* Mobile Header Right: Language Toggle & Menu Button */}
        <div className="flex xl:hidden items-center gap-2">
          
          {/* Mobile Dual-Box Language Switcher */}
          <div className="flex items-center p-0.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-black">
            <button
              onClick={() => setLanguage('en')}
              className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                language === 'en'
                  ? 'bg-[#0d382c] text-white shadow-2xs font-extrabold'
                  : 'text-stone-600'
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setLanguage('es')}
              className={`px-2 py-1 rounded-lg transition-all text-[11px] ${
                language === 'es'
                  ? 'bg-[#0d382c] text-[#66c310] shadow-2xs font-extrabold'
                  : 'text-stone-600'
              }`}
            >
              ES
            </button>
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-200 text-stone-800 bg-white shadow-2xs cursor-pointer"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-white border-t border-stone-200 px-5 sm:px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-150">
          
          {/* Language Switcher in Drawer (Two distinct boxes) */}
          <div className="p-1 rounded-2xl bg-stone-100 border border-stone-200 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setLanguage('en')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                language === 'en'
                  ? 'bg-[#0d382c] text-white shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇺🇸</span>
              <span>English</span>
            </button>
            <button
              type="button"
              onClick={() => setLanguage('es')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black transition-all flex items-center justify-center gap-1.5 ${
                language === 'es'
                  ? 'bg-[#0d382c] text-[#66c310] shadow-xs'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              <span>🇲🇽</span>
              <span>Español</span>
            </button>
          </div>

          {/* Quick Search bar in mobile drawer */}
          <button
            onClick={() => {
              setMobileMenuOpen(false);
              onOpenSearch();
            }}
            className="w-full p-3 rounded-2xl bg-stone-50 hover:bg-stone-100 border border-stone-200 text-stone-500 text-xs font-semibold flex items-center justify-between cursor-pointer transition-colors"
          >
            <span className="flex items-center gap-2">
              <Search className="w-4 h-4 text-[#66c310]" />
              <span>{t.searchPlaceholder || "Search lessons, sounds..."}</span>
            </span>
            <span className="text-[10px] uppercase font-bold bg-white px-2 py-0.5 rounded border border-stone-200 text-stone-400">Search</span>
          </button>

          <div className="flex flex-col space-y-1.5 text-sm font-bold text-stone-800">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 hover:text-[#0d382c]"
            >
              {t.about}
            </a>
            <a
              href="#popular-lessons"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 hover:text-[#0d382c]"
            >
              {t.freeVideos}
            </a>
            <a
              href="#spanish-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl bg-[#eefae8] text-[#0d382c] font-black flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#66c310]"></span>
              <span>{t.spanishGuide}</span>
            </a>
            <a
              href="#drills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 hover:text-[#0d382c]"
            >
              {t.drills}
            </a>
            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-2.5 px-3 rounded-xl hover:bg-stone-50 hover:text-[#0d382c]"
            >
              {t.programs}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left py-2.5 px-3 rounded-xl hover:bg-stone-50 text-stone-800 font-bold hover:text-[#0d382c] cursor-pointer"
            >
              {t.quiz}
            </button>
          </div>

          <div className="pt-4 border-t border-stone-100 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenBooking();
              }}
              className="w-full text-center font-black py-3.5 rounded-2xl bg-[#0d382c] hover:bg-[#164c3c] text-white shadow-xs cursor-pointer flex items-center justify-center gap-2"
            >
              <span>{t.joinAcademy}</span>
              <ArrowRight className="w-4 h-4 text-[#66c310]" />
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadMagnet();
              }}
              className="w-full text-center font-bold py-3 rounded-2xl border-2 border-stone-200 text-stone-700 bg-stone-50 hover:bg-stone-100 cursor-pointer text-xs"
            >
              Free Accent Cheat Sheet (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};

