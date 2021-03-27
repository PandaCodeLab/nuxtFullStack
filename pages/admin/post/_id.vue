<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item to="/admin/posts">Таблица постов</el-breadcrumb-item>
      <el-breadcrumb-item>{{ $route.params.id }}</el-breadcrumb-item>
    </el-breadcrumb>
    <h1>Post {{ $route.params.id }}</h1>
  </div>
</template>

<script>
export default {
  layout: 'admin',
  middleware: 'admin-auth'
}
</script>
