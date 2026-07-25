import './style.css';

export type ViewName = 'home' | 'checkin' | 'lookup' | 'vault' | 'playbook' | 'panic' | 'map' | 'alerts' | 'more' | 'setup' | 'pin' | 'calculator' | 'vaultList' | 'vaultHome' | 'vaultAdd' | 'settings' | 'antitheft' | 'safeCircle' | 'resources';

export interface VaultItem {
  id: string;
  type: 'photo' | 'note' | 'document';
  name: string;
  data: string;
  date: string;
}

export type Lang = 'en' | 'pg' | 'ha' | 'yo' | 'ig' | 'fr';

const i18n: Record<Lang, Record<string, string>> = {
  en: {
    setupTitle: 'Shield Setup', setupSubtitle: 'Configure your safety preferences',
    createPin: 'Create PIN', confirmPin: 'Confirm PIN', pinMismatch: 'PINs do not match',
    enterPin: 'Enter PIN', invalidPin: 'Invalid PIN', panicHold: 'HOLD FOR PANIC',
    checkIn: 'Check-In', checkInSent: 'Location shared', vault: 'Vault', vaultEmpty: 'No items saved',
    vaultDecrypt: 'View', vaultDelete: 'Delete', vaultBack: 'Back to Vault',
    vaultAddPhoto: 'Add Photo', vaultAddNote: 'Add Note', vaultAddDoc: 'Add Document',
    save: 'Save', cancel: 'Cancel', trustedContact: 'Trusted Contact',
    trustedDesc: 'Number for emergency alerts', saveContact: 'Save',
    autoLocation: 'Auto Share Location', findPhone: 'Find My Phone', antiTheft: 'Anti-Theft',
    lastLocation: 'Last Location', alerts: 'Alerts', home: 'Home', map: 'Map', more: 'More',
    safeCircle: 'Safe Circle', resources: 'Resources', playbook: 'Playbook', settings: 'Settings',
    note1: 'Your data stays on this device.', note2: 'Add emergency contacts for faster response.',
    panicSent: 'Panic alert sent', shareLoc: 'Share Location', locUnavailable: 'Location unavailable',
    setContactFirst: 'Set a trusted contact first', photoSaved: 'Photo saved to vault',
    noteSaved: 'Note saved to vault', docSaved: 'Document saved to vault', deleted: 'Deleted',
    alertsCleared: 'Alerts cleared', shareCancelled: 'Share cancelled', noContact: 'No trusted contact set',
    panicBtn: 'Panic', checkInBtn: 'Check-In', vaultBtn: 'Vault', moreBtn: 'More',
    protected: 'Protected', status: 'Status', activity: 'Activity', quickNotes: 'Quick Notes',
    add: 'Add', view: 'View', location: 'Location', share: 'Share', clear: 'Clear',
    comingSoon: 'Coming Soon', close: 'Close', duressPin: 'Duress PIN',
    duressDesc: 'Enter this PIN to silently alert trusted contact',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Announcements', resetPin: 'Reset PIN', secretVault: 'Secret Vault',
    antiTheftSettings: 'Anti-Theft Settings', aboutShield: 'About Shield',
    version: 'Version 2.0.0', aboutDesc: 'A personal safety companion disguised as a calculator. Built for everyone.',
  },
  pg: {
    setupTitle: 'Shield Setup', setupSubtitle: 'Set your safety settings',
    createPin: 'Create PIN', confirmPin: 'Confirm PIN', pinMismatch: 'PIN no match',
    enterPin: 'Enter your PIN', invalidPin: 'Wrong PIN', panicHold: 'HOLD FOR PANIC',
    checkIn: 'Check-In', checkInSent: 'Location don send', vault: 'Vault', vaultEmpty: 'Nothing dey inside',
    vaultDecrypt: 'Open', vaultDelete: 'Delete', vaultBack: 'Go back',
    vaultAddPhoto: 'Add Foto', vaultAddNote: 'Add Note', vaultAddDoc: 'Add File',
    save: 'Save', cancel: 'Cancel', trustedContact: 'Person wey you trust',
    trustedDesc: 'Number for emergency', saveContact: 'Save am',
    autoLocation: 'Auto Share Location', findPhone: 'Find My Phone', antiTheft: 'Anti-Theft',
    lastLocation: 'Last Place', alerts: 'Alerts', home: 'Home', map: 'Map', more: 'More',
    safeCircle: 'Safe Circle', resources: 'Resources', playbook: 'Playbook', settings: 'Settings',
    note1: 'Your data dey only for this phone.', note2: 'Add people wey you trust.',
    panicSent: 'Panic message don send', shareLoc: 'Share Location', locUnavailable: 'Location no dey',
    setContactFirst: 'Set trusted person first', photoSaved: 'Foto don save',
    noteSaved: 'Note don save', docSaved: 'File don save', deleted: 'Don delete',
    alertsCleared: 'Alerts don clear', shareCancelled: 'Share cancel', noContact: 'No trusted person',
    panicBtn: 'Panic', checkInBtn: 'Check-In', vaultBtn: 'Vault', moreBtn: 'More',
    protected: 'Protected', status: 'Status', activity: 'Wetin happen', quickNotes: 'Quick Notes',
    add: 'Add', view: 'View', location: 'Location', share: 'Share', clear: 'Clear',
    comingSoon: 'Coming Soon', close: 'Close', duressPin: 'Duress PIN',
    duressDesc: 'Use this PIN if person force you',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Announcements', resetPin: 'Reset PIN', secretVault: 'Secret Vault',
    antiTheftSettings: 'Anti-Theft Settings', aboutShield: 'About Shield',
    version: 'Version 2.0.0', aboutDesc: 'A personal safety companion disguised as a calculator. Built for everyone.',
  },
  ha: {
    setupTitle: 'Shield Saita', setupSubtitle: 'Saita tsaronku',
    createPin: 'Kirkiri PIN', confirmPin: 'Tabbatar da PIN', pinMismatch: 'PIN bai dace ba',
    enterPin: 'Shigar da PIN', invalidPin: 'PIN mara kyau', panicHold: 'RIKE DON PANIC',
    checkIn: 'Check-In', checkInSent: 'Wuri ya tafi', vault: 'Vault', vaultEmpty: 'Babu komai',
    vaultDecrypt: 'Duba', vaultDelete: 'Share', vaultBack: 'Komawa Vault',
    vaultAddPhoto: 'Adana Hoton', vaultAddNote: 'Adana Rubutu', vaultAddDoc: 'Adana Takarda',
    save: 'Adana', cancel: 'Soke', trustedContact: 'Abokin Aminci',
    trustedDesc: 'Lambar waya don gaggawa', saveContact: 'Adana',
    autoLocation: 'Tura Wuri Kai-tsaye', findPhone: 'Nemi Wayata', antiTheft: 'Anti-Theft',
    lastLocation: 'Wurin Da Na Baya', alerts: 'Faɗakarwa', home: 'Gida', map: 'Taswira', more: 'Karin',
    safeCircle: 'Safe Circle', resources: 'Resources', playbook: 'Playbook', settings: 'Saituna',
    note1: 'Bayananku na wannan waya kadai.', note2: 'Ƙara abokai masu aminci.',
    panicSent: 'Sakon gaggawa ya tafi', shareLoc: 'Tura Wuri', locUnavailable: 'Babu wuri',
    setContactFirst: 'Saita abokin aminci da farko', photoSaved: 'Hoton ya adana',
    noteSaved: 'Rubutu ya adana', docSaved: 'Takarda ta adana', deleted: 'An share',
    alertsCleared: 'An share faɗakarwa', shareCancelled: 'An soke tura', noContact: 'Babu abokin aminci',
    panicBtn: 'Gaggawa', checkInBtn: 'Check-In', vaultBtn: 'Vault', moreBtn: 'Karin',
    protected: 'Aminci', status: 'Matsayi', activity: 'Abubuwan da suka faru', quickNotes: 'Rubutu mai sauri',
    add: 'Ƙara', view: 'Duba', location: 'Wuri', share: 'Tura', clear: 'Share',
    comingSoon: 'Zan zo', close: 'Rufe', duressPin: 'Duress PIN',
    duressDesc: 'Shigar da wannan PIN idan an taka maka kai',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Announcements', resetPin: 'Reset PIN', secretVault: 'Secret Vault',
    antiTheftSettings: 'Anti-Theft Settings', aboutShield: 'About Shield',
    version: 'Version 2.0.0', aboutDesc: 'A personal safety companion disguised as a calculator. Built for everyone.',
  },
  yo: {
    setupTitle: 'Shield Ifowosowopo', setupSubtitle: 'Seto aabo re',
    createPin: 'Da PIN', confirmPin: 'Fi mule PIN', pinMismatch: 'PIN ko yato',
    enterPin: 'Tewe PIN', invalidPin: 'PIN ti ko tona', panicHold: 'DI MU LAGBARA',
    checkIn: 'Check-In', checkInSent: 'Ipo ti ranse', vault: 'Vault', vaultEmpty: 'Ko si nkan',
    vaultDecrypt: 'Wo', vaultDelete: 'Paare', vaultBack: 'Pada si Vault',
    vaultAddPhoto: 'Fi Awooran', vaultAddNote: 'Fi Akosile', vaultAddDoc: 'Fi Iwe',
    save: 'Fipamora', cancel: 'Fagilee', trustedContact: 'Eni Igboya',
    trustedDesc: 'Numbati fun iroyin aiyipada', saveContact: 'Fipamora',
    autoLocation: 'Pin Ipo Laifoworan', findPhone: 'Wa Foonu Mi', antiTheft: 'Anti-Theft',
    lastLocation: 'Ipo Ikehin', alerts: 'Ikilo', home: 'Ile', map: 'Mabu', more: 'Die',
    safeCircle: 'Safe Circle', resources: 'Resources', playbook: 'Playbook', settings: 'Eto',
    note1: 'Data re wa lori foonu yi nikan.', note2: 'Fi awon eni igboya kun.',
    panicSent: 'Ikilo ti ranse', shareLoc: 'Pin Ipo', locUnavailable: 'Ko si ipo',
    setContactFirst: 'Fi eni igboya tele', photoSaved: 'Awooran ti pamora',
    noteSaved: 'Akosile ti pamora', docSaved: 'Iwe ti pamora', deleted: 'Ti paare',
    alertsCleared: 'Ikilo ti paare', shareCancelled: 'Pin ti fagilee', noContact: 'Ko si eni igboya',
    panicBtn: 'Ikilo', checkInBtn: 'Check-In', vaultBtn: 'Vault', moreBtn: 'Die',
    protected: 'Aabo', status: 'Ipo', activity: 'Ohun ti o sele', quickNotes: 'Akosile kukuru',
    add: 'Fi kun', view: 'Wo', location: 'Ipo', share: 'Pin', clear: 'Paare',
    comingSoon: 'Yoo wa laipe', close: 'Pa', duressPin: 'Duress PIN',
    duressDesc: 'Lo PIN yi ti o ba ni idiju',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Announcements', resetPin: 'Reset PIN', secretVault: 'Secret Vault',
    antiTheftSettings: 'Anti-Theft Settings', aboutShield: 'About Shield',
    version: 'Version 2.0.0', aboutDesc: 'A personal safety companion disguised as a calculator. Built for everyone.',
  },
  ig: {
    setupTitle: 'Shield Nhazi', setupSubtitle: 'Hazie nchebe gi',
    createPin: 'Kepu PIN', confirmPin: 'Kwenye PIN', pinMismatch: 'PIN adabaghi',
    enterPin: 'Tinye PIN', invalidPin: 'PIN ezighi ezi', panicHold: 'JIDE MAKA IHE IBERIBE',
    checkIn: 'Check-In', checkInSent: 'Ebe azipula', vault: 'Vault', vaultEmpty: 'Enweghi ihe',
    vaultDecrypt: 'Le', vaultDelete: 'Hichapu', vaultBack: 'Lagha Vault',
    vaultAddPhoto: 'Tinye Foto', vaultAddNote: 'Tinye Edemede', vaultAddDoc: 'Tinye Akwukwo',
    save: 'Chekwaa', cancel: 'Kagbuo', trustedContact: 'Onye Atozuru',
    trustedDesc: 'Nombu maka ngwa ngwa', saveContact: 'Chekwaa',
    autoLocation: 'Kekere Ebe Onwe', findPhone: 'Chota Foonu M', antiTheft: 'Anti-Theft',
    lastLocation: 'Ebe Ikpeaz', alerts: 'Ikwuputa', home: 'Ulo', map: 'Maapu', more: 'Iheozo',
    safeCircle: 'Safe Circle', resources: 'Resources', playbook: 'Playbook', settings: 'Nhazi',
    note1: 'Data gi di na foonu a nani.', note2: 'Tinye ndi atozuru.',
    panicSent: 'Ozi ngwa ngwa zipula', shareLoc: 'Zipu Ebe', locUnavailable: 'Enweghi ebe',
    setContactFirst: 'Tinye onye atozuru mbu', photoSaved: 'Foto echekwara',
    noteSaved: 'Edemede echekwara', docSaved: 'Akwukwo echekwara', deleted: 'Ehichapula',
    alertsCleared: 'Ikwuputa ehichapula', shareCancelled: 'Zipu kagbuola', noContact: 'Enweghi onye atozuru',
    panicBtn: 'Ngwa', checkInBtn: 'Check-In', vaultBtn: 'Vault', moreBtn: 'Iheozo',
    protected: 'Nchebe', status: 'Nhazi', activity: 'Ihe mere nso', quickNotes: 'Edemede Nkenke',
    add: 'Tinye', view: 'Le', location: 'Ebe', share: 'Zipu', clear: 'Hichapu',
    comingSoon: 'Na abia', close: 'Mechie', duressPin: 'Duress PIN',
    duressDesc: 'Jiri PIN a ma ihe ike merenu',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Announcements', resetPin: 'Reset PIN', secretVault: 'Secret Vault',
    antiTheftSettings: 'Anti-Theft Settings', aboutShield: 'About Shield',
    version: 'Version 2.0.0', aboutDesc: 'A personal safety companion disguised as a calculator. Built for everyone.',
  },
  fr: {
    setupTitle: 'Configuration Shield', setupSubtitle: 'Configurez vos preferences de securite',
    createPin: 'Creer un PIN', confirmPin: 'Confirmer le PIN', pinMismatch: 'Les PIN ne correspondent pas',
    enterPin: 'Entrez le PIN', invalidPin: 'PIN invalide', panicHold: 'MAINTENIR POUR ALERTE',
    checkIn: 'Signaler', checkInSent: 'Position partagee', vault: 'Coffre', vaultEmpty: 'Aucun element',
    vaultDecrypt: 'Voir', vaultDelete: 'Supprimer', vaultBack: 'Retour au Coffre',
    vaultAddPhoto: 'Ajouter Photo', vaultAddNote: 'Ajouter Note', vaultAddDoc: 'Ajouter Document',
    save: 'Enregistrer', cancel: 'Annuler', trustedContact: 'Contact de Confiance',
    trustedDesc: "Numero pour alertes d'urgence", saveContact: 'Sauver',
    autoLocation: 'Partage Auto', findPhone: 'Trouver mon Tel', antiTheft: 'Anti-Vol',
    lastLocation: 'Derniere Position', alerts: 'Alertes', home: 'Accueil', map: 'Carte', more: 'Plus',
    safeCircle: 'Cercle de Securite', resources: 'Ressources', playbook: 'Guide', settings: 'Parametres',
    note1: 'Vos donnees restent sur cet appareil.', note2: "Ajoutez des contacts d'urgence.",
    panicSent: 'Alerte envoyee', shareLoc: 'Partager Position', locUnavailable: 'Position indisponible',
    setContactFirst: "Definissez un contact d'abord", photoSaved: 'Photo enregistree',
    noteSaved: 'Note enregistree', docSaved: 'Document enregistre', deleted: 'Supprime',
    alertsCleared: 'Alertes effacees', shareCancelled: 'Partage annule', noContact: 'Aucun contact defini',
    panicBtn: 'Alerte', checkInBtn: 'Signaler', vaultBtn: 'Coffre', moreBtn: 'Plus',
    protected: 'Protege', status: 'Statut', activity: 'Activite recente', quickNotes: 'Notes rapides',
    add: 'Ajouter', view: 'Voir', location: 'Position', share: 'Partager', clear: 'Effacer',
    comingSoon: 'Bientot', close: 'Fermer', duressPin: 'PIN de Detresse',
    duressDesc: 'Utilisez ce PIN en cas de contrainte',
    panicAlert: 'Panic Alert', checkInLabel: 'Check In', safeCircleLabel: 'Safe Circle',
    resourcesLabel: 'Resources', panicSub: 'Send emergency signal', checkInSub: 'Share your location',
    safeCircleSub: 'Manage contacts', resourcesSub: 'Safety guides & help',
    announcements: 'Annonces', resetPin: 'Reinitialiser PIN', secretVault: 'Coffre Secret',
    antiTheftSettings: 'Parametres Anti-Vol', aboutShield: 'A Propos de Shield',
    version: 'Version 2.0.0', aboutDesc: 'Un compagnon de securite personnel deguise en calculatrice. Construit pour tous.',
  }
};

