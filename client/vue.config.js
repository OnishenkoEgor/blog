const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    proxy: {
      '^/api':{
        target:'http://localhost:8002',
        changeOrigin: true,
        logLevel: "debug",
        pathRewrite: { "^/api": "/" }
      }
    }
  }
})
