<template>
  <div v-if="'success' != state" class="load-view">
    <div v-if="'loading' == state" class="loading flex-h flex-hc flex-vc">
      <img src="https://hinabian-oss.oss-cn-shenzhen.aliyuncs.com/hf/m/images/ic_deju_loading.gif"/>
    </div>

    <div v-else-if="'empty' == state" class="load-item flex-h flex-hc flex-vc">{{emptyText}}</div>

    <div v-else-if="'no_network' == state"  class="no_network flex-v flex-hc flex-vc"  @click="clickNoNetworkRetry">
      <img src="@/lib/HvcUI/src/assets/ic_house_no_network.jpg"/>
      <div>{{noNetworkText}}</div>
    </div>

    <div v-else-if="'error' == state" class="load-item flex-h flex-hc flex-vc" @click="clickErrorRetry">{{errorText}}</div>

    <div v-else-if="'no_more' == state" class="load-item flex-h flex-hc flex-vc">{{noMoreText}}</div>
  </div>

</template>

<script>
  export default {
    name: 'load-view',
    props:{
      state: {type: String, default: 'loading'},//'loading'、'empty'、'error'、'success'、'noMore'、'no_network'、'hidden'：隐藏
      loadingText: {type: String, default: '正在加载 ...'},
      emptyText: {type: String, default: '暂无数据'},
      errorText: {type: String, default: '加载失败,点击重试'},
      noNetworkText: {type: String, default: '咦？咋木有网了呢~点击重试'},
      noMoreText: {type: String, default: '没有更多了.'},
    },
    data() {
      return {
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {
      clickNoNetworkRetry:function(e) {
        try {
          this.$emit('noNetworkRetry')
        } catch (e) {
        }
      },
      clickErrorRetry:function(e) {
        try {
          this.$emit('errorRetry')
        } catch (e) {
        }
      },
    }


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .load-view{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    color: #999;
    font-size: 28px;
    line-height: 28px;

    .load-item{
      width: 100%;
      height: 100px;
    }

    .loading{
      width: 100%;
      height: 100%;
      img{
        width: 120px;
        height: 120px;
      }
    }

    .no_network{
      width: 100%;
      padding: 80px 0 30px 0;
      img{
        width: 390px;
        height: 390px;
        margin-top: 130px;
        margin-bottom: 20px;
      }
    }

  }
</style>
