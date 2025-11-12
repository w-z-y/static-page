<template>
  <div class="my-json-schema-editor-form">
    <div v-for="(formData, index) in internalValue" :key="formData.id || index" class="form-item-wrapper">
      <div class="flex items-center overflow-hidden" style="gap: 8px">
        <template v-if="formData.type === 'object' || formData.type === 'array'">
          <jl-button
            @click="formData.collapsed = !formData.collapsed"
            :class="{ 'is-rotate': formData.collapsed }"
            class="collapse-arrow"
            text
            icon="el-icon-arrow-left">
          </jl-button>
        </template>
        <jl-form
          :gap="4"
          :disabled="disabled"
          style="width: max-content"
          :show-message="false"
          :show-label="false"
          :value="formData"
          :options="formList">
        </jl-form>
        <jl-icon.hover v-if="!disabled" @click="handleDeleteProperty(index)" icon="delete" :size="16"> </jl-icon.hover>
      </div>

      <template v-if="['object', 'array'].includes(formData.type)">
        <div v-show="!formData.collapsed" style="min-height: 34px">
          <div class="depth" v-if="formData.type === 'object' || formData.type === 'array'">
            <template v-if="formData.type === 'array'">
              <div class="flex items-center" style="gap: 8px; margin-bottom: 4px">
                <span style="font-size: 12px">成员类型</span>
                <jl-form.select
                  :disabled="disabled"
                  size="mini"
                  v-model="formData.itemsType"
                  :options="fieldTypeList"
                  style="width: 100px"
                  @change="handleUpdate">
                </jl-form.select>
              </div>
              <JlBusiness.JsonSchemaEditor.Form
                v-if="formData.itemsType === 'object'"
                :disabled="disabled"
                :level="level + 1"
                :value="formData.items"
                @change="(newVal) => handleChange(formData.items, newVal)"></JlBusiness.JsonSchemaEditor.Form>
            </template>

            <JlBusiness.JsonSchemaEditor.Form
              v-else
              :disabled="disabled"
              :level="level + 1"
              :value="formData.properties"
              @change="(newVal) => handleChange(formData, newVal)"></JlBusiness.JsonSchemaEditor.Form>
          </div>
        </div>
      </template>
    </div>

    <div v-if="!disabled" class="oneline">
      <jl-button ref="addPropertyBtn" text primary @click="handleAddProperty" style="padding: 10px 0"> 添加属性 </jl-button>
    </div>
  </div>
</template>

<script>
import createVue from '@jl/web-ui/src/createVue';
import { debounce } from '@jl/web-ui/src/util';
import { formList } from './config/form';
import typeList from './config/type';
import TYPE from './constant/type';

import JlButton from '@jl/web-ui/packages/base/Button';
import JlForm from '@jl/web-ui/packages/base/Form';
import JlFromSelect from '@jl/web-ui/packages/base/Form/select';
import JlIconHover from '@jl/web-ui/packages/base/Icon/hover/index.vue';

export default createVue({
  name: 'Business.JsonSchemaEditor.Form',
  model: true,
  defaultProps: true,
  props: {
    value: { type: Array, default: () => [] },
    disabled: { type: Boolean, default: false },
    level: { type: Number, default: 0 },
    typeVisibleFunction: { type: Function, default: () => [] },
  },
  components: {
    'jl-button': JlButton,
    'jl-form': JlForm,
    'jl-form.select': JlFromSelect,
    'jl-icon.hover': JlIconHover,
  },
  computed: {
    formList,
    fieldTypeList() {
      const visibleTypes = this.typeVisibleFunction(TYPE);
      if (visibleTypes && visibleTypes.length) {
        return typeList.filter((item) => {
          return visibleTypes.includes(item.value);
        });
      } else {
        return typeList;
      }
    },
  },
  data() {
    return {
      // 创建防抖的更新方法
      debouncedUpdate: debounce(this.handleUpdate, 300),
    };
  },
  beforeDestroy() {
    // 组件销毁前取消未执行的防抖函数
    this.debouncedUpdate.cancel();
  },
  methods: {
    // 统一处理更新
    handleUpdate() {
      // 深拷贝当前值，确保数据变化能被检测到
      const newValue = JSON.parse(JSON.stringify(this.internalValue));
      this.$emit('change', newValue);
    },
    handleChange(formData, val) {
      formData.properties = val;
      this.handleUpdate();
    },
    async handleAddProperty() {
      this.internalValue.push({
        id: `${Date.now()}_${Math.round(Math.random() * 100)}`,
        key: '',
        type: 'string',
        description: '',
        collapsed: false,
        required: [],
        properties: [],
        items: [],
        required: [],
      });
      // 添加属性后立即更新
      this.handleUpdate();
    },

    handleDeleteProperty(index) {
      this.internalValue.splice(index, 1);
      // 删除属性后立即更新
      this.handleUpdate();
    },
  },
});
</script>

<style lang="scss" scoped>
.horizontal-line {
  content: '';
  display: block;
  position: absolute;
  top: 17px;
  width: 25px;
  left: -35px;
  border-top: dashed 1px #84878c;
}
.vertical-line {
  content: '';
  display: block;
  position: absolute;
  top: -8px;
  bottom: 18px;
  left: -35px;
  border-left: dashed 1px #84878c;
}
/*





*/
.my-json-schema-editor-form {
  display: flex;
  flex-direction: column;
  gap: 4px;
  // 箭头
  .collapse-arrow {
    transition: transform 200ms;
    padding: 4px !important;
    margin-left: -4px;

    &.is-rotate {
      transform: rotate(-90deg);
    }
  }
  .form-item-wrapper {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }
  // 子级
  .depth {
    margin-left: 40px;
    position: relative;
    &::before {
      @extend .vertical-line;
    }
    ::v-deep .form-item-wrapper,
    .oneline {
      position: relative;
      &::before {
        @extend .horizontal-line;
      }
    }
  }
}
</style>
