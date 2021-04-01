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

export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        return resolve(posts)
      }, 1500)
    })
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

      await new Promise(resolve => {
        setTimeout(() => {
          resolve()
        }, 1000)
      })
    } catch (e) {
      commit('setError', e, { root: true })
    }

    /* await new Promise(resolve => {
      setTimeout(() => {
        posts.push({
          title,
          content,
          views: 0,
          comments: [],
          _id: (maxPostId + 1).toString()
        })
        resolve()
      }, 1000)
    }) */
  },

  async remove({ store }, postId) {},

  async update({}, post) {
    const postIndex = posts.findIndex(p => p._id === post._id)
    posts[postIndex].title = post.title
  },

  async fetchAdminById({}, id) {
    return await new Promise(resolve => {
      setTimeout(() => {
        return resolve(posts.find(p => p._id === id))
      }, 1500)
    })
  }
}
