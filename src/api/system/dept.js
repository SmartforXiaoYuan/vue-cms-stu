import axios from '@/libs/api.request'

// 查询列表
export const getDept = (params = {}) => {
  return axios.request({
    url: '/department',
    method: 'get',
    params: params,
  })
}

// 查询某一个
export const getDeptById = (id) => {
  return axios.request({
    url: '/department/' + id,
    method: 'get',
  })
}
// 删除
export const delDept = (ids) => {
  return axios.request({
    url: '/department/' + ids,
    method: 'delete',
  })
}

// 添加
export const addDept = (info) => {
  return axios.request({
    url: '/department',
    method: 'post',
    data: info
  })
}

// 修改
export const updateDept = (info) => {
  return axios.request({
    url: '/department/' + info.id,
    method: 'put',
    data: info
  })
}

