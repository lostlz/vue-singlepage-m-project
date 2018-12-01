import axios from 'axios'
import cache from "./$Cache";
import proxyUtils from './ProxyUtils'


var urlClick = 'https://data.dighouse.com/rpStat/appClick'
var urlPv = 'https://data.dighouse.com/rpStat/appPV'
var urlTime = 'https://data.dighouse.com/rpStat/appTime'

var currentRoute = null//当前路由
var cacheKey = 'hnb_click_data'
var isPosting = false //是否正在循环上报


var OPTION = {
  appVersion: '0.0.0',//项目版本号
  client: 'pc',
  business_type: 1,//业务类型: 1.移民,2.海房
  channel: null,//渠道号
  pageId: {},
}

//创建新的实例
var axiosReport = null

function request(url, data) {
  if (!axiosReport) {
    //创建新的实例
    axiosReport = axios.create()
    axiosReport.defaults.withCredentials = true
    axiosReport.interceptors.request.use(
      config => {
        config.url = proxyUtils.proxyUrl(config.url)
        return config;
      }
    );
  }

  return axiosReport.post(url, data)
}


function getPageId(route) {
  let id = '0000'
  try {
    id = OPTION.pageId[route.name]
  } catch (e) {

  }
  return id
}

function getDetailId(route) {
  let id = ''
  try {
    if (route.query.id && route.query.id != '') {
      id = to.query.id
    }
    if (route.params.id && route.params.id != '') {
      id = route.params.id
    }
  } catch (e) {
  }
  return id
}

/**
 * 海房pageid:1开头，移民2开头
 * @param pageId
 * @returns {number}
 */
function getBusinessType(pageId) {
  if(!pageId || pageId==''){
    return OPTION.business_type
  }

  if((pageId+'').indexOf('1') == 0){
    return 2
  }else if((pageId+'').indexOf('2') == 0){
    return 1
  }

  return OPTION.business_type
}

//获取请求url参数
function getUrlQuery(name) {
  let href = window.location.href

  if (href.indexOf('?') == -1) {
    return null
  }

  let search = decodeURI(href.split('?')[1]);

  var vars = search.split("&");
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split("=");
    if (pair[0] == name) {
      return pair[1];
    }
  }
  return null;
}

function checkParams(params) {
  if (!params) throw new Error('params 不能为空！')
  if (!params.click_id) throw new Error('params.click_id 不能为空！')
}


function getPagePath() {
  let url = document.location.toString();
  let arrUrl = url.split("//");

  let start = arrUrl[1].indexOf("/");
  let relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符

  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}

function getClickData(params) {
  let pageId = getPageId(currentRoute)
  return {
    click_id: params.click_id,
    page_id: pageId,
    detail_id: getDetailId(currentRoute),
    rp_time: new Date().getTime() / 1000,
    mark: params.mark,
    client: OPTION.client,
    ver: OPTION.appVersion,
    business_type: getBusinessType(pageId),
    feature: getFeature(),
    attr: params.attr,
  }
}

function getFeature() {
  return {
    cid: cache.getSession('hnb_cid', '0000'),
  }
}

function getPlatform() {
  var userAgent = navigator.userAgent;
  var device = ""; //当前设备信息
  if (userAgent.indexOf('Android') > -1 || userAgent.indexOf('Linux') > -1) {//安卓手机
    device = "android";
  } else if ((userAgent.match(/iPhone/i) != null) || (userAgent.match(/iPad/i) != null)) {//苹果手机
    device = "ios";
  } else if (userAgent.indexOf('Windows Phone') > -1) {//winphone手机
    device = "indowsphone";
  }
  return device
}

/**
 *  保存点击事件数据到缓存
 * @param data
 */
function saveClickData(data) {
  let clickDelay = cache.get(cacheKey, [])
  clickDelay.push(getClickData(data))
  cache.set(cacheKey, clickDelay)
}


/**
 *  从缓存获取第一个点击数据，如果没有返回undefined
 * @returns {*}
 */
function getFirstClickData() {
  let clickDelay = cache.get(cacheKey, [])
  return clickDelay[0]
}

/**
 * 删除第一个数据
 * @return {boolean} 删除的数据
 */
function removeFirstClickData() {
  let removeData = false
  let clickDelay = cache.get(cacheKey, [])
  if (clickDelay.length > 0) {
    removeData = clickDelay.shift()
    cache.set(cacheKey, clickDelay)
  }

  return removeData
}

export default {
  /**
   * 初始化项目版本号和名称，
   * 在main.js里面调用
   * @param appVersion 项目版本号,默认：0.0.0
   * @param pageIdObj  用来统计pageId，默认：{}
   */
  init: function (option) {
    if (option == null) throw new Error('option 不能为空！')

    if (!option.hasOwnProperty('appVersion')) throw new Error('appVersion 不能为空！')
    if (!option.hasOwnProperty('pageId')) throw new Error('pageIdObj 不能为空！')

    this.setCid(getUrlQuery('cid'))

    OPTION.appVersion = option.appVersion
    OPTION.pageId = option.pageId
    if (option.hasOwnProperty('client')) {
      OPTION.client = option.client
    }

  },

  /**
   * 单页面应用在 router.afterEach 钩子函数中调用
   * @param to
   * @param from
   * @param base 路由base参数
   */
  routerAfterEach: function (to, from) {
    currentRoute = to
    this.pv(currentRoute)
  },
  /**
   *
   * @param detail_id
   * @param route 当前route
   * @param mark
   */
  pv: function (route) {
    let pageId = getPageId(route)
    request(urlPv, {
      page_id: pageId,
      detail_id: getDetailId(route),
      rp_time: new Date().getTime() / 1000,
      mark: window.location.href,
      client: OPTION.client,
      ver: OPTION.appVersion,
      business_type: getBusinessType(pageId),
      feature: getFeature(),
    })

    this.startPost()
  },
  click: function (params) {
    checkParams(params)

    saveClickData(getClickData(params))
    this.startPost()
  },

  setCid: function (cid) {
    cache.setSession('hnb_cid', cid == null ? '0000' : cid)
  },

  getCid: function () {
    return cache.getSession('hnb_cid', '0000')
  },

  /**
   * @param bid
   * @param cid 获客cid
   * @returns {string}
   */
  getCRMCid: function (bid, cid) {
    if (!bid || bid == '') {
      bid = '0000'
    }
    if (!cid || cid == '') {
      cid = '0000'
    }
    return this.getCid() + '--' + bid + '--pc--' + cid
  },

  startPost: function () {
    if (isPosting) {
      return
    }

    let data = getFirstClickData()
    if (data) {
      isPosting = true

      setTimeout(() => {
        request(urlClick, data).then(data => {
          removeFirstClickData()
          isPosting = false
          this.startPost()
        }).catch(error => {
          isPosting = false
        })

      }, 1000)
    }
  },

}



