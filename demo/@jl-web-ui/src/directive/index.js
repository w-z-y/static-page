import permission from './permission';

const install = function (Vue, option = {}) {
  Vue.use(permission, option.permission);
};

export default {
  install,
};
