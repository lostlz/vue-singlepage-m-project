import Vue from 'vue'
import $Report from '@/libs/hvcm/src/js/$Report'
import PageId from "@/js/PageId";

$Report.init({
  client: 'm',
  appVersion: '1.0.0',
  pageId: PageId,
});

/*
 ** Google 统计分析脚本
 */
(function (i, s, o, g, r, a, m) {
  i['GoogleAnalyticsObject'] = r;
  i[r] = i[r] || function () {
    (i[r].q = i[r].q || []).push(arguments)
  }, i[r].l = 1 * new Date();
  a = s.createElement(o),
      m = s.getElementsByTagName(o)[0];
  a.async = 1;
  a.src = g;
  m.parentNode.insertBefore(a, m)
})(window, document, 'script', 'https://cache.hinabian.com/js/lib/stat/analytics.js', 'ga');
if (ga) {
  ga('create', 'UA-100878981-1', 'auto');
}

/*
 ** 百度统计分析脚本
 */
var _hmt = _hmt || [];
(function() {
  var hm = document.createElement("script");
  hm.src = "https://hm.baidu.com/hm.js?5cb2f6a14f71f3f8beb6b30fa5b05a4a";
  var s = document.getElementsByTagName("script")[0];
  s.parentNode.insertBefore(hm, s);
})();

export default ({app, router}) => {

  router.afterEach((to, from) => {

    try {
      $Report.routerAfterEach(to, from)
    } catch (e) {
    }

    try {
      window._hmt = window._hmt || []
      window._hmt.push(['_trackPageview', to.fullPath])
    } catch (e) {
    }

    try {
      ga('set', 'page', to.fullPath)
      ga('send', 'pageview')
    } catch (e) {
    }
  })
}
