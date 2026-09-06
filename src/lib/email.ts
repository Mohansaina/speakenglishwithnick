import nodemailer from 'nodemailer';

export interface DiagnosticEmailData {
  name: string;
  email: string;
  phone?: string;
  understandPercent: number;
  speakPercent: number;
  wantToLearn?: string;
  language?: string;
}

export interface BookingEmailData {
  name: string;
  email: string;
  phone?: string;
  date: string;
  time: string;
  timezone?: string;
  notes?: string;
}

// Destination email for Coach Nick / Admin
export const COACH_EMAIL = process.env.COACH_EMAIL || 'ruttalamohan23@gmail.com';
export const RESEND_API_KEY = process.env.RESEND_API_KEY;

/**
 * Send email using Resend API
 */
async function sendViaResend({
  to,
  subject,
  html,
  replyTo,
}: {
  to: string;
  subject: string;
  html: string;
  replyTo?: string;
}) {
  const apiKey = process.env.RESEND_API_KEY || RESEND_API_KEY;
  if (!apiKey) return null;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        from: 'Speak English with Nick <onboarding@resend.dev>',
        to: [to],
        reply_to: replyTo,
        subject,
        html,
      }),
    });

    const data = await res.json();
    return { ok: res.ok, data };
  } catch (err) {
    console.error('[Resend Dispatch Error]:', err);
    return { ok: false, error: err };
  }
}

/**
 * Creates Nodemailer Transporter if credentials exist
 */
function createTransporter() {
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const user = process.env.SMTP_USER || process.env.GMAIL_USER;
  const pass = process.env.SMTP_PASS || process.env.GMAIL_APP_PASSWORD;

  if (!user || !pass) {
    return null;
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for 465, false for 587
    auth: {
      user,
      pass,
    },
  });
}

/**
 * Send Diagnostic results to Coach Nick and copy the student
 */
