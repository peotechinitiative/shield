import { router } from '../utils/router';
import { toast } from '../utils/toast';
import { dbGet, dbPut, dbGetAll } from '../utils/db';
import { deriveKey, encryptJSON, decryptJSON } from '../utils/crypto';
import type { VaultItem } from '../types';
import type { EncryptedVaultItem } from '../utils/crypto';

export class VaultView {
  private vaultKey: CryptoKey | null = null;
  private container: HTMLElement | null = null;

  render(): HTMLElement {
    const el = document.createElement('div');
    el.id = 'view-vault';
    el.className = 'view hidden';
    el.innerHTML = `
      <div class="topbar">
        <div class="back-row" data-back="home">‹ Back</div>
        <h2>Evidence vault</h2>
        <div class="sub">Encrypted on this device, locked separately from the calculator.</div>
      </div>
      <div class="content" id="vaultContent"></div>
    `;

    el.querySelector<HTMLElement>('[data-back="home"]')!.addEventListener('click', () => router.navigate('home'));
    this.container = el.querySelector<HTMLElement>('#vaultContent')!;

    const observer = new MutationObserver(() => {
      if (!el.classList.contains('hidden')) {
        this.renderVault();
      }
    });
    observer.observe(el, { attributes: true, attributeFilter: ['class'] });

    setTimeout(() => this.renderVault(), 0);

    return el;
  }

  private async renderVault(): Promise<void> {
    if (!this.container) return;
    const saltRecord = await dbGet<{ key: string; value: string }>('meta', 'salt');

    if (!saltRecord) {
      this.renderSetup();
      return;
    }

    if (!this.vaultKey) {
      this.renderUnlock(saltRecord.value);
      return;
    }

    this.renderList();
  }

