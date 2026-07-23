import './style.css';
import { Calculator } from './components/Calculator';
import { Shell } from './components/Shell';
import { setLocale } from './services/i18n';
import { isFirstLaunch, verifyPIN, savePIN, hashPIN } from './utils/security';

const app = document.getElementById('app')!;

// ── PIN SETUP WIZARD (first launch) ──
function showSetupWizard(onComplete: () => void) {
  app.innerHTML = '';

  const container = document.createElement('div');
  container.className = 'setup-wizard';
  container.innerHTML = `
    <div class="setup-card">
      <div class="setup-icon">🔐</div>
      <h1>Create Your Secret PIN</h1>
      <p class="setup-subtitle">This PIN will unlock your Shield app. Choose something you can remember but others won't guess.</p>

      <div class="pin-input-group">
        <label>Enter 4-6 digit PIN</label>
        <input type="password" id="pin-input" maxlength="6" inputmode="numeric" pattern="[0-9]*" placeholder="••••••" />
      </div>

      <div class="pin-input-group">
        <label>Confirm PIN</label>
        <input type="password" id="pin-confirm" maxlength="6" inputmode="numeric" pattern="[0-9]*" placeholder="••••••" />
      </div>

      <p id="setup-error" class="setup-error"></p>

      <button id="setup-btn" class="setup-button">Save PIN & Continue</button>

      <p class="setup-hint">💡 Tip: Use a PIN that looks like a normal calculation (e.g., 2+4+6+8=20)</p>
    </div>
  `;

  app.appendChild(container);

  const pinInput = container.querySelector('#pin-input') as HTMLInputElement;
  const pinConfirm = container.querySelector('#pin-confirm') as HTMLInputElement;
  const setupBtn = container.querySelector('#setup-btn') as HTMLButtonElement;
  const errorEl = container.querySelector('#setup-error') as HTMLParagraphElement;

  setupBtn.addEventListener('click', async () => {
    const pin = pinInput.value.trim();
    const confirm = pinConfirm.value.trim();

    if (pin.length < 4) {
      errorEl.textContent = 'PIN must be at least 4 digits';
      return;
    }
    if (pin !== confirm) {
      errorEl.textContent = 'PINs do not match';
      return;
    }

    await savePIN(pin);
    onComplete();
  });

  // Allow Enter key
  pinConfirm.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') setupBtn.click();
  });
}

// ── SAFETY SCREEN (after unlock) ──
function showSafetyScreen() {
  calculator.destroy();
  new Shell(app);

  // Then try to initialize auth in background (non-blocking)
  initAuthInBackground().catch(err => {
    console.log('Background auth init failed:', err);
  });
}

// ── MAIN APP FLOW ──
const calculator = new Calculator(app, async (keyLog: string) => {
  // FIRST LAUNCH: Default PIN opens setup wizard
  if (isFirstLaunch() && keyLog === '2-4-6-8-=-=') {
    showSetupWizard(() => {
      // After setup, show the safety screen
      showSafetyScreen();
    });
    return true; // Signal that unlock was handled
  }

  // AFTER SETUP: Only custom PIN works
  if (!isFirstLaunch()) {
    const isValid = await verifyPIN(keyLog);
    if (isValid) {
      showSafetyScreen();
      return true; // Signal that unlock was handled
    }
  }

  return false; // Not an unlock attempt, normal calculator use
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