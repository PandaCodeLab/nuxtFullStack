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
        console.log(valid)
        if (valid) {
          this.loading = true

          const post = {
            title: this.post.title,
            _id: this.post._id
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
