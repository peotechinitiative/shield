import { Calculator } from './components/Calculator';
import { isFirstLaunch, savePIN, verifyPIN, resetPIN } from './utils/security';
import './style.css';

const app = document.getElementById('app')!;
let calculator: Calculator | null = null;

/* ── TRANSLATIONS ── */
const LANG_KEY = 'shield_lang';

const i18n: Record<string, Record<string, string>> = {
  en: {
    shield: 'SHIELD', subtitle: 'Personal Safety Companion', protected: 'Protected',
    status: 'Status', time: 'Local Time', location: 'Location', active: 'Active',
    quickActions: 'Quick Actions', panicAlert: 'Panic Alert', panicDesc: 'Send emergency signal',
    checkIn: 'Check In', checkInDesc: 'Share your location',
    safeCircle: 'Safe Circle', safeCircleDesc: 'Manage contacts',
    resources: 'Resources', resourcesDesc: 'Safety guides & help',
    activity: 'Activity', appSecured: 'App secured with PIN',
    locEnabled: 'Location services enabled', justNow: 'Just now',
    notes: 'Announcements', note1: 'Stay safe. Your Shield is always watching.',
    note2: 'Add emergency contacts in Safe Circle for faster response.',
    home: 'Home', map: 'Map', alerts: 'Alerts', more: 'More',
    settings: 'Settings', language: 'Language', resetPin: 'Reset PIN',
    about: 'About Shield', version: 'Version 2.0.0',
    pinSetupTitle: 'Create Your PIN', pinSetupSub: 'Set a 4-digit PIN to unlock Shield.',
    enterPin: 'Enter PIN', confirmPin: 'Confirm PIN', savePin: 'Save PIN & Continue',
    pinHint: 'Default unlock: 2+4+6+8==', pinErrorMatch: 'PINs do not match',
    pinErrorLength: 'PIN must be 4 digits', pinSaved: 'PIN saved successfully',
    panicHold: 'PANIC MODE — Hold to confirm', panicSent: 'PANIC ALERT SENT',
    checkInSent: 'Location shared with Safe Circle',
    comingSoon: 'Coming Soon',
  },
  fr: {
    shield: 'SHIELD', subtitle: 'Compagnon de Securite', protected: 'Protege',
    status: 'Statut', time: 'Heure Locale', location: 'Localisation', active: 'Actif',
    quickActions: 'Actions Rapides', panicAlert: 'Alerte Panique', panicDesc: 'Envoyer signal d\'urgence',
    checkIn: 'Enregistrer', checkInDesc: 'Partager votre position',
    safeCircle: 'Cercle Sur', safeCircleDesc: 'Gerer les contacts',
    resources: 'Ressources', resourcesDesc: 'Guides de securite',
    activity: 'Activite', appSecured: 'Application securisee',
    locEnabled: 'Services de localisation actifs', justNow: 'A l\'instant',
    notes: 'Annonces', note1: 'Restez en securite. Votre Shield veille.',
    note2: 'Ajoutez des contacts d\'urgence pour une reponse plus rapide.',
    home: 'Accueil', map: 'Carte', alerts: 'Alertes', more: 'Plus',
    settings: 'Parametres', language: 'Langue', resetPin: 'Reinitialiser PIN',
    about: 'A Propos', version: 'Version 2.0.0',
    pinSetupTitle: 'Creer votre PIN', pinSetupSub: 'Definissez un PIN a 4 chiffres.',
    enterPin: 'Entrer PIN', confirmPin: 'Confirmer PIN', savePin: 'Enregistrer PIN',
    pinHint: 'Deverrouillage: 2+4+6+8==', pinErrorMatch: 'Les PIN ne correspondent pas',
    pinErrorLength: 'Le PIN doit avoir 4 chiffres', pinSaved: 'PIN enregistre',
    panicHold: 'MODE PANIQUE — Maintenez pour confirmer', panicSent: 'ALERTE PANIQUE ENVOYEE',
    checkInSent: 'Position partagee avec le Cercle Sur',
    comingSoon: 'Bientot Disponible',
  },
  es: {
    shield: 'SHIELD', subtitle: 'Companero de Seguridad', protected: 'Protegido',
    status: 'Estado', time: 'Hora Local', location: 'Ubicacion', active: 'Activo',
    quickActions: 'Acciones Rapidas', panicAlert: 'Alerta Panico', panicDesc: 'Enviar senal de emergencia',
    checkIn: 'Registrar', checkInDesc: 'Compartir tu ubicacion',
    safeCircle: 'Circulo Seguro', safeCircleDesc: 'Gestionar contactos',
    resources: 'Recursos', resourcesDesc: 'Guias de seguridad',
    activity: 'Actividad', appSecured: 'App asegurada con PIN',
    locEnabled: 'Servicios de ubicacion activos', justNow: 'Ahora mismo',
    notes: 'Anuncios', note1: 'Mantente seguro. Tu Shield siempre vigila.',
    note2: 'Anade contactos de emergencia para respuesta mas rapida.',
    home: 'Inicio', map: 'Mapa', alerts: 'Alertas', more: 'Mas',
    settings: 'Ajustes', language: 'Idioma', resetPin: 'Restablecer PIN',
    about: 'Acerca de', version: 'Version 2.0.0',
    pinSetupTitle: 'Crear tu PIN', pinSetupSub: 'Establece un PIN de 4 digitos.',
    enterPin: 'Introducir PIN', confirmPin: 'Confirmar PIN', savePin: 'Guardar PIN',
    pinHint: 'Desbloqueo: 2+4+6+8==', pinErrorMatch: 'Los PIN no coinciden',
    pinErrorLength: 'El PIN debe tener 4 digitos', pinSaved: 'PIN guardado',
    panicHold: 'MODO PANICO — Manten para confirmar', panicSent: 'ALERTA DE PANICO ENVIADA',
    checkInSent: 'Ubicacion compartida con Circulo Seguro',
    comingSoon: 'Proximamente',
  },
  pt: {
    shield: 'SHIELD', subtitle: 'Companheiro de Seguranca', protected: 'Protegido',
    status: 'Status', time: 'Hora Local', location: 'Localizacao', active: 'Ativo',
    quickActions: 'Acoes Rapidas', panicAlert: 'Alerta Panico', panicDesc: 'Enviar sinal de emergencia',
    checkIn: 'Check-in', checkInDesc: 'Compartilhar localizacao',
    safeCircle: 'Circulo Seguro', safeCircleDesc: 'Gerenciar contatos',
    resources: 'Recursos', resourcesDesc: 'Guias de seguranca',
    activity: 'Atividade', appSecured: 'App protegido com PIN',
    locEnabled: 'Servicos de localizacao ativos', justNow: 'Agora mesmo',
    notes: 'Avisos', note1: 'Fique seguro. Seu Shield esta sempre de guarda.',
    note2: 'Adicione contatos de emergencia para resposta mais rapida.',
    home: 'Inicio', map: 'Mapa', alerts: 'Alertas', more: 'Mais',
    settings: 'Configuracoes', language: 'Idioma', resetPin: 'Redefinir PIN',
    about: 'Sobre', version: 'Versao 2.0.0',
    pinSetupTitle: 'Criar seu PIN', pinSetupSub: 'Defina um PIN de 4 digitos.',
    enterPin: 'Digitar PIN', confirmPin: 'Confirmar PIN', savePin: 'Salvar PIN',
    pinHint: 'Desbloqueio: 2+4+6+8==', pinErrorMatch: 'Os PINs nao coincidem',
    pinErrorLength: 'O PIN deve ter 4 digitos', pinSaved: 'PIN salvo',
    panicHold: 'MODO PANICO — Segure para confirmar', panicSent: 'ALERTA DE PANICO ENVIADO',
    checkInSent: 'Localizacao compartilhada com Circulo Seguro',
    comingSoon: 'Em Breve',
  },
  ha: {
    shield: 'SHIELD', subtitle: 'Abokin Tsaro', protected: 'A Kwance',
    status: 'Yanayi', time: 'Lokaci', location: 'Wuri', active: 'Aiki',
    quickActions: 'Ayyuka', panicAlert: 'Gargadi', panicDesc: 'Aika sauti na gaggawa',
    checkIn: 'Yi Check-in', checkInDesc: 'Raba wurinka',
    safeCircle: 'Sarkon Tsaro', safeCircleDesc: 'Gudanar da lambobi',
    resources: 'Kayan Aiki', resourcesDesc: 'Jagorar tsaro',
    activity: 'Ayyuka', appSecured: 'An kafe app da PIN',
    locEnabled: 'Ayyukan wuri suna aiki', justNow: 'Yanzu',
    notes: 'Sanarwa', note1: 'Ka ci gaba da lafiya. Shield yana kula.',
    note2: 'Kara lambobin gaggawa a Sarkon Tsaro don saurin amsa.',
    home: 'Gida', map: 'Taswira', alerts: 'Gargadi', more: 'Kara',
    settings: 'Saituna', language: 'Harshe', resetPin: 'Sake Saita PIN',
    about: 'Game da', version: 'Sigar 2.0.0',
    pinSetupTitle: 'Kirkiri PIN', pinSetupSub: 'Saita PIN na lambobi 4.',
    enterPin: 'Shigar da PIN', confirmPin: 'Tabbatar da PIN', savePin: 'Ajiye PIN',
    pinHint: 'Bude: 2+4+6+8==', pinErrorMatch: 'PIN basu dace ba',
    pinErrorLength: 'PIN dole ne ya zama lambobi 4', pinSaved: 'An ajiye PIN',
    panicHold: 'YANAYIN GARGADI — Riƙe don tabbatar', panicSent: 'AN TURA GARGADI',
    checkInSent: 'An raba wuri da Sarkon Tsaro',
    comingSoon: 'Zo Da Sauri',
  },
  yo: {
    shield: 'SHIELD', subtitle: 'Alaba Aabo', protected: 'Ni Aabo',
    status: 'Ipo', time: 'Aago', location: 'Ipo', active: 'Nsi',
    quickActions: 'Ise Kia', panicAlert: 'Ikilo', panicDesc: 'Firanse aleti',
    checkIn: 'Check-in', checkInDesc: 'Pin aye re',
    safeCircle: 'Aabo Agbo', safeCircleDesc: 'Sakoso awon olubasoro',
    resources: 'Ohun Elo', resourcesDesc: 'Itosona aabo',
    activity: 'Ise', appSecured: 'Aabo app pelu PIN',
    locEnabled: 'Ise ipo nsi', justNow: 'Nisisiyi',
    notes: 'Ikilo', note1: 'Wa aabo. Shield nsoju re.',
    note2: 'Fi awon olubasoro ikilo kun Agbo Aabo fun idahun kia.',
    home: 'Ile', map: 'Mabu', alerts: 'Ikilo', more: 'Die Si',
    settings: 'Eto', language: 'Ede', resetPin: 'Tun PIN se',
    about: 'Nipa', version: 'Ato 2.0.0',
    pinSetupTitle: 'Da PIN', pinSetupSub: 'Seti PIN onka mokan.',
    enterPin: 'Te PIN', confirmPin: 'Jerisi PIN', savePin: 'Fipamora PIN',
    pinHint: 'Sisi: 2+4+6+8==', pinErrorMatch: 'PIN ko yatoo',
    pinErrorLength: 'PIN gbodo je onka mokan', pinSaved: 'A fipamora PIN',
    panicHold: 'IPO IKILO — Duro lati jerisi', panicSent: 'A FIRANSE IKILO',
    checkInSent: 'A pin aye pelu Agbo Aabo',
    comingSoon: 'Nbo Laipẹ',
  },
  ig: {
    shield: 'SHIELD', subtitle: 'Enyi Nchebe', protected: 'Echebe',
    status: 'Uru', time: 'Oge', location: 'Ebe', active: 'Aru',
    quickActions: 'Omume', panicAlert: 'Nti Nchebe', panicDesc: 'Zipu ihe nchebe',
    checkIn: 'Check-in', checkInDesc: 'Kekọrịta ebe i no',
    safeCircle: 'Agburu Nchebe', safeCircleDesc: 'Jikwaa ndi nkọwa okwu',
    resources: 'Ihe Eji', resourcesDesc: 'Nduzi nchebe',
    activity: 'Omume', appSecured: 'Echebe app site na PIN',
    locEnabled: 'Oru ebe aruola', justNow: 'Ugbu a',
    notes: 'Mmaraba', note1: 'Nọ nchebe. Shield na elekọta gị.',
    note2: 'Tinye ndi nkọwa okwu nchebe na Agburu Nchebe maka ngwa ngwa.',
    home: 'Ulo', map: 'Maapu', alerts: 'Nti', more: 'Iheozo',
    settings: 'Ntọala', language: 'Asusu', resetPin: 'Tọgharia PIN',
    about: 'Maka', version: 'Nhazi 2.0.0',
    pinSetupTitle: 'Kepu PIN', pinSetupSub: 'Tọọ PIN nke onu ogugu anọ.',
    enterPin: 'Tinye PIN', confirmPin: 'Kwenye PIN', savePin: 'Chekwaa PIN',
    pinHint: 'Mepere: 2+4+6+8==', pinErrorMatch: 'PIN adabaghị',
    pinErrorLength: 'PIN kwesịghị ịbụ onu ogugu anọ', pinSaved: 'Echekwara PIN',
    panicHold: 'MODE NTI — Jide iji kwenye', panicSent: 'EZIPULA NTI NCHEBE',
    checkInSent: 'Ekekọrịtala ebe na Agburu Nchebe',
    comingSoon: 'Na Abia Noge Adighi Anya',
  },
};

