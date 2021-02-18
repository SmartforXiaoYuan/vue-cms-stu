import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'login',
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
    path: '/user',
    component: (resolve) => require(['@/views/layout'], resolve),
    hidden: false,
    children: [
      {
        path: 'profile',
        component: (resolve) => require(['@/views/system/user/index'], resolve),
        name: 'Profile',
        meta: { title: '个人中心', icon: 'user', menuType: 'C' }
      }
    ]
  },
  {
    path: '/error',
    component: () => import('../views/layout'),
    name: 'Error',
    redirect: '/error/404',
    children: [
      {
        path: '404',
        name: 'Page404',
        component: () => import('@/views/error-page'),
        meta: { title: '404', icon: 'el-icon-s-release' }
      }
    ]
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
  routes,
})

export default router
