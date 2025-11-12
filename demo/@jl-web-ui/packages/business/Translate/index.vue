<template>
  <div class="jl-business-translate">
    <slot />
  </div>
</template>

<script>
// createVue
import createVue from '@jl/web-ui/src/createVue';
// api
import { translateApi } from '@jl/web-ui/src/api/translate';
// util
import { storageGet, arrayDiff } from '@jl/web-ui/src/util';
// constant
import SETTING_CUSTOM_EVENT from '../../../src/constant/setting';

export default createVue({
  name: 'Business.Translate',
  provide() {
    return {
      translationAPI: {
        // props
        translateSwitch: () => this.translateSwitch,
        translationsMap: this.translationsMap,
        // event
        addKeyValue: this.addTranslationKeyValue,
        deleteKey: this.deleteTranslationKey,
        addItem: this.addTranslationItem,
      },
    };
  },
  data() {
    return {
      moduleInfo: {},
      translationsMap: {},
      translationItems: [],
    };
  },
  computed: {
    translationsKeys() {
      return Object.keys(this.translationsMap);
    },
    translateSwitch() {
      return this.moduleInfo?.translateEnabled === '1';
    },
  },
  watch: {
    translationsKeys: {
      deep: true,
      handler(newVal, oldVal) {
        this.init({ sourceTextList: arrayDiff(newVal, oldVal) });
      },
    },
  },
  methods: {
    async init({ lang, sourceTextList = this.translationsKeys } = {}) {
      if (!sourceTextList.length || !this.translateSwitch) return;
      const res = await translateApi({ lang, sourceTextList });
      if (res?.data) {
        this.translationItems.forEach((item) => (item.loading = false));
        Object.entries(res.data).forEach(([key, val]) => {
          this.$set(this.translationsMap, key, { ...val, isInit: true });
        });
        this.translationItems.forEach((item) => (item.initialValue = item.internalValue));
        await this.$nextTick();
        this.$emit('translate-end');
        // 默认只会读取第一级子组件，触发表格的doLayout
        Array.from(this.$children).map((child) => {
          child.doLayout?.();
        });
      }
    },
    async translate() {
      await this.$nextTick();
      this.init({
        sourceTextList: this.translationItems.map((item) => {
          item.loading = true;
          return item.internalValue;
        }),
      });
    },
    addTranslationKeyValue(key, value = {}) {
      this.$set(this.translationsMap, key, value);
    },
    deleteTranslationKey(key) {
      this.$delete(this.translationsMap, key);
    },
    addTranslationItem(item) {
      this.translationItems.push(item);
    },
  },
  created() {
    this.moduleInfo = storageGet('moduleInfo')
    console.log('this.moduleInfo', this.moduleInfo);
    window.addEventListener(SETTING_CUSTOM_EVENT.CHANGE_LANGUAGE, this.translate);
  },
  beforeDestroy() {
    window.removeEventListener(SETTING_CUSTOM_EVENT.CHANGE_LANGUAGE, this.translate);
  },
});
</script>

<style scoped lang="scss">
.jl-business-translate {
}
</style>
