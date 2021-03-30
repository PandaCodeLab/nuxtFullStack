<template>
  <article class="post">
    <header class="post__header">
      <div class="post__title">
        <h1>Post title</h1>
        <nuxt-link to="/">
          <i class="el-icon-back"></i>
        </nuxt-link>
      </div>
      <div class="post__info">
        <small
          ><i class="el-icon-time"></i>
          {{ new Date().toLocaleString() }}
        </small>
        <small></small>
      </div>
      <div class="post__img">
        <img
          src="https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg"
          alt=""
        />
      </div>
    </header>
    <main class="post__content">
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi
        ipsa voluptas odit laudantium temporibus repellat quas incidunt tempore!
        Sequi quos assumenda deserunt debitis repellat soluta sunt aliquid dolor
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi
        ipsa voluptas odit laudantium temporibus repellat quas incidunt tempore!
        Sequi quos assumenda deserunt debitis repellat soluta sunt aliquid dolor
        consectetur.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Atque sequi
        ipsa voluptas odit laudantium temporibus repellat quas incidunt tempore!
        Sequi quos assumenda deserunt debitis repellat soluta sunt aliquid dolor
        consectetur.
      </p>
    </main>
    <footer>
      <AppCommentForm v-if="canAddComment" @created="createCommentHandler" />

      <div class="post__comments" v-if="true">
        <AppComment v-for="comment in 3" :key="comment" :comment="comment" />
      </div>
      <div class="post__comments text-center" v-else>Комментариев нет</div>
    </footer>
  </article>
</template>

<script>
import AppComment from '@/components/main/Comment'
import AppCommentForm from '@/components/main/CommentForm'

export default {
  validate({ params }) {
    return !!params.id
  },
  data: () => ({
    canAddComment: true
  }),
  methods: {
    createCommentHandler() {
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
