'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';
import { handleSmartEmailClick, getSmartEmailUrls } from '@/utils/emailClient';

interface FAQProps {
  onOpenBooking: () => void;
}

export const FAQ: React.FC<FAQProps> = ({ onOpenBooking }) => {
  const { language } = useLanguage();
  const t = translations[language].faq;
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const emailUrls = getSmartEmailUrls();

  const faqData = language === 'es'
    ? [
        {
          q: "¿Cómo funcionan las clases con Teacher Nick?",
          a: "Cada semana tienes 1 sesión privada en vivo (online o presencial) enfocada en tus metas reales. Además, durante 3-5 días a la semana realizas ejercicios prácticos de voz guiados por WhatsApp con corrección y feedback directo de Nick.",
        },
        {
          q: "¿Nick me ayuda si empiezo desde 0 o si solo necesito conversación?",
          a: "Sí. Teacher Nick adapta las clases 100% a tu nivel actual: ya sea Inglés desde 0 (bases sólidas), Inglés Específico (trabajo, reuniones, viajes) o Práctica de Conversación para ganar fluidez y confianza.",
        },
        {
          q: "¿Cómo funciona la práctica diaria de voz por WhatsApp?",
          a: "Entre tus sesiones en vivo, Nick te envía audios y ejercicios breves (15-20 min/día). Tú envías tus respuestas por notas de voz en WhatsApp y Nick evalúa y corrige tu pronunciación, ritmo y vocabulario.",
        },
        {
          q: "¿Qué horarios hay disponibles para las clases?",
          a: "Los horarios se coordinan directamente con Teacher Nick para elegir una hora cómoda según tu disponibilidad semanal, en un ambiente muy relajado, paciente y sin presión.",
        },
        {
          q: "¿Cómo puedo empezar mi primera sesión?",
          a: "Puedes agendar una sesión privada de diagnóstico directamente en el botón 'Agendar Sesión 1 a 1' o enviar un correo electrónico a Teacher Nick a speakenglishwithnick@gmail.com.",
        },
      ]
    : [
        {
          q: "How do lessons with Teacher Nick work?",
          a: "Each week you get 1 private live session (online or in-person) focused on your specific goals. Plus, 3-5 days a week you receive guided voice drills on WhatsApp with direct feedback from Teacher Nick.",
        },
        {
          q: "Can Teacher Nick help me if I am starting from 0 or just need conversation practice?",
          a: "Yes. Teacher Nick customizes every program 100% to your level: whether it's English from 0 (solid basics), Specific English (work, meetings, travel), or pure Conversation Practice to build confidence.",
        },
        {
          q: "How does the daily WhatsApp voice practice work?",
          a: "Between your weekly live calls, Nick sends short audio drills (15-20 min/day). You record your responses via voice notes on WhatsApp, and Nick reviews and corrects your pronunciation and speech flow.",
        },
        {
          q: "What class schedules are available?",
          a: "Class times are coordinated directly with Teacher Nick to find a comfortable recurring time that fits your weekly schedule in a patient and supportive environment.",
        },
        {
          q: "How do I get started?",
          a: "You can book a private diagnostic session by clicking 'Book 1-on-1 Session' or by sending an email directly to Teacher Nick at speakenglishwithnick@gmail.com.",
        },
      ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className="py-20 sm:py-28 relative bg-[#fdfdfc] border-b border-stone-200/70">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#48529e]" />
            <span>{t.tag}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-normal">
            {t.subtitle}
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {faqData.map((item, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl sm:rounded-3xl bg-white border border-stone-200/90 overflow-hidden smooth-hover-lift shadow-2xs hover:border-[#48529e]/40"
              >
                <button
                  onClick={() => toggleFAQ(idx)}
                  className="w-full text-left p-4 sm:p-6 md:p-7 flex items-center justify-between gap-3 font-black text-[#18181b] text-sm sm:text-base md:text-lg hover:text-[#48529e] transition-colors cursor-pointer"
                >
                  <span className="leading-snug">{item.q}</span>
                  <div className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 transition-transform duration-300 ease-out ${
                    isOpen ? 'rotate-180 bg-[#48529e] text-white shadow-xs' : 'bg-[#fafafa] text-stone-600 border border-stone-200'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[2.5]" />
                  </div>
                </button>

                <div className={`accordion-grid-wrapper ${isOpen ? 'is-open' : ''}`}>
                  <div className="accordion-grid-inner">
                    <div className="px-4 sm:px-6 md:px-7 pb-5 sm:pb-7 text-xs sm:text-sm md:text-[15px] text-stone-600 leading-relaxed border-t border-stone-100/80 pt-4 sm:pt-5 font-normal">
                      {item.a}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Still Have Questions CTA Banner */}
        <div className="mt-10 sm:mt-14 p-6 sm:p-8 rounded-3xl bg-[#e4ebf9]/70 border border-[#c4d4f7] flex flex-col sm:flex-row items-center justify-between gap-5 text-center sm:text-left">
          <div className="space-y-1.5">
            <h4 className="font-black text-[#18181b] text-base sm:text-lg">
              {language === 'es' ? '¿Tienes alguna pregunta para Teacher Nick?' : 'Have any questions for Teacher Nick?'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-700 font-medium flex flex-wrap items-center justify-center sm:justify-start gap-1">
              <span>{language === 'es' ? 'Envía un correo directamente a:' : 'Send an email directly to:'}</span>
              <a
                href={emailUrls.gmailWebUrl}
                onClick={(e) => handleSmartEmailClick(e)}
                target="_blank"
                rel="noopener noreferrer"
                className="font-black text-[#48529e] hover:underline hover:text-[#f15555] transition-colors"
              >
                speakenglishwithnick@gmail.com
              </a>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-2.5 w-full sm:w-auto shrink-0">
            <a
              href={emailUrls.gmailWebUrl}
              onClick={(e) => handleSmartEmailClick(e)}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto px-7 py-3.5 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            >
              <Mail className="w-4 h-4 text-white" />
              <span>{language === 'es' ? 'Enviar Email' : 'Send Email'}</span>
            </a>
          </div>
        </div>

      </div>
    </section>
  );
};

