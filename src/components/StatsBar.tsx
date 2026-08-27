'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { Globe, UserCheck, MessageSquare, Star } from 'lucide-react';

export const StatsBar: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].stats;

  const stats = [
    {
      value: t.subscribers,
      suffix: " Fluency",
      label: t.subscribersLabel,
      icon: <Globe className="w-5 h-5 text-[#82e635]" />,
    },
    {
      value: t.students,
      suffix: " Sessions",
      label: t.studentsLabel,
      icon: <UserCheck className="w-5 h-5 text-[#82e635]" />,
    },
    {
      value: t.lessons,
      suffix: " Practice",
      label: t.lessonsLabel,
      icon: <MessageSquare className="w-5 h-5 text-[#82e635]" />,
    },
    {
      value: "5.0",
      suffix: " Stars",
      label: language === 'es' ? "Reseñas 5 estrellas de alumnos reales" : "5-Star verified student reviews",
      icon: <Star className="w-5 h-5 text-[#82e635] fill-[#82e635]" />,
    },
  ];

  return (
    <section className="relative bg-[#061d16] text-white py-12 sm:py-16 overflow-hidden border-b border-[#144737]">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#124233]/40 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#09281f]/80 backdrop-blur-md border border-[#185342] space-y-3 flex flex-col justify-between transition-all hover:border-[#62c110]/50 hover:bg-[#0c3328] group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#113e31] flex items-center justify-center border border-[#1e614d] group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#82e635] px-2 py-0.5 rounded-full bg-[#113d2f] border border-[#216b53]">
                  Verified
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                  <span>{item.value}</span>
                  <span className="text-xs font-bold text-[#82e635] tracking-normal font-sans">{item.suffix}</span>
                </div>
                <p className="text-xs text-stone-300 font-medium mt-1 leading-relaxed">
                  {item.label}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};



