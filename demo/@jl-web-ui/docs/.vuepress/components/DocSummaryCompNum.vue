<template>
  <div class="summary-wrapper">
    <jl-tag color="#8d65c5" plain size="medium" class="summary-tag" @click="handleRouterPush('ai')">
      🤖 AI组件: <span class="count">{{ componentsMap.ai.length }}</span>
    </jl-tag>
    <jl-tag plain size="medium" class="summary-tag" @click="handleRouterPush('base')">
      ⚛️ 基础组件: <span class="count">{{ componentsMap.base.length }}</span>
    </jl-tag>
    <jl-tag warning plain size="medium" class="summary-tag" @click="handleRouterPush('business')">
      <span>🧩 业务组件:</span> <span class="count">{{ componentsMap.business.length }}</span>
    </jl-tag>
  </div>
</template>

<script>
const sidebarConfig = require('../../router/sidebar.js');
export default {
  name: 'DocSummaryCompNum',
  computed: {
    componentsMap() {
      const comps = sidebarConfig['/views/components/'];
      // 去除控制台输出，代码更整洁
      const grouped = { base: [], business: [], ai: [] };
      comps.forEach((item) => {
        if (item.key === 'base') grouped.base = grouped.base.concat(item.children || []);
        else if (item.key === 'business') grouped.business = grouped.business.concat(item.children || []);
        else if (item.key === 'ai') grouped.ai = grouped.ai.concat(item.children || []);
      });
      return grouped;
    },
  },
  methods: {
    handleRouterPush(type) {
      let path = '/views/components/' + this.componentsMap[type]?.[0]?.path + '.html';
      this.$router.push(path);
    },
  },
};
</script>

<style scoped lang="scss">
.summary-wrapper {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin: 32px 0;
  justify-content: flex-start;
  align-items: stretch;
  ::v-deep .summary-tag {
    display: flex;
    cursor: pointer;
    align-items: center;
    font-size: 18px;
    padding: 0.75em 1.6em;
    border-radius: 999px;
    box-shadow: 0 2px 12px 0 #eee6e9;
    font-weight: 500;
    display: flex;
    align-items: center;
    letter-spacing: 2px;

    .count {
      font-size: 22px;
      font-weight: 700;
      color: #4d3185;
      margin-left: 6px;
    }
  }
}
</style>
