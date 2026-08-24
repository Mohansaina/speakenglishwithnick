'use client';

import React from 'react';
import { Star, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

export const TransformationSection: React.FC = () => {
  const { language } = useLanguage();
  const t = translations[language].transformation;

  return (
    <section className="py-20 sm:py-28 bg-[#fafafa] border-b border-stone-200/80 overflow-hidden">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Title (Rachel's English style: "Imagine finally speaking English with...") */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <span className="px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-bold uppercase tracking-wider">
            {t.tag}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight leading-tight">
            {t.titlePrefix} <br className="hidden sm:inline" />
            <span className="text-[#66c310] underline decoration-[#66c310]/40 underline-offset-8">
              {t.titleHighlight}
            </span>
          </h2>
        </div>

        {/* 3-Column Layout: Left Card + Center Learner Photo + Right Card */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Testimonial Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              
              {/* Huge Lime Green Quotation Marks (Rachel's English style) */}
              <div className="text-[#66c310] text-5xl font-serif font-black leading-none select-none">
                “
              </div>

              {/* Author Photo & Info */}
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=160&auto=format&fit=crop&q=80"
                  alt={t.student1}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#66c310]/30 shadow-xs"
                />
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">{t.student1}</h4>
                  <p className="text-xs text-stone-500 font-medium">{t.country1}</p>
                </div>
              </div>

              {/* Quote text */}
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed italic font-serif">
                &ldquo;{t.quote1}&rdquo;
              </p>
            </div>

            {/* 5/5 Stars Rating */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#66c310]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#66c310] text-[#66c310]" />
                ))}
              </div>
              <span className="text-xs font-black text-stone-800 bg-[#f4fbf0] px-2.5 py-1 rounded-md border border-[#c4eeb0] text-[#0d382c]">
                5 / 5 Rating
              </span>
            </div>
          </div>

          {/* Centerpiece Image: Professional Smiling Student with Laptop */}
          <div className="lg:col-span-4 flex justify-center order-first lg:order-none">
            <div className="relative w-full max-w-[340px] sm:max-w-[380px] aspect-[4/5] rounded-3xl overflow-hidden shadow-2xl border-4 border-white">
              <img
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&auto=format&fit=crop&q=85"
                alt="Student speaking English with confidence"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0d382c]/80 via-transparent to-transparent" />
              <div className="absolute bottom-5 left-5 right-5 text-white">
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#66c310] text-[#0b2d22] text-xs font-black mb-1 shadow-xs">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Verified Transformation</span>
                </div>
                <p className="text-xs font-semibold text-stone-200">
                  35,000+ Spanish speakers & global learners coached
                </p>
              </div>
            </div>
          </div>

          {/* Right Testimonial Card */}
          <div className="lg:col-span-4 bg-white rounded-3xl p-7 sm:p-8 border border-stone-200/90 shadow-[0_10px_30px_rgba(0,0,0,0.04)] space-y-5 flex flex-col justify-between h-full">
            <div className="space-y-4">
              
              {/* Huge Lime Green Quotation Marks */}
              <div className="text-[#66c310] text-5xl font-serif font-black leading-none select-none">
                “
              </div>

              {/* Author Photo & Info */}
              <div className="flex items-center gap-3.5">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=160&auto=format&fit=crop&q=80"
                  alt={t.student2}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#66c310]/30 shadow-xs"
                />
                <div>
                  <h4 className="font-extrabold text-stone-900 text-base">{t.student2}</h4>
                  <p className="text-xs text-stone-500 font-medium">{t.country2}</p>
                </div>
              </div>

              {/* Quote text */}
              <p className="text-stone-700 text-sm sm:text-[15px] leading-relaxed italic font-serif">
                &ldquo;{t.quote2}&rdquo;
              </p>
            </div>

            {/* 5/5 Stars Rating */}
            <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
              <div className="flex items-center gap-1 text-[#66c310]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-[#66c310] text-[#66c310]" />
                ))}
              </div>
              <span className="text-xs font-black text-stone-800 bg-[#f4fbf0] px-2.5 py-1 rounded-md border border-[#c4eeb0] text-[#0d382c]">
                5 / 5 Rating
              </span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
