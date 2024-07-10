
module.exports = {
  lintOnSave: false,
  transpileDependencies: false,
  devServer: {
    proxy: {
      '/gangqu': {
        target: '  http://172.16.28.51:8889/gangqu',
        changeOrigin: true,
        pathRewrite: {
          '/gangqu': ''
        }
      }
    }
  },
  // chainWebpack: config => {
  //   config.module
  //   .rule('vue')
  //    .use('vue-loader')
  //     .loader('vue-loader')
  //     .tap(options => {
  //       options.unknownContextCritical = false
  //       return options
  //     })
  // }
}
