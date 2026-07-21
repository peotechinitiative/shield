import { router } from '../utils/router';
import { toast } from '../utils/toast';
import { t } from '../services/i18n';
import { startLocationTracking, stopLocationTracking } from '../services/location';
import { LiveMap } from './LiveMap';
import { startCheckIn, checkInSafe, cancelCheckIn, updateCheckInLocation } from '../services/supabase';

export class CheckInView {
  private timer: ReturnType<typeof setInterval> | null = null;
  private totalSeconds = 90 * 60;
  private remaining = this.totalSeconds;
  private readonly circumference = 377;
  private checkInId: string | null = null;
  private map: LiveMap | null = null;
  private isOffline = false;

  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-checkin';
    el.className = 'view hidden';
    el.innerHTML = `
      <div class="topbar">
        <div class="back-row" data-back="home">‹ ${t('nav.home')}</div>
        <h2>${t('checkin.title')}</h2>
        <div class="sub">${t('checkin.subtitle')}</div>
      </div>
      <div class="content">
        <div class="card" id="checkinSetup">
          <h3>${t('checkin.title')}</h3>
          <p>${t('checkin.trustedContact')}</p>
          <input type="text" placeholder="${t('checkin.contactPlaceholder')}" value="Tolu" id="checkinContact">
          <p style="margin-top:12px;">${t('checkin.window')}</p>
          <input type="text" placeholder="${t('checkin.windowPlaceholder')}" value="90 minutes" id="windowInput">
          <button class="btn btn-primary" id="startCheckin">${t('checkin.start')}</button>
        </div>
        <div class="card hidden" id="checkinActive">
          <div class="ring-wrap">
            <svg width="140" height="140" class="ring">
              <circle cx="70" cy="70" r="60" stroke="#e3e9ec" stroke-width="10" fill="none"/>
              <circle id="ringProgress" cx="70" cy="70" r="60" stroke="#c98a3b" stroke-width="10" fill="none"
                stroke-linecap="round" stroke-dasharray="377" stroke-dashoffset="0"/>
            </svg>
            <div class="ring-time" id="ringTime">90:00</div>
            <div class="ring-label">${t('checkin.liveTracking')}</div>
          </div>
          <div id="mapContainer"></div>
          <div class="share-link-card hidden" id="shareLinkCard">
            <p style="font-size:13px;color:#5c6b74;margin-bottom:8px;">🔗 Share this link with your contact so they can track you live:</p>
            <div class="share-link-box">
              <input type="text" id="shareLinkInput" readonly style="margin:0;background:#f8fafb;">
              <button class="btn btn-ghost" id="copyLinkBtn" style="margin:0;width:auto;padding:10px 14px;">Copy</button>
            </div>
          </div>
          <button class="btn btn-primary" id="checkInNow">${t('checkin.imSafe')}</button>
          <button class="btn btn-ghost" id="cancelCheckin">${t('checkin.cancel')}</button>
        </div>
      </div>
    `;

    el.querySelector<HTMLElement>('[data-back="home"]')!.addEventListener('click', () => router.navigate('home'));
    el.querySelector<HTMLButtonElement>('#startCheckin')!.addEventListener('click', () => this.start(el));
    el.querySelector<HTMLButtonElement>('#checkInNow')!.addEventListener('click', () => this.checkIn(el));
    el.querySelector<HTMLButtonElement>('#cancelCheckin')!.addEventListener('click', () => this.cancel(el));

