/**
 * 生产环境配置
 */
const merge = require('webpack-merge');
const base = require('./webpack.base');
// const path = require('path');
// const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractCss = new ExtractTextPlugin({
    filename: 'css/[name].[contenthash].css',
});
module.exports = merge(base, {
    // 开启调试模式
    devtool: false,
    // loader
    module: {
        rules: [{
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                }
            },
            //  从后往前执行loader 
            {
                test: /\.(less|css)$/,
                use: extractCss.extract({
                    use: [{
                            loader: "css-loader",
                            options: {
                                //  参数importLoaders=1是为了预防css文件里面再import其他css文件，会使得import进来的不会自动加前缀
                                importLoaders: 1,
                                minimize: true //css压缩,可以合并同样的css样式
                            }
                        },
                        {
                            loader: 'postcss-loader'
                        }, {
                            loader: "less-loader"
                        }
                    ],
                    // 加载失败的时候调用
                    fallback: "style-loader"
                })
            },

        ]
    },
    // 插件
    plugins: [
        // 解析css后，打包分离
        extractCss,
        // 打包前清除dist
        new CleanWebpackPlugin(['dist']),

        // 压缩————摇树优化【在文件里有多个方法的时候import其中一个方法，其他方法将不会被引入】
        new UglifyJsPlugin({
            uglifyOptions: {
                compress: {
                    warnings: false,
                    drop_debugger: true,
                    drop_console: true
                },
                // 修复safari的bug
                mangle: {
                    safari10: true
                }
            },
            //   sourceMap: true,
            //   parallel: true
        }),

        // 打包node_modules提供的第三方库【注意node_modules路径】
        /*
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vender',
            minChunks(module) {
                return (
                    module.resource &&
                    /\.js$/.test(module.resource) &&
                    module.resource.indexOf(
                        path.join(__dirname, './node_modules')
                    ) === 0
                )
            }
        }),
        //  打包一些需要动态引入的js包 【runtime】
         new webpack.optimize.CommonsChunkPlugin({
             name: 'manifest',
             minChunks: Infinity
         }),
        */
    ],
});