/* 


  调用ai组件


*/
import { customEvent } from '../util/index';
// 用于跨组件调用事件名
import AI_CUSTOM_EVENT from '../constant/ai.js';

function dispatchCustomEvent(eventName, params, option) {
  const { isAiProject } = option;
  if (!isAiProject && window.top === window) {
    console.warn('ai弹窗，需要打开主项目测试');
  }
  customEvent(eventName, params, isAiProject);
}

function openAiDrawer(option = {}) {
  return (params) => dispatchCustomEvent(AI_CUSTOM_EVENT.SEND_MESSAGE_IN_DRAWER, params, option);
}
function openAiDrawerAndLocation(option = {}) {
  return (params) => dispatchCustomEvent(AI_CUSTOM_EVENT.MESSAGE_LOCATION, params, option);
}

export default {
  install(Vue, option) {
    Vue.prototype.$openAiDrawer = openAiDrawer(option);
    Vue.prototype.$openAiDrawerAndLocation = openAiDrawerAndLocation(option);

    window.openAiDrawer = openAiDrawer(option);
    window.openAiDrawerAndLocation = openAiDrawerAndLocation(option);
  },
};
