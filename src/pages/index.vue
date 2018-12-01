<template>
  <div class="page">
    <div class="title">首页</div>

    <HvcImage class="image" src="https://i01picsos.sogoucdn.com/b9b92e6447cb42ad" lazy-load/>

    <mt-button type="default" @click.native="showToast">显示toast</mt-button>

    <BottomTabbar></BottomTabbar>
  </div>
</template>

<script>
  import BottomTabbar from "@/components/BottomTabbar";
  import HvcImage from "@/libs/hvcm/src/components/HvcImage";
  import Toast from "@/libs/hvcm/src/js/Toast";
  import $Http from "@/libs/hvcm/src/js/$Http";
  import URL from "@/js/URL";

  export default {
    name: 'index',
    components: {
      HvcImage,
      BottomTabbar

    },
    mounted(){
      $Http.request({url:URL.urlGetFilter}).then(data=>{
        console.log('data',data)
      })
    },
    methods: {
      showToast() {
        Toast.showSuccess('加载成功')
      },
    },
  }
</script>
<style lang="less">
  .image {
    display: block;
    width: 200px;
    height: 200px;
    margin: 50px;
  }
</style>
