/*
* 本地文件缓存：
*
* localStorage:生命周期是永久，这意味着除非用户显示在浏览器提供的UI上清除localStorage信息，否则这些信息将永远存在。
* 存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。
*
* android ios需要webview开启文件缓存
* mWebView.getSettings().setDomStorageEnabled(true);
* mWebView.getSettings().setAllowFileAccess(true);
* mWebView.getSettings().setAppCacheEnabled(true);
*
* * sessionStorage:仅在当前会话下有效，关闭页面或浏览器后被清除。
* 存放数据大小为一般为5MB,而且它仅在客户端（即浏览器）中保存，不参与和服务器的通信。
* 源生接口可以接受，亦可再次封装来对Object和Array有更好的支持。
* */

/**
 * 用全局变量来提高访问效率
 * @type {{}}
 */
var mapData = new Map()

function storageGet(storage, key, defaultValue) {
  if (mapData.has(key)) {
    return mapData.get(key)
  }

  let value = null
  try {
    value = storage.getItem(key)
    if (value != null) {
      value = JSON.parse(value)
    }
  } catch (e) {
    console.log('Cache', e)
  }

  if (typeof(value) == 'undefined' ||  value == null) {
    return defaultValue ? defaultValue : null
  } else {
    mapData.set(key, value)
    return value
  }
}

function storageSet(storage, key, value) {
  mapData.set(key, value)
  try {
    storage.setItem(key, JSON.stringify(value))
  } catch (e) {
    console.log('Cache', e)
  }
}

function storageRemove(storage, key) {
  mapData.delete(key)
  try {
    storage.removeItem(key);
  } catch (e) {
    console.log('Cache',e)
  }
}

export default {
  mapData,
  get: function (key, defalutValue) {
    return storageGet(localStorage, key, defalutValue)
  },

  set: function (key, value) {
    storageSet(localStorage, key, value)
  },

  remove:function(key){
    storageRemove(localStorage,key)
  },

  getSession: function (key, defalutValue) {
    return storageGet(sessionStorage, key, defalutValue)
  },

  setSession: function (key, value) {
    storageSet(sessionStorage, key, value)
  },

  removeSession:function(key){
    storageRemove(sessionStorage,key)
  },
}
