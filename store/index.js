export const state = () => ({
  error: null
})

export const mutations = {
  setError(state, error) {
    state.error = error
    throw error
  },
  clearError(state) {
    state.error = null
  }
}

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch('auth/autologin')
  }
}

export const getters = {
  error: state => state.error
}
