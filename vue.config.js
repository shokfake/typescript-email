
const devPort = process.env.VUE_APP_PORT
const backEndServer = process.env.VUE_APP_BASE
const proxyPath = process.env.VUE_APP_PATH

module.exports = {
    devServer: {
        port: devPort,
        host: '0.0.0.0',
        proxy: {
            '/coremail/s': {
                target: backEndServer,
                changeOrigin: true,
                secure: false
              },
              '/coremail/common': {
                target: backEndServer,
                changeOrigin: true,
                secure: false
              },
              '/coremail/*.jsp': {
                target: backEndServer,
                changeOrigin: true,
                secure: false
              },
              '/coremail/cmcu_addon/*.jsp': {
                target: backEndServer,
                changeOrigin: true,
                secure: false
              },
              '/coremail/bundle': {
                target: backEndServer,
                changeOrigin: true,
                secure: false
              }
        }
    },
    lintOnSave: true
}