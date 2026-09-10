'use client';

import React, { useState } from 'react';
import { Search, X, Video, Headphones, BookOpen, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const SearchModal: React.FC<SearchModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [query, setQuery] = useState('');

  if (!isOpen) return null;

  const searchableItems = [
    { title: 'The E-School Trap Fix for Spanish Speakers', type: 'Sound Drill', cat: 'Accent', anchor: '#spanish-hub' },
    { title: '10 Real Conversations without Mental Translation', type: 'Video Masterclass', cat: 'Videos', anchor: '#popular-lessons' },
    { title: 'American Vowel Sounds: Ship vs Sheep & Cup vs Cap', type: 'Pronunciation Guide', cat: 'Accent', anchor: '#drills' },
    { title: 'Job Interview English: Confident Responders Blueprint', type: 'Video Lesson', cat: 'Career', anchor: '#popular-lessons' },
    { title: 'Workplace Rescue Phrases (Buying Thinking Time)', type: 'Audio Workout', cat: 'Audio', anchor: '#drills' },
    { title: 'Connected Speech: Gonna, Wanna, Coulda Reductions', type: 'Fluency Guide', cat: 'Rhythm', anchor: '#spanish-hub' },
  ];

  const filtered = searchableItems.filter(item =>
    item.title.toLowerCase().includes(query.toLowerCase()) ||
    item.cat.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 sm:px-4 bg-black/75 backdrop-blur-md animate-modal-backdrop">
      <div className="w-full max-w-xl bg-white rounded-3xl border border-stone-200 shadow-[0_20px_60px_rgba(0,0,0,0.15)] overflow-hidden animate-modal-pop">
        
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-5 border-b border-stone-100 flex items-center gap-3">
          <Search className="w-5 h-5 text-[#62c110] shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={language === 'es' ? 'Buscar sonidos, acento, lecciones...' : 'Search sounds, accent drills, video lessons...'}
            className="w-full bg-transparent text-stone-900 placeholder-stone-400 text-sm sm:text-base font-bold focus:outline-none"
          />
          <button
            onClick={onClose}
            className="p-1.5 sm:p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Results List */}
        <div className="max-h-80 overflow-y-auto touch-scroll p-3 space-y-1">
          {filtered.length > 0 ? (
            filtered.map((item, idx) => (
              <a
                key={idx}
                href={item.anchor}
                onClick={onClose}
                className="flex items-center justify-between p-3 rounded-2xl hover:bg-[#f6fcf3] border border-transparent hover:border-[#c4eeb0] transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-xl bg-stone-100 group-hover:bg-[#62c110] text-stone-700 group-hover:text-[#07221a] flex items-center justify-center transition-colors">
                    {item.cat === 'Videos' ? <Video className="w-4 h-4" /> : <Headphones className="w-4 h-4" />}
                  </div>
                  <div>
                    <h4 className="text-xs sm:text-sm font-bold text-stone-900 group-hover:text-[#07221a]">
                      {item.title}
                    </h4>
                    <span className="text-[10px] text-stone-500 font-medium">
                      {item.type} • {item.cat}
                    </span>
                  </div>
                </div>
                <ArrowRight className="w-4 h-4 text-stone-300 group-hover:text-[#07221a] group-hover:translate-x-1 transition-all" />
              </a>
            ))
          ) : (
            <div className="p-8 text-center text-xs text-stone-500">
              No results found for &ldquo;{query}&rdquo;. Try searching for &ldquo;accent&rdquo;, &ldquo;vowels&rdquo;, or &ldquo;spanish&rdquo;.
            </div>
          )}
        </div>

        {/* Quick Footer */}
        <div className="p-3 bg-stone-50 border-t border-stone-100 text-center text-[11px] text-stone-400 font-medium">
          Press ESC or click anywhere outside to close
        </div>

      </div>
    </div>
  );
};

