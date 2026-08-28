import { NextResponse } from 'next/server';
import { sendBookingEmail, COACH_EMAIL } from '@/lib/email';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, phone, date, time, timezone, notes } = body;

    if (!email || !name) {
      return NextResponse.json({ error: 'Name and email are required.' }, { status: 400 });
    }

    const emailResult = await sendBookingEmail({
      name,
      email,
      phone,
      date,
      time,
      timezone,
      notes,
    });

    console.log(`[Booking Processed] Student: ${name} <${email}> | Date: ${date} ${time} | Forwarded to: ${COACH_EMAIL} | Sent Status:`, emailResult);

    return NextResponse.json({
      success: true,
      coachEmail: COACH_EMAIL,
      emailSent: emailResult.sent,
      message: `Booking received and notification dispatched to ${COACH_EMAIL}`,
      refId: `BOOK-${Date.now().toString(36).toUpperCase()}`
    });
  } catch (error) {
    console.error('Booking API error:', error);
    return NextResponse.json({ error: 'Failed to process booking.' }, { status: 500 });
  }
}
