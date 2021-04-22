import * as  CryptoJS from 'crypto-js';

export const encrypt = (text: string) => {
  const passphrase = 'qazwsxedc';
  return CryptoJS.AES.encrypt(text, passphrase).toString();
}

export const decrypt = (cipherText: any) => {
  const passphrase = 'qazwsxedc';
  const bytes = CryptoJS.AES.decrypt(cipherText, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
}
