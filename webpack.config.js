const path = require('path') //подтягивает path из devDependencies

module.exports = {
    //точка входа, путь к входному файлу js
    entry: {
        app: './src/index.js' //стандарт, в src лежит весь исходный код
    },
    output: {
        filename: '[name].js', //[] на случай нескольких entry, текущий name берется из ярлыка в entry
        path: path.resolve(__dirname, './dist'), //webpack  всегда ищет точку выхода. начиная с корня проекта, 
        //чтобы искал корреткно, указывается path
        publicPath: '/dist'
    },
    module: {
        rules:[{ //array with objects
            test: /\.js$/, //parameters
            loader:  'babel-loader', //all .js files handle with this loader
            exclude: '/node_modules/' //for speeding compilation, exclude several files(many libraries are already processed with babel)
        }]
    },
    devServer: {
        overlay: true //shows errors not in console, but in browser screen, black background, red letters on error place
    }
}