/**
 * 开发环境配置
 */
const merge = require('webpack-merge');
const base = require('./webpack.base');
const webpack = require('webpack');
module.exports = merge(base, {
    // 开启调试模式
    devtool: 'source-map',
    // loader
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /(node_modules|bower_components)/,
            use: {
                loader: 'babel-loader',
            }
        }, {
            test: /\.(less|css)$/,
            use: [{
                    // 加载失败的时候调用
                    loader: "style-loader"
                },
                {
                    loader: "css-loader",
                    options: {
                        // 解释1：这里的数量指的是当前loader之后loader的数量（“之后”说的是在表达中当前loader之后）。等于1是说，当前loader之后的一个loader。如果是n就是n个loader。
                        // 解释2：参数importLoaders=1是为了预防css文件里面再import其他css文件，会使得import进来的不会自动加前缀
                        importLoaders: 1,
                    }
                },
                {
                    loader: 'postcss-loader'
                }, {
                    loader: "less-loader"
                },
            ],

        }, ]
    },
    // 插件
    plugins: [
        // 模块热替换
        new webpack.HotModuleReplacementPlugin(),
        // 当开启 HMR 的时候使用该插件会显示模块的相对路径，建议用于开发环境
        new webpack.NamedModulesPlugin(),
    ],

    // 开启服务 默认8080端口号
    devServer: {
        contentBase: './dist',
        hot: true,
        compress: true,
        host: '192.168.30.109', // 本机ip
        port: 8080
    },

});