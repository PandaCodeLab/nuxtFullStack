export const actions = {
  async create({}, formData) {
    try {
      return await this.$axios.$post('/api/comment', formData)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
