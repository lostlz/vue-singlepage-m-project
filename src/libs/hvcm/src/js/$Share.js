import axios from 'axios'

var Share = {}

Share.reset = function () {
  //分享相关参数,app分享
  window.APP_SHARE_TITLE = '';
  window.APP_SHARE_FRIEND_TITLE = '';
  window.APP_SHARE_FRIEND_DESC = '';
  window.APP_SHARE_IMG = '';
  window.APP_SHARE_URL = '';
}


/**
 * 设置资分享字段
 * 没有设置用默认分享字段
 * @param shareData
 *
 shareData = {
    title: '分享标题（朋友圈只显示标题）',
    desc: '分享内容',
    imgUrl: '图片URL',
    link: '分享链接（最好是后台JS安全域名）',
 }
 */
Share.onShare = function (shareData) {
  if (!shareData) {
    shareData = {}
  }

  const share = {
    title: shareData.title || document.title,//分享标题（朋友圈只显示标题）
    desc: shareData.desc || document.title,//分享内容
    imgUrl: shareData.imgUrl || 'https://cache.hinabian.com/images/share/logo.jpg',//图片URL
    link: shareData.link || window.location.href,//分享链接（最好是后台JS安全域名）
    success: function (obj) {
      axios.get('https://www.hinabian.com/stat/themeShareReport', {
        msg: obj.errMsg,
        url: shareData.shareLink
      })
    }, cancel: function () {}
  };

  //分享相关参数,app分享
  window.APP_SHARE_TITLE = share.title;
  window.APP_SHARE_FRIEND_TITLE = share.title;
  window.APP_SHARE_FRIEND_DESC = share.desc;
  window.APP_SHARE_IMG = share.imgUrl;
  window.APP_SHARE_URL = share.link;

  axios.get('https://m.hinabian.com/weixin/ticket?url=' + encodeURIComponent(share.link)).then((data) => {
    data = data.data
    wx.config({
      debug: false,
      appId: data.appId,
      timestamp: data.timestamp, // 必填，生成签名的时间戳
      nonceStr: data.nonceStr, // 必填，生成签名的随机串
      signature: data.signature,// 必填，签名，见附录1
      jsApiList: ['onMenuShareTimeline', 'onMenuShareAppMessage','onMenuShareQQ','onMenuShareQZone'] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
    });

    wx.ready(() => {
      wx.onMenuShareTimeline(share);// 分享到朋友圈
      wx.onMenuShareAppMessage(share);// 分享给朋友
      wx.onMenuShareQQ(share);
      wx.onMenuShareQZone(share);
    });
  }).catch(function (error) {
  })

}

export default Share