function getLang(): string {
  return localStorage.getItem(LANG_KEY) || 'en';
}

function setLang(lang: string): void {
  localStorage.setItem(LANG_KEY, lang);
}

function t(key: string): string {
  const lang = getLang();
  return i18n[lang]?.[key] || i18n['en'][key] || key;
}

/* ── VIEW ROUTER ── */
let currentView = 'home';

function showView(viewName: string): void {
  currentView = viewName;
  switch (viewName) {
    case 'home': renderHome(); break;
    case 'map': renderMap(); break;
    case 'alerts': renderAlerts(); break;
    case 'settings': renderSettings(); break;
    case 'panic': renderPanic(); break;
    case 'checkin': renderCheckIn(); break;
    case 'contacts': renderContacts(); break;
    case 'resources': renderResources(); break;
    default: renderHome();
  }
}

/* ── HOME PAGE ── */
function renderHome(): void {
  app.innerHTML = `
    <div class="home-bg">
      <div class="home-overlay"></div>
      <div class="home-content">
        <header class="home-header">
          <div class="home-brand">
            <div class="home-logo">&#x1F6E1;</div>
            <div>
              <h1>${t('shield')}</h1>
              <span>${t('subtitle')}</span>
            </div>
          </div>
          <button id="lock-btn" class="home-lock" title="Lock App">&#x1F512;</button>
        </header>

        <section class="hero-card">
          <div class="hero-status">
            <div class="status-ring active">
              <svg viewBox="0 0 36 36">
                <path class="circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
                <path class="circle-fg" stroke-dasharray="100, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" />
              </svg>
              <div class="status-icon">&#x2713;</div>
            </div>
            <div class="status-text">
              <h2>${t('protected')}</h2>
              <p>${t('subtitle')}</p>
            </div>
          </div>
          <div class="hero-meta">
            <div class="meta-item">
              <span class="meta-value">${t('active')}</span>
              <span class="meta-label">${t('status')}</span>
            </div>
            <div class="meta-item">
              <span class="meta-value" id="live-clock">--:--</span>
              <span class="meta-label">${t('time')}</span>
            </div>
            <div class="meta-item">
              <span class="meta-value">ON</span>
              <span class="meta-label">${t('location')}</span>
            </div>
          </div>
        </section>

        <section class="actions-section">
          <h3 class="section-title">${t('quickActions')}</h3>
          <div class="actions-grid">
            <button class="action-card panic" data-action="panic">
              <div class="action-icon">&#x1F6A8;</div>
              <div class="action-label">${t('panicAlert')}</div>
              <div class="action-desc">${t('panicDesc')}</div>
            </button>
            <button class="action-card checkin" data-action="checkin">
              <div class="action-icon">&#x1F4CD;</div>
              <div class="action-label">${t('checkIn')}</div>
              <div class="action-desc">${t('checkInDesc')}</div>
            </button>
            <button class="action-card contacts" data-action="contacts">
              <div class="action-icon">&#x1F465;</div>
              <div class="action-label">${t('safeCircle')}</div>
              <div class="action-desc">${t('safeCircleDesc')}</div>
            </button>
            <button class="action-card resources" data-action="resources">
              <div class="action-icon">&#x1F4DA;</div>
              <div class="action-label">${t('resources')}</div>
              <div class="action-desc">${t('resourcesDesc')}</div>
            </button>
          </div>
        </section>

        <section class="activity-section">
          <h3 class="section-title">${t('activity')}</h3>
          <div class="activity-list">
            <div class="activity-item">
              <div class="activity-dot green"></div>
              <div class="activity-info">
                <p>${t('appSecured')}</p>
                <span>${t('justNow')}</span>
              </div>
            </div>
            <div class="activity-item">
              <div class="activity-dot blue"></div>
              <div class="activity-info">
                <p>${t('locEnabled')}</p>
                <span>${t('justNow')}</span>
              </div>
            </div>
          </div>
        </section>

        <section class="notes-section">
          <h3 class="section-title">${t('notes')}</h3>
          <div class="notes-list">
            <div class="note-card">
              <div class="note-icon">&#x1F4A1;</div>
              <p>${t('note1')}</p>
            </div>
            <div class="note-card">
              <div class="note-icon">&#x1F465;</div>
              <p>${t('note2')}</p>
            </div>
          </div>
        </section>

        <div class="home-spacer"></div>
      </div>

      <nav class="home-nav">
        <button class="nav-item active" data-tab="home">
          <span class="nav-icon">&#x1F3E0;</span>
          <span>${t('home')}</span>
        </button>
        <button class="nav-item" data-tab="map">
          <span class="nav-icon">&#x1F5FA;</span>
          <span>${t('map')}</span>
        </button>
        <button class="nav-item nav-panic" data-tab="panic">
          <span class="nav-icon">&#x1F6A8;</span>
        </button>
        <button class="nav-item" data-tab="alerts">
          <span class="nav-icon">&#x1F514;</span>
          <span>${t('alerts')}</span>
        </button>
        <button class="nav-item" data-tab="settings">
          <span class="nav-icon">&#x2699;</span>
          <span>${t('more')}</span>
        </button>
      </nav>
    </div>
  `;

  startClock();
  attachHomeListeners();
  attachNavListeners();
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
      if (action) showView(action);
    });
  });
}

