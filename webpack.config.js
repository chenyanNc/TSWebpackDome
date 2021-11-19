// 引入一个包
const path = require('path')

// 引入 html 插件
const HTMLWebpackPlugin = require('html-webpack-plugin')


// 引入 clean 插件
const { CleanWebpackPlugin } = require('clean-webpack-plugin')




// webpack 中的所有的配置信息都应该写在 module.exports 中
module.exports = {

    // 指定入口文件
    entry: "./src/index.ts",

    // 指定打包文件所在目录
    output: {
        // 指定打包后的目录
        path: path.resolve(__dirname, 'dist'),

        // 打包后文件的文件名
        filename: "bundle.js",


        // 告诉 webpack 打包的时候不使用箭头函数
        // environment: {
        //     arrowFunction: false
        // }
    },


    // 指定 webpack 打包时要使用模块
    module: {

        // 指定要加载的规则
        rules: [{
            // test 指定规则生效的文件
            test: /\.ts$/,
            // 要使用的 loader
            use: [

                // 配置 babel
                {

                    // 指定加载器
                    loader: "babel-loader",

                    // 设置 babel
                    options: {

                        // 设置预定义的环境(假设代码要运行的浏览器环境)
                        presets: [
                            [
                                // 指定环境的插件
                                "@babel/preset-env",

                                // 配置信息
                                {
                                    // 要兼容的目标浏览器
                                    targets: {
                                        "chrome": "58",
                                        "ie": "11"
                                    },

                                    // 指定 corejs 的版本
                                    "corejs": "3",

                                    // 使用 corejs 的方式, "usage" 表示按需加载
                                    "useBuiltIns": "usage"

                                }
                            ]
                        ]

                    }

                },

                'ts-loader',
            ],
            // 要排除的文件
            exclude: /node_modules/
        }]

    },

    // 配置 webpack 插件
    plugins: [

        new CleanWebpackPlugin(),

        new HTMLWebpackPlugin({

            // 自定义生成的 html 文件的 title
            // title: '这是一个自定义的title'

            // 给生成的 html 文件设置模板, 按照模板生成 一样的 html 文件
            template: './src/index.html'
        })
    ],

    // 用来设置引用模块 (这样配置自后, 里面索设置的文件类型可以作为模块引用)
    resolve: {
        extensions: ['.ts', '.js']
    }

}