module.exports = {
    devServer: {
        proxy: {
            "/baidu_music_api": {
                target: "http://tingapi.ting.baidu.com", //对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/baidu_music_api':''
                }
            }
        }
    },
    publicPath: './'
}