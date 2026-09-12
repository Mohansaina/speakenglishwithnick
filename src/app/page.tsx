'use client';

import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TransformationSection } from '@/components/TransformationSection';
import { SpanishSpeakersHub } from '@/components/SpanishSpeakersHub';
import { DiagnosticIntake } from '@/components/DiagnosticIntake';
import { AudioStudioModal } from '@/components/AudioStudioModal';
import { FluencyQuiz } from '@/components/FluencyQuiz';
import { Programs } from '@/components/Programs';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { BookingModal } from '@/components/BookingModal';
import { StudentLoginModal } from '@/components/StudentLoginModal';
import { SearchModal } from '@/components/SearchModal';
import { StickyConversionBar } from '@/components/StickyConversionBar';
import { ScrollObserver } from '@/components/ScrollObserver';
import { SmoothScroll } from '@/components/SmoothScroll';
import { translations } from '@/data/translations';

function MainContent() {
  const { language } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [audioStudioModalOpen, setAudioStudioModalOpen] = useState(false);

  const handleScrollToQuiz = () => {
    const el = document.getElementById('fluency-quiz-section');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleOpenBookingWithQuiz = (notes: string) => {
    setBookingNotes(notes);
    setBookingModalOpen(true);
  };

  const handleOpenBooking = (focusTopic?: string) => {
    if (focusTopic) {
      setBookingNotes(focusTopic);
    } else {
      setBookingNotes('');
    }
    setBookingModalOpen(true);
  };

  return (
    <main className="min-h-screen bg-white text-stone-900 selection:bg-[#d0f4bd] selection:text-[#0b2d22]">
      
      {/* 1. Clean White Header Navbar */}
      <Navbar
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={() => handleOpenBooking()}
        onOpenLeadMagnet={() => handleOpenBooking()}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* 3. Deep Forest Green Iconic Hero Section */}
      <Hero
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={(focusTopic) => handleOpenBooking(focusTopic)}
        onOpenLeadMagnet={() => handleOpenBooking()}
      />

      {/* 4. Transformation Showcase */}
      <TransformationSection />

      {/* 4.5 Interactive Fluency Diagnostic & Ratio Intake */}
      <DiagnosticIntake onOpenBookingWithNotes={handleOpenBookingWithQuiz} />

      {/* 5. Spanish Speakers Specialization Hub */}
      <SpanishSpeakersHub
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => handleOpenBooking()}
      />

      {/* 6. Simple Interactive Audio Studio Callout Banner */}
      <section id="drills" className="py-14 sm:py-20 bg-[#fafafa] border-b border-stone-200/80 relative overflow-hidden">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white rounded-3xl p-6 sm:p-10 border border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col md:flex-row items-center justify-between gap-6 text-center md:text-left relative overflow-hidden">
            
            {/* Ambient Glow */}
            <div className="absolute top-0 right-0 w-72 h-72 bg-[#48529e]/5 rounded-full blur-3xl pointer-events-none" />

            <div className="space-y-2.5 relative z-10 max-w-xl">
              <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
                <Headphones className="w-3.5 h-3.5 text-[#48529e]" />
                <span>{language === 'es' ? 'Estudio Interactivo de Audio' : 'Interactive Audio Studio'}</span>
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-black text-[#18181b] tracking-tight leading-snug">
                {language === 'es'
                  ? 'Practica Tu Pronunciación y Audios con Nick'
                  : 'Practice Your Speaking Drills & American Sounds'}
              </h3>
              
              <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
                {language === 'es'
                  ? 'Accede a nuestro estudio completo de audio interactivo con ejercicios de escucha guiada, repetición y grabadora de voz.'
                  : 'Access our full interactive audio studio featuring guided listening, vocal shadowing, and voice note feedback.'}
              </p>
            </div>

            <button
              onClick={() => setAudioStudioModalOpen(true)}
              className="w-full md:w-auto px-8 py-4 rounded-full bg-[#48529e] hover:bg-[#373f7a] text-white font-black text-xs sm:text-sm shadow-md flex items-center justify-center gap-2.5 transition-all hover:scale-105 cursor-pointer shrink-0 active:scale-95 relative z-10"
            >
              <Headphones className="w-4 h-4 text-[#f15555]" />
              <span>{language === 'es' ? 'Abrir Estudio de Audio' : 'Open Audio Studio'}</span>
            </button>

          </div>
        </div>
      </section>

      {/* 7. Interactive Fluency Diagnostic Quiz */}
      <section id="fluency-quiz-section" className="py-20 sm:py-28 relative bg-[#fcfcfb] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
              <span>{translations[language].quiz.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
              {translations[language].quiz.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 font-normal">
              {translations[language].quiz.subtitle}
            </p>
          </div>

          <FluencyQuiz
            onSelectCourse={() => {}}
            onOpenBookingWithResult={handleOpenBookingWithQuiz}
          />
        </div>
      </section>

      {/* 9. Programs & Academy Tiers */}
      <Programs
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => handleOpenBooking()}
      />

      {/* 10. Frequently Asked Questions */}
      <FAQ onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 11. Structured 4-Column Footer */}
      <Footer
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => handleOpenBooking()}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* Interactive Modals */}
      <BookingModal
        isOpen={bookingModalOpen}
        prefilledNotes={bookingNotes}
        onClose={() => {
          setBookingModalOpen(false);
          setBookingNotes('');
        }}
      />

      <StudentLoginModal
        isOpen={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
      />

      <SearchModal
        isOpen={searchModalOpen}
        onClose={() => setSearchModalOpen(false)}
      />

      <AudioStudioModal
        isOpen={audioStudioModalOpen}
        onClose={() => setAudioStudioModalOpen(false)}
      />

      <StickyConversionBar
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
      />

    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <SmoothScroll>
        <ScrollObserver>
          <MainContent />
        </ScrollObserver>
      </SmoothScroll>
    </LanguageProvider>
  );
}
