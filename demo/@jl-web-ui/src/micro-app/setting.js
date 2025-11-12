/* 


  更新翻译组件


*/
import { customEvent } from '../util/index.js';
// 用于跨组件调用事件名
import SETTING_CUSTOM_EVENT from '../constant/setting.js';

function changeLanguage(params) {
  customEvent(SETTING_CUSTOM_EVENT.CHANGE_LANGUAGE, params, true);
}

export default {
  install(Vue) {
    Vue.prototype.$changeLanguage = changeLanguage;
    window.changeLanguage = changeLanguage;
  },
};
