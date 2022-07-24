import { webcrypto } from '../utils';

/**
 * Encrypts plaintext using AES-GCM with supplied password, for decryption with aesGcmDecrypt().
 *                                                                      (c) Chris Veness MIT Licence
 *
 * @param   {String} plaintext - Plaintext to be encrypted.
 * @param   {String} password - Password to use to encrypt plaintext.
 * @returns {Promise<String>} Encrypted ciphertext.
 *
 * @example
 *   const ciphertext = await aesGcmEncrypt('my secret text', 'pw');
 *   aesGcmEncrypt('my secret text', 'pw').then(function(ciphertext) { console.log(ciphertext); });
 */
export async function aesGcmEncrypt(plaintext: string, password: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(password); // encode password as UTF-8
  const pwHash = await webcrypto.subtle.digest('SHA-256', pwUtf8); // hash the password

  const iv = webcrypto.getRandomValues(new Uint8Array(12)); // get 96-bit random iv

  const alg = { name: 'AES-GCM', iv: iv }; // specify algorithm to use

  const key = await webcrypto.subtle.importKey('raw', pwHash, alg, false, ['encrypt']); // generate key from pw

  const ptUint8 = new TextEncoder().encode(plaintext); // encode plaintext as UTF-8
  const ctBuffer = await webcrypto.subtle.encrypt(alg, key, ptUint8); // encrypt plaintext using key

  const ctArray = Array.from(new Uint8Array(ctBuffer)); // ciphertext as byte array
  const ctStr = ctArray.map((byte) => String.fromCharCode(byte)).join(''); // ciphertext as string
  const ctBase64 = Buffer.from(ctStr, 'binary').toString('base64'); // encode ciphertext as base64

  const ivHex = Array.from(iv)
    .map((b: number) => ('00' + b.toString(16)).slice(-2))
    .join(''); // iv as hex string

  return ivHex + ctBase64; // return iv+ciphertext
}

/**
 * Decrypts ciphertext encrypted with aesGcmEncrypt() using supplied password.
 *                                                                      (c) Chris Veness MIT Licence
 *
 * @param   {String} ciphertext - Ciphertext to be decrypted.
 * @param   {String} password - Password to use to decrypt ciphertext.
 * @returns {Promise<String>} Decrypted plaintext.
 *
 * @example
 *   const plaintext = await aesGcmDecrypt(ciphertext, 'pw');
 *   aesGcmDecrypt(ciphertext, 'pw').then(function(plaintext) { console.log(plaintext); });
 */
export async function aesGcmDecrypt(ciphertext: string, password: string): Promise<string> {
  const pwUtf8 = new TextEncoder().encode(password); // encode password as UTF-8
  const pwHash = await webcrypto.subtle.digest('SHA-256', pwUtf8); // hash the password

  const iv = ciphertext
    .slice(0, 24)
    .match(/.{2}/g)
    .map((byte) => parseInt(byte, 16)); // get iv from ciphertext

  const alg = { name: 'AES-GCM', iv: new Uint8Array(iv) }; // specify algorithm to use

  const key = await webcrypto.subtle.importKey('raw', pwHash, alg, false, ['decrypt']); // use pw to generate key

  const ctStr = Buffer.from(ciphertext.slice(24), 'base64').toString('binary'); // decode base64 ciphertext
  const ctUint8 = new Uint8Array(ctStr.match(/[\s\S]/g).map((ch) => ch.charCodeAt(0))); // ciphertext as Uint8Array
  // note: why doesn't ctUint8 = new TextEncoder().encode(ctStr) work?

  const plainBuffer = await webcrypto.subtle.decrypt(alg, key, ctUint8); // decrypt ciphertext using key
  const plaintext = new TextDecoder().decode(plainBuffer); // decode password from UTF-8

  return plaintext; // return the plaintext
}
