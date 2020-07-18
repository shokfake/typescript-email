export default class UniUtil {

    static delayTime(millisecond: number):Promise<any> {
        return new Promise<any>(resolve => {
            setTimeout(() => {
                resolve()
            }, millisecond)
        })
    }

    static textCopy(copyText:string, hint?:string) {
        return new Promise((resolve, reject) => {
            uni.setClipboardData({
                data: copyText,
                success() {
                    if(hint) {
                        uni.hideToast()
                        UniUtil.toast(hint)
                    }
                    resolve()
                   
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    }
    static toast(title:string, time?:number) {
        return new Promise((resolve, reject ) => {
            uni.showToast({
                icon: 'none',
                title: title,
                duration: time || 800,
                success() {
                    resolve()
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    }
    static toastLong(title:string) {
        return new Promise((resolve, reject) => {
            uni.showToast({
                icon: 'none',
                title: title,
                duration: 1500,
                success() {
                    resolve()
                },
                fail(err) {
                    reject(err)
                }
            })
        })
    }

    static action(msg:string, okLabel='确定', cancel='取消') {
        return new Promise((resolve, reject) => {
            uni.showModal({
                content: msg, 
                confirmText: okLabel,
                cancelText: cancel,
                success(res) {
                    if(res.confirm) {
                        resolve()
                    } else if (res.cancel) {
                        reject(new Error('点击了取消'))
                    }
                }
            })
        })
    }

    static info (msg: string, okLabel?: string) {
        return new Promise((resolve, reject) => {
          uni.showModal({
            title: '提示',
            content: msg,
            confirmText: okLabel || '确定',
            success (res) {
              if (res.confirm) {
                resolve()
              } else if (res.cancel) {
                reject(new Error('点击了取消'))
              }
            }
          })
        })
    }

    static hint(msg:string, okLabel?:string) {
        return new Promise((resolve, reject) => {
            uni.showModal({
                content: msg,
                showCancel: false,
                confirmText: okLabel || '确定',
                success (res) {
                  if (res.confirm) {
                    resolve()
                  } else if (res.cancel) {
                    reject(new Error('点击了取消'))
                  }
                }
            })
        })
    }

    static showLoading (loadText: string) {
        uni.showLoading({ title: loadText || '' })
      }
    
    static hideLoading () {
        uni.hideLoading()
    }

    static actionSheet (itemList: string[]): Promise<any> {
        return new Promise<any>((resolve, reject) => {
          uni.showActionSheet({
            itemList: itemList,
            success (res) {
              resolve(res.tapIndex)
            },
            fail (res) {
              reject(res.errMsg)
            }
          })
        })
    }

    static error (msg: string, title?: string) {
        return new Promise((resolve, reject) => {
          uni.showModal({
            title: title || '错误',
            content: msg,
            showCancel: false,
            success (res) {
              if (res.confirm) {
                resolve()
              } else if (res.cancel) {
                reject()
              }
            }
          })
        })
    }

    static warning (msg: string, okLabel?: string) {
        return new Promise((resolve, reject) => {
          uni.showModal({
            title: '警告',
            content: msg,
            confirmText: okLabel || '确定',
            success (res) {
              if (res.confirm) {
                resolve()
              } else if (res.cancel) {
                reject(new Error('点击了取消'))
              }
            }
          })
        })
    }
    
    
}