const path = require('path')
function resolve(dir) {
    return path.join(__dirname, dir)
}
module.exports = {
    devServer: {
        proxy: {
            '/api/getDiscList': {
                target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/getDiscList': ''
                }
            }
        }
    },
    chainWebpack: (config) => {
        config.resolve.alias
            .set('@', resolve('src'))
            .set('common', resolve('src/common'))
            .set('components', resolve('src/components'))
            .set('base', resolve('src/base'))
            .set('api', resolve('src/api'))
    }
}