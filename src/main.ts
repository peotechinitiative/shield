import { Calculator } from './components/Calculator';
import { isFirstLaunch, savePIN, verifyPIN, resetPIN } from './utils/security';
import { buildVaultSharePayload, shareVaultItem } from './utils/vaultShare';
import { getAlertEndpoint } from './utils/api';
import { getStoredFcmToken } from './services/fcm';
import './style.css';

// Force unregister old service workers
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.getRegistrations().then(regs => {
    for (const reg of regs) {
      reg.unregister();
      console.log('Unregistered old service worker');
    }
  });
  // Clear all caches
  if ('caches' in window) {
    caches.keys().then(names => {
      for (const name of names) {
        caches.delete(name);
      }
    });
  }
}

const app = document.getElementById('app')!;
let calculator: Calculator | null = null;

const LANG_KEY = 'shield_lang';
const VAULT_PIN_KEY = 'shield_vault_pin';
const VAULT_ITEMS_KEY = 'shield_vault_items';
const TRUSTED_CONTACT_KEY = 'shield_trusted_contact';
const LAST_LOCATION_KEY = 'shield_last_location';
const STEALTH_KEY = 'shield_stealth_mode';
const ALERTS_KEY = 'shield_alerts';

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
  localStorage.setItem(ALERTS_KEY, JSON.stringify(alerts.slice(0, 50))); // keep last 50
}
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
    vaultTitle: 'Secret Vault', vaultEnter: 'Enter Vault Code',
    vaultCreate: 'Create Vault Code', vaultSub: 'This code protects your encrypted files.',
    vaultConfirm: 'Confirm Code', vaultSave: 'Open Vault',
    vaultErrorMatch: 'Codes do not match', vaultErrorLength: 'Code must be 4 digits',
    vaultHome: 'My Vault', vaultPhotos: 'Photos', vaultNotes: 'Notes',
    vaultDocs: 'Documents', vaultUpload: 'Upload File',
    vaultNotePlaceholder: 'Type your secure note here...',
    vaultSaveNote: 'Encrypt & Save', vaultEmpty: 'Vault is empty',
    vaultDelete: 'Delete', vaultDecrypt: 'View',
    vaultBack: 'Back to Vault',
    antitheft: 'Anti-Theft', trustedContact: 'Trusted Contact',
    trustedDesc: 'Phone number for emergency alerts',
    saveContact: 'Save Contact', autoLocation: 'Auto Location Share',
    autoLocDesc: 'Share location when panic is triggered',
    lastLocation: 'Last Known Location', findPhone: 'Find My Phone',
    stealthMode: 'Stealth Mode', stealthDesc: 'App always opens as calculator',
    nativeFeatures: 'Native App Features',
    nativeDesc: 'SIM change detection and uninstall prevention require Shield Pro for Android.',
    downloadPro: 'Get Shield Pro',
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
    vaultTitle: 'Coffre Secret', vaultEnter: 'Entrer le Code',
    vaultCreate: 'Creer le Code', vaultSub: 'Ce code protege vos fichiers cryptes.',
    vaultConfirm: 'Confirmer', vaultSave: 'Ouvrir le Coffre',
    vaultErrorMatch: 'Codes differents', vaultErrorLength: '4 chiffres requis',
    vaultHome: 'Mon Coffre', vaultPhotos: 'Photos', vaultNotes: 'Notes',
    vaultDocs: 'Documents', vaultUpload: 'Telecharger',
    vaultNotePlaceholder: 'Votre note securisee...',
    vaultSaveNote: 'Crypter & Sauver', vaultEmpty: 'Coffre vide',
    vaultDelete: 'Supprimer', vaultDecrypt: 'Voir', vaultBack: 'Retour',
    antitheft: 'Anti-Vol', trustedContact: 'Contact de Confiance',
    trustedDesc: 'Numero pour alertes d\'urgence',
    saveContact: 'Sauver', autoLocation: 'Partage Auto',
    autoLocDesc: 'Partager position en cas de panique',
    lastLocation: 'Derniere Position', findPhone: 'Trouver mon Tel',
    stealthMode: 'Mode Furtif', stealthDesc: 'Toujours ouvrir comme calculatrice',
    nativeFeatures: 'App Native', nativeDesc: 'Detection SIM et prevention suppression necessitent Shield Pro.',
    downloadPro: 'Obtenir Shield Pro',
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
    vaultTitle: 'Vault na Sirri', vaultEnter: 'Shigar da Lamba',
    vaultCreate: 'Kirkiri Lamba', vaultSub: 'Wannan lamba tana kare fayilolinka.',
    vaultConfirm: 'Tabbatar', vaultSave: 'Bude Vault',
    vaultErrorMatch: 'Lambobi basu dace ba', vaultErrorLength: 'Dole ne lambobi 4',
    vaultHome: 'Vault Na', vaultPhotos: 'Hotuna', vaultNotes: 'Rubutu',
    vaultDocs: 'Takardun', vaultUpload: 'Loda',
    vaultNotePlaceholder: 'Rubuta rubutunka nan...',
    vaultSaveNote: 'Karya & Ajiye', vaultEmpty: 'Vault babu komai',
    vaultDelete: 'Share', vaultDecrypt: 'Duba', vaultBack: 'Baya',
    antitheft: 'Kare Daga Barayi', trustedContact: 'Aboki na Amfani',
    trustedDesc: 'Lamba don gargadin gaggawa',
    saveContact: 'Ajiye', autoLocation: 'Raba Wuri Kai-tsaye',
    autoLocDesc: 'Raba wuri idan gargadi ya faru',
    lastLocation: 'Wuri na Karshe', findPhone: 'Nemi Wayata',
    stealthMode: 'Yanayi Sirri', stealthDesc: 'Koyaushe buɗe kamar lissafi',
    nativeFeatures: 'App na Asali', nativeDesc: 'Gano canjin SIM yana bukatar Shield Pro.',
    downloadPro: 'Samu Shield Pro',
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
    vaultTitle: 'Ilé-Iṣọ́ Aṣírí', vaultEnter: 'Tẹ Koodu',
    vaultCreate: 'Ṣẹda Koodu', vaultSub: 'Koodu yii dáàbò bo àwọn fáìlì rẹ.',
    vaultConfirm: 'Jerisi', vaultSave: 'Ṣi Ilé-Iṣọ́',
    vaultErrorMatch: 'Awon koodu ko yato', vaultErrorLength: 'O gbodo je onka mokan',
    vaultHome: 'Ilé-Iṣọ́ Mi', vaultPhotos: 'Aworan', vaultNotes: 'Akiye',
    vaultDocs: 'Iwe-aṣẹ', vaultUpload: 'Gbé Sókè',
    vaultNotePlaceholder: 'Kọ àkíyèsí rẹ níbí...',
    vaultSaveNote: 'Pa & Fipamọ', vaultEmpty: 'Ilé-Iṣọ́ ṣofo',
    vaultDelete: 'Paarẹ', vaultDecrypt: 'Wo', vaultBack: 'Padà',
    antitheft: 'Idaabobo Lodi Barayi', trustedContact: 'Olubasoro Aabo',
    trustedDesc: 'Nọmba fun ikilo gbigba',
    saveContact: 'Fipamọ', autoLocation: 'Pin Ipo Aifisun',
    autoLocDesc: 'Pin ipo nigba ti ikilo ba waye',
    lastLocation: 'Ipo Ikehin', findPhone: 'Wa Foonu Mi',
    stealthMode: 'Ipo Asiri', stealthDesc: 'Nigbagbogbo ṣi bi kalkuletà',
    nativeFeatures: 'Ohun elo Asa', nativeDesc: 'Iwadii iyipada SIM nilo Shield Pro.',
    downloadPro: 'Gba Shield Pro',
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
    vaultTitle: 'Nchekwa Nzuzo', vaultEnter: 'Tinye Koodu',
    vaultCreate: 'Kepu Koodu', vaultSub: 'Koodu a na-echebe faịlụ gị.',
    vaultConfirm: 'Kwenye', vaultSave: 'Mepee Nchekwa',
    vaultErrorMatch: 'Koodu adabaghị', vaultErrorLength: 'Ọ kwesịghị ịbụ onu ogugu anọ',
    vaultHome: 'Nchekwa M', vaultPhotos: 'Foto', vaultNotes: 'Ihe Edego',
    vaultDocs: 'Akwụkwọ', vaultUpload: 'Bulite',
    vaultNotePlaceholder: 'Dee ihe edego gị ebe a...',
    vaultSaveNote: 'Kpọchie & Chekwaa', vaultEmpty: 'Nchekwa adịghị ihe',
    vaultDelete: 'Hichapụ', vaultDecrypt: 'Lelee', vaultBack: 'Laghachi',
    antitheft: 'Nchebe Megide Izu Ohi', trustedContact: 'Onye Amaara Nchebe',
    trustedDesc: 'Nọmba maka nti nchebe',
    saveContact: 'Chekwaa', autoLocation: 'Kekọrịta Ebe Akwụsịghị',
    autoLocDesc: 'Kekọrịta ebe mgbe nti gasịrị',
    lastLocation: 'Ebe Ikechiri', findPhone: 'Chọta Ekwenti M',
    stealthMode: 'Mode Nzuzo', stealthDesc: 'Mepee dị ka kalkuletà mgbe niile',
    nativeFeatures: 'Ngwa Asụsụ', nativeDesc: 'Nchọpụta mgbanwe SIM chọrọ Shield Pro.',
    downloadPro: 'Nweta Shield Pro',
  },
  pg: {
    shield: 'SHIELD', subtitle: 'Your Safety Padi', protected: 'You Dey Safe',
    status: 'Wetin Dey Happen', time: 'Time Wey E Be', location: 'Where You Dey', active: 'E Dey Work',
    quickActions: 'Wetin You Wan Do Quick', panicAlert: 'Shout Help', panicDesc: 'Send signal say wahala dey',
    checkIn: 'Show Where You Dey', checkInDesc: 'Tell your people where you dey',
    safeCircle: 'Your People', safeCircleDesc: 'Manage your contacts',
    resources: 'Wetin Fit Help You', resourcesDesc: 'Safety guide and help',
    activity: 'Wetin Happen', appSecured: 'App don lock with PIN',
    locEnabled: 'Location dey on', justNow: 'Just Now',
    notes: 'News', note1: 'Dey safe. Your Shield dey watch you.',
    note2: 'Add emergency contacts for your people so dem fit respond quick.',
    home: 'House', map: 'Map', alerts: 'Alert', more: 'More',
    settings: 'Settings', language: 'Language', resetPin: 'Change PIN',
    about: 'About Shield', version: 'Version 2.0.0',
    pinSetupTitle: 'Set Your PIN', pinSetupSub: 'Set 4-digit PIN to open Shield.',
    enterPin: 'Type PIN', confirmPin: 'Confirm PIN', savePin: 'Save PIN',
    pinHint: 'Default open: 2+4+6+8==', pinErrorMatch: 'PIN no match',
    pinErrorLength: 'PIN must be 4 numbers', pinSaved: 'PIN don save',
    panicHold: 'HOLD BUTTON — Hold am well to confirm', panicSent: 'WE DON SEND ALERT',
    checkInSent: 'We don share your location with your people',
    comingSoon: 'E go soon ready',
    vaultTitle: 'Secret Place', vaultEnter: 'Type Your Secret Code',
    vaultCreate: 'Set Secret Code', vaultSub: 'This code go protect your secret files.',
    vaultConfirm: 'Confirm Code', vaultSave: 'Open Secret Place',
    vaultErrorMatch: 'Code no match', vaultErrorLength: 'Code must be 4 numbers',
    vaultHome: 'My Secret Place', vaultPhotos: 'Pictures', vaultNotes: 'Notes',
    vaultDocs: 'Documents', vaultUpload: 'Upload File',
    vaultNotePlaceholder: 'Write your secret note here...',
    vaultSaveNote: 'Lock & Save', vaultEmpty: 'Secret place empty',
    vaultDelete: 'Delete', vaultDecrypt: 'View', vaultBack: 'Go Back',
    antitheft: 'Anti-Thief', trustedContact: 'Person Wey You Trust',
    trustedDesc: 'Phone number for emergency alert',
    saveContact: 'Save Number', autoLocation: 'Auto Share Location',
    autoLocDesc: 'Share location when panic happen',
    lastLocation: 'Last Place Wey You Dey', findPhone: 'Find My Phone',
    stealthMode: 'Hide Mode', stealthDesc: 'App go always open as calculator',
    nativeFeatures: 'Phone App Features',
    nativeDesc: 'SIM change detection and uninstall prevention need Shield Pro for Android.',
    downloadPro: 'Get Shield Pro',
  },
};

