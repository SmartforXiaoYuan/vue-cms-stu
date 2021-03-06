import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import { httpResponse } from './libs/httpResponse'

import Pagination from '@/components/Pagination'
import {
  resetForm,
  handleTree,
  selectDictLabel,
  dateFormatter,
} from '@/libs/base'

import permission from '@/directive'

import '@/styles/index.scss' // 全局自定义样式入口

import '@/static/icons'

// import './static/styles/markdown.scss' // 引入代码高亮的css

//解决路由跳转报错问题 详情https://blog.csdn.net/weixin_47084275/article/details/108205775
import Router from 'vue-router'
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch((err) => err)
}

Vue.prototype.resetForm = resetForm // 重置表单
Vue.prototype.selectDictLabel = selectDictLabel
Vue.prototype.dateFormatter = dateFormatter // 格式日期
Vue.prototype.handleTree = handleTree
Vue.prototype.$httpResponse = httpResponse
Vue.use(ElementUI)

Vue.use(permission)

let statusOptions = [
  {
    dictLabel: '正常',
    dictValue: '1',
  },
  {
    dictLabel: '停用',
    dictValue: '0',
  },
]
Vue.prototype.$statusOptions = statusOptions

Vue.config.productionTip = false

// 全局组件挂载
Vue.component('Pagination', Pagination)

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app')
