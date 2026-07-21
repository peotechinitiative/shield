import './style.css';
import { Calculator } from './components/Calculator';
import { Shell } from './components/Shell';
import { setLocale } from './services/i18n';

const app = document.getElementById('app')!;

// Initialize calculator disguise
const calculator = new Calculator(app, () => {
  calculator.destroy();
  
  // Render the app shell FIRST (always works)
    new Shell(app);
  
  // Then try to initialize auth in background (non-blocking)
  initAuthInBackground().catch(err => {
    console.log('Background auth init failed:', err);
  });
});

// Background auth — doesn't block the UI
async function initAuthInBackground() {
  // Dynamic import so if Supabase fails, app still loads
  const { supabase } = await import('./services/supabase');
  
  // Check existing session
  const { data: { session } } = await supabase.auth.getSession();
  
  if (!session) {
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.error('Auth error:', error);
      return;
    }
    console.log('Signed in anonymously:', data.user?.id);
  } else {
    console.log('Already signed in:', session.user.id);
  }

  // Set up trusted contacts (first time only)
  const { data: profile } = await supabase
    .from('profiles')
    .select('trusted_contacts')
    .single();
  
  if (!profile?.trusted_contacts || profile.trusted_contacts.length === 0) {
    const contacts = promptSetupContacts();
    if (contacts.length > 0) {
      const { data: userData } = await supabase.auth.getUser();
      await supabase
        .from('profiles')
        .update({ trusted_contacts: contacts })
        .eq('id', userData.user?.id);
    }
  }

  // Initialize push notifications (optional — won't crash if Firebase fails)
  try {
    const { requestNotificationPermission, initFCM } = await import('./services/fcm');
    await requestNotificationPermission();
    await initFCM();
  } catch (fcmErr) {
    console.log('Push notifications not available:', fcmErr);
  }
}

function promptSetupContacts(): Array<{ name: string; phone: string }> {
  const contacts = [];
  const name1 = prompt('Enter your trusted contact name (e.g. Sister Tolu):');
  if (name1) {
    const phone1 = prompt('Enter their phone number (e.g. +2348012345678):');
    if (phone1) contacts.push({ name: name1, phone: phone1 });
  }
  return contacts;
}

// Register Firebase service worker for push notifications
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/firebase-messaging-sw.js')
      .then(reg => console.log('FCM SW registered:', reg.scope))
      .catch(err => console.log('SW registration failed:', err));
  });
}

// Restore saved language
const savedLocale = localStorage.getItem('shield_locale') as 'en' | 'yo' | 'ha' | 'ig' | 'pj' | null;
if (savedLocale) setLocale(savedLocale);

console.log('App initialized');