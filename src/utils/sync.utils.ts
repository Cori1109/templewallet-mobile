import { NativeModules } from 'react-native';

import { SyncPayloadInterface } from '../interfaces/sync.interface';

export const TEMPLE_SYNC_PREFIX = 'templesync';

export const parseSyncPayload = async (payload: string, password: string): Promise<SyncPayloadInterface> => {
  let index = 0;
  const pick = (length?: number) => payload.slice(index, length && (index += length));

  const prefix = Buffer.from(pick(16), 'base64').toString('utf8');
  if (prefix !== TEMPLE_SYNC_PREFIX) {
    throw new Error('Payload is not Temple Sync payload');
  }

  const salt = Buffer.from(pick(24), 'base64').toString('hex');
  const iv = Buffer.from(pick(24), 'base64').toString('hex');
  const encrypted = pick();

  try {
    const key = await NativeModules.Aes.pbkdf2(password, salt, 5000, 256);
    const decrypted = await NativeModules.Aes.decrypt(encrypted, key, iv);

    const [mnemonic, hdAccountsLength] = JSON.parse(decrypted);

    return {
      mnemonic,
      hdAccountsLength
    };
  } catch (_err) {
    throw new Error('Failed to decrypt sync payload');
  }
};

export const isSyncPayload = (payload: string): boolean => {
  if (payload.length > 64) {
    try {
      const prefix = Buffer.from(payload.slice(0, 16), 'base64').toString('utf8');

      return prefix === TEMPLE_SYNC_PREFIX;
    } catch (_err) {}
  }

  return false;
};
