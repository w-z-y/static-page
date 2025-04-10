<template>
  <div class="app-container">
    <div class="menu-button" @click="showMenu = !showMenu" v-if="isMobile">
      <span></span>
      <span></span>
      <span></span>
    </div>
    <div class="sidebar" :class="{ 'sidebar-mobile': isMobile, 'show': showMenu }">
      <ul class="menu">
        <li
          v-for="item in menuItems"
          :key="item.component"
          :class="{ active: currentComponent === item.component }"
          @click="handleMenuClick(item.component)"
        >
          {{ item.title }}
        </li>
      </ul>
    </div>
    <div class="content" :class="{ 'content-mobile': isMobile }">
      <template v-if="currentComponent === 'Button'">
        <Space wrap>
          <Button>按钮</Button>
          <Button type="primary">按钮</Button>
          <Button type="success">按钮</Button>
          <Button type="warning">按钮</Button>
          <Button type="danger">按钮</Button>
          <Button type="dark" round>按钮</Button>
        </Space>
      </template>
      <template v-else-if="currentComponent === 'Calendar'">
        <Calendar />
      </template>
      <template v-else-if="currentComponent === 'Space'">
        <Space wrap>
          <Button v-for="i in 20" :key="i">Button</Button>
        </Space>
      </template>
      <template v-else-if="currentComponent === 'Swiper'">
        <Space wrap>
          <Swiper
            :items="items2"
            :controls="['arrows', 'dots']"
            autoPlay
          ></Swiper>
          <Swiper :items="items" :controls="['arrows', 'dots']" autoPlay>
            <template #default="{ item, index }">
              <div
                :style="{ background: item.src }"
                style="
                  width: 100%;
                  height: 100%;
                  color: #fff;
                  font-size: 100px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                {{ index }}
              </div>
            </template>
          </Swiper>
          <Swiper vertical :items="items">
            <template #default="{ item, index }">
              <div
                :style="{ background: item.src }"
                style="
                  width: 100%;
                  height: 100%;
                  color: #fff;
                  font-size: 100px;
                  display: flex;
                  justify-content: center;
                  align-items: center;
                "
              >
                {{ index }}
              </div>
            </template>
          </Swiper>
        </Space>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from "vue";
import Calendar from "./components/Calendar/index.vue";
import Button from "./components/Button/index.vue";
import Space from "./components/Space/index.vue";
import Swiper from "./components/Swiper/index.vue";

const menuItems = [
  {
    title: "按钮(Button)",
    component: "Button",
  },
  {
    title: "日历(Calendar)",
    component: "Calendar",
  },
  {
    title: "间距(Space)",
    component: "Space",
  },
  {
    title: "轮播图(Swiper)",
    component: "Swiper",
  },
];

const items = [
  { src: "linear-gradient(45deg, #ff6b6b, #ffc0cb)", alt: "图片1" },
  { src: "linear-gradient(45deg, #4facfe, #00f2fe)", alt: "图片2" },
  { src: "linear-gradient(45deg, #43e97b, #38f9d7)", alt: "图片3" },
];
const items2 = [1, 2, 3];

const isMobile = ref(false);
const showMenu = ref(false);

// 检测是否为移动设备
const checkMobile = () => {
  isMobile.value = window.innerWidth <= 768;
};

// 处理菜单点击
const handleMenuClick = (component) => {
  currentComponent.value = component;
  if (isMobile.value) {
    showMenu.value = false;
  }
};

// 从URL hash中获取初始组件
const getInitialComponent = () => {
  const hash = window.location.hash.slice(1);
  return (
    menuItems.find((item) => item.component === hash)?.component || "Button"
  );
};

const currentComponent = ref(getInitialComponent());

// 监听组件变化,更新URL hash
watch(currentComponent, (newComponent) => {
  window.location.hash = newComponent;
});

// 监听URL hash变化,更新当前组件
onMounted(() => {
  checkMobile();
  window.addEventListener("resize", checkMobile);
  window.addEventListener("hashchange", () => {
    const hash = window.location.hash.slice(1);
    if (menuItems.find((item) => item.component === hash)) {
      currentComponent.value = hash;
    }
  });
});
</script>

<style scoped lang="scss">
.app-container {
  display: flex;
  height: 100vh;
  background: #ffffff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
    "Helvetica Neue", Arial, sans-serif;
  position: relative;
}

.menu-button {
  display: none;
  position: fixed;
  top: 16px;
  left: 30px;
  z-index: 1000;
  width: 30px;
  height: 24px;
  cursor: pointer;
  
  span {
    display: block;
    width: 100%;
    height: 3px;
    background-color: #1890ff;
    margin: 5px 0;
    transition: 0.3s;
  }
}

.sidebar {
  width: 240px;
  background: #fafafa;
  border-right: 1px solid #f0f0f0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.3s ease;
  
  &.sidebar-mobile {
    position: fixed;
    left: -240px;
    top: 0;
    bottom: 0;
    z-index: 999;
    
    &.show {
      left: 0;
    }
  }
}

.menu {
  list-style: none;
  padding: 50px 0 16px;
  margin: 0;
}

.menu li {
  padding: 14px 24px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  font-size: 14px;
  color: #595959;
  border-left: 3px solid transparent;

  &:hover {
    background: #f0f5ff;
    color: #1890ff;
  }

  &.active {
    background: #e6f7ff;
    color: #1890ff;
    border-left-color: #1890ff;
    font-weight: 500;
  }
}

.content {
  flex: 1;
  overflow: auto;
  padding: 24px 32px;
  background: #fff;

  &.content-mobile {
    padding: 60px 16px 16px;
  }

  &::-webkit-scrollbar {
    width: 6px;
    height: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #d9d9d9;
    border-radius: 3px;
  }

  &::-webkit-scrollbar-track {
    background: #f5f5f5;
  }
}

@media screen and (max-width: 768px) {
  .menu-button {
    display: block;
  }
  
  .content {
    width: 100%;
  }
}
</style>
