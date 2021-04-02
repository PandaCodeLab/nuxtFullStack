<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="submitHandler"
  >
    <h1>Добавить комментарий</h1>

    <el-form-item label="Ваше имя" prop="name">
      <el-input v-model.trim="controls.name"></el-input>
    </el-form-item>

    <el-form-item label="Текст комментария" prop="text">
      <el-input
        type="textarea"
        resize="none"
        :rows="5"
        v-model.trim="controls.text"
      ></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loading" type="primary" round native-type="submit"
        >Добавить комментарий</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    controls: {
      name: '',
      text: ''
    },
    rules: {
      name: [
        {
          required: true,
          message: 'Введите ваше имя',
          trigger: 'blur'
        }
      ],
      text: [
        {
          required: true,
          message: 'Введите текст',
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
            name: this.controls.name,
            text: this.controls.text,
            postId: this.$route.params.id
          }

          try {
            const comment = await this.$store.dispatch(
              'comment/create',
              formData
            )
            this.$emit('created', comment)
            this.controls.name = ''
            this.controls.text = ''
            this.loading = false
          } catch (e) {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
