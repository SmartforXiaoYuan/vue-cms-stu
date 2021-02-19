import axios from 'axios'
import store from '@/store'
import { Message, MessageBox } from 'element-ui'
import { getToken } from '@/libs/auth'
const addErrorLog = (errorInfo) => {
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
  if (!responseURL.includes('save_error_logger'))
    store.dispatch('addErrorLog', info)
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

  interceptors(instance, url) {
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
        addErrorLog(errorInfo)
        return Promise.reject(error)
      }
    )
  }

  request(options) {
    const instance = axios.create()
    options = Object.assign(this.getInsideConfig(), options)
    this.interceptors(instance, options.url)
    return instance(options)
  }
}

export default HttpRequest
