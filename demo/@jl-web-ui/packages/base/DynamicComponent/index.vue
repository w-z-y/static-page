<template>
  <div class="jl-dynamic-component-wrapper">
    <component v-if="getComponentType()" :is="getComponentType()" v-bind="getComponentProps()" v-on="getComponentEvents()" style="width: 100%">
      <template v-for="(slotFn, slotName) in option.slots" #[slotName]>
        <component :is="{ render: (h) => slotFn(h) }" />
      </template>
    </component>
    <div v-else class="jl-dynamic-component-error">
      {{ getComponentError() }}
    </div>
  </div>
</template>
<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { COMPONENT_MAP, BASE_PROPS } from './config';
import { toKebabCase } from '@jl/web-ui/src/util';
import { getPlaceholder } from '@jl/web-ui/src/util/placeholder';
export default {
  name: COM_PREFIX + 'DynamicComponent',
  props: {
    option: {
      type: Object,
      default: () => ({}),
    },
    data: {
      type: [Object, Array],
      default: () => ({}),
    },
  },
  computed: {
    optionType() {
      return toKebabCase(this.option.type || '');
    },
  },
  methods: {
    getProps(option) {
      return {
        ...(option.attrs || {}),
        ...(option.props || {}),
      };
    },
    // 获取组件类型
    getComponentType() {
      const comp = ((this.optionType && COMPONENT_MAP[this.optionType]) || {}).component || this.option.component
      return comp;
    },
    // 获取组件属性
    getComponentProps() {
      const defaultProps = {
        placeholder: getPlaceholder(this.option),
        // function | boolean | number | string
        disabled: this.option.disabled,
      };
      const props = {
        ...this.$attrs,
        ...defaultProps,
        ...BASE_PROPS,
        ...(COMPONENT_MAP[this.optionType]?.props || {}),
        ...this.getProps(this.option),
      };
      return props;
    },
    // 获取组件事件
    getComponentEvents() {
      const events = {};
      // 处理 events 和 listeners 对象
      ['events', 'listeners'].forEach((key) => {
        if (this.option[key]) {
          Object.keys(this.option[key]).forEach((eventName) => {
            events[eventName] = (...args) => {
              this.option[key][eventName](...args, this.data, this.option.value);
            };
          });
        }
      });
      return {
        ...this.$listeners,
        ...events,
      };
    },
    // 处理 type 不匹配
    getComponentError() {
      if (!this.optionType) return '需要配置[type]属性,或使用插槽';
      return `需要配置type=[${this.optionType}]映射组件,或使用插槽`;
    },
  },
};
</script>
<style lang="scss" scoped>
/* width: 100%; */
.jl-dynamic-component-error {
  color: var(--jl-danger);
  font-size: 12px;
  line-height: 28px;
  cursor: not-allowed;
  user-select: none;
}
</style>