    return el;
  }

  private async start(el: HTMLElement): Promise<void> {
    const contact = (el.querySelector<HTMLInputElement>('#checkinContact')!).value;
    const duration = 90;

    // Try auth, but fall back to offline mode if it fails
    let user = null;
    try {
      const { supabase } = await import('../services/supabase');
      for (let i = 0; i < 6; i++) {
        const { data } = await supabase.auth.getUser();
        user = data.user;
        if (user) break;
        await new Promise(r => setTimeout(r, 500));
      }
    } catch (err) {
      console.log('Auth not available, using offline mode');
    }

    if (!user) {
      this.isOffline = true;
      this.checkInId = 'local-' + Math.random().toString(36).substring(2, 10);
      console.log('Offline check-in:', this.checkInId);
    } else {
      try {
        const checkIn = await startCheckIn(contact, duration);
        this.checkInId = checkIn.id;
      } catch (err: any) {
        console.error('Check-in error:', err);
        toast('Server error — running offline');
        this.isOffline = true;
        this.checkInId = 'local-' + Math.random().toString(36).substring(2, 10);
      }
    }

    el.querySelector('#checkinSetup')!.classList.add('hidden');
    el.querySelector('#checkinActive')!.classList.remove('hidden');
    this.remaining = this.totalSeconds;

    // Show share link (only if online)
    const shareCard = el.querySelector<HTMLElement>('#shareLinkCard')!;
    const shareInput = el.querySelector<HTMLInputElement>('#shareLinkInput')!;
    if (!this.isOffline && this.checkInId) {
      const baseUrl = window.location.origin;
      const shareUrl = `${baseUrl}/live.html?id=${this.checkInId}`;
      shareInput.value = shareUrl;
      shareCard.classList.remove('hidden');
    }

    el.querySelector<HTMLButtonElement>('#copyLinkBtn')!.addEventListener('click', () => {
      const url = shareInput.value;
      if (url) {
        navigator.clipboard.writeText(url);
        toast('Link copied! Send it to your contact.');
      }
    });

    // Map
    const mapContainer = el.querySelector<HTMLElement>('#mapContainer')!;
    this.map = new LiveMap(mapContainer);

    // Location tracking
    const trackingOk = await startLocationTracking(async (pos) => {
      this.map?.updatePosition(pos);
      if (!this.isOffline && this.checkInId) {
        try {
          await updateCheckInLocation(this.checkInId, pos.lat, pos.lng, pos.accuracy);
        } catch (e) {
          // Silently fail if server is down
        }
      }
    });

    if (!trackingOk) {
      toast('Location access denied — check-in running without live tracking');
    }

    const ringProgress = el.querySelector<SVGCircleElement>('#ringProgress')!;
    const ringTime = el.querySelector<HTMLElement>('#ringTime')!;

    this.timer = setInterval(() => {
      this.remaining -= 20;
      if (this.remaining <= 0) {
        this.remaining = 0;
        clearInterval(this.timer!);
        toast(t('checkin.windowClosed'));
      }
      const mins = Math.floor(this.remaining / 60).toString().padStart(2, '0');
      const secs = Math.floor(this.remaining % 60).toString().padStart(2, '0');
      ringTime.textContent = `${mins}:${secs}`;
      const frac = this.remaining / this.totalSeconds;
      ringProgress.setAttribute('stroke-dashoffset', String(this.circumference * (1 - frac)));
    }, 300);

    toast(t('checkin.started'));
  }

  private async checkIn(el: HTMLElement): Promise<void> {
    if (this.timer) clearInterval(this.timer);
    stopLocationTracking();
    if (!this.isOffline && this.checkInId) {
      try { await checkInSafe(this.checkInId); } catch (e) {}
    }
    this.map?.destroy();
    this.map = null;
    el.querySelector('#checkinActive')!.classList.add('hidden');
    el.querySelector('#checkinSetup')!.classList.remove('hidden');
    toast(t('checkin.checkedIn'));
  }

  private async cancel(el: HTMLElement): Promise<void> {
    if (this.timer) clearInterval(this.timer);
    stopLocationTracking();
    if (!this.isOffline && this.checkInId) {
      try { await cancelCheckIn(this.checkInId); } catch (e) {}
    }
    this.map?.destroy();
    this.map = null;
    el.querySelector('#checkinActive')!.classList.add('hidden');
    el.querySelector('#checkinSetup')!.classList.remove('hidden');
    toast(t('checkin.cancelled'));
  }
}