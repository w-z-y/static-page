// 创建vue组件模板方法
import COM_PREFIX from '../config';
import modelMixin from '@jl/web-ui/src/mixin/model';
import propsMixin from '@jl/web-ui/src/mixin/props';
import i18nMixin from '@jl/web-ui/src/mixin/i18n';

// model 是否需要支持双向绑定
export default function createVue(option = {}) {
  const { name = '', model = false, lang = false, defaultProps = false } = option;

  option.inheritAttrs = false;
  option.name = `${COM_PREFIX}${name.charAt(0).toUpperCase()}${name.slice(1)}`;
  option.mixins = [
    // 默认mixins
    ...(option.mixins || []),
    // 用于双向绑定
    model ? modelMixin : {},
    // 用于国际化
    lang ? i18nMixin : {},
    // 用于定义props映射
    defaultProps ? propsMixin : {},
  ];

  // option.methods.$i18n = i18n.t;

  return option;
}
