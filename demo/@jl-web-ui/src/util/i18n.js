import i18n from '@jl/web-ui/src/locale';
import defaultLang from '@jl/web-ui/src/locale/lang/zh';

export default function t(key, value = defaultLang[key]) {
  return i18n.t(key, value);
}
