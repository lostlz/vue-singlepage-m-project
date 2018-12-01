<template>
  <div class="bottom-link">
    <router-link to="/">首页</router-link>
    <router-link to="/find/">发现</router-link>
    <router-link to="/mine/">我的</router-link>
  </div>
</template>

<script>
  export default {
    name: 'BottomTabbar',
    components: {},
    data() {
      return {}
    },
    created: function () {
    },
    mounted: function () {
    },
    methods: {},


  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" scoped>
  .bottom-link{
    position: fixed;
    left: 0px;
    right: 0px;
    bottom: 0px;
    height: 100px;
    border-top: #eee solid 1px;/*no*/
  a{
    display: inline-block;
    padding: 0px 20px;
    line-height: 100px;
  }
  }
</style>