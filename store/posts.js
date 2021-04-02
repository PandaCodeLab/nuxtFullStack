export const actions = {
  async getAnalytics({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin/get/analytics')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetch({ commit }) {
    try {
      return await this.$axios.$get('/api/post')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchAdmin({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchAdminById({ commit }, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async create({ commit }, { title, content, image }) {
    try {
      const fd = new FormData()

      fd.append('title', title)
      fd.append('content', content)
      fd.append('image', image)

      return await this.$axios.$post('/api/post/admin', fd)
    } catch (e) {
      commit('setError', e, { root: true })
    }
  },

  async remove({ commit }, id) {
    try {
      return await this.$axios.$delete(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async update({ commit }, { _id, title, content }) {
    try {
      return await this.$axios.$put(`/api/post/admin/${_id}`, {
        title,
        content
      })
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async addView({ commit }, post) {
    try {
      return await this.$axios.$put(`/api/post/add/view/${post._id}`, post)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  }
}
