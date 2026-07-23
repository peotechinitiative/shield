// ── PIN Security Utilities ──

const PIN_STORAGE_KEY = 'shield_pin_hash';
const FIRST_LAUNCH_KEY = 'shield_first_launch_complete';

/**
 * Hash a PIN using SHA-256 (client-side)
 */
export async function hashPIN(pin: string): Promise<string> {
  const encoder = new TextEncoder();
  const data = encoder.encode(pin + 'shield-salt-2024'); // Simple salt
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  return hashArray.map(b => b.toString(16).padStart(2, '0')).join('');
}

/**
 * Save PIN to localStorage (hashed)
 */
export async function savePIN(pin: string): Promise<void> {
  const hash = await hashPIN(pin);
  localStorage.setItem(PIN_STORAGE_KEY, hash);
  localStorage.setItem(FIRST_LAUNCH_KEY, 'true');
}

/**
 * Verify if entered PIN matches stored hash
 */
export async function verifyPIN(keyLog: string): Promise<boolean> {
  const storedHash = localStorage.getItem(PIN_STORAGE_KEY);
  if (!storedHash) return false;

  // Convert keyLog format "2+4+6+8==" to just digits for PIN comparison
  // Or check if the raw keyLog matches a stored pattern
  const pin = extractPINFromKeyLog(keyLog);
  if (!pin) return false;

  const inputHash = await hashPIN(pin);
  return inputHash === storedHash;
}

/**
 * Extract PIN digits from keyLog
 * e.g., "2+4+6+8==" -> "2468" (extracts only digits)
 */
function extractPINFromKeyLog(keyLog: string): string | null {
  // Extract only digits from the keyLog
  const digits = keyLog.replace(/[^0-9]/g, '');
  return digits.length >= 4 ? digits : null;
}

/**
 * Check if this is the first app launch
 */
export function isFirstLaunch(): boolean {
  return !localStorage.getItem(FIRST_LAUNCH_KEY);
}

/**
 * Reset PIN (for testing or forgot PIN flow)
 */
export function resetPIN(): void {
  localStorage.removeItem(PIN_STORAGE_KEY);
  localStorage.removeItem(FIRST_LAUNCH_KEY);
}

/**
 * Check if PIN is set up
 */
export function hasPIN(): boolean {
  return !!localStorage.getItem(PIN_STORAGE_KEY);
}