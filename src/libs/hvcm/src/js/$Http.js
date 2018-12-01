import axios from 'axios'
import qs from 'qs'
import proxyUtils from './ProxyUtils'
import $Cache from './$Cache'

var Http = {
  TIMEOUT_DEFAULT: 20000,
  ERROR_NOT_NETWORK: -1, //无网络,服务器无响应
  ERROR_SERVICE: -2,  //服务器错误，请求错误返回码不为：200
  ERROR_API: -4,  //接口错误status不为：0
  ERROR_REQUEST: -5,  //请求之前错误，
}

/**
 *
 * @param error error对象
 * @param code  error code
 * @param data 接口请求成功返回的data
 * @returns {*}
 * @constructor
 */
var creatHttpError = function (error, code, data) {
  if (!error) {
    error = new Error()
  }
  error.code = code

  if (data) {
    error.data = data
  }
  return error
}

//创建新的实例
var axiosNew = axios.create({timeout: Http.TIMEOUT_DEFAULT})
axiosNew.defaults.withCredentials = true

//POST传参序列化(添加请求拦截器)
axiosNew.interceptors.request.use(
  config => {
    config.url = proxyUtils.proxyUrl(config.url)
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
    }

    if (config.cookie) {
      config.headers.cookie = config.cookie
    }
    // 在发送请求之前做某件事
    if (
      config.method === "post" ||
      config.method === "put" ||
      config.method === "delete"
    ) {
      // 序列化
      config.data = qs.stringify(config.data);
    }
    return config;
  },
  error => {
    return Promise.reject(creatHttpError(error, Http.ERROR_REQUEST, null));
  }
);

//返回状态判断(添加响应拦截器)
axiosNew.interceptors.response.use(
  res => {
    //对响应数据做些事
    if (res.status == 200) {
      if (res.data.state == 0) {
        return res.data.data;
      } else {
        //接口state不为0
        return Promise.reject(creatHttpError(new Error('Api Error:' + res.data.data), Http.ERROR_API, res.data));
      }
    } else {
      return Promise.reject(creatHttpError(new Error('Server Error:' + res.status), Http.ERROR_SERVICE, null));
    }
  },
  error => {
    if (error.response) {
      //服务器有响应
      return Promise.reject(creatHttpError(error, Http.ERROR_SERVICE, null));
    } else {
      //无网络或者服务器无响应
      return Promise.reject(creatHttpError(error, Http.ERROR_NOT_NETWORK, null));
    }
  }
);

/**
 * 新的请求方法，以后统一用这个，扩展性强
 * @param config {
 *                  url:'',
 *                  method:'get',//默认是 get; 'post'、'get'
 *                  params:{},//请求参数在拼接在url上面
 *                  data:{},//请求主体被发送的数据,只适用于这些请求方法 'PUT', 'POST', 和 'PATCH'
 *                  headers:{},
 *                  cookie:'',
 *                  sessionCache:false,//仅限get请求，是否加入session缓存，如果为true，请求成功后数据放入session缓存，下次请求如果有缓存返回缓存，不请求网络
 *               }
 */
Http.request = function (config) {
  if (!config || !config.url || config.url == '') {
    return
  }

  let axiosConfig = {
    url: config.url,
    method: config.method || 'get',
    params: config.params || {},
    data: config.data || {},
    headers: config.headers || {},
    sessionCache: config.sessionCache || false,
  }

  if (config.cookie && config.cookie != '') {
    axiosConfig.headers.cookie = config.cookie
  }

  if (axiosConfig.method == 'get' && axiosConfig.sessionCache) {
    let key = getKey(axiosConfig.url, axiosConfig.params)

    return new Promise(function (resolve, reject) {
      if ($Cache.getSession(key) != null) {
        resolve($Cache.getSession(key))
      } else {
        axiosNew(config).then(function (data) {
          $Cache.setSession(key, data)
          resolve(data)
        }).catch(function (error) {
          console.log('http-get-error:',error);
          reject(error)
        });
      }
    })
  } else {
    return new Promise(function (resolve, reject) {
      axiosNew(config).then(function (data) {
        resolve(data)
      }).catch(function (error) {
        console.log('http-post-error:',error);
        reject(error)
      });
    })
  }
}

function getKey(url, params) {
  return url + '&' + qs.stringify(params)
}

export default Http
