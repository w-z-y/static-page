<template>
  <div class="jl-business-translate-item">
    <slot></slot>
    <template v-if="translateSwitch && isVisible && translateItem && translateItem.isInit">
      <div
        class="jl-business-translate-item-result"
        :class="{
          'is-error': isError,
          'is-editing': isEditing,
          'is-loading': loading,
          'is-visible': operateVisible,
        }"
        :style="{
          maxHeight: internalMaxHeight,
        }"
        v-clickoutside="hideDropdown"
        @click.stop>
        <div class="jl-business-translate-item-result__txt scroll-hover">
          <template>
            <span v-if="isError">
              {{ translateItem.msg }}
            </span>
            <jl-text-editor
              v-else
              v-model="targetText"
              :placeholder="loading ? '' : t('textEditor.input.placeholder')"
              style="width: 100%; max-height: 100%; overflow: auto"
              ref="jlTextEditorRef"
              :disabled="!isEditing">
            </jl-text-editor>
          </template>
        </div>

        <div class="jl-business-translate-item-result__operate-btn">
          <jl-icon.loading :size="14" v-if="loading" class="translate-loading-icon"></jl-icon.loading>

          <template v-else>
            <template v-if="isEditing">
              <jl-icon.hover
                :content="t('translate.button.save')"
                :size="14"
                class="jl-business-translate-icon-btn"
                icon="yes"
                :disabled="!targetText.length"
                @click="handleConfirm" />
              <jl-icon.hover
                :content="t('translate.button.cancel')"
                :size="14"
                class="jl-business-translate-icon-btn jl-business-translate-item-result__close-btn"
                icon="close"
                @click="handleCancel" />
            </template>
            <jl-dropdown
              v-else
              ref="dropdownRef"
              class="jl-business-translate-item-result__more-btn"
              :options="translateMoreOptions"
              @command="handleCommand"
              @visible-change="handleVisibleChange">
              <jl-icon.hover :size="14" class="jl-business-translate-icon-btn" icon="more"></jl-icon.hover>
            </jl-dropdown>
          </template>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import clickoutside from '@jl/web-ui/src/directive/clickoutside';
// createVue
import createVue from '@jl/web-ui/src/createVue';
// constant
import { STATUS } from './constant';
// api
import { reTranslateApi, updateTranslationResultApi } from '@jl/web-ui/src/api/translate';
// util
import { isNotEmpty } from '@jl/web-ui/src/util';
// component
import JlIconLoading from '../../base/Icon/loading/index.vue';
import JlIconHover from '../../base/Icon/hover/index.vue';
import JlTextEditor from '../../base/TextEditor/index.vue';
import JlDropdown from '../../base/Dropdown/index.vue';
import { handlePxValue } from '../../../src/util';

