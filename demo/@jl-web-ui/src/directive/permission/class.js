import { processInChunks } from '../../util';

export default class PermissionManager {
  // type参数为array，表示权限类型列表，例如 ['button', 'aiButton']
  constructor(type) {
    this.permissionMap = new Map();
    this.chunkSize = 1000;
    this.isInitialized = false; // 添加初始化状态标记
    if (!Array.isArray(type)) {
      throw new Error('[@jl/web-ui:directive:permission]: type must be an array');
    }
    this.permissionTypes = type; // 权限类型
    this.defaultType = type.length ? type[0] : ''; // 默认为type的第一项
  }

  initPermissions(permissions) {
    if (this.isInitialized) {
      return Promise.resolve();
    }
    this.clearPermissions();
    return new Promise((resolve) => {
      processInChunks(
        permissions,
        (permission) => {
          if (!this.permissionMap.has(permission.modelId)) {
            const permissionObject = {};
            this.permissionTypes.forEach((type) => {
              permissionObject[type] = {};
            });
            this.permissionMap.set(permission.modelId, permissionObject);
          }
          const modelPermissions = this.permissionMap.get(permission.modelId);
          this.permissionTypes.forEach((type) => {
            if (permission[type] && Array.isArray(permission[type])) {
              permission[type].forEach((item) => {
                modelPermissions[type][item.enCode] = true;
              });
            }
          });
        },
        this.chunkSize,
        () => {
          this.isInitialized = true; // 标记为已初始化
          resolve();
        }
      );
    });
  }

  getPermissionInfo(modelId, enCode, type = this.defaultType) {
    const modelPermissions = this.permissionMap.get(modelId);
    return modelPermissions && modelPermissions[type] && modelPermissions[type][enCode] === true;
  }

  clearPermissions() {
    this.permissionMap.clear();
    this.isInitialized = false; // 清除时重置初始化状态
  }
}
