'use client';

import React, { useState } from 'react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { TopAnnouncementBar } from '@/components/TopAnnouncementBar';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { StatsBar } from '@/components/StatsBar';
import { TransformationSection } from '@/components/TransformationSection';
import { PopularLessons } from '@/components/PopularLessons';
import { SpanishSpeakersHub } from '@/components/SpanishSpeakersHub';
import { PracticeDrill } from '@/components/PracticeDrill';
import { AboutNick } from '@/components/AboutNick';
import { FluencyQuiz } from '@/components/FluencyQuiz';
import { Programs } from '@/components/Programs';
import { ReelShowcase } from '@/components/ReelShowcase';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';
import { LeadMagnetModal } from '@/components/LeadMagnetModal';
import { BookingModal } from '@/components/BookingModal';
import { StudentLoginModal } from '@/components/StudentLoginModal';
import { SearchModal } from '@/components/SearchModal';
import { FloatingPracticeWidget } from '@/components/FloatingPracticeWidget';
import { Sparkles, Calendar, BookOpen, ArrowRight } from 'lucide-react';
import { translations } from '@/data/translations';

function MainContent() {
  const { language } = useLanguage();
  const [bookingModalOpen, setBookingModalOpen] = useState(false);
  const [bookingNotes, setBookingNotes] = useState('');
  const [leadMagnetOpen, setLeadMagnetOpen] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [searchModalOpen, setSearchModalOpen] = useState(false);

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

  return (
    <main className="min-h-screen bg-white text-stone-900 selection:bg-[#d0f4bd] selection:text-[#0b2d22]">
      
      {/* 1. Lime Green Top Announcement Bar */}
      <TopAnnouncementBar
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
        onOpenLogin={() => setLoginModalOpen(true)}
      />

      {/* 2. Clean White Header Navbar */}
      <Navbar
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
        onOpenSearch={() => setSearchModalOpen(true)}
      />

      {/* 3. Deep Forest Green Iconic Hero Section */}
      <Hero
        onOpenQuiz={handleScrollToQuiz}
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
      />

      {/* 4. Bold Green Metric Stats Bar */}
      <StatsBar />

      {/* 5. Transformation Showcase */}
      <TransformationSection />

      {/* 6. Popular Video Lessons & Audio Drills */}
      <PopularLessons onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 7. Spanish Speakers Specialization Hub */}
      <SpanishSpeakersHub
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
      />

      {/* 8. Interactive Audio Practice Studio */}
      <PracticeDrill />

      {/* 9. About Coach Nick */}
      <AboutNick onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 10. Interactive Fluency & Speaking Bottleneck Diagnostic Quiz */}
      <section id="fluency-quiz-section" className="py-20 sm:py-28 relative bg-[#fafafa] border-b border-stone-200/80">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-12 space-y-3">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
              <Sparkles className="w-3.5 h-3.5 text-[#66c310]" />
              {translations[language].quiz.tag}
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-[#0d382c] tracking-tight">
              {translations[language].quiz.title}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600">
              {translations[language].quiz.subtitle}
            </p>
          </div>

          <FluencyQuiz
            onSelectCourse={() => {}}
            onOpenBookingWithResult={handleOpenBookingWithQuiz}
          />
        </div>
      </section>

      {/* 11. Programs & Academy Tiers */}
      <Programs
        onOpenBooking={() => {
          setBookingNotes('');
          setBookingModalOpen(true);
        }}
        onOpenLeadMagnet={() => setLeadMagnetOpen(true)}
      />

      {/* 12. Instagram Reel Showcase */}
      <ReelShowcase />

      {/* 13. Frequently Asked Questions */}
      <FAQ onOpenBooking={() => setBookingModalOpen(true)} />

      {/* 14. High-Impact Deep Green Pre-Footer Banner */}
      <section className="py-20 sm:py-24 bg-[#0d382c] text-white relative overflow-hidden">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-7 relative z-10">
          
          <div className="w-14 h-14 rounded-2xl bg-[#164c3c] text-[#66c310] border border-[#277a62] flex items-center justify-center mx-auto shadow-md font-black text-2xl">
            N
          </div>

          <div className="space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight">
              {language === 'es' ? (
                <>
                  ¿Listo para hablar inglés con total soltura y confianza?
                </>
              ) : (
                <>
                  Ready to Speak English with Natural Confidence?
                </>
              )}
            </h2>
            <p className="text-sm sm:text-base text-stone-200 max-w-xl mx-auto leading-relaxed">
              {language === 'es'
                ? 'Empieza con 20 minutos al día en tu camino al trabajo o pausa de café. Siente la diferencia en tu próxima conversación.'
                : 'Start with 20 minutes a day on your commute or coffee break. Feel more confident and relaxed in your very next conversation.'}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5 pt-2">
            <button
              onClick={() => {
                setBookingNotes('');
                setBookingModalOpen(true);
              }}
              className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] font-black text-sm shadow-lg transition-all flex items-center justify-center gap-2 hover:scale-105 cursor-pointer"
            >
              <Calendar className="w-4 h-4 stroke-[2.5]" />
              <span>{language === 'es' ? 'Agendar Sesión 1 a 1 con Nick' : 'Book 1-on-1 Session with Nick'}</span>
            </button>
            
            <button
              onClick={() => setLeadMagnetOpen(true)}
              className="w-full sm:w-auto px-7 py-4 rounded-full bg-transparent hover:bg-[#164c3c] border-2 border-[#66c310]/80 hover:border-[#66c310] text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <BookOpen className="w-4 h-4 text-[#66c310]" />
              <span>{language === 'es' ? 'Descargar Guía de Acento (PDF)' : 'Get Free Accent Cheat Sheet'}</span>
            </button>
          </div>

        </div>
      </section>

      {/* 15. Structured 4-Column Footer */}
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

      {/* Floating 20-Sec Quick Pronunciation Practice Widget */}
      <FloatingPracticeWidget
        onOpenQuiz={handleScrollToQuiz}
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
      <MainContent />
    </LanguageProvider>
  );
}
