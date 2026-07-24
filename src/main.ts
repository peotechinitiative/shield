import { Calculator } from './components/Calculator';
import { isFirstLaunch, savePIN, verifyPIN, hasPIN, resetPIN } from './utils/security';
import './style.css';

const app = document.getElementById('app')!;
let calculator: Calculator | null = null;

/* ── HOME PAGE (POST-UNLOCK) ── */
function renderHome(): void {
  app.innerHTML = `
    <div class="home-bg">
      <div class="home-overlay"></div>
      <div class="home-content">

        <!-- Header -->
        <header class="home-header">
          <div class="home-brand">
            <div class="home-logo">🛡️</div>
            <div>
              <h1>SHIELD</h1>
              <span>Personal Safety Companion</span>
            </div>
          </div>
          <button id="lock-btn" class="home-lock" title="Lock App">🔒</button>
        </header>

        <!-- Hero Status Card -->
        <section class="hero-card">
          <div class="hero-status">
            <div class="status-ring active">
              <svg viewBox="0 0 36 36">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle-fg" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="status-icon">✓</div>
            </div>
            <div class="status-text">
              <h2>Protected</h2>
              <p>Your safety network is active</p>
            </div>
          </div>
          <div class="hero-meta">
            <div class="meta-item">
              <span class="meta-value">Active</span>
              <span class="meta-label">Status</span>
            </div>
            <div class="meta-item">
              <span class="meta-value" id="live-clock">--:--</span>
              <span class="meta-label">Local Time</span>
            </div>
            <div class="meta-item">
              <span class="meta-value">ON</span>
              <span class="meta-label">Location</span>
            </div>
          </div>
        </section>

        <!-- Quick Actions Grid -->
        <section class="actions-section">
          <h3 class="section-title">Quick Actions</h3>
          <div class="actions-grid">
            <button class="action-card panic" data-action="panic">
              <div class="action-icon">🚨</div>
              <div class="action-label">Panic Alert</div>
              <div class="action-desc">Send emergency signal</div>
            </button>
            <button class="action-card checkin" data-action="checkin">
              <div class="action-icon">📍</div>
              <div class="action-label">Check In</div>
              <div class="action-desc">Share your location</div>
            </button>
            <button class="action-card contacts" data-action="contacts">
              <div class="action-icon">👥</div>
              <div class="action-label">Safe Circle</div>
              <div class="action-desc">Manage contacts</div>
            </button>
            <button class="action-card resources" data-action="resources">
              <div class="action-icon">📚</div>
              <div class="action-label">Resources</div>
              <div class="action-desc">Safety guides & help</div>
            </button>
          </div>
        </section>

        <!-- Recent Activity -->
        <section class="activity-section">
          <h3 class="section-title">Activity</h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div class="activity-info">
                <p>App secured with PIN</p>
                <span>Just now</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot blue"></div>
              <div class="activity-info">
                <p>Location services enabled</p>
                <span>Just now</span>
              </div>
            </div>
          </div>
        </section>

        <!-- Bottom Spacer -->
        <div class="home-spacer"></div>
      </div>

      <!-- Bottom Navigation -->
      <nav class="home-nav">
        <button class="nav-item active" data-tab="home">
          <span class="nav-icon">🏠</span>
          <span>Home</span>
        </button>
        <button class="nav-item" data-tab="map">
          <span class="nav-icon">🗺️</span>
          <span>Map</span>
        </button>
        <button class="nav-item nav-panic" data-tab="panic">
          <span class="nav-icon">🚨</span>
        </button>
        <button class="nav-item" data-tab="alerts">
          <span class="nav-icon">🔔</span>
          <span>Alerts</span>
        </button>
        <button class="nav-item" data-tab="settings">
          <span class="nav-icon">⚙️</span>
          <span>More</span>
        </button>
      </nav>
    </div>
  `;

  startClock();
  attachHomeListeners();
}

function startClock(): void {
  const update = () => {
    const el = document.getElementById('live-clock');
    if (el) {
      const now = new Date();
      el.textContent = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    }
  };
  update();
  setInterval(update, 1000);
}

function attachHomeListeners(): void {
  document.getElementById('lock-btn')?.addEventListener('click', () => {
    renderCalculator();
  });

  document.querySelectorAll('.action-card').forEach(card => {
    card.addEventListener('click', () => {
      const action = (card as HTMLElement).dataset.action;
      showToast(`${action?.toUpperCase()} activated`);
    });
  });

  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
      item.classList.add('active');
      const tab = (item as HTMLElement).dataset.tab;
      if (tab === 'panic') {
        showToast('🚨 PANIC MODE — Hold to confirm');
      }
    });
  });
}

function showToast(msg: string): void {
  const existing = document.querySelector('.home-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'home-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

/* ── SETUP WIZARD ── */
function renderSetupWizard(): void {
  app.innerHTML = `
    <div class="setup-wizard">
      <div class="setup-card">
        <div class="setup-icon">🔐</div>
        <h1>Create Your PIN</h1>
        <p class="setup-subtitle">Set a 4-digit PIN to unlock Shield. Disguise it as a calculator equation.</p>

        <div class="pin-input-group">
          <label>Enter PIN</label>
          <input type="password" id="pin1" maxlength="4" placeholder="••••" inputmode="numeric" pattern="[0-9]*">
        </div>

        <div class="pin-input-group">
          <label>Confirm PIN</label>
          <input type="password" id="pin2" maxlength="4" placeholder="••••" inputmode="numeric" pattern="[0-9]*">
        </div>

        <div class="setup-error" id="setup-error"></div>

        <button class="setup-button" id="setup-btn">Save PIN & Continue</button>

        <p class="setup-hint">Default unlock: <strong>2+4+6+8==</strong><br>You can change this later in settings.</p>
      </div>
    </div>
  `;

  const btn = document.getElementById('setup-btn')!;
  const pin1 = document.getElementById('pin1') as HTMLInputElement;
  const pin2 = document.getElementById('pin2') as HTMLInputElement;
  const error = document.getElementById('setup-error')!;

  btn.addEventListener('click', async () => {
    const p1 = pin1.value;
    const p2 = pin2.value;

    if (p1.length < 4 || p2.length < 4) {
      error.textContent = 'PIN must be 4 digits';
      return;
    }
    if (p1 !== p2) {
      error.textContent = 'PINs do not match';
      return;
    }

    await savePIN(p1);
    showToast('PIN saved successfully');
    renderHome();
  });
}

/* ── UNLOCK / PIN ENTRY ── */
function renderCalculator(): void {
  app.innerHTML = '';
  calculator = new Calculator(app, async (keyLog: string) => {
    console.log('DEBUG keyLog:', JSON.stringify(keyLog));

    if (isFirstLaunch()) {
      if (keyLog === '2+4+6+8=' || keyLog === '2+4+6+8==') {
        calculator?.destroy();
        renderSetupWizard();
        return true;
      }
      return false;
    }

    const ok = await verifyPIN(keyLog);
    if (ok) {
      calculator?.destroy();
      renderHome();
      return true;
    }
    return false;
  });
}

/* ── BOOT ── */
if (isFirstLaunch()) {
  renderCalculator();
} else {
  renderCalculator();
}