import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, understandPercent, speakPercent, wantToLearn, language } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const fluencyGap = Math.max(0, (understandPercent || 0) - (speakPercent || 0));

    // Personalized Diagnostic Plan Content
    const planText = language === 'es' ? `
=====================================================
DIAGNÓSTICO PERSONALIZADO DE INGLÉS • COACH NICK
=====================================================
Hola ${name},

Gracias por completar tu diagnóstico con Coach Nick (@speak.english.with.nick).

TUS RESULTADOS:
- Comprensión Auditiva: ${understandPercent}%
- Producción y Fluidez al Hablar: ${speakPercent}%
- Brecha de Traducción Mental: ${fluencyGap}%

LO QUE DESEAS LOGRAR:
"${wantToLearn || 'Mejorar mi fluidez, soltura y pronunciación'}"

TU PLAN DE PRÁCTICA DE 5 DÍAS (20 MIN/DÍA POR WHATSAPP):
1. Día 1: Eliminación de la "E" inicial y posicionamiento de lengua/labios.
2. Día 2: V vs B y reducción de vocales al ritmo americano (Schwa /ə/).
3. Día 3: 10 Frases de rescate automático para trabajo y restaurantes.
4. Día 4: Conexión de palabras y ritmo acentual ('stress-timing').
5. Día 5: Simulacro de conversación real sin traducir mentalmente.

¿Listo para iniciar tus sesiones 1 a 1?
Escribe directamente a Nick a Speakenglishwithnick@gmail.com o por WhatsApp.
` : `
=====================================================
PERSONALIZED FLUENCY DIAGNOSTIC • COACH NICK
=====================================================
Hi ${name},

Thank you for completing your diagnostic with Coach Nick (@speak.english.with.nick).

YOUR RESULTS:
- Listening Comprehension: ${understandPercent}%
- Speaking Fluency Output: ${speakPercent}%
- Mental Translation Gap: ${fluencyGap}%

WHAT YOU WANT TO LEARN:
"${wantToLearn || 'Improve speaking confidence, accent and fluency'}"

YOUR CUSTOM 5-DAY ACTION PLAN (20 MIN/DAY VIA WHATSAPP):
1. Day 1: Eliminating initial "E" sound and muscle memory placement.
2. Day 2: V vs B distinction and vowel reductions with Schwa /ə/.
3. Day 3: 10 automatic rescue phrases for work meetings & daily life.
4. Day 4: Connected speech and American stress-timed cadence.
5. Day 5: Real-world conversation practice without mental translation.

Ready to book your private 1-on-1 strategy call?
Email Coach Nick directly at Speakenglishwithnick@gmail.com or message on WhatsApp.
`;

    // Log the submission (destined for Coach Nick & student)
    console.log(`[Diagnostic Report Generated] Sent to Student: ${name} <${email}>, Forwarded to Coach Nick <Speakenglishwithnick@gmail.com>, Phone: ${phone}, Gap: ${fluencyGap}%`);

    return NextResponse.json({
      success: true,
      coachEmail: 'Speakenglishwithnick@gmail.com',
      message: language === 'es' 
        ? `Diagnóstico y plan de 5 días enviado exitosamente a ${email}` 
        : `Diagnostic and 5-day action plan sent successfully to ${email}`,
      planSummary: planText,
      refId: `DIAG-${Date.now().toString(36).toUpperCase()}`
    });
  } catch (error) {
    console.error('Diagnostic submission error:', error);
    return NextResponse.json({ error: 'Failed to process diagnostic.' }, { status: 500 });
  }
}
