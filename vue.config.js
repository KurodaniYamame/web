const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  /*
  devServer: {
    proxy: {
      '/api': {
        target: 'https://spark-api-open.xf-yun.com',
        changeOrigin: true,
        pathRewrite: { '^/api': '' },
      },
    },
  },*/
});
