'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2, ArrowRight, Mail } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/context/LanguageContext';
import { handleSmartEmailClick, getSmartEmailUrls } from '@/utils/emailClient';

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
  const emailUrls = getSmartEmailUrls();

  return (
    <div className="w-full font-sans text-left">
      {/* 2. Main Blue Footer */}
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

                {/* Contact & Social Badges: Only Email & Instagram */}
                <div className="pt-2 flex flex-wrap items-center gap-3">
                  <a
                    href="https://mail.google.com/mail/?view=cm&fs=1&to=speakenglishwithnick@gmail.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2.5 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-2xl border border-white/20 transition-all hover:border-white shadow-xs cursor-pointer group active:scale-95"
                  >
                    <Mail className="w-4 h-4 text-[#f15555] group-hover:scale-110 transition-transform" />
                    <span>speakenglishwithnick@gmail.com</span>
                  </a>

                  <a
                    href="https://www.instagram.com/speak.english.with.nick/?hl=en"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-white bg-white/10 hover:bg-white/20 px-4 py-2.5 rounded-2xl border border-white/20 transition-all hover:border-white shadow-xs cursor-pointer group active:scale-95"
                    aria-label="Instagram"
                  >
                    <InstagramIcon className="w-4 h-4 text-white fill-current group-hover:scale-110 transition-transform" />
                    <span>Instagram</span>
                  </a>
                </div>
              </div>

            </div>

            {/* Right Column: Explore Links */}
            <div className="lg:col-span-5 flex justify-start lg:justify-end">
              <div className="space-y-3 sm:space-y-4">
                <h4 className="font-extrabold text-white text-lg sm:text-xl tracking-tight mb-4">
                  {language === 'es' ? 'Explorar' : 'Explore'}
                </h4>
                <ul className="space-y-2.5 text-sm sm:text-base text-white/85 font-medium">
                  <li>
                    <a href="#how-it-works" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Cómo Funciona' : 'How It Works'}
                    </a>
                  </li>
                  <li>
                    <a href="#student-reviews" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Opiniones de Alumnos' : 'Student Stories'}
                    </a>
                  </li>
                  <li>
                    <button onClick={onOpenQuiz} className="hover:text-white transition-colors text-left cursor-pointer">
                      {language === 'es' ? 'Test de Diagnóstico' : 'Level Diagnostic'}
                    </button>
                  </li>
                  <li>
                    <a href="#faq" className="hover:text-white transition-colors">
                      {language === 'es' ? 'Preguntas Frecuentes' : 'FAQ'}
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
