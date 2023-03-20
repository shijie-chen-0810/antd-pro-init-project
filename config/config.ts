// https://umijs.org/config/
import { defineConfig } from 'umi';
import defaultSettings from './defaultSettings';
import proxy from './proxy';
import routes from './routes';

const { REACT_APP_ENV } = process.env;

export default defineConfig({
  hash: true,
  antd: {},
  dva: {
    hmr: true,
  },
  layout: {
    // https://umijs.org/zh-CN/plugins/plugin-layout
    locale: true,
    siderWidth: 208,
    ...defaultSettings,
  },
  dynamicImport: {
    loading: '@ant-design/pro-layout/es/PageLoading',
  },
  targets: false,
  // umi routes: https://umijs.org/docs/routing
  routes,
  // Theme for antd: https://ant.design/docs/react/customize-theme-cn
  theme: {
    'primary-color': defaultSettings.primaryColor,
  },
  // esbuild is father build tools
  // https://umijs.org/plugins/plugin-esbuild
  esbuild: {},
  title: 'hahah',
  ignoreMomentLocale: true,
  proxy: proxy[REACT_APP_ENV || 'dev'],
  manifest: {
    basePath: '/',
  },
  devServer: {
    port: 8010,
  },
  // Fast Refresh 热更新
  fastRefresh: {},
  nodeModulesTransform: { type: 'none' },
  // 开启后热更新会闪屏
  // webpack5: {},
  // 开启后热更新子组件失效
  // mfsu: {},
  // plugins: [
  //   new webpack.ProvidePlugin({
  //     // 在这儿添加下面两行
  //     'window.Quill': 'quill/dist/quill.js',
  //     Quill: 'quill/dist/quill.js',
  //   }),
  // ],
  chainWebpack(config, { webpack }) {
    const quillPlugin = new webpack.ProvidePlugin({
      // 在这儿添加下面两行
      'window.Quill': 'quill/dist/quill.js',
      Quill: 'quill/dist/quill.js',
    });
    // config.plugins.set('quill', quillPlugin);
    config.plugin('quill').use(quillPlugin);
  },
  plugins: ['lodash-webpack-plugin'],
  extraBabelPlugins: ['lodash'],

  externals: {
    HotlineClient: 'HotlineClientUi',
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  styles: [
    'https://g.alicdn.com/xixi-design/xixi-design/2.7.0/index.css',
    'https://g.alicdn.com/code/lib/antd/4.23.0/antd.min.css',
  ],
  headScripts: [
    'https://g.alicdn.com/code/lib/react/17.0.2/umd/react.development.min.js',
    'https://g.alicdn.com/code/lib/react-dom/17.0.2/umd/react-dom.development.min.js',
    'https://cdnjs.cloudflare.com/ajax/libs/moment.js/2.29.4/moment.min.js',
    'https://g.alicdn.com/code/lib/antd/4.23.0/antd.min.js',
  ],
  scripts: [
    'https://g.alicdn.com/antelope/phone-sdk/1.1.0/phone-ui.js',
    // 'http://g.alicdn.com/hotline-client/hotline-client-sdk/1.0.5/hotline-client-ui/index.js',
    // 'https://g.alicdn.com/hotline-client/hotline-client-sdk/1.0.5/hotline-client-fuyun/index.js',
    // 'http://g.alicdn.com/hotline-client/hotline-client-sdk/1.0.5/hotline-client-check-tools/index.js',
  ],
});

// <link rel="stylesheet" href="https://g.alicdn.com/code/lib/antd/4.17.3/antd.min.css" />
//   <link rel="stylesheet" href="https://g.alicdn.com/xixi-design/xixi-design/2.7.0/index.css" />
//   <script src="https://g.alicdn.com/code/lib/react/17.0.1/umd/react.production.min.js"></script>
//   <script src="https://g.alicdn.com/code/lib/react-dom/17.0.1/umd/react-dom.production.min.js"></script>
//   <script src="https://g.alicdn.com/code/lib/antd/4.17.3/antd.min.js"></script>
//   <script src="https://g.alicdn.com/antelope/phone-sdk/1.0.0/phone-ui.js"></script>
