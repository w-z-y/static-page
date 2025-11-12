const path = require('path');
const componentsConfig = require('../../entry/components.js');
const toKebabCase = (str) => str.replace(/([A-Z])/g, (match, _, offset) => (offset === 0 ? match.toLowerCase() : '-' + match.toLowerCase()));
const COM_PREFIX = require('../../src/config/index.module');
const sidebar = require('../router/sidebar.js');
const nav = require('../router/nav.js');

// console.log('componentsConfig', componentsConfig);
const components = Object.entries(componentsConfig).map(([name, comPath]) => {
  const nameList = name.split('.');
  const moduleName = nameList.map((word) => toKebabCase(word)).join('.');
  return {
    name: `${COM_PREFIX.toLowerCase()}-${moduleName}`,
    path: path.resolve(__dirname, '../../', comPath),
  };
});

module.exports = () => {
  return {
    define: {
      'VUE_APP_BASE_API': process.env.NODE_ENV === 'development' ? '/dev' : '',
    },
    title: 'web-ui',
    description: '基于 Element-UI 二次封装',
    head: [
      ['script', { src: 'https://cdn.jsdelivr.net/npm/echarts@4.2.1/dist/echarts.min.js', defer: true }],
      // ['script', { src: '//at.alicdn.com/t/c/font_4925679_b0s1hq7k6ft.js', defer: true }]
    ],
    chainWebpack: (config) => {
      config.module
        .rule('vue')
        .use('vue-loader')
        .tap((options) => {
          return Object.assign({}, options || {}, {
            compiler: require('vue-template-babel-compiler'),
          });
        });
      // 添加jl-web-ui别名
      config.resolve.alias.set('@jl/web-ui', path.resolve(__dirname, '../../'));

      const svgRule = config.module.rule('svg');
      svgRule.uses.clear();
      svgRule.use('babel-loader').loader('babel-loader').end().use('vue-svg-loader').loader('vue-svg-loader');

      config.resolve.alias.set('marked', 'marked/lib/marked.cjs');
    },
    // 添加 devServer 代理配置
    devServer: {
      proxy: {
        '/dev': {
          target: 'http://192.168.7.106',
          // target: 'http://10.10.9.150:31034', // zhb
          changeOrigin: true,
          pathRewrite: {
            '^/dev': '',
          },
          ws: false,
        },
        '/ws': {
          target: 'https://10.10.9.133:9001',
          changeOrigin: true,
          pathRewrite: {
            '^/ws': '/ws',
          },
          ws: true,
        },
        '/audio': {
          target: 'https://10.10.9.133:31003',
          changeOrigin: true,
          ws: false,
        },
      },
    },
    themeConfig: {
      sidebarDepth: 0,
      nav,
      sidebar,
    },
    markdown: {
      lineNumbers: true,
      extendMarkdown: (md) => {
        // 使用更多的 markdown-it 插件!
        md.use(require('markdown-it-attrs'), {
          // optional, these are default options
          leftDelimiter: '{{',
          rightDelimiter: '}}',
          allowedAttributes: [], // empty array = all attributes are allowed
        });
      },
    },
    plugins: [
      'demo-container',
      [
        '@vuepress/plugin-register-components',
        {
          components,
        },
      ],
    ],
  };
};