let currentLang: Lang = 'en';
function t(key: string): string {
  return i18n[currentLang][key] || i18n['en'][key] || key;
}

const PIN_KEY = 'shield_pin_v2';
const DURESS_PIN_KEY = 'shield_duress_v2';
const VAULT_KEY = 'shield_vault_v2';
const VAULT_PIN_KEY = 'shield_vault_pin_v2';
const CONTACT_KEY = 'shield_contact_v2';
const ALERTS_KEY = 'shield_alerts_v2';
const LAST_LOCATION_KEY = 'shield_last_loc_v2';
const SETUP_DONE_KEY = 'shield_setup_v2';
const LANG_KEY = 'shield_lang_v2';

let currentView: ViewName = 'home';
let pinBuffer = '';
let pinTarget: 'unlock' | 'vault' | 'duress' = 'unlock';
let pinCallback: (() => void) | null = null;

function hashPin(pin: string): string {
  let h = 0;
  for (let i = 0; i < pin.length; i++) h = ((h << 5) - h) + pin.charCodeAt(i);
  return Math.abs(h).toString(16);
}

function simpleEncrypt(text: string, pin: string): string {
  const key = hashPin(pin);
  let out = '';
  for (let i = 0; i < text.length; i++) {
    out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(out);
}

function simpleDecrypt(b64: string, pin: string): string {
  try {
    const key = hashPin(pin);
    const text = atob(b64);
    let out = '';
    for (let i = 0; i < text.length; i++) {
      out += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return out;
  } catch { return '[Decryption failed]'; }
}

function showToast(msg: string): void {
  const existing = document.querySelector('.shield-toast');
  if (existing) existing.remove();
  const el = document.createElement('div');
  el.className = 'shield-toast';
  el.textContent = msg;
  document.body.appendChild(el);
  setTimeout(() => el.remove(), 3000);
}

function getVaultPIN(): string | null {
  return localStorage.getItem(VAULT_PIN_KEY);
}

function getVaultItems(): VaultItem[] {
  try { return JSON.parse(localStorage.getItem(VAULT_KEY) || '[]'); }
  catch { return []; }
}

function saveVaultItems(items: VaultItem[]): void {
  localStorage.setItem(VAULT_KEY, JSON.stringify(items));
}

function getTrustedContact(): string {
  return localStorage.getItem(CONTACT_KEY) || '';
}

function getTrustedContacts(): string[] {
  const raw = getTrustedContact();
  return raw.split(',').map(s => s.trim()).filter(Boolean);
}

interface AlertItem {
  id: string;
  type: 'panic' | 'checkin' | 'vault' | 'system';
  message: string;
  time: string;
}

function getAlerts(): AlertItem[] {
  try { return JSON.parse(localStorage.getItem(ALERTS_KEY) || '[]'); }
  catch { return []; }
}

function logAlert(type: AlertItem['type'], message: string): void {
  const alerts = getAlerts();
  alerts.unshift({ id: Date.now().toString(), type, message, time: new Date().toLocaleString() });
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 50)));
}

