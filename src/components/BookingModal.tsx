'use client';

import React from 'react';
import { X, Sparkles, ExternalLink } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes,
}) => {
  const { language } = useLanguage();

  if (!isOpen) return null;

  const embedDomain =
    typeof window !== 'undefined'
      ? window.location.hostname
      : 'speakenglishwithnick.com';

  const calendlyUrl = `https://calendly.com/speakenglishwithnick/30min?embed_domain=${encodeURIComponent(
    embedDomain
  )}&embed_type=Inline&hide_gdpr_banner=1&primary_color=48529e`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/75 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-4xl max-h-[94vh] overflow-y-auto touch-scroll rounded-3xl bg-white border border-stone-200 p-4 sm:p-6 shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-4 text-stone-900 animate-modal-pop transition-all">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3.5 right-3.5 sm:top-5 sm:right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer z-20"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="space-y-1.5 text-left pr-8">
          <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#e4ebf9] text-[#48529e] text-xs font-black uppercase tracking-wider border border-[#c2d4f8]">
            <Sparkles className="w-3.5 h-3.5 text-[#f15555]" />
            <span>
              {language === 'es'
                ? 'RESERVA EN VIVO CON TEACHER NICK'
                : 'LIVE BOOKING WITH TEACHER NICK'}
            </span>
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1e244d] tracking-tight">
            {language === 'es'
              ? 'Elige tu Fecha y Hora Preferida'
              : 'Schedule Your 30-Min Session'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-600 font-normal leading-relaxed">
            {prefilledNotes ? (
              <span>
                {language === 'es' ? 'Enfoque seleccionado: ' : 'Selected Focus: '}
                <strong className="text-[#48529e] font-bold">
                  {prefilledNotes}
                </strong>
                .{' '}
                {language === 'es'
                  ? 'Selecciona tu horario en Calendly a continuación:'
                  : 'Select your preferred time on Calendly below:'}
              </span>
            ) : (
              <span>
                {language === 'es'
                  ? 'Selecciona tu horario en el calendario de Calendly de Teacher Nick. Recibirás tu confirmación y enlace de Zoom al instante.'
                  : 'Select your preferred time slot on Teacher Nick’s Calendly. Receive instant confirmation & Zoom meeting details.'}
              </span>
            )}
          </p>
        </div>

        {/* Embedded Live Calendly Widget Container */}
        <div className="w-full rounded-2xl border border-stone-200 overflow-hidden bg-[#fafafa] shadow-inner min-h-[640px] relative">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="670"
            frameBorder="0"
            title="Calendly Booking - Teacher Nick"
            className="w-full h-[670px] border-0"
          ></iframe>
        </div>

        {/* Fallback Direct Link Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-2 pt-2 border-t border-stone-100 text-xs text-stone-500">
          <span>
            {language === 'es'
              ? '¿Tienes problemas para ver el calendario?'
              : 'Having trouble viewing the calendar?'}
          </span>
          <a
            href="https://calendly.com/speakenglishwithnick/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="font-bold text-[#48529e] hover:text-[#f15555] underline flex items-center gap-1 transition-colors"
          >
            <span>
              {language === 'es'
                ? 'Abrir Calendly en una pestaña nueva'
                : 'Open Calendly in a new tab'}
            </span>
            <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

      </div>
    </div>
  );
};
