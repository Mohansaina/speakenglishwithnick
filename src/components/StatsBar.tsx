'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const StatsBar: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].stats;

  return (
    <section className="bg-white border-b border-stone-200/80 py-12 sm:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-stone-100">
          
          {/* Stat 1 */}
          <div className="space-y-2 pt-6 md:pt-0">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#66c310] tracking-tight font-sans">
              {t.subscribers}
            </div>
            <p className="text-sm sm:text-base text-stone-700 font-semibold max-w-xs mx-auto leading-snug">
              {t.subscribersLabel}
            </p>
          </div>

          {/* Stat 2 */}
          <div className="space-y-2 pt-6 md:pt-0">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#66c310] tracking-tight font-sans">
              {t.students}
            </div>
            <p className="text-sm sm:text-base text-stone-700 font-semibold max-w-xs mx-auto leading-snug">
              {t.studentsLabel}
            </p>
          </div>

          {/* Stat 3 */}
          <div className="space-y-2 pt-6 md:pt-0">
            <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#66c310] tracking-tight font-sans">
              {t.lessons}
            </div>
            <p className="text-sm sm:text-base text-stone-700 font-semibold max-w-xs mx-auto leading-snug">
              {t.lessonsLabel}
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};
