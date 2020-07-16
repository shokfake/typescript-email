
const devPort = process.env.VUE_APP_PORT

module.exports = {
    devServer: {
        port: devPort,
        host: '0.0.0.0'
    },
    lintOnSave: process.env.NODE_ENV !== 'production' ? true : false
}