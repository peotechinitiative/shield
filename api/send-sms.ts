// api/send-sms.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, body } = (req.body ?? {}) as { to?: string; body?: string };
  if (!to || !body) {
    return res.status(400).json({ error: 'Missing to or body' });
  }

  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    return res.status(500).json({ error: 'Twilio environment variables are not configured' });
  }

  const client = twilio(accountSid, authToken);

  try {
    const message = await client.messages.create({
      body,
      from,
      to,
    });

    return res.status(200).json({
      success: true,
      sid: message.sid,
      status: message.status,
    });
  } catch (err: any) {
    console.error('Twilio error:', err);
    return res.status(500).json({
      error: err?.message || 'Failed to send SMS',
    });
  }
}