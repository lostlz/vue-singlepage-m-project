<template>
  <div class="hvc-mask" v-show="show" :style="{backgroundColor:backgroundColor,zIndex:zIndex}" @click.self="clickMask">
    <slot></slot>
  </div>
</template>

<script>
  /*
  *蒙层布局，移动端滚动穿透问题完美解决方案
  *https://uedsky.com/2016-06/mobile-modal-scroll/
  */
  var ModalHelper = (function (bodyCls) {
    var scrollTop;
    return {
      afterOpen: function () {
        scrollTop = document.scrollingElement.scrollTop;
        document.body.classList.add(bodyCls);
        document.body.style.top = -scrollTop + 'px';
      },
      beforeClose: function () {
        document.body.classList.remove(bodyCls);
        // scrollTop lost after set position:fixed, restore it back.
        document.scrollingElement.scrollTop = scrollTop;
      }
    };
  })('hvc-modal-open');

  export default {
    name: 'hvc-mask',
    model:{
      prop:'show',
      event:'changeShow',
    },
    props: {
      show: {type: Boolean, default: false},//需要用show属性来控制蒙层的显示，不然无法阻止下层滚动
      backgroundColor:{type: String, default: 'rgba(40,40,40,0.7)'},
      zIndex: {type: [String,Number], default: 1000},//需要用show属性来控制蒙层的显示，不然无法阻止下层滚动
      prevent:{type: Boolean, default: true},//是否阻止蒙层下层滚动，默认：true
      clickClose:{type: Boolean, default: true},//点击蒙层是否关闭
    },
    data() {
      return {
      }
    },
    created: function () {
    },
    mounted: function () {

    },
    watch: {
      show: function (newValue, oldValue) {
        if(this.prevent){
          if (newValue) {
            ModalHelper.afterOpen()
          } else {
            ModalHelper.beforeClose()
          }
        }
      },
    },
    methods: {
      clickMask(){
        if(this.clickClose){
          this.$emit('changeShow',false)
        }
      }
    },
    components: {}

  }
</script>

<style>
  body.hvc-modal-open {
    position: fixed;
    width: 100%;
  }

  .hvc-mask {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
</style>
