<template>
  <div>
    <h1>Аналитика по постам</h1>
    <AppAnalyticsChart
      title="Количество просмотров"
      :labels="views.labels"
      :data="views.data"
    />

    <AppAnalyticsChart
      title="Количество комментариев"
      :labels="comments.labels"
      :data="comments.data"
    />
  </div>
</template>

<script>
import AppAnalyticsChart from '@/components/admin/AnalyticsChart'

export default {
  layout: 'admin',
  middleware: ['admin-auth'],
  async asyncData({ store }) {
    const { views, comments } = await store.dispatch('posts/getAnalytics')
    return { views, comments }
  },
  components: {
    AppAnalyticsChart
  },
  mounted() {
    console.log(this.comments)
  }
}
</script>

<style lang="scss" scoped></style>
