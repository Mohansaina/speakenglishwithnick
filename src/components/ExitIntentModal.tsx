'use client';

import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

export const ExitIntentModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onOpenBooking: () => void;
}> = ({ isOpen, onClose, onOpenBooking }) => {
  const { language } = useLanguage();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);

    try {
      await fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          understandPercent: 75,
          speakPercent: 40,
          wantToLearn: 'Downloaded Free Exit-Intent 5-Day Accent & Fluency Blueprint PDF',
          language,
        }),
      });
    } catch (err) {
      console.warn('Exit Intent Submission Notice:', err);
    } finally {
      setLoading(false);
      setSubmitted(true);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-stone-950/80 backdrop-blur-md animate-modal-backdrop">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto bg-white rounded-2xl sm:rounded-3xl shadow-2xl border border-stone-200 text-stone-900 animate-modal-pop">
        
        {/* Header Ribbon */}
        <div className="bg-[#07221a] text-white p-5 sm:p-8 text-center relative overflow-hidden">
          <button
            onClick={onClose}
            className="absolute top-3.5 right-3.5 sm:top-4 sm:right-4 w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white/10 hover:bg-white/20 text-stone-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close"
          >
            <X className="w-4 h-4" />
          </button>

          <div className="inline-flex items-center px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full bg-[#16a34a]/30 text-[#a1d99b] text-[10px] sm:text-[11px] font-black uppercase tracking-wider mb-2.5 sm:mb-3 border border-[#16a34a]/40">
            <span>{language === 'es' ? 'REGALO DE DESPEDIDA GRATIS' : 'FREE EXIT BONUS'}</span>
          </div>

          <h3 className="text-xl sm:text-3xl font-black tracking-tight text-white mb-1.5 sm:mb-2">
            {language === 'es' 
              ? '¡No te vayas con las manos vacías!' 
              : 'Wait! Don’t Leave Empty Handed!'}
          </h3>

          <p className="text-xs sm:text-sm text-stone-300 font-normal max-w-sm mx-auto leading-relaxed">
            {language === 'es'
              ? 'Descarga el Plan de Acción de 5 Días para Eliminar el Acento y Hablar con Soltura (PDF Gratis).'
              : 'Get Coach Nick’s 5-Day Accent Elimination & Speaking Confidence Blueprint (Free PDF).'}
          </p>
        </div>

        {/* Content Body */}
        <div className="p-5 sm:p-8">
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4">
              <div>
                <label className="block text-xs font-extrabold text-stone-800 mb-1">
                  {language === 'es' ? 'Tu Nombre:' : 'Your Name:'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'es' ? 'Ej. Juan Pérez' : 'e.g. Alex Morgan'}
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-300 focus:border-[#07221a] focus:ring-2 focus:ring-[#07221a]/20 text-base sm:text-sm outline-none transition-all"
                />
              </div>

              <div>
                <label className="block text-xs font-extrabold text-stone-800 mb-1">
                  {language === 'es' ? 'Tu Correo Electrónico:' : 'Your Email Address:'}
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full px-3.5 py-2.5 sm:px-4 sm:py-3 rounded-xl border border-stone-300 focus:border-[#07221a] focus:ring-2 focus:ring-[#07221a]/20 text-base sm:text-sm outline-none transition-all"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 sm:py-3.5 rounded-xl bg-[#07221a] hover:bg-[#0c392c] text-white font-black text-xs sm:text-sm tracking-tight transition-all shadow-lg hover:scale-[1.01] active:scale-[0.99] cursor-pointer disabled:opacity-50"
              >
                {loading ? (
                  <span>{language === 'es' ? 'Enviando PDF...' : 'Sending PDF...'}</span>
                ) : (
                  <span>{language === 'es' ? 'Descargar Plan PDF Gratis →' : 'Download Free PDF Blueprint →'}</span>
                )}
              </button>

              <div className="text-center text-[10.5px] sm:text-[11px] text-stone-500 pt-0.5 font-medium">
                <span>{language === 'es' ? '100% Gratuito. Sin Spam. Desuscripción con 1 Clic.' : '100% Free. No Spam. 1-Click Unsubscribe.'}</span>
              </div>
            </form>
          ) : (
            <div className="text-center py-4 sm:py-6 space-y-3.5 sm:space-y-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#edfbe6] text-[#16a34a] font-black text-base sm:text-lg border border-[#b2e896] flex items-center justify-center mx-auto">
                ✓
              </div>
              
              <h4 className="text-lg sm:text-xl font-black text-[#07221a]">
                {language === 'es' ? '¡Plan PDF Enviado!' : 'PDF Blueprint Sent!'}
              </h4>

              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'es'
                  ? `Hemos enviado la guía en PDF a ${email}. ¡Revisa tu bandeja de entrada!`
                  : `We’ve dispatched the blueprint to ${email}. Check your inbox!`}
              </p>

              <div className="pt-2">
                <button
                  onClick={() => {
                    onClose();
                    onOpenBooking();
                  }}
                  className="w-full py-2.5 sm:py-3 rounded-xl bg-[#07221a] hover:bg-[#0c392c] text-white font-bold text-xs tracking-tight transition-colors"
                >
                  <span>{language === 'es' ? '¿Quieres avanzar más rápido? Reserva Clase 1-a-1 →' : 'Want faster results? Book 1-on-1 Session →'}</span>
                </button>
              </div>
            </div>
          )}
        </div>

      </div>
    </div>
  );
};
