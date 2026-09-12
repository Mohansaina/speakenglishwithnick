import { NextResponse } from 'next/server';
import { sendDiagnosticEmail, COACH_EMAIL } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, understandPercent, speakPercent, wantToLearn, language } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const fluencyGap = Math.max(0, (understandPercent || 0) - (speakPercent || 0));

    // Send email using SMTP / Nodemailer
    const emailResult = await sendDiagnosticEmail({
      name,
      email,
      phone,
      understandPercent,
      speakPercent,
      wantToLearn,
      language,
    });

    console.log(`[Diagnostic Report Processed] Student: ${name} <${email}> | Phone: ${phone || 'N/A'} | Gap: ${fluencyGap}% | Forwarded to: ${COACH_EMAIL} | Sent Status:`, emailResult);

    return NextResponse.json({
      success: true,
      coachEmail: COACH_EMAIL,
      emailSent: emailResult.sent,
      message: language === 'es' 
        ? `Diagnóstico y plan de 3-5 días procesado exitosamente para ${email}` 
        : `Diagnostic and 3-5 day action plan processed successfully for ${email}`,
      refId: `DIAG-${Date.now().toString(36).toUpperCase()}`
    });
  } catch (error) {
    console.error('Diagnostic API error:', error);
    return NextResponse.json({ error: 'Failed to process diagnostic.' }, { status: 500 });
  }
}
