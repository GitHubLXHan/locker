/*
路由器模块
 */


import Vue from 'vue'
import VueRouter from 'vue-router'




/*404页面路由导入*/
import NotFound from '../views/404'

/*主页面*/
import Home from '../views/Home/Home'

/*登录页面*/
import Login from  '../views/Login'

/*主页面路由导入*/
import Index from '../views/Index'

/*账号路由导入*/
import AccountManage from '../views/AccountManage/AccountManage'
import AddAccount from '../views/AccountManage/AddAccount'
import AccountTable from '../views/AccountManage/AccountTable'
import AccountForm from '../views/AccountManage/AccountForm'

/*角色路由导入*/
import RoleManage from '../views/RoleManage/RoleManage'
import RoleTable from '../views/RoleManage/RoleTable'
import RoleForm from '../views/RoleManage/RoleForm'
import AddRole from '../views/RoleManage/AddRole'

/*权限路由导入*/
import PermissionManage from '../views/PermissionManage/PermissionManage'
import PermissionTable from '../views/PermissionManage/PermissionTable'
import AddPermission from '../views/PermissionManage/AddPermission'
import PermissionForm from '../views/PermissionManage/PermissionForm'

/*用户路由导入*/
import UserManage from '../views/UserManage/UserManage'
import UserTable from '../views/UserManage/UserTable'
import UserForm from '../views/UserManage/UserForm'

/*订单路由导入*/
import OrderManage from '../views/OrderManage/OrderManage'
import OrderTable from '../views/OrderManage/OrderTable'
import OrderForm from '../views/OrderManage/OrderForm'

/*储物柜路由导入*/
import LockerManage from '../views/LockerManage/LockerManage'
import LockerTable from '../views/LockerManage/LockerTable'
import BigLockerTable from '../views/LockerManage/BigLockerTable'
import SmallLockerTable from '../views/LockerManage/SmallLockerTable'
import NowLockerTable from '../views/LockerManage/NowLockerTable'
import AddLocker from '../views/LockerManage/AddLocker'
import PutLocker from '../views/LockerManage/PutLocker'
import AddLockerType from '../views/LockerManage/AddLockerType'

import ChartShow from '../views/ChartShow'
import DataReport from '../views/DataReport'

/*转换路由导入*/
import RoleTransfer from '../views/RoleTransfer'
import store from "../vuex/store";

Vue.use(VueRouter)


