<template>
  <div class="jl-tabs" :tab-position="tabPosition" :style="{ '--operation-size': $slots.operation ? internalOperationSize : 0 }">
    <el-tabs v-model="internalValue" :tabPosition="tabPosition" v-bind="$attrs" v-on="$listeners" :closable="closable" @tab-remove="handleRemove">
      <slot>
        <el-tab-pane
          v-for="option in options"
          :key="option[defaultProps.value]"
          :name="option[defaultProps.value]"
          :label="option[defaultProps.label]"
          v-bind="option">
          <template slot="label">
            <div class="label">
              <slot name="label-prefix" :option="option">
                <jl-icon v-if="option.icon" :icon="option.icon"></jl-icon>
              </slot>
              <slot name="label" :option="option">
                <jl-tooltip block :placement="tabPosition" :rows="1" style="max-width: 200px">
                  {{ option[defaultProps.label] }}
                </jl-tooltip>
              </slot>
              <slot name="label-suffix" :option="option"></slot>
            </div>
          </template>
          <slot name="content" :option="option"></slot>
        </el-tab-pane>
      </slot>
    </el-tabs>

    <div class="operation-wrapper">
      <slot name="operation"></slot>
    </div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';

import { handlePxValue } from '@jl/web-ui/src/util';
import modelMixin from '@jl/web-ui/src/mixin/model';
import propsMixin from '@jl/web-ui/src/mixin/props';
import JlTooltip from '../Tooltip';
import JlIcon from '../Icon';
export default {
  name: COM_PREFIX + 'Tabs',
  mixins: [propsMixin, modelMixin],
  components: { JlTooltip, JlIcon },
  props: {
    options: {
      type: Array,
      default: () => [],
    },
    closable: {
      type: Boolean,
      default: false,
    },
    tabPosition: {
      type: String,
      default: 'top',
    },
    // 操作区域尺寸
    operationSize: {
      type: Number,
      default: 80,
    },
  },
  computed: {
    internalOperationSize() {
      return handlePxValue(this.operationSize);
    },
  },
  methods: {
    handleRemove(tabValue) {
      const index = this.options.findIndex((tab) => tab.value === tabValue);
      if (index > -1) {
        this.options.splice(index, 1);
        if (this.internalValue === tabValue) {
          this.internalValue = this.options[0]?.value || '';
        }
      }
      this.$emit('edit', tabValue);
    },
    add(option) {
      this.options.push(option);
      this.internalValue = option.value;
    },
  },
  mounted() {
    if (!!this.$slots.operation) {
      this.$el.style.setProperty('--operation-width', '80px');
    }
  },
};
</script>

<style scoped lang="scss">
.jl-tabs {
  height: 100%;
  width: 100%;
  position: relative;
  & > .el-tabs {
    height: 100%;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .operation-wrapper {
    overflow: hidden;
    position: absolute;
    display: none;
  }
  &[tab-position='top'] {
    & > .el-tabs {
      flex-direction: column;
    }
    & > .operation-wrapper {
      top: 4px;
      right: 10px;
      display: block;
    }
  }
  &[tab-position='left'] {
    & > .el-tabs {
      flex-direction: row;
    }
  }
  &[tab-position='right'] {
    & > .el-tabs {
      flex-direction: row-reverse;
    }
  }
  ::v-deep {
    .el-tabs__active-bar {
      background-color: var(--jl-primary);
    }

    .el-tabs__header {
      &.is-top,
      &.is-bottom {
        padding-right: var(--operation-width);
      }

      &.is-left,
      &.is-right {
        height: unset;
      }

      .el-tabs__item {
        margin: 0px;
        border-bottom-width: 2px;
        .label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          vertical-align: bottom;
          gap: 4px;
        }
        &:hover,
        &.is-active {
          color: var(--jl-primary);
        }
      }
    }
    .el-tabs__content {
      flex: 1;
      padding: 0;
      .el-tab-pane {
        height: 100%;
      }
    }
  }
}
</style>
