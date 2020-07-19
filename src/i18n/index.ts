import VueI18n from 'vue-i18n'
import Vue from 'vue'
import * as en_US from './locale/en_us'
import * as zh_CN from './locale/zh_cn'
import * as zh_TW from './locale/zh_tw'
Vue.use(VueI18n)

const messages = {
  en_US,
  zh_CN,
  zh_TW
}

const i18n:VueI18n = new VueI18n({
  locale: 'zh_CN',
  messages,
  fallbackLocale: 'zh_CN' // 默认语言设置
})

export default i18n 
