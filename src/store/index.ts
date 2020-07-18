import Vue from 'vue'
import Vuex from 'vuex'
import { SystemModule } from './SystemModule'

Vue.use(Vuex)

const store = new Vuex.Store({})
export const systemModule = new SystemModule({store, name: 'system'})

export default store