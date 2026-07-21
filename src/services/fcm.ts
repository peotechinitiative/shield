import { initializeApp } from 'firebase/app';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { toast } from '../utils/toast';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
};

let messaging: any = null;

export async function requestNotificationPermission(): Promise<boolean> {
  if (!('Notification' in window)) return false;
  const permission = await Notification.requestPermission();
  return permission === 'granted';
}

export async function initFCM(): Promise<void> {
  try {
    const app = initializeApp(firebaseConfig);
    messaging = getMessaging(app);
    
    const token = await getToken(messaging, {
      vapidKey: import.meta.env.VITE_FIREBASE_VAPID_KEY,
    });
    
    if (token) {
      console.log('FCM token:', token);
      // Save token to Supabase profile
      const { supabase } = await import('./supabase');
      const { data: userData } = await supabase.auth.getUser();
      if (userData.user) {
        await supabase.from('profiles').update({ fcm_token: token }).eq('id', userData.user.id);
      }
    }

    onMessage(messaging, (payload: any) => {
      console.log('Message received:', payload);
      toast(payload.notification?.title || 'New alert');
    });
  } catch (err) {
    console.log('FCM init failed:', err);
  }
}