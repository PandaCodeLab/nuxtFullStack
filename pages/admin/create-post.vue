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

    <el-upload
      ref="upload"
      class="mb"
      drag
      :on-exceed="uploadLimit"
      :limit="1"
      :multiple="false"
      :thumbnail-mode="true"
      :on-change="handleImageChange"
      :auto-upload="false"
      action="https://jsonplaceholder.typicode.com/posts/"
    >
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        Перетащите картинку или <em>нажмите</em>
      </div>
      <div class="el-upload__tip" slot="tip">
        Файлы с расширением jpg/png
      </div>
    </el-upload>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  data: () => ({
    post: {
      title: '',
      content: '',
      image: null
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
    uploadLimit() {
      this.$message.error('Нельзя загружать более одного изображения')
    },
    handleImageChange(file) {
      console.log(file)
      this.post.image = file.raw
    },
    submitHandler() {
      this.$refs['form'].validate(async valid => {
        if (valid && this.post.image) {
          this.loading = true

          const formData = {
            title: this.post.title,
            content: this.post.content,
            image: this.post.image
          }

          try {
            await this.$store.dispatch('posts/create', formData)
            this.post.title = ''
            this.post.content = ''
            this.post.image = null
            this.$refs.upload.clearFiles()
            this.$message.success('Пост был успешно создан')
          } catch (e) {
            this.$message.error('Ошибка при создании поста')
            throw e
          } finally {
            this.loading = false
          }
        } else {
          this.$message.warning('Форма не валидна')
        }
      })
    }
  }
}
</script>
