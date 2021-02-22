import axios from '@/libs/api.request'

// 查询列表
export const listUser = (params = {}) => {
  return axios.request({
    url: '/user',
    method: 'get',
    params: params,
  })
}

// 查询某一个
export const getUser = (id) => {
  return axios.request({
    url: '/user/' + id,
    method: 'get',
  })
}
// 删除
export const delUser = (ids) => {
  return axios.request({
    url: '/user/' + ids,
    method: 'delete',
  })
}

// 添加
export const addUser = (info) => {
  return axios.request({
    url: '/user',
    method: 'post',
    data: info
  })
}

// 修改
export const updateUser = (info) => {
  return axios.request({
    url: '/user/' + info.id,
    method: 'put',
    data: info
  })
}
