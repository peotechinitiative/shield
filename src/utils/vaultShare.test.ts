import { describe, it, expect, vi, beforeEach } from 'vitest';
import { buildVaultSharePayload, shareVaultItem } from './vaultShare';

describe('buildVaultSharePayload', () => {
  const shareMock = vi.fn();
  const canShareMock = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    Object.assign(navigator, {
      share: shareMock,
      canShare: canShareMock,
    });
  });

  it('returns a text-only share payload for note and doc items', () => {
    const payload = buildVaultSharePayload('note', 'Secret Note', 'plain text content');

    expect(payload.title).toBe('Shield Vault');
    expect(payload.text).toContain('Shared from Shield Vault: Secret Note');
    expect(payload.text).toContain('plain text content');
    expect(payload.files).toBeUndefined();
  });

  it('uses file sharing only when the photo item supports file sharing', () => {
    const file = new File(['photo-bytes'], 'photo.jpg', { type: 'image/jpeg' });
    const payload = buildVaultSharePayload('photo', 'photo.jpg', 'data:image/jpeg;base64,abc', {
      file,
      canShareFiles: true,
    });

    expect(payload.files?.[0]).toBe(file);
    expect(payload.text).toContain('Shared from Shield Vault: photo.jpg');
  });

  it('invokes native share with text for note items', async () => {
    shareMock.mockResolvedValue(undefined);

    await shareVaultItem('note', 'Secret Note', 'plain text content');

    expect(shareMock).toHaveBeenCalledWith(expect.objectContaining({
      title: 'Shield Vault',
      text: expect.stringContaining('Shared from Shield Vault: Secret Note'),
    }));
  });
});
