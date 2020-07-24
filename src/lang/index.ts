import VueI18n from 'vue-i18n'
import Vue from 'vue'
import { en_US } from './locale/en_us'
import { zh_CN } from './locale/zh_cn'
import { zh_TW } from './locale/zh_tw'
Vue.use(VueI18n)

export const getLocal = ():string => {
   // TODO
   return 'zh_CN'
}

const messages = {
  en_US,
  zh_CN,
  zh_TW
}

const i18n = new VueI18n({
  locale: getLocal(),
  messages,
  fallbackLocale: getLocal() // 默认语言设置
})

const translate = (key:string) => {
  if(!key) {
    return ''
  }
  return i18n.t(key)
}

export { i18n , translate }
