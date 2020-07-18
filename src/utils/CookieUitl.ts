import StorageUtil from './StoregeUtil'

export default class CookieUtil {
    
    private static readonly coremailSid:string = 'Coremail.sid'
    private static readonly coremail:string = 'Coremail'

    static get() {
        const sid = StorageUtil.get(this.coremailSid)
        const coremail = StorageUtil.get(this.coremail)
        let _cookie = sid ? `${this.coremailSid}=${sid}` : ''
        _cookie += coremail ? `${this.coremail}=${coremail}` : ''
        return _cookie
    }
}