function getLang(): string { return localStorage.getItem(LANG_KEY) || 'en'; }
function setLang(lang: string): void { localStorage.setItem(LANG_KEY, lang); }
function t(key: string): string {
  const lang = getLang();
  return i18n[lang]?.[key] || i18n['en'][key] || key;
}

function getVaultPIN(): string | null { return localStorage.getItem(VAULT_PIN_KEY); }
function setVaultPIN(pin: string): void { localStorage.setItem(VAULT_PIN_KEY, pin); }

function simpleEncrypt(text: string, key: string): string {
  let result = '';
  for (let i = 0; i < text.length; i++) {
    result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
  }
  return btoa(result);
}
function simpleDecrypt(encoded: string, key: string): string {
  try {
    const text = atob(encoded);
    let result = '';
    for (let i = 0; i < text.length; i++) {
      result += String.fromCharCode(text.charCodeAt(i) ^ key.charCodeAt(i % key.length));
    }
    return result;
  } catch { return '[Decryption Failed]'; }
}

interface VaultItem {
  id: string;
  type: 'photo' | 'note' | 'doc';
  name: string;
  data: string;
  date: string;
}

function getVaultItems(): VaultItem[] {
  try { const raw = localStorage.getItem(VAULT_ITEMS_KEY); return raw ? JSON.parse(raw) : []; }
  catch { return []; }
}
function saveVaultItems(items: VaultItem[]): void { localStorage.setItem(VAULT_ITEMS_KEY, JSON.stringify(items)); }
function addVaultItem(item: VaultItem): void { const items = getVaultItems(); items.push(item); saveVaultItems(items); }
function deleteVaultItem(id: string): void { const items = getVaultItems().filter(i => i.id !== id); saveVaultItems(items); }

