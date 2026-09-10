'use client';

import React, { useState } from 'react';
import { quizQuestions, calculateQuizResult } from '@/data/quizData';
import { QuizResult } from '@/types';
import { Brain, ShieldAlert, Ear, BookOpen, Car, Clock, UserCheck, Briefcase, MessageSquare, Mic, ArrowRight, RotateCcw, Check, Compass, Award, Download, Calendar, BarChart3 } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import confetti from 'canvas-confetti';

interface FluencyQuizProps {
  onClose?: () => void;
  onSelectCourse?: (courseId: string) => void;
  onOpenBookingWithResult?: (resultDetails: string) => void;
}

export const FluencyQuiz: React.FC<FluencyQuizProps> = ({
  onClose,
  onSelectCourse,
  onOpenBookingWithResult,
}) => {
  const { language } = useLanguage();
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [result, setResult] = useState<QuizResult | null>(null);

  // Spanish Questions data
  const spanishQuestions = [
    {
      id: 1,
      question: 'Cuando intentas hablar en inglés en una situación real, ¿qué te sucede más seguido?',
      subtitle: 'Identifica tu bloqueo principal para personalizar tu plan diario de acento y fluidez.',
      options: [
        {
          label: 'Traduzco mentalmente palabra por palabra desde el español',
          description: 'Haces pausas constantes porque tu cerebro formula primero la frase en español.',
          iconName: 'Brain',
        },
        {
          label: 'Me bloqueo por miedo a cometer errores o pronunciar mal',
          description: 'Sabes qué decir en teoría, pero la ansiedad te frena de hablar en voz alta.',
          iconName: 'ShieldAlert',
        },
        {
          label: 'Me cuesta entender a los nativos cuando hablan rápido',
          description: 'Cuando usan modismos o unen palabras (connected speech), te pierdes a los pocos segundos.',
          iconName: 'Ear',
        },
        {
          label: 'Siento que mi vocabulario es muy básico y repetitivo',
          description: 'Terminas usando las mismas 50 palabras y no logras expresar ideas complejas.',
          iconName: 'BookOpen',
        }
      ]
    },
    {
      id: 2,
      question: '¿Cuánto tiempo puedes dedicar a practicar inglés al día de forma realista?',
      subtitle: 'La constancia diaria es 10 veces más efectiva que estudiar 3 horas el fin de semana.',
      options: [
        {
          label: '15 a 20 minutos en mi trayecto (auto, transporte o caminando)',
          description: 'Ideal para repetición acústica 100% manos libres mientras te trasladas.',
          iconName: 'Car',
        },
        {
          label: '30 a 45 minutos enfocados por la tarde o noche',
          description: 'Perfecto para lecciones en video interactivas y ejercicios de ritmo.',
          iconName: 'Clock',
        },
        {
          label: 'Mentoría intensiva en vivo 1 a 1 (sesiones privadas)',
          description: 'Máximo feedback personalizado, corrección de acento y roleplays laborales.',
          iconName: 'UserCheck',
        },
        {
          label: '5 a 10 minutos entre pausas de mi trabajo',
          description: 'Micro-ejercicios y frases de rescate para uso inmediato.',
          iconName: 'Clock',
        }
      ]
    },
    {
      id: 3,
      question: '¿Cuál es tu meta #1 en inglés para los próximos 90 días?',
      subtitle: 'Elige la transformación que tendrá mayor impacto en tu vida profesional y personal.',
      options: [
        {
          label: 'Pasar entrevistas y hablar con seguridad en reuniones de trabajo',
          description: 'Explicar tus ideas con soltura sin tartamudear ni trabarte.',
          iconName: 'Briefcase',
        },
        {
          label: 'Conversar con soltura en viajes y hacer amigos internacionales',
          description: 'Sentirte cómodo en situaciones sociales casuales sin vergüenza.',
          iconName: 'MessageSquare',
        },
        {
          label: 'Dejar de sentir inseguridad por mi acento y pronunciación',
          description: 'Hablar con entonación clara para que nadie te pida repetir lo que dijiste.',
          iconName: 'Mic',
        },
        {
          label: 'Hablar de manera automática sin traducir en mi mente',
          description: 'Desarrollar reflejo directo en inglés para pensar y responder sin esfuerzo.',
          iconName: 'Compass',
        }
      ]
    }
  ];

  const activeQuestions = language === 'es' ? spanishQuestions : quizQuestions;

  const handleSelectOption = (optionIndex: number) => {
    const newAnswers = [...answers, optionIndex];
    setAnswers(newAnswers);

    if (currentStep < activeQuestions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const calculatedResult = calculateQuizResult(newAnswers);
      setResult(calculatedResult);
      try {
        confetti({
          particleCount: 50,
          spread: 60,
          origin: { y: 0.6 }
        });
      } catch {
        // ignore
      }
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
    setAnswers([]);
    setResult(null);
  };

  const getIcon = (iconName: string) => {
    switch (iconName) {
      case 'Brain': return <Brain className="w-5 h-5 text-[#48529e]" />;
      case 'ShieldAlert': return <ShieldAlert className="w-5 h-5 text-[#48529e]" />;
      case 'Ear': return <Ear className="w-5 h-5 text-[#48529e]" />;
      case 'BookOpen': return <BookOpen className="w-5 h-5 text-[#48529e]" />;
      case 'Car': return <Car className="w-5 h-5 text-[#48529e]" />;
      case 'Clock': return <Clock className="w-5 h-5 text-[#48529e]" />;
      case 'UserCheck': return <UserCheck className="w-5 h-5 text-[#48529e]" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5 text-[#48529e]" />;
      case 'MessageSquare': return <MessageSquare className="w-5 h-5 text-[#48529e]" />;
      case 'Mic': return <Mic className="w-5 h-5 text-[#48529e]" />;
      default: return <Compass className="w-5 h-5 text-[#48529e]" />;
    }
  };

  const getSpanishArchetype = (res: QuizResult) => {
    if (answers[0] === 0) {
      return {
        archetype: 'El Traductor Mental',
        tagline: 'Construyes la frase en español antes de hablar en inglés',
        summary: 'Tu vocabulario pasivo es bueno, pero sufres fatiga mental porque tu cerebro procesa en dos idiomas a la vez. Necesitas entrenamiento de reflejo directo mediante frases de rescate acústicas.',
        barrier: 'Traducción simultánea español-inglés',
        scores: {
          accent: 78,
          confidence: 55,
          speed: 48,
          agility: 80,
        },
        plan: [
          'Reemplaza la gramática con 20 minutos diarios de repetición en voz alta ("shadowing").',
          'Memoriza patrones de 3 a 5 palabras completas en lugar de palabras sueltas.',
          'Deja de auto-corregirte en tiempo real: apunta a 80% de precisión y 100% de soltura.'
        ]
      };
    }
    if (answers[0] === 1) {
      return {
        archetype: 'El Perfeccionista con Miedo al Error',
        tagline: 'Alta comprensión, pero paralizado por temor a equivocarte',
        summary: 'Entiendes más del 80% de lo que dicen, pero la ansiedad te frena a participar en vivo. Necesitas un espacio seguro para soltarte y roleplays con feedback constructivo.',
        barrier: 'Ansiedad de desempeño y temor al juicio ajeno',
        scores: {
          accent: 85,
          confidence: 45,
          speed: 68,
          agility: 75,
        },
        plan: [
          'Aplica el principio "Comunica primero": el mensaje es 10 veces más importante que la perfección.',
          'Practica roleplays de situaciones laborales para desensibilizar la ansiedad.',
          'Interioriza frases de rescate para mantener la calma si te quedas en blanco.'
        ]
      };
    }
    if (answers[0] === 2) {
      return {
        archetype: 'El Abrumado por la Velocidad Nativa',
        tagline: 'Te pierdes cuando los nativos hablan a velocidad cotidiana',
        summary: 'Conoces el inglés estándar, pero las uniones de palabras (connected speech) y vocales reducidas te desconciertan. Necesitas entrenamiento de descompresión auditiva.',
        barrier: 'Procesamiento de uniones y reducciones sonoras',
        scores: {
          accent: 72,
          confidence: 60,
          speed: 50,
          agility: 70,
        },
        plan: [
          'Estudia el ritmo acentual en lugar de palabras aisladas.',
          'Domina las 50 uniones y reducciones más comunes en inglés americano.',
          'Aprende a pedir que hablen más despacio de forma asertiva y elegante.'
        ]
      };
    }
    return {
      archetype: 'El Comunicador en Búsqueda de Expresión',
      tagline: 'Quieres sonar profesional y natural sin repetir siempre lo mismo',
      summary: 'Te defiendes en inglés, pero sientes que no puedes mostrar tu verdadera inteligencia profesional por falta de modismos y matices.',
      barrier: 'Rango coloquial limitado y repetición de términos',
      scores: {
        accent: 82,
        confidence: 75,
        speed: 80,
        agility: 62,
      },
      plan: [
        'Aprende 5 frases clave de alto impacto diario en lugar de listas eternas del diccionario.',
        'Aplica las frases de inmediato en audios de práctica de 2 minutos.',
        'Enfócate en conectores conversacionales para hilar argumentos con soltura.'
      ]
    };
  };

  const handleDownloadRoadmap = (archetypeTitle: string, planList: string[]) => {
    const content = `=====================================================
PLAN PERSONALIZADO DE 90 DÍAS - COACH NICK
SPEAK ENGLISH WITH NICK (@speak.english.with.nick)
=====================================================

PERFIL AL HABLAR: ${archetypeTitle}
FECHA DE DIAGNÓSTICO: ${new Date().toLocaleDateString()}

RUTINA DIARIA RECOMENDADA:
- 20 Minutos al día en tu camino al trabajo, coche o caminata.
- 0% Memorización de listas de gramática.
- 100% Repetición acústica ('shadowing') en voz alta.

PASOS ACCIONABLES RECOMENDADOS:
${planList.map((p, i) => `${i + 1}. ${p}`).join('\n')}

LAS 3 FRASES DE RESCATE CLAVE PARA TU PERFIL:
1. "Could you please speak a little slower? I want to make sure I catch everything."
2. "Let me put it this way: our main goal is to keep things clear and efficient."
3. "That's a great question. Let me think about that for a second..."

¿Listo para feedback 1 a 1 en vivo con Coach Nick?
Agenda tu sesión diagnóstica en: https://speakenglishwithnick.com

¡Mucho éxito en tu camino hacia la fluidez natural!
`;

    if (typeof window !== 'undefined') {
      const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `Plan_Fluidez_90_Dias_${archetypeTitle.replace(/\s+/g, '_')}.txt`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto rounded-3xl bg-white border border-stone-200/90 shadow-[0_12px_40px_rgba(0,0,0,0.06)] p-5 sm:p-8 md:p-10 text-stone-900">
      
      {!result ? (
        <div className="space-y-6 sm:space-y-8">
          
          {/* Header & Step progress */}
          <div className="space-y-3">
            <div className="flex items-center justify-between text-xs font-bold text-stone-500">
              <span className="flex items-center gap-1.5 text-[#48529e]">
                <Compass className="w-3.5 h-3.5 text-[#f15555]" />
                {language === 'es'
                  ? `Pregunta ${currentStep + 1} de ${activeQuestions.length}`
                  : `Question ${currentStep + 1} of ${activeQuestions.length}`}
              </span>
              <span className="text-stone-400 font-semibold text-[11px] sm:text-xs">
                {language === 'es' ? 'Diagnóstico Personalizado' : 'Diagnostic Assessment'}
              </span>
            </div>

            {/* Clean Progress Bar with Indigo Theme */}
            <div className="w-full h-2 rounded-full bg-[#e4ebf9] overflow-hidden border border-[#c2d4f8]">
              <div
                className="h-full bg-[#48529e] rounded-full transition-all duration-300 shadow-xs"
                style={{ width: `${((currentStep + 1) / activeQuestions.length) * 100}%` }}
              />
            </div>

            <div className="pt-1.5">
              <h3 className="text-xl sm:text-2xl lg:text-3xl font-black text-[#1e244d] tracking-tight leading-snug">
                {activeQuestions[currentStep].question}
              </h3>
              <p className="text-xs sm:text-sm text-stone-600 mt-1">
                {activeQuestions[currentStep].subtitle}
              </p>
            </div>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5 sm:space-y-3">
            {activeQuestions[currentStep].options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleSelectOption(idx)}
                className="w-full text-left p-3.5 sm:p-5 rounded-2xl bg-[#fafafa] hover:bg-[#e4ebf9]/40 border border-stone-200/90 hover:border-[#48529e] group transition-all flex items-start gap-3 sm:gap-4 cursor-pointer hover:scale-[1.01] hover:shadow-md active:scale-[0.99]"
              >
                <div className="p-2 sm:p-2.5 rounded-xl bg-white border border-stone-200 group-hover:border-[#48529e] shrink-0 shadow-2xs group-hover:bg-[#e4ebf9] transition-colors">
                  {getIcon(option.iconName)}
                </div>
                <div className="flex-1 space-y-0.5 min-w-0">
                  <h4 className="font-bold text-stone-900 text-xs sm:text-base group-hover:text-[#48529e] leading-snug">
                    {option.label}
                  </h4>
                  <p className="text-[11px] sm:text-sm text-stone-600 leading-relaxed font-normal">
                    {option.description}
                  </p>
                </div>
                <div className="w-6 h-6 sm:w-7 sm:h-7 rounded-full border border-stone-300 flex items-center justify-center shrink-0 mt-1 group-hover:border-[#48529e] group-hover:bg-[#48529e] group-hover:text-white transition-colors">
                  <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-stone-400 group-hover:text-white" />
                </div>
              </button>
            ))}
          </div>

          {currentStep > 0 && (
            <div className="flex justify-between items-center pt-1">
              <button
                onClick={() => {
                  setCurrentStep(currentStep - 1);
                  setAnswers(answers.slice(0, -1));
                }}
                className="text-xs font-bold text-stone-500 hover:text-[#48529e] transition-colors cursor-pointer"
              >
                {language === 'es' ? '← Volver a la pregunta anterior' : '← Back to previous question'}
              </button>
            </div>
          )}
        </div>
      ) : (
        /* Results View */
        <div className="space-y-7 animate-in zoom-in-95 duration-200">
          
          {(() => {
            const esData = language === 'es' ? getSpanishArchetype(result) : null;
            const archetypeTitle = esData ? esData.archetype : result.archetype;
            const taglineText = esData ? esData.tagline : result.tagline;
            const barrierText = esData ? esData.barrier : result.primaryBarrier;
            const summaryText = esData ? esData.summary : result.summary;
            const planList = esData ? esData.plan : result.actionPlan;
            const scores = esData ? esData.scores : { accent: 82, confidence: 60, speed: 65, agility: 75 };

            return (
              <>
                <div className="text-center space-y-2.5 pb-6 border-b border-stone-100">
                  <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#e4ebf9] border border-[#c2d4f8] text-[#48529e] text-xs font-black uppercase tracking-wider">
                    <Award className="w-3.5 h-3.5 text-[#f15555]" />
                    <span>{language === 'es' ? 'Diagnóstico Completado' : 'Diagnostic Complete'}</span>
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-[#1e244d]">
                    {language === 'es' ? 'Tu Perfil al Hablar: ' : 'Your Speaking Archetype: '} <br />
                    <span className="text-[#48529e]">{archetypeTitle}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-stone-600 max-w-md mx-auto italic font-serif">
                    &ldquo;{taglineText}&rdquo;
                  </p>
                </div>

                {/* Multi-Dimensional Skill Radar Breakdown */}
                <div className="p-5 rounded-2xl bg-[#fafafa] border border-stone-200 space-y-3">
                  <div className="flex items-center justify-between text-xs font-black text-[#48529e] uppercase tracking-wider">
                    <span className="flex items-center gap-1.5">
                      <BarChart3 className="w-4 h-4 text-[#f15555]" />
                      {language === 'es' ? 'Desglose de Habilidades al Hablar' : 'Speaking Capability Dimensions'}
                    </span>
                    <span className="text-stone-500 font-normal">0 - 100%</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-stone-700">
                        <span>{language === 'es' ? 'Acento y Fonética' : 'Pronunciation & Accent'}</span>
                        <span className="text-[#48529e] font-black">{scores.accent}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#48529e] h-full rounded-full" style={{ width: `${scores.accent}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-stone-700">
                        <span>{language === 'es' ? 'Confianza sin Ansiedad' : 'Confidence & Calm'}</span>
                        <span className="text-[#48529e] font-black">{scores.confidence}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#48529e] h-full rounded-full" style={{ width: `${scores.confidence}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-stone-700">
                        <span>{language === 'es' ? 'Velocidad de Respuesta' : 'Response Speed (No translation)'}</span>
                        <span className="text-[#48529e] font-black">{scores.speed}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#48529e] h-full rounded-full" style={{ width: `${scores.speed}%` }} />
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="flex justify-between text-xs font-bold text-stone-700">
                        <span>{language === 'es' ? 'Agilidad de Vocabulario' : 'Vocabulary Agility'}</span>
                        <span className="text-[#48529e] font-black">{scores.agility}%</span>
                      </div>
                      <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                        <div className="bg-[#48529e] h-full rounded-full" style={{ width: `${scores.agility}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Analysis Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-5 rounded-2xl bg-[#fafafa] border border-stone-200 space-y-1.5">
                    <span className="text-[11px] font-black text-[#48529e] uppercase tracking-wider">
                      {language === 'es' ? 'Bloqueo Principal' : 'Primary Speaking Bottleneck'}
                    </span>
                    <p className="text-sm font-black text-stone-900">
                      {barrierText}
                    </p>
                    <p className="text-xs text-stone-600 leading-relaxed pt-1">
                      {summaryText}
                    </p>
                  </div>

                  <div className="p-5 rounded-2xl bg-[#fafafa] border border-stone-200 space-y-1.5">
                    <span className="text-[11px] font-black text-[#48529e] uppercase tracking-wider">
                      {language === 'es' ? 'Rutina Diaria Recomendada' : 'Recommended Daily Routine'}
                    </span>
                    <div className="text-2xl font-black text-[#1e244d]">
                      {result.recommendedDailyMinutes} {language === 'es' ? 'Minutos / Día' : 'Minutes / Day'}
                    </div>
                    <p className="text-xs text-stone-600 pt-1">
                      {language === 'es' ? 'Formato: ' : 'Format: '}
                      <strong className="text-stone-900">
                        {language === 'es' ? 'Repetición de audio en traslados' : result.recommendedFormat}
                      </strong>
                    </p>
                  </div>
                </div>

                {/* Action Plan */}
                <div className="p-5 rounded-2xl bg-[#e4ebf9]/60 border border-[#c2d4f8] space-y-3">
                  <div className="flex items-center justify-between">
                    <h4 className="text-xs font-black text-[#48529e] uppercase tracking-wider flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#f15555]" />
                      <span>{language === 'es' ? 'Plan de Acción Sugerido por Coach Nick' : "Coach Nick's 3-Step Action Plan"}</span>
                    </h4>

                    <button
                      onClick={() => handleDownloadRoadmap(archetypeTitle, planList)}
                      className="text-xs font-bold text-[#48529e] hover:text-[#f15555] flex items-center gap-1 cursor-pointer transition-colors"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>{language === 'es' ? 'Descargar Plan (TXT)' : 'Download Roadmap'}</span>
                    </button>
                  </div>

                  <div className="space-y-2">
                    {planList.map((step, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-800 font-medium">
                        <Check className="w-4 h-4 text-[#48529e] shrink-0 mt-0.5" />
                        <span>{step}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <button
                    onClick={() => {
                      if (onOpenBookingWithResult) {
                        onOpenBookingWithResult(`Quiz Archetype: ${archetypeTitle}. Primary Barrier: ${barrierText}`);
                      } else if (onSelectCourse) {
                        onSelectCourse(result.recommendedCourseId);
                      }
                    }}
                    className="w-full sm:flex-1 py-4 rounded-full bg-[#f15555] hover:bg-[#d01f1f] text-white font-black text-center text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
                  >
                    <Calendar className="w-4 h-4 text-white" />
                    <span>{language === 'es' ? 'Agendar Sesión con mi Diagnóstico' : 'Book 1-on-1 with My Diagnostic Attached'}</span>
                  </button>

                  <button
                    onClick={handleReset}
                    className="w-full sm:w-auto px-5 py-4 rounded-full bg-white border border-stone-200 hover:bg-stone-50 text-stone-700 text-xs font-bold transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>{language === 'es' ? 'Repetir Test' : 'Retake Quiz'}</span>
                  </button>
                </div>
              </>
            );
          })()}

        </div>
      )}

    </div>
  );
};
