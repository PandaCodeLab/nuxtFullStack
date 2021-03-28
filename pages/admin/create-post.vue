<template>
  <div>
    <h1 class="mb1">Создание поста</h1>

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

      <el-form-item>
        <el-button type="success" plain @click="previewDialog = true"
          >Предпросмотр</el-button
        >

        <el-button :loading="loading" type="primary" round native-type="submit"
          >Создать пост</el-button
        >
      </el-form-item>
    </el-form>

    <el-dialog title="Предросмотр" :visible.sync="previewDialog">
      <vue-markdown :source="post.content"></vue-markdown>
    </el-dialog>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data: () => ({
    post: {
      title: '',
      content: ''
    },
    previewDialog: false,
    loading: false,
    rules: {
      title: [
        {
          required: true,
          message: 'Поле не должно быть пустым',
          trigger: 'blur'
        }
      ],
      content: [
        {
          required: true,
          message: 'Поле не должно быть пустым',
          trigger: 'blur'
        }
      ]
    }
  }),
  methods: {
    submitHandler() {
      this.$refs['form'].validate(async valid => {
        if (valid) {
          this.loading = true

          const formData = {
            title: this.post.title,
            content: this.post.content
          }

          try {
            await this.$store.dispatch('posts/create', formData)
            this.post.title = ''
            this.post.content = ''
            this.$message.success('Пост был успешно создан')
          } catch (e) {
            this.$message.error('Ошибка при создании поста')
            throw e
          } finally {
            this.loading = false
          }
        }
      })
    }
  }
}
</script>
