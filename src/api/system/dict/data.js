import axios from '@/libs/api.request'

// 查询字典数据列表
export const listData = (params = {}) => {
  return axios.request({
    url: '/dictData',
    method: 'get',
    params: params,
  })
}

// 查询字典数据详细
export const getDataById = (id) => {
  return axios.request({
    url: '/dictData/' + id,
    method: 'get',
  })
}
// 根据字典类型查询字典数据信息
export const getDicts = (dictType) => {
  return axios.request({
    url: '/system/showByType/' + dictType,
    method: 'get',
  })
}

// 新增字典数据
export const addData = (info) => {
  return axios.request({
    url: '/dictData',
    method: 'post',
    data: info,
  })
}
// 修改字典数据
export const updateData = (info) => {
  return axios.request({
    url: '/dictData/' + info.id,
    method: 'put',
    data: info,
  })
}

// 删除字典数据
export const delData = (ids) => {
  return axios.request({
    url: '/dictData/' + ids,
    method: 'delete',
  })
}
