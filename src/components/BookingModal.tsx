'use client';

import React, { useState } from 'react';
import { X, Clock, Video, Check, ShieldCheck, Sparkles, ArrowRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState<'schedule' | 'confirmed'>('schedule');
  const [selectedDate, setSelectedDate] = useState(language === 'es' ? 'Mañana (3:00 PM EST)' : 'Tomorrow (3:00 PM EST)');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [experience, setExperience] = useState('intermediate');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleBook = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep('confirmed');
      try {
        confetti({ particleCount: 50, spread: 50, origin: { y: 0.6 } });
      } catch {
        // ignore
      }
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div className="relative w-full max-w-md max-h-[92vh] overflow-y-auto rounded-3xl bg-white border border-stone-200 p-6 sm:p-8 shadow-2xl space-y-5 text-stone-900 animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'schedule' ? (
          <form onSubmit={handleBook} className="space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#eefae8] text-[#0d382c] text-xs font-black uppercase tracking-wider border border-[#c4eeb0]">
                <Video className="w-3.5 h-3.5 text-[#66c310]" />
                <span>{language === 'es' ? 'Consulta Privada 1 a 1' : '1-on-1 Strategy Session'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#0d382c]">
                {language === 'es' ? 'Reserva tu Diagnóstico con Nick' : 'Book a Diagnostic Call with Nick'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                {language === 'es'
                  ? 'Sesión privada de 30 minutos por video para analizar tus bloqueos al hablar y trazar tu plan de acento.'
                  : 'A 30-minute private video session to evaluate your speaking bottlenecks and build your 90-day accent roadmap.'}
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Select Time Slot */}
              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1.5">
                  {language === 'es' ? 'Elige un Horario Disponible' : 'Choose a Convenient Time Slot'}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {[
                    language === 'es' ? 'Mañana (3:00 PM EST)' : 'Tomorrow (3:00 PM EST)',
                    language === 'es' ? 'Jueves (11:00 AM EST)' : 'Thursday (11:00 AM EST)',
                    language === 'es' ? 'Viernes (5:30 PM EST)' : 'Friday (5:30 PM EST)',
                    language === 'es' ? 'Sábado (10:00 AM EST)' : 'Saturday (10:00 AM EST)',
                  ].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedDate(slot)}
                      className={`p-2.5 rounded-2xl text-left text-xs font-semibold border transition-all cursor-pointer ${
                        selectedDate === slot
                          ? 'bg-[#0d382c] text-white border-[#0d382c] font-bold shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      <Clock className="w-3 h-3 inline mr-1 text-[#66c310]" />
                      {slot}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'es' ? 'Nombre Completo' : 'Full Name'}
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={language === 'es' ? 'Ej. Mateo Silva' : 'e.g. Maria Silva'}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-[#0d382c] focus:bg-white transition-colors"
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
                  placeholder="mateo@empresa.com"
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-hidden focus:border-[#0d382c] focus:bg-white transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-stone-700 mb-1">
                  {language === 'es' ? 'Nivel Actual al Hablar' : 'Current Speaking Level'}
                </label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-hidden focus:border-[#0d382c] focus:bg-white transition-colors"
                >
                  <option value="beginner">
                    {language === 'es' ? 'Principiante (Entiendo poco y me cuesta hablar)' : 'Beginner (Can read, but struggle to speak)'}
                  </option>
                  <option value="intermediate">
                    {language === 'es' ? 'Intermedio (Entiendo bien, pero dudo al hablar)' : 'Intermediate (Understand, but hesitate to speak)'}
                  </option>
                  <option value="advanced">
                    {language === 'es' ? 'Avanzado (Quiero perfeccionar acento y negocios)' : 'Advanced (Need accent refinement & executive presence)'}
                  </option>
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-4 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{loading ? (language === 'es' ? 'Reservando...' : 'Securing Time Slot...') : (language === 'es' ? 'Confirmar Reserva de Sesión' : 'Confirm Consultation Booking')}</span>
              <ArrowRight className="w-4 h-4 text-[#66c310]" />
            </button>

            <p className="text-[11px] text-center text-stone-500 flex items-center justify-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-[#66c310]" />
              <span>{language === 'es' ? 'Enlace privado de Zoom enviado automáticamente' : 'Private Zoom link provided upon confirmation'}</span>
            </p>
          </form>
        ) : (
          <div className="text-center space-y-4 py-2 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#eefae8] text-[#0d382c] border border-[#c4eeb0] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-[#66c310]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#0d382c]">
                {language === 'es' ? '¡Sesión Reservada con Éxito!' : 'Session Reserved!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600">
                {language === 'es'
                  ? `¡Nos vemos el ${selectedDate}, ${name}!`
                  : `Looking forward to meeting you on ${selectedDate}, ${name}!`}
              </p>
              <p className="text-xs text-stone-500 pt-1">
                {language === 'es'
                  ? `La invitación de calendario y el link de Zoom se enviaron a ${email}.`
                  : `Calendar invite and Zoom link were sent to ${email}.`}
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-[#fafafa] border border-stone-200 text-left space-y-1.5 text-xs text-stone-700">
              <div className="font-bold text-[#0d382c] flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-[#66c310]" />
                <span>{language === 'es' ? 'Recomendaciones previas:' : 'Quick Preparation:'}</span>
              </div>
              <ul className="list-disc list-inside space-y-1 text-stone-600">
                <li>{language === 'es' ? 'Conéctate desde un lugar tranquilo con audífonos.' : 'Join from a quiet location with headphones/mic.'}</li>
                <li>{language === 'es' ? 'Ten en mente 1 o 2 situaciones reales donde sientas que te trabas.' : 'Bring 1-2 real scenarios where you feel hesitant speaking.'}</li>
              </ul>
            </div>

            <button
              onClick={() => {
                setStep('schedule');
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#0d382c] hover:bg-[#164c3c] text-white font-black text-sm shadow-xs transition-all cursor-pointer"
            >
              {language === 'es' ? 'Entendido' : 'Done'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};
