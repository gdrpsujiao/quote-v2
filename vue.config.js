
const path = require('path')

function resolveSrc(_path) {
    return path.resolve(__dirname, _path)
}

module.exports = {
    publicPath: './',
    configureWebpack: {
        resolve: {
            extensions: ['.js', '.json', '.vue'],
            alias: {
                '@': resolveSrc('./src'),
                '@assets': resolveSrc('./src/assets')
              }
        },
        devServer: {
            proxy: {
                '/49_tk': {
                    target: 'https://baidu.com',
                    changeOrigin: true
                }
            }
        }
    },
    css: {
        loaderOptions: {
            sass: {
                prependData: '@import "@/assets/css/variable.scss";'
            }
        }
    }
}