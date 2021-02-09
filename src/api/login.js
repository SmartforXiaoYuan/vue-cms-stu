import axios from '@/libs/api.request'

// 登录
export const _login = (info) => {
  return axios.request({
    url: 'login',
    method: 'post',
    data: info,
  })
}
// 登出
export const _logout = (info) => {
  return axios.request({
    url: 'logout',
    method: 'post',
    data: info,
  })
}

// 验证码
export const _getCodeImg = () => {
  return axios.request({
    url: 'captcha',
    method: 'get',
  })
}
