// AES加密
import CryptoJS from 'crypto-js'

//AES加密     
const KEY = CryptoJS.enc.Utf8.parse('62fa329fbbaf4ea78136525be6904249');

export const encrypt = (word, keyStr) => {
  let key = KEY
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
  }
  let srcs = CryptoJS.enc.Utf8.parse(word);

  let encrypted = CryptoJS.AES.encrypt(srcs, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });

  return encrypted.toString();
}

// AES 解密
export const decrypt = (word, keyStr) => {
  let key = KEY;
  if (keyStr) {
    key = CryptoJS.enc.Utf8.parse(keyStr);
  }
  var decrypt = CryptoJS.AES.decrypt(word, key, { mode: CryptoJS.mode.ECB, padding: CryptoJS.pad.Pkcs7 });
  return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}
