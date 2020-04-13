const path = require('path') //подтягивает path из devDependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //образение к package.json

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
        }, {
            test: /\.css$/, 
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ], //помогает разделить css и js
        }]
    },
    devServer: {
        overlay: true //shows errors not in console, but in browser screen, black background, red letters on error place
    }, 
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: '[name].css' //ссылается на ярлык app сверху, т.е. на выходе будем иметь app.css
        }),
      ],
}