import Vue from 'vue';
import Confirm from './src/confirm.vue';

let instance = null;
const MessageBoxConstructor = Vue.extend(Confirm);

const MessageBox = {};
MessageBox.confirm = (option = {}) => {
  instance = new MessageBoxConstructor({
    el: document.createElement('div'),
    propsData: option,
  });
  instance.$on('closed', () => {
    instance.isConfirmLoading = false;
    document.body.removeChild(instance.$el);
    instance.$destroy();
  });
};

const install = function (Vue, opts = {}) {
  Vue.prototype.$jlConfirm = MessageBox.confirm;
};

export default {
  install,
  MessageBox,
};
