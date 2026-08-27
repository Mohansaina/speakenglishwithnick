'use client';

import React, { useState } from 'react';
import { X, Download, BookOpen, ShieldCheck, Check } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface LeadMagnetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const LeadMagnetModal: React.FC<LeadMagnetModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [goal, setGoal] = useState('workplace');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }, 500);
  };

  const handleDownload = () => {
    if (typeof window === 'undefined') return;

    const guideContent = language === 'es' ? `GUÍA RÁPIDA DE ACENTO Y MODISMOS EN INGLÉS AMERICANO
Por Coach Nick (@speak.english.with.nick)

==================================================
PRINCIPIO CLAVE: DEJA DE TRADUCIR PALABRA POR PALABRA
==================================================
1. REGLA DE LOS 20 MINUTOS AL DÍA:
   - Haz repetición acústica ('shadowing') en tu auto o caminando.
   - Entrena tu lengua con ritmo musical antes de memorizar reglas.

2. LAS 4 TRAMPAS CLAVE PARA HISPANOHABLANTES:
   - Elimina la "E" inicial: di "speak", no "espeak".
   - Diferencia V y B: Para la V, pon tus dientes superiores sobre tu labio inferior.
   - Sonido Schwa (/ə/): En inglés, las sílabas no acentuadas se comen.

3. FRASES DE RESCATE AUTOMÁTICAS:
   - "Could you please speak a little slower? I want to make sure I catch everything."
   - "That's an interesting question. Let me think about that for a second..."
   - "Just to make sure we're on the same page, do you mean...?"
   - "Let me put it this way: our main goal is to make things easier."

¡Sigue practicando todos los días!
Síguenos en Instagram: @speak.english.with.nick
` : `THE 20-MINUTE AMERICAN ACCENT & FLUENCY PLAYBOOK
By Coach Nick (@speak.english.with.nick)

==================================================
CORE PRINCIPLE: STOP MENTAL TRANSLATION
==================================================
1. THE 20 MIN/DAY FORMULA:
   - Use acoustic shadowing during your daily drive or walk.
   - Train your vocal cords with native cadence instead of grammar memorization.

2. TOP FIXES FOR SPANISH SPEAKERS:
   - Drop the "E" before "S": say "speak", not "espeak".
   - Master V vs B: Teeth on lower lip with vocal vibration.
   - Embrace the Schwa (/ə/): Reduce unstressed vowels smoothly.

3. TOP CONVERSATIONAL RESCUE PHRASES:
   - "Could you please speak a little slower? I want to make sure I catch everything."
   - "That's an interesting question. Let me think about that for a second..."
   - "Just to make sure we're on the same page..."
   - "Let me put it this way: our main goal is to make things easier."

Keep practicing daily!
Instagram: @speak.english.with.nick
`;
    const blob = new Blob([guideContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = language === 'es' ? 'Guia_Acento_Ingles_Coach_Nick.txt' : 'Coach_Nick_American_Accent_Playbook.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto touch-scroll rounded-3xl bg-white border border-stone-200 p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-4 sm:space-y-5 text-stone-900 animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 sm:p-2 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {!submitted ? (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#edfbe6] text-[#07221a] text-xs font-black uppercase tracking-wider border border-[#b2e896]">
                <BookOpen className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Guía Rápida Gratuita' : 'Free Accent Cheat Sheet'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#07221a]">
                {language === 'es' ? 'Guía de Sonidos y Frases en Inglés' : 'Sounds of American English Cheat Sheet'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                {language === 'es'
                  ? 'Descarga las 50 frases conversacionales indispensables y la guía de corrección de acento de Coach Nick.'
                  : 'Download Coach Nick’s 50 essential conversational phrases and acoustic cheat sheet for your daily practice.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'es' ? 'Tu Nombre' : 'Your First Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'es' ? 'Ej. Sofia' : 'e.g. Sarah'}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'es' ? 'Correo Electrónico' : 'Email Address'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="sofia@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'es' ? 'Tu Meta Principal' : 'Primary English Focus'}
                </label>
                <select
                  value={goal}
                  onChange={(e) => setGoal(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                >
                  <option value="workplace">
                    {language === 'es' ? 'Hablar con seguridad en reuniones de trabajo' : 'Speaking in business & work meetings'}
                  </option>
                  <option value="interviews">
                    {language === 'es' ? 'Pasar entrevistas laborales en inglés' : 'Passing job interviews with confidence'}
                  </option>
                  <option value="translation">
                    {language === 'es' ? 'Dejar de traducir en mi cabeza y soltarme' : 'Stopping internal mental translation'}
                  </option>
                  <option value="accent">
                    {language === 'es' ? 'Mejorar mi pronunciación y acento' : 'American pronunciation & accent refinement'}
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#62c110] hover:bg-[#52a60d] text-[#07221a] font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
            >
              {loading ? (
                <span>{language === 'es' ? 'Generando Guía...' : 'Preparing Cheat Sheet...'}</span>
              ) : (
                <>
                  <Download className="w-4 h-4 stroke-[2.5]" />
                  <span>{language === 'es' ? 'Descargar Guía Gratis (PDF)' : 'Get Free Cheat Sheet (PDF)'}</span>
                </>
              )}
            </button>

            <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1 font-normal">
              <ShieldCheck className="w-3.5 h-3.5 text-[#62c110]" />
              <span>{language === 'es' ? '100% Gratis • Sin Spam • Acceso Inmediato' : '100% Free • No Spam • Instant Access'}</span>
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 py-2 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#edfbe6] text-[#07221a] border border-[#b2e896] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-[#62c110]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#07221a]">
                {language === 'es' ? `¡Todo Listo, ${name}!` : `You're All Set, ${name}!`}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                {language === 'es'
                  ? `Te enviamos una copia a ${email}. También puedes descargarla ahora mismo:`
                  : `We sent a copy to ${email}. You can also download it right now:`}
              </p>
            </div>

            <button
              onClick={handleDownload}
              className="w-full py-4 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-black text-xs sm:text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] border border-[#164c3c]"
            >
              <Download className="w-4 h-4 text-[#62c110]" />
              <span>{language === 'es' ? 'Descargar Guía Rápida Ahora' : 'Download Cheat Sheet Now'}</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-stone-500 hover:text-stone-900 font-semibold cursor-pointer"
            >
              {language === 'es' ? 'Cerrar' : 'Close'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

