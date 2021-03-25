<template>
  <div>
    <h1>Welcome to Admin Page</h1>
    <div>{{ getToken }}</div>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  computed: {
    isLogged() {
      return this.$store.getters['auth/isLogged']
    },
    getToken() {
      return this.$store.getters['auth/getToken']
    }
  }
}
</script>

<style lang="scss" scoped></style>
