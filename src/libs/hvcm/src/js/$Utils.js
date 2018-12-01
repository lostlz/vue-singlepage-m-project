/*
*
* 纯util工具类，不涉及业务逻辑
*
*/
import qs from 'qs'
import NuxtUtils from "./NuxtUtils";



var Utils = {}

/**
 * 等额本息计算，月还款额(月供)
 * 月还款额=本金*月利率*(1+月利率)^n/[(1+月利率)^n-1]
 * @param loanPrice  贷款本金
 * @param rate 月利率  （年利率/12）
 * @param refundMonths 还款月数
 * @returns {number}
 */
Utils.PMT = function (loanPrice, rate, n) {
  let pmt = loanPrice * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1)
  return pmt
}


Utils.formatTime = function (date) {
  var year = date.getFullYear()
  var month = date.getMonth() + 1
  var day = date.getDate()

  var hour = date.getHours()
  var minute = date.getMinutes()
  var second = date.getSeconds()


  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

Utils.formatNumber = function (n) {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/**
 * 合并对象
 * 1.循环对象n中的每一个对应属性。
 2.确认对象n中存在该属性
 3.确认对象o中不存在该属性
 * @param o   将n的属性设置到o中
 * @param n  被循环的对象
 */
Utils.extend = function (o, n) {
  for (var p in n) {
    if (n.hasOwnProperty(p) && (!o.hasOwnProperty(p)))
      o[p] = n[p];
  }
};

/**
 * 判断是否null
 * @param data
 */
Utils.isEmpty = function (data) {
  return (data == "" || data == undefined || data == null);
}

/**
 * 验证国内手机号
 */
Utils.chineseMobile = function (mobile) {
  return !Utils.isEmpty(mobile) && /^(1[3-9][0-9])\d{8}$/.test(mobile);
}

Utils.checkVCode = function (code) {
  return !Utils.isEmpty(code) && /^\d{6}$/.test(code);
}

Utils.querySubstrFromString = function (json) {
  var rlt = true;
  for (var p in json) {
    if (json[p].length <= 0) {
      rlt = false;
      break;
    }
  }
  return rlt;
}

Utils.call400 = function () {
  console.log('call400:4009933922')
  if (NuxtUtils.isBrowser()) {
    window.location.href = 'tel:4009933922'
  }

}

Utils.call400HaiFang = function () {
  console.log('call400HaiFang:4009933922,2')
  if (NuxtUtils.isBrowser()) {
    window.location.href = 'tel:4009933922,2'
  }
}

Utils.gotoMeiqiaHaiFang = function () {
  if (NuxtUtils.isBrowser()) {
    window.location.href = 'https://static.meiqia.com/dist/standalone.html?_=t&eid=131398&fallback=1'
  }
}


Utils.randomInt = function (n, m) {
  var random = Math.floor(Math.random() * (m - n + 1) + n);
  return random;
}


/**
 * 保留n位小数
 * @param number
 * @param n
 * @returns {number}
 */
Utils.round = function (number, n) {
  var t = 1;
  for (; n > 0; t *= 10, n--) ;
  for (; n < 0; t /= 10, n++) ;
  return Math.round(number * t) / t;
}

/**
 * 等额本息计算，月还款额(月供)
 * 月还款额=本金*月利率*(1+月利率)^n/[(1+月利率)^n-1]
 * @param loanPrice  贷款本金
 * @param rate 月利率  （年利率/12）
 * @param refundMonths 还款月数
 * @returns {number}
 */
Utils.PMT = function (loanPrice, rate, n) {
  let pmt = loanPrice * rate * Math.pow(1 + rate, n) / (Math.pow(1 + rate, n) - 1)
  return pmt
}

Utils.htmlNoScroll = function () {
  document.documentElement.style.height = '100%';
  document.documentElement.style.overflow = 'hidden';
  document.body.style.height = '100%';
  document.body.style.overflow = 'hidden';
}
Utils.htmlNoScrollReset = function () {
  document.documentElement.style.height = '';
  document.documentElement.style.overflow = '';
  document.body.style.height = '100%';
  document.body.style.overflow = '';
}

//获取请求url参数
Utils.getUrlQuery = (name) => {
  if (!NuxtUtils.isBrowser()) {
    return null
  }
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
  var search = decodeURI(window.location.search);
  var r = search.substr(1).match(reg);
  if (r != null)
    return unescape(r[2]);
  return null;
}


/**
 * 获取请求url所有参数
 * @returns 返回对象
 */
Utils.getUrlAllQuery = () => {
  if (!NuxtUtils.isBrowser()) {
    return null
  }
  let search = window.location.search
  if (search != null && search != '' && search != '?') {
    search = search.replace('?', '')
    return qs.parse(search)
  }
  return null
}

Utils.getCurrentUrlClearParams = () => {
  if (!NuxtUtils.isBrowser()) {
    return null
  }
  let url = window.location.href
  return url.split('?')[0]
}

Utils.pxDPI = function (px) {
  if (!NuxtUtils.isBrowser()) {
    return 0
  }
  px = parseInt(px)
  let dpi = window.devicePixelRatio
  return px / dpi
}

/**
 * 动态加载js文件
 * @param url
 * @param callback 加载完成后回调
 */
Utils.LoadScript = function (url, callback) {
  var scriptNode = document.createElement("script");
  scriptNode.setAttribute("type", "text/javascript");
  scriptNode.setAttribute("src", url);
  document.head.appendChild(scriptNode);

  scriptNode.onload = scriptNode.onreadystatechange = function () {
    if (!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
      scriptNode.onload = scriptNode.onreadystatechange = null;
      if (callback && typeof(callback) == 'function') {
        callback();//window[callback]();如果传递字符串过来  调用window['函数名']() 调用方法
      }
    }
  };
}

var SystemInfo = null
var rpxRatio = null
/**
 * 小程序rpx转化为px
 */
Utils.rpx2px = function (rpx) {
  if (!rpxRatio) {
    if (!SystemInfo) {
      SystemInfo = wx.getSystemInfoSync()
    }
    rpxRatio = SystemInfo.windowWidth / 750
  }
  return rpxRatio * rpx
}

/**
 *
 * @param isSmoothscroll 是否平滑滚动，默认true
 * @returns {null}
 */
Utils.scrollTop = function (isSmoothscroll=true) {
  if (!NuxtUtils.isBrowser()) {
    return null
  }

  if(isSmoothscroll){
    (function smoothscroll() {
      var currentScroll = document.documentElement.scrollTop || document.body.scrollTop;
      if (currentScroll > 0) {
        window.requestAnimationFrame(smoothscroll);
        window.scrollTo(0, currentScroll - (currentScroll / 5));
      }
    })();
  }else{
    console.log('scrollTop-------')
    window.scrollTo(0, 0);
  }


}

/**
 * 价格除以1万：100000返回10
 * @param price
 * @param showWang 是否显示 ‘万’
 * @param n 保留n位小数
 */
Utils.price2Wang = function (price, n, showWang) {
  let priceNum = Number.parseFloat(price)

  priceNum = priceNum / 10000
  priceNum = this.round(priceNum, n)

  return showWang ? priceNum + '万' : priceNum
}

/**
 *  获取富文本纯文本
 * @param html
 * @returns {*}
 */
Utils.getSimpleText = function (html) {
  if (!html || html == '') {
    return ''
  }
  var re1 = new RegExp("<.+?>", "g");//匹配html标签的正则表达式，"g"是搜索匹配多个符合的内容
  var msg = html.replace(re1, '');//执行替换成空字符
  return msg;
}


/**
 * 获取URL的筛选参数
 * @param testParams
 * @param key
 * @returns {Array}
 */
Utils.getUrlFilterValue = function (testParams, key) {
  let reg = new RegExp(key + "\\d+", "ig");
  let match = []
  let result = reg.exec(testParams)
  while (result) {
    match.push(result[0].replace(key,''))
    result = reg.exec(testParams)
  }

  return match
}

Utils.getUrlFilterKeyword = function (testParams, key) {
  let reg = new RegExp(key + "(.)+$", "ig");
  let match = []
  let result = reg.exec(testParams)
  while (result) {
    match.push(result[0].replace(key,''))
    result = reg.exec(testParams)
  }

  return match
}

export default Utils
