export const PLACEHOLDER_MAP_FN = (type) => {
    switch (type) {
      case 'input':
        return '请输入';
      case 'select':
      case 'radio':
      case 'checkbox':
      case 'switch':
      case 'slider':
      case 'color-picker':
        return '请选择';
      case 'datetime':
        return '请选择日期时间';
      case 'time':
      case 'timeSelect':
        return '请选择时间';
      case 'rate':
        return '请评分';
      default:
        return '请输入';
    }
  };
  