<template>
  <el-dropdown-item
    class="jl-dropdown-option-item"
    :class="{
      [`is-${option.type}`]: option.type,
    }"
    :key="option[defaultProps.value]"
    :divided="option.divided"
    :disabled="option.disabled"
    :command="option">
    <slot>
      <div class="flex justify-between items-center">
        <span class="jl-dropdown-text flex items-center overflow-hidden">
          <jl-icon v-if="option.icon" :icon="option.icon"></jl-icon>
          <jl-tooltip :rows="1" class="flex-1 overflow-hidden" placement="right">{{ option[defaultProps.label] }}</jl-tooltip>
          <!-- 子菜单-右箭头 -->
          <template v-if="option.children && option.children.length">
            <jl-icon icon="el-icon-arrow-right" class="dropdown-item-icon" />
          </template>
          <!-- 回显勾选 -->
          <template v-if="value && value.length">
            <jl-icon icon="el-icon-check" class="dropdown-item-icon is-check" :class="{ visible: isSelected }"></jl-icon>
          </template>
        </span>
      </div>
    </slot>
  </el-dropdown-item>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import propsMixin from '@jl/web-ui/src/mixin/props';
import JlIcon from '../Icon';
import JlTooltip from '../Tooltip';
export default {
  name: COM_PREFIX + 'DropdownItem',
  mixins: [propsMixin],
  components: { JlIcon, JlTooltip },
  props: {
    option: { type: Object, default: () => ({}) },
    value: { type: [String, Number, Array] },
    multiple: { type: Boolean, default: false },
  },
  computed: {
    isSelected() {
      if (this.value && this.value.length) {
        if (this.multiple) {
          return this.value.includes(this.option.value);
        } else {
          return this.value === this.option.value;
        }
      } else {
        return false;
      }
    },
  },
};
</script>

<style scoped lang="scss">
.jl-dropdown-text {
  max-width: 200px;
  width: 100%;
  gap: 10px;
  i {
    margin: 0;
  }
}
.el-dropdown-menu__item {
  position: relative;
  padding: 4px 15px !important;
  font-size: 12px;
  line-height: 24px !important;

  &.el-dropdown-menu__item--divided {
    margin-top: 5px;
    border: none;
    &::before {
      height: 1px !important;
      background-color: #ebeef5;
      position: absolute;
      top: -3px;
      left: 0;
      margin: 0 !important;
      width: 100%;
    }
  }
  .dropdown-item-icon {
    top: 10px;
    &.is-check {
      visibility: hidden;
      &.visible {
        visibility: visible;
      }
    }
  }
  &:not(.is-disabled) {
    color: #333;
    border-radius: 4px;
    cursor: default;
    transition: background-color 200ms;

    &:hover {
      background-color: #eaeced;
      color: #333;
    }

    &.is-success {
      color: var(--jl-success) !important;
    }
    &.is-primary {
      color: var(--jl-primary) !important;
    }
    &.is-danger {
      color: var(--jl-danger) !important;
    }
    &.is-warning {
      color: var(--jl-warning) !important;
    }
    &.is-info {
      color: var(--jl-info) !important;
    }
  }
}
</style>
