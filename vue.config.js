const path = require('path')
module.exports = {
    // 基本路径
    publicPath: process.env.NODE_ENV === 'production' ? '' : './',
    // 输出文件目录
    outputDir: process.env.NODE_ENV === 'production' ? 'dist' : 'devdist',
    devServer: {
        host: '0.0.0.0',
        port: 3333,
        https: false, // 编译失败时刷新页面
        hot: true, // 开启热加载
        hotOnly: false
        // proxy: {
        //     [process.env.VUE_APP_API]: {
        //         target: process.env.VUE_APP_DEV_TARGET, //API服务器的地址
        //         changeOrigin: true,
        //         pathRewrite: {
        //             [`^${process.env.VUE_APP_API}`]: ''
        //         }
        //     }
        // }
    },
    chainWebpack: config => {
        // 修复HMR
        config.resolve.symlinks(true)
    },
    publicPath: './',
    css: {
        sourceMap: true // 开启 CSS source maps
    }
}
