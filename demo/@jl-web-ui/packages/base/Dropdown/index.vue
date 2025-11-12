<template>
  <el-dropdown
    class="jl-dropdown"
    ref="dropdownRef"
    v-bind="$attrs"
    :size="size"
    :show-timeout="0"
    :hide-timeout="isContextMenu ? 0 : 100"
    :trigger="internalTrigger"
    :placement="isContextMenu ? 'bottom-start' : placement"
    @command="handleCommand"
    @click="handleClick"
    @visible-change="handleVisibleChange">
    <div class="h-full" @contextmenu="handleContextMenu" @click="handleClickArea">
      <slot :label="showLabel" :visible="showPopper"></slot>
    </div>
    <el-dropdown-menu
      :class="[popperClass, { 'is-root': isRoot, 'is-context-menu': isContextMenu }]"
      ref="dropdownMenu"
      slot="dropdown"
      class="no-dropdown-arrow"
      @contextmenu.native.prevent>
      <slot name="dropdown">
        <template v-for="option in optionsFilter">
          <jl-dropdown
            :hide-on-click="false"
            v-if="option.children && option.children.length && !option.disabled && isTransitioned"
            v-model="internalValue"
            trigger="hover"
            :show-timeout="0"
            :hide-timeout="0"
            :is-root="false"
            :options="option.children"
            placement="right-start"
            style="display: block"
            v-on="$listeners">
            <jl-dropdown-item :value="internalValue" :option="option" :multiple="multiple"> </jl-dropdown-item>
          </jl-dropdown>
          <jl-dropdown-item v-else :value="internalValue" :option="option" :multiple="multiple"> </jl-dropdown-item>
        </template>
      </slot>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';
import modelMixin from '@jl/web-ui/src/mixin/model';

import JlButton from '../Button';
import JlDropdownItem from './item';
import JlIcon from '../Icon';

export default {
  name: COM_PREFIX + 'Dropdown',
  mixins: [propsMixin, modelMixin],
  components: {
    JlDropdown: () => import('./index.vue'),
    JlDropdownItem,
    JlButton,
    JlIcon,
  },
  props: {
    size: { type: String, default: 'mini' },
    disabled: { type: Boolean, default: false },
    multiple: { type: Boolean, default: false },
    options: { type: Array, default: () => [] },
    trigger: {
      type: String,
      default: 'click',
      // 只允许 'click', 'hover', 'contextmenu' 三种值
      validator: (value) => {
        return ['click', 'hover', 'contextmenu'].includes(value);
      },
    },
    placement: { type: String, default: 'bottom-end' },
    popperClass: { type: String, default: '' },
    // 外部不使用
    isRoot: { type: Boolean, default: true },
  },
  computed: {
    optionsFilter() {
      return this.options.filter((option) => option.visible !== false);
    },
    showLabel() {
      if (!(this.internalValue && this.internalValue.length)) return '';

      if (this.multiple) {
        const findOptions = this.optionsFilter.filter((option) => this.internalValue.includes(option.value));
        return findOptions.map((option) => option.showLabel || option[this.defaultProps.label]);
      } else {
        const findOption = this.optionsFilter.find((option) => option.value === this.internalValue);
        if (findOption) {
          return findOption.showLabel || findOption[this.defaultProps.label];
        }
      }
      return '';
    },
    internalTrigger() {
      if (this.trigger === 'contextmenu') {
        return null;
      } else {
        return this.trigger;
      }
    },
    isContextMenu() {
      return !this.internalTrigger;
    },
  },
  data() {
    return {
      timeout: 100, // element-ui内置的过渡是300ms, 现已给 .el-dropdown-menu 重置了时间
      dot: null,
      showPopper: false,
      isTransitioned: false,
    };
  },
  methods: {
    async handleCommand(option) {
      const command = option.value;
      let tempValue;
      if (option.children?.length) return;
      if (this.multiple) {
        if (Array.isArray(this.internalValue)) {
          const arr = [...this.internalValue];
          const index = arr.indexOf(command);
          index > -1 ? arr.splice(index, 1) : arr.push(command);
          tempValue = arr;
        } else {
          tempValue = [command];
        }
      } else {
        tempValue = command;
      }
      await this.$nextTick();
      this.internalValue = tempValue;
      this.$emit('command', tempValue, option);
    },
    handleClick() {
      this.$emit('click');
    },
    async handleContextMenu(event, isEmit = true) {
      if (!this.isRoot) return;
      event.preventDefault();
      if ((this.trigger !== 'contextmenu', this.disabled)) {
        return;
      }
      isEmit && this.$emit('contextmenu', event);
      // 清除延迟器
      if (this.visibleChangeTimer) {
        clearTimeout(this.visibleChangeTimer);
        this.visibleChangeTimer = null;
      }
      if (!this.dot) {
        this.dot = document.createElement('div');
        this.dot.style.position = 'absolute';
        document.body.append(this.dot);
      }
      this.dot.style.left = `${event.pageX + 16}px`;
      this.dot.style.top = `${event.pageY - 6}px`;
      await this.$nextTick();
      if (this.showPopper) {
        this.$refs.dropdownMenu.updatePopper();
      } else {
        this.$refs.dropdownMenu.referenceElm = this.dot;
        this.$refs.dropdownRef.show();
      }
    },
    handleVisibleChange(visible) {
      this.showPopper = visible;
      if (this.isRoot) {
        // 添加延迟器
        if (!visible) {
          this.isTransitioned = visible;
          this.visibleChangeTimer = setTimeout(() => {
            if (!this.$refs.dropdownRef) return;
            this.$refs.dropdownMenu.referenceElm = this.$refs.dropdownRef.$el;
            if (this.dot) {
              this.dot.remove();
              this.dot = null;
            }
            this.visibleChangeTimer = null;
          }, this.timeout);
        } else {
          setTimeout(() => {
            this.isTransitioned = visible;
          }, this.timeout);
        }
      }
      this.$emit('visible-change', visible);
    },
    hide() {
      this.$refs.dropdownRef.hide();
    },
    handleClickArea() {
      if (!this.internalTrigger) {
        this.hide();
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import '@jl/web-ui/src/style/components/button.scss';
.jl-dropdown {
  color: inherit;

  .el-icon-arrow-down {
    transition: transform 200ms;

    &.is-rotate {
      transform: rotate(-180deg);
    }
  }
  .el-dropdown__caret-button {
    &::before {
      z-index: 2;
    }
  }
  ::v-deep {
    .el-button-group {
      display: inline-flex;
      .el-button {
        @include jl-button-base;
        &:nth-of-type(1) {
          padding: 9px 15px;
          border-right: none;
          border-top-right-radius: 0 !important;
          border-bottom-right-radius: 0 !important;
        }
        &:nth-of-type(2) {
          padding: 0 5px;
          border-left: none;
          border-top-left-radius: 0 !important;
          border-bottom-left-radius: 0 !important;
        }
      }
    }
  }
}

.el-dropdown-menu {
  padding: 6px;
  border-radius: var(--jl-border-radius);
  margin: 6px 0;
  transition: transform 100ms;

  &:not(.is-root) {
    transform: translate(4px, -12px);
  }
  &.no-dropdown-arrow {
    ::v-deep .popper__arrow {
      display: none;
    }
  }
}
</style>
