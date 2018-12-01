<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="less">
  @import "libs/hvcm/hvc-style.css";

  html, body {
    height: 100%;
    width: 100%;
  }

  #app {
    height: 100%;
    width: 100%;
  }

  .page{
    position: relative;
    width: 100%;
    height: 100%;
  }
  .title{
    width: 100%;
    font-size: 40px;
    line-height: 100px;
    text-align: center;
  }


</style>
