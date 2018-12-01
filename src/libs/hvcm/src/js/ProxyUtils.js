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


var proxyUrl = function (url) {
  if (!url) return url;
  if (process.env.NODE_ENV == 'production') return url;

  if (!process.browser) return url

  hosts.map((item,index)=>{
    if(url.indexOf(item) == 0){
      url = url.replace('https:/','')
    }
  })

  return url
}

export default {
  proxyUrl
}

