<template>
  <el-table :data="posts" style="width: 100%">
    <el-table-column label="Название" width="180">
      <template slot-scope="{ row: { title } }">
        <span style="margin-left: 10px">{{ title }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Дата" width="220">
      <template slot-scope="{ row: { date } }">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ date | date }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Просмотры" width="180">
      <template slot-scope="{ row: { views } }">
        <i class="el-icon-view"></i>
        <span style="margin-left: 10px">{{ views }}</span>
      </template>
    </el-table-column>
    <el-table-column label="Комментарии" width="180">
      <template slot-scope="{ row: { comments } }">
        <i class="el-icon-message"></i>
        <span style="margin-left: 10px">{{ comments.length }}</span>
      </template>
    </el-table-column>

    <el-table-column label="">
      <template slot-scope="{ row }">
        <el-tooltip
          class="item"
          effect="dark"
          content="Редактировать"
          placement="top"
        >
          <el-button size="mini" type="primary" plain @click="open(row._id)"
            ><i class="el-icon-edit"></i>
          </el-button>
        </el-tooltip>

        <el-tooltip
          class="item"
          effect="dark"
          content="Удалить"
          placement="top"
        >
          <el-button size="mini" type="danger" @click="remove(row._id)"
            ><i class="el-icon-delete"></i>
          </el-button>
        </el-tooltip>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  head() {
    return { title: `Все посты | ${process.env.appName}` }
  },
  layout: 'admin',
  middleware: ['admin-auth'],
  data: () => ({
    loading: true
  }),
  async asyncData({ store }) {
    const posts = await store.dispatch('posts/fetchAdmin')
    return { posts }
  },
  methods: {
    open(id) {
      this.$router.push(`/admin/post/${id}`)
    },
    remove(id) {
      this.$confirm('Это действие удалит пост. Продолжить?', 'Предупреждение', {
        confirmButtonText: 'Удалить',
        cancelButtonText: 'Отмена',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: 'Пост удален'
          })
          this.$store.dispatch('posts/remove', id)
          this.posts = this.posts.filter(post => post._id !== id)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: 'Удаление отменено'
          })
        })
    }
  }
}
</script>
