/* 

  深拷贝合并对象(相同属性，值会初后面的替换掉)
    arguments为后续动态参数

*/

export default function (target) {
  for (let i = 1, j = arguments.length; i < j; i++) {
    let source = arguments[i] || {};
    for (let prop in source) {
      if (Object.prototype.hasOwnProperty.call(source, prop)) {
        let value = source[prop];
        if (value !== undefined) {
          target[prop] = value;
        }
      }
    }
  }

  return target;
}
