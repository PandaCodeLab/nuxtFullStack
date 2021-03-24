<template>
  <el-menu
    :default-active="$route.path"
    router
    class="el-menu"
    :style="{ height: '100%' }"
  >
    <el-menu-item
      v-for="(item, index) in menuItems"
      :key="index"
      :index="'/admin' + item.url"
    >
      <i :class="item.icon"></i>
      <span>
        {{ item.name }}
      </span>
    </el-menu-item>
  </el-menu>
</template>

<script>
export default {
  data: () => ({
    menuItems: [
      {
        name: 'Аналитика',
        url: '',
        icon: 'el-icon-menu'
      },
      {
        name: 'Создать пост',
        url: '/create-post',
        icon: 'el-icon-edit'
      },
      {
        name: 'Таблица постов',
        url: '/posts',
        icon: 'el-icon-tickets'
      },
      {
        name: 'Пользователи',
        url: '/users',
        icon: 'el-icon-setting'
      },
      {
        name: 'Выйти',
        url: '/logout',
        icon: 'el-icon-close'
      }
    ]
  })
}
</script>
