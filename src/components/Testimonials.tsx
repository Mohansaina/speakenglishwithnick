'use client';

import React from 'react';
import { testimonials } from '@/data/testimonials';
import { Star, ShieldCheck, CheckCircle2 } from 'lucide-react';

export const Testimonials: React.FC = () => {
  return (
    <section className="py-20 sm:py-24 relative bg-[#FBFBF9]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-stone-100 text-stone-800 text-xs font-semibold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            Verified Transformations
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 tracking-tight">
            How Nick&apos;s Students <br />
            <span className="font-serif italic font-normal text-amber-900">Found Their Natural Voice</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600">
            Real stories from software engineers, product managers, and international professionals.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((item) => (
            <div
              key={item.id}
              className="rounded-3xl bg-white border border-stone-200/90 p-7 space-y-5 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)]"
            >
              <div className="space-y-4">
                {/* 5 Stars */}
                <div className="flex items-center gap-1 text-amber-400">
                  {[...Array(item.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-xs sm:text-sm text-stone-700 leading-relaxed font-serif italic">
                  &ldquo;{item.quote}&rdquo;
                </p>

                {/* Before / After Tag */}
                <div className="p-3 rounded-2xl bg-[#F9F9F7] border border-stone-100 text-xs space-y-1">
                  <div className="text-stone-500">
                    <strong className="text-stone-800">Before:</strong> {item.before}
                  </div>
                  <div className="text-emerald-800 font-semibold flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                    <span><strong>Now:</strong> {item.after}</span>
                  </div>
                </div>
              </div>

              {/* Author Info */}
              <div className="pt-4 border-t border-stone-100 flex items-center justify-between">
                <div>
                  <h4 className="font-bold text-stone-900 text-sm">{item.name}</h4>
                  <p className="text-[11px] text-stone-500">{item.role}</p>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-semibold text-emerald-800 bg-emerald-50 px-2 py-0.5 rounded-md border border-emerald-200">
                    Verified
                  </span>
                  <p className="text-[10px] text-stone-400 mt-0.5">{item.timeframe}</p>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
