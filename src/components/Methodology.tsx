'use client';

import React from 'react';
import { Car, Headphones, Award, Check } from 'lucide-react';

export const Methodology: React.FC = () => {
  const steps = [
    {
      number: '01',
      title: 'Acoustic Input on the Go',
      subtitle: 'During your 20-min commute or walk',
      description: 'Listen to practical conversational scripts instead of grammar rules. Hands-free audio primes your ear for natural native cadence and phrasing.',
      icon: <Car className="w-5 h-5 text-amber-800" />,
      tag: 'Commute-Friendly'
    },
    {
      number: '02',
      title: 'Acoustic Shadowing Drill',
      subtitle: 'Repeating with natural melody & pacing',
      description: 'Repeat phrases out loud with Nick’s guided timing. This builds physical muscle memory so words come out without translating in your head.',
      icon: <Headphones className="w-5 h-5 text-amber-800" />,
      tag: 'Muscle Memory'
    },
    {
      number: '03',
      title: 'Rescue Phrasing Mastery',
      subtitle: 'Zero hesitation when caught off-guard',
      description: 'Internalize verbal bridges for buying time, asking people to slow down politely, and summarizing thoughts with simple, sharp words.',
      icon: <Award className="w-5 h-5 text-amber-800" />,
      tag: 'Real-Life Fluency'
    }
  ];

  return (
    <section id="method" className="py-20 sm:py-24 relative bg-[#FBFBF9] border-t border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto space-y-2.5 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-white border border-[#c2d4f8] text-[#48529e] text-xs font-semibold shadow-2xs">
            <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
            The Habit Architecture
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-stone-900 tracking-tight leading-tight">
            Why 20 Minutes a Day <br />
            <span className="font-serif italic font-normal text-[#48529e]">beats 2-hour weekend classes</span>
          </h2>
          <p className="text-xs sm:text-sm md:text-base text-stone-600">
            Language is a daily acoustic habit, not an academic subject. Here is how Coach Nick&apos;s system builds automatic speaking confidence.
          </p>
        </div>

        {/* 3 Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {steps.map((step) => (
            <div
              key={step.number}
              className="rounded-3xl bg-white border border-stone-200/80 p-7 space-y-6 flex flex-col justify-between shadow-[0_4px_20px_rgba(0,0,0,0.02)] hover:border-stone-300 transition-all"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-3xl font-black text-stone-200 font-mono">
                    {step.number}
                  </span>
                  <div className="p-2.5 rounded-2xl bg-[#f4f7fd] border border-[#e4ebf9] shadow-2xs">
                    {step.icon}
                  </div>
                </div>

                <div className="space-y-1">
                  <span className="text-[10px] font-bold text-[#48529e] uppercase tracking-wider">
                    {step.tag}
                  </span>
                  <h3 className="text-lg font-bold text-stone-900">
                    {step.title}
                  </h3>
                  <p className="text-xs text-stone-500 font-medium">
                    {step.subtitle}
                  </p>
                </div>

                <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                  {step.description}
                </p>
              </div>

              <div className="pt-4 border-t border-stone-100 flex items-center gap-2 text-xs font-semibold text-stone-800">
                <Check className="w-4 h-4 text-[#f15555]" />
                <span>Automatic daily retention</span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
