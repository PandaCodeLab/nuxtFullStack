<template>
  <el-card shadow="always" :style="{ width: '500px' }">
    <el-form
      :model="controls"
      :rules="rules"
      ref="form"
      @submit.native.prevent="submitHandler"
    >
      <h2>Войти в панель администратора</h2>

      <el-form-item label="Логин" prop="login">
        <el-input v-model.trim="controls.login"></el-input>
      </el-form-item>

      <el-form-item label="Пароль" prop="password" class="mb2">
        <el-input type="password" v-model.trim="controls.password"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button :loading="loading" type="primary" round native-type="submit"
          >Войти</el-button
        >
      </el-form-item>
    </el-form></el-card
  >
</template>

<script>
export default {
  head() {
    return { title: `Вход в админ панель | ${process.env.appName}` }
  },
  layout: 'empty',
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
  mounted() {
    const { message } = this.$route.query

    switch (message) {
      case 'login':
        this.$message.warning('Пожалуйста пройдите авторизацию')
        break
      case 'logout':
        this.$message.info('Вы вышли из системы')
        break
      case 'session':
        this.$message.warning('Сессия истекла. Пожалуйста авторизуйтесь.')
        break
    }
  },
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
            this.loading = false
            await this.$store.dispatch('auth/login', formData)
            this.$router.push('/admin')
            this.$message.success('Вы вошли в систему')
          } catch (e) {
            this.loading = false
            this.$message.error('Что то пошло не так')
          }
        }
      })
    }
  }
}
</script>
