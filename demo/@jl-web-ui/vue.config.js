const path = require('path');
const packageJson = require('./package.json');
const FixStyleOnlyEntriesPlugin = require('webpack-fix-style-only-entries');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

const componentsConfig = require('./entry/components.js');
const scriptConfig = require('./entry/script.js'); // 修正拼写错误
const cssConfig = require('./entry/css.js');

// 获取组件入口
const entries = {};

// 组件入口
Object.keys(componentsConfig).forEach((name) => {
  entries[name] = path.resolve(__dirname, componentsConfig[name]);
});

Object.keys(scriptConfig).forEach((name) => {
  entries[name] = path.resolve(__dirname, scriptConfig[name]);
});

Object.keys(cssConfig).forEach((name) => {
  entries[name] = path.resolve(__dirname, cssConfig[name]);
});

module.exports = {
  outputDir: 'lib',
  productionSourceMap: false,
  lintOnSave: false,
  filenameHashing: false,
  css: {
    extract: true,
    sourceMap: false,
    requireModuleExtension: true,
    loaderOptions: {
      css: {
        modules: {
          auto: () => false,
        },
      },
      sass: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
      scss: {
        sassOptions: {
          silenceDeprecations: ['legacy-js-api', 'import'],
        },
      },
    },
  },
  chainWebpack: (config) => {
    config.devtool(false);
    // 删除默认的入口
    config.entryPoints.delete('app');

    // 禁用HTML插件，避免生成index.html
    config.plugins.delete('html');
    config.plugins.delete('preload');
    config.plugins.delete('prefetch');

    // 添加所有入口
    Object.keys(entries).forEach((name) => {
      config.entry(name).add(entries[name]).end();
    });
    // 为不同的入口类型设置不同的输出配置
    config.output
      .filename('[name].js')
      .chunkFilename('chunk/[name].js')
      .libraryTarget('umd')
      .libraryExport('default')
      .library({
        root: packageJson.name,
        amd: packageJson.name,
        commonjs: packageJson.name,
      })
      .umdNamedDefine(true)
      .globalObject("(typeof self !== 'undefined' ? self : typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : this)");

    // 添加别名
    config.resolve.alias.set('@jl/web-ui', path.resolve(__dirname, './'));

    // 排除外部依赖
    config.externals({
      vue: {
        root: 'Vue',
        commonjs: 'vue',
        commonjs2: 'vue',
        amd: 'vue',
      },
      vuex: {
        root: 'Vuex',
        commonjs: 'vuex',
        commonjs2: 'vuex',
        amd: 'vuex',
      },
      'element-ui': {
        root: 'ELEMENT',
        commonjs: 'element-ui',
        commonjs2: 'element-ui',
        amd: 'element-ui',
      },
      'vue-i18n': {
        root: 'VueI18n',
        commonjs: 'vue-i18n',
        commonjs2: 'vue-i18n',
        amd: 'vue-i18n',
      },
      axios: 'axios',
      echarts: 'echarts',
    });
    config.optimization.splitChunks(false); // 彻底关闭代码分割

    config.optimization.runtimeChunk(false);

    const svgRule = config.module.rule('svg');
    svgRule.uses.clear();
    svgRule.use('babel-loader').loader('babel-loader').end().use('vue-svg-loader').loader('vue-svg-loader');
  },
  configureWebpack: (config) => {
    config.plugins.push(new FixStyleOnlyEntriesPlugin());

    if (process.env.ANALYZE) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: 'server',
          openAnalyzer: true,
          analyzerPort: 8888,
        })
      );
    }
  },
};
