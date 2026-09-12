'use client';

import React from 'react';
import { X } from 'lucide-react';
import { PracticeDrill } from '@/components/PracticeDrill';

interface AudioStudioModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AudioStudioModal: React.FC<AudioStudioModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/80 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-5xl h-[92vh] max-h-[850px] rounded-3xl bg-[#fcfcfb] border border-stone-200 shadow-2xl overflow-y-auto animate-modal-pop">
        
        {/* Sticky Close Button */}
        <div className="sticky top-0 right-0 z-50 p-4 flex justify-end bg-gradient-to-b from-[#fcfcfb] via-[#fcfcfb]/90 to-transparent pointer-events-none">
          <button
            onClick={onClose}
            className="p-2.5 rounded-full bg-stone-900 text-white hover:bg-stone-800 transition-all cursor-pointer shadow-lg flex items-center justify-center pointer-events-auto hover:scale-105 active:scale-95"
            aria-label="Close studio"
            title="Close Studio"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>
        </div>

        {/* Practice Drill Content */}
        <div className="-mt-14 pb-8">
          <PracticeDrill />
        </div>

      </div>
    </div>
  );
};