  private renderSetup(): void {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="card">
        <h3>Set a vault passcode</h3>
        <p>Separate from the calculator unlock. This encrypts everything saved here — it cannot be recovered if forgotten, by design.</p>
        <input type="text" id="vaultPasscode1" placeholder="New vault passcode">
        <input type="text" id="vaultPasscode2" placeholder="Confirm passcode" style="margin-top:8px;">
        <button class="btn btn-primary" id="vaultCreateBtn">Create vault</button>
        <div id="vaultSetupError" style="margin-top:6px;color:#a8412f;font-size:13px;"></div>
      </div>
    `;

    this.container.querySelector<HTMLButtonElement>('#vaultCreateBtn')!.addEventListener('click', async () => {
      const p1 = (document.getElementById('vaultPasscode1') as HTMLInputElement).value;
      const p2 = (document.getElementById('vaultPasscode2') as HTMLInputElement).value;
      const err = document.getElementById('vaultSetupError')!;

      if (!p1 || p1.length < 4) { err.textContent = 'Use at least 4 characters.'; return; }
      if (p1 !== p2) { err.textContent = "Passcodes don't match."; return; }

      try {
        const { key, salt: saltStr } = await deriveKey(p1);
        await dbPut('meta', { key: 'salt', value: saltStr });
        const check = await encryptJSON(key, { type: 'note', name: 'check', text: '', createdAt: Date.now() });
        await dbPut('items', check);
        this.vaultKey = key;
        toast('Vault created — this passcode cannot be recovered if lost');
        this.renderList();
      } catch (e) {
        err.textContent = 'Failed to create vault';
        console.error(e);
      }
    });
  }

  private renderUnlock(saltB64: string): void {
    if (!this.container) return;
    this.container.innerHTML = `
      <div class="card">
        <h3>Enter vault passcode</h3>
        <p>Unlocks only the evidence vault — separate from the calculator.</p>
        <input type="text" id="vaultUnlockInput" placeholder="Vault passcode">
        <button class="btn btn-primary" id="vaultUnlockBtn">Unlock vault</button>
        <div id="vaultUnlockError" style="margin-top:6px;color:#a8412f;font-size:13px;"></div>
      </div>
    `;

    this.container.querySelector<HTMLButtonElement>('#vaultUnlockBtn')!.addEventListener('click', async () => {
      const p = (document.getElementById('vaultUnlockInput') as HTMLInputElement).value;
      const err = document.getElementById('vaultUnlockError')!;
      
      try {
        const { key } = await deriveKey(p, saltB64);
        const checkRecord = await dbGet<EncryptedVaultItem>('items', 'check');
        if (checkRecord) {
          await decryptJSON(key, checkRecord);
          this.vaultKey = key;
        }
        this.renderList();
      } catch {
        err.textContent = 'Incorrect passcode';
      }
    });
  }

  private async renderList(): Promise<void> {
    if (!this.container || !this.vaultKey) return;
    const items = await dbGetAll<EncryptedVaultItem>('items');
    const decrypted: VaultItem[] = [];
    for (const it of items) {
      if (it.iv && this.vaultKey && it.id !== 'check') {
        const d = await decryptJSON(this.vaultKey, it);
        if (it.id !== undefined) decrypted.push({ ...d, id: it.id as any });
        else decrypted.push(d);
      }
    }

    decrypted.sort((a, b) => b.createdAt - a.createdAt);

    const rows = decrypted.map(d => {
      const icon = d.type === 'image' ? '🖼️' : d.type === 'voice' ? '🎙️' : '📝';
      const dateStr = new Date(d.createdAt).toLocaleDateString();
      return `
        <div class="vault-item">
          <div class="vault-icon">${icon}</div>
          <div class="vault-meta"><div class="name">${d.name || 'Untitled'}</div><div class="date">Added ${dateStr}</div></div>
          <span class="lock-badge">🔒</span>
        </div>
      `;
    }).join('') || '<p style="padding:8px 4px;color:#8a97a0;">Nothing saved yet.</p>';

    this.container.innerHTML = `
      <div class="card">${rows}</div>
      <div class="card">
        <h3>Add a note</h3>
        <input type="text" id="vaultNoteText" placeholder="What happened...">
        <button class="btn btn-primary" id="vaultAddNoteBtn">Save encrypted note</button>
      </div>
      <div class="card">
        <h3>Add a screenshot</h3>
        <input type="file" id="vaultImageInput" accept="image/*">
        <button class="btn btn-primary" id="vaultAddImageBtn">Save encrypted screenshot</button>
      </div>
      <button class="btn btn-ghost" id="vaultLockBtn">Lock vault</button>
    `;

    this.container.querySelector<HTMLButtonElement>('#vaultAddNoteBtn')!.addEventListener('click', () => this.addNote());
    this.container.querySelector<HTMLButtonElement>('#vaultAddImageBtn')!.addEventListener('click', () => this.addImage());
    this.container.querySelector<HTMLButtonElement>('#vaultLockBtn')!.addEventListener('click', () => {
      this.vaultKey = null;
      this.renderVault();
    });
  }

  private async addNote(): Promise<void> {
    if (!this.vaultKey) return;
    const text = (document.getElementById('vaultNoteText') as HTMLInputElement)?.value.trim();
    if (!text) return;
    try {
      const enc = await encryptJSON(this.vaultKey, {
        type: 'note',
        name: 'Note',
        content: text,
        createdAt: Date.now()
      });
      await dbPut('items', enc);
      toast('Note saved, encrypted');
      this.renderList();
    } catch (err) {
      toast('Save failed');
      console.error(err);
    }
  }

  private addImage(): void {
    if (!this.vaultKey) return;
    const file = (document.getElementById('vaultImageInput') as HTMLInputElement)?.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const dataUrl = reader.result as string;
        const enc = await encryptJSON(this.vaultKey!, {
          type: 'image',
          name: file.name,
          content: dataUrl,
          createdAt: Date.now()
        });
        await dbPut('items', enc);
        toast('Screenshot saved, encrypted');
        this.renderList();
      } catch (err) {
        toast('Save failed');
        console.error(err);
      }
    };
    reader.readAsDataURL(file);
  }

  private bufToB64(buf: ArrayBuffer): string {
    return btoa(String.fromCharCode(...new Uint8Array(buf)));
  }

  private b64ToBuf(b64: string): ArrayBuffer {
    const bin = atob(b64);
    const arr = new Uint8Array(bin.length);
    for (let i = 0; i < bin.length; i++) arr[i] = bin.charCodeAt(i);
    return arr.buffer;
  }
}