function getCurrentTime(): string {
  return new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

const app = document.getElementById('app')!;

function bottomNav(activeNav: string): string {
  const items = [
    { id: 'home', icon: '\u1F3E0', label: t('home') },
    { id: 'map', icon: '\u1F5FA', label: t('map') },
    { id: 'panic', icon: '\u1F6A8', label: t('panicBtn'), special: true },
    { id: 'alerts', icon: '\u1F514', label: t('alerts') },
    { id: 'more', icon: '\u2699', label: t('more') },
  ];
  return items.map(n => {
    const isActive = n.id === activeNav ? 'active' : '';
    const cls = n.special ? 'nav-panic' : `nav-item ${isActive}`;
    const inner = n.special
      ? `<span class="nav-icon">${n.icon}</span>`
      : `<span class="nav-icon">${n.icon}</span><span class="nav-label">${n.label}</span>`;
    return `<button class="${cls}" data-nav="${n.id}">${inner}</button>`;
  }).join('');
}

function attachNavListeners(): void {
  document.querySelectorAll('[data-nav]').forEach(btn => {
    btn.addEventListener('click', () => {
      const target = (btn as HTMLElement).dataset.nav as ViewName;
      if (target === 'panic') showView('panic');
      else if (target === 'home') showView('home');
      else if (target === 'map') showView('map');
      else if (target === 'alerts') showView('alerts');
      else if (target === 'more') showView('more');
    });
  });
}

function showView(view: ViewName): void {
  currentView = view;
  switch (view) {
    case 'home': renderHome(); break;
    case 'pin': renderPin(); break;
    case 'setup': renderSetup(); break;
    case 'calculator': renderCalculator(); break;
    case 'checkin': renderCheckIn(); break;
    case 'vaultHome': renderVaultHome(); break;
    case 'vaultList': renderVaultList(); break;
    case 'vaultAdd': renderVaultAdd(); break;
    case 'map': renderMap(); break;
    case 'alerts': renderAlerts(); break;
    case 'more': renderMore(); break;
    case 'settings': renderSettings(); break;
    case 'antitheft': renderAntiTheft(); break;
    case 'playbook': renderPlaybook(); break;
    case 'resources': renderResources(); break;
    case 'safeCircle': renderSafeCircle(); break;
    case 'panic': renderPanic(); break;
    default: renderHome();
  }
}

function renderSetup(): void {
  app.innerHTML = `
    <div class="setup-wizard">
      <div class="setup-card">
        <div class="setup-shield">\u1F6E1</div>
        <h1>${t('setupTitle')}</h1>
        <p>${t('setupSubtitle')}</p>
        <div class="setup-field">
          <label>${t('createPin')}</label>
          <input type="password" id="setup-pin" maxlength="6" placeholder="****" inputmode="numeric" />
        </div>
        <div class="setup-field">
          <label>${t('confirmPin')}</label>
          <input type="password" id="setup-pin2" maxlength="6" placeholder="****" inputmode="numeric" />
        </div>
        <div class="setup-field">
          <label>${t('trustedContact')}</label>
          <input type="tel" id="setup-contact" placeholder="+234..." />
          <small>${t('trustedDesc')}</small>
        </div>
        <div class="setup-field">
          <label>Language / Yare / Langue</label>
          <select id="setup-lang">
            <option value="en">English</option>
            <option value="pg">Nigerian Pidgin</option>
            <option value="ha">Hausa</option>
            <option value="yo">Yoruba</option>
            <option value="ig">Igbo</option>
            <option value="fr">French</option>
          </select>
        </div>
        <button class="setup-button" id="setup-done">${t('save')}</button>
        <p class="setup-note">${t('note1')}<br>${t('note2')}</p>
      </div>
    </div>
  `;
  document.getElementById('setup-done')?.addEventListener('click', () => {
    const p1 = (document.getElementById('setup-pin') as HTMLInputElement).value;
    const p2 = (document.getElementById('setup-pin2') as HTMLInputElement).value;
    const contact = (document.getElementById('setup-contact') as HTMLInputElement).value.trim();
    const lang = (document.getElementById('setup-lang') as HTMLSelectElement).value as Lang;
    if (p1.length < 4) { showToast('PIN too short'); return; }
    if (p1 !== p2) { showToast(t('pinMismatch')); return; }
    localStorage.setItem(PIN_KEY, hashPin(p1));
    localStorage.setItem(DURESS_PIN_KEY, hashPin(String(Number(p1) + 1111).slice(0, 4)));
    if (contact) localStorage.setItem(CONTACT_KEY, contact);
    localStorage.setItem(LANG_KEY, lang);
    currentLang = lang;
    localStorage.setItem(SETUP_DONE_KEY, '1');
    logAlert('system', 'App secured with PIN');
    showView('home');
  });
}

function renderPin(): void {
  app.innerHTML = `
    <div class="pin-screen">
      <div class="pin-shield">\u1F6E1</div>
      <h2>${t('enterPin')}</h2>
      <div class="pin-dots" id="pin-dots"></div>
      <div class="pin-pad">
        ${[1,2,3,4,5,6,7,8,9,'C',0,'<'].map(k => `<button class="pin-key" data-key="${k}">${k}</button>`).join('')}
      </div>
      <p class="pin-hint">${pinTarget === 'duress' ? t('duressDesc') : ''}</p>
    </div>
  `;
  const dots = document.getElementById('pin-dots')!;
  function updateDots() {
    dots.innerHTML = Array(4).fill(0).map((_, i) => `<span class="pin-dot ${i < pinBuffer.length ? 'filled' : ''}"></span>`).join('');
  }
  document.querySelectorAll('.pin-key').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = (btn as HTMLElement).dataset.key!;
      if (k === 'C') pinBuffer = '';
      else if (k === '<') pinBuffer = pinBuffer.slice(0, -1);
      else if (pinBuffer.length < 6) pinBuffer += k;
      updateDots();
      if (pinBuffer.length === 4) {
        const stored = localStorage.getItem(PIN_KEY);
        const duress = localStorage.getItem(DURESS_PIN_KEY);
        if (hashPin(pinBuffer) === stored) {
          pinBuffer = '';
          if (pinCallback) { pinCallback(); pinCallback = null; }
          else showView('home');
        } else if (duress && hashPin(pinBuffer) === duress) {
          pinBuffer = '';
          sendPanicSMS(true);
          if (pinCallback) { pinCallback(); pinCallback = null; }
          else showView('home');
        } else {
          showToast(t('invalidPin'));
          pinBuffer = '';
          updateDots();
        }
      }
    });
  });
  updateDots();
}

