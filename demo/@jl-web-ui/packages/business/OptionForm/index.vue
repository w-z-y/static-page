<template>
  <div class="jl-business-option-form">
    <draggable
      class="option-form-container"
      :style="{ maxHeight: internalMaxHeight }"
      ref="draggableRef"
      :list="internalValue"
      :animation="340"
      group="selectItem"
      handle=".option-drag">
      <div v-for="(item, index) in internalValue" :key="index" class="option-item">
        <jl-icon v-if="draggable" class="option-drag cursor-move" size="20" icon="move"> </jl-icon>

        <jl-layout class="form-wrap" :options="internalOptions">
          <template #default="{ option, $index }">
            <jl-dynamic-component v-model="item[option.value]" :ref="`dynamicComponentListRef${$index}`" :option="option" :data="internalValue">
            </jl-dynamic-component>
          </template>
        </jl-layout>

        <jl-popconfirm
          v-if="showOperateButton"
          class="operate-icon"
          :disabled="(autoAddOneRow ? optionTableFormMixin_deleteButtonDisabled : false) || !showDeleteConfirm"
          title="确定删除吗？"
          @confirm="remove(index)">
          <jl-icon
            slot="reference"
            :class="{ 'is-disabled': autoAddOneRow ? optionTableFormMixin_deleteButtonDisabled : false }"
            size="22"
            class="delete-icon"
            icon="el-icon-remove-outline"
            @click="handleClickRemove(index)" />
        </jl-popconfirm>
      </div>
    </draggable>

    <div v-if="showOperateButton" class="option-button" :class="{ 'is-draggable': draggable }">
      <jl-button icon="el-icon-circle-plus-outline" text @click="add"> {{ addButtonText }} </jl-button>
    </div>
  </div>
</template>

<script>
import COM_PREFIX from '@jl/web-ui/src/config';
import { handlePxValue } from '@jl/web-ui/src/util';
import draggable from 'vuedraggable';

import optionTableFormMixin from '@jl/web-ui/src/mixin/business/option-table-form';
import JlPopconfirm from '@jl/web-ui/packages/base/Popconfirm';
import JlIcon from '@jl/web-ui/packages/base/Icon';
export default {
  name: COM_PREFIX + 'Business.OptionForm',
  components: {
    draggable,
    JlPopconfirm,
    JlIcon,
  },
  mixins: [optionTableFormMixin],
  props: {
    options: { type: Array, default: () => [] },
    maxHeight: { type: [String, Number], default: null },
    draggable: { type: Boolean, default: false },
    addButtonText: { type: String, default: '添加选项' },
  },
  computed: {
    internalMaxHeight() {
      return this.maxHeight && handlePxValue(this.maxHeight);
    },
    internalOptions() {
      // 对options做处理，若没有width、span、flex，则默认加flex: 1
      const keys = ['width', 'span', 'flex'];
      return (this.options || []).map((opt) => {
        if (opt && typeof opt === 'object' && !keys.some((key) => Object.prototype.hasOwnProperty.call(opt, key))) {
          return { ...opt, flex: 1 };
        }
        if (opt.width) {
          opt.width = handlePxValue(opt.width);
        }
        return opt;
      });
    },
  },
  methods: {
    handlePxValue,
    async add(index, isautoAddOneRow) {
      let addObj = null;
      if (!isautoAddOneRow) {
        if (this.beforeAdd) {
          addObj = await new Promise((resolve) => {
            this.beforeAdd(resolve);
          });
        }
      }

      // 末尾添加
      this.internalValue.push(addObj || structuredClone(this.template));
      this.$nextTick(() => {
        const container = this.$el?.querySelector('.option-form-container');
        if (container) {
          container.scrollTop = container.scrollHeight;
        }
      });
    },
    remove(index) {
      return this.optionTableFormMixin_remove(index);
    },
  },
};
</script>

<style scoped lang="scss">
.jl-business-option-form {
  --row-gap: 6px;
  --column-gap: 10px;
  .option-form-container {
    overflow: auto;
    scroll-behavior: smooth;
    margin-bottom: var(--row-gap);

    .option-item {
      overflow: hidden;
      display: flex;
      align-items: center;
      gap: var(--column-gap);
      &:not(:first-of-type) {
        margin-top: var(--row-gap);
      }
      .form-wrap {
        flex: 1;
        display: flex;
        align-items: center;
      }
    }
  }
  .delete-icon {
    color: var(--jl-danger);
    cursor: pointer;
    &.is-disabled {
      color: var(--jl-info);
      cursor: not-allowed;
    }
  }
  .option-button {
    &.is-draggable {
      margin-left: 25px;
    }
  }
}
</style>
