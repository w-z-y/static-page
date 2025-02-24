<template>
  <div id="app" class="flex flex-align-start">
    <nav class="navbar">
      <ul class="nav-list">
        <template v-for="route in routes">
          <li v-if="route.meta" :key="route.name" class="nav-item">
            <router-link :to="route.path" class="nav-link" active-class="active-link">
              <div class="full-link">
                {{ route.meta.title }}
              </div>
            </router-link>
          </li>
        </template>
      </ul>
    </nav>
    <div class="flex-1" style="padding: 20px;">
      <router-view></router-view> <!-- 路由视图 -->
    </div>
  </div>
</template>

<script>
import routes from './router/routes'; // 引入路由
export default {
  name: 'App',
  data() {
    return {
      routes,
      query: {
        name: 'option1'
      }
    }
  }
}
</script>

<style>
nav {
  background-color: #333;
  /* 设置背景色为黑色 */
  padding: 15px;
  /* 增加内边距 */
  border-radius: 8px;
  /* 圆角 */
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  /* 添加阴影 */
}

.nav-list {
  list-style-type: none;
  padding: 0;
}

.nav-item {
  margin-bottom: 15px;
  /* 增加底部间距 */
}

.nav-link {
  text-decoration: none;
  /* 移除下划线 */
  color: #FFD700;
  /* 设置链接颜色为金色 */
  font-weight: bold;
  /* 加粗字体 */
  transition: color 0.3s;
  /* 添加过渡效果 */
  display: block;
  /* 使链接占满整行 */
}

.nav-link:hover {
  color: #FFA500;
  /* 悬停时改变颜色为橙色 */
}

.active-link {
  color: #FF4500;
  /* 设置激活链接颜色为橙红色 */
  font-weight: bold;
  /* 加粗激活链接字体 */
}

.full-link {
  width: 100%;
  /* 使内容占满整行 */
}
</style>