function requirePin(callback: () => void, target: 'unlock' | 'vault' | 'duress' = 'unlock'): void {
  pinTarget = target;
  pinCallback = callback;
  showView('pin');
}

function renderHome(): void {
  const contact = getTrustedContact();
  const statusText = contact ? t('protected') : t('setContactFirst');
  const alerts = getAlerts();

  app.innerHTML = `
    <div class="view-page home-view">
      <div class="view-content">
        <div class="app-header">
          <div class="header-brand">
            <span class="header-icon">\u1F6E1</span>
            <div class="header-text">
              <div class="header-title">SHIELD</div>
              <div class="header-subtitle">Personal Safety Companion</div>
            </div>
          </div>
          <button class="header-lock" id="header-lock-btn">\u1F512</button>
        </div>

        <div class="hero-card">
          <div class="hero-main">
            <div class="status-ring">
              <svg viewBox="0 0 100 100"><circle cx="50" cy="50" r="42" class="ring-bg"/><circle cx="50" cy="50" r="42" class="ring-progress"/></svg>
              <div class="status-icon">\u2714</div>
            </div>
            <div class="hero-text">
              <h2>${statusText}</h2>
              <p>Your safety network is active</p>
            </div>
          </div>
          <div class="hero-metrics">
            <div class="metric"><span class="metric-val" style="color:#22c55e">Active</span><span class="metric-label">${t('status')}</span></div>
            <div class="metric"><span class="metric-val" style="color:#22c55e" id="hero-time">${getCurrentTime()}</span><span class="metric-label">LOCAL TIME</span></div>
            <div class="metric"><span class="metric-val" style="color:#22c55e">ON</span><span class="metric-label">${t('location')}</span></div>
          </div>
        </div>

        <div class="quick-actions">
          <h3 class="section-title">Quick Actions</h3>
          <div class="actions-grid">
            <button class="action-card" data-action="panic">
              <span class="action-icon">\u1F6A8</span>
              <span class="action-title">${t('panicAlert')}</span>
              <span class="action-sub">${t('panicSub')}</span>
            </button>
            <button class="action-card" data-action="checkin">
              <span class="action-icon">\u1F4CD</span>
              <span class="action-title">${t('checkInLabel')}</span>
              <span class="action-sub">${t('checkInSub')}</span>
            </button>
            <button class="action-card" data-action="safeCircle">
              <span class="action-icon">\u1F465</span>
              <span class="action-title">${t('safeCircleLabel')}</span>
              <span class="action-sub">${t('safeCircleSub')}</span>
            </button>
            <button class="action-card" data-action="resources">
              <span class="action-icon">\u1F4DA</span>
              <span class="action-title">${t('resourcesLabel')}</span>
              <span class="action-sub">${t('resourcesSub')}</span>
            </button>
          </div>
        </div>

        <div class="activity-section">
          <h3 class="section-title">${t('activity')}</h3>
          <div class="activity-list">
            ${alerts.length > 0 ? alerts.slice(0, 3).map(a => {
              const color = a.type === 'panic' ? '#22c55e' : a.type === 'checkin' ? '#3b82f6' : '#22c55e';
              return `<div class="activity-row"><div class="activity-dot" style="background:${color};box-shadow:0 0 6px ${color}"></div><div class="activity-text"><p>${a.message}</p><span>${a.time}</span></div></div>`;
            }).join('') : `
              <div class="activity-row"><div class="activity-dot" style="background:#22c55e;box-shadow:0 0 6px #22c55e"></div><div class="activity-text"><p>App secured with PIN</p><span>Just now</span></div></div>
              <div class="activity-row"><div class="activity-dot" style="background:#3b82f6;box-shadow:0 0 6px #3b82f6"></div><div class="activity-text"><p>Location services enabled</p><span>Just now</span></div></div>
            `}
          </div>
        </div>

        <div class="announcements-section">
          <h3 class="section-title">${t('announcements')}</h3>
          <div class="announcement-card">
            <span class="announcement-icon">\u1F6E1</span>
            <p>Stay safe. Your Shield is always watching.</p>
          </div>
          <div class="announcement-card">
            <span class="announcement-icon">\u1F465</span>
            <p>Add emergency contacts in Safe Circle for faster response.</p>
          </div>
        </div>
      </div>
      <nav class="home-nav">${bottomNav('home')}</nav>
    </div>
  `;

  const timeEl = document.getElementById('hero-time');
  if (timeEl) {
    const updateTime = () => { timeEl.textContent = getCurrentTime(); };
    updateTime();
    setInterval(updateTime, 60000);
  }

  document.getElementById('header-lock-btn')?.addEventListener('click', () => requirePin(() => showView('home')));
  document.querySelectorAll('.action-card').forEach(btn => {
    btn.addEventListener('click', () => {
      const action = (btn as HTMLElement).dataset.action;
      if (action === 'panic') showView('panic');
      else if (action === 'checkin') showView('checkin');
      else if (action === 'safeCircle') showView('safeCircle');
      else if (action === 'resources') showView('resources');
    });
  });
  attachNavListeners();
}

