<template>
  <div>
    <div class="post" v-if="post">
      <el-breadcrumb class="mb1" separator-class="el-icon-arrow-right">
        <el-breadcrumb-item to="/admin/posts"
          >Таблица постов</el-breadcrumb-item
        >
        <el-breadcrumb-item>{{ post.title }}</el-breadcrumb-item>
      </el-breadcrumb>
      <h1>{{ post.title }}</h1>

      <el-form
        :model="post"
        :rules="rules"
        ref="form"
        @submit.native.prevent="submitHandler"
      >
        <el-form-item label="Название поста" prop="title">
          <el-input v-model="post.title"></el-input>
        </el-form-item>

        <el-form-item label="Контент поста" prop="content">
          <el-input type="textarea" :rows="5" v-model="post.content"></el-input>
        </el-form-item>

        <div class="mb1">
          <small class="mr">
            <i class="el-icon-time"></i>
            <span>
              {{ new Date(post.date).toLocaleString() }}
            </span>
          </small>

          <small>
            <i class="el-icon-view"></i>
            <span>{{ post.views }}</span>
          </small>
        </div>

        <el-form-item>
          <el-button
            :loading="loading"
            type="primary"
            round
            native-type="submit"
            >Изменить пост</el-button
          >
        </el-form-item>
      </el-form>
    </div>
    <div v-else>Поста не существует</div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin-auth',
  mounted() {
    console.log(this.post)
  },
  data: () => ({
    loading: false,
    rules: {
      title: [
        {
          required: true,
          message: 'Поле не должно быть пустым',
          trigger: 'blur'
        }
      ]
    }
  }),
  validate({ params }) {
    return !!params.id
  },
  async asyncData({ store, params }) {
    const post = await store.dispatch('posts/fetchAdminById', params.id)
    return { post }
  },
  methods: {
    submitHandler() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          this.loading = true

          const post = {
            _id: this.post._id,
            title: this.post.title,
            content: this.post.content
          }

          try {
            await this.$store.dispatch('posts/update', post)
            this.loading = false
            this.$message.success('Пост изменен')
          } catch (e) {
            throw e
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.mr {
  margin-right: 10px;
}
</style>
