export type ViewName = 'home' | 'checkin' | 'lookup' | 'vault' | 'playbook' | 'panic';

export interface VaultItem {
  id?: number | string;
  type: 'note' | 'image' | 'voice';
  name?: string;
  content?: string;
  text?: string;
  dataUrl?: string;
  duration?: number;
  createdAt: number;
}

export interface EncryptedVaultItem {
  id?: string | number;
  iv: string;
  salt: string;
  cipher: string;
}
export interface GeoPosition {
  lat: number;
  lng: number;
  accuracy: number;
}

export type Operator = '+' | '-' | '*' | '/' | '=' | '−' | '×' | '÷';