function getTrustedContact(): string { return localStorage.getItem(TRUSTED_CONTACT_KEY) || ''; }
function setTrustedContact(phone: string): void { localStorage.setItem(TRUSTED_CONTACT_KEY, phone); }
function getStealthMode(): boolean { return localStorage.getItem(STEALTH_KEY) === 'true'; }
function setStealthMode(on: boolean): void { localStorage.setItem(STEALTH_KEY, on ? 'true' : 'false'); }
function escapeHtml(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

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
    case 'vault': renderVaultEntry(); break;
    case 'vaultHome': renderVaultHome(); break;
    case 'vaultNote': renderVaultNote(); break;
    case 'vaultList': renderVaultList(); break;
    case 'antitheft': renderAntiTheft(); break;
    default: renderHome();
  }
}

function renderHome(): void {
  app.innerHTML = `
    <div class="home-bg">
      <div class="home-overlay"></div>
      <div class="home-content">
        <header class="home-header">
          <div class="home-brand" id="vault-trigger">
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
  attachVaultTrigger();
}

function attachVaultTrigger(): void {
  const trigger = document.getElementById('vault-trigger');
  if (!trigger) return;
  let pressTimer: number | null = null;
  let isPressing = false;
  const startPress = (e: Event) => {
    e.preventDefault();
    isPressing = true;
    trigger.style.transform = 'scale(0.95)';
    trigger.style.opacity = '0.7';
    pressTimer = window.setTimeout(() => {
      if (isPressing) {
        trigger.style.transform = '';
        trigger.style.opacity = '';
        showToast('&#x1F510; ' + t('vaultTitle'));
        setTimeout(() => showView('vault'), 400);
      }
    }, 1200);
  };
  const cancelPress = () => {
    isPressing = false;
    trigger.style.transform = '';
    trigger.style.opacity = '';
    if (pressTimer) { clearTimeout(pressTimer); pressTimer = null; }
  };
  trigger.addEventListener('mousedown', startPress);
  trigger.addEventListener('touchstart', startPress, { passive: false });
  trigger.addEventListener('mouseup', cancelPress);
  trigger.addEventListener('mouseleave', cancelPress);
  trigger.addEventListener('touchend', cancelPress);
  trigger.addEventListener('touchcancel', cancelPress);
  let lastTap = 0;
  trigger.addEventListener('click', (e) => {
    const now = Date.now();
    if (now - lastTap < 300) {
      e.preventDefault();
      showToast('&#x1F510; ' + t('vaultTitle'));
      setTimeout(() => showView('vault'), 200);
    }
    lastTap = now;
  });
}

function startClock(): void {
  const update = () => {
    const el = document.getElementById('live-clock');
    if (el) { el.textContent = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }); }
  };
  update();
  setInterval(update, 1000);
}

function attachHomeListeners(): void {
  document.getElementById('lock-btn')?.addEventListener('click', () => renderCalculator());
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

function showToast(msg: string): void {
  const existing = document.querySelector('.home-toast');
  if (existing) existing.remove();
  const toast = document.createElement('div');
  toast.className = 'home-toast';
  toast.textContent = msg;
  document.body.appendChild(toast);
  requestAnimationFrame(() => toast.classList.add('show'));
  setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 2500);
}

/* ── VAULT ── */
function renderVaultEntry(): void {
  const hasPin = getVaultPIN();
  const isCreate = !hasPin;
  app.innerHTML = `
    <div class="vault-page">
      <div class="vault-card">
        <div class="vault-icon">&#x1F510;</div>
        <h1>${isCreate ? t('vaultCreate') : t('vaultEnter')}</h1>
        <p class="vault-sub">${t('vaultSub')}</p>
        <div class="pin-input-group">
          <label>${isCreate ? t('vaultCreate') : t('vaultEnter')}</label>
          <input type="password" id="vault-pin1" maxlength="4" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;" inputmode="numeric" pattern="[0-9]*">
        </div>
        ${isCreate ? `
        <div class="pin-input-group">
          <label>${t('vaultConfirm')}</label>
          <input type="password" id="vault-pin2" maxlength="4" placeholder="&#x2022;&#x2022;&#x2022;&#x2022;" inputmode="numeric" pattern="[0-9]*">
        </div>
        ` : ''}
        <div class="setup-error" id="vault-error"></div>
        <button class="setup-button" id="vault-btn">${t('vaultSave')}</button>
        <button class="vault-cancel" id="vault-cancel">Cancel</button>
      </div>
    </div>
  `;
  document.getElementById('vault-cancel')?.addEventListener('click', () => showView('home'));
  document.getElementById('vault-btn')?.addEventListener('click', () => {
    const p1 = (document.getElementById('vault-pin1') as HTMLInputElement)?.value;
    const p2 = isCreate ? (document.getElementById('vault-pin2') as HTMLInputElement)?.value : p1;
    const error = document.getElementById('vault-error')!;
    if (p1.length < 4 || (isCreate && p2.length < 4)) { error.textContent = t('vaultErrorLength'); return; }
    if (isCreate && p1 !== p2) { error.textContent = t('vaultErrorMatch'); return; }
    if (!isCreate && p1 !== hasPin) { error.textContent = t('vaultErrorMatch'); return; }
    if (isCreate) setVaultPIN(p1);
    showView('vaultHome');
  });
}

function renderVaultHome(): void {
  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">&#x1F510; ${t('vaultHome')}</h2>
      <div class="actions-grid vault-grid">
        <button class="action-card" id="vault-upload-btn">
          <div class="action-icon">&#x1F4F7;</div>
          <div class="action-label">${t('vaultPhotos')}</div>
          <div class="action-desc">${t('vaultUpload')}</div>
        </button>
        <button class="action-card" id="vault-note-btn">
          <div class="action-icon">&#x1F4DD;</div>
          <div class="action-label">${t('vaultNotes')}</div>
          <div class="action-desc">Write secure note</div>
        </button>
        <button class="action-card" id="vault-docs-btn">
          <div class="action-icon">&#x1F4C4;</div>
          <div class="action-label">${t('vaultDocs')}</div>
          <div class="action-desc">${t('vaultUpload')}</div>
        </button>
        <button class="action-card" id="vault-list-btn">
          <div class="action-icon">&#x1F4C1;</div>
          <div class="action-label">My Files</div>
          <div class="action-desc">View encrypted items</div>
        </button>
      </div>
      <button class="vault-cancel" style="margin-top:24px" id="vault-exit">${t('vaultBack')}</button>
    </div>
  `;

  document.getElementById('vault-upload-btn')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file'; input.accept = 'image/*';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const pin = getVaultPIN()!;
        addVaultItem({ id: Date.now().toString(), type: 'photo', name: file.name, data: simpleEncrypt(reader.result as string, pin), date: new Date().toLocaleString() });
        showToast('Photo encrypted & saved'); 
        logAlert('vault', 'photo saved to vault'); // <-- JUST ADD THIS
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  document.getElementById('vault-note-btn')?.addEventListener('click', () => showView('vaultNote'));

  document.getElementById('vault-docs-btn')?.addEventListener('click', () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = () => {
        const pin = getVaultPIN()!;
        addVaultItem({ id: Date.now().toString(), type: 'doc', name: file.name, data: simpleEncrypt(reader.result as string, pin), date: new Date().toLocaleString() });
        showToast('Document encrypted & saved');
      };
      reader.readAsDataURL(file);
    };
    input.click();
  });

  document.getElementById('vault-list-btn')?.addEventListener('click', () => showView('vaultList'));
  document.getElementById('vault-exit')?.addEventListener('click', () => showView('home'));
}

function renderVaultNote(): void {
  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">&#x1F4DD; ${t('vaultNotes')}</h2>
      <textarea class="vault-textarea" id="vault-note-text" placeholder="${t('vaultNotePlaceholder')}"></textarea>
      <button class="setup-button" id="vault-save-note">${t('vaultSaveNote')}</button>
      <button class="vault-cancel" id="vault-note-back">${t('vaultBack')}</button>
    </div>
  `;
  document.getElementById('vault-save-note')?.addEventListener('click', () => {
    const text = (document.getElementById('vault-note-text') as HTMLTextAreaElement)?.value;
    if (!text.trim()) return;
    const pin = getVaultPIN()!;
    addVaultItem({ id: Date.now().toString(), type: 'note', name: 'Note ' + new Date().toLocaleDateString(), data: simpleEncrypt(text, pin), date: new Date().toLocaleString() });
    showToast('Note encrypted & saved');
    showView('vaultHome');
  });
  document.getElementById('vault-note-back')?.addEventListener('click', () => showView('vaultHome'));
}

function renderVaultList(): void {
  const items = getVaultItems();
  const pin = getVaultPIN()!;

  const listHtml =
    items.length === 0
      ? `<div class="vault-empty">${t('vaultEmpty')}</div>`
      : items
          .map((item) => {
            const icon =
              item.type === 'photo'
                ? '&#x1F4F7;'
                : item.type === 'note'
                ? '&#x1F4DD;'
                : '&#x1F4C4;';

            const safeName = escapeHtml(item.name);
            const safeDate = escapeHtml(item.date);

            return `
              <div class="vault-item" data-id="${item.id}">
                <div class="vault-item-icon">${icon}</div>
                <div class="vault-item-info">
                  <p class="vault-item-name">${safeName}</p>
                  <span class="vault-item-date">${safeDate}</span>
                </div>
                <div class="vault-item-actions">
                  <button class="vault-action-btn view" data-id="${item.id}" data-type="${item.type}">
                    ${t('vaultDecrypt')}
                  </button>
                  <button class="vault-action-btn delete" data-id="${item.id}">
                    ${t('vaultDelete')}
                  </button>
                </div>
              </div>
            `;
          })
          .join('');

  app.innerHTML = `
    <div class="view-page vault-view">
      <h2 class="view-title">&#x1F4C1; My Files</h2>
      <div class="vault-list">
        ${listHtml}
      </div>
      <button class="vault-cancel" id="vault-list-back">
        ${t('vaultBack')}
      </button>
    </div>
  `;

  // VIEW ITEM
  document.querySelectorAll('.vault-action-btn.view').forEach((btn) => {
    btn.addEventListener('click', async () => {
      const id = (btn as HTMLElement).dataset.id!;
      const type = (btn as HTMLElement).dataset.type!;

      const item = items.find((i) => i.id === id);
      if (!item) return;

      const decrypted = simpleDecrypt(item.data, pin);
      const safeName = escapeHtml(item.name);
      const safeDecrypted = escapeHtml(decrypted);

      if (type === 'photo') {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">&#x1F4F7; ${safeName}</h2>
            <img src="${decrypted}" class="vault-preview-img" />
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">
              &#x1F4E4; Share
            </button>
            <button class="vault-cancel" id="vault-preview-back">
              ${t('vaultBack')}
            </button>
          </div>
        `;
      } else if (type === 'note') {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">&#x1F4DD; ${safeName}</h2>
            <div class="vault-note-preview">
              ${safeDecrypted.replace(/\n/g, '<br>')}
            </div>
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">
              &#x1F4E4; Share
            </button>
            <button class="vault-cancel" id="vault-preview-back">
              ${t('vaultBack')}
            </button>
          </div>
        `;
      } else {
        app.innerHTML = `
          <div class="view-page vault-view">
            <h2 class="view-title">&#x1F4C4; ${safeName}</h2>
            <div class="vault-note-preview" style="text-align:center;padding:40px 20px">
              <div style="font-size:48px;margin-bottom:16px">&#x1F4C4;</div>
              <p>${safeName}</p>
              <p style="color:rgba(255,255,255,.5);font-size:12px;margin-top:8px">
                Tap Share to send this document
              </p>
            </div>
            <button class="setup-button" id="vault-share-btn" style="margin-bottom:10px">
              &#x1F4E4; Share
            </button>
            <button class="vault-cancel" id="vault-preview-back">
              ${t('vaultBack')}
            </button>
          </div>
        `;
      }

      // SHARE BUTTON
      document.getElementById('vault-share-btn')?.addEventListener('click', async () => {
        const contact = getTrustedContact();

        if (navigator.share) {
          try {
            let file: File | undefined;
            let canShareFiles = false;

            if (item.type === 'photo') {
              const response = await fetch(decrypted);
              const blob = await response.blob();
              file = new File([blob], item.name, {
                type: blob.type || 'application/octet-stream',
              });
              canShareFiles = typeof navigator.canShare === 'function' && navigator.canShare({ files: [file] });
            }

            await shareVaultItem(item.type, item.name, decrypted, {
              file,
              canShareFiles,
            });
          } catch (err) {
            console.error(err);
            showToast('Share cancelled');
          }
        } else if (contact) {
          window.open(
            `sms:${contact}?body=${encodeURIComponent('Shared from Shield Vault: ' + item.name)}`,
            '_blank'
          );
        } else {
          showToast('No trusted contact set');
        }
      });

      document.getElementById('vault-preview-back')?.addEventListener('click', () => {
        showView('vaultList');
      });
    });
  });

  // DELETE ITEM
  document.querySelectorAll('.vault-action-btn.delete').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = (btn as HTMLElement).dataset.id!;
      if (!confirm('Delete this item?')) {
        return;
      }
      deleteVaultItem(id);
      showToast('Deleted');
      renderVaultList();
    });
  });

  // BACK BUTTON
  document.getElementById('vault-list-back')?.addEventListener('click', () => {
    showView('vaultHome');
  });
}

/* ── ANTI-THEFT ── */
function renderAntiTheft(): void {
  const contact = getTrustedContact();
  const stealth = getStealthMode();
  app.innerHTML = viewShell(`
    <div class="view-antitheft">
      <h2 class="view-title">&#x1F6E1; ${t('antitheft')}</h2>
      <div class="settings-group">
        <h3>${t('trustedContact')}</h3>
        <p class="setting-desc">${t('trustedDesc')}</p>
        <input type="tel" class="settings-input" id="trusted-phone" placeholder="+234..." value="${contact}">
        <button class="settings-btn secondary" id="save-contact-btn">${t('saveContact')}</button>
      </div>
      <div class="settings-group">
        <h3>${t('autoLocation')}</h3>
        <p class="setting-desc">${t('autoLocDesc')}</p>
        <label class="toggle-row">
          <span>Enable</span>
          <input type="checkbox" class="toggle-switch" id="auto-loc-toggle" checked>
        </label>
      </div>
      <div class="settings-group">
        <h3>${t('lastLocation')}</h3>
        <button class="settings-btn secondary" id="find-phone-btn">${t('findPhone')}</button>
        <div class="location-display" id="location-display"></div>
      </div>
      <div class="settings-group">
        <h3>${t('stealthMode')}</h3>
        <p class="setting-desc">${t('stealthDesc')}</p>
        <label class="toggle-row">
          <span>Enable</span>
          <input type="checkbox" class="toggle-switch" id="stealth-toggle" ${stealth ? 'checked' : ''}>
        </label>
      </div>
      <div class="settings-group native-features">
        <h3>&#x1F4F1; ${t('nativeFeatures')}</h3>
        <p class="setting-desc">${t('nativeDesc')}</p>
        <div class="native-list">
          <div class="native-item"><span>&#x274C;</span> SIM Change Detection</div>
          <div class="native-item"><span>&#x274C;</span> Uninstall Prevention</div>
          <div class="native-item"><span>&#x274C;</span> Background Tracker</div>
          <div class="native-item"><span>&#x2705;</span> Trusted Contact Alerts</div>
          <div class="native-item"><span>&#x2705;</span> Auto Location Share</div>
          <div class="native-item"><span>&#x2705;</span> Stealth Mode</div>
        </div>
        <button class="settings-btn pro" id="download-pro-btn">${t('downloadPro')}</button>
      </div>
    </div>
  `, 'settings');

  // Event listeners go OUTSIDE the template literal
  document.getElementById('save-contact-btn')?.addEventListener('click', () => {
    const phone = (document.getElementById('trusted-phone') as HTMLInputElement)?.value;
    setTrustedContact(phone);
    showToast('Contact saved');

    // Visual feedback
    const btn = document.getElementById('save-contact-btn')!;
    const originalText = btn.textContent;
    btn.textContent = 'Saved!';
    btn.style.background = '#22c55e';
    setTimeout(() => {
      btn.textContent = originalText;
      btn.style.background = '';
    }, 1500);
  });

  document.getElementById('stealth-toggle')?.addEventListener('change', (e) => {
    setStealthMode((e.target as HTMLInputElement).checked);
    showToast('Stealth mode updated');
  });

  document.getElementById('find-phone-btn')?.addEventListener('click', () => {
    const display = document.getElementById('location-display')!;
    display.textContent = 'Getting location...';
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const lat = pos.coords.latitude.toFixed(6);
          const lng = pos.coords.longitude.toFixed(6);
          const url = `https://maps.google.com/?q=${lat},${lng}`;
          localStorage.setItem(LAST_LOCATION_KEY, `${lat},${lng}`);
          display.innerHTML = `<a href="${url}" target="_blank">${lat}, ${lng}</a><br><span style="font-size:11px;color:#888">${new Date().toLocaleString()}</span>`;
        },
        () => { display.textContent = 'Location access denied'; }
      );
    } else { display.textContent = 'Geolocation not supported'; }
  });

  document.getElementById('download-pro-btn')?.addEventListener('click', () => {
    showToast('Shield Pro coming to Play Store');
  });

  attachNavListeners();
}
/* ── OTHER VIEWS ── */
function renderMap(): void {
  app.innerHTML = viewShell(`
    <div class="view-map">
      <div class="map-container" id="map-container">
        <div class="map-loading">Getting your location...</div>
      </div>
      <div class="map-info">
        <p id="map-coords">Locating...</p>
        <button class="checkin-btn" id="map-share-loc">${t('checkIn')}</button>
      </div>
    </div>
  `, 'map');

  const container = document.getElementById('map-container')!;
  const coordsEl = document.getElementById('map-coords')!;

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const zoom = 15;
        // OpenStreetMap embed (no API key needed)
        container.innerHTML = `
          <iframe 
            width="100%" 
            height="100%" 
            frameborder="0" 
            scrolling="no" 
            marginheight="0" 
            marginwidth="0" 
            src="https://www.openstreetmap.org/export/embed.html?bbox=${Number(lng)-0.01}%2C${Number(lat)-0.01}%2C${Number(lng)+0.01}%2C${Number(lat)+0.01}&layer=mapnik&marker=${lat}%2C${lng}"
            style="border:none; border-radius: 16px; filter: invert(1) hue-rotate(180deg);"
          ></iframe>
        `;
        coordsEl.innerHTML = `<span style="color:#22c55e">${lat}, ${lng}</span><br><span style="font-size:11px;color:rgba(255,255,255,0.4)">Accuracy: ${Math.round(pos.coords.accuracy)}m</span>`;
        localStorage.setItem(LAST_LOCATION_KEY, `${lat},${lng}`);
      },
      () => {
        container.innerHTML = `<div class="map-placeholder"><div class="map-icon">&#x1F5FA;</div><h2>Location Access Denied</h2><p>Enable location services to see your position.</p></div>`;
        coordsEl.textContent = 'Location unavailable';
      },
      { enableHighAccuracy: true, timeout: 10000 }
    );
  } else {
    container.innerHTML = `<div class="map-placeholder"><div class="map-icon">&#x1F5FA;</div><h2>Not Supported</h2><p>Your browser doesn't support geolocation.</p></div>`;
  }

  document.getElementById('map-share-loc')?.addEventListener('click', () => {
    const last = localStorage.getItem(LAST_LOCATION_KEY);
    const contact = getTrustedContact();
    if (last && contact) {
      const [lat, lng] = last.split(',');
      const msg = `Check-in from Shield: https://maps.google.com/?q=${lat},${lng}`;
      window.open(`sms:${contact}?body=${encodeURIComponent(msg)}`, '_blank');
      logAlert('checkin', `Location shared: ${lat}, ${lng}`);
      showToast(t('checkInSent'));
    } else {
      showToast('Set a trusted contact first');
    }
  });

  attachNavListeners();
}
function renderAlerts(): void {
  const alerts = getAlerts();
  const alertHtml = alerts.length === 0
    ? `<div class="alert-empty"><div class="alert-icon">&#x1F514;</div><p>No alerts yet</p><span style="color:rgba(255,255,255,0.4);font-size:12px">Panic and Check-in events appear here</span></div>`
    : alerts.map(a => {
        const icon = a.type === 'panic' ? '&#x1F6A8;' : a.type === 'checkin' ? '&#x1F4CD;' : a.type === 'vault' ? '&#x1F510;' : '&#x2139;';
        const color = a.type === 'panic' ? '#ef4444' : a.type === 'checkin' ? '#22c55e' : '#3b82f6';
        return `
          <div class="activity-item" style="margin-bottom:8px">
            <div class="activity-dot" style="background:${color};box-shadow:0 0 6px ${color}80"></div>
            <div class="activity-info">
              <p>${icon} ${a.message}</p>
              <span>${a.time}</span>
            </div>
          </div>
        `;
      }).join('');

  app.innerHTML = viewShell(`
    <div class="view-alerts" style="padding:16px">
      <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:16px">
        <h2 class="view-title" style="padding:0;border:none">${t('alerts')}</h2>
        ${alerts.length > 0 ? `<button class="home-lock" id="clear-alerts" style="width:auto;padding:0 16px;font-size:13px">Clear</button>` : ''}
      </div>
      <div class="activity-list">${alertHtml}</div>
    </div>
  `, 'alerts');

  document.getElementById('clear-alerts')?.addEventListener('click', () => {
    localStorage.removeItem(ALERTS_KEY);
    showToast('Alerts cleared');
    renderAlerts();
  });
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
      panicRing?.classList.remove('holding');
      const contact = getTrustedContact();
      if (!contact) {
        showToast('No trusted contact set');
        return;
      }

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          async (pos) => {
            const lat = pos.coords.latitude.toFixed(6);
            const lng = pos.coords.longitude.toFixed(6);
            const body = `PANIC ALERT from Shield! Location: https://maps.google.com/?q=${lat},${lng}`;

            try {
              const fcmToken = getStoredFcmToken();
              const res = await fetch(getAlertEndpoint(import.meta.env.VITE_PUBLIC_API_BASE_URL || ''), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: contact, body, fcmToken }),
              });
              const data = await res.json();
              if (data.success) {
                const channel = data.channel || 'sms';
                showToast(channel === 'push' ? 'Panic alert sent via push' : t('panicSent'));
                logAlert('panic', `Panic alert sent to ${contact} via ${channel}`);
              } else {
                showToast('Failed to send alert');
              }
            } catch {
              showToast('Network error');
            }
          },
          async () => {
            const body = 'PANIC ALERT from Shield!';
            try {
              const fcmToken = getStoredFcmToken();
              const res = await fetch(getAlertEndpoint(import.meta.env.VITE_PUBLIC_API_BASE_URL || ''), {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ to: contact, body, fcmToken }),
              });
              const data = await res.json();
              if (data.success) {
                const channel = data.channel || 'sms';
                showToast(channel === 'push' ? 'Panic alert sent via push' : t('panicSent'));
                logAlert('panic', `Panic alert sent to ${contact} via ${channel}`);
              } else {
                showToast('Failed to send alert');
              }
            } catch {
              showToast('Failed to send alert');
            }
          }
        );
      } else {
        const body = 'PANIC ALERT from Shield!';
        const fcmToken = getStoredFcmToken();
        fetch(getAlertEndpoint(import.meta.env.VITE_PUBLIC_API_BASE_URL || ''), {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ to: contact, body, fcmToken }),
        })
          .then(async (res) => {
            const data = await res.json();
            if (data.success) {
              const channel = data.channel || 'sms';
              showToast(channel === 'push' ? 'Panic alert sent via push' : t('panicSent'));
              logAlert('panic', `Panic alert sent to ${contact} via ${channel}`);
            } else {
              showToast('Failed to send alert');
            }
          })
          .catch(() => showToast('Failed to send alert'));
      }
    }, 2000);
  };
  const cancelPanic = () => { if (holdTimer) clearTimeout(holdTimer); panicRing?.classList.remove('holding'); };
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
    const contact = getTrustedContact();
    if (contact && navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((pos) => {
        const lat = pos.coords.latitude.toFixed(6);
        const lng = pos.coords.longitude.toFixed(6);
        const msg = `Check-in from Shield: https://maps.google.com/?q=${lat},${lng}`;
        window.open(`sms:${contact}?body=${encodeURIComponent(msg)}`, '_blank');
      });
    }
    showToast(t('checkInSent'));
    logAlert('checkin', `Location shared with Safe Circle`);
    setTimeout(() => showView('home'), 1500);
  });
  attachNavListeners();
}

