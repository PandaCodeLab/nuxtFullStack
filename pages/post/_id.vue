<template>
  <article class="post">
    <header class="post__header">
      <div class="post__title">
        <h1>{{ post.title }}</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post__info">
        <small
          ><i class="el-icon-time"></i>
          {{ post.date | date }}
        </small>
        <small
          ><i class="el-icon-message" style="padding-right: 5px"></i
          >{{ post.views }}</small
        >
      </div>
      <div class="post__img">
        <img :src="post.imageUrl" alt="" />
      </div>
    </header>
    <main class="post__content">
      <vue-markdown>{{ post.content }}</vue-markdown>
    </main>
    <footer>
      <AppCommentForm v-if="canAddComment" @created="createCommentHandler" />

      <div class="post__comments" v-if="post.comments.length">
        <AppComment
          v-for="comment in post.comments"
          :key="comment._id"
          :comment="comment"
        />
      </div>
      <div class="post__comments text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
  head() {
    return { title: `${this.post.title} | ${process.env.appName}` }
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('posts/fetchById', params.id)
    await store.dispatch('posts/addView', post)
    return {
      post: {
        ...post,
        views: ++post.views
      }
    }
  },
  validate({ params }) {
    return !!params.id
  },
  data: () => ({
    canAddComment: true
  }),
  methods: {
    createCommentHandler(newComment) {
      this.post.comments.unshift(newComment)
      this.canAddComment = false
    }
  },
  components: {
    AppComment,
    AppCommentForm
  }
}
</script>

<style lang="scss" scoped>
.post {
  max-width: 600px;
  margin: 0 auto;

  &__title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 1rem;
    align-items: center;
  }

  &__info {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.5rem;
    align-items: center;
  }

  &__img img {
    width: 100%;
    height: auto;
  }

  &__header {
    margin-bottom: 1.5rem;
  }

  &__content {
    margin-bottom: 2rem;
  }
}
</style>
