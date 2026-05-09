
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
                    target: 'https://lty-s3.s3.ap-east-1.amazonaws.com',
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