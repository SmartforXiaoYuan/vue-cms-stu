import Vue from 'vue'
import VueRouter from 'vue-router'
import { getToken } from '@/libs/auth'
import store from '@/store'

Vue.use(VueRouter)

/**
 * 路由相关属性说明
 * hidden: 当设置hidden为true时，意思不在sideBars侧边栏中显示
 * mete{
 *  title: xxx,  设置sideBars侧边栏名称
 *  icon: xxx,  设置ideBars侧边栏图标
 *  noCache: true  当设置为true时不缓存该路由页面
 * }
 */

/* common routers */
export const currencyRoutes = [
  {
    path: '/',
    name: 'login',
    redirect: '/login',
    hidden: true,
  },
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
    component: (resolve) => require(['../views/layout'], resolve),
    meta: {
      title: '系统管理',
      icon: 'el-icon-s-tools',
    },
    children: [
      {
        path: 'menu',
        name: 'Menu',
        component: (resolve) => require(['@/views/system/menu'], resolve),
        meta: {
          title: '菜单管理',
          icon: 'el-icon-menu', //'el-icon-menu',
        },
      },
      {
        path: 'dict',
        name: 'Dict',
        // component: () => import('@/views/system/role'),
        component: (resolve) => require(['@/views/system/dict'], resolve),
        meta: {
          title: '字典管理',
          icon: 'el-icon-document',
        },
      },
      {
        path: 'dept',
        name: 'Dept',
        // component: () => import('@/views/system/role'),
        component: (resolve) => require(['@/views/system/dept'], resolve),
        meta: {
          title: '部门管理',
          icon: 'el-icon-office-building',
        },
      },
      {
        path: 'role',
        name: 'Role',
        // component: () => import('@/views/system/role'),
        component: (resolve) => require(['@/views/system/role'], resolve),
        meta: {
          title: '角色管理',
          icon: 'el-icon-s-check',
        },
      },
      {
        path: 'user',
        name: 'User',
        component: (resolve) => require(['@/views/system/user'], resolve),
        // children: [
        //   {
        //     path: 'profile',
        //     component: (resolve) =>
        //       require(['@/views/system/user/index'], resolve),
        //     name: 'Profile',
        //     meta: { title: '个人中心', icon: 'user', menuType: 'C' },
        //   },
        // ],
        meta: {
          title: '用户管理',
          icon: 'el-icon-user',
        },
      },
    ],
  },
  {
    path: '/dict',
    component: (resolve) => require(['@/views/layout'], resolve),
    hidden: true,
    children: [
      {
        path: 'type/data/:id(\\d+)',
        component: (resolve) => require(['@/views/system/dict/data'], resolve),
        name: 'Data',
        meta: { title: '字典数据', icon: '', menuType: 'C' },
      },
    ],
  },
  {
    path: '/error',
    // component: () => import('../views/layout'),
    component: (resolve) => require(['../views/layout'], resolve),
    name: 'Error',
    children: [
      {
        path: '404',
        name: 'Page404',
        // component: () => import('@/views/error-page'),
        component: (resolve) => require(['@/views/error-page'], resolve),
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
          if (!store.getters.userInfo) {
            store.dispatch('GetInfo').then((res) => {
              console.log(res)
            })
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
          }
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
