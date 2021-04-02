<template>
  <el-row :gutter="10" type="flex" justify="center">
    <el-col :xs="24" :sm="18" :md="12" :lg="10">
      <AppPost v-for="post in posts" :key="post._id" :post="post" />
    </el-col>
  </el-row>
</template>

<script>
import AppPost from '@/components/main/Post'

export default {
  async asyncData({ store }) {
    const posts = await store.dispatch('posts/fetch')
    return { posts }
  },
  head: {
    title: 'Главная'
  },
  components: {
    AppPost
  }
}
</script>

<style></style>
