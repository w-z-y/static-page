import PermissionManager from './class';

function permissionDirective(option) {
  const { data, type = [] } = option;
  const permissionManager = new PermissionManager(type);
  return {
    directive: {
      async inserted(el, binding, vnode) {
        const { value, arg } = binding;
        const permissionList = data();
        await permissionManager.initPermissions(permissionList);
        if (!value) return el.parentNode && el.parentNode.removeChild(el);
        const modelId = vnode.context._routerRoot._route.meta.modelId || '';
        const isHasPermission = permissionManager.getPermissionInfo(modelId, value, arg);
        if (!isHasPermission) return el.parentNode && el.parentNode.removeChild(el);
      },
    },
    fn(value, type) {
      const modelId = this.$route.meta.modelId || '';
      const isHasPermission = permissionManager.getPermissionInfo(modelId, value, type);
      return isHasPermission;
    },
  };
}

const permission = {
  install(Vue, option) {
    const permission = permissionDirective(option);
    Vue.directive('has', permission.directive);
    Vue.prototype.$has = permission.fn;
  },
};

export default permission;
