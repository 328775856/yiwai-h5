/**
 * 基础配置
 */
const base = require('./webpack.base');
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');


module.exports = {
    // 入口
    entry: {
        // photo: './src/page/photo/index.js',
        index: './src/page/index/index.js',
    },
    // 出口
    output: {
        filename: 'js/[name].[hash].js',
        // 打包动态导入的包的名字
        chunkFilename: 'js/[name].[hash].js',
        path: path.resolve(__dirname, 'dist'),
        publicPath: '/'
    },
    resolve: {
        extensions: ['.js', '.art', '.css', '.less', '.json'],
        alias: {
            'libs': path.resolve(__dirname, 'src/libs'),
        }
    },
    // loader
    module: {
        rules: [{
                test: /\.(png|jpe?g|gif)$/,
                use: [{
                    loader: 'url-loader',
                    options: {
                        limit: 10000,
                        name: 'imgs/[name].[hash:7].[ext]'
                    }
                }]
            }
            // , {
            //     test: /\.html$/,
            //     loader: 'html-withimg-loader'
            // }
        ]
    },
    // 插件
    plugins: [
        /*
         from 定义要拷贝的源目录 from: __dirname + ‘/src/public’
         to 定义要拷贝到的目标目录 from: __dirname + ‘/dist’
         toType file 或者 dir 可选， 默认是文件
         force 强制覆盖先前的插件 可选 默认false
         context 可选 默认base context可用specific context
         flatten 只拷贝文件不管文件夹 默认是false
         ignore 忽略拷贝指定的文件 可以用模糊匹配
         */
        new CopyWebpackPlugin([
            //  {
            //      from: path.resolve(__dirname, 'node_modules/jquery/dist/jquery.min.js'),
            //      to: 'static/js/'
            //  },
            {
                from: path.resolve(__dirname, 'node_modules/vue/dist/vue.min.js'),
                to: 'static/js/'
            },
            {
                from: path.resolve(__dirname, 'node_modules/babel-polyfill/dist/polyfill.min.js'),
                to: 'static/js/'
            }, {
                from: path.resolve(__dirname, 'src/static'),
                to: 'static'
            }
        ])
    ].concat([
        // new HtmlWebpackPlugin({
        //     title: '照片墙',
        //     filename: 'photo.html', //输出的html路径  
        //     template: './src/page/photo/index.html', //html模板路径  
        //     chunks: ['photo'], // 需要调用的模块
        //     chunksSortMode: 'manual' // 按照所写的打包chunks打包顺序
        // }),
        new HtmlWebpackPlugin({
            title: '详情页',
            filename: 'index.html',
            template: './src/page/index/index.html',
            chunks: ['index'],
            chunksSortMode: 'manual' // 按照所写的打包chunks打包顺序
        }),
    ]),
};