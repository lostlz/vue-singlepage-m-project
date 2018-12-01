const ProxyTable = require('./src/libs/hvcm/src/js/ProxyTable')

/*
* 页面访问路径：https://m.hinabian.com/ctrip/
* */
const host = 'https://m.hinabian.com' //页面的域名
const basePath = '/ctrip/'//页面的路径
const cdnPath = 'https://cache.hinabian.com/vueres'//资源文件访问的域名路径

const isProduction = process.env.NODE_ENV === 'production'
const indexPath =  host.replace('https://','') +  basePath  //index.html打包的路径
const resCommonPath = cdnPath.replace('https://','') + basePath //js、css打包的路径
const baseUrl = isProduction ? 'https://' : '/'


module.exports = {
  baseUrl: baseUrl,
  assetsDir: resCommonPath,
  productionSourceMap: false,
  indexPath: indexPath + '/index.html',

  css: {
    extract: {
      filename: resCommonPath + '[name]/[hash].css',
      chunkFilename: resCommonPath + '[name]/[hash].css'
    }
  },

  chainWebpack: (config) => {
    if (isProduction) {

      config.output
          .filename(resCommonPath + '[name]/[hash].js')
          .chunkFilename(resCommonPath + '[name]/[hash].js')


      //解决build后index.html中没有引号的问题
      config.plugin('html').init((Plugin, args) => {
        const newArgs = {
          ...args[0],
        };
        newArgs.minify.removeAttributeQuotes = false;
        return new Plugin(newArgs);
      });


      //解决字体@font-face url路径问题,暂时打包到www域名，字体跨域问题还没解决
      // config.module.rule('fonts')
      //     .test(/\.(woff2?|eot|ttf|otf)(\?.*)?$/i)
      //     .use('url-loader')
      //     .loader('url-loader')
      //     .options({
      //       limit: 4096,
      //       publicPath:'https://',
      //       name: resCommonPath+'fonts/[name].[hash].[ext]'
      //     })
    }
  },

  devServer: {
    host: '0.0.0.0',
    port: 8881,//设置域名
    proxy: ProxyTable,

    /**
     * 重定向匹配路径
     */
    // historyApiFallback: {
    //   rewrites: [
    //     {from: /\/ctrip\/.*/, to:'/ctrip/' },
    //   ],
    // },
  },

}