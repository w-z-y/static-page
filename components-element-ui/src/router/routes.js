const requireComponent = require.context(
    '../examples', // 其目录的相对路径
    false, // 是否查询子目录
    /\.vue$/ // 匹配的文件扩展名
);

const routes = requireComponent.keys().map(fileName => {
    const componentConfig = requireComponent(fileName);
    const componentName = fileName.replace('./', '').replace('.vue', '');
    return {
        path: `/${componentName.toLowerCase()}`, // 将组件名称转换为小写作为路径
        name: componentName.charAt(0).toUpperCase() + componentName.slice(1), // 将组件名称首字母大写作为名称
        component: componentConfig.default,
        meta: {
            title: componentName.charAt(0).toUpperCase() + componentName.slice(1) // 将组件名称首字母大写作为标题
        }
    };
});

// 添加默认重定向
routes.push({
    path: '*',
    redirect: `/${routes[0].name.toLowerCase()}`, // 默认重定向到第一个示例
});

console.log('routes', routes);
export default routes;