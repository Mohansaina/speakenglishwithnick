'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, LogIn } from 'lucide-react';
import { InstagramIcon, YoutubeIcon } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

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
  const t = translations[language].footer;

  return (
    <footer className="bg-white text-stone-900 pt-16 sm:pt-20 pb-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Brand & Student Login Button (Rachel's English style: screenshot #5) */}
        <div className="space-y-6 pb-12 border-b border-stone-200/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-[#0d382c] text-[#66c310] font-black flex items-center justify-center text-sm shadow-xs border border-[#164c3c]">
              N
            </div>
            <span className="font-black text-[#0d382c] tracking-tight text-2xl">
              Speak English <span className="font-serif italic font-normal text-[#1a5d4a]">with Nick</span>
            </span>
          </div>

          <div>
            <button
              onClick={onOpenLogin}
              className="px-6 py-3 rounded-2xl bg-white hover:bg-[#f4fbf0] border-2 border-[#66c310] text-[#0d382c] font-black text-sm transition-all hover:scale-105 shadow-xs flex items-center gap-2 cursor-pointer"
            >
              <span>{t.studentLogin}</span>
              <span className="text-[#66c310] text-base font-bold">›</span>
            </button>
          </div>
        </div>

        {/* 4 Structured Columns (Rachel's English style: Explore, Connect, Programs, Social) */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10 py-12 border-b border-stone-200/80">
          
          {/* Col 1: Explore */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#0d382c] text-base sm:text-lg">
              {t.explore}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-700 font-medium">
              <li>
                <a href="#drills" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.practiceSounds}
                </a>
              </li>
              <li>
                <a href="#spanish-hub" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.improveAccent}
                </a>
              </li>
              <li>
                <a href="#popular-lessons" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.learnVocab}
                </a>
              </li>
              <li>
                <a href="#popular-lessons" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.studyConvos}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 2: Programs */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#0d382c] text-base sm:text-lg">
              {language === 'es' ? 'Programas' : 'Programs'}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-700 font-medium">
              <li>
                <a href="#programs" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {language === 'es' ? 'Academia de Acento Americano' : 'American Accent Academy'}
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Mentoría Privada 1 a 1' : '1-on-1 Coaching Intensive'}
                </button>
              </li>
              <li>
                <a href="#programs" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {language === 'es' ? 'Método 20 Minutos al Día' : '20-Min Commuter Blueprint'}
                </a>
              </li>
              <li>
                <button onClick={onOpenLeadMagnet} className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors text-left cursor-pointer">
                  {language === 'es' ? 'Guía PDF Descargable' : 'Free Accent Cheat Sheet (PDF)'}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Connect */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#0d382c] text-base sm:text-lg">
              {t.connect}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-700 font-medium">
              <li>
                <a href="#about" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.about}
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.faqLink}
                </a>
              </li>
              <li>
                <a href="#spanish-hub" className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors">
                  {t.spanishHub}
                </a>
              </li>
              <li>
                <button onClick={onOpenBooking} className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors text-left cursor-pointer">
                  {t.contact}
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Social */}
          <div className="space-y-4">
            <h4 className="font-extrabold text-[#0d382c] text-base sm:text-lg">
              {t.social}
            </h4>
            <ul className="space-y-2.5 text-sm text-stone-700 font-medium">
              <li>
                <a
                  href="https://www.youtube.com/@speakenglishwithnick"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors flex items-center gap-2"
                >
                  <YoutubeIcon className="w-4 h-4 text-red-600" />
                  <span>YouTube</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors flex items-center gap-2"
                >
                  <InstagramIcon className="w-4 h-4 text-pink-600" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-blue-600 text-white font-bold text-[10px] flex items-center justify-center">f</span>
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-[#0d382c] hover:underline underline-offset-4 transition-colors flex items-center gap-2"
                >
                  <span className="w-4 h-4 rounded-full bg-black text-white font-bold text-[10px] flex items-center justify-center">♪</span>
                  <span>TikTok</span>
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Copyright and Legal */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-stone-500 font-medium">
          <p>© {new Date().getFullYear()} {t.copyright}</p>
          <div className="flex items-center gap-4 text-stone-400">
            <span>Privacy Policy</span>
            <span>•</span>
            <span>Terms of Service</span>
            <span>•</span>
            <span>Student Code of Conduct</span>
          </div>
        </div>

      </div>
    </footer>
  );
};