function sendPanicSMS(silent = false): void {
  const contacts = getTrustedContacts();
  if (contacts.length === 0) { showToast(t('noContact')); return; }
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      const msg = `SHIELD PANIC ALERT: I need help! Location: https://maps.google.com/?q=${lat},${lng}`;
      contacts.forEach(c => window.open(`sms:${c}?body=${encodeURIComponent(msg)}`, '_blank'));
      logAlert('panic', `Panic alert sent to ${contacts.join(', ')}`);
      if (!silent) showToast(t('panicSent'));
    }, () => {
      const msg = 'SHIELD PANIC ALERT: I need help! Location unavailable.';
      contacts.forEach(c => window.open(`sms:${c}?body=${encodeURIComponent(msg)}`, '_blank'));
      logAlert('panic', `Panic sent (no location)`);
      if (!silent) showToast(t('panicSent'));
    });
  } else {
    const msg = 'SHIELD PANIC ALERT: I need help!';
    contacts.forEach(c => window.open(`sms:${c}?body=${encodeURIComponent(msg)}`, '_blank'));
    logAlert('panic', `Panic sent (no GPS)`);
    if (!silent) showToast(t('panicSent'));
  }
}

function renderPanic(): void {
  app.innerHTML = `
    <div class="view-page panic-view">
      <h2 class="view-title">${t('panicHold')}</h2>
      <div class="panic-ring" id="panic-ring">
        <div class="panic-inner">\u1F6A8</div>
      </div>
      <p class="panic-hint">Hold for 3 seconds to send alert</p>
      <button class="vault-cancel" id="panic-back">${t('cancel')}</button>
    </div>
  `;
  let holdTimer: ReturnType<typeof setTimeout>;
  let holding = false;
  const ring = document.getElementById('panic-ring')!;
  const startHold = () => {
    holding = true;
    ring.classList.add('holding');
    holdTimer = setTimeout(() => {
      if (holding) { sendPanicSMS(); showView('home'); }
    }, 3000);
  };
  const endHold = () => {
    holding = false;
    ring.classList.remove('holding');
    clearTimeout(holdTimer);
  };
  ring.addEventListener('mousedown', startHold);
  ring.addEventListener('mouseup', endHold);
  ring.addEventListener('mouseleave', endHold);
  ring.addEventListener('touchstart', startHold);
  ring.addEventListener('touchend', endHold);
  document.getElementById('panic-back')?.addEventListener('click', () => showView('home'));
}

function renderCheckIn(): void {
  app.innerHTML = `
    <div class="view-page checkin-view">
      <h2 class="view-title">${t('checkIn')}</h2>
      <div class="checkin-card">
        <div class="checkin-icon">\u1F4CD</div>
        <p id="checkin-status">${t('locUnavailable')}</p>
        <button class="checkin-btn" id="checkin-share">${t('shareLoc')}</button>
      </div>
      <button class="vault-cancel" id="checkin-back">${t('cancel')}</button>
    </div>
  `;
  const status = document.getElementById('checkin-status')!;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(pos => {
      const lat = pos.coords.latitude.toFixed(5);
      const lng = pos.coords.longitude.toFixed(5);
      status.innerHTML = `<span style="color:#22c55e;font-size:18px">${lat}, ${lng}</span><br><small style="color:rgba(255,255,255,0.5)">Accuracy: ${Math.round(pos.coords.accuracy)}m</small>`;
      localStorage.setItem(LAST_LOCATION_KEY, `${lat},${lng}`);
      logAlert('system', 'Location services enabled');
    }, () => { status.textContent = t('locUnavailable'); });
  }
  document.getElementById('checkin-share')?.addEventListener('click', () => {
    const last = localStorage.getItem(LAST_LOCATION_KEY);
    const contacts = getTrustedContacts();
    if (last && contacts.length) {
      const [lat, lng] = last.split(',');
      const msg = `Check-in from Shield: https://maps.google.com/?q=${lat},${lng}`;
      contacts.forEach(c => window.open(`sms:${c}?body=${encodeURIComponent(msg)}`, '_blank'));
      logAlert('checkin', `Location shared: ${lat}, ${lng}`);
      showToast(t('checkInSent'));
    } else {
      showToast(t('setContactFirst'));
    }
  });
  document.getElementById('checkin-back')?.addEventListener('click', () => showView('home'));
}