function renderContacts(): void {
  const contact = getTrustedContact();
  const safeContact = escapeHtml(contact);

  app.innerHTML = viewShell(`
    <div class="view-contacts">
      <h2 class="view-title">${t('safeCircle')}</h2>
      <div class="settings-group">
        <h3>${t('trustedContact')}</h3>
        <p class="setting-desc">${t('trustedDesc')}</p>
        <input type="tel" class="settings-input" id="trusted-phone" placeholder="+234..." value="${safeContact}">
        <button class="settings-btn secondary" id="save-contact-btn">${t('saveContact')}</button>
      </div>
      <div class="settings-group">
        <h3>Safe Circle Status</h3>
        <p class="setting-desc">Your trusted contact is used for alerts, check-ins, and emergency sharing.</p>
        <div class="location-display" id="contact-status-display">${contact ? safeContact : 'No trusted contact saved yet.'}</div>
      </div>
    </div>
  `, 'home');

  document.getElementById('save-contact-btn')?.addEventListener('click', () => {
    const phone = (document.getElementById('trusted-phone') as HTMLInputElement)?.value.trim();
    setTrustedContact(phone);
    showToast('Contact saved');

    const statusEl = document.getElementById('contact-status-display');
    if (statusEl) {
      statusEl.textContent = phone || 'No trusted contact saved yet.';
    }
  });

  attachNavListeners();
}

