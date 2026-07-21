import { router } from '../utils/router';
import { t } from '../services/i18n';
import { lookupReport, submitReport } from '../services/supabase';
import { supabase } from '../services/supabase';

export class LookupView {
  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-lookup';
    el.className = 'view hidden';
    el.innerHTML = `
      <div class="topbar">
        <div class="back-row" data-back="home">‹ ${t('nav.home')}</div>
        <h2>${t('lookup.title')}</h2>
        <div class="sub">${t('lookup.subtitle')}</div>
      </div>
      <div class="content">
        <div class="card">
          <input type="text" placeholder="${t('lookup.placeholder')}" id="lookupInput">
          <button class="btn btn-primary" id="lookupBtn">${t('lookup.check')}</button>
        </div>
        <div id="lookupResults"></div>
        <div id="threatAnalysis"></div>
        <div class="card hidden" id="reportForm">
          <h3>Submit a report</h3>
          <select id="reportTier">
            <option value="low">Low risk</option>
            <option value="high">High risk</option>
          </select>
          <textarea id="reportNote" placeholder="Describe what happened..." rows="4" style="width:100%;margin-top:8px;padding:12px;border-radius:10px;border:1px solid var(--line);font-family:inherit;font-size:14px;"></textarea>
          <button class="btn btn-primary" id="submitReportBtn">Submit Report</button>
        </div>
      </div>
    `;

    el.querySelector<HTMLElement>('[data-back="home"]')!.addEventListener('click', () => router.navigate('home'));
    el.querySelector<HTMLButtonElement>('#lookupBtn')!.addEventListener('click', () => this.search(el));
    el.querySelector<HTMLInputElement>('#lookupInput')!.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') this.search(el);
    });
    el.querySelector<HTMLButtonElement>('#submitReportBtn')!.addEventListener('click', () => this.submit(el));

    return el;
  }

  private async search(el: HTMLElement): Promise<void> {
    const input = el.querySelector<HTMLInputElement>('#lookupInput')!;
    const results = el.querySelector<HTMLElement>('#lookupResults')!;
       // const threatEl = el.querySelector<HTMLElement>('#threatAnalysis')!;
    const q = input.value.trim();

    if (!q) { results.innerHTML = ''; return; }

    try {
      const data = await lookupReport(q);
      if (data.found) {
        const tierClass = data.tier === 'high' ? 'tier-high' : 'tier-low';
        const tierLabel = data.tier === 'high' ? t('lookup.confirmedPattern') : t('lookup.oneReport');
        results.innerHTML = `
          <div class="card">
            <div class="result-row"><strong>${q}</strong><span class="tier ${tierClass}">${tierLabel}</span></div>
            <p>${data.note}</p>
            <p style="margin-top:8px;color:#a6a297;">${data.count} ${t('lookup.reportsOnFile')}.</p>
          </div>
        `;
      } else {
        results.innerHTML = `
          <div class="card">
            <div class="result-row"><strong>${q}</strong><span class="tier tier-none">${t('lookup.noReports')}</span></div>
            <p>${t('lookup.noReportsDesc')}</p>
          </div>
        `;
        el.querySelector('#reportForm')!.classList.remove('hidden');
      }
    } catch {
      results.innerHTML = '<div class="card"><p style="color:var(--danger)">Lookup failed. Please try again.</p></div>';
    }
  }

  private async submit(el: HTMLElement): Promise<void> {
    const input = el.querySelector<HTMLInputElement>('#lookupInput')!;
    const tier = (el.querySelector<HTMLSelectElement>('#reportTier')!).value as 'low' | 'high';
    const note = (el.querySelector<HTMLTextAreaElement>('#reportNote')!).value;
    const q = input.value.trim();

    if (!note || note.length < 10) {
      alert('Please provide a detailed description (min 10 characters)');
      return;
    }

    // AI Threat Analysis
    const threatEl = el.querySelector<HTMLElement>('#threatAnalysis')!;
    threatEl.innerHTML = `<div class="card"><p>⏳ ${t('threat.analyzing')}</p></div>`;

    try {
      const { data: aiData } = await supabase.functions.invoke('ai-analyze', { body: { text: note } });
      if (aiData) {
        threatEl.innerHTML = `
          <div class="card">
            <h3>🛡️ ${t('threat.score')}: ${aiData.threat_score}/100</h3>
            <div class="result-row"><span>${t('threat.category')}</span><span class="tier tier-${aiData.urgency === 'critical' ? 'high' : aiData.urgency}">${aiData.category}</span></div>
            <div class="result-row"><span>${t('threat.urgency')}</span><span class="tier tier-${aiData.urgency === 'critical' ? 'high' : aiData.urgency}">${t(`threat.${aiData.urgency}`)}</span></div>
            ${aiData.keywords.length ? `<p style="margin-top:8px;font-size:12px;color:var(--slate)">Keywords: ${aiData.keywords.join(', ')}</p>` : ''}
            ${aiData.entities.length ? `<p style="font-size:12px;color:var(--slate)">Entities: ${aiData.entities.map((e: any) => e.value).join(', ')}</p>` : ''}
            <p style="margin-top:8px;font-size:13px;color:#5c6b74">${aiData.summary}</p>
          </div>
        `;
      }
    } catch {
      threatEl.innerHTML = '';
    }

    try {
      await submitReport(q, tier, note);
      alert('Report submitted for review. Thank you.');
      el.querySelector('#reportForm')!.classList.add('hidden');
    } catch (err: any) {
      alert(err.message || 'Failed to submit report');
    }
  }
}
