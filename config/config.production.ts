// https://umijs.org/config/
import { defineConfig } from 'umi';

// 配置打包后的公共前缀路径
export default defineConfig({
  publicPath: '/',
  // chunks: ['vendors', 'umi'],
  chainWebpack(config) {
    config.output.publicPath('/');

    // antd moment -> dayjs
    // config.plugin('moment2dayjs').use('antd-dayjs-webpack-plugin');
    config.optimization.splitChunks({
      chunks: 'all',
      minSize: 30000,
      minChunks: 3,
      automaticNameDelimiter: '.',
      cacheGroups: {
        vendor: {
          name: 'vendors',
          test({ resource }: any) {
            return /[\\/]node_modules[\\/]/.test(resource);
          },
          priority: 9,
        },
        antdesigns: {
          // antdsign
          name: 'antdesigns',
          chunks: 'all',
          test: /(@antd|antd|@ant-design)/,
          priority: 10,
        },
        rcbasic: {
          // rc-
          name: 'rcbasic',
          chunks: 'all',
          test: /(rc-*)/,
          priority: 10,
        },
      },
    });
    // gzip压缩
    config.plugin('commpression').use('compression-webpack-plugin', [
      {
        // deleteOriginalAssets: true, // 是否删除压缩前的文件，看情况配置
        algorithm: 'gzip', // 压缩算法，默认就是gzip
        test: /\.(js|css)(\?.*)?$/i, // 根据情况配置，此处仅压缩.js,.css
      },
    ]);
  },
  // externals: {
  //   react: 'React',
  //   'react-dom': 'ReactDOM',
  // },
  // headScripts: [
  //   'https://cdnjs.cloudflare.com/ajax/libs/react/17.0.2/umd/react.production.min.js',
  //   'https://cdnjs.cloudflare.com/ajax/libs/react-dom/17.0.2/umd/react-dom.production.min.js',
  // ],
});
