import router from './router'
import store from './store'
import { Message } from 'element-ui'
import NProgress from 'nprogress' // progress bar
import 'nprogress/nprogress.css'// progress bar style
import { getToken } from '@/utils/auth' // getToken from cookie

NProgress.configure({ showSpinner: false })// NProgress Configuration

// permission judge function
function hasPermission(roles, permissionRoles) {
  if (roles.indexOf('admin') >= 0) return true // admin permission passed directly
  if (!permissionRoles) return true
  return roles.some(role => permissionRoles.indexOf(role) >= 0)
}

function showMap(to) {
  if (to.meta.map) {
    store.dispatch("controlMap", to.meta.map);
  } else store.dispatch("controlMap", 'close');
}

const whiteList = ["*",'/login'] // * 代表全部免登录

const doRouter = function(to, next){
  //是否免登录
  if(whiteList.indexOf("*")!==-1 && store.state.permission.routers.length == 0){
    store.commit('SET_ALL_ROUTERS');
    const addRouters = store.getters.addRouters;
    if (addRouters.length > 0 && addRouters[0].path){
      router.addRoutes(addRouters) // 动态添加可访问路由表
    }            
  }

  if (getToken()) {    // determine if there has token
    /* has token*/
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done() 
    } else {
      if (store.getters.roles.length === 0) { // 判断当前用户是否已拉取完user_info信息
        store.dispatch('GetUserInfo').then(res => { // 拉取user_info
          const roles = res.data.result.roles // note: roles must be a array! such as: ['editor','develop']
          store.dispatch('GenerateRoutes', { roles }).then(() => { // 根据roles权限生成可访问的路由表
            const addRouters = store.getters.addRouters;
            if (addRouters.length > 0 && addRouters[0].path)
              router.addRoutes(addRouters) // 动态添加可访问路由表
            showMap(to);
            next({ ...to, replace: true }) // hack方法 确保addRoutes已完成 
          })
        }).catch((err) => {
          if (err.code != '2018020801')   //code 为 2018020801 则不自动登出，由客户选择退出
            store.dispatch('FedLogOut').then(() => {
              Message.error(err.message)
              next({ path: '/' })
            })
        })
      } else {
        // 没有动态改变权限的需求可直接next() 删除下方权限判断 ↓
        if (hasPermission(store.getters.roles, to.meta.roles)) {
          showMap(to);
          next()
        } else {
          next({ path: '/401', replace: true, query: { noGoBack: true } })
        }
        // 可删 ↑
      }
    }
  } else {
    if (whiteList.indexOf("*")!==-1  || whiteList.indexOf(to.path) !== -1) { 
      // 在免登录白名单，直接进入
        showMap(to);
        next()
        NProgress.done()
    } else {
      next(`/login?redirect=${to.path}`) // 否则全部重定向到登录页
      NProgress.done()
    }
  }
}

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  if(store.getters.query !== true){
    store.dispatch('getServicePublicKey').then(() => {
      doRouter(to,next)
    }).catch((e) => {
      NProgress.done() 
      console.info(e)
      Message.error(e)
    })
  } else doRouter(to,next);
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
