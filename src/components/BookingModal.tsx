'use client';

import React, { useState, useEffect } from 'react';
import { X, Users, User, CheckCircle2, Sparkles, ArrowRight, ArrowLeft, Mail, Send, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

type ProgramType = 'english-from-0' | 'specific-english' | 'conversation-practice';

export const BookingModal: React.FC<BookingModalProps> = ({
  isOpen,
  onClose,
  prefilledNotes = '',
}) => {
  const { language } = useLanguage();

  const getProgramType = (notes: string): ProgramType => {
    const lower = notes.toLowerCase();
    if (lower.includes('conversation') || lower.includes('conversación')) {
      return 'conversation-practice';
    }
    if (lower.includes('specific') || lower.includes('específico')) {
      return 'specific-english';
    }
    return 'english-from-0';
  };

  const activeProgram = getProgramType(prefilledNotes);

  const [showContactForm, setShowContactForm] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [groupSize, setGroupSize] = useState('1 Student');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Reset form when modal opens/closes
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const isDirectInquiry =
        prefilledNotes.toLowerCase().includes('inquiry') ||
        prefilledNotes.toLowerCase().includes('question') ||
        prefilledNotes.toLowerCase().includes('pregunta') ||
        prefilledNotes.toLowerCase().includes('contacto');
      setShowContactForm(isDirectInquiry);
      setSubmitted(false);
      setName('');
      setEmail('');
      setMessage('');
      setGroupSize('1 Student');
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen, prefilledNotes]);

  if (!isOpen) return null;

  // Tier 1 & 2 Pricing (English from 0 & Specific English)
  const standardPrices = [
    {
      studentsEn: '1 student',
      studentsEs: '1 estudiante',
      price: '$85',
      noteEn: 'per class',
      noteEs: 'por clase',
      iconCount: 1,
    },
    {
      studentsEn: '2 students',
      studentsEs: '2 estudiantes',
      price: '$50',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 2,
    },
    {
      studentsEn: '3 students',
      studentsEs: '3 estudiantes',
      price: '$45',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 3,
    },
    {
      studentsEn: '4 students',
      studentsEs: '4 estudiantes',
      price: '$40',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 4,
    },
    {
      studentsEn: '5-8 students',
      studentsEs: '5-8 estudiantes',
      price: '$30',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 5,
    },
  ];

  // Tier 3 Pricing (Conversation Practice)
  const conversationPrices = [
    {
      studentsEn: '1 student',
      studentsEs: '1 estudiante',
      price: '$65',
      noteEn: 'per class',
      noteEs: 'por clase',
      iconCount: 1,
    },
    {
      studentsEn: '2 students',
      studentsEs: '2 estudiantes',
      price: '$40',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 2,
    },
    {
      studentsEn: '3-4 students',
      studentsEs: '3-4 estudiantes',
      price: '$30',
      noteEn: 'per person',
      noteEs: 'por persona',
      iconCount: 4,
    },
  ];

  const currentPrices =
    activeProgram === 'conversation-practice' ? conversationPrices : standardPrices;

  const getProgramTitle = () => {
    switch (activeProgram) {
      case 'english-from-0':
        return language === 'es' ? 'Inglés desde 0' : 'English from 0';
      case 'specific-english':
        return language === 'es' ? 'Inglés Específico' : 'Specific English';
      case 'conversation-practice':
        return language === 'es' ? 'Práctica de Conversación' : 'Conversation Practice';
    }
  };

  const getBadgeLabel = () => {
    if (activeProgram === 'conversation-practice') {
      return language === 'es' ? 'Precios por clase' : 'Prices per class';
    }
    return language === 'es' ? 'Precios' : 'Prices';
  };

  const handleSubmitMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setIsSubmitting(true);
    try {
      // 1. Direct submit to Web3Forms endpoint for instant dashboard recording
      const web3Data = {
        access_key: 'd00ae149-9fc0-4582-a1d8-d2232f28cbd9',
        name,
        email,
        from_name: 'Speak English with Nick Inquiry',
        subject: `📩 New Inquiry: ${name} (${groupSize})`,
        "Group Size": groupSize,
        "Program Interest": getProgramTitle(),
        message: `Student Name: ${name}\nEmail: ${email}\nGroup Size: ${groupSize}\nProgram: ${getProgramTitle()}\n\nGoals & Questions:\n${message}`,
      };

      await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(web3Data),
      });

      // 2. Also send to internal API endpoint for backup logging
      fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          groupSize,
          date: new Date().toLocaleDateString(),
          time: new Date().toLocaleTimeString(),
          notes: `[Program: ${getProgramTitle()}] Goals / Questions: ${message}`,
        }),
      }).catch((err) => console.error('Internal API dispatch warning:', err));

      setSubmitted(true);
    } catch (err) {
      console.error('Error sending message:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md p-3 sm:p-5 flex min-h-full items-center justify-center animate-modal-backdrop">
      <div className="relative w-full max-w-lg bg-white border border-stone-200 shadow-2xl rounded-3xl overflow-hidden flex flex-col my-auto max-h-[88vh] animate-modal-pop">
        
        {/* Modal Header Bar */}
        <div className="bg-[#48529e] p-4 sm:p-5 text-white relative shrink-0">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-all cursor-pointer z-30"
            aria-label="Close modal"
          >
            <X className="w-5 h-5 stroke-[2.5]" />
          </button>

          <div className="space-y-1 pr-8">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/15 border border-white/20 text-xs font-bold uppercase tracking-wider text-white">
              <Sparkles className="w-3.5 h-3.5 text-[#f15555]" />
              <span>{showContactForm ? (language === 'es' ? 'Contacto Directo' : 'Direct Inquiry') : getBadgeLabel()}</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white leading-tight">
              {showContactForm
                ? (language === 'es' ? 'Mensaje a Teacher Nick' : 'Message Teacher Nick')
                : getProgramTitle()}
            </h2>
          </div>
        </div>

        {/* Modal Content Area */}
        {!showContactForm ? (
          /* --- PRICES VIEW --- */
          <>
            <div className="flex-1 overflow-y-auto max-h-[62vh] p-4 sm:p-5 space-y-3 min-h-0 touch-pan-y shadow-inner">
              <div className="flex items-center justify-between pb-2 border-b border-stone-200">
                <span className="text-xs sm:text-sm font-black text-stone-900 uppercase tracking-wider">
                  {getProgramTitle()}
                </span>
                <span className="text-xs font-black text-[#f15555] bg-[#f15555]/10 px-3 py-0.5 rounded-full border border-[#f15555]/20">
                  {getBadgeLabel()}
                </span>
              </div>

              <div className="space-y-2">
                {currentPrices.map((item, idx) => (
                  <div
                    key={idx}
                    className="p-3 sm:p-3.5 rounded-2xl bg-stone-50 border border-stone-200/90 flex items-center justify-between shadow-2xs hover:border-[#48529e] transition-colors"
                  >
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl bg-[#e4ebf9] text-[#48529e] flex items-center justify-center shrink-0 border border-[#c4d4f7]">
                        {item.iconCount === 1 ? (
                          <User className="w-4 h-4 stroke-[2.5]" />
                        ) : (
                          <Users className="w-4 h-4 stroke-[2.5]" />
                        )}
                      </div>
                      <div>
                        <div className="font-black text-xs sm:text-sm text-stone-900 leading-tight">
                          {language === 'es' ? item.studentsEs : item.studentsEn}
                        </div>
                        <div className="text-[10px] sm:text-xs text-stone-500 font-semibold">
                          {language === 'es' ? item.noteEs : item.noteEn}
                        </div>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className="text-lg sm:text-xl font-black text-[#48529e]">
                        {item.price}
                      </span>
                      <span className="text-[10px] sm:text-xs font-bold text-stone-600 block leading-none mt-0.5">
                        {language === 'es' ? item.noteEs : item.noteEn}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-3 rounded-2xl bg-[#e4ebf9]/60 border border-[#c4d4f7] flex items-start gap-2 mt-2">
                <CheckCircle2 className="w-4 h-4 text-[#48529e] shrink-0 mt-0.5 stroke-[2.5]" />
                <p className="text-[11px] sm:text-xs text-[#373f7a] font-medium leading-relaxed">
                  {language === 'es'
                    ? 'Todas las clases incluyen 1 sesión semanal en vivo con Teacher Nick + 3-5 días por semana de práctica guiada por voz en WhatsApp.'
                    : 'All classes include 1 live weekly session with Teacher Nick + 3-5 days per week of guided voice practice on WhatsApp.'}
                </p>
              </div>

              {/* Arrow Button to Open Message Box */}
              <div className="pt-2">
                <button
                  onClick={() => {
                    setMessage(`Hi Teacher Nick, I have a question about ${getProgramTitle()}!`);
                    setShowContactForm(true);
                  }}
                  className="w-full p-3.5 rounded-2xl bg-[#48529e] hover:bg-[#3a4387] text-white font-black text-xs sm:text-sm flex items-center justify-between transition-all group shadow-md cursor-pointer active:scale-[0.99]"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-white/15 flex items-center justify-center shrink-0">
                      <Mail className="w-4 h-4 text-white" />
                    </div>
                    <span>
                      {language === 'es'
                        ? 'Enviar mensaje a speakenglishwithnick@gmail.com'
                        : 'Send message to speakenglishwithnick@gmail.com'}
                    </span>
                  </div>
                  <div className="w-7 h-7 rounded-full bg-white/20 group-hover:bg-[#f15555] flex items-center justify-center transition-colors">
                    <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform stroke-[2.5]" />
                  </div>
                </button>
              </div>
            </div>

            {/* Modal Footer for Prices View */}
            <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
              <div className="text-xs text-stone-600 font-bold flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{language === 'es' ? 'Destino: speakenglishwithnick@gmail.com' : 'Destination: speakenglishwithnick@gmail.com'}</span>
              </div>
              <button
                onClick={onClose}
                className="px-5 py-2 sm:py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 font-black text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-center"
              >
                <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
              </button>
            </div>
          </>
        ) : (
          /* --- MESSAGE FORM VIEW WITH STICKY FOOTER SUBMIT --- */
          <form onSubmit={handleSubmitMessage} className="flex flex-col flex-1 min-h-0 overflow-hidden">
            <div className="flex-1 overflow-y-auto max-h-[55vh] p-4 sm:p-5 space-y-3 min-h-0 touch-pan-y shadow-inner">
              <button
                type="button"
                onClick={() => setShowContactForm(false)}
                className="text-xs font-bold text-[#48529e] hover:underline flex items-center gap-1 cursor-pointer mb-1"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>{language === 'es' ? '← Volver a Ver Precios' : '← Back to Prices'}</span>
              </button>

              {submitted ? (
                <div className="p-6 rounded-2xl bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-emerald-500 text-white flex items-center justify-center mx-auto shadow-md">
                    <Check className="w-6 h-6 stroke-[3]" />
                  </div>
                  <h3 className="font-black text-emerald-900 text-base">
                    {language === 'es' ? '¡Mensaje Enviado con Éxito!' : 'Inquiry Submitted Successfully!'}
                  </h3>
                  <p className="text-xs text-emerald-800 font-medium leading-relaxed">
                    {language === 'es'
                      ? 'Tu consulta fue enviada directamente a speakenglishwithnick@gmail.com. Teacher Nick te responderá a la brevedad.'
                      : 'Your inquiry has been sent directly to speakenglishwithnick@gmail.com. Teacher Nick will get back to you shortly.'}
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="p-2.5 rounded-xl bg-stone-100 border border-stone-200 text-xs font-medium text-stone-700 flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#48529e] shrink-0" />
                    <span>
                      {language === 'es' ? 'Destino:' : 'Destination:'}{' '}
                      <strong className="text-stone-900 font-bold">speakenglishwithnick@gmail.com</strong>
                    </span>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      {language === 'es' ? 'Tu Nombre' : 'Your Name'} *
                    </label>
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'es' ? 'Ej: Maria Lopez' : 'E.g., Sarah Johnson'}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:border-[#48529e] focus:ring-2 focus:ring-[#48529e]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      {language === 'es' ? 'Tu Correo Electrónico' : 'Your Email Address'} *
                    </label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@example.com"
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:border-[#48529e] focus:ring-2 focus:ring-[#48529e]/20"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      {language === 'es' ? 'Tamaño del Grupo' : 'Group Size'} *
                    </label>
                    <select
                      value={groupSize}
                      onChange={(e) => setGroupSize(e.target.value)}
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-semibold focus:outline-none focus:border-[#48529e] focus:ring-2 focus:ring-[#48529e]/20 bg-white text-stone-900 cursor-pointer"
                    >
                      <option value="1 Student">{language === 'es' ? '1 Estudiante ($85 / clase)' : '1 Student ($85 / class)'}</option>
                      <option value="2 Students">{language === 'es' ? '2 Estudiantes ($50 por persona)' : '2 Students ($50 per person)'}</option>
                      <option value="3 Students">{language === 'es' ? '3 Estudiantes ($45 por persona)' : '3 Students ($45 per person)'}</option>
                      <option value="4 Students">{language === 'es' ? '4 Estudiantes ($40 por persona)' : '4 Students ($40 per person)'}</option>
                      <option value="5-8 Students">{language === 'es' ? '5-8 Estudiantes ($30 por persona)' : '5-8 Students ($30 per person)'}</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-stone-800 mb-1">
                      {language === 'es' ? 'Metas y Preguntas' : 'Goals & Questions'} *
                    </label>
                    <textarea
                      rows={2}
                      required
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        language === 'es'
                          ? '¿Cuáles son tus metas para aprender inglés o qué preguntas tienes para Teacher Nick?'
                          : 'What are your English learning goals or questions for Teacher Nick?'
                      }
                      className="w-full px-3.5 py-2 rounded-xl border border-stone-300 text-xs font-medium focus:outline-none focus:border-[#48529e] focus:ring-2 focus:ring-[#48529e]/20"
                    ></textarea>
                  </div>
                </div>
              )}
            </div>

            {/* Sticky Form Footer Bar */}
            {!submitted ? (
              <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-between gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setShowContactForm(false)}
                  className="px-4 py-2.5 rounded-xl bg-stone-200 hover:bg-stone-300 text-stone-800 font-bold text-xs shrink-0 cursor-pointer"
                >
                  {language === 'es' ? '← Volver' : '← Back'}
                </button>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 py-3 px-4 rounded-xl bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-md transition-all cursor-pointer flex items-center justify-center gap-2 border border-red-400"
                >
                  <Send className="w-4 h-4 stroke-[2.5]" />
                  <span>
                    {isSubmitting
                      ? (language === 'es' ? 'Enviando...' : 'Submitting...')
                      : (language === 'es' ? 'ENVIAR CONSULTA A NICK →' : 'SUBMIT INQUIRY TO NICK →')}
                  </span>
                </button>
              </div>
            ) : (
              <div className="p-3.5 sm:p-4 bg-stone-50 border-t border-stone-200 flex items-center justify-end shrink-0">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-5 py-2 sm:py-2.5 rounded-full bg-stone-200 hover:bg-stone-300 text-stone-800 font-black text-xs sm:text-sm transition-all cursor-pointer"
                >
                  <span>{language === 'es' ? 'Cerrar' : 'Close'}</span>
                </button>
              </div>
            )}
          </form>
        )}

      </div>
    </div>
  );
};
