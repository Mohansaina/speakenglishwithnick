'use client';

import React, { useState } from 'react';
import { Headphones } from 'lucide-react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { TransformationSection } from '@/components/TransformationSection';
import { DiagnosticIntake } from '@/components/DiagnosticIntake';
import { HowItWorks } from '@/components/HowItWorks';
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

      {/* 5. How It Works 3-Step Path */}
      <HowItWorks onOpenBooking={() => handleOpenBooking()} />



      {/* 9. Programs & Academy Tiers */}
      <Programs
        onOpenBooking={(focusTopic) => handleOpenBooking(focusTopic)}
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