function attachNavListeners(): void {
  document.querySelectorAll('.nav-item').forEach(item => {
    item.addEventListener('click', () => {
      const tab = (item as HTMLElement).dataset.tab;
      if (tab) showView(tab);
    });
  });
}

/* ── OTHER VIEWS ── */
function renderMap(): void {
  app.innerHTML = viewShell(`
    <div class="view-map">
      <div class="map-placeholder">
        <div class="map-icon">&#x1F5FA;</div>
        <h2>${t('map')}</h2>
        <p>${t('comingSoon')}</p>
      </div>
    </div>
  `, 'map');
  attachNavListeners();
}

function renderAlerts(): void {
  app.innerHTML = viewShell(`
    <div class="view-alerts">
      <h2 class="view-title">${t('alerts')}</h2>
      <div class="alert-empty">
        <div class="alert-icon">&#x1F514;</div>
        <p>${t('comingSoon')}</p>
      </div>
    </div>
  `, 'alerts');
  attachNavListeners();
}

function renderPanic(): void {
  app.innerHTML = `
    <div class="panic-view">
      <div class="panic-ring">
        <div class="panic-inner">
          <span class="panic-icon">&#x1F6A8;</span>
          <h2>${t('panicAlert')}</h2>
          <p>${t('panicHold')}</p>
        </div>
      </div>
      <button class="panic-cancel" id="panic-cancel">Cancel</button>
    </div>
    <nav class="home-nav">
      <button class="nav-item" data-tab="home"><span class="nav-icon">&#x1F3E0;</span><span>${t('home')}</span></button>
      <button class="nav-item" data-tab="map"><span class="nav-icon">&#x1F5FA;</span><span>${t('map')}</span></button>
      <button class="nav-item nav-panic active" data-tab="panic"><span class="nav-icon">&#x1F6A8;</span></button>
      <button class="nav-item" data-tab="alerts"><span class="nav-icon">&#x1F514;</span><span>${t('alerts')}</span></button>
      <button class="nav-item" data-tab="settings"><span class="nav-icon">&#x2699;</span><span>${t('more')}</span></button>
    </nav>
  `;

  let holdTimer: number | null = null;
  const panicRing = document.querySelector('.panic-ring') as HTMLElement;

  const startPanic = () => {
    panicRing?.classList.add('holding');
    holdTimer = window.setTimeout(() => {
      showToast(t('panicSent'));
      panicRing?.classList.remove('holding');
    }, 2000);
  };

  const cancelPanic = () => {
    if (holdTimer) clearTimeout(holdTimer);
    panicRing?.classList.remove('holding');
  };

  panicRing?.addEventListener('mousedown', startPanic);
  panicRing?.addEventListener('touchstart', startPanic);
  panicRing?.addEventListener('mouseup', cancelPanic);
  panicRing?.addEventListener('touchend', cancelPanic);
  document.getElementById('panic-cancel')?.addEventListener('click', () => showView('home'));
  attachNavListeners();
}

