'use client';

import React, { useState } from 'react';
import { Volume2, CheckCircle2, AlertCircle, ArrowRight, ShieldCheck, Sparkles, Activity, Play, Pause } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';

interface SpanishSpeakersHubProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet?: () => void;
}

export const SpanishSpeakersHub: React.FC<SpanishSpeakersHubProps> = ({
  onOpenBooking,
}) => {
  const { language } = useLanguage();

  const [activeAudioTrap, setActiveAudioTrap] = useState<string | null>(null);
  const [playingVariant, setPlayingVariant] = useState<'bad' | 'good' | null>(null);

  const traps = [
    {
      id: 'trap-1',
      number: '01',
      title: language === 'es' ? 'La Trampa de la "E" Inicial' : 'The Initial "E" Sound Trap',
      subtitle: language === 'es' ? 'Palabras que empiezan con S + consonante' : 'Words starting with S + consonant',
      desc: language === 'es'
        ? 'En español no existen palabras que comiencen con "s + consonante", por lo que agregamos instintivamente una "e" al inicio.'
        : 'In Spanish, no words start with "s + consonant", so speakers instinctively add an "e" at the beginning.',
      incorrect: 'espeak, eschool, estudent',
      correct: 'speak, school, student (/s-/)',
      audioPromptBad: 'E-speak. E-school. E-student.',
      audioPromptGood: 'Speak. School. Student.',
      tip: language === 'es'
        ? 'Coloca la lengua en posición de "S" y suelta aire antes de encender tus cuerdas vocales.'
        : 'Start with gentle airflow on the "S" before activating your vocal cords.',
    },
    {
      id: 'trap-2',
      number: '02',
      title: language === 'es' ? 'Confusión de "V" vs "B" y "J"' : 'The "V" vs "B" & "J" Confusion',
      subtitle: language === 'es' ? 'Posición de labios y vibración dental' : 'Lip-and-teeth acoustic positioning',
      desc: language === 'es'
        ? 'En español la B y la V suenan casi idénticas. En inglés, "vote" y "boat" son palabras totalmente distintas.'
        : 'Spanish treats B and V nearly identically. In English, confusing "vote" and "boat" changes the entire meaning.',
      incorrect: 'vote sounds like boat (both lips touch)',
      correct: 'vote (teeth on lower lip) vs boat (both lips)',
      audioPromptBad: 'Boat. Boat.',
      audioPromptGood: 'Vote. Boat. Feel the vibration on your lower lip.',
      tip: language === 'es'
        ? 'Para la "V" en inglés, muerde suavemente el labio inferior con los dientes superiores y haz vibrar la voz.'
        : 'Upper teeth lightly touch the lower lip with continuous vocal vibration.',
    },
    {
      id: 'trap-3',
      number: '03',
      title: language === 'es' ? 'Ritmo y Reducción Vocálica (El Schwa /ə/)' : 'Sentence Stress & The Schwa /ə/',
      subtitle: language === 'es' ? 'El secreto de hablar rápido y fluido' : 'Why Americans talk fast without thinking',
      desc: language === 'es'
        ? 'El español pronuncia cada sílaba con fuerza. El inglés "come" las palabras pequeñas (to, of, for) convirtiéndolas en Schwa.'
        : 'Spanish pronounces every syllable clearly. English compresses grammatical words into the relaxed Schwa sound.',
      incorrect: 'I - WANT - TO - GO - TO - THE - STORE (Flat)',
      correct: 'I WAN-na GO to the STORE (Musical Waves)',
      audioPromptBad: 'I want to go to the store.',
      audioPromptGood: 'I wanna go to the store.',
      tip: language === 'es'
        ? 'Enfoca tu energía solo en las palabras clave y conecta las palabras de enlace sin esfuerzo.'
        : 'Focus your acoustic energy only on key content words and let the rest connect smoothly.',
    },
    {
      id: 'trap-4',
      number: '04',
      title: language === 'es' ? 'Eliminar la Ansiedad al Traducir' : 'Overcoming Translation Anxiety',
      subtitle: language === 'es' ? 'Estructuras de rescate automáticas' : 'Automatic conversational rescue bridges',
      desc: language === 'es'
        ? 'Dejar de armar frases en tu cabeza con reglas de gramática en español y usar plantillas automáticas nativas.'
        : 'Stop mentally translating word-by-word. Internalize natural conversational templates that buy you thinking time.',
      incorrect: 'I think... um... the goal is... uh... (4s pause)',
      correct: '"Let me put it this way: our main goal is..."',
      audioPromptBad: 'I think... um... the goal is... uh...',
      audioPromptGood: 'Let me put it this way: our main goal is clarity.',
      tip: language === 'es'
        ? 'Usa frases puente como "Let me put it this way..." para ganar 3 segundos de pensamiento fluido en reuniones.'
        : 'Use bridge templates like "Let me put it this way..." to gain 3-5 seconds of seamless thinking time.',
    },
  ];

  const handlePlayComparison = (trapId: string, variant: 'bad' | 'good', text: string) => {
    if (activeAudioTrap === trapId && playingVariant === variant) {
      if (typeof window !== 'undefined') window.speechSynthesis?.cancel();
      setActiveAudioTrap(null);
      setPlayingVariant(null);
      return;
    }

    setActiveAudioTrap(trapId);
    setPlayingVariant(variant);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.rate = variant === 'bad' ? 0.85 : 1.0;
      utterance.pitch = variant === 'bad' ? 0.9 : 1.05;

      const voices = window.speechSynthesis.getVoices();
      const enVoice = voices.find((v) => v.lang.startsWith('en-US') || v.lang.startsWith('en-GB'));
      if (enVoice) utterance.voice = enVoice;

      utterance.onend = () => {
        setActiveAudioTrap(null);
        setPlayingVariant(null);
      };
      utterance.onerror = () => {
        setActiveAudioTrap(null);
        setPlayingVariant(null);
      };
      window.speechSynthesis.speak(utterance);
    }
  };

  return (
    <section id="spanish-hub" className="py-20 sm:py-28 bg-[#f8f9f7] border-b border-stone-200/80 relative overflow-hidden">
      
      {/* Background Subtle Ambient Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[400px] bg-[#48529e]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c4d4f7] text-[#48529e] text-xs font-black uppercase tracking-wider shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-[#48529e]" />
            <span>{language === 'es' ? 'Especial Para Hispanohablantes' : 'Tailored For Spanish Speakers'}</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#18181b] tracking-tight leading-tight">
            {language === 'es' ? (
              <>
                Por qué los hispanohablantes se bloquean al hablar <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#48529e]">
                  (Y cómo solucionarlo con Teacher Nick)
                </span>
              </>
            ) : (
              <>
                Why Spanish Speakers Get Stuck in English <br className="hidden sm:inline" />
                <span className="font-serif italic font-normal text-[#48529e]">
                  (And How to Fix It With Teacher Nick)
                </span>
              </>
            )}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 max-w-2xl mx-auto font-normal leading-relaxed">
            {language === 'es'
              ? 'El español es un idioma de ritmo silábico (plano y constante); el inglés es un idioma de ritmo acentual (ondas musicales). Nick te enseña a reprogramar tus hábitos de sonido.'
              : 'Spanish is syllable-timed (flat rhythm); English is stress-timed (musical waves). Nick trains your muscles to switch rhythms naturally.'}
          </p>
        </div>

        {/* Visual Rhythm Comparison Showcase Banner */}
        <div className="mb-12 sm:mb-16 bg-white rounded-3xl p-6 sm:p-9 border border-stone-200 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            
            {/* Spanish Side */}
            <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-amber-50/70 border border-amber-200/80">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-amber-200/80 text-amber-900 text-xs font-black uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-600" />
                  {language === 'es' ? 'Ritmo del Español' : 'Spanish Rhythm'}
                </span>
                <span className="text-xs font-bold text-amber-800">Syllable-Timed (Plano)</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                {language === 'es' ? 'Cada sílaba dura exactamente lo mismo' : 'Every syllable has equal duration & volume'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'es'
                  ? 'Como una marcha constante (Ta - Ta - Ta - Ta). Si intentas hablar inglés así, suena robótico y cansado.'
                  : 'Constant metronome beat (Ta - Ta - Ta - Ta). Speaking English this way sounds flat and unnatural.'}
              </p>
              <div className="flex items-center gap-1.5 pt-2">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="flex-1 h-2 rounded-full bg-amber-400/90" />
                ))}
              </div>
            </div>

            {/* English Side */}
            <div className="space-y-3 p-5 sm:p-6 rounded-2xl bg-[#f4f7fd]/90 border border-[#48529e]/30">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-md bg-[#e4ebf9] text-[#48529e] text-xs font-black uppercase tracking-wide">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#48529e]" />
                  {language === 'es' ? 'Ritmo del Inglés Americano' : 'English Rhythm'}
                </span>
                <span className="text-xs font-bold text-[#48529e]">Stress-Timed (Ondas)</span>
              </div>
              <h4 className="text-base sm:text-lg font-black text-stone-900 leading-snug">
                {language === 'es' ? 'Palabras clave resaltan, las demás se comprimen' : 'Key words pop high, grammatical words shrink'}
              </h4>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                {language === 'es'
                  ? 'Ondas musicales (DA - da - DA - da). Las palabras de conexión se reducen al sonido Schwa /ə/.'
                  : 'Musical waves (DA - da - DA - da). Minor words contract into the relaxed Schwa sound for natural speed.'}
              </p>
              <div className="flex items-center gap-1.5 pt-2">
                <div className="h-4 w-1/4 rounded-full bg-[#48529e]" />
                <div className="h-1.5 w-1/8 rounded-full bg-[#48529e]/50" />
                <div className="h-5 w-1/3 rounded-full bg-[#48529e]" />
                <div className="h-1.5 w-1/8 rounded-full bg-[#48529e]/50" />
                <div className="h-3 w-1/5 rounded-full bg-[#48529e]" />
              </div>
            </div>

          </div>
        </div>

        {/* 4 Sound Traps & Solutions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {traps.map((trap) => (
            <div
              key={trap.id}
              className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200/90 shadow-[0_4px_20px_rgba(0,0,0,0.03)] hover:shadow-xl hover:border-[#48529e] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Card Top */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="w-8 h-8 rounded-full bg-[#48529e] text-white text-xs font-black flex items-center justify-center shadow-xs">
                    {trap.number}
                  </span>
                  <span className="text-[11px] font-bold text-stone-400 uppercase tracking-wider">
                    {trap.subtitle}
                  </span>
                </div>

                <div>
                  <h3 className="text-xl sm:text-2xl font-black text-stone-900 group-hover:text-[#48529e] transition-colors leading-snug">
                    {trap.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 mt-2 leading-relaxed">
                    {trap.desc}
                  </p>
                </div>

                {/* Incorrect vs Correct Breakdown */}
                <div className="space-y-2.5 pt-2">
                  
                  {/* Incorrect Box */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-rose-50/70 border border-rose-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-start gap-2 min-w-0">
                      <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-bold text-rose-900 block">
                          {language === 'es' ? 'Hábito a corregir:' : 'Common Mistake:'}
                        </span>
                        <span className="font-mono text-rose-700 text-[11px] block break-words">
                          {trap.incorrect}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayComparison(trap.id, 'bad', trap.audioPromptBad)}
                      className={`px-3 py-1.5 rounded-full text-[11px] font-bold border shrink-0 self-start sm:self-auto transition-all cursor-pointer flex items-center gap-1 ${
                        activeAudioTrap === trap.id && playingVariant === 'bad'
                          ? 'bg-rose-600 text-white border-rose-600 shadow-sm'
                          : 'bg-white text-rose-700 border-rose-300 hover:bg-rose-100'
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{activeAudioTrap === trap.id && playingVariant === 'bad' ? 'Pausar' : 'Oír Error'}</span>
                    </button>
                  </div>

                  {/* Correct Box */}
                  <div className="p-3 sm:p-3.5 rounded-2xl bg-[#e4ebf9] border border-[#c2d4f8] flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
                    <div className="flex items-start gap-2 min-w-0">
                      <CheckCircle2 className="w-4 h-4 text-[#48529e] shrink-0 mt-0.5" />
                      <div className="min-w-0">
                        <span className="font-bold text-[#48529e] block">
                          {language === 'es' ? 'Inglés natural fluido:' : 'Natural Native English:'}
                        </span>
                        <span className="font-mono text-[#373f7a] font-semibold text-[11px] block break-words">
                          {trap.correct}
                        </span>
                      </div>
                    </div>

                    <button
                      onClick={() => handlePlayComparison(trap.id, 'good', trap.audioPromptGood)}
                      className={`px-3.5 py-1.5 rounded-full text-[11px] font-black shrink-0 self-start sm:self-auto transition-all cursor-pointer flex items-center gap-1 ${
                        activeAudioTrap === trap.id && playingVariant === 'good'
                          ? 'bg-[#48529e] text-white shadow-sm'
                          : 'bg-[#f15555] hover:bg-[#d01f1f] text-white shadow-xs'
                      }`}
                    >
                      <Volume2 className="w-3 h-3" />
                      <span>{activeAudioTrap === trap.id && playingVariant === 'good' ? 'Pausar' : 'Oír Nativo'}</span>
                    </button>
                  </div>

                </div>

                {/* Pro Tip */}
                <div className="pt-2 flex items-start gap-2 text-xs text-stone-500 italic">
                  <span className="text-[#f15555] font-black not-italic shrink-0">💡 TIP:</span>
                  <span className="leading-relaxed">{trap.tip}</span>
                </div>
              </div>

              {/* Bottom Card Action */}
              <div className="pt-4 sm:pt-5 mt-4 sm:mt-5 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs font-semibold text-stone-500">
                  {language === 'es' ? 'Entrenamiento 1 a 1 con Nick' : '1-on-1 Guided Practice with Nick'}
                </span>
                <button
                  onClick={onOpenBooking}
                  className="text-xs font-black text-[#48529e] group-hover:text-[#f15555] flex items-center gap-1 transition-colors cursor-pointer"
                >
                  <span>{language === 'es' ? 'Corregir con Nick' : 'Practice with Nick'}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>

            </div>
          ))}
        </div>

        {/* Bottom CTA Banner */}
        <div className="mt-12 sm:mt-18 p-6 sm:p-10 rounded-3xl bg-[#48529e] text-white border border-[#373f7a] shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden text-center md:text-left">
          <div className="absolute top-0 right-0 w-80 h-80 bg-white/10 rounded-full blur-3xl pointer-events-none" />

          <div className="space-y-2 relative z-10">
            <div className="inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full bg-white/20 text-[#d4dcff] text-xs font-black uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>{language === 'es' ? 'Diagnóstico Personalizado' : 'Personalized Diagnostic'}</span>
            </div>
            <h3 className="text-xl sm:text-3xl font-black text-white leading-tight">
              {language === 'es'
                ? '¿Quieres identificar tus bloqueos de acento con Teacher Nick?'
                : 'Want to identify your specific speaking bottlenecks with Teacher Nick?'}
            </h3>
            <p className="text-xs sm:text-sm text-[#d4dcff] max-w-xl">
              {language === 'es'
                ? 'En una sesión 1 a 1 evaluamos tu pronunciación exacta, velocidad y confianza, creando tu plan de práctica de 5 días por WhatsApp.'
                : 'In a private 1-on-1 session, we diagnose your exact pronunciation patterns and design your 5-day WhatsApp practice routine.'}
            </p>
          </div>

          <button
            onClick={onOpenBooking}
            className="w-full md:w-auto px-7 py-4 rounded-full bg-[#f15555] hover:bg-[#e04444] text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 shrink-0 flex items-center justify-center gap-2 cursor-pointer relative z-10 active:scale-95"
          >
            <span>{language === 'es' ? 'Agendar Sesión 1 a 1 con Nick' : 'Book 1-on-1 Session with Nick'}</span>
            <ArrowRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
};



