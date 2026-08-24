'use client';

import React, { useState } from 'react';
import { reels } from '@/data/reels';
import { Play, Heart, Eye, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';

export const ReelShowcase: React.FC = () => {
  const [activeReelIndex, setActiveReelIndex] = useState<number | null>(null);

  const handlePlayReelMock = (index: number) => {
    setActiveReelIndex(index);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const current = reels[index];
      const speech = `Tip from Coach Nick: ${current.hook}. ${current.keyTakeaway}`;
      const utterance = new SpeechSynthesisUtterance(speech);
      utterance.rate = 1.0;
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="reels" className="py-20 sm:py-24 relative bg-white border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 mb-12 sm:mb-14">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold">
              <InstagramIcon className="w-3.5 h-3.5" />
              Instagram Lessons
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-stone-900 tracking-tight">
              Watch Nick&apos;s <span className="font-serif italic font-normal text-amber-900">Quick Speaking Tips</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg">
              Short, practical lessons designed to watch in under 60 seconds on your daily commute or coffee break.
            </p>
          </div>

          <a
            href="https://www.instagram.com/speak.english.with.nick/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-3 rounded-full bg-stone-900 hover:bg-stone-800 text-white text-xs font-semibold shadow-xs flex items-center gap-2 transition-colors shrink-0"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>Follow @speak.english.with.nick</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>

        {/* Clean Instagram Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
          {reels.map((reel, idx) => (
            <div
              key={reel.id}
              onClick={() => handlePlayReelMock(idx)}
              className="group rounded-3xl bg-[#F9F9F7] border border-stone-200 hover:border-stone-400 p-5 transition-all cursor-pointer shadow-2xs flex flex-col justify-between h-[330px]"
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-white text-stone-700 border border-stone-200">
                  {reel.highlightTag}
                </span>
                <span className="text-[10px] font-mono text-stone-400">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Graphic */}
              <div className="text-center space-y-2.5 py-4">
                <div className="w-11 h-11 rounded-full bg-white border border-stone-200 flex items-center justify-center mx-auto shadow-xs group-hover:scale-105 transition-transform">
                  <Play className="w-4 h-4 text-stone-900 fill-stone-900 ml-0.5" />
                </div>
                <h4 className="font-bold text-stone-900 text-xs sm:text-sm line-clamp-3 leading-snug">
                  {reel.hook}
                </h4>
              </div>

              {/* Bottom Info */}
              <div className="pt-3 border-t border-stone-200 space-y-2">
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed">
                  {reel.keyTakeaway}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-400 font-medium">
                  <span className="flex items-center gap-1 text-pink-600 font-semibold">
                    <Heart className="w-3 h-3 fill-pink-600" />
                    {reel.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {reel.views} views
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
