<template>
  <MySpace>
    <h1>Grid(调整浏览器窗口大小)</h1>
    <MyGrid>
      <MyCard v-for="item in 10" :key="item">
        <div class="card-content">
          <h3>Card {{ item }}</h3>
        </div>
      </MyCard>
    </MyGrid>
    <h1>Flex</h1>
    <MyFlex>
      <MyCard v-for="item in 10" :key="item" style="width: 200px">
        <div class="card-content">
          <h3>Card {{ item }}</h3>
        </div>
      </MyCard>
    </MyFlex>
  </MySpace>
</template>

<script>
export default {
  name: 'GridExample',
  data() {
    return {};
  },
};
</script>

<style scoped lang="scss"></style>