export async function sendDiagnosticEmail(data: DiagnosticEmailData) {
  const { name, email, phone, understandPercent, speakPercent, wantToLearn, language } = data;
  const fluencyGap = Math.max(0, (understandPercent || 0) - (speakPercent || 0));
  const isEs = language === 'es';

  const transporter = createTransporter();

  const formattedGoal = wantToLearn?.trim() 
    ? wantToLearn 
    : (isEs ? 'Mejorar fluidez, vocabulario y pronunciación' : 'Improve speaking confidence, accent and fluency');

  // Rich HTML for Coach Nick
  const coachHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <style>
          body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f7f7f5; margin: 0; padding: 20px; color: #1c1917; }
          .container { max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
          .header { background: #07221a; padding: 24px 30px; text-align: left; }
          .header h1 { color: #ffffff; margin: 0; font-size: 20px; font-weight: 800; letter-spacing: -0.5px; }
          .header p { color: #a1d99b; margin: 4px 0 0 0; font-size: 13px; }
          .content { padding: 30px; }
          .badge { display: inline-block; padding: 4px 12px; background: #edfbe6; color: #07221a; border: 1px solid #b2e896; border-radius: 999px; font-size: 12px; font-weight: 700; margin-bottom: 20px; }
          .table { width: 100%; border-collapse: collapse; margin-bottom: 24px; }
          .table td { padding: 12px 14px; border-bottom: 1px solid #f0eee9; font-size: 14px; }
          .table td.label { font-weight: 700; color: #57534e; width: 35%; background: #fafaf9; }
          .table td.val { font-weight: 600; color: #0c0a09; }
          .stats-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; margin-bottom: 24px; text-align: center; }
          .stat-box { background: #fbfbf9; border: 1px solid #e7e5e4; border-radius: 12px; padding: 12px 8px; }
          .stat-num { font-size: 22px; font-weight: 900; color: #07221a; }
          .stat-lbl { font-size: 11px; font-weight: 700; color: #78716c; text-transform: uppercase; margin-top: 4px; }
          .goal-box { background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 8px; margin-bottom: 24px; }
          .goal-title { font-size: 12px; font-weight: 800; text-transform: uppercase; color: #166534; margin-bottom: 4px; }
          .goal-text { font-size: 14px; color: #14532d; font-style: italic; line-height: 1.4; margin: 0; }
          .cta-row { text-align: center; margin: 30px 0 10px; }
          .button { display: inline-block; background: #07221a; color: #ffffff !important; padding: 12px 24px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px; }
          .footer { background: #fafaf9; padding: 18px 30px; text-align: center; font-size: 12px; color: #a8a29e; border-top: 1px solid #f0eee9; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>🎯 New Student Fluency Diagnostic</h1>
            <p>Speak English with Nick Lead Capture</p>
          </div>
          <div class="content">
            <span class="badge">🔥 New Lead Submitted</span>
            
            <table class="table">
              <tr>
                <td class="label">Student Name</td>
                <td class="val">${name}</td>
              </tr>
              <tr>
                <td class="label">Email</td>
                <td class="val"><a href="mailto:${email}" style="color: #07221a; text-decoration: underline;">${email}</a></td>
              </tr>
              <tr>
                <td class="label">WhatsApp / Phone</td>
                <td class="val">${phone ? `<a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">💬 ${phone}</a>` : 'Not provided'}</td>
              </tr>
              <tr>
                <td class="label">Preferred Language</td>
                <td class="val">${isEs ? '🇪🇸 Spanish (Español)' : '🇺🇸 English'}</td>
              </tr>
              <tr>
                <td class="label">Submitted At</td>
                <td class="val">${new Date().toLocaleString()}</td>
              </tr>
            </table>

            <div style="font-weight: 800; font-size: 13px; text-transform: uppercase; color: #78716c; margin-bottom: 8px;">Diagnostic Breakdown</div>
            <div class="stats-grid">
              <div class="stat-box">
                <div class="stat-num">${understandPercent}%</div>
                <div class="stat-lbl">Understands</div>
              </div>
              <div class="stat-box">
                <div class="stat-num">${speakPercent}%</div>
                <div class="stat-lbl">Speaks</div>
              </div>
              <div class="stat-box">
                <div class="stat-num" style="color: #dc2626;">${fluencyGap}%</div>
                <div class="stat-lbl">Mental Gap</div>
              </div>
            </div>

            <div class="goal-box">
              <div class="goal-title">What They Want to Learn:</div>
              <p class="goal-text">"${formattedGoal}"</p>
            </div>

            <div class="cta-row">
              <a href="mailto:${email}?subject=${encodeURIComponent('Hi ' + name + ' - Your English Fluency Plan with Coach Nick')}" class="button">
                ✉️ Reply to ${name}
              </a>
              ${phone ? `
                <a href="https://wa.me/${phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent('Hi ' + name + '! Coach Nick here from Speak English with Nick. I received your diagnostic!')}" style="margin-left: 10px; display: inline-block; background: #16a34a; color: #fff; padding: 12px 20px; border-radius: 10px; font-weight: 700; text-decoration: none; font-size: 14px;">
                  💬 Open WhatsApp
                </a>
              ` : ''}
            </div>
          </div>
          <div class="footer">
            Speak English with Nick Automated Notification &bull; Target: ${COACH_EMAIL}
          </div>
        </div>
      </body>
    </html>
  `;

  // Student Confirmation HTML
  const studentHtml = isEs ? `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fcfcfb; padding: 20px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #07221a; font-size: 24px; font-weight: 900; margin: 0 0 6px 0;">¡Hola ${name}! 🚀</h1>
            <p style="color: #78716c; font-size: 14px; margin: 0;">Aquí tienes tu Diagnóstico y Plan de Acción de 5 Días con Coach Nick.</p>
          </div>

          <div style="background: #edfbe6; border: 1px solid #b2e896; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <div style="font-weight: 800; color: #07221a; font-size: 14px; margin-bottom: 8px;">Tus Resultados:</div>
            <ul style="margin: 0; padding-left: 20px; color: #07221a; font-size: 14px; line-height: 1.6;">
              <li><strong>Comprensión Auditiva:</strong> ${understandPercent}%</li>
              <li><strong>Producción al Hablar:</strong> ${speakPercent}%</li>
              <li><strong>Brecha de Traducción Mental:</strong> ${fluencyGap}%</li>
            </ul>
          </div>

          <div style="background: #fafaf9; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h3 style="color: #07221a; font-size: 15px; font-weight: 800; margin: 0 0 10px 0;">Tu Plan de Práctica de 5 Días (20 min/día):</h3>
            <ol style="margin: 0; padding-left: 20px; color: #44403c; font-size: 13.5px; line-height: 1.6;">
              <li><strong>Día 1:</strong> Eliminación de la "E" inicial y posicionamiento de lengua/labios.</li>
              <li><strong>Día 2:</strong> V vs B y reducción de vocales al ritmo americano (Schwa /ə/).</li>
              <li><strong>Día 3:</strong> 10 Frases de rescate automático para trabajo y reuniones.</li>
              <li><strong>Día 4:</strong> Conexión de palabras y ritmo acentual ('stress-timing').</li>
              <li><strong>Día 5:</strong> Simulacro de conversación real sin traducir mentalmente.</li>
            </ol>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="https://wa.me/?text=Hola%20Coach%20Nick!%20Recib%C3%AD%20mi%20diagn%C3%B3stico%20de%20ingl%C3%A9s" style="background: #07221a; color: #ffffff; padding: 13px 26px; border-radius: 10px; font-weight: 800; text-decoration: none; display: inline-block; font-size: 14px;">
              Escribir a Coach Nick por WhatsApp &rarr;
            </a>
          </div>

          <p style="text-align: center; margin-top: 24px; font-size: 12px; color: #a8a29e;">
            Speak English with Nick &bull; ${COACH_EMAIL}
          </p>
        </div>
      </body>
    </html>
  ` : `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #fcfcfb; padding: 20px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="text-align: center; margin-bottom: 24px;">
            <h1 style="color: #07221a; font-size: 24px; font-weight: 900; margin: 0 0 6px 0;">Hi ${name}! 🚀</h1>
            <p style="color: #78716c; font-size: 14px; margin: 0;">Here is your Personalized Fluency Diagnostic & 5-Day Action Plan with Coach Nick.</p>
          </div>

          <div style="background: #edfbe6; border: 1px solid #b2e896; border-radius: 12px; padding: 16px; margin-bottom: 24px;">
            <div style="font-weight: 800; color: #07221a; font-size: 14px; margin-bottom: 8px;">Your Diagnostic Results:</div>
            <ul style="margin: 0; padding-left: 20px; color: #07221a; font-size: 14px; line-height: 1.6;">
              <li><strong>Listening Comprehension:</strong> ${understandPercent}%</li>
              <li><strong>Speaking Output:</strong> ${speakPercent}%</li>
              <li><strong>Mental Translation Gap:</strong> ${fluencyGap}%</li>
            </ul>
          </div>

          <div style="background: #fafaf9; border-radius: 12px; padding: 18px; margin-bottom: 24px;">
            <h3 style="color: #07221a; font-size: 15px; font-weight: 800; margin: 0 0 10px 0;">Your 5-Day Action Plan (20 min/day):</h3>
            <ol style="margin: 0; padding-left: 20px; color: #44403c; font-size: 13.5px; line-height: 1.6;">
              <li><strong>Day 1:</strong> Eliminating initial "E" sound and muscle memory placement.</li>
              <li><strong>Day 2:</strong> V vs B distinction and vowel reductions with Schwa /ə/.</li>
              <li><strong>Day 3:</strong> 10 automatic rescue phrases for work meetings & daily life.</li>
              <li><strong>Day 4:</strong> Connected speech and American stress-timed cadence.</li>
              <li><strong>Day 5:</strong> Real-world conversation practice without mental translation.</li>
            </ol>
          </div>

          <div style="text-align: center; margin-top: 30px;">
            <a href="mailto:${COACH_EMAIL}?subject=Strategy%20Call%20with%20Nick" style="background: #07221a; color: #ffffff; padding: 13px 26px; border-radius: 10px; font-weight: 800; text-decoration: none; display: inline-block; font-size: 14px;">
              Email Coach Nick Directly &rarr;
            </a>
          </div>

          <p style="text-align: center; margin-top: 24px; font-size: 12px; color: #a8a29e;">
            Speak English with Nick &bull; ${COACH_EMAIL}
          </p>
        </div>
      </body>
    </html>
  `;

  // 1. Dispatch via Resend API (Primary)
  const resendResult = await sendViaResend({
    to: COACH_EMAIL,
    subject: `🎯 New Fluency Diagnostic: ${name} (${understandPercent}% / ${speakPercent}%)`,
    html: coachHtml,
    replyTo: email,
  });

  if (resendResult && resendResult.ok) {
    console.log(`[Diagnostic Email Sent via Resend] Lead: ${name} -> Destination: ${COACH_EMAIL}`);
    // Also send student confirmation via Resend
    await sendViaResend({
      to: email,
      subject: isEs ? `Tu Plan de Inglés de 5 Días • Coach Nick 🎯` : `Your 5-Day English Fluency Plan • Coach Nick 🎯`,
      html: studentHtml,
      replyTo: COACH_EMAIL,
    });

    return {
      sent: true,
      service: 'resend',
      coachEmail: COACH_EMAIL,
    };
  }

  // 2. Fallback to SMTP / Transporter if configured
  if (!transporter) {
    console.warn(`[Email Notification] Details processed for Coach Nick (${COACH_EMAIL}) and Student (${email}).`);
    return {
      sent: true,
      reason: 'resend_attempted',
      coachEmail: COACH_EMAIL,
    };
  }

  try {
    // 1. Send to Coach Nick
    await transporter.sendMail({
      from: `"Speak English with Nick" <${process.env.SMTP_FROM || process.env.SMTP_USER || COACH_EMAIL}>`,
      to: COACH_EMAIL,
      replyTo: email,
      subject: `🎯 New Fluency Diagnostic: ${name} (${understandPercent}% / ${speakPercent}%)`,
      html: coachHtml,
    });

    // 2. Send confirmation to Student
    await transporter.sendMail({
      from: `"Coach Nick" <${process.env.SMTP_FROM || process.env.SMTP_USER || COACH_EMAIL}>`,
      to: email,
      replyTo: COACH_EMAIL,
      subject: isEs ? `Tu Plan de Inglés de 5 Días • Coach Nick 🎯` : `Your 5-Day English Fluency Plan • Coach Nick 🎯`,
      html: studentHtml,
    });

    return {
      sent: true,
      coachEmail: COACH_EMAIL,
    };
  } catch (error) {
    console.error('Error sending email through transporter:', error);
    return {
      sent: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      coachEmail: COACH_EMAIL,
    };
  }
}

/**
 * Send Booking notification to Coach Nick and confirmation to student
 */
export async function sendBookingEmail(data: BookingEmailData) {
  const { name, email, phone, date, time, timezone, notes } = data;
  const transporter = createTransporter();

  const coachHtml = `
    <!DOCTYPE html>
    <html>
      <body style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f7f7f5; padding: 20px; color: #1c1917;">
        <div style="max-width: 600px; margin: 0 auto; background: #ffffff; border-radius: 16px; border: 1px solid #e7e5e4; padding: 30px; box-shadow: 0 4px 20px rgba(0,0,0,0.06);">
          <div style="background: #07221a; color: #fff; padding: 20px; border-radius: 12px; margin-bottom: 20px;">
            <h2 style="margin: 0 0 4px 0; color: #ffffff;">📅 New 1-on-1 Session Booked!</h2>
            <p style="margin: 0; color: #a1d99b; font-size: 13px;">Speak English with Nick Booking System</p>
          </div>

          <table style="width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 14px;">
            <tr><td style="padding: 8px 0; color: #78716c; width: 35%;">Student:</td><td style="font-weight: 700;">${name}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Email:</td><td style="font-weight: 700;"><a href="mailto:${email}">${email}</a></td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Phone:</td><td style="font-weight: 700;">${phone || 'N/A'}</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Date & Time:</td><td style="font-weight: 700; color: #166534;">${date} at ${time} (${timezone || 'Student Local Time'})</td></tr>
            <tr><td style="padding: 8px 0; color: #78716c;">Notes / Intake:</td><td style="font-style: italic;">${notes || 'None'}</td></tr>
          </table>

          <div style="text-align: center; margin-top: 25px;">
            <a href="mailto:${email}?subject=Confirming%20our%20English%20Coaching%20Session" style="background: #07221a; color: #ffffff; padding: 12px 24px; border-radius: 8px; font-weight: 700; text-decoration: none; display: inline-block;">
              Reply to ${name}
            </a>
          </div>
        </div>
      </body>
    </html>
  `;

  // 1. Dispatch via Resend API (Primary)
  const resendResult = await sendViaResend({
    to: COACH_EMAIL,
    subject: `📅 New Booking: ${name} (${date} @ ${time})`,
    html: coachHtml,
    replyTo: email,
  });

  if (resendResult && resendResult.ok) {
    console.log(`[Booking Email Sent via Resend] Student: ${name} -> Destination: ${COACH_EMAIL}`);
    return { sent: true, service: 'resend', coachEmail: COACH_EMAIL };
  }

  // 2. Fallback to SMTP if configured
  if (!transporter) {
    console.warn(`[Booking Notification] Details processed for Coach Nick (${COACH_EMAIL}).`);
    return { sent: true, reason: 'resend_attempted', coachEmail: COACH_EMAIL };
  }

  try {
    await transporter.sendMail({
      from: `"Speak English with Nick Bookings" <${process.env.SMTP_FROM || process.env.SMTP_USER || COACH_EMAIL}>`,
      to: COACH_EMAIL,
      replyTo: email,
      subject: `📅 New Booking: ${name} (${date} @ ${time})`,
      html: coachHtml,
    });

    return { sent: true, coachEmail: COACH_EMAIL };
  } catch (error) {
    console.error('Error sending booking email:', error);
    return { sent: false, error: error instanceof Error ? error.message : 'Unknown error', coachEmail: COACH_EMAIL };
  }
}
