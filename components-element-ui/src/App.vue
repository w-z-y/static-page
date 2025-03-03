<template>
  <div id="app" class="flex flex-column">
    <header class="flex flex-justify-between flex-align-center">
      <h1>MyComponents</h1>
    </header>
    <div class="flex flex-1 overflow-hidden">
      <el-menu :default-active="$route.name" background-color="#333" text-color="#FFD700" active-text-color="#FF4500"
        unique-opened style="padding-top:10px">
        <template v-for="route in routes">
          <router-link :to="route.path" :key="route.name" class="nav-link"
            style="color: inherit;text-decoration: none;">
            <el-menu-item v-if="route.meta" :index="route.name" :route="route.path" class="flex flex-align-center">
              <i class="el-icon-menu" style="color: inherit"></i> <!-- 这里可以替换为具体的图标 -->
              {{ route.meta.title }}
            </el-menu-item>
          </router-link>
        </template>
      </el-menu>
      <div class="view-container flex-1" style="padding: 20px;">
        <router-view></router-view> <!-- 路由视图 -->
      </div>
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
#app {
  background-color: #fff;
  font-family: Arial, sans-serif;
  color: #333;
  height: 100vh;
  overflow: hidden;

  header {
    padding: 10px;
    background-color: #333;
    color: #FFD700;
    box-shadow: 0 0 10px #000;
    z-index: 1;
  }

  .el-menu {
    border: none;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.5);
  }
  .view-container{
    overflow: auto;
  }
}
</style>