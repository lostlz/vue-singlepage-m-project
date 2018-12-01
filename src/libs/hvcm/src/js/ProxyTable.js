/**
 * 用来解决跨域问题
 * @type {{proxyUrl: ProxyUtils.proxyUrl}}
 */

var hosts = [
  'https://data.hinabian.com',
  'https://api.hinabian.com',
  'https://m.hinabian.com',
  'https://www.hinabian.com',
  'https://api.dighouse.com',
  'https://data.dighouse.com',
]


var ProxyTable = {}
hosts.map((item,index)=>{
  let key = item.replace('https:/','')
  let pathRewrite = {}
  pathRewrite['^' + key] = '/'

  ProxyTable[key] = {
    target: item,
    secure: false, // 接受 运行在 https 上的服务
    changeOrigin: true,
    pathRewrite: pathRewrite, // 重写路径
  }
})


module.exports = ProxyTable;
