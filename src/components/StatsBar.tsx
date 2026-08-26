'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Globe, UserCheck, MessageSquare } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].stats;

  const stats = [
    {
      value: t.subscribers,
      label: t.subscribersLabel,
      icon: <Globe className="w-5 h-5 text-[#66c310]" />,
    },
    {
      value: t.students,
      label: t.studentsLabel,
      icon: <UserCheck className="w-5 h-5 text-[#66c310]" />,
    },
    {
      value: t.lessons,
      label: t.lessonsLabel,
      icon: <MessageSquare className="w-5 h-5 text-[#66c310]" />,
    },
  ];

  return (
    <section className="bg-white border-b border-stone-200/80 py-10 sm:py-14 lg:py-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8 lg:gap-12 text-center">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 sm:p-7 rounded-3xl bg-[#fafafa] sm:bg-transparent border sm:border-0 border-stone-100 space-y-2 flex flex-col items-center justify-center transition-all hover:bg-[#f4fbf0]"
            >
              <div className="w-10 h-10 rounded-2xl bg-[#eaf8dd] flex items-center justify-center sm:hidden mb-1">
                {item.icon}
              </div>
              <div className="text-4xl sm:text-5xl lg:text-6xl font-black text-[#0d382c] sm:text-[#66c310] tracking-tight font-sans">
                {item.value}
              </div>
              <p className="text-xs sm:text-sm lg:text-base text-stone-600 sm:text-stone-700 font-semibold max-w-xs mx-auto leading-snug">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

