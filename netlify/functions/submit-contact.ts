import { Resend } from 'resend';

// ============================================================
// Type Definitions
// ============================================================

interface ContactFormData {
  name: string;
  company: string;
  email: string;
  inquiryType: string;
  message: string;
  timestamp?: string;
  captchaToken?: string;
}

interface NetlifyEvent {
  body: string | null;
  headers: { [key: string]: string };
  httpMethod: string;
}

interface NetlifyResponse {
  statusCode: number;
  headers?: { [key: string]: string };
  body: string;
}

// ============================================================
// Configuration
// ============================================================

const CONFIG = {
  resendApiKey: process.env.RESEND_API_KEY,
  senderEmail: process.env.SENDER_EMAIL || 'noreply@xaikorea.ai.kr',
  recipientEmail: process.env.RECIPIENT_EMAIL || 'request@xaikorea.ai.kr',
  recaptchaSecretKey: process.env.RECAPTCHA_SECRET_KEY,
  allowedOrigin: process.env.ALLOWED_ORIGIN || '*',
};

const CORS_HEADERS = {
  'Access-Control-Allow-Origin': CONFIG.allowedOrigin,
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
  'Content-Type': 'application/json',
};

// ============================================================
// Utility Functions
// ============================================================

/**
 * Verify reCAPTCHA token with Google
 */
async function verifyCaptcha(
  token: string
): Promise<{ success: boolean; errorCodes?: string[] }> {
  if (!CONFIG.recaptchaSecretKey) {
    console.warn('reCAPTCHA secret key not configured, skipping verification');
    return { success: true };
  }

  try {
    const response = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${CONFIG.recaptchaSecretKey}&response=${token}`,
      }
    );

    const data = (await response.json()) as {
      success: boolean;
      'error-codes'?: string[];
    };
    return {
      success: data.success,
      errorCodes: data['error-codes'],
    };
  } catch (error) {
    console.error('reCAPTCHA verification failed:', error);
    return { success: false, errorCodes: ['verification-failed'] };
  }
}

/**
 * Format inquiry type to Korean/English
 */
function formatInquiryType(type: string): string {
  const types: { [key: string]: string } = {
    service: '서비스 문의',
    partnership: '파트너십 문의',
    technical: '기술 문의',
    other: '기타 문의',
  };
  return types[type] || type;
}

/**
 * Send email using Resend API
 */
async function sendEmailWithResend(
  formData: ContactFormData,
  timestamp: string
): Promise<void> {
  if (!CONFIG.resendApiKey) {
    throw new Error('RESEND_API_KEY is not configured');
  }

  const resend = new Resend(CONFIG.resendApiKey);

  const inquiryTypeKo = formatInquiryType(formData.inquiryType);

  const emailHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <style>
    body { font-family: 'Apple SD Gothic Neo', 'Malgun Gothic', sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 30px; border-radius: 10px 10px 0 0; }
    .header h1 { margin: 0; font-size: 24px; }
    .content { background: #f9fafb; padding: 30px; border: 1px solid #e5e7eb; }
    .field { margin-bottom: 20px; }
    .field-label { font-weight: bold; color: #6b7280; font-size: 12px; text-transform: uppercase; margin-bottom: 5px; }
    .field-value { background: white; padding: 12px; border-radius: 6px; border: 1px solid #e5e7eb; }
    .message-box { background: white; padding: 20px; border-radius: 6px; border-left: 4px solid #667eea; }
    .footer { background: #1f2937; color: #9ca3af; padding: 20px; text-align: center; border-radius: 0 0 10px 10px; font-size: 12px; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>📬 새로운 문의가 접수되었습니다</h1>
    </div>
    <div class="content">
      <div class="field">
        <div class="field-label">이름</div>
        <div class="field-value">${formData.name}</div>
      </div>
      <div class="field">
        <div class="field-label">회사</div>
        <div class="field-value">${formData.company || '(미입력)'}</div>
      </div>
      <div class="field">
        <div class="field-label">이메일</div>
        <div class="field-value"><a href="mailto:${formData.email}">${formData.email}</a></div>
      </div>
      <div class="field">
        <div class="field-label">문의 유형</div>
        <div class="field-value">${inquiryTypeKo}</div>
      </div>
      <div class="field">
        <div class="field-label">문의 내용</div>
        <div class="message-box">${formData.message.replace(/\n/g, '<br>')}</div>
      </div>
    </div>
    <div class="footer">
      <p>접수 시간: ${timestamp}</p>
      <p>XAI Korea Contact Form</p>
    </div>
  </div>
</body>
</html>
  `;

  const { error } = await resend.emails.send({
    from: `XAI Korea <${CONFIG.senderEmail}>`,
    to: [CONFIG.recipientEmail],
    replyTo: formData.email,
    subject: `[XAI Korea 문의] ${inquiryTypeKo} - ${formData.name}`,
    html: emailHtml,
  });

  if (error) {
    console.error('Resend email error:', error);
    throw new Error(`Failed to send email: ${error.message}`);
  }

  console.log(`Email sent successfully to ${CONFIG.recipientEmail}`);
}

// ============================================================
// Main Handler
// ============================================================

export async function handler(event: NetlifyEvent): Promise<NetlifyResponse> {
  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 204,
      headers: CORS_HEADERS,
      body: '',
    };
  }

  // Only allow POST
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: CORS_HEADERS,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  try {
    // Parse request body
    if (!event.body) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'Request body is required' }),
      };
    }

    const formData: ContactFormData = JSON.parse(event.body);

    // Validate required fields
    if (!formData.name || !formData.email || !formData.message) {
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({
          error: 'Name, email, and message are required',
        }),
      };
    }

    // Verify reCAPTCHA
    if (formData.captchaToken) {
      const captchaResult = await verifyCaptcha(formData.captchaToken);
      if (!captchaResult.success) {
        console.error('CAPTCHA verification failed:', captchaResult.errorCodes);
        return {
          statusCode: 400,
          headers: CORS_HEADERS,
          body: JSON.stringify({ error: 'CAPTCHA verification failed' }),
        };
      }
    } else if (CONFIG.recaptchaSecretKey) {
      // CAPTCHA required but not provided
      return {
        statusCode: 400,
        headers: CORS_HEADERS,
        body: JSON.stringify({ error: 'CAPTCHA token is required' }),
      };
    }

    // Generate timestamp
    const timestamp = new Date().toLocaleString('ko-KR', {
      timeZone: 'Asia/Seoul',
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });

    // Send email
    await sendEmailWithResend(formData, timestamp);

    return {
      statusCode: 200,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        success: true,
        message: '문의가 성공적으로 전송되었습니다.',
      }),
    };
  } catch (error) {
    console.error('Error processing contact form:', error);
    return {
      statusCode: 500,
      headers: CORS_HEADERS,
      body: JSON.stringify({
        error: 'Failed to process contact form',
        details: error instanceof Error ? error.message : 'Unknown error',
      }),
    };
  }
}
