// api/send-alert.ts
import type { VercelRequest, VercelResponse } from '@vercel/node';
import twilio from 'twilio';
import admin from 'firebase-admin';

type EmergencyRequest = {
  to?: string;
  body?: string;
  title?: string;
  fcmToken?: string;
};

let firebaseInitialized = false;

function getFirebaseAdminApp() {
  if (firebaseInitialized) {
    return admin.app();
  }

  const serviceAccountJson = process.env.FIREBASE_SERVICE_ACCOUNT_JSON;

  if (!serviceAccountJson) {
    throw new Error('Firebase service account JSON is not configured');
  }

  const parsedServiceAccount = JSON.parse(serviceAccountJson) as Record<string, string>;

  admin.initializeApp({
    credential: admin.credential.cert(parsedServiceAccount),
  });

  firebaseInitialized = true;
  return admin.app();
}

async function sendPushNotification(token: string, title: string, body: string) {
  const app = getFirebaseAdminApp();
  const messaging = admin.messaging(app);

  const message = {
    token,
    notification: {
      title: title || 'Shield Alert',
      body,
    },
    data: {
      type: 'panic',
      body,
    },
  };

  return messaging.send(message);
}

async function sendSms(to: string, body: string) {
  const accountSid = process.env.TWILIO_ACCOUNT_SID;
  const authToken = process.env.TWILIO_AUTH_TOKEN;
  const from = process.env.TWILIO_PHONE_NUMBER;

  if (!accountSid || !authToken || !from) {
    throw new Error('Twilio environment variables are not configured');
  }

  const client = twilio(accountSid, authToken);
  const message = await client.messages.create({
    body,
    from,
    to,
  });

  return {
    sid: message.sid,
    status: message.status,
  };
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method === 'OPTIONS') {
    return res.status(204).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { to, body, title, fcmToken } = (req.body ?? {}) as EmergencyRequest;

  if (!to || !body) {
    return res.status(400).json({ error: 'Missing to or body' });
  }

  const pushTimeout = new Promise<never>((_, reject) => {
    setTimeout(() => reject(new Error('Push acknowledgement timeout after 30 seconds')), 30000);
  });

  try {
    if (fcmToken) {
      const pushResult = await Promise.race([
        sendPushNotification(fcmToken, title || 'Shield Alert', body),
        pushTimeout,
      ]);

      return res.status(200).json({
        success: true,
        channel: 'push',
        pushResult,
      });
    }

    throw new Error('FCM token is unavailable');
  } catch (pushError: any) {
    console.warn('Push delivery failed, falling back to SMS:', pushError?.message || pushError);

    try {
      const smsResult = await sendSms(to, body);
      return res.status(200).json({
        success: true,
        channel: 'sms',
        fallback: true,
        smsResult,
      });
    } catch (smsError: any) {
      console.error('SMS fallback failed:', smsError);
      return res.status(500).json({
        error: smsError?.message || 'Emergency delivery failed',
        fallback: true,
      });
    }
  }
}
