import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/libs/auth'
const addErrorLog = (error) => {
  let errorInfo = error.response
  if (!errorInfo) {
    const {
      request: { statusText, status },
      config,
    } = JSON.parse(JSON.stringify(error))
    errorInfo = {
      statusText,
      status,
      request: { responseURL: config.url },
    }
  }
  const {
    statusText,
    status,
    request: { responseURL },
  } = errorInfo
  const info = {
    type: 'ajax',
    code: status,
    mes: statusText,
    url: responseURL,
  }
  errorState(error)
  // if (!responseURL.includes('save_error_logger'))
  // store.dispatch('addErrorLog', info)
}

// 封装数据返回失败提示函数
function errorState(error) {
  let offset = 1
  let message = ''
  switch (error.response.status) {
    case 400:
      for (const key in error.response.data.error) {
        message = error.response.data.error[key].message || '参数错误'
        Message({
          type: 'error',
          offset: 40 * offset,
          message,
        })
        offset++
      }
      break
    case 401:
      message = 'token失效'
      MessageBox.confirm(
        '登录状态已过期，您可以继续留在该页面，或者重新登录',
        '系统提示',
        {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          type: 'warning',
        }
      ).then(() => {
        store.dispatch('LogOut').then(() => {
          location.reload() // 为了重新实例化vue-router对象 避免bug
        })
      })
      break
    case 403:
      message = '拒绝访问'
      Message({
        type: 'error',
        message,
      })
      break
    case 500:
      message = error.response.data.message || '服务器异常'
      Message({
        type: 'error',
        message,
      })
      break
    default:
      Message({
        type: 'error',
        message: '服务器异常',
      })
      message = '服务器异常'
  }
}

class HttpRequest {
  constructor(baseUrl = baseURL) {
    this.baseUrl = baseUrl
    this.queue = {}
  }
  getInsideConfig() {
    const config = {
      baseURL: this.baseUrl,
      mode: 'cors',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      data: {},
      // transformRequest: [function (data) {
      //   //在向服务器发送前，修改请求数据 对 data 进行任意转换处理
      //   // if(isArrayFn(data))data = objForText(data);
      //   // else if(typeof(data)=='object')data = objForText(data);
      //   return JSON.stringify(data);
      // }],
    }
    return config
  }

  destroy(url) {
    delete this.queue[url]
    if (!Object.keys(this.queue).length) {
      // Spin.hide()
    }
  }

  interceptors(instance, url, params = {}) {
    // 请求拦截
    instance.interceptors.request.use(
      (config) => {
        // 添加全局的loading...
        if (!Object.keys(this.queue).length) {
          // Spin.show() // 不建议开启，因为界面不友好
        }
        //除登录外，添加token
        if (config.url.indexOf('Authentication/login') == -1)
          config.headers.Authorization = 'Bearer ' + getToken()
        console.log(params)
        if (config.method === 'GET' || config.method === 'DELETE') {
          config.params = params
        }

        this.queue[url] = true
        return config
      },
      (error) => {
        return Promise.reject(error)
      }
    )
    // 响应拦截
    instance.interceptors.response.use(
      (res) => {
        this.destroy(url)
        // const { data, status } = res
        // return { data, status }
        const { data, status } = res
        return data
      },
      (error) => {
        this.destroy(url)
        addErrorLog(error)
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url, options.params)
    return instance(options)
  }
}

export default HttpRequest
