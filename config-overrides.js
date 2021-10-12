//config-overrides.js文件为【create-react-app】脚手架创建的项目之后的一个webpack的配置文件
//用于修改webpack默认配置
const {
  override,
  overrideDevServer,
  addWebpackAlias,
  fixBabelImports,
  addLessLoader
} = require('customize-cra')
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin
//Moment 替换 Day
const AntdDayjsWebpackPlugin = require('antd-dayjs-webpack-plugin')
const webpack = require('webpack')
const path = require('path')
const darkThemeVars = require('antd/dist/dark-theme')
const ESLintPlugin = require('eslint-webpack-plugin');
console.log('process.env.BASE_API==>', process.env.BASE_API)
// 打包体积优化
const addOptimization = () => (config) => {
  if (process.env.NODE_ENV === 'production') {
    config.optimization = {
      splitChunks: {
        chunks: 'all',
        minSize: 30000,
        maxSize: 0,
        minChunks: 1,
        maxAsyncRequests: 5,
        maxInitialRequests: 3,
        automaticNameDelimiter: '~',
        name: true,
        cacheGroups: {
          vendors: {
            test: /[\\/]node_modules[\\/]/,
            priority: 10
          },
          default: {
            minChunks: 2,
            priority: -10,
            reuseExistingChunk: true
          }
        }
      }
    }
    // 是否开启sourceMap
    config.devtool = process.env.NODE_ENV !== 'production';
    config.push(new ESLintPlugin({
      fix:true
    }))
    // 添加js打包gzip配置
    config.plugins.push(
      new AntdDayjsWebpackPlugin(),
      new CompressionWebpackPlugin({
        test: /\.js$|\.css$/,
        threshold: 1024
      }),
      new webpack.optimize.AggressiveMergingPlugin(), //合并块
      new webpack.optimize.ModuleConcatenationPlugin()
    )
    // 分析打包大小
    if (process.env.NODE_ENV === 'production') {
      // config.plugins.push(new BundleAnalyzerPlugin({ analyzerPort: 7777 }));
    }
  }
  return config
}

const devServe = () => (config) => {
  return {
    ...config,
    hot: true,
    open: true, // 是否自动打开浏览器
    proxy: {
      // 配置代理（只在本地开发有效，上线无效）
      '/api': {
        target: 'http://baidu.com', // 这是本地用node写的一个服务，用webpack-dev-server起的服务默认端口是8080
        pathRewrite: {
          // 后台在转接的时候url中是没有 /api 的
          '/api': ''
        },
        changeOrigin: true // 加了这个属性，那后端收到的请求头中的host是目标地址 target
      }
    }
  }
}

module.exports = {
  webpack: override(
    // 配置路径别名
    addWebpackAlias({
      '@': path.resolve('src')
    }),
    addOptimization(),
    // 针对antd 实现按需打包：根据import来打包 (使用babel-plugin-import)
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true //自动打包相关的样式 默认为 style:'css'
    }),
    // 使用less-loader对源码重的less的变量进行重新制定，设置antd自定义主题
    addLessLoader({
      javascriptEnabled: true,
      modifyVars: {
        hack: `true;@import "${require.resolve(
          'antd/lib/style/color/colorPalette.less'
        )}";`,
        ...darkThemeVars,
        '@primary-color': '#6e41ff'
      },
      localIdentName: '[local]--[hash:base64:5]'
    })
  ),
  devServer: overrideDevServer(devServe())
}
