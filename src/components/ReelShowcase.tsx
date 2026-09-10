'use client';

import React, { useState } from 'react';
import { reels } from '@/data/reels';
import { Play, Heart, Eye, ExternalLink } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { VideoPlayerModal, VideoModalData } from '@/components/VideoPlayerModal';
import { useLanguage } from '@/context/LanguageContext';

export const ReelShowcase: React.FC = () => {
  const { language } = useLanguage();
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
    <section id="reels" className="py-20 sm:py-28 relative bg-[#fcfcfb] border-t border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-center md:items-end justify-between gap-6 mb-12 sm:mb-16">
          <div className="space-y-3 text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c2d4f8] text-[#48529e] text-xs font-black uppercase tracking-wider">
              <InstagramIcon className="w-3.5 h-3.5 text-[#f15555]" />
              <span>{language === 'es' ? 'Mini Clases en Instagram' : 'Instagram Quick Drills'}</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#48529e] tracking-tight">
              {language === 'es' ? (
                <>
                  Lecciones en Video de <br className="hidden sm:inline" />
                  <span className="font-serif italic font-normal text-[#373f7a]">60 Segundos con Nick</span>
                </>
              ) : (
                <>
                  Nick&apos;s 60-Second <br className="hidden sm:inline" />
                  <span className="font-serif italic font-normal text-[#373f7a]">Acoustic Quick Drills</span>
                </>
              )}
            </h2>
            <p className="text-xs sm:text-sm text-stone-600 max-w-lg font-normal">
              {language === 'es'
                ? 'Consejos rápidos de alto impacto diseñados para ver en tu camino al trabajo o en pausas de café.'
                : 'High-impact speaking bite-sized lessons designed to watch on your commute or coffee break.'}
            </p>
          </div>

          <a
            href="https://www.instagram.com/speak.english.with.nick/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#48529e] hover:bg-[#373f7a] text-white text-xs font-bold shadow-md flex items-center justify-center gap-2.5 transition-all shrink-0 hover:scale-[1.02] border border-[#373f7a]"
          >
            <InstagramIcon className="w-4 h-4 text-[#f15555]" />
            <span>@speak.english.with.nick</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-300" />
          </a>
        </div>

        {/* Instagram Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {reels.map((reel) => (
            <div
              key={reel.id}
              onClick={() => handlePlayReel(reel)}
              className="group rounded-3xl bg-white border border-stone-200/90 hover:border-[#48529e] p-5 transition-all cursor-pointer shadow-xs hover:shadow-xl hover:-translate-y-1 flex flex-col justify-between min-h-[300px] sm:min-h-[330px]"
            >
              {/* Card Top */}
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-black px-2.5 py-0.5 rounded-full bg-[#e4ebf9] text-[#48529e] border border-[#c2d4f8]">
                  {reel.highlightTag}
                </span>
                <span className="text-[10px] font-mono text-stone-400 font-bold">
                  {reel.duration}
                </span>
              </div>

              {/* Center Play Graphic */}
              <div className="text-center space-y-2.5 py-4">
                <div className="w-12 h-12 rounded-full bg-[#48529e] text-white flex items-center justify-center mx-auto shadow-md group-hover:scale-110 group-hover:bg-[#f15555] transition-all">
                  <Play className="w-5 h-5 fill-current ml-0.5" />
                </div>
                <h4 className="font-black text-stone-900 text-xs sm:text-sm line-clamp-3 leading-snug group-hover:text-[#48529e]">
                  {reel.hook}
                </h4>
              </div>

              {/* Bottom Info */}
              <div className="pt-3 border-t border-stone-100 space-y-2">
                <p className="text-[11px] text-stone-600 line-clamp-2 leading-relaxed font-normal">
                  {reel.keyTakeaway}
                </p>
                <div className="flex items-center justify-between text-[10px] text-stone-500 font-semibold">
                  <span className="flex items-center gap-1 text-[#f15555] font-bold">
                    <Heart className="w-3.5 h-3.5 fill-[#f15555]" />
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


