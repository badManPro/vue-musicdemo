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
            },
            '/api/getSingerList': {
                target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/getSingerList': ''
                }
            },
            '/api/getSingerDetail': {
                target: 'https://c.y.qq.com/v8/fcg-bin/fcg_v8_singer_track_cp.fcg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/getSingerDetail': ''
                }
            },
            '/api/getTopList': {
                target: 'https://c.y.qq.com/v8/fcg-bin/fcg_myqq_toplist.fcg',
                ws: true,
                changeOrigin: true,
                pathRewrite: {
                    '^/api/getTopList': ''
                }
            },
            '/api/getMusicList': {
                target: 'https://u.y.qq.com/cgi-bin/musicu.fcg',
                ws: true,
                changerOrigin: true,
                pathRewrite: {
                    '^/api/getMusicList': ''
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