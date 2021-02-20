import axios from '@/libs/api.request'

// 查询列表
export const listType = (params = {}) => {
  return axios.request({
    url: '/dictType',
    method: 'get',
    params: params,
  })
}

// 查询某一个
export const getType = (id) => {
  return axios.request({
    url: '/dictType/' + id,
    method: 'get',
  })
}

// 删除
export const delType = (ids) => {
  return axios.request({
    url: '/dictType/' + ids,
    method: 'delete',
  })
}
// 添加
export const addType = (info) => {
  return axios.request({
    url: '/dictType',
    method: 'post',
    data: info,
  })
}

// 修改
export const updateType = (info) => {
  return axios.request({
    url: '/dictType/' + info.id,
    method: 'put',
    data: info,
  })
}
