<!-- Start of Selection -->
<template>
  <div id="app" style="display: flex; align-items: flex-start;">
    <nav style="margin-right: 20px;">
      <ul>
        <template v-for="route in routes">
          <li v-if="route.meta" :key="route.name">
            <router-link :to="route.path">
              {{ route.meta.title }}
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
    <router-view></router-view> <!-- 路由视图 -->
  </div>
</template>

<script>
import routes from './router/routes'; // 引入路由
export default {
  name: 'App',
  data() {
    return {
      routes
    }
  }
}
</script>

<style>
nav {
  /* 移除底部边距 */
}

nav ul {
  list-style-type: none;
  padding: 0;
}

nav li {
  display: block; /* 改为块级显示以适应左右布局 */
  margin-bottom: 10px; /* 增加底部间距 */
}
</style>
<!-- End of Selection -->