'use client';

import React from 'react';
import { ExternalLink, Video } from 'lucide-react';
import { InstagramIcon } from '@/components/icons/BrandIcons';
import { useLanguage } from '@/context/LanguageContext';

interface PopularLessonsProps {
  onOpenBooking?: () => void;
}

interface InstagramReelEmbed {
  id: string;
  reelId: string;
  url: string;
  title: string;
}

export const PopularLessons: React.FC<PopularLessonsProps> = () => {
  const { language } = useLanguage();

  const reels: InstagramReelEmbed[] = [
    {
      id: 'reel-1',
      reelId: 'DZBvjTgJ7XY',
      url: 'https://www.instagram.com/speak.english.with.nick/reel/DZBvjTgJ7XY/?hl=en',
      title: "Stop Saying 'I Don't Understand'",
    },
    {
      id: 'reel-2',
      reelId: 'DZBZ8hNPDXP',
      url: 'https://www.instagram.com/speak.english.with.nick/reel/DZBZ8hNPDXP/?hl=en',
      title: "American Accent Masterclass: Vowel Reductions",
    },
    {
      id: 'reel-3',
      reelId: 'DU4qVy3CZDD',
      url: 'https://www.instagram.com/speak.english.with.nick/reel/DU4qVy3CZDD/?hl=en',
      title: "The 20-Minute Commute Speaking Practice Habit",
    },
    {
      id: 'reel-4',
      reelId: 'DUfAPRGDCcY',
      url: 'https://www.instagram.com/speak.english.with.nick/reel/DUfAPRGDCcY/?hl=en',
      title: "Spanish Accent Trap: How to Stop Adding 'E' Before 'S'",
    },
  ];

  return (
    <section id="popular-lessons" className="py-20 sm:py-28 bg-[#fcfcfb] border-b border-stone-200/70">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#edfbe6] border border-[#b2e896] text-[#07221a] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Video className="w-3.5 h-3.5 text-[#62c110]" />
            <span>{language === 'es' ? 'Clases Directas de Instagram' : 'Official Instagram Reels'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#07221a] tracking-tight">
            {language === 'es' ? 'Lecciones en Video y Reels de Nick' : 'Popular Video Lessons & Instagram Reels'}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto font-normal">
            {language === 'es'
              ? 'Lecciones reales y prácticas de pronunciación directamente desde nuestro Instagram @speak.english.with.nick.'
              : 'Direct practical pronunciation and fluency lessons straight from our official Instagram.'}
          </p>
        </div>

        {/* Real Native Instagram Embeds Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 items-start">
          {reels.map((reel) => (
            <div
              key={reel.id}
              className="rounded-3xl bg-white border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] overflow-hidden flex flex-col items-center p-2 hover:shadow-xl transition-all duration-300"
            >
              <div className="w-full relative aspect-[9/16] min-h-[440px] rounded-2xl overflow-hidden bg-stone-100">
                <iframe
                  src={`https://www.instagram.com/reel/${reel.reelId}/embed/`}
                  className="w-full h-full border-0 rounded-2xl"
                  allowTransparency={true}
                  allow="encrypted-media"
                  scrolling="no"
                  title={reel.title}
                />
              </div>

              <div className="p-3 w-full text-center">
                <a
                  href={reel.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-1.5 text-xs font-black text-[#07221a] hover:text-[#62c110] transition-colors"
                >
                  <InstagramIcon className="w-3.5 h-3.5 text-pink-600" />
                  <span>{language === 'es' ? 'Abrir en Instagram' : 'Watch on Instagram'}</span>
                  <ExternalLink className="w-3 h-3 text-stone-400" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Channel Banner */}
        <div className="mt-12 text-center">
          <a
            href="https://www.instagram.com/speak.english.with.nick/?hl=en"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white text-xs sm:text-sm font-bold shadow-md transition-all hover:scale-102 border border-[#164c3c]"
          >
            <InstagramIcon className="w-4 h-4 text-pink-400" />
            <span>{language === 'es' ? 'Ver todos los reels en @speak.english.with.nick' : 'Follow & Watch All Reels @speak.english.with.nick'}</span>
            <ExternalLink className="w-3.5 h-3.5 text-stone-400" />
          </a>
        </div>

      </div>
    </section>
  );
};


