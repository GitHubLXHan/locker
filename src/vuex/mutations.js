/*
包含多个直接更新状态的方法的对象模块
 */

//引入常量
import {LOGIN_SUCCESS, GET_USER_DATA_FROM_SESSION, LOGOUT_SUCCESS} from './mutation-types'

export default {
  
  //登录成功mutation
  [LOGIN_SUCCESS](state, {data}) {
    state.userData = data
    state.loginStatus = 1
  },
  //从session中获取的信息赋值到userData状态
  [GET_USER_DATA_FROM_SESSION] (state, {data}) {
    let d = data.split(',')
    state.userData = d
    state.loginStatus = 1
  },
  [LOGOUT_SUCCESS] (state) {
    state.userData = {}
    state.loginStatus = 0
  }
}