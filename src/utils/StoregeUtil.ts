import JsonUtil from './JsonUtil'

export default class StorageUtil {
  static setObj (key: string, value: any) {
    uni.setStorageSync(key, JsonUtil.toJson(value))
  }

  static getObj (key: string): any {
    const objStr: string = uni.getStorageSync(key)
    if (objStr) {
      return JsonUtil.jsonParse(objStr)
    }
    return null
  }

  static set (key: string, value: any): any {
    return uni.setStorageSync(key, value)
  }

  static get (key: string): any {
    return uni.getStorageSync(key) || null
  }

  static remove (key: string) {
    uni.removeStorageSync(key)
  }
}
