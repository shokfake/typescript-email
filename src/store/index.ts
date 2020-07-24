import Vue from 'vue'
import Vuex from 'vuex'
import { SystemModule } from './SystemModule'
import UserModule from './UserModule'

Vue.use(Vuex)

const store = new Vuex.Store({})
export const systemModule = new SystemModule({store, name: 'system'})
export const userModule = new UserModule({store, name: 'user'})
export default store