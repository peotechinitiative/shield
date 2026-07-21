export interface EncryptedVaultItem {
  id?: string | number;
  iv: string;
  salt: string;
  cipher: string;
}

export async function deriveKey(passcode: string, saltB64?: string): Promise<{ key: CryptoKey; salt: string }> {
  const salt = saltB64 ? base64ToBuffer(saltB64) : crypto.getRandomValues(new Uint8Array(16));
  const saltStr = bufferToBase64(salt as any);
  
  const encoder = new TextEncoder();
  const baseKey = await crypto.subtle.importKey(
    'raw',
    encoder.encode(passcode),
    'PBKDF2',
    false,
    ['deriveKey']
  );
  
  const key = await crypto.subtle.deriveKey(
    { name: 'PBKDF2', salt: salt as any, iterations: 150_000, hash: 'SHA-256' },
    baseKey,
    { name: 'AES-GCM', length: 256 },
    false,
    ['encrypt', 'decrypt']
  );
  
  return { key, salt: saltStr };
}

export async function encryptJSON(key: CryptoKey, data: object): Promise<EncryptedVaultItem> {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const salt = crypto.getRandomValues(new Uint8Array(16));
  const encoder = new TextEncoder();
  const plaintext = encoder.encode(JSON.stringify(data));
  
  const cipher = await crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    key,
    plaintext
  );
  
  return {
    iv: bufferToBase64(iv as any),
    salt: bufferToBase64(salt as any),
    cipher: bufferToBase64(new Uint8Array(cipher) as any),
  };
}

export async function decryptJSON(key: CryptoKey, enc: EncryptedVaultItem): Promise<any> {
  const iv = base64ToBuffer(enc.iv);
  const cipher = base64ToBuffer(enc.cipher);
  
  const plain = await crypto.subtle.decrypt(
    { name: 'AES-GCM', iv: iv as any },
    key,
    cipher as any
  );
  
  return JSON.parse(new TextDecoder().decode(plain));
}

function bufferToBase64(buf: ArrayBuffer | Uint8Array): string {
  const bytes = new Uint8Array(buf);
  let bin = '';
  for (let i = 0; i < bytes.byteLength; i++) {
    bin += String.fromCharCode(bytes[i]);
  }
  return btoa(bin);
}

function base64ToBuffer(b64: string): ArrayBuffer {
  const bin = atob(b64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes.buffer;
}