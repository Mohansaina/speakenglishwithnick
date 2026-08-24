'use client';

import React from 'react';
import { courses } from '@/data/courses';
import { Check, Shield, Clock, ArrowRight, Star, Award } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { translations } from '@/data/translations';

interface ProgramsProps {
  onOpenBooking: () => void;
  onOpenLeadMagnet: () => void;
}

export const Programs: React.FC<ProgramsProps> = ({ onOpenBooking, onOpenLeadMagnet }) => {
  const { language } = useLanguage();
  const t = translations[language].programs;

  const getTranslatedCourse = (course: typeof courses[0]) => {
    if (language === 'es') {
      if (course.id === 'commute-blueprint') {
        return {
          title: "El Método de 20 Minutos al Día",
          subtitle: "Audios diarios para tu camino al trabajo, coche o caminata. Sin memorizar gramática.",
          level: "Principiante a Intermedio",
          badge: "Más Popular",
          cta: "Inscribirme en el Método",
          features: [
            "20 entrenamientos de audio prácticos (100% manos libres)",
            "Estructuras de rescate para reuniones y conversaciones",
            "Desglose de ritmo y entonación americana",
            "Guías PDF descargables de referencia rápida",
            "Acceso de por vida y comunidad de alumnos",
          ],
          idealFor: "Profesionales ocupados que no tienen tiempo para clases de 2 horas.",
        };
      }
      if (course.id === 'one-on-one-coaching') {
        return {
          title: "Mentoría VIP 1 a 1 con Nick",
          subtitle: "Entrenamiento privado en vivo para desbloquear tu barrera al hablar y pulir tu acento.",
          level: "Todos los Niveles",
          badge: "Cupos Limitados (4/Mes)",
          cta: "Postular a Mentoría 1 a 1",
          features: [
            "4 sesiones privadas en vivo de 45 minutos con Nick",
            "Diagnóstico acústico personalizado de tus bloqueos",
            "Feedback por notas de voz en WhatsApp entre sesiones",
            "Roleplays a medida: entrevistas, presentaciones y reuniones",
            "Vocabulario y frases específicas para tu industria",
          ],
          idealFor: "Quienes buscan entrevistas en inglés, ascensos o un salto cuántico en seguridad.",
        };
      }
      return {
        title: "Masterclass de Conversación Real",
        subtitle: "Aprende cómo conversan realmente los nativos sin tecnicismos ni palabras complicadas.",
        level: "Intermedio a Avanzado",
        badge: "Completo",
        cta: "Obtener Acceso Inmediato",
        features: [
          "60+ lecciones en video HD con mecánicas de conversación",
          "500+ frases coloquiales del día a día con ejercicios",
          "Ejercicios psicológicos para eliminar el miedo al error",
          "Frameworks de small talk para mantener viva cualquier charla",
          "Certificado de finalización y soporte",
        ],
        idealFor: "Quienes sienten que su inglés suena como un libro de texto y quieren sonar naturales.",
      };
    }
    return {
      title: course.title,
      subtitle: course.subtitle,
      level: course.level,
      badge: course.badge,
      cta: course.ctaText,
      features: course.features,
      idealFor: course.idealFor,
    };
  };

  return (
    <section id="programs" className="py-20 sm:py-28 relative bg-[#fafafa] border-b border-stone-200/80">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3 mb-14 sm:mb-16">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-[#eaf8dd] border border-[#66c310]/40 text-[#0d382c] text-xs font-black uppercase tracking-wider">
            <Award className="w-3.5 h-3.5 text-[#66c310]" />
            {t.tag}
          </div>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#0d382c] tracking-tight">
            {t.title}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 max-w-xl mx-auto">
            {t.subtitle}
          </p>
        </div>

        {/* Pricing Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
          {courses.map((course) => {
            const tr = getTranslatedCourse(course);

            return (
              <div
                key={course.id}
                className={`relative rounded-3xl p-7 sm:p-8 flex flex-col justify-between transition-all bg-white border-2 ${
                  course.featured
                    ? 'border-[#0d382c] shadow-xl lg:-translate-y-2 md:col-span-2 lg:col-span-1'
                    : 'border-stone-200/90 shadow-sm hover:border-[#66c310]'
                }`}
              >
                {/* Featured Badge */}
                {tr.badge && (
                  <div className={`absolute -top-3.5 left-7 px-3.5 py-0.5 rounded-full text-[11px] font-black tracking-wide uppercase ${
                    course.featured
                      ? 'bg-[#66c310] text-[#0b2d22] shadow-xs'
                      : 'bg-stone-100 text-stone-700 border border-stone-200'
                  }`}>
                    {tr.badge}
                  </div>
                )}

                {/* Course Info */}
                <div className="space-y-5">
                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-stone-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5 text-[#66c310]" />
                      <span>{course.duration}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-black text-[#0d382c]">
                      {tr.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
                      {tr.subtitle}
                    </p>
                  </div>

                  {/* Price Box */}
                  <div className="p-4 rounded-2xl bg-[#f4fbf0] border border-[#d0f4bd] flex items-baseline justify-between">
                    <div>
                      <div className="text-3xl sm:text-4xl font-black text-[#0d382c] flex items-baseline gap-2">
                        <span>{course.price}</span>
                        {course.originalPrice && (
                          <span className="text-sm line-through text-stone-400 font-semibold">
                            {course.originalPrice}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-stone-500 font-medium">
                        {language === 'es' ? 'Pago único • Acceso de por vida' : 'One-time payment • Lifetime access'}
                      </span>
                    </div>
                    <span className="text-[11px] font-extrabold px-2.5 py-1 rounded-md bg-white border border-[#c4eeb0] text-[#0d382c]">
                      {tr.level}
                    </span>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-1">
                    <span className="text-[11px] font-black text-stone-400 uppercase tracking-wider">
                      {language === 'es' ? 'Incluido en el entrenamiento:' : 'Included in the program:'}
                    </span>
                    <ul className="space-y-2">
                      {tr.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-stone-700 font-medium">
                          <Check className="w-4 h-4 text-[#66c310] shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Ideal for note */}
                  <div className="p-3.5 rounded-2xl bg-stone-50 text-xs text-stone-600 border border-stone-200/70">
                    <strong className="text-stone-900">{language === 'es' ? 'Ideal para: ' : 'Best for: '}</strong>
                    {tr.idealFor}
                  </div>
                </div>

                {/* CTA Button */}
                <div className="pt-6">
                  <button
                    onClick={course.id === 'one-on-one-coaching' ? onOpenBooking : onOpenLeadMagnet}
                    className={`w-full py-4 rounded-full font-black text-xs sm:text-sm transition-all flex items-center justify-center gap-2 cursor-pointer ${
                      course.featured
                        ? 'bg-[#66c310] hover:bg-[#58a80d] text-[#0b2d22] shadow-[0_4px_16px_rgba(102,195,16,0.3)]'
                        : 'bg-[#0d382c] hover:bg-[#164c3c] text-white'
                    }`}
                  >
                    <span>{tr.cta}</span>
                    <ArrowRight className="w-3.5 h-3.5 stroke-[2.5]" />
                  </button>
                </div>

              </div>
            );
          })}
        </div>

        {/* 30-Day Guarantee Banner */}
        <div className="mt-14 p-6 sm:p-7 rounded-3xl bg-white border-2 border-[#d0f4bd] max-w-2xl mx-auto flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left shadow-sm">
          <div className="p-3.5 rounded-2xl bg-[#eefae8] text-[#0d382c] shrink-0">
            <Shield className="w-7 h-7 text-[#66c310]" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm sm:text-base font-extrabold text-[#0d382c]">
              {language === 'es' ? 'Garantía Incondicional de 30 Días' : '30-Day Money-Back Guarantee'}
            </h4>
            <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
              {t.guarantee}
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
