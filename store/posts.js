const posts = [
  {
    title: 'Post',
    views: 22,
    comments: [1, 2],
    _id: '1'
  },
  {
    title: 'Post 2',
    views: 22,
    comments: [1, 2],
    _id: '2'
  }
]

/* export const state = () => ({
  posts: []
})

export const mutations = {
  setPosts(state, posts) {
    state.posts = posts
  }
} */

export const actions = {
  async fetchAdmin({ commit }) {
    try {
      return await this.$axios.$get('/api/post/admin')
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async fetchAdminById({}, id) {
    try {
      return await this.$axios.$get(`/api/post/admin/${id}`)
    } catch (e) {
      commit('setError', e, { root: true })
      throw e
    }
  },

  async create({ commit }, { title, content, image }) {
    const maxPostId = Math.max.apply(
      Math,
      posts.map(function(o) {
        return o._id
      })
    )

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

    /*     const postIndex = posts.findIndex(p => p._id === post._id)
    posts[postIndex].title = post.title */
  }
}
