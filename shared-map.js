import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.0';

const params = new URLSearchParams(window.location.search);
const checkInId = params.get('id');
const token = params.get('t');

const SUPABASE_URL = 'https://pxfutrhaaraazfjqcfml.supabase.co';
const SUPABASE_ANON = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB4ZnV0cmhhYXJhYXpmanFjZm1sIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQ0OTMzMTQsImV4cCI6MjEwMDA2OTMxNH0.H2P6b156dFH0qolvwnXD8BBgSAsNkgo2BFtas8WWzQ4';
const supabase = createClient(SUPABASE_URL, SUPABASE_ANON);

let positions = [];
let center = null;
let lastUpdate = Date.now();

function renderLoading() {
  document.getElementById('app').innerHTML = `
    <div class="header"><h1>Shield Live Location</h1><p>Loading...</p></div>
  `;
}

function renderExpired() {
  document.getElementById('app').innerHTML = `
    <div class="expired">
      <h2>⏰ Check-in Expired</h2>
      <p>This location sharing window has closed. If you were expecting an alert, please contact your friend directly.</p>
    </div>
  `;
}

function renderMap(checkIn) {
  const loc = checkIn.last_location;
  const isActive = checkIn.status === 'active';
  const isExpired = new Date(checkIn.expires_at) < new Date();

  if (!isActive || isExpired) {
    renderExpired();
    return;
  }

  const contactName = checkIn.contact_name || 'Your friend';
  const startedAt = new Date(checkIn.started_at).toLocaleString();
  const expiresAt = new Date(checkIn.expires_at).toLocaleString();

  document.getElementById('app').innerHTML = `
    <div class="header">
      <h1>📍 ${contactName}'s Location</h1>
      <p>Real-time location sharing via Shield App</p>
    </div>
    <div class="status-bar">
      <div class="pulse ${isActive ? '' : 'offline'}"></div>
      <span>${isActive ? 'Live tracking active' : 'Tracking ended'}</span>
      <span style="margin-left:auto;color:#8fa4b3;">Expires: ${expiresAt}</span>
    </div>
    <div id="map">
      <div class="map-grid"></div>
      <div class="map-trail" id="trail"></div>
      <div class="accuracy-ring" id="accuracy"></div>
      <div class="map-dot" id="dot"></div>
    </div>
    <div class="info-panel">
      <div class="info-row">
        <span class="info-label">Last updated</span>
        <span class="info-value" id="lastUpdate">Just now</span>
      </div>
      <div class="info-row">
        <span class="info-label">Coordinates</span>
        <span class="info-value" id="coords">--</span>
      </div>
      <div class="info-row">
        <span class="info-label">Accuracy</span>
        <span class="info-value" id="accuracyText">--</span>
      </div>
      <div class="actions">
        <a class="btn btn-primary" id="directionsBtn" href="#" target="_blank">Get Directions</a>
        <button class="btn btn-danger" id="alertBtn">🚨 I Haven't Heard From Them</button>
      </div>
    </div>
    <div class="toast" id="toast"></div>
  `;

  document.getElementById('alertBtn').addEventListener('click', () => {
    showToast('Emergency services suggestion: Call local police non-emergency line or 112/911 if immediate danger');
  });

  if (loc) {
    updatePosition(loc);
  }

  // Subscribe to realtime updates
  subscribeToUpdates(checkIn.id);
}

function updatePosition(loc) {
  if (!loc) return;
  positions.push(loc);
  if (positions.length > 100) positions.shift();
  if (!center) center = loc;

  const mapEl = document.getElementById('map');
  if (!mapEl) return;

  const rect = mapEl.getBoundingClientRect();
  const scale = Math.min(rect.width, rect.height) / 0.002; // roughly 200m viewport

  const dx = ((loc.lng - center.lng) * scale * Math.cos(center.lat * Math.PI / 180));
  const dy = ((center.lat - loc.lat) * scale);

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const dot = document.getElementById('dot');
  const accuracy = document.getElementById('accuracy');
  if (dot) {
    dot.style.left = `${centerX + dx}px`;
    dot.style.top = `${centerY + dy}px`;
  }
  if (accuracy) {
    const radius = Math.max(loc.accuracy ? loc.accuracy * scale / 111000 : 20, 20);
    accuracy.style.left = `${centerX + dx}px`;
    accuracy.style.top = `${centerY + dy}px`;
    accuracy.style.width = `${radius * 2}px`;
    accuracy.style.height = `${radius * 2}px`;
  }

  // Trail
  const trailEl = document.getElementById('trail');
  if (trailEl && positions.length > 1) {
    const points = positions.map(p => {
      const px = centerX + ((p.lng - center.lng) * scale * Math.cos(center.lat * Math.PI / 180));
      const py = centerY + ((center.lat - p.lat) * scale);
      return `${px},${py}`;
    }).join(' ');
    trailEl.innerHTML = `<svg width="${rect.width}" height="${rect.height}"><polyline points="${points}" fill="none" stroke="rgba(255,107,107,0.5)" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>`;
  }

  // Info
  const coordsEl = document.getElementById('coords');
  if (coordsEl) coordsEl.textContent = `${loc.lat.toFixed(6)}, ${loc.lng.toFixed(6)}`;

  const accEl = document.getElementById('accuracyText');
  if (accEl) accEl.textContent = loc.accuracy ? `±${Math.round(loc.accuracy)}m` : 'Unknown';

  const lastEl = document.getElementById('lastUpdate');
  if (lastEl) lastEl.textContent = 'Just now';

  const dirBtn = document.getElementById('directionsBtn') as HTMLAnchorElement;
  if (dirBtn) dirBtn.href = `https://www.google.com/maps/dir/?api=1&destination=${loc.lat},${loc.lng}`;

  lastUpdate = Date.now();
}

function subscribeToUpdates(checkInId) {
  const channel = supabase
    .channel(`public:check_ins:id=eq.${checkInId}`)
    .on('postgres_changes', {
      event: 'UPDATE',
      schema: 'public',
      table: 'check_ins',
      filter: `id=eq.${checkInId}`,
    }, (payload) => {
      const data = payload.new;
      if (data.status !== 'active') {
        renderExpired();
        return;
      }
      if (data.last_location) {
        updatePosition(data.last_location);
      }
    })
    .subscribe();
}

function showToast(msg) {
  const t = document.getElementById('toast');
  if (!t) return;
  t.textContent = msg;
  t.classList.add('show');
  setTimeout(() => t.classList.remove('show'), 4000);
}

async function init() {
  if (!checkInId) {
    document.getElementById('app').innerHTML = '<div class="expired"><h2>Invalid Link</h2><p>Missing check-in ID.</p></div>';
    return;
  }

  renderLoading();

  const { data, error } = await supabase
    .from('check_ins')
    .select('*')
    .eq('id', checkInId)
    .single();

  if (error || !data) {
    renderExpired();
    return;
  }

  renderMap(data);
}

init();

// Update "last updated" text every 30 seconds
setInterval(() => {
  const el = document.getElementById('lastUpdate');
  if (!el) return;
  const secs = Math.floor((Date.now() - lastUpdate) / 1000);
  if (secs < 60) el.textContent = 'Just now';
  else if (secs < 3600) el.textContent = `${Math.floor(secs / 60)} min ago`;
  else el.textContent = `${Math.floor(secs / 3600)} hr ago`;
}, 30000);