export default createVue({
  name: 'Business.TranslateItem',
  model: true,
  lang: true,
  props: {
    maxHeight: { type: [Number, String], default: null },
  },
  inject: ['translationAPI'],
  directives: { clickoutside },
  components: {
    'jl-icon.loading': JlIconLoading,
    'jl-icon.hover': JlIconHover,
    'jl-dropdown': JlDropdown,
    'jl-text-editor': JlTextEditor,
  },
  computed: {
    ...mapGetters(['userInfo']),
    /*




    */
    internalMaxHeight() {
      return handlePxValue(this.maxHeight);
    },
    translateMoreOptions() {
      return [
        { label: this.t('translate.button.retranslate'), value: 'reTranslate' },
        { label: this.t('translate.button.edit'), value: 'updateTranslate' },
      ];
    },
    translateSwitch() {
      return this.translationAPI.translateSwitch();
    },
    translateItem() {
      return this.translationAPI.translationsMap[this.initialValue];
    },
    isVisible() {
      return ![STATUS.SAME_LANG].includes(this.translateItem?.status);
    },
    isError() {
      return this.translateItem?.status === STATUS.FAIL && !this.isEditing;
    },
  },
  watch: {
    value: {
      immediate: true,
      handler(newVal) {
        if (isNotEmpty(newVal) && !this.translateItem) {
          this.translationAPI.addItem(this);
          this.translationAPI.addKeyValue(newVal);
          this.initialValue = newVal;
        }
        return;
      },
    },
    'translateItem.targetText'(val) {
      this.targetText = this.initialTargetText = val;
    },
  },
  data() {
    return {
      operateVisible: false,
      /*



      */
      loading: false,
      isEditing: false,

      initialValue: '', // 初始值
      initialTargetText: '', // 目标初始值

      targetText: '', // 目标值
    };
  },
  methods: {
    hideDropdown() {
      this.$refs.dropdownRef?.hide?.();
    },
    handleVisibleChange(visible) {
      this.operateVisible = visible;
    },
    /*




    */
    //
    async handleCommand(command) {
      switch (command) {
        // 校正
        case 'reTranslate':
          try {
            this.loading = true;
            const res = await reTranslateApi({ sourceText: this.internalValue });
            this.translationAPI.addKeyValue(this.internalValue, { ...res.data[this.internalValue], isInit: this.translateItem.isInit });
            this.updateInitial();
          } catch (e) {
            this.loading = false;
          }
          break;
        case 'updateTranslate':
          this.isEditing = true;
          await this.$nextTick();
          this.$refs.jlTextEditorRef.focus();
          break;
      }
    },
    async handleConfirm() {
      try {
        this.isEditing = false;
        this.loading = true;
        console.log('re-translate');
        await updateTranslationResultApi({
          sourceText: this.internalValue,
          targetText: this.targetText,
        });
        this.translationAPI.addKeyValue(this.internalValue, { ...(this.translateItem || {}), targetText: this.targetText });
        this.updateInitial();
      } catch (e) {
        this.loading = false;
        this.translationAPI.translationsMap[this.initialValue].status = STATUS.FAIL;
        this.handleCancel();
        console.error(e);
      }
    },
    // 取消编辑
    handleCancel() {
      console.log('translate-cancel');
      this.targetText = this.initialTargetText;
      this.isEditing = false;
    },
    // 更新初始值
    updateInitial() {
      console.log('translate-update');
      this.initialTargetText = this.targetText;
      this.initialValue = this.internalValue;
      this.loading = false;
    },
  },
  beforeDestroy() {
    this.translationAPI.deleteKey(this.initialValue);
  },
});
</script>
<style scoped lang="scss">
.jl-business-translate-item {
  display: flex;
  flex-direction: column;
  overflow: hidden;

  .jl-business-translate-item-result {
    border: 1px solid #eee;
    max-height: 100%;
    line-height: 20px;
    box-sizing: border-box;
    color: #666;
    flex: 1;
    font-size: 14px;
    background: #f8f8f8;
    padding: 6px 4px;
    margin-block: 4px;
    border-radius: 8px;
    display: flex;
    gap: 4px;
    position: relative;

    &.is-error {
      color: #ff7f81;
    }

    &:hover,
    &.is-visible,
    &.is-loading,
    &.is-editing {
      .jl-business-translate-item-result__operate-btn {
        opacity: 1;
      }
    }
    &.is-editing {
      background-color: #fff;
      border-color: var(--jl-primary);
      .jl-business-translate-item-result__operate-btn {
        top: -2px;
        transform: translateY(-100%);
      }
    }

    .translate-loading-icon {
      font-size: 22px;
    }

    // 文本
    .jl-business-translate-item-result__txt {
      height: unset;
      overflow: auto;
      margin: 0;
      min-height: 20px;
      display: flex;
      flex: 1;
      align-items: center;
      gap: 10px;
    }
    // 操作
    .jl-business-translate-item-result__operate-btn {
      padding: 2px;
      gap: 2px;
      color: #333;
      opacity: 0;
      background-color: #fff;
      line-height: 1;
      border-radius: 4px;
      box-shadow: 0 0 4px #ccc;
      position: absolute;
      right: 2px;
      top: 2px;
      align-self: start;
      display: flex;
      align-items: center;

      .jl-business-translate-icon-btn {
        line-height: 0;
        box-sizing: border-box;
        cursor: pointer;
        vertical-align: bottom;
      }

      .jl-business-translate-item-result__more-btn {
        line-height: 0;
        box-sizing: border-box;
        font-size: 22px;
      }
    }
  }
}
</style>
