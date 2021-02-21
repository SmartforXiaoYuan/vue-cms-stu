import axios from '@/libs/api.request'

// 查询角色
export const getRole = (params = {}) => {
  return axios.request({
    url: '/role',
    method: 'get',
    params: params,
  })
}

// 查询某一个
export const getRoleById = (id) => {
  return axios.request({
    url: '/role/' + id,
    method: 'get',
  })
}
// 删除
export const delRole = (ids) => {
  return axios.request({
    url: '/role/' + ids,
    method: 'delete',
  })
}

// 添加
export const addRole = (info) => {
  return axios.request({
    url: '/role',
    method: 'post',
    data: info
  })
}

// 修改
export const updateRole = (info) => {
  return axios.request({
    url: '/role/' + info.id,
    method: 'put',
    data: info
  })
}

// 修改角色状态
export const updateRoleStatus = (params = {}) => {
  return axios.request({
    url: '/system/role/changeRoleStatus',
    method: 'put',
    data: params
  })
}

// 更新角色状态
export const changeRoleStatus = (id, params = {}) => {
  return axios.request({
    url: `/system/role/${id}/updateStatus`,
    method: 'put',
    data: params
  })
}

