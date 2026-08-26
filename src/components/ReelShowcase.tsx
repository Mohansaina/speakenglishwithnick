'use client';

import React, { useState } from 'react';
import { reels } from '@/data/reels';
import { Play, Heart, Eye, ExternalLink, Sparkles } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { VideoPlayerModal, VideoModalData } from '@/components/VideoPlayerModal';

export const ReelShowcase: React.FC = () => {
  const [selectedReel, setSelectedReel] = useState<VideoModalData | null>(null);

  const handlePlayReel = (reel: any) => {
    setSelectedReel({
      id: reel.id,
      title: reel.title,
      category: reel.category,
      duration: reel.duration,
      views: reel.views,
      likes: reel.likes,
      hook: reel.hook,
      keyTakeaway: reel.keyTakeaway,
      practicePhrase: reel.hook,
      thumbnailUrl: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=80",
      transcript: [
        `Reel Tip: ${reel.hook}`,
        reel.keyTakeaway,
        "Daily Commuter Tip: 20 minutes a day of acoustic shadowing transforms your speaking.",
        "Repeat after Nick: 'Could you please speak a little slower?'",
        "Follow @speak.english.with.nick for daily speaking workouts."
      ]
    });
  };

  return (
    <section id="reels" className="py-16 sm:py-24 relative bg-white border-t border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 mb-10 sm:mb-14">
          <div className="space-y-2 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-pink-50 text-pink-700 text-xs font-semibold">
              <InstagramIcon className="w-3.5 h-3.5" />
              <span>Instagram Quick Drills</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black text-stone-900 tracking-tight">
              Watch Nick&apos;s <span className="font-serif italic font-normal text-[#0d382c]">60-Sec Speaking Tips</span>
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg">
              Short, high-impact lessons designed to watch on your daily commute or coffee break.
            </p>
          </div>

          <a
            href="https://www.instagram.com/speak.english.with.nick/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-5 py-3 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white text-xs font-bold shadow-sm flex items-center justify-center gap-2 transition-all shrink-0 hover:scale-105"
          >
            <InstagramIcon className="w-3.5 h-3.5 text-pink-400" />
            <span>Follow @speak.english.with.nick</span>
            <ExternalLink className="w-3 h-3 text-stone-400" />
          </a>
        </div>

        {/* Instagram Cards Grid (Responsive 1-col on tiny mobile, 2-col on phone, 3-col on tablet, 5-col on desktop) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handlePlayReel(reel)}
              className="group rounded-3xl bg-[#fafafa] border-2 border-stone-200/90 hover:border-[#66c310] p-5 transition-all cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1.5 flex flex-col justify-between min-h-[300px] sm:min-h-[340px]"
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold px-2.5 py-0.5 rounded-full bg-[#eefae8] text-[#0d382c] border border-[#c4eeb0]">
                  {reel.highlightTag}
                </span>
                <span className="text-[10px] font-mono text-stone-400 font-bold">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Graphic */}
              <div className="text-center space-y-2.5 py-4">
                <div className="w-12 h-12 rounded-full bg-[#0d382c] text-[#66c310] flex items-center justify-center mx-auto shadow-md group-hover:scale-110 group-hover:bg-[#66c310] group-hover:text-[#0b2d22] transition-transform">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <h4 className="font-extrabold text-stone-900 text-xs sm:text-sm line-clamp-3 leading-snug group-hover:text-[#0d382c]">
                  {reel.hook}
                </h4>
              </div>

              {/* Bottom Info */}
              <div className="pt-3 border-t border-stone-200/80 space-y-2">
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed font-medium">
                  {reel.keyTakeaway}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold">
                  <span className="flex items-center gap-1 text-pink-600 font-bold">
                    <Heart className="w-3.5 h-3.5 fill-pink-600" />
                    {reel.likes}
                  </span>
                  <span className="flex items-center gap-1">
                    <Eye className="w-3.5 h-3.5 text-stone-400" />
                    {reel.views}
                  </span>
                </div>
              </div>

            </div>
          ))}
        </div>

        {/* Interactive Video Modal */}
        <VideoPlayerModal
          isOpen={selectedReel !== null}
          video={selectedReel}
          onClose={() => setSelectedReel(null)}
        />

      </div>
    </section>
  );
};