var router = new VueRouter({
  // n个路由
  routes: [
    {
      path: '/',
      redirect: 'login'
    },
    {
      path: '/index',
      name: 'index',
      component: Index,
      meta: {
        requireLogin: true
      },
      children: [
        {
          path: '',
          redirect: '/index/home',
          meta: {
            requireLogin: true
          }
        },
        /*主页面路由*/
        {
          path: 'home',
          name: 'home',
          component: Home,
          meta: {
            requireLogin: true
          }
        },
        /*账号页面路由*/
        {
          path: 'accountManage',
          name: 'accountManage',
          component: AccountManage,
          meta: {
            requireLogin: true
          },
          children: [
            {
              path: '',
              redirect: '/index/accountManage/accountTable'
            },
            {
              path: 'accountTable',
              name: 'accountTable',
              component: AccountTable,
              meta: {
                requireLogin: true
              }
            },
            {
              path: 'accountForm',
              name: 'accountForm',
              component: AccountForm,
              meta: {
                requireLogin: true
              }
            }
            ,
            {
              path: 'roleTransfer',
              name: 'roleTransfer',
              component: RoleTransfer,
              meta: {
                requireLogin: true
              }
            },
            {
              path: 'addAccount',
              name: 'addAccount',
              component: AddAccount,
              meta: {
                requireLogin: true
              },
              children: [
                {
                  path: '',
                  redirect: 'accountForm',
                },
                {
                  path: 'accountForm',
                  name: 'accountForm',
                  component: AccountForm,
                  meta: {
                    requireLogin: true
                  }
                },
                {
                  path: 'roleTransfer',
                  name: 'roleTransferInAddCount',
                  component: RoleTransfer,
                  meta: {
                    requireLogin: true
                  }
                },
              ]
            },
          
          ]
        },
        /*************************/
        
        /*角色页面路由*/
        {
          path: 'roleManage',
          component: RoleManage,
          children: [
            {
              path: '',
              redirect: 'roleTable'
            },
            {
              path: 'roleTable',
              name: 'roleTable',
              component: RoleTable,
              meta: {
                requireLogin: true
              }
            },
            {
              path: 'roleForm',
              name: 'roleForm',
              component: RoleForm,
              meta: {
                requireLogin: true
              }
            },
            {
              path: 'addRole',
              name: 'addRole',
              component: AddRole,
              meta: {
                requireLogin: true
              },
              children: [
                {
                  path: '',
                  redirect: 'roleForm'
                },
                {
                  path: 'roleForm',
                  name: 'roleForm',
                  component: RoleForm,
                  meta: {
                    requireLogin: true
                  }
                },
                {
                  path: 'roleTransfer',
                  name: 'roleTransferInAddPermission',
                  component: RoleTransfer,
                  meta: {
                    requireLogin: true
                  }
                }
              ]
            },
          
          ]
        },
        /*************************/
        
        /*权限页面路由*/
        {
          path: 'permissionManage',
          component: PermissionManage,
          children: [
            {
              path: '',
              redirect: 'permissionTable'
            },
            {
              path: 'permissionTable',
              name: 'permissionTable',
              component: PermissionTable,
              meta: {
                requireLogin: true
              },
            },
            {
              path: 'permissionForm',
              name: 'permissionForm',
              component: PermissionForm,
              meta: {
                requireLogin: true
              },
            },
            {
              path: 'addPermission',
              name: 'addPermission',
              component: AddPermission,
              meta: {
                requireLogin: true
              },
              children: [
                {
                  path: '',
                  redirect: 'permissionForm'
                },
                {
                  path: 'permissionForm',
                  name: 'permissionForm',
                  component: PermissionForm,
                  meta: {
                    requireLogin: true
                  },
                },
                {
                  path: 'roleTransfer',
                  name: 'roleTransfer',
                  component: RoleTransfer,
                  meta: {
                    requireLogin: true
                  },
                }
              ]
            },
          
          ],
        },
        /*************************/
        
        /*用户页面路由*/
        {
          path: 'userManage',
          component: UserManage,
          children: [
            {
              path: '',
              redirect: 'userTable'
            },
            {
              path: 'userTable',
              name: 'userTable',
              component: UserTable,
              meta: {
                requireLogin: true
              },
            },
            {
              path: 'userForm',
              name: 'userForm',
              component: UserForm,
              meta: {
                requireLogin: true
              },
            }
          ]
        },
        /*************************/
        
        /*订单页面路由*/
        {
          path: 'orderManage',
          component: OrderManage,
          children: [
            {
              path: '',
              redirect: 'orderTable'
            },
            {
              path: 'orderTable',
              name: 'orderTable',
              component: OrderTable,
              meta: {
                requireLogin: true
              },
            },
            {
              path: 'orderForm',
              name: 'orderForm',
              component: OrderForm,
              meta: {
                requireLogin: true
              },
            }
          ]
        },
        /*************************/
        
        /*储物柜页面路由*/
        {
          path: 'lockerManage',
          name: 'lockerManage',
          component: LockerManage,
          meta: {
            requireLogin: true
          },
          children: [
            {
              path: '',
              redirect: 'lockerTable'
            },
            {
              path: 'lockerTable',
              name: 'lockerTable',
              component: LockerTable,
              meta: {
                requireLogin: true
              },

              children: [
                {
                  path: '',
                  redirect: 'bigLockerTable'
                },
                {
                  path: 'bigLockerTable',
                  name: 'bigLockerTable',
                  component: BigLockerTable,
                },
                {
                  path: 'smallLockerTable',
                  name: 'smallLockerTable',
                  component: SmallLockerTable,
                },
                {
                  path: 'nowLockerTable',
                  name: 'nowLockerTable',
                  component: NowLockerTable,
                },
                {
                  path: 'putLocker',
                  name: 'putLockerFromBigLocker',
                  component: PutLocker,
                  meta: {
                    requireLogin: true
                  },
                }
              ]
            },
            {
              path: 'addLocker',
              name: 'addLocker',
              component: AddLocker,
              meta: {
                requireLogin: true
              },
              children: [
                {
                  path: '',
                  redirect: 'putLocker'
                },
                {
                  path: 'putLocker',
                  name: 'putLocker',
                  component: PutLocker,
                  meta: {
                    requireLogin: true
                  },
                },
                {
                  path: 'addLockerType',
                  name: 'addLockerType',
                  component: AddLockerType,
                  meta: {
                    requireLogin: true
                  },
                }
              ]
            }
          ]
        },
        /*************************/
        
        /*图表展示页面路由*/
        {
          
          path: 'chartShow',
          name: 'chartShow',
          component: ChartShow,
          meta: {
            requireLogin: true
          },
        },
        /*********************/
        
        /*数据报表页面路由*/
        {
          path: 'dataReport',
          name: 'dataReport',
          component: DataReport,
          meta: {
            requireLogin: true
          },
        },
        /*************************/
      ],
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      mate: {
        requireLogin: false
      }
    },
    {
      path: '*',
      component: NotFound,
      meta: {
        requireLogin: false
      }
    },
  ]
})

// //router注册全局守卫
router.beforeEach((to, from, next) => {
  //  路由加载时读取sessionStorage里的状态信息
  if (sessionStorage.getItem("session")) {
    //页面刷新时将session中的数据赋值到vuex中userData状态
    store.dispatch("getUserDataFromSession", sessionStorage.getItem("session"))
  }
  if (store.state.loginStatus) {
    console.log('已登录')
    if (to.name === 'login') {
      console.log('已经登录了，请先退出')
      next(false)
      next('index')
    } else {
      next()
    }
  }else {
    console.log('未登录')
    if (to.name === 'login') {
      next()
    } else {
      next('/login')
    }
  }
})

export default router

