<template>
  <div class="error__layout">
    <div class="error__content">
      <h1 class="error__title">Ошибка 404</h1>
      <nuxt-link to="/" class="nuxt-link">
        <i class="el-icon-back">Вернуться на главную</i>
      </nuxt-link>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error {
  &__layout {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  &__content {
    text-align: center;
    font-size: 1.5rem;
  }
  &__title {
    margin-bottom: 1rem;
    font-size: 2rem;
    color: rgb(219, 39, 39);
  }
}

.nuxt-link i:before {
  margin-right: 5px;
}
</style>
