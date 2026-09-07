'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { 
  MessageCircle, 
  ArrowRight, 
  CheckCircle2, 
  User, 
  Phone, 
  Mail, 
  Sparkles,
  Calendar,
  Download,
  ShieldCheck,
  Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DiagnosticIntakeProps {
  onOpenBookingWithNotes?: (notes: string) => void;
}

export const DiagnosticIntake: React.FC<DiagnosticIntakeProps> = ({ onOpenBookingWithNotes }) => {
  const { language } = useLanguage();
  
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [understandPercent, setUnderstandPercent] = useState(70);
  const [speakPercent, setSpeakPercent] = useState(30);
  const [wantToLearn, setWantToLearn] = useState('');
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const quickSuggestions = language === 'es' ? [
    'Reuniones de trabajo',
    'Entrevistas en inglés',
    'Dejar de traducir en mi cabeza',
    'Acento y pronunciación americana',
    'Restaurantes y viajes',
    'Confianza al hablar',
  ] : [
    'Work meetings & standups',
    'Job interviews',
    'Stop translating in my head',
    'American accent & pronunciation',
    'Restaurants & travel',
    'Speaking confidence',
  ];

  const handleAddSuggestion = (item: string) => {
    if (!wantToLearn.includes(item)) {
      setWantToLearn(prev => prev ? `${prev}, ${item}` : item);
    }
  };

  const handleDownloadCopy = () => {
    const fluencyGap = Math.max(0, understandPercent - speakPercent);
    const content = language === 'es' ? `=====================================================
DIAGNÓSTICO PERSONALIZADO DE INGLÉS • COACH NICK
=====================================================
Estudiante: ${name}
Correo: ${email}
WhatsApp: ${phone}

TUS RESULTADOS:
- Comprensión Auditiva: ${understandPercent}%
- Producción al Hablar: ${speakPercent}%
- Brecha de Traducción Mental: ${fluencyGap}%

LO QUE DESEAS LOGRAR:
"${wantToLearn || 'Mejorar mi fluidez y pronunciación'}"

TU PLAN DE PRÁCTICA DE 5 DÍAS (20 MIN/DÍA POR WHATSAPP):
1. Día 1: Eliminación de la "E" inicial y posicionamiento de lengua/labios.
2. Día 2: V vs B y reducción de vocales al ritmo americano (Schwa /ə/).
3. Día 3: 10 Frases de rescate automático para trabajo y restaurantes.
4. Día 4: Conexión de palabras y ritmo acentual ('stress-timing').
5. Día 5: Simulacro de conversación real sin traducir mentalmente.

Coach Nick (@speak.english.with.nick)
` : `=====================================================
PERSONALIZED FLUENCY DIAGNOSTIC • COACH NICK
=====================================================
Student: ${name}
Email: ${email}
WhatsApp: ${phone}

YOUR RESULTS:
- Listening Comprehension: ${understandPercent}%
- Speaking Fluency: ${speakPercent}%
- Translation Gap: ${fluencyGap}%

WHAT YOU WANT TO LEARN:
"${wantToLearn || 'Improve speaking flow and confidence'}"

YOUR 5-DAY ACTION PLAN (20 MIN/DAY VIA WHATSAPP):
1. Day 1: Eliminating initial "E" sound and muscle memory placement.
2. Day 2: V vs B distinction and vowel reductions with Schwa /ə/.
3. Day 3: 10 automatic rescue phrases for work meetings & daily life.
4. Day 4: Connected speech and American stress-timed cadence.
5. Day 5: Real-world conversation practice without mental translation.

Coach Nick (@speak.english.with.nick)
`;

    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = language === 'es' ? `Plan_Ingles_${name.replace(/\s+/g, '_')}_Coach_Nick.txt` : `Fluency_Plan_${name.replace(/\s+/g, '_')}_Coach_Nick.txt`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const handleSendEmail = () => {
    const subject = encodeURIComponent(
      language === 'es' ? `Diagnóstico de Inglés - ${name || 'Estudiante'}` : `English Diagnostic - ${name || 'Student'}`
    );
    const body = encodeURIComponent(
      language === 'es'
        ? `Hola Coach Nick! 👋\n\nAcabo de realizar mi diagnóstico en la web:\n\n• Nombre: ${name}\n• Email: ${email}\n• WhatsApp/Teléfono: ${phone || 'N/A'}\n• Entiendo de Inglés: ${understandPercent}%\n• Hablo de Inglés: ${speakPercent}%\n• Lo que quiero aprender: ${wantToLearn || 'Mejorar mi fluidez y soltura'}\n\n¿Cómo podemos empezar mi plan?`
        : `Hi Coach Nick! 👋\n\nI just completed my diagnostic intake:\n\n• Name: ${name}\n• Email: ${email}\n• Phone/WhatsApp: ${phone || 'N/A'}\n• Understand English: ${understandPercent}%\n• Speak English: ${speakPercent}%\n• What I want to learn: ${wantToLearn || 'Improve speaking confidence'}\n\nHow can we get started?`
    );
    window.location.href = `mailto:speakenglishwithnick@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    setLoading(true);

    const fluencyGap = Math.max(0, understandPercent - speakPercent);
    const formattedGoal = wantToLearn?.trim() ? wantToLearn : (language === 'es' ? 'Mejorar fluidez y pronunciación' : 'Improve speaking confidence, accent and fluency');

    try {
      // 1. Send directly to Web3Forms API from client browser (bypasses server-side bot block)
      const res = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: '95e2795a-6c55-4b7a-bda3-26b98c09baaa',
          subject: `🎯 New Fluency Diagnostic: ${name} (${understandPercent}% / ${speakPercent}%)`,
          from_name: 'Speak English with Nick Leads',
          name: name,
          email: email,
          replyto: email,
          message: `
🎯 NEW STUDENT FLUENCY DIAGNOSTIC

STUDENT DETAILS:
----------------------------------------
• Student Name: ${name}
• Email: ${email}
• WhatsApp / Phone: ${phone || 'Not provided'}
• Preferred Language: ${language === 'es' ? 'Spanish (Español)' : 'English'}

DIAGNOSTIC BREAKDOWN:
----------------------------------------
• Listening Comprehension: ${understandPercent}%
• Speaking Output: ${speakPercent}%
• Mental Translation Gap: ${fluencyGap}%

WHAT THEY WANT TO LEARN:
----------------------------------------
"${formattedGoal}"

DIRECT ACTIONS:
----------------------------------------
• Reply to Student: ${email}
${phone ? `• Open WhatsApp Chat: https://wa.me/${phone.replace(/[^0-9]/g, '')}` : ''}
`,
          "Student Name": name,
          "Student Email": email,
          "WhatsApp Phone": phone || 'Not provided',
          "Listening Score": `${understandPercent}%`,
          "Speaking Score": `${speakPercent}%`,
          "Translation Gap": `${fluencyGap}%`,
          "Student Goal": formattedGoal,
        }),
      });

      const resData = await res.json();
      console.log('[Web3Forms Diagnostic Dispatch Result]:', resData);
    } catch (err) {
      console.error('[Web3Forms Submission Error]:', err);
    }

    // Also notify internal route as backup
    try {
      fetch('/api/diagnostic', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          understandPercent,
          speakPercent,
          wantToLearn,
          language,
        }),
      }).catch(() => {});
    } catch {
      // ignore
    }

    setLoading(false);
    setSubmitted(true);

    try {
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
    } catch {
      // ignore
    }
  };

  const handleSendWhatsApp = () => {
    const text = language === 'es'
      ? `Hola Coach Nick! 👋
Nombre: ${name || 'Estudiante'}
Email: ${email || 'N/A'}
Teléfono: ${phone || 'N/A'}
Entiendo de inglés: ${understandPercent}%
Hablo de inglés: ${speakPercent}%
Lo que quiero aprender es: ${wantToLearn || 'Mejorar mi fluidez y soltura'}

¿Cómo podemos empezar?`
      : `Hi Coach Nick! 👋
Name: ${name || 'Student'}
Email: ${email || 'N/A'}
Phone: ${phone || 'N/A'}
I understand: ${understandPercent}% of English
I speak: ${speakPercent}% of English
What I want to learn is: ${wantToLearn || 'Improve speaking confidence and accent'}

How can we get started?`;

    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleBookDirect = () => {
    const notes = `Diagnostic: Name: ${name || 'Student'}, Email: ${email || 'N/A'}, Phone: ${phone || 'N/A'}, Understand: ${understandPercent}%, Speak: ${speakPercent}%. Goal: ${wantToLearn || 'Speaking Fluency'}.`;
    if (onOpenBookingWithNotes) {
      onOpenBookingWithNotes(notes);
    }
  };

  return (
    <section id="intake-form" className="py-12 sm:py-20 bg-[#fbfbfa] border-y border-stone-200/80">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Clean Header */}
        <div className="text-center space-y-2 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edfbe6] border border-[#b2e896] text-[#07221a] text-xs font-black uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5 text-[#62c110]" />
            <span>{language === 'es' ? 'Plan Personalizado con Nick' : 'Custom Action Plan with Nick'}</span>
          </div>
          
          <h2 className="text-2xl sm:text-4xl font-black text-[#07221a] tracking-tight">
            {language === 'es' ? 'Cuéntale a Nick sobre tu nivel' : 'Tell Nick About Your English Goals'}
          </h2>
          
          <p className="text-xs sm:text-sm text-stone-600 font-normal max-w-md mx-auto">
            {language === 'es'
              ? 'Completa estos datos y te enviaremos tu diagnóstico y plan de práctica de 5 días directamente a tu correo.'
              : 'Fill in your details below and we will send your custom diagnostic and 5-day action plan straight to your email.'}
          </p>
        </div>

        {/* Clean White Card Form */}
        <div className="bg-white rounded-3xl p-5 sm:p-9 border border-stone-200 shadow-[0_12px_40px_rgba(0,0,0,0.05)]">
          
          {!submitted ? (
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              
              {/* Row 1: Name, Email & Phone */}
              <div className="space-y-4">
                
                {/* 1. Name */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700">
                    {language === 'es' ? 'Nombre:' : 'Name:'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder={language === 'es' ? 'Tu nombre completo' : 'Your full name'}
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#07221a] transition-all"
                    />
                  </div>
                </div>

                {/* 2. Email Address */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-black uppercase tracking-wider text-stone-700">
                      {language === 'es' ? 'Correo Electrónico:' : 'Email Address:'} <span className="text-red-500">*</span>
                    </label>
                    <span className="text-[11px] text-[#164c3c] font-bold">
                      {language === 'es' ? 'Recibirás aquí tu plan' : 'We will send your plan here'}
                    </span>
                  </div>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu.correo@ejemplo.com"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#07221a] transition-all"
                    />
                  </div>
                </div>

                {/* 3. Phone number */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700">
                    {language === 'es' ? 'Teléfono (WhatsApp):' : 'Phone number (WhatsApp):'} <span className="text-red-500">*</span>
                  </label>
                  <div className="relative flex items-center">
                    <Phone className="w-4 h-4 text-stone-400 absolute left-3.5 pointer-events-none" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+1 (555) 000-0000"
                      className="w-full pl-10 pr-3.5 py-3 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 text-sm font-medium focus:bg-white focus:outline-none focus:border-[#07221a] transition-all"
                    />
                  </div>
                </div>

              </div>

              {/* Sliders Container */}
              <div className="p-4 sm:p-6 rounded-2xl bg-[#fafafa] border border-stone-200/90 space-y-5">
                
                {/* 4. I understand __ % of English */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-black text-stone-900">
                    <span>
                      {language === 'es' ? 'Entiendo el:' : 'I understand:'}{' '}
                      <span className="text-[#07221a] font-extrabold">{understandPercent}%</span>{' '}
                      {language === 'es' ? 'de inglés' : 'of English'}
                    </span>
                    <span className="text-[11px] font-bold text-[#164c3c] bg-[#edfbe6] px-2.5 py-0.5 rounded-full border border-[#c4eeb0]">
                      {understandPercent}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={understandPercent}
                    onChange={(e) => setUnderstandPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#62c110]"
                  />
                  
                  <div className="flex justify-between text-[10px] text-stone-600 font-bold uppercase tracking-wider">
                    <span>0% (Básico)</span>
                    <span>50% (Intermedio)</span>
                    <span>100% (Avanzado)</span>
                  </div>
                </div>

                {/* 5. I speak __ % of English */}
                <div className="space-y-2 pt-4 border-t border-stone-200">
                  <div className="flex items-center justify-between text-xs sm:text-sm font-black text-stone-900">
                    <span>
                      {language === 'es' ? 'Hablo el:' : 'I speak:'}{' '}
                      <span className="text-[#07221a] font-extrabold">{speakPercent}%</span>{' '}
                      {language === 'es' ? 'de inglés' : 'of English'}
                    </span>
                    <span className="text-[11px] font-bold text-amber-900 bg-amber-50 px-2.5 py-0.5 rounded-full border border-amber-200">
                      {speakPercent}%
                    </span>
                  </div>

                  <input
                    type="range"
                    min="0"
                    max="100"
                    step="5"
                    value={speakPercent}
                    onChange={(e) => setSpeakPercent(Number(e.target.value))}
                    className="w-full h-2.5 bg-stone-200 rounded-lg appearance-none cursor-pointer accent-[#f59e0b]"
                  />

                  <div className="flex justify-between text-[10px] text-stone-600 font-bold uppercase tracking-wider">
                    <span>0% (Me bloqueo)</span>
                    <span>50% (Frases cortas)</span>
                    <span>100% (Fluidez total)</span>
                  </div>
                </div>

              </div>

              {/* 6. What I want to learn is */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-black uppercase tracking-wider text-stone-700">
                    {language === 'es' ? 'Lo que quiero aprender es:' : 'What I want to learn is:'}
                  </label>
                  <span className="text-[10px] text-stone-600 font-bold">{language === 'es' ? 'Toca sugerencias' : 'Tap to add'}</span>
                </div>

                {/* Quick tap chips */}
                <div className="flex flex-wrap gap-1.5 pb-1">
                  {quickSuggestions.map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddSuggestion(item)}
                      className="px-2.5 py-1 rounded-full bg-stone-100 hover:bg-[#edfbe6] text-stone-700 hover:text-[#07221a] border border-stone-200 text-[11px] font-bold transition-all cursor-pointer active:scale-95"
                    >
                      +{item}
                    </button>
                  ))}
                </div>

                {/* The Box */}
                <textarea
                  rows={3}
                  required
                  value={wantToLearn}
                  onChange={(e) => setWantToLearn(e.target.value)}
                  placeholder={language === 'es' 
                    ? 'Escribe aquí qué quieres lograr, tus metas de trabajo o qué situaciones te cuestan más...' 
                    : 'Describe what you want to learn, your work goals, or what speaking situations challenge you most...'}
                  className="w-full p-3.5 sm:p-4 rounded-2xl bg-stone-50 border border-stone-200 text-stone-900 placeholder-stone-500 text-xs sm:text-sm font-medium focus:bg-white focus:outline-none focus:border-[#07221a] transition-all resize-none leading-relaxed"
                />
              </div>

              {/* Submit Action */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-black text-sm sm:text-base shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.01] active:scale-95 border border-[#164c3c]"
              >
                <Send className="w-4 h-4 text-[#62c110]" />
                <span>
                  {loading 
                    ? (language === 'es' ? 'Enviando a tu correo...' : 'Sending to your email...') 
                    : (language === 'es' ? 'Enviar Diagnóstico a Mi Correo' : 'Send Diagnostic to My Email')}
                </span>
                <ArrowRight className="w-4 h-4 text-[#62c110]" />
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[11px] text-stone-500 pt-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#62c110]" />
                <span>{language === 'es' ? '100% Confidencial • Recibirás una copia en tu bandeja de entrada' : '100% Confidential • You will receive a copy in your inbox'}</span>
              </div>

            </form>
          ) : (
            /* Confirmation & Direct Connect */
            <div className="text-center space-y-5 py-4 animate-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-[#edfbe6] text-[#07221a] border border-[#b2e896] flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-7 h-7 text-[#62c110]" />
              </div>

              <div className="space-y-1">
                <h3 className="text-xl sm:text-2xl font-black text-[#07221a]">
                  {language === 'es' ? `¡Diagnóstico Enviado con Éxito!` : `Diagnostic Sent Successfully!`}
                </h3>
                <p className="text-xs sm:text-sm text-stone-600 font-normal">
                  {language === 'es'
                    ? `Hemos remitido tus datos a Coach Nick (speakenglishwithnick@gmail.com) y enviado una copia a ${email}.`
                    : `Your diagnostic was forwarded to Coach Nick (speakenglishwithnick@gmail.com) and a copy sent to ${email}.`}
                </p>
                <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#edfbe6] text-[#07221a] text-[11px] font-black border border-[#b2e896] mt-2">
                  <Mail className="w-3.5 h-3.5 text-[#16a34a]" />
                  <span>speakenglishwithnick@gmail.com</span>
                </div>
              </div>

              {/* Summary */}
              <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 text-left space-y-2 text-xs sm:text-sm">
                <div className="flex justify-between pb-1.5 border-b border-stone-200 font-bold">
                  <span className="text-stone-500">Email:</span>
                  <span className="text-[#164c3c] font-bold">{email}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-stone-200 font-bold">
                  <span className="text-stone-500">WhatsApp:</span>
                  <span className="text-stone-900">{phone || 'N/A'}</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-stone-200 font-bold">
                  <span className="text-stone-500">{language === 'es' ? 'Entiendes / Hablas:' : 'Understand / Speak:'}</span>
                  <span className="text-stone-900">{understandPercent}% / {speakPercent}%</span>
                </div>
                <div>
                  <span className="text-stone-500 block mb-0.5 font-bold">{language === 'es' ? 'Tu meta:' : 'Your goal:'}</span>
                  <p className="text-stone-800 italic">&ldquo;{wantToLearn}&rdquo;</p>
                </div>
              </div>

              {/* Next step buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-2">
                <button
                  type="button"
                  onClick={handleDownloadCopy}
                  className="py-3 px-4 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-800 font-bold text-xs shadow-xs flex items-center justify-center gap-1.5 cursor-pointer transition-all"
                >
                  <Download className="w-4 h-4 text-stone-600" />
                  <span>{language === 'es' ? 'Descargar (.TXT)' : 'Download (.TXT)'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleSendWhatsApp}
                  className="py-3 px-4 rounded-full bg-[#25D366] hover:bg-[#20bd5a] text-black font-black text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <MessageCircle className="w-4 h-4 fill-black" />
                  <span>{language === 'es' ? 'WhatsApp Nick' : 'WhatsApp Nick'}</span>
                </button>

                <button
                  type="button"
                  onClick={handleBookDirect}
                  className="py-3 px-4 rounded-full bg-[#07221a] hover:bg-[#164c3c] text-white font-bold text-xs shadow-md flex items-center justify-center gap-1.5 cursor-pointer transition-all hover:scale-[1.02]"
                >
                  <Calendar className="w-4 h-4 text-[#62c110]" />
                  <span>{language === 'es' ? 'Agendar 1 a 1' : 'Book 1-on-1'}</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setSubmitted(false)}
                className="text-xs text-stone-500 hover:text-stone-800 underline cursor-pointer pt-1"
              >
                {language === 'es' ? '← Modificar datos o enviar a otro correo' : '← Edit inputs or send to another email'}
              </button>
            </div>
          )}

        </div>

      </div>
    </section>
  );
};
