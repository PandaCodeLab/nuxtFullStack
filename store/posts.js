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
