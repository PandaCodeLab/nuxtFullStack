<template>
  <el-card shadow="hover" :body-style="{ padding: 0 }" class="post">
    <header slot="header" class="post__header">
      <h3>Post Title</h3>

      <small
        ><i class="el-icon-time"></i>
        {{ new Date().toLocaleString() }}
      </small>
    </header>
    <div class="post__body">
      <img
        src="https://bipbap.ru/wp-content/uploads/2017/10/0_8eb56_842bba74_XL-640x400.jpg"
        alt=""
        class="post__img"
      />
    </div>
    <footer class="post__footer">
      <el-button round type="primary" @click="openPost">Primary</el-button>

      <span>
        <i class="el-icon-message">12</i>
      </span>
    </footer>
  </el-card>
</template>

<script>
export default {
  methods: {
    openPost() {
      const id = '1'
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
