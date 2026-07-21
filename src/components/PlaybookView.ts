import { router } from '../utils/router';

export class PlaybookView {
  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-playbook';
    el.className = 'view hidden';
    el.innerHTML = `
      <div class="topbar">
        <div class="back-row" data-back="home">‹ Back</div>
        <h2>If someone threatens to expose you</h2>
        <div class="sub">Read this before you respond to them.</div>
      </div>
      <div class="content">
        <div class="card"><h3>1. Don't pay, and don't panic-reply</h3><p>Paying rarely ends it — it usually signals you'll pay again. Take time before responding to anything.</p></div>
        <div class="card"><h3>2. Lock down your accounts</h3><p>Change passwords on email and social accounts, turn on two-factor authentication, and check for unfamiliar login sessions.</p></div>
        <div class="card"><h3>3. Save everything</h3><p>Screenshot every message before blocking. Store it in your evidence vault — don't rely on the platform to keep a copy.</p></div>
        <div class="card"><h3>4. Tell someone you trust</h3><p>Isolation is what makes this work for them. One trusted person knowing changes your options.</p></div>
        <div class="card"><h3>5. Report through the right channel</h3><p>Use the platform's report flow for extortion/blackmail specifically — it's routed differently than general abuse reports.</p></div>
      </div>
    `;
    el.querySelector<HTMLElement>('[data-back="home"]')!.addEventListener('click', () => router.navigate('home'));
    return el;
  }
}
