<template>
  <el-form
    :model="controls"
    :rules="rules"
    ref="form"
    @submit.native.prevent="submitHandler"
  >
    <h2>Создать пользователя</h2>

    <el-form-item label="Логин" prop="login">
      <el-input v-model.trim="controls.login"></el-input>
    </el-form-item>

    <el-form-item label="Пароль" prop="password" class="mb2">
      <el-input type="password" v-model.trim="controls.password"></el-input>
    </el-form-item>

    <el-form-item>
      <el-button :loading="loading" type="primary" round native-type="submit"
        >Создать</el-button
      >
    </el-form-item>
  </el-form>
</template>

<script>
export default {
  head() {
    return { title: `Создать пользователя | ${process.env.appName}` }
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  data: () => ({
    loading: false,
    controls: {
      login: '',
      password: ''
    },
    rules: {
      login: [
        {
          required: true,
          message: 'Введите ваше имя',
          trigger: 'blur'
        }
      ],
      password: [
        {
          required: true,
          message: 'Введите пароль',
          trigger: 'blur'
        },
        {
          min: 6,
          message: 'Пароль должен быть не менее 6 символов',
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
            login: this.controls.login,
            password: this.controls.password
          }

          try {
            await this.$store.dispatch('auth/createUser', formData)
            this.$message.success('Пользователь успешно создан')
            this.controls.login = ''
            this.controls.password = ''
            this.loading = false
          } catch (e) {
            this.loading = false
            this.$store.commit('setError', e, { root: true })
          }
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  max-width: 600px;
}
</style>
