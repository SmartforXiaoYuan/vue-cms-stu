import { _login, _logout } from '@/api/login'
import { getToken, setToken, removeToken } from '@/libs/auth'
import { Message } from 'element-ui'
import { getInfo } from '@/api/system/user'

const user = {
  state: {
    token: getToken(),
    frontUserInfo: null,
    userInfo: null,
    roles: [],
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
    },
    SET_ROLES(state, payload) {
      state.roles = payload
    },
  },

  actions: {
    // 登录
    Login({ commit }, params) {
      return new Promise((resolve, reject) => {
        _login(params)
          .then((res) => {
            if (res.data.code === 200014) {
              Message({
                type: 'error',
                message: res.msg,
              })
            } else {
              setToken(res.data.token)
              commit('SET_TOKEN', res.data.token)
            }
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 获取角色权限信息
    getUserRoles({ commit }) {
      return new Promise((resolve, reject) => {
        try {
          let roles = ['Permission', 'PageAdmin']
          commit('SET_ROLES', roles)
          resolve(roles)
        } catch (err) {
          reject(err)
        }
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo()
          .then((res) => {
            console.log('获取用户信息')
            console.log(res)
            const userInfo = res.data
            commit('SET_USERINFO', userInfo)
            resolve(res)
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 退出系统
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        _logout()
          .then(() => {
            commit('SET_TOKEN', '')
            commit('SET_USERINFO', null)
            removeToken()
            resolve()
          })
          .catch((error) => {
            reject(error)
          })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise((resolve) => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    },
  },
}

export default user
