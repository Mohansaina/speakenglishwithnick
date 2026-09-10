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
      icon: <Globe className="w-5 h-5 text-[#f15555]" />,
    },
    {
      value: t.students,
      suffix: " Sessions",
      label: t.studentsLabel,
      icon: <UserCheck className="w-5 h-5 text-[#f15555]" />,
    },
    {
      value: t.lessons,
      suffix: " Practice",
      label: t.lessonsLabel,
      icon: <MessageSquare className="w-5 h-5 text-[#f15555]" />,
    },
    {
      value: "5.0",
      suffix: " Stars",
      label: language === 'es' ? "Reseñas 5 estrellas de alumnos reales" : "5-Star verified student reviews",
      icon: <Star className="w-5 h-5 text-amber-400 fill-amber-400" />,
    },
  ];

  return (
    <section className="relative bg-[#1e244d] text-white py-12 sm:py-16 overflow-hidden border-b border-[#3b4685]">
      
      {/* Background ambient lighting */}
      <div className="absolute inset-0 bg-radial from-[#48529e]/30 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {stats.map((item, idx) => (
            <div
              key={idx}
              className="p-6 rounded-3xl bg-[#283063]/90 backdrop-blur-md border border-[#3d488a] space-y-3 flex flex-col justify-between transition-all hover:border-[#f15555]/50 hover:bg-[#313b78] group shadow-sm"
            >
              <div className="flex items-center justify-between">
                <div className="w-10 h-10 rounded-2xl bg-[#373f7a] flex items-center justify-center border border-[#48529e] group-hover:scale-105 transition-transform">
                  {item.icon}
                </div>
                <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#e4ebf9] px-2.5 py-0.5 rounded-full bg-[#48529e]/50 border border-[#6773be]">
                  Verified
                </span>
              </div>
              <div>
                <div className="text-3xl sm:text-4xl font-black text-white tracking-tight flex items-baseline gap-1">
                  <span>{item.value}</span>
                  <span className="text-xs font-bold text-[#f15555] tracking-normal font-sans">{item.suffix}</span>
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