function renderCheckIn(): void {
  app.innerHTML = viewShell(`
    <div class="view-checkin">
      <h2 class="view-title">${t('checkIn')}</h2>
      <div class="checkin-card">
        <div class="checkin-icon">&#x1F4CD;</div>
        <p>Your location will be shared with your Safe Circle.</p>
        <button class="checkin-btn" id="checkin-send">${t('checkIn')}</button>
      </div>
    </div>
  `, 'home');
  document.getElementById('checkin-send')?.addEventListener('click', () => {
    showToast(t('checkInSent'));
    setTimeout(() => showView('home'), 1500);
  });
  attachNavListeners();
}

function renderContacts(): void {
  app.innerHTML = viewShell(`
    <div class="view-contacts">
      <h2 class="view-title">${t('safeCircle')}</h2>
      <div class="contact-empty">
        <div class="contact-icon">&#x1F465;</div>
        <p>${t('comingSoon')}</p>
      </div>
    </div>
  `, 'home');
  attachNavListeners();
}

function renderResources(): void {
  app.innerHTML = viewShell(`
    <div class="view-resources">
      <h2 class="view-title">${t('resources')}</h2>
      <div class="resource-list">
        <div class="resource-card"><div class="resource-icon">&#x1F6A8;</div><h3>Emergency Numbers</h3><p>Police, Fire, Medical</p></div>
        <div class="resource-card"><div class="resource-icon">&#x1F3E5;</div><h3>Nearest Hospitals</h3><p>Find medical help fast</p></div>
        <div class="resource-card"><div class="resource-icon">&#x1F46E;</div><h3>Police Stations</h3><p>Locate authorities</p></div>
        <div class="resource-card"><div class="resource-icon">&#x1F4E7;</div><h3>NGO Support</h3><p>Women's aid & shelters</p></div>
      </div>
    </div>
  `, 'home');
  attachNavListeners();
}

