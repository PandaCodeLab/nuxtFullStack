export const state = () => ({
  token: true
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
  async createUser({ commit }, formData) {
    try {
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async login({ commit, dispatch }, formData) {
    try {
      const token = await new Promise((resolve, reject) => {
        setTimeout(() => {
          return resolve('mock-token')
        }, 1500)
      })

      dispatch('setToken', token)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
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
