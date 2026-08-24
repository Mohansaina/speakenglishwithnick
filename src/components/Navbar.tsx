'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Menu, X, ChevronDown, Search, ArrowRight, Sparkles, BookOpen, Headphones, Shield, Video } from 'lucide-react';
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
  const { language } = useLanguage();
  const t = translations[language].nav;
  
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [videosDropdown, setVideosDropdown] = useState(false);
  const [resourcesDropdown, setResourcesDropdown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 left-0 right-0 z-40 bg-white transition-all duration-200 border-b border-stone-200/90 ${
        isScrolled ? 'shadow-[0_4px_20px_rgba(0,0,0,0.06)] py-3' : 'py-4 sm:py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Brand Logo & Name (Rachel's English style circle mark + clean typography) */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-9 h-9 rounded-full bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center text-sm tracking-tighter shadow-xs group-hover:scale-105 transition-transform border border-[#164c3c]">
            N
          </div>
          <div>
            <div className="font-extrabold text-[#0d382c] tracking-tight text-lg sm:text-xl flex items-center gap-1.5 leading-none">
              <span>Speak English</span>
              <span className="font-serif italic font-normal text-[#1a5d4a]">with Nick</span>
            </div>
            <p className="text-[10px] text-stone-500 font-bold tracking-wider uppercase mt-0.5">
              American Accent & Fluency
            </p>
          </div>
        </Link>

        {/* Clean Desktop Navigation with Dropdowns */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-semibold text-stone-700">
          
          <a href="#about" className="hover:text-[#0d382c] transition-colors">
            {t.about}
          </a>

          {/* Free Videos Dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setVideosDropdown(true)}
            onMouseLeave={() => setVideosDropdown(false)}
          >
            <button className="flex items-center gap-1 hover:text-[#0d382c] transition-colors py-1 cursor-pointer">
              <span>{t.freeVideos}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${videosDropdown ? 'rotate-180 text-[#0d382c]' : ''}`} />
            </button>

            {videosDropdown && (
              <div className="absolute top-full left-0 w-64 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-xl space-y-1">
                  <a
                    href="#popular-lessons"
                    onClick={() => setVideosDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors"
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
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">5 Vowels Masterclass</div>
                      <div className="text-[11px] text-stone-500 font-normal">American vowel sound secrets</div>
                    </div>
                  </a>
                  <a
                    href="#reels"
                    onClick={() => setVideosDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Sparkles className="w-4 h-4 text-[#66c310] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">60-Sec Instagram Drills</div>
                      <div className="text-[11px] text-stone-500 font-normal">Quick daily commuter tips</div>
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
            <button className="flex items-center gap-1 hover:text-[#0d382c] transition-colors py-1 cursor-pointer">
              <span>{t.resources}</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${resourcesDropdown ? 'rotate-180 text-[#0d382c]' : ''}`} />
            </button>

            {resourcesDropdown && (
              <div className="absolute top-full left-0 w-72 pt-2 animate-in fade-in slide-in-from-top-2 duration-150">
                <div className="bg-white rounded-2xl border border-stone-200 p-2 shadow-xl space-y-1">
                  <a
                    href="#drills"
                    onClick={() => setResourcesDropdown(false)}
                    className="flex items-start gap-2.5 p-2.5 rounded-xl hover:bg-stone-50 text-stone-800 hover:text-[#0d382c] transition-colors"
                  >
                    <Headphones className="w-4 h-4 text-[#0d382c] mt-0.5 shrink-0" />
                    <div>
                      <div className="text-xs font-bold">{t.drills}</div>
                      <div className="text-[11px] text-stone-500 font-normal">Interactive acoustic shadowing studio</div>
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
                      <div className="text-[11px] text-stone-600 font-normal">Fix the 4 biggest Spanish traps</div>
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
                      <div className="text-[11px] text-stone-500 font-normal">2-Min speaking barrier diagnostic</div>
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

          <a href="#spanish-hub" className="text-[#0d382c] font-bold hover:text-[#66c310] transition-colors flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-[#66c310]"></span>
            <span>{t.spanishGuide}</span>
          </a>

          <a href="#programs" className="hover:text-[#0d382c] transition-colors">
            {t.programs}
          </a>

        </nav>

        {/* Search Icon + Dark Green Pill CTA */}
        <div className="hidden sm:flex items-center gap-3">
          
          {/* Search Button */}
          <button
            onClick={onOpenSearch}
            className="w-9 h-9 rounded-full border border-stone-200 hover:border-stone-400 text-stone-700 flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Search"
          >
            <Search className="w-4 h-4" />
          </button>

          {/* Join Academy / Book Call Button (Rachel's English style dark green button) */}
          <button
            onClick={onOpenBooking}
            className="px-5 py-2.5 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-bold text-xs sm:text-sm shadow-sm transition-all hover:scale-[1.02] flex items-center gap-1.5 cursor-pointer"
          >
            <span>{t.joinAcademy}</span>
            <ArrowRight className="w-3.5 h-3.5 text-[#66c310]" />
          </button>

        </div>

        {/* Mobile Burger & Quick CTA */}
        <div className="flex lg:hidden items-center gap-2">
          <button
            onClick={onOpenBooking}
            className="px-3 py-1.5 rounded-full bg-[#0d382c] text-white text-xs font-bold"
          >
            Academy
          </button>
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl border border-stone-200 text-stone-800 bg-white"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white border-t border-stone-200 px-6 py-6 space-y-4 shadow-xl animate-in slide-in-from-top-4 duration-150">
          <div className="flex flex-col space-y-3 text-sm font-semibold text-stone-800">
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0d382c]"
            >
              {t.about}
            </a>
            <a
              href="#popular-lessons"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0d382c]"
            >
              {t.freeVideos}
            </a>
            <a
              href="#spanish-hub"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-[#0d382c] font-bold flex items-center gap-2"
            >
              <span className="w-2 h-2 rounded-full bg-[#66c310]"></span>
              <span>{t.spanishGuide}</span>
            </a>
            <a
              href="#drills"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0d382c]"
            >
              {t.drills}
            </a>
            <a
              href="#programs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 hover:text-[#0d382c]"
            >
              {t.programs}
            </a>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenQuiz();
              }}
              className="text-left py-1.5 text-stone-800 font-bold hover:text-[#0d382c]"
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
              className="w-full text-center font-bold py-3 rounded-full bg-[#0d382c] text-white shadow-xs"
            >
              {t.joinAcademy}
            </button>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenLeadMagnet();
              }}
              className="w-full text-center font-semibold py-2.5 rounded-full border border-stone-200 text-stone-700 bg-stone-50"
            >
              Free Accent Cheat Sheet (PDF)
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
