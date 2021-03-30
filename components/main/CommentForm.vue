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
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.loading = true

          const formData = {
            name: this.controls.name,
            text: this.controls.text,
            postId: ''
          }

          try {
            setTimeout(() => {
              this.loading = false
              this.$emit('created')
              this.$message.success('Комментарий добавлен')
            }, 1500)
          } catch (e) {}
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped></style>
