'use client';

import React, { useState } from 'react';
import { Play, Pause, Clock, Eye, Sparkles, ArrowRight, Video, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface PopularLessonsProps {
  onOpenBooking: () => void;
}

export const PopularLessons: React.FC<PopularLessonsProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const t = translations[language].popularPosts;
  const [activeLessonId, setActiveLessonId] = useState<string | null>(null);

  const handlePreviewLesson = (id: string, title: string) => {
    setActiveLessonId(activeLessonId === id ? null : id);
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (activeLessonId !== id) {
        const text = `Lesson Overview: ${title}. In this masterclass with Coach Nick, you will master practical American rhythm and eliminate mental translation.`;
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  return (
    <section id="popular-lessons" className="py-20 sm:py-28 bg-white border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header (Rachel's English style: "Popular posts") */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
            <Video className="w-3.5 h-3.5 text-[#66c310]" />
            {t.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Video Cards Grid (Rachel's English green rounded cards) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-7">
          {t.lessons.map((lesson, idx) => {
            const isPlaying = activeLessonId === lesson.id;
            
            // High visual mock images for English lessons
            const lessonImages = [
              "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=600&auto=format&fit=crop&q=80",
              "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=600&auto=format&fit=crop&q=80",
            ];

            return (
              <div
                key={lesson.id}
                className="group rounded-3xl bg-[#fafafa] border-2 border-[#e3f4d7] hover:border-[#66c310] overflow-hidden transition-all duration-300 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl flex flex-col justify-between"
              >
                {/* Card Top / Thumbnail with Green Border Frame */}
                <div>
                  <div className="relative aspect-[16/10] overflow-hidden bg-[#0d382c] m-3 rounded-2xl border border-[#66c310]/50">
                    <img
                      src={lessonImages[idx % lessonImages.length]}
                      alt={lesson.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                    />
                    
                    {/* Dark gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    {/* Category badge */}
                    <div className="absolute top-2.5 left-2.5 px-2.5 py-0.5 rounded-full bg-[#66c310] text-[#0b2d22] text-[10px] font-black uppercase tracking-wider">
                      {lesson.category}
                    </div>

                    {/* Play Button Overlay */}
                    <button
                      onClick={() => handlePreviewLesson(lesson.id, lesson.title)}
                      className="absolute inset-0 flex items-center justify-center cursor-pointer group/btn"
                    >
                      <div className="w-12 h-12 rounded-full bg-[#66c310] text-[#0b2d22] flex items-center justify-center shadow-lg group-hover/btn:scale-110 transition-transform">
                        {isPlaying ? (
                          <Pause className="w-5 h-5 fill-[#0b2d22]" />
                        ) : (
                          <Play className="w-5 h-5 fill-[#0b2d22] ml-0.5" />
                        )}
                      </div>
                    </button>

                    {/* Duration badge */}
                    <div className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-md bg-black/75 text-white text-[10px] font-mono flex items-center gap-1">
                      <Clock className="w-3 h-3 text-[#66c310]" />
                      <span>{lesson.duration}</span>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-4 sm:p-5 space-y-2">
                    <h3 className="font-extrabold text-stone-900 text-sm sm:text-base leading-snug group-hover:text-[#0d382c] transition-colors">
                      {lesson.title}
                    </h3>
                    <p className="text-xs text-stone-600 line-clamp-2 leading-relaxed">
                      {lesson.desc}
                    </p>
                  </div>
                </div>

                {/* Card Footer */}
                <div className="p-4 sm:p-5 pt-0 flex items-center justify-between border-t border-stone-200/60 mt-2">
                  <span className="text-[11px] font-semibold text-stone-500 flex items-center gap-1">
                    <Eye className="w-3 h-3 text-[#66c310]" />
                    {lesson.views}
                  </span>
                  
                  <button
                    onClick={() => handlePreviewLesson(lesson.id, lesson.title)}
                    className="text-xs font-extrabold text-[#0d382c] group-hover:text-[#66c310] flex items-center gap-1 transition-colors cursor-pointer"
                  >
                    <span>{isPlaying ? 'Playing' : 'Watch Free'}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