function renderResources(): void {
  app.innerHTML = viewShell(`
    <div class="view-resources">
      <h2 class="view-title">${t('resources')}</h2>
      <div class="resource-list">
        <div class="resource-card"><div class="resource-icon">&#x1F6A8;</div><div><h3>Emergency Numbers</h3><p>Police, Fire, Medical</p></div></div>
        <div class="resource-card"><div class="resource-icon">&#x1F3E5;</div><div><h3>Nearest Hospitals</h3><p>Find medical help fast</p></div></div>
        <div class="resource-card"><div class="resource-icon">&#x1F46E;</div><div><h3>Police Stations</h3><p>Locate authorities</p></div></div>
        <div class="resource-card"><div class="resource-icon">&#x1F4E7;</div><div><h3>NGO Support</h3><p>Women's aid & shelters</p></div></div>
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
          <option value="pg" ${lang === 'pg' ? 'selected' : ''}>Pidgin</option>
          <option value="ha" ${lang === 'ha' ? 'selected' : ''}>Hausa</option>
          <option value="yo" ${lang === 'yo' ? 'selected' : ''}>Yoruba</option>
          <option value="ig" ${lang === 'ig' ? 'selected' : ''}>Igbo</option>
        </select>
      </div>
      <div class="settings-group">
        <h3>Security</h3>
        <button class="settings-btn" id="reset-pin-btn">${t('resetPin')}</button>
        <button class="settings-btn secondary" id="vault-settings-btn">&#x1F510; ${t('vaultTitle')}</button>
      </div>
      <div class="settings-group">
        <h3>&#x1F6E1; ${t('antitheft')}</h3>
        <button class="settings-btn secondary" id="antitheft-btn">${t('antitheft')} Settings</button>
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
    showToast('Language updated'); renderSettings();
  });
  document.getElementById('reset-pin-btn')?.addEventListener('click', () => {
    resetPIN();
    showToast('PIN reset. Restarting...');
    setTimeout(() => renderCalculator(), 1500);
  });
  document.getElementById('vault-settings-btn')?.addEventListener('click', () => showView('vault'));
  document.getElementById('antitheft-btn')?.addEventListener('click', () => showView('antitheft'));
  attachNavListeners();
}

function viewShell(content: string, activeTab: string): string {
  return `
    <div class="view-page">${content}</div>
    <nav class="home-nav">
      <button class="nav-item ${activeTab === 'home' ? 'active' : ''}" data-tab="home"><span class="nav-icon">&#x1F3E0;</span><span>${t('home')}</span></button>
      <button class="nav-item ${activeTab === 'map' ? 'active' : ''}" data-tab="map"><span class="nav-icon">&#x1F5FA;</span><span>${t('map')}</span></button>
      <button class="nav-item nav-panic ${activeTab === 'panic' ? 'active' : ''}" data-tab="panic"><span class="nav-icon">&#x1F6A8;</span></button>
      <button class="nav-item ${activeTab === 'alerts' ? 'active' : ''}" data-tab="alerts"><span class="nav-icon">&#x1F514;</span><span>${t('alerts')}</span></button>
      <button class="nav-item ${activeTab === 'settings' ? 'active' : ''}" data-tab="settings"><span class="nav-icon">&#x2699;</span><span>${t('more')}</span></button>
    </nav>
  `;
}

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
    const p1 = pin1.value, p2 = pin2.value;
    if (p1.length < 4 || p2.length < 4) { error.textContent = t('pinErrorLength'); return; }
    if (p1 !== p2) { error.textContent = t('pinErrorMatch'); return; }
    await savePIN(p1);
    showToast(t('pinSaved'));
    renderHome();
  });
}

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
    if (ok) { calculator?.destroy(); renderHome(); return true; }
    return false;
  });
}

renderCalculator();