<template>
  <div>
    <h1>Welcome to Admin Page</h1>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: ['admin-auth']
}
</script>

<style lang="scss" scoped></style>
