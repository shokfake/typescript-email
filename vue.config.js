
const devPort = process.env.VUE_APP_PORT
const backEndServer = process.env.VUE_APP_BASE
const proxyPath = process.env.VUE_APP_PATH

module.exports = {
    devServer: {
        port: devPort,
        host: '0.0.0.0',
        proxy: {
           
        }
    },
    lintOnSave: true
}