import { router } from '../utils/router';
import { toast } from '../utils/toast';
import { t } from '../services/i18n';
import { triggerPanic } from '../services/supabase';
import { getCurrentPosition } from '../services/location';
import { supabase } from '../services/supabase';

export class PanicView {
  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-panic';
    el.className = 'view hidden';
    el.innerHTML = `
      <div class="topbar">
        <div class="back-row" data-back="home">‹ ${t('nav.home')}</div>
        <h2>${t('panic.title')}</h2>
        <div class="sub">${t('panic.subtitle')}</div>
      </div>
      <div class="content">
        <div class="card" id="panicConfirm">
          <h3>${t('panic.confirmTitle')}</h3>
          <p>${t('panic.confirmBody')}</p>
          <div class="panic-options">
            <label class="panic-option">
              <input type="radio" name="severity" value="standard" checked>
              <span class="option-label">Alert trusted contacts only</span>
            </label>
            <label class="panic-option">
              <input type="radio" name="severity" value="critical">
              <span class="option-label">🚨 CRITICAL — Also alert police/NGO</span>
            </label>
          </div>
          <button class="btn btn-danger" id="sendPanic">${t('panic.sendAlert')}</button>
          <button class="btn btn-ghost" data-back="home">${t('panic.cancel')}</button>
        </div>
        <div class="card hidden" id="panicSent">
          <h3>✅ ${t('panic.sent')}</h3>
          <p id="panicResult">${t('panic.sentBody')}</p>
          <div id="alertDetails" style="margin-top:12px;font-size:13px;color:#5c6b74;"></div>
        </div>
      </div>
    `;

    el.querySelector<HTMLElement>('[data-back="home"]')!.addEventListener('click', () => router.navigate('home'));
    el.querySelector<HTMLButtonElement>('#sendPanic')!.addEventListener('click', () => this.trigger(el));

    return el;
  }

  private async trigger(el: HTMLElement): Promise<void> {
    const severity = (el.querySelector<HTMLInputElement>('input[name="severity"]:checked')!).value;
    const pos = await getCurrentPosition();

    el.querySelector('#panicConfirm')!.classList.add('hidden');
    el.querySelector('#panicSent')!.classList.remove('hidden');

    try {
      // Always notify trusted contacts first
      const panicResult = await triggerPanic(pos || undefined);

      // If critical, also trigger police/NGO alert
      if (severity === 'critical') {
        const { data: policeResult } = await supabase.functions.invoke('police-alert', {
          body: {
            userId: (await supabase.auth.getUser()).data.user?.id,
            location: pos,
            severity: 'critical',
            details: 'User selected CRITICAL panic level',
          },
        });

        const detailsEl = el.querySelector<HTMLElement>('#alertDetails')!;
        if (policeResult?.alertsSent) {
          const sent = policeResult.alertsSent.filter((a: any) => a.status === 'sent');
          detailsEl.innerHTML = `
            <strong>Emergency services notified:</strong><br>
            ${sent.map((a: any) => `• ${a.contact.name} (${a.contact.type}) — ${a.status}`).join('<br>')}
            <br><br>
            <small>If this is a life-threatening emergency, also call your local emergency number directly.</small>
          `;
        }
      }

      setTimeout(() => {
        el.querySelector('#panicSent')!.classList.add('hidden');
        el.querySelector('#panicConfirm')!.classList.remove('hidden');
        router.navigate('home');
      }, 6000);

    } catch (err) {
      console.error('Panic failed:', err);
      toast('Alert failed — try calling emergency services directly');
    }
  }
}
