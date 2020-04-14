const webpack = require('webpack')
const merge = require('webpack-merge')
const baseWebpackConfig = require('./webpack.base.conf')

const devWebpackConfig = merge(baseWebpackConfig, {
    mode: 'development',
    devServer: {
        contentBase:  baseWebpackConfig.externals.paths.dist, //отвечает за то, где будет открываться вебпак
        port: 8082, //по дефолту 8080, так как иногда работаем со вторым сервером, слушает сервер 8080, если он занят - будет ошибка
        overlay: { //shows errors not in console, but in browser screen, black background, red letters on error place
            warnings: true,
            errors: true
        } 
    },
    plugins: []
})

module.exports = new Promise((resolve, reject) => {
    resolve(devWebpackConfig)
})

