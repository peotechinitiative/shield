// api/send-sms.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, body } = req.body;
  if (!to || !body) {
    return res.status(400).json({ error: 'Missing to or body' });
  }

  const client = twilio(
    process.env.TWILIO_ACCOUNT_SID!,
    process.env.TWILIO_AUTH_TOKEN!
  );

  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER!,
      to,
    });
    return res.status(200).json({ success: true, sid: message.sid });
  } catch (err: any) {
    console.error('Twilio error:', err);
    return res.status(500).json({ error: err.message });
  }
}