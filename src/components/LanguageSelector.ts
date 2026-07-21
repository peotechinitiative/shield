import { setLocale, getLocale, type Locale } from '../services/i18n';

const locales: Array<{ code: Locale; label: string; flag: string }> = [
  { code: 'en', label: 'English', flag: '🇬🇧' },
  { code: 'yo', label: 'Yorùbá', flag: '🇳🇬' },
  { code: 'ha', label: 'Hausa', flag: '🇳🇬' },
  { code: 'ig', label: 'Igbo', flag: '🇳🇬' },
  { code: 'pj', label: 'Naija Pidgin', flag: '🇳🇬' },
];

export class LanguageSelector {
  render(): HTMLElement {
    const el = document.createElement('div');
    el.className = 'lang-selector';
    el.innerHTML = `
      <button class="lang-toggle" aria-label="Change language">
        🌐 ${getLocale().toUpperCase()}
      </button>
      <div class="lang-menu hidden">
        ${locales.map(l => `
          <div class="lang-option ${getLocale() === l.code ? 'active' : ''}" data-locale="${l.code}">
            <span>${l.flag}</span> ${l.label}
          </div>
        `).join('')}
      </div>
    `;

    const toggle = el.querySelector('.lang-toggle')!;
    const menu = el.querySelector('.lang-menu')!;

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.toggle('hidden');
    });

    el.querySelectorAll('.lang-option').forEach(opt => {
      opt.addEventListener('click', () => {
        const locale = opt.getAttribute('data-locale') as Locale;
        setLocale(locale);
        window.location.reload();
      });
    });

    document.addEventListener('click', (e) => {
      if (!el.contains(e.target as Node)) {
        menu.classList.add('hidden');
      }
    });

    return el;
  }
}
