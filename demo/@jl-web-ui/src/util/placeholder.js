// placeholder配置
import { PLACEHOLDER_MAP_FN } from '../config/placeholder';

// 获取placeholder
export function getPlaceholder(option) {
  return `${PLACEHOLDER_MAP_FN(option.type)}${option.label || ''}`;
}
