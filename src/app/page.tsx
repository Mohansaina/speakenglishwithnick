'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TransformationSection } from '@/components/TransformationSection';
import { SpanishSpeakersHub } from '@/components/SpanishSpeakersHub';
import { DiagnosticIntake } from '@/components/DiagnosticIntake';
import { PracticeDrill } from '@/components/PracticeDrill';
import { FluencyQuiz } from '@/components/FluencyQuiz';
import { Programs } from '@/components/Programs';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { LeadMagnetModal } from '@/components/LeadMagnetModal';
import { BookingModal } from '@/components/BookingModal';
import { StudentLoginModal } from '@/components/StudentLoginModal';
import { SearchModal } from '@/components/SearchModal';
import { StickyConversionBar } from '@/components/StickyConversionBar';
import { ExitIntentModal } from '@/components/ExitIntentModal';
import { Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { translations } from '@/data/translations';

function MainContent() {
  const { language } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [exitIntentOpen, setExitIntentOpen] = useState(false);
  const [exitTriggered, setExitTriggered] = useState(false);

  // Exit intent listener for desktop
  React.useEffect(() => {
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 10 && !exitTriggered) {
        setExitTriggered(true);
        setExitIntentOpen(true);
      }
    };

    document.documentElement.addEventListener('mouseleave', handleMouseLeave);
    return () => document.documentElement.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitTriggered]);

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
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* 3. Deep Forest Green Iconic Hero Section */}
      <Hero
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={(focusTopic) => handleOpenBooking(focusTopic)}
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
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
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
      />

      {/* 6. Interactive Audio Practice Studio */}
      <PracticeDrill />

      {/* 7. Interactive Fluency Diagnostic Quiz */}
      <section id="fluency-quiz-section" className="py-20 sm:py-28 relative bg-[#fcfcfb] border-b border-stone-200/70">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edfbe6] border border-[#b2e896] text-[#07221a] text-xs font-black uppercase tracking-wider">
              <span className="w-1.5 h-1.5 rounded-full bg-[#62c110]" />
              <span>{translations[language].quiz.tag}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07221a] tracking-tight">
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
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
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
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* Interactive Modals */}
      <LeadMagnetModal
        isOpen={leadMagnetOpen}
        onClose={() => setLeadMagnetOpen(false)}
      />

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

      <StickyConversionBar
        onOpenBooking={() => handleOpenBooking()}
        onOpenQuiz={handleScrollToQuiz}
      />

      <ExitIntentModal
        isOpen={exitIntentOpen}
        onClose={() => setExitIntentOpen(false)}
        onOpenBooking={() => handleOpenBooking()}
      />

    </main>
  );
}

export default function Home() {
  return (
    <LanguageProvider>
      <MainContent />
    </LanguageProvider>
  );
}
