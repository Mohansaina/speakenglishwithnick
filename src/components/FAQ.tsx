'use client';

import React, { useState } from 'react';
import { ChevronDown, HelpCircle, ArrowRight, Mail } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
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
          q: "¿Realmente 20 minutos al día me darán fluidez y mejorarán mi acento?",
          a: "Sí. La fluidez y el acento son destrezas motoras y reflejos acústicos, no materias académicas para estudiar 2 horas el fin de semana. 20 minutos diarios de repetición acústica ('shadowing') entrenan tu lengua y cuerdas vocales para producir inglés natural sin traducir mentalmente desde el español.",
        },
        {
          q: "Como hispanohablante, me cuesta pronunciar la 'S' inicial y las vocales en inglés. ¿Cómo me ayuda este método?",
          a: "Nick diseñó ejercicios específicos para hispanohablantes. Entrenamos la posición exacta de labios y lengua para arrancar palabras como 'speak' o 'school' con aire limpio sin agregar una 'e' antes ('espeak'), además de dominar el sonido Schwa (/ə/) que usan los nativos.",
        },
        {
          q: "Me da mucha ansiedad hablar en reuniones de trabajo en inglés. ¿Qué puedo hacer?",
          a: "La ansiedad surge de intentar traducir oraciones completas palabra por palabra. Te enseñamos 'Estructuras de Rescate' automáticas para ganar tiempo de pensar, pedir amablemente que hablen más despacio y resumir ideas con palabras simples y contundentes.",
        },
        {
          q: "¿Cómo funciona la mentoría privada 1 a 1 con Nick?",
          a: "Las sesiones se realizan por videollamada 1 a 1. Nick diagnostica tus bloqueos exactos de pronunciación y entonación, graba audios personalizados para que practiques entre sesiones y prepara roleplays a medida para tus entrevistas o reuniones laborales.",
        },
        {
          q: "¿Qué pasa si tengo un horario muy ocupado?",
          a: "Todo el sistema está pensado para personas con poco tiempo. Puedes escuchar y repetir los audios 100% manos libres en tu auto, en el transporte público con auriculares o durante una caminata de 15 minutos.",
        },
      ]
    : [
        {
          q: "Will 20 minutes a day really make me fluent and improve my accent?",
          a: "Yes. Fluency and accent are motor skills and acoustic reflexes, not academic subjects to cram on weekends. 20 minutes of daily acoustic shadowing trains your vocal cords and tongue to produce natural English without pausing to translate.",
        },
        {
          q: "As a Spanish speaker, I struggle with 's' clusters and American vowels. How does this help?",
          a: "Nick's curriculum has targeted modules for Spanish speakers. We train the tongue mechanics to eliminate the initial 'e' (e.g. 'speak' vs 'espeak') and master vowel reductions with the Schwa sound (/ə/).",
        },
        {
          q: "I get extreme anxiety when speaking in workplace meetings. How does this resolve it?",
          a: "Speaking anxiety comes from internal translation loops and fear of getting stuck. Nick teaches 12 'Rescue Structures'—automatic plug-and-play phrases native speakers use to buy time, ask colleagues to slow down politely, and summarize clearly.",
        },
        {
          q: "How does 1-on-1 coaching with Nick work?",
          a: "Private coaching is conducted via 1-on-1 Zoom sessions. Nick diagnoses your exact speaking bottlenecks, records custom audio feedback for you to shadow between calls, and prepares you for real-world interviews or presentations.",
        },
        {
          q: "What if I am too busy to practice every day?",
          a: "The curriculum is engineered specifically for commuters and busy professionals. You can do the acoustic shadowing hands-free in your car, on the train, or during your morning walk.",
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
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-stone-50 text-[#48529e] border border-[#c2d4f8] font-extrabold text-xs sm:text-sm shadow-xs flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            >
              <Mail className="w-4 h-4 text-[#f15555]" />
              <span>{language === 'es' ? 'Enviar Email' : 'Send Email'}</span>
            </a>

            <button
              onClick={onOpenBooking}
              className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-extrabold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 cursor-pointer transition-all hover:scale-[1.02] active:scale-95"
            >
              <span>{language === 'es' ? 'Agendar Sesión' : 'Book Session'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-white" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

