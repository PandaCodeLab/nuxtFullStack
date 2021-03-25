export const state = () => ({
  token: ''
})

export const mutations = {
  setToken(state, token) {
    console.log(token)
    state.token = token
  },
  clearToken(state) {
    state.token = null
  }
}

export const actions = {
  async login({ commit, dispatch }, formData) {
    try {
      const token = await new Promise(resolve => {
        setTimeout(() => {
          return resolve('mock-token')
        }, 1500)
      })

      dispatch('setToken', token)
    } catch (e) {
      throw new Error(e)
    }
  },
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  logout({ commit }) {
    commit('clearToken')
  }
}

export const getters = {
  isLogged: state => !!state.token,
  getToken: state => state.token
}
