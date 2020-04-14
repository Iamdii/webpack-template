const path = require('path') //подтягивает path из devDependencies
const MiniCssExtractPlugin = require('mini-css-extract-plugin') //образение к package.json
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const PATHS = { //изменив эти константы тут, они автоматичесски меняются и в дев, и в билд
    src: path.join(__dirname, '../src'),
    dist: path.join(__dirname, '../dist'),
    assets: 'assets/' 

}

module.exports = {

    externals: { //обращение к дев и билд
        paths: PATHS //доступ к константе из других конфигов, если этого не сделать, придется константы копировать в dev/build
    },
    //точка входа, путь к входному файлу js
    entry: {
        app: PATHS.src //стандарт, в src лежит весь исходный код
        //можно не указывать index.js, вебпак сам поймет 
        //можно писать через PATHS
    },
    output: {
        filename: `${PATHS.assets}js/[name].js`, //[] на случай нескольких entry, текущий name берется из ярлыка в entry
        path: PATHS.dist, //webpack  всегда ищет точку выхода. начиная с корня проекта, 
        //чтобы искал корреткно, указывается path
        publicPath: '/'
    },
    module: {
        rules:[{ //array with objects
            test: /\.js$/, //parameters
            loader:  'babel-loader', //all .js files handle with this loader
            exclude: '/node_modules/' //for speeding compilation, exclude several files(many libraries are already processed with babel)
        }, { 
            test: /\.(png|jpg|gif|svg)$/, 
            loader:  'file-loader', //all .img files handle with this loader
            options: {
                name: '[name].[ext]'
            }
        },  { 
            test: /\.(mp3)$/, 
            loader:  'file-loader', //all .img files handle with this loader
            options: {
                outputPath: 'audio',
                name: '[name].[ext]'
            }
        }, {
            test: /\.css$/, 
            use: [
                MiniCssExtractPlugin.loader, 
                'css-loader'
            ], //помогает разделить css и js
        }]
    },
    plugins: [
        new MiniCssExtractPlugin({
          // Options similar to the same options in webpackOptions.output
          // both options are optional
          filename: `${PATHS.assets}css/[name].css` //ссылается на ярлык app сверху, т.е. на выходе будем иметь app.css
        }),
        new HtmlWebpackPlugin({
            hash: false,
            template: `${PATHS.src}/index.html`,
            filename: './index.html'
        }),
        new CopyWebpackPlugin([
            { from: `${PATHS.src}/img`, to:  `${PATHS.assets}img` },
            { from: `${PATHS.src}/audio`, to:  `${PATHS.assets}audio` }
        ])
    ],
}