import axios from '@/libs/api.request'

// 获取路由
export const getMenu = () => {
  return axios.request({
    url: '/menu',
    method: 'get',
  })
}

// 获取某条菜单
export const getMenuById = (id) => {
  return axios.request({
    url: '/menu/' + id,
    method: 'get',
  })
}

export const delMenu = (ids) => {
  return axios.request({
    url: '/menu/' + ids,
    method: 'delete',
  })
}

export const addMenu = (info) => {
  return axios.request({
    url: '/menu',
    method: 'post',
    data: info,
  })
}

export const updateMenu = (info) => {
  return axios.request({
    url: '/menu',
    method: 'put',
    data: info,
  })
}
