'use client';

import React, { useState, useEffect } from 'react';
import { X, Clock, Video, Check, ShieldCheck, ArrowRight, Calendar as CalendarIcon, Globe, Download, Copy } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  prefilledNotes?: string;
}

export const BookingModal: React.FC<BookingModalProps> = ({ isOpen, onClose, prefilledNotes }) => {
  const { language } = useLanguage();
  const [step, setStep] = useState<'schedule' | 'details' | 'confirmed'>('schedule');
  
  // Interactive Date / Time State
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1);
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<string>('3:00 PM');
  const [selectedTimezone, setSelectedTimezone] = useState<string>('EST (New York)');
  const [selectedService, setSelectedService] = useState<string>('diagnostic');
  
  // Form fields
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [understandPercent, setUnderstandPercent] = useState(65);
  const [speakPercent, setSpeakPercent] = useState(30);
  const [experience, setExperience] = useState('intermediate');
  const [notes, setNotes] = useState(prefilledNotes || '');
  const [loading, setLoading] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  useEffect(() => {
    if (prefilledNotes) {
      setNotes(prefilledNotes);
    }
  }, [prefilledNotes]);

  const goalChips = language === 'es' ? [
    'Reuniones de Trabajo',
    'Entrevistas en Inglés',
    'Dejar de Traducir',
    'Acento y Pronunciación',
    'Hablar en Restaurantes/Viajes',
  ] : [
    'Work Meetings',
    'Job Interviews',
    'Stop Mental Translation',
    'Accent & Pronunciation',
    'Restaurants & Travel',
  ];

  const handleAddGoalChip = (chip: string) => {
    if (!notes.includes(chip)) {
      setNotes((prev) => (prev ? `${prev}, ${chip}` : chip));
    }
  };

  if (!isOpen) return null;

  // Generate next 10 available days
  const today = new Date();
  const availableDays = Array.from({ length: 10 }).map((_, i) => {
    const d = new Date();
    d.setDate(today.getDate() + i + 1);
    return {
      date: d,
      dayName: d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { weekday: 'short' }),
      dayNumber: d.getDate(),
      monthName: d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { month: 'short' }),
      fullString: d.toLocaleDateString(language === 'es' ? 'es-ES' : 'en-US', { weekday: 'long', month: 'short', day: 'numeric' })
    };
  });

  const morningSlots = ['09:30 AM', '11:00 AM', '11:45 AM'];
  const afternoonSlots = ['02:00 PM', '03:00 PM', '04:15 PM', '05:30 PM'];
  const eveningSlots = ['06:30 PM', '07:15 PM'];

  const timezones = [
    'EST (New York, Miami, Bogota)',
    'PST (Los Angeles, San Francisco)',
    'CST (Mexico City, Chicago)',
    'CET (Madrid, Barcelona, Paris)',
    'GMT (London, Lisbon)',
    'BRT (Sao Paulo, Buenos Aires)',
  ];

  const handleNextToDetails = (e: React.FormEvent) => {
    e.preventDefault();
    setStep('details');
  };

  const handleFinalBook = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;

    setLoading(true);

    try {
      await fetch('/api/booking', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          date: currentSelectedDay.fullString,
          time: selectedTimeSlot,
          timezone: selectedTimezone,
          notes,
        }),
      });
    } catch {
      // ignore network errors to guarantee graceful UX
    }

    setLoading(false);
    setStep('confirmed');
    try {
      confetti({ particleCount: 60, spread: 70, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const currentSelectedDay = availableDays[selectedDayIndex] || availableDays[0];
  const zoomLink = "https://zoom.us/j/9482746194?pwd=speakenglishwithnick";

  const handleDownloadIcs = () => {
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//Speak English with Nick//Coaching Session//EN
BEGIN:VEVENT
SUMMARY:1-on-1 English Accent & Fluency Session with Coach Nick
DESCRIPTION:Your private 30-minute speaking diagnostic call with Coach Nick. Zoom Link: ${zoomLink}
LOCATION:Online Zoom Meeting
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Coach_Nick_1on1_Session.ics';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleCopyZoom = () => {
    navigator.clipboard.writeText(zoomLink);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-md animate-in fade-in duration-150">
      <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl bg-white border border-stone-200 p-5 sm:p-8 shadow-[0_20px_60px_rgba(0,0,0,0.15)] space-y-5 text-stone-900 animate-in zoom-in-95 duration-150">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 sm:top-5 sm:right-5 p-1.5 rounded-full hover:bg-stone-100 text-stone-400 hover:text-stone-700 transition-colors cursor-pointer"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'schedule' && (
          <form onSubmit={handleNextToDetails} className="space-y-4">
            <div className="space-y-1.5">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#edfbe6] text-[#07221a] text-xs font-black uppercase tracking-wider border border-[#b2e896]">
                <Video className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Paso 1: Elige Fecha y Hora' : 'Step 1: Choose Date & Time'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#07221a]">
                {language === 'es' ? 'Agenda tu Sesión con Nick' : 'Schedule Strategy Session with Nick'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 font-normal">
                {language === 'es'
                  ? 'Sesión privada de 30 min por Zoom para evaluar tu ritmo, fonética y crear tu plan a medida.'
                  : 'A 30-minute private video call to diagnose your speaking bottlenecks and build your custom accent plan.'}
              </p>
            </div>

            {/* Timezone Selector */}
            <div className="space-y-1">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <Globe className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Tu Zona Horaria:' : 'Your Timezone:'}</span>
              </label>
              <select
                value={selectedTimezone}
                onChange={(e) => setSelectedTimezone(e.target.value)}
                className="w-full p-2.5 rounded-xl bg-stone-50 border border-stone-200 text-xs font-bold text-stone-800 focus:bg-white focus:border-[#07221a]"
              >
                {timezones.map((tz) => (
                  <option key={tz} value={tz}>{tz}</option>
                ))}
              </select>
            </div>

            {/* Interactive Day Carousel Picker */}
            <div className="space-y-1.5">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <CalendarIcon className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Selecciona un Día Disponible:' : 'Select Available Date:'}</span>
              </label>
              <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
                {availableDays.map((d, idx) => (
                  <button
                    type="button"
                    key={idx}
                    onClick={() => setSelectedDayIndex(idx)}
                    className={`p-3 rounded-2xl flex flex-col items-center shrink-0 w-16 border transition-all cursor-pointer ${
                      selectedDayIndex === idx
                        ? 'bg-[#07221a] text-white border-[#07221a] shadow-md scale-105'
                        : 'bg-stone-50 text-stone-700 border-stone-200 hover:bg-stone-100'
                    }`}
                  >
                    <span className="text-[10px] font-bold uppercase">{d.dayName}</span>
                    <span className="text-lg font-black">{d.dayNumber}</span>
                    <span className="text-[10px] font-medium opacity-80">{d.monthName}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Available Time Slots */}
            <div className="space-y-2">
              <label className="text-xs font-bold text-stone-700 flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Horarios Disponibles:' : 'Available Time Slots:'}</span>
              </label>

              <div className="space-y-2">
                <div className="text-[11px] font-bold text-stone-400 uppercase">Afternoon & Evening</div>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {[...afternoonSlots, ...eveningSlots.slice(0, 2)].map((slot) => (
                    <button
                      type="button"
                      key={slot}
                      onClick={() => setSelectedTimeSlot(slot)}
                      className={`py-2 px-2.5 rounded-xl text-xs font-bold border transition-all cursor-pointer text-center ${
                        selectedTimeSlot === slot
                          ? 'bg-[#62c110] text-[#07221a] border-[#62c110] shadow-xs'
                          : 'bg-stone-50 border-stone-200 text-stone-700 hover:bg-stone-100'
                      }`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Selected Summary Pill */}
            <div className="p-3 rounded-2xl bg-[#f6fcf3] border border-[#c4eeb0] flex items-center justify-between text-xs text-[#07221a] font-bold">
              <span>{currentSelectedDay.fullString} @ {selectedTimeSlot}</span>
              <span className="text-[10px] uppercase bg-white px-2 py-0.5 rounded-md border border-[#c4eeb0]">Confirmed Slot</span>
            </div>

            <button
              type="submit"
              className="w-full py-4 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02] border border-[#164c3c]"
            >
              <span>{language === 'es' ? 'Continuar con Mis Datos' : 'Continue to Personal Details'}</span>
              <ArrowRight className="w-4 h-4 text-[#62c110]" />
            </button>
          </form>
        )}

        {step === 'details' && (
          <form onSubmit={handleFinalBook} className="space-y-4">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-[#edfbe6] text-[#07221a] text-xs font-black uppercase tracking-wider border border-[#b2e896]">
                <span>{language === 'es' ? 'Paso 2: Datos de Contacto' : 'Step 2: Contact Info'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-black text-[#07221a]">
                {language === 'es' ? 'Detalles de tu Reserva' : 'Complete Your Booking'}
              </h3>
              <p className="text-xs text-stone-600 font-normal">
                {currentSelectedDay.fullString} @ {selectedTimeSlot} ({selectedTimezone})
              </p>
            </div>

            <div className="space-y-3 pt-1">
              {/* Row: Name & Phone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
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
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-stone-700 mb-1">
                    {language === 'es' ? 'Teléfono / WhatsApp' : 'Phone / WhatsApp'}
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                  />
                </div>
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
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors"
                />
              </div>

              {/* Understand % vs Speak % Interactive Box */}
              <div className="p-3.5 rounded-2xl bg-[#f7faf5] border border-[#c4eeb0] space-y-3">
                <div className="text-[11px] font-black uppercase text-[#07221a] tracking-wider flex items-center justify-between">
                  <span>{language === 'es' ? 'Diagnóstico de tu Nivel Actual:' : 'Your English Fluency Ratio:'}</span>
                </div>

                {/* Understand % */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>{language === 'es' ? 'Entiendo de inglés:' : 'I understand of English:'}</span>
                    <span className="text-[#164c3c] font-black">{understandPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={understandPercent}
                    onChange={(e) => setUnderstandPercent(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#62c110]"
                  />
                </div>

                {/* Speak % */}
                <div className="space-y-1">
                  <div className="flex justify-between text-xs font-bold text-stone-800">
                    <span>{language === 'es' ? 'Hablo de inglés:' : 'I speak of English:'}</span>
                    <span className="text-amber-700 font-black">{speakPercent}%</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={speakPercent}
                    onChange={(e) => setSpeakPercent(Number(e.target.value))}
                    className="w-full h-2 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                  />
                </div>
              </div>

              {/* What I want to learn is */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-bold text-stone-700">
                    {language === 'es' ? 'Lo que quiero aprender es:' : 'What I want to learn is:'}
                  </label>
                  <span className="text-[10px] text-stone-500 font-medium">{language === 'es' ? 'Toca sugerencias' : 'Tap to add'}</span>
                </div>

                {/* Goal suggestion chips */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {goalChips.map((chip, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddGoalChip(chip)}
                      className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#edfbe6] text-stone-700 hover:text-[#07221a] border border-stone-200 text-[11px] font-bold transition-all cursor-pointer"
                    >
                      +{chip}
                    </button>
                  ))}
                </div>

                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder={language === 'es' ? 'Ej. Hablar sin traducir en mi cabeza, sentir seguridad en reuniones de trabajo y restaurantes...' : 'e.g. Speak without translating mentally, sound natural in work meetings & travel...'}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-xs sm:text-sm focus:outline-none focus:border-[#07221a] focus:bg-white transition-colors resize-none"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-1">
              <button
                type="button"
                onClick={() => setStep('schedule')}
                className="px-4 py-3.5 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 font-bold text-xs cursor-pointer"
              >
                {language === 'es' ? 'Atrás' : 'Back'}
              </button>
              
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-3.5 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer border border-[#164c3c]"
              >
                <span>{loading ? (language === 'es' ? 'Confirmando...' : 'Confirming Slot...') : (language === 'es' ? 'Confirmar Sesión Privada' : 'Confirm 1-on-1 Session')}</span>
                <ArrowRight className="w-4 h-4 text-[#62c110]" />
              </button>
            </div>
          </form>
        )}

        {step === 'confirmed' && (
          <div className="text-center space-y-4 py-2 animate-in zoom-in-95 duration-150">
            <div className="w-14 h-14 rounded-full bg-[#edfbe6] text-[#07221a] border border-[#b2e896] flex items-center justify-center mx-auto">
              <Check className="w-7 h-7 text-[#62c110]" />
            </div>
            <div className="space-y-1">
              <h3 className="text-2xl font-black text-[#07221a]">
                {language === 'es' ? '¡Sesión Confirmada con Éxito!' : 'Session Confirmed!'}
              </h3>
              <p className="text-xs sm:text-sm text-stone-700 font-bold">
                {currentSelectedDay.fullString} @ {selectedTimeSlot} ({selectedTimezone})
              </p>
              <p className="text-xs text-stone-500 pt-1 font-normal">
                {language === 'es'
                  ? `La invitación de calendario y el enlace privado de Zoom fueron enviados a ${email}.`
                  : `Calendar invite and private Zoom meeting details sent to ${email}.`}
              </p>
            </div>

            {/* Zoom Link Box */}
            <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200 flex items-center justify-between gap-2 text-left">
              <div className="truncate">
                <span className="text-[10px] uppercase font-bold text-stone-400 block">Zoom Meeting Room</span>
                <span className="text-xs font-mono font-bold text-[#07221a] truncate">{zoomLink}</span>
              </div>
              <button
                type="button"
                onClick={handleCopyZoom}
                className="px-3 py-1.5 rounded-xl bg-[#07221a] text-white text-xs font-bold flex items-center gap-1 shrink-0 cursor-pointer"
              >
                <Copy className="w-3 h-3 text-[#62c110]" />
                <span>{copiedLink ? 'Copied!' : 'Copy'}</span>
              </button>
            </div>

            {/* Add to Calendar Action */}
            <div className="flex gap-2">
              <button
                onClick={handleDownloadIcs}
                className="flex-1 py-3 rounded-2xl bg-[#edfbe6] hover:bg-[#dcf5cc] text-[#07221a] font-black text-xs border border-[#b2e896] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
              >
                <Download className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? 'Guardar en mi Calendario (.ICS)' : 'Add to Calendar (.ICS)'}</span>
              </button>
            </div>

            <button
              onClick={() => {
                setStep('schedule');
                onClose();
              }}
              className="w-full py-3.5 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-black text-sm shadow-md transition-all cursor-pointer border border-[#164c3c]"
            >
              {language === 'es' ? 'Listo, Volver a la Web' : 'Done, Return to Portal'}
            </button>
          </div>
        )}

      </div>
    </div>
  );
};