function renderSettings(): void {
  const lang = getLang();
  app.innerHTML = viewShell(`
    <div class="view-settings">
      <h2 class="view-title">${t('settings')}</h2>

      <div class="settings-group">
        <h3>${t('language')}</h3>
        <select class="lang-select" id="lang-select">
          <option value="en" ${lang === 'en' ? 'selected' : ''}>English</option>
          <option value="fr" ${lang === 'fr' ? 'selected' : ''}>Francais</option>
          <option value="es" ${lang === 'es' ? 'selected' : ''}>Espanol</option>
          <option value="pt" ${lang === 'pt' ? 'selected' : ''}>Portugues</option>
          <option value="ha" ${lang === 'ha' ? 'selected' : ''}>Hausa</option>
          <option value="yo" ${lang === 'yo' ? 'selected' : ''}>Yoruba</option>
          <option value="ig" ${lang === 'ig' ? 'selected' : ''}>Igbo</option>
        </select>
      </div>

      <div class="settings-group">
        <h3>Security</h3>
        <button class="settings-btn" id="reset-pin-btn">${t('resetPin')}</button>
      </div>

      <div class="settings-group">
        <h3>${t('about')}</h3>
        <div class="about-card">
          <div class="about-logo">&#x1F6E1;</div>
          <h4>${t('shield')}</h4>
          <p>${t('version')}</p>
          <p class="about-desc">A personal safety companion disguised as a calculator. Built for everyone.</p>
        </div>
      </div>
    </div>
  `, 'settings');

  document.getElementById('lang-select')?.addEventListener('change', (e) => {
    setLang((e.target as HTMLSelectElement).value);
    showToast('Language updated');
    renderSettings();
  });

  document.getElementById('reset-pin-btn')?.addEventListener('click', () => {
    resetPIN();
    showToast('PIN reset. Restarting...');
    setTimeout(() => renderCalculator(), 1500);
  });

  attachNavListeners();
}

