export const actions = {
  async fetchAdmin({}) {
    return await new Promise(resolve => {
      setTimeout(() => {
        return resolve([
          {
            title: 'Post',
            views: 22,
            comments: [1, 2],
            _id: Math.random()
          },
          {
            title: 'Post 2',
            views: 22,
            comments: [1, 2],
            _id: Math.random()
          }
        ])
      }, 1500)
    })
  },
  async remove({ store }, postId) {
    console.log(postId)
  }
}
