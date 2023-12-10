/*
*   @Author: BestRivenNA
*   @Date: 2023-11-16 10:05:21
*   @FileName: webpack.config.js
*/
const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    // 指定入口文件
    entry: "./src/index.ts",
    // 指定打包文件输出配置
    output: {
        // 指定打包文件的目录
        path: __dirname + '/dist',
        // 打包后的文件名
        filename: "bundle.js",
        // 告诉 webpack 不适用箭头函数
        environment: {
            arrowFunction: true
        }
    },
    // 指定 webpack 打包时要使用的模块
    module: {
        // 指定要加载的规则
        rules: [
            {
                // test 指定的是规则生效的文件
                test: /\.ts$/,
                // 要使用的 loader
                use: [
                    // 高级配置
                    {
                        // 指定加载器
                        loader: "babel-loader",
                        // 设置 babel 具体配置选项
                        options: {
                            // 设置预定义的环境
                            presets: [
                                [
                                    // 指定环境的插件
                                    "@babel/preset-env",
                                    // 配置信息
                                    {
                                        // 要兼容的目标浏览器
                                        targets: {
                                            "chrome": "88"
                                        },
                                        // 指定 corejs 版本
                                        "corejs": "3",
                                        // 使用 corejs 的方式 "usage" 表示按需加载
                                        "useBuiltIns": "usage"
                                    }
                                ]
                            ]
                        }
                    },
                    // 'babel-loader',  // 简单配置
                    'ts-loader'
                ],
                // 要排除的文件
                exclude: /node_modules/
            },
            // 配置 less 预处理器
            {
                test: /\.less$/,
                use: [
                    "style-loader",
                    "css-loader",
                    // 引入 post
                    {
                        loader: "postcss-loader",
                        options: {
                            postcssOptions: {
                                plugins: [
                                    [
                                        "postcss-preset-env",
                                        {
                                            browsers: "last 2 versions"
                                        }
                                    ]
                                ]
                            }
                        }
                    },
                    "less-loader"
                ],
                exclude: /node_modules/
            }
        ]
    },
    // 配置 webpack 插件
    plugins: [
        new CleanWebpackPlugin(),
        // 自动生成 html 文件，并将打包的 js 文件引入
        new HTMLWebpackPlugin({
            // title: "欢迎来到德莱联盟...",
            template: "./src/index.html"
        }),
    ],
    // 原来设置引用模块
    resolve: {
        extensions: ['.ts', '.js']
    },
    mode: "development",    // Set 'mode' option to 'development' or 'production'
    watch: true
}















