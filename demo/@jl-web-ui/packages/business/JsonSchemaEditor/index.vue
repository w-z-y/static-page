<template>
  <div class="flex-col overflow-hidden" style="gap: 10px">
    <jl-json-editor v-if="showJsonEditor" style="height: 200px" v-model="json" :disabled="disabled"> </jl-json-editor>

    <JsonSchemaEditorForm
      ref="jsonSchemaEditorFormRef"
      :disabled="disabled"
      :type-visible-function="typeVisibleFunction"
      class="flex-1 overflow-auto"
      :value="jsonArray"
      @change="handleChangeData" />
  </div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import JlJsonEditor from '@jl/web-ui/packages/base/JsonEditor';
import JsonSchemaEditorForm from './form';
import TYPE from './constant/type';

export default createVue({
  name: 'Business.JsonSchemaEditor',
  model: true,
  components: { JlJsonEditor, JsonSchemaEditorForm },
  props: {
    disabled: { type: Boolean, default: false },
    typeVisibleFunction: { type: Function, default: () => [] },
    showJsonEditor: { type: Boolean, default: false },
  },
  data() {
    return {
      isRefreshing: true, // 操作时，避免更新(导致数组的排序更新)
      json: {
        properties: {},
        required: [],
      },
      jsonArray: [], // 不能用计算属性实现，因为我们要直接修改这个数组，用计算属性的话必须修改其依赖
    };
  },
  watch: {
    internalValue: {
      async handler() {
        if (!this.isRefreshing) return;
        await this.$nextTick();
        // 在这里进行 `immediate` 初始化的
        this.init();
      },
      immediate: true,
    },
  },
  methods: {
    init() {
      if (!this.internalValue) return;
      this.json = JSON.parse(this.internalValue);
      this.jsonArray = this.convertSchemaToArray(JSON.parse(this.internalValue));
    },
    async handleChangeData(data) {
      this.isRefreshing = false;
      this.json = this.convertArrayToSchema(data);
      this.internalValue = JSON.stringify(this.json);
      await this.$nextTick();
      this.isRefreshing = true;
    },
    // json => array
    convertSchemaToArray(schema) {
      if (!schema || typeof schema !== TYPE.OBJECT) return [];
      const result = [];
      const properties = schema.properties || {};
      const requiredFields = schema.required || [];

      for (const key in properties) {
        const property = properties[key];

        const item = {
          key,
          type: property.type,
          description: property.description,
          collapsed: false,
          itemsCollapsed: false,
          required: requiredFields.includes(key) ? [1] : [],
          properties: property.properties ? this.convertSchemaToArray(property) : [],

          items: property.items ? this.convertSchemaToArray(property.items) : [],
          itemsType: property.items?.type,
        };
        result.push(item);
      }

      return result;
    },
    // array => json
    convertArrayToSchema(array) {
      if (!Array.isArray(array)) return { properties: {}, required: [] };
      const properties = {};
      const required = [];
      array.forEach((item) => {
        const property = {
          type: item.type,
          description: item.description,
        };
        // 一级：对象
        if (item.type === TYPE.OBJECT && Array.isArray(item.properties)) {
          const subSchema = this.convertArrayToSchema(item.properties);
          property.properties = subSchema.properties;
          property.required = subSchema.required;
        }
        // 一级：数组
        if (item.type === TYPE.ARRAY && item.items) {
          property.items = {
            type: item.itemsType,
            // 子项：对象
            ...(item.itemsType === TYPE.OBJECT ? this.convertArrayToSchema(item.items) : {}),
          };
        }
        // key判空
        if (item.key.trim()) {
          properties[item.key.trim()] = property;
          if (item.required && item.required.includes(1)) {
            required.push(item.key);
          }
        }
      });

      return { properties, required };
    },
  },
});
</script>

<style lang="scss" scoped>
.flex {
  display: flex;
  gap: 16px;

  > * {
    flex: 1;
    min-width: 0; // 防止内容溢出
  }
}
</style>
