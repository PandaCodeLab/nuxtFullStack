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
      const { user } = this.$axios.$post('/api/auth/admin/create', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },
  async login({ commit, dispatch }, formData) {
    try {
      const { token } = this.$axios.$post('/api/auth/admin/login', formData)

      console.log(`token: ${token}`)

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
