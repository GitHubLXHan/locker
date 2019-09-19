/*
vuex核心管理模块
 */

import Vue from 'vue'
import Vuex from 'vuex'

//引入各个对象模块
import state from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

//注册vuex
Vue.use(Vuex)

export default new Vuex.Store({
  state,
  actions,
  getters,
  mutations
})

