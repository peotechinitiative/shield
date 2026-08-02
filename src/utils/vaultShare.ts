export type VaultShareItemType = 'photo' | 'note' | 'doc';

export interface VaultSharePayloadOptions {
  file?: File;
  canShareFiles?: boolean;
}

export function buildVaultSharePayload(
  itemType: VaultShareItemType,
  itemName: string,
  decrypted: string,
  options: VaultSharePayloadOptions = {}
): ShareData {
  const title = 'Shield Vault';
  const text = `Shared from Shield Vault: ${itemName}`;

  if (itemType === 'photo' && options.file && options.canShareFiles) {
    return {
      title,
      text,
      files: [options.file],
    };
  }

  return {
    title,
    text: `${text}\n\n${decrypted}`,
  };
}

export async function shareVaultItem(
  itemType: VaultShareItemType,
  itemName: string,
  decrypted: string,
  options: VaultSharePayloadOptions = {}
): Promise<void> {
  if (typeof navigator.share !== 'function') {
    throw new Error('Native share is unavailable');
  }

  const payload = buildVaultSharePayload(itemType, itemName, decrypted, options);
  await navigator.share(payload);
}