function viewShell(content: string, activeTab: string): string {
  return `
    <div class="view-page">
      ${content}
    </div>
    <nav class="home-nav">
      <button class="nav-item ${activeTab === 'home' ? 'active' : ''}" data-tab="home"><span class="nav-icon">&#x1F3E0;</span><span>${t('home')}</span></button>
      <button class="nav-item ${activeTab === 'map' ? 'active' : ''}" data-tab="map"><span class="nav-icon">&#x1F5FA;</span><span>${t('map')}</span></button>
      <button class="nav-item nav-panic ${activeTab === 'panic' ? 'active' : ''}" data-tab="panic"><span class="nav-icon">&#x1F6A8;</span></button>
      <button class="nav-item ${activeTab === 'alerts' ? 'active' : ''}" data-tab="alerts"><span class="nav-icon">&#x1F514;</span><span>${t('alerts')}</span></button>
      <button class="nav-item ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings"><span class="nav-icon">&#x2699;</span><span>${t('more')}</span></button>
    </nav>
  `;
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
        <div class="setup-icon">&#x1F510;</div>
        <h1>${t('pinSetupTitle')}</h1>
        <p class="setup-subtitle">${t('pinSetupSub')}</p>
        <div class="pin-input-group">
          <label>${t('enterPin')}</label>
          <input type="password" id="pin1" maxlength="4" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;" inputmode="numeric" pattern="[0-9]*">
        </div>
        <div class="pin-input-group">
          <label>${t('confirmPin')}</label>
          <input type="password" id="pin2" maxlength="4" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;" inputmode="numeric" pattern="[0-9]*">
        </div>
        <div class="setup-error" id="setup-error"></div>
        <button class="setup-button" id="setup-btn">${t('savePin')}</button>
        <p class="setup-hint">${t('pinHint')}</p>
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
      error.textContent = t('pinErrorLength');
      return;
    }
    if (p1 !== p2) {
      error.textContent = t('pinErrorMatch');
      return;
    }

    await savePIN(p1);
    showToast(t('pinSaved'));
    renderHome();
  });
}

/* ── CALCULATOR / UNLOCK ── */
function renderCalculator(): void {
  app.innerHTML = '';
  calculator = new Calculator(app, async (keyLog: string) => {
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
renderCalculator();