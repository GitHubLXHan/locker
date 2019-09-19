/*
包含多个用于间接更新状态的方法的对象模块
 */



//引入mutation常量
import {LOGIN_SUCCESS, GET_USER_DATA_FROM_SESSION, LOGOUT_SUCCESS} from './mutation-types'


export default {
  //登录成功action
  loginAction ({commit}, data) {
    commit(LOGIN_SUCCESS, {data})
  },
  //从sessionStorage中获取用户信息
  getUserDataFromSession({commit}, data) {
    commit(GET_USER_DATA_FROM_SESSION, {data})
  },
  //注销成功action
  logoutAction ({commit}) {
    commit(LOGOUT_SUCCESS)
  },
  
}