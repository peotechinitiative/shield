import { LanguageSelector } from './LanguageSelector';
import { router } from '../utils/router';
import type { ViewName } from '../types';

export class HomeView {
  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-home';
    el.className = 'view';
    el.innerHTML = `
      <div class="topbar">
        <div class="topbar-left">
          <div class="eyebrow">Shield</div>
          <h2>You're safe here</h2>
          <div class="sub">Everything below stays local to this device unless you choose to share it.</div>
        </div>
        <div class="topbar-right" id="lang-slot"></div>
      </div>
      <div class="content">
        <div class="section-title">Quick actions</div>
        <div class="grid">
          <div class="tile" data-view="checkin"><div class="icon">📍</div><div class="label">Start a meetup check-in</div></div>
          <div class="tile" data-view="lookup"><div class="icon">🔍</div><div class="label">Check a profile / number</div></div>
          <div class="tile" data-view="vault"><div class="icon">🔒</div><div class="label">Evidence vault</div></div>
          <div class="tile" data-view="playbook"><div class="icon">📋</div><div class="label">Blackmail playbook</div></div>
          <div class="tile panic-tile" data-view="panic"><div class="icon">🆘</div><div class="label">Panic — alert my trusted contacts now</div></div>
        </div>
        <div class="section-title">Recent</div>
        <div class="card">
          <h3>No recent activity</h3>
          <p>Check-ins, lookups, and vault items you create will show up here — visible only after you unlock the app.</p>
        </div>
      </div>
    `;

    // Add language selector
    const langSlot = el.querySelector('#lang-slot');
    if (langSlot) {
      const lang = new LanguageSelector();
      langSlot.appendChild(lang.render());
    }

    el.querySelectorAll<HTMLElement>('[data-view]').forEach(tile => {
      tile.addEventListener('click', () => {
        const view = tile.dataset.view as ViewName;
        router.navigate(view);
      });
    });

    return el;
  }
}