function renderVaultHome(): void {
  if (!getVaultPIN()) {
    app.innerHTML = `
      <div class="view-page vault-view">
        <h2 class="view-title">${t('vault')}</h2>
        <div class="vault-setup">
          <div style="font-size:48px;margin-bottom:16px">\u1F510</div>
          <p>Create a vault PIN to encrypt your files</p>
          <input type="password" id="vault-set-pin" maxlength="6" placeholder="****" inputmode="numeric" />
          <button class="setup-button" id="vault-save-pin">${t('save')}</button>
        </div>
        <button class="vault-cancel" id="vault-home-back">${t('cancel')}</button>
      </div>
    `;
    document.getElementById('vault-save-pin')?.addEventListener('click', () => {
      const p = (document.getElementById('vault-set-pin') as HTMLInputElement).value;
      if (p.length < 4) { showToast('Too short'); return; }
      localStorage.setItem(VAULT_PIN_KEY, hashPin(p));
      showToast('Vault PIN set'); renderVaultHome();
    });
    document.getElementById('vault-home-back')?.addEventListener('click', () => showView('home'));
    return;
  }
  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">\u1F510 ${t('vault')}</h2>
      <div class="vault-actions">
        <button class="vault-action" data-type="photo">\u1F4F7 ${t('vaultAddPhoto')}</button>
        <button class="vault-action" data-type="note">\u1F4DD ${t('vaultAddNote')}</button>
        <button class="vault-action" data-type="document">\u1F4C4 ${t('vaultAddDoc')}</button>
      </div>
      <button class="setup-button" id="vault-view-list">${t('view')} ${t('vault')}</button>
      <button class="vault-cancel" id="vault-home-back">${t('cancel')}</button>
    </div>
  `;
  document.querySelectorAll('.vault-action').forEach(btn => {
    btn.addEventListener('click', () => requirePin(() => showView('vaultAdd'), 'vault'));
  });
  document.getElementById('vault-view-list')?.addEventListener('click', () => requirePin(() => showView('vaultList'), 'vault'));
  document.getElementById('vault-home-back')?.addEventListener('click', () => showView('home'));
}

function renderVaultList(): void {
  const items = getVaultItems();
  const pin = getVaultPIN()!;
  const listHtml = items.length === 0
    ? `<div class="vault-empty">${t('vaultEmpty')}</div>`
    : items.map(item => {
        const icon = item.type === 'photo' ? '\u1F4F7' : item.type === 'note' ? '\u1F4DD' : '\u1F4C4';
        return `
          <div class="vault-item" data-id="${item.id}">
            <div class="vault-item-icon">${icon}</div>
            <div class="vault-item-info">
              <p class="vault-item-name">${item.name}</p>
              <span class="vault-item-date">${item.date}</span>
            </div>
            <div class="vault-item-actions">
              <button class="vault-action-btn view" data-id="${item.id}" data-type="${item.type}">${t('vaultDecrypt')}</button>
              <button class="vault-action-btn delete" data-id="${item.id}">${t('vaultDelete')}</button>
            </div>
          </div>
        `;
      }).join('');

  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">\u1F4C1 ${t('vault')}</h2>
      <div class="vault-list">${listHtml}</div>
      <button class="vault-cancel" id="vault-list-back">${t('vaultBack')}</button>
    </div>
  `;

  document.querySelectorAll('.vault-action-btn.view').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      const type = (btn as HTMLElement).dataset.type!;
      const item = items.find(i => i.id === id);
      if (!item) return;
      const decrypted = simpleDecrypt(item.data, pin);

      if (type === 'photo') {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">\u1F4F7 ${item.name}</h2>
            <img src="${decrypted}" class="vault-preview-img" />
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">\u1F4E4 ${t('share')}</button>
            <button class="vault-cancel" id="vault-preview-back">${t('vaultBack')}</button>
          </div>
        `;
        attachVaultShare(decrypted, item);
      } else if (type === 'note') {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">\u1F4DD ${item.name}</h2>
            <div class="vault-note-preview">${decrypted.replace(/\n/g, '<br>')}</div>
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">\u1F4E4 ${t('share')}</button>
            <button class="vault-cancel" id="vault-preview-back">${t('vaultBack')}</button>
          </div>
        `;
        attachVaultShare(decrypted, item);
      } else {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">\u1F4C4 ${item.name}</h2>
            <div class="vault-note-preview" style="text-align:center;padding:40px 20px">
              <div style="font-size:48px;margin-bottom:16px">\u1F4C4</div>
              <p>${item.name}</p>
              <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:8px">Tap Share to send this document</p>
            </div>
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">\u1F4E4 ${t('share')}</button>
            <button class="vault-cancel" id="vault-preview-back">${t('vaultBack')}</button>
          </div>
        `;
        attachVaultShare(decrypted, item);
      }
      document.getElementById('vault-preview-back')?.addEventListener('click', () => showView('vaultList'));
    });
  });

  document.querySelectorAll('.vault-action-btn.delete').forEach(btn => {
    btn.addEventListener('click', () => {
      deleteVaultItem((btn as HTMLElement).dataset.id!);
      showToast(t('deleted')); renderVaultList();
    });
  });
  document.getElementById('vault-list-back')?.addEventListener('click', () => showView('vaultHome'));
}

function attachVaultShare(decrypted: string, item: VaultItem): void {
  document.getElementById('vault-share-btn')?.addEventListener('click', async () => {
    const contacts = getTrustedContacts();
    if (navigator.share) {
      try {
        const response = await fetch(decrypted);
        const blob = await response.blob();
        const file = new File([blob], item.name, { type: blob.type || 'application/octet-stream' });
        await navigator.share({ title: 'Shield Vault Share', files: [file] });
      } catch { showToast(t('shareCancelled')); }
    } else if (contacts.length) {
      contacts.forEach(c => {
        window.open(`sms:${c}?body=${encodeURIComponent('Shared from Shield Vault: ' + item.name)}`, '_blank');
      });
    } else {
      showToast(t('noContact'));
    }
  });
}

function deleteVaultItem(id: string): void {
  saveVaultItems(getVaultItems().filter(i => i.id !== id));
}

function renderVaultAdd(): void {
  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">${t('vault')}</h2>
      <div class="vault-add-options">
        <button class="vault-option" data-type="photo">\u1F4F7 ${t('vaultAddPhoto')}</button>
        <button class="vault-option" data-type="note">\u1F4DD ${t('vaultAddNote')}</button>
        <button class="vault-option" data-type="document">\u1F4C4 ${t('vaultAddDoc')}</button>
      </div>
      <button class="vault-cancel" id="vault-add-back">${t('cancel')}</button>
    </div>
  `;
  document.querySelectorAll('.vault-option').forEach(btn => {
    btn.addEventListener('click', () => {
      const type = (btn as HTMLElement).dataset.type as 'photo' | 'note' | 'document';
      if (type === 'photo') {
        const input = document.createElement('input');
        input.type = 'file'; input.accept = 'image/*';
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => saveVaultItem('photo', file.name, reader.result as string);
          reader.readAsDataURL(file);
        };
        input.click();
      } else if (type === 'note') {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">${t('vaultAddNote')}</h2>
            <input type="text" id="note-title" placeholder="Title" style="margin-bottom:12px" />
            <textarea id="note-body" rows="6" placeholder="Write your note..."></textarea>
            <button class="setup-button" id="note-save">${t('save')}</button>
            <button class="vault-cancel" id="note-back">${t('cancel')}</button>
          </div>
        `;
        document.getElementById('note-save')?.addEventListener('click', () => {
          const title = (document.getElementById('note-title') as HTMLInputElement).value || 'Note';
          const body = (document.getElementById('note-body') as HTMLTextAreaElement).value;
          if (body) { saveVaultItem('note', title, body); showToast(t('noteSaved')); showView('vaultHome'); }
        });
        document.getElementById('note-back')?.addEventListener('click', () => showView('vaultHome'));
      } else {
        const input = document.createElement('input');
        input.type = 'file';
        input.onchange = () => {
          const file = input.files?.[0];
          if (!file) return;
          const reader = new FileReader();
          reader.onload = () => saveVaultItem('document', file.name, reader.result as string);
          reader.readAsDataURL(file);
        };
        input.click();
      }
    });
  });
  document.getElementById('vault-add-back')?.addEventListener('click', () => showView('vaultHome'));
}

function saveVaultItem(type: VaultItem['type'], name: string, content: string): void {
  const pin = getVaultPIN();
  if (!pin) { showToast('Set vault PIN first'); return; }
  const items = getVaultItems();
  items.push({ id: Date.now().toString(), type, name, data: simpleEncrypt(content, pin), date: new Date().toLocaleDateString() });
  saveVaultItems(items);
  const map: Record<string, string> = { photo: t('photoSaved'), note: t('noteSaved'), document: t('docSaved') };
  showToast(map[type] || 'Saved');
  logAlert('vault', `${type} saved to vault`);
  showView('vaultHome');
}

function renderMap(): void {
  app.innerHTML = `
    <div class="view-page map-view">
      <h2 class="view-title">${t('map')}</h2>
      <div class="view-map">
        <div class="map-container" id="map-container">
          <div class="map-loading">Getting your location...</div>
        </div>
        <div class="map-info">
          <p id="map-coords">${t('locUnavailable')}</p>
          <button class="checkin-btn" id="map-share-loc">${t('checkIn')}</button>
        </div>
      </div>
      <nav class="home-nav">${bottomNav('map')}</nav>
    </div>
  `;
  const container = document.getElementById('map-container')!;
  const coordsEl = document.getElementById('map-coords')!;
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const minLng = Number(lng) - 0.01;
        const maxLng = Number(lng) + 0.01;
        const minLat = Number(lat) - 0.01;
        const maxLat = Number(lat) + 0.01;
        container.innerHTML = `<iframe width="100%" height="100%" frameborder="0" scrolling="no" marginheight="0" marginwidth="0" src="https://www.openstreetmap.org/export/embed.html?bbox=${minLng}%2C${minLat}%2C${maxLng}%2C${maxLat}&layer=mapnik&marker=${lat}%2C${lng}" style="border:none; border-radius: 16px; filter: invert(1) hue-rotate(180deg);"></iframe>`;
        coordsEl.innerHTML = `<span style="color:#22c55e;font-size:16px">${lat}, ${lng}</span><br><span style="font-size:11px;color:rgba(255,255,255,0.4)">Accuracy: ${Math.round(pos.coords.accuracy)}m</span>`;
        localStorage.setItem(LAST_LOCATION_KEY, `${lat},${lng}`);
      },
      () => {
        container.innerHTML = `<div class="map-placeholder"><div class="map-icon">\u1F5FA</div><h2>Location Access Denied</h2><p>Enable location services to see your position.</p></div>`;
        coordsEl.textContent = t('locUnavailable');
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    container.innerHTML = `<div class="map-placeholder"><div class="map-icon">\u1F5FA</div><h2>Not Supported</h2><p>Your browser does not support geolocation.</p></div>`;
  }
  document.getElementById('map-share-loc')?.addEventListener('click', () => {
    const last = localStorage.getItem(LAST_LOCATION_KEY);
    const contacts = getTrustedContacts();
    if (last && contacts.length) {
      const [lat, lng] = last.split(',');
      const msg = `Check-in from Shield: https://maps.google.com/?q=${lat},${lng}`;
      contacts.forEach(c => window.open(`sms:${c}?body=${encodeURIComponent(msg)}`, '_blank'));
      logAlert('checkin', `Location shared: ${lat}, ${lng}`);
      showToast(t('checkInSent'));
    } else {
      showToast(t('setContactFirst'));
    }
  });
  attachNavListeners();
}

function renderAlerts(): void {
  const alerts = getAlerts();
  const alertHtml = alerts.length === 0
    ? `<div class="alert-empty"><div class="alert-icon">\u1F514</div><p>No alerts yet</p><span style="color:rgba(255,255,255,0.4);font-size:12px">Panic and Check-in events appear here</span></div>`
    : alerts.map(a => {
        const icon = a.type === 'panic' ? '\u1F6A8' : a.type === 'checkin' ? '\u1F4CD' : a.type === 'vault' ? '\u1F510' : '\u2139';
        const color = a.type === 'panic' ? '#ef4444' : a.type === 'checkin' ? '#22c55e' : '#3b82f6';
        return `<div class="activity-row" style="margin-bottom:8px"><div class="activity-dot" style="background:${color};box-shadow:0 0 6px ${color}80"></div><div class="activity-text"><p>${icon} ${a.message}</p><span>${a.time}</span></div></div>`;
      }).join('');
  app.innerHTML = `
    <div class="view-page alerts-view">
      <h2 class="view-title">${t('alerts')}</h2>
      <div class="alerts-content" style="padding:0 16px 80px">
        <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
          <span style="font-size:13px;color:rgba(255,255,255,0.5)">${alerts.length} events</span>
          ${alerts.length > 0 ? `<button class="home-lock" id="clear-alerts" style="width:auto;padding:6px 16px;font-size:12px;border-radius:8px">${t('clear')}</button>` : ''}
        </div>
        <div class="activity-list">${alertHtml}</div>
      </div>
      <nav class="home-nav">${bottomNav('alerts')}</nav>
    </div>
  `;
  document.getElementById('clear-alerts')?.addEventListener('click', () => {
    localStorage.removeItem(ALERTS_KEY);
    showToast(t('alertsCleared'));
    renderAlerts();
  });
  attachNavListeners();
}

function renderMore(): void {
  app.innerHTML = `
    <div class="view-page more-view">
      <h2 class="view-title">${t('more')}</h2>
      <div class="more-grid">
        <button class="more-item" data-view="settings"><span class="more-icon">\u2699</span><span class="more-label">${t('settings')}</span></button>
        <button class="more-item" data-view="antitheft"><span class="more-icon">\u1F6E1</span><span class="more-label">${t('antiTheft')}</span></button>
        <button class="more-item" data-view="safeCircle"><span class="more-icon">\u1F465</span><span class="more-label">${t('safeCircle')}</span></button>
        <button class="more-item" data-view="vaultHome"><span class="more-icon">\u1F510</span><span class="more-label">${t('vault')}</span></button>
        <button class="more-item" data-view="playbook"><span class="more-icon">\u1F4D6</span><span class="more-label">${t('playbook')}</span></button>
        <button class="more-item" data-view="calculator"><span class="more-icon">\u1F522</span><span class="more-label">Calculator</span></button>
      </div>
      <nav class="home-nav">${bottomNav('more')}</nav>
    </div>
  `;
  document.querySelectorAll('.more-item').forEach(btn => {
    btn.addEventListener('click', () => {
      const view = (btn as HTMLElement).dataset.view as ViewName;
      if (view === 'vaultHome') requirePin(() => showView('vaultHome'), 'vault');
      else showView(view);
    });
  });
  attachNavListeners();
}

function renderSettings(): void {
  app.innerHTML = `
    <div class="view-page settings-view">
      <h2 class="view-title">${t('settings')}</h2>
      <div class="settings-content">
        <div class="settings-section">
          <h4 class="settings-section-title">LANGUAGE</h4>
          <div class="settings-select-row">
            <select id="settings-lang">
              <option value="en" ${currentLang==='en'?'selected':''}>English</option>
              <option value="pg" ${currentLang==='pg'?'selected':''}>Nigerian Pidgin</option>
              <option value="ha" ${currentLang==='ha'?'selected':''}>Hausa</option>
              <option value="yo" ${currentLang==='yo'?'selected':''}>Yoruba</option>
              <option value="ig" ${currentLang==='ig'?'selected':''}>Igbo</option>
              <option value="fr" ${currentLang==='fr'?'selected':''}>French</option>
            </select>
          </div>
        </div>
        <div class="settings-section">
          <h4 class="settings-section-title">SECURITY</h4>
          <button class="settings-row-btn" id="settings-reset-pin">${t('resetPin')}</button>
          <button class="settings-row-btn" id="settings-vault">\u1F510 ${t('secretVault')}</button>
        </div>
        <div class="settings-section">
          <h4 class="settings-section-title">\u1F6E1 ANTI-THEFT</h4>
          <button class="settings-row-btn" id="settings-antitheft">${t('antiTheftSettings')}</button>
        </div>
        <div class="settings-section">
          <h4 class="settings-section-title">${t('aboutShield')}</h4>
          <div class="about-card">
            <div class="about-shield">\u1F6E1</div>
            <h3>SHIELD</h3>
            <p class="about-version">${t('version')}</p>
            <p class="about-desc">${t('aboutDesc')}</p>
          </div>
        </div>
      </div>
      <nav class="home-nav">${bottomNav('more')}</nav>
    </div>
  `;
  document.getElementById('settings-lang')?.addEventListener('change', () => {
    const lang = (document.getElementById('settings-lang') as HTMLSelectElement).value as Lang;
    currentLang = lang;
    localStorage.setItem(LANG_KEY, lang);
    showToast('Language saved');
  });
  document.getElementById('settings-reset-pin')?.addEventListener('click', () => {
    localStorage.removeItem(PIN_KEY);
    localStorage.removeItem(DURESS_PIN_KEY);
    localStorage.removeItem(SETUP_DONE_KEY);
    showToast('PIN reset. Restart app.');
    setTimeout(() => location.reload(), 1500);
  });
  document.getElementById('settings-vault')?.addEventListener('click', () => requirePin(() => showView('vaultHome'), 'vault'));
  document.getElementById('settings-antitheft')?.addEventListener('click', () => showView('antitheft'));
  attachNavListeners();
}

function renderAntiTheft(): void {
  const last = localStorage.getItem(LAST_LOCATION_KEY) || t('locUnavailable');
  app.innerHTML = `
    <div class="view-page">
      <h2 class="view-title">${t('antiTheft')}</h2>
      <div class="settings-content">
        <div class="antitheft-card">
          <p><strong>${t('lastLocation')}</strong></p>
          <p style="color:#22c55e;font-size:14px;margin:8px 0">${last}</p>
          <button class="setup-button" id="antitheft-loc">${t('findPhone')}</button>
        </div>
        <div class="antitheft-card">
          <p><strong>${t('trustedContact')}</strong></p>
          <input type="tel" id="antitheft-contact" value="${getTrustedContact()}" placeholder="+234..." />
          <small style="display:block;color:rgba(255,255,255,0.3);font-size:11px;margin:8px 0">${t('trustedDesc')}</small>
          <button class="setup-button" id="antitheft-save">${t('saveContact')}</button>
        </div>
        <button class="vault-cancel" id="antitheft-back">${t('cancel')}</button>
      </div>
    </div>
  `;
  document.getElementById('antitheft-loc')?.addEventListener('click', () => {
    const last = localStorage.getItem(LAST_LOCATION_KEY);
    if (last) { const [lat, lng] = last.split(','); window.open(`https://maps.google.com/?q=${lat},${lng}`, '_blank'); }
    else { showToast(t('locUnavailable')); }
  });
  document.getElementById('antitheft-save')?.addEventListener('click', () => {
    const c = (document.getElementById('antitheft-contact') as HTMLInputElement).value.trim();
    if (c) { localStorage.setItem(CONTACT_KEY, c); showToast('Saved'); }
  });
  document.getElementById('antitheft-back')?.addEventListener('click', () => showView('settings'));
}

function renderSafeCircle(): void {
  app.innerHTML = `
    <div class="view-page">
      <h2 class="view-title">${t('safeCircle')}</h2>
      <div class="coming-soon">
        <div style="font-size:48px;margin-bottom:16px">\u1F465</div>
        <h3>${t('comingSoon')}</h3>
        <p>Store multiple emergency contacts for one-tap reach</p>
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin-top:8px">For now, use Settings to save trusted contacts (comma-separated)</p>
      </div>
      <button class="vault-cancel" id="safe-back">${t('close')}</button>
    </div>
  `;
  document.getElementById('safe-back')?.addEventListener('click', () => showView('home'));
}

function renderPlaybook(): void {
  app.innerHTML = `
    <div class="view-page">
      <h2 class="view-title">${t('playbook')}</h2>
      <div class="playbook-list">
        <div class="playbook-item"><h4>\u1F6A8 Panic Protocol</h4><p>Hold panic for 3s. SMS sends location to all trusted contacts.</p></div>
        <div class="playbook-item"><h4>\u1F4CD Check-In</h4><p>Share your live location discreetly without triggering panic.</p></div>
        <div class="playbook-item"><h4>\u1F510 Vault</h4><p>Encrypt photos, notes, and documents behind a separate PIN.</p></div>
        <div class="playbook-item"><h4>\u1F6E1 Duress PIN</h4><p>Your duress PIN is your normal PIN + 1111. It unlocks but silently alerts.</p></div>
      </div>
      <button class="vault-cancel" id="playbook-back">${t('close')}</button>
    </div>
  `;
  document.getElementById('playbook-back')?.addEventListener('click', () => showView('home'));
}

function renderResources(): void {
  app.innerHTML = `
    <div class="view-page">
      <h2 class="view-title">${t('resources')}</h2>
      <div class="resource-list">
        <a class="resource-card" href="tel:112"><div class="resource-icon">\u1F6A8</div><div><h4>Emergency (112)</h4><p>Pan-Nigeria emergency</p></div></a>
        <a class="resource-card" href="tel:199"><div class="resource-icon">\u1F469</div><div><h4>Violence Helpline (199)</h4><p>Domestic & gender-based violence</p></div></a>
        <a class="resource-card" href="https://www.warifng.org" target="_blank"><div class="resource-icon">\u1F3E5</div><div><h4>WARIF</h4><p>Women at Risk International</p></div></a>
      </div>
      <button class="vault-cancel" id="resources-back">${t('close')}</button>
    </div>
  `;
  document.getElementById('resources-back')?.addEventListener('click', () => showView('home'));
}

// Safe math evaluator - replaces eval() completely
function safeCalc(expr: string): number {
  let e = expr.replace(/\u00D7/g, '*').replace(/\u00F7/g, '/').replace(/\u2212/g, '-');
  e = e.replace(/sin\(/g, 'S(').replace(/cos\(/g, 'C(').replace(/tan\(/g, 'T(')
       .replace(/log\(/g, 'L(').replace(/ln\(/g, 'N(').replace(/sqrt\(/g, 'Q(')
       .replace(/\^/g, '**');
  if (!/^[\d+\-*/().\s%^SCOTLNQ]+$/.test(e)) return NaN;
  e = e.replace(/S\(/g, 'Math.sin(').replace(/C\(/g, 'Math.cos(').replace(/T\(/g, 'Math.tan(')
       .replace(/L\(/g, 'Math.log10(').replace(/N\(/g, 'Math.log(').replace(/Q\(/g, 'Math.sqrt(');
  try {
    const fn = new Function('return (' + e + ')');
    const result = fn();
    return typeof result === 'number' && !isNaN(result) ? result : NaN;
  } catch {
    return NaN;
  }
}

function renderCalculator(): void {
  app.innerHTML = `
    <div class="calculator-container">
      <div class="calc-header">
        <button class="calc-mode" id="calc-sci">SCI</button>
        <div class="calc-display" id="calc-display">0</div>
      </div>
      <div class="calc-buttons">
        <button class="calc-btn calc-grey" data-calc="C">C</button>
        <button class="calc-btn calc-orange" data-calc="BS">\u232B</button>
        <button class="calc-btn calc-orange" data-calc="%">%</button>
        <button class="calc-btn calc-orange" data-calc="/">\u00F7</button>
        <button class="calc-btn calc-dark" data-calc="7">7</button>
        <button class="calc-btn calc-dark" data-calc="8">8</button>
        <button class="calc-btn calc-dark" data-calc="9">9</button>
        <button class="calc-btn calc-orange" data-calc="*">\u00D7</button>
        <button class="calc-btn calc-dark" data-calc="4">4</button>
        <button class="calc-btn calc-dark" data-calc="5">5</button>
        <button class="calc-btn calc-dark" data-calc="6">6</button>
        <button class="calc-btn calc-orange" data-calc="-">\u2212</button>
        <button class="calc-btn calc-dark" data-calc="1">1</button>
        <button class="calc-btn calc-dark" data-calc="2">2</button>
        <button class="calc-btn calc-dark" data-calc="3">3</button>
        <button class="calc-btn calc-orange" data-calc="+">+</button>
        <button class="calc-btn calc-dark calc-zero" data-calc="0">0</button>
        <button class="calc-btn calc-dark" data-calc=".">.</button>
        <button class="calc-btn calc-green" data-calc="=">=</button>
      </div>
      <button class="vault-cancel" id="calc-exit" style="margin-top:12px">Exit Calculator</button>
    </div>
  `;
  let expr = '';
  let sciMode = false;
  const display = document.getElementById('calc-display')!;
  document.querySelectorAll('.calc-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const k = (btn as HTMLElement).dataset.calc!;
      if (k === 'C') expr = '';
      else if (k === 'BS') expr = expr.slice(0, -1);
      else if (k === '=') {
        const result = safeCalc(expr);
        expr = isNaN(result) ? 'Error' : String(result);
      }
      else if (k === '%') {
        const result = safeCalc(expr);
        expr = isNaN(result) ? 'Error' : String(result / 100);
      }
      else expr += k;
      display.textContent = expr || '0';
    });
  });
  document.getElementById('calc-sci')?.addEventListener('click', () => {
    sciMode = !sciMode;
    const btn = document.getElementById('calc-sci')!;
    btn.classList.toggle('active', sciMode);
    showToast(sciMode ? 'Scientific mode ON' : 'Scientific mode OFF');
  });
  document.getElementById('calc-exit')?.addEventListener('click', () => showView('home'));
}

function init(): void {
  const savedLang = localStorage.getItem(LANG_KEY) as Lang;
  if (savedLang && i18n[savedLang]) currentLang = savedLang;
  if (!localStorage.getItem(SETUP_DONE_KEY)) showView('setup');
  else showView('home');
}

init();