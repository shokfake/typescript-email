const RSAKey = require('js-jsbn/dist/rsa.js')

export class CryptUtil {

   static RSAEncrypt(content:string, modules:string,publicExponent:string):string {
    const publicKey = new RSAKey()
    publicKey.setPublic(modules, publicExponent)
    return publicKey.encrypt(content)
   }
}