import components from '../entry/components';
import packageJson from '../package.json';
import COM_PREFIX from './config/index.module';

// 用于记录已打印过的组件名
const printedComponentNames = new Set();

function JlWebUIResolver(componentName, isDebugger) {
  // 不是 COM_PREFIX 开头的
  if (!componentName.startsWith(COM_PREFIX)) {
    return null;
  }
  // 将首字母都转成大写再拼接
  const moduleList = componentName.slice(COM_PREFIX.length).split('.');
  const moduleName = moduleList.map((word) => word.replace(/^\w/, (c) => c.toUpperCase())).join('.');
  // components中未定义的
  if (!components[moduleName]) {
    return null;
  }
  if (isDebugger) {
    const basePath = `${packageJson.name}/${components[moduleName].substring(2)}`;
    if (!printedComponentNames.has(componentName)) {
      console.log('🔍', componentName, basePath);
      printedComponentNames.add(componentName);
    }
    return {
      from: basePath,
    };
  } else {
    const basePath = `${packageJson.name}/lib/${moduleName}.js`;
    const cssPath = `${packageJson.name}/lib/css/${moduleName}.css`;
    if (!printedComponentNames.has(componentName)) {
      // console.log('✨', componentName, basePath);
      printedComponentNames.add(componentName);
    }
    return {
      from: basePath,
      sideEffects: cssPath,
    };
  }
}

// module.exports = function ({ isDebugger }) {
//   console.log('📱jl-web-ui', 'isDebugger:', !!isDebugger);
//   return {
//     type: 'component',
//     resolve: (componentName) => JlWebUIResolver(componentName, isDebugger),
//   };
// };

export default function ({ isDebugger }) {
  if (!!isDebugger) {
    console.log('📱jl-web-ui', 'debugger');
  }
  return {
    type: 'component',
    resolve: (componentName) => JlWebUIResolver(componentName, isDebugger),
  };
}
