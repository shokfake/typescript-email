export default class  TokenUtil {
   private static readonly _sid:string = '_sid'
    
    static set(sid: string) {
        uni.setStorageSync(this._sid, sid)
    }

    static hasSid():boolean {
        return !!TokenUtil.get()
    }

    static get():string{
        return uni.getStorageSync(this._sid)
    }

    static remove() {
        uni.removeStorageSync(this._sid)
       
    }
}