import CryptoJS from 'crypto-js'
import store from '@/store'

export function encrypt(word){
    var key = CryptoJS.enc.Utf8.parse(store.state.security.aes);
    var srcs = CryptoJS.enc.Utf8.parse(word);
    var encrypted = CryptoJS.AES.encrypt(srcs, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return encrypted.toString();
  }
  
export  function decrypt(word){
    var key = CryptoJS.enc.Utf8.parse(store.state.security.aes);
    var decrypt = CryptoJS.AES.decrypt(word, key, {mode:CryptoJS.mode.ECB,padding: CryptoJS.pad.Pkcs7});
    return CryptoJS.enc.Utf8.stringify(decrypt).toString();
}