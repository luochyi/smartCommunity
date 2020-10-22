module.exports = {
    devServer: {
        host: '0.0.0.0',
        port: 3333
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
