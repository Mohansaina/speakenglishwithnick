'use client';

import React from 'react';
import { X } from 'lucide-react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  const embedDomain =
    typeof window !== 'undefined'
      ? window.location.hostname
      : 'speakenglishwithnick.com';

  const calendlyUrl = `https://calendly.com/speakenglishwithnick/30min?embed_domain=${encodeURIComponent(
    embedDomain
  )}&embed_type=Inline&hide_gdpr_banner=1&primary_color=48529e`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-4xl h-[92vh] max-h-[780px] rounded-3xl bg-white border border-stone-200 shadow-2xl overflow-hidden animate-modal-pop">
        
        {/* Minimal Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 sm:top-4 sm:right-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-600 hover:text-stone-900 transition-all cursor-pointer z-30 shadow-sm"
          aria-label="Close modal"
          title="Close"
        >
          <X className="w-5 h-5 stroke-[2.5]" />
        </button>

        {/* Pure Calendly Direct Scheduler */}
        <div className="w-full h-full bg-white">
          <iframe
            src={calendlyUrl}
            width="100%"
            height="100%"
            frameBorder="0"
            title="Schedule with Teacher Nick"
            className="w-full h-full border-0"
          ></iframe>
        </div>

      </div>
    </div>
  );
};
