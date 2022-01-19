import CryptoJS from 'crypto-js'

// 使用crypto加密
//十六位十六进制数作为密钥
//十六位十六进制数作为密钥偏移量
export const encryp = (key, iv, data) => {
  if (typeof data === "object") {
    // 如果传入的data是json对象，先转义为json字符串
    try {
      data = JSON.stringify(data)
    } catch (error) {
      console.log("error:", error)
    }
  }
  // 统一将传入的字符串转成UTF8编码
  const dataHex = CryptoJS.enc.Utf8.parse(data) // 需要加密的数据
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  const encrypted = CryptoJS.AES.encrypt(dataHex, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC, // 加密模式
    padding: CryptoJS.pad.Pkcs7
  })
  let encryptedVal = encrypted.ciphertext.toString()
  return encryptedVal;
}


// 解密数据
export const decrypt = (key, iv, encryptedVal) => {
  console.log(CryptoJS);
  // 统一将传入的字符串转成UTF8编码
  let encryptedHexStr = CryptoJS.enc.Hex.parse(encryptedVal);
  let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
  const keyHex = CryptoJS.enc.Utf8.parse(key) // 秘钥
  const ivHex = CryptoJS.enc.Utf8.parse(iv) // 偏移量
  let decrypt = CryptoJS.AES.decrypt(srcs, keyHex, {
    iv: ivHex,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7
  });
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  return decryptedStr.toString();
}

