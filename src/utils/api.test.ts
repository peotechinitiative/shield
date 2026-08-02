import { describe, expect, it } from 'vitest';
import { getAlertEndpoint, getSmsEndpoint } from './api';

describe('getSmsEndpoint', () => {
  it('uses the configured API base URL when present', () => {
    expect(getSmsEndpoint('https://shield-pi-seven.vercel.app')).toBe('https://shield-pi-seven.vercel.app/api/send-sms');
  });

  it('falls back to the same-origin API path when no base URL is configured', () => {
    expect(getSmsEndpoint('')).toBe('/api/send-sms');
  });
});

describe('getAlertEndpoint', () => {
  it('uses the configured API base URL when present', () => {
    expect(getAlertEndpoint('https://shield-pi-seven.vercel.app')).toBe('https://shield-pi-seven.vercel.app/api/send-alert');
  });

  it('falls back to the same-origin API path when no base URL is configured', () => {
    expect(getAlertEndpoint('')).toBe('/api/send-alert');
  });
});
