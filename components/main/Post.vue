<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post__header">
      <h3>{{ post.title }}</h3>

      <small
        ><i class="el-icon-time"></i>
        {{ new Date(post.date).toLocaleString() }}
      </small>
    </header>
    <div class="post__body">
      <img :src="post.imageUrl" alt="" class="post__img" />
    </div>
    <footer class="post__footer">
      <el-button round type="primary" @click="openPost">Открыть</el-button>

      <span>
        <i class="el-icon-message">{{ post.views }}</i>
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  props: ['post'],
  methods: {
    openPost() {
      const id = this.post._id
      this.$router.push(`/post/${id}`)
    }
  }
}
</script>

<style lang="scss" scoped>
.post {
  margin-bottom: 1.5rem;
  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  &__footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
  }

  &__img {
    width: 100%;
    height: auto;
  }
}
</style>
