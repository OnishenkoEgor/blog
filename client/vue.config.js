const { defineConfig } = require('@vue/cli-service')
module.exports = {
  devServer: {
    proxy: {
      '^/api': {
        target: 'http://localhost:8002/',
        pathRewrite: { "^/api": "/" },
        changeOrigin: true,
        logLevel: "debug",
      }
    }
  }
}
