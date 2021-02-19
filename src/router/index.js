import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/libs/auth'
import store from '@/store'

Vue.use(VueRouter)
//解决编程式路由往同一地址跳转时会报错的情况
const originalPush = VueRouter.prototype.push
const originalReplace = VueRouter.prototype.replace
//push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch((err) => err)
}
//replace
VueRouter.prototype.replace = function push(location, onResolve, onReject) {
  if (onResolve || onReject)
    return originalReplace.call(this, location, onResolve, onReject)
  return originalReplace.call(this, location).catch((err) => err)
}

export const currencyRoutes = [
  {
    path: '/login',
    name: 'login',
    hidden: true,
    meta: {
      title: 'Login - 登录',
      hideInMenu: true,
      key: 'default',
      icon: '',
    },
    component: () => import('@/views/login'),
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ '../views/About.vue'),
  },
  {
    path: '/layout/home',
    name: 'layout',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import('../views/layout'),
  },

  {
    path: '/system',
    name: 'System',
    component: () => import('../views/layout'),
    // redirect: '/system',
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: () => import('@/views/system/menu'),
        meta: {
          title: '菜单管理',
          icon: 'el-icon-menu',
        },
      },
      {
        path: 'role',
        name: 'Role',
        component: () => import('@/views/system/role'),
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-custom',
        },
      },
      {
        path: 'user',
        component: (resolve) => require(['@/views/system/user'], resolve),
        hidden: false,
        children: [
          {
            path: 'profile',
            component: (resolve) =>
              require(['@/views/system/user/index'], resolve),
            name: 'Profile',
            meta: { title: '个人中心', icon: 'user', menuType: 'C' },
          },
        ],
      },
    ],
  },
  {
    path: '/error',
    component: () => import('../views/layout'),
    name: 'Error',
    // redirect: '/error/404',
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/error-page'),
        meta: { title: '404', icon: 'el-icon-s-release' },
      },
    ],
  },
]

/* async routers */
export const asyncRoutes = [
  // {
  //   path: '/',
  //   name: 'Home',
  //   component: Layout,
  //   redirect: '/dashbord',
  //   children: [
  //     {
  //       path: 'dashbord',
  //       name: 'Dashbord',
  //       component: () => import('@/views/dashboard'),
  //       meta: {
  //         title: '首页',
  //         icon: 'el-icon-s-data'
  //       }
  //     }
  //   ]
  // },
]

const router = new VueRouter({
  routes: currencyRoutes,
})

// 刷新页面处理逻辑
router.beforeEach(async (to, from, next) => {
  if (to.path === '/login') {
    next()
  } else {
    if (getToken()) {
      let hasRoles = store.getters.roles.length > 0
      if (hasRoles) {
        next()
      } else {
        try {
          const roles = await store.dispatch('getUserRoles')
          const addRoutes = await store.dispatch(
            'permission/getAsyncRoutes',
            roles
          )
          console.log(addRoutes)
          router.addRoutes(addRoutes)
          next({
            ...to,
            replace: true,
          })
        } catch (err) {
          throw err
        }
      }
      next()
    } else {
      next({
        path: '/login',
      })
    }
  }
})

export default router
