import { aesGcmEncrypt, aesGcmDecrypt } from './encryption';

const DEFAULT_VALIDITY_PERIOD = 5 * 60 * 1000; // 5 minutes

interface State {
  value: string;
  expires: number;
}

export async function encodeState(
  value: string,
  password: string,
  expires = Date.now() + DEFAULT_VALIDITY_PERIOD,
) {
  const state: State = { value, expires };
  return aesGcmEncrypt(JSON.stringify(state), password);
}

export async function decodeState(encryptedState: string, password: string) {
  let state: State;
  try {
    const decrypted = await aesGcmDecrypt(encryptedState, password);
    state = JSON.parse(decrypted);
  } catch (err) {
    throw new Error('Invalid state value.');
  }
  if (Date.now() > state.expires) {
    throw new Error('State has expired.');
  }
  return state.value;
}
