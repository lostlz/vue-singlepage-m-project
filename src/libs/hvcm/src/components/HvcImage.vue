<template>
  <img v-if="lazyLoad"
       class="hvc-image lazyLoad pr"
       :class="classObject"
       v-lazy="src" :key="src"/>
  <img v-else
       class="hvc-image pr"
       :class="classObject"
       :src="src" :key="src"/>
</template>

<script>
  export default {
    name: 'hvc-image',
    components: {},
    props: {
      src: {type: String, default: ''},
      lazyLoad: {type: Boolean, default: false},//是否懒加载，默认：false
      showLoadLogo: {type: Boolean, default: true},//是显示懒加载logo图片，默认：true
      mode: {type: String, default: 'scaleToFill'},//图片裁剪、缩放的模式
    },
    data() {
      return {}
    },
    created: function () {
    },
    mounted: function () {

      if (this.lazyLoad) {
        //子组件
        this.$nextTick(() => { //使用nextTick为了保证dom元素都已经渲染完毕
          let image = this.$el
          let bgSizeClass = ''
          let offsetWidth = image.offsetWidth
          if (offsetWidth < 200) {
            bgSizeClass = 'bgSizeSmall'
          } else if (offsetWidth < 300) {
            bgSizeClass = 'bgSizeMiddle'
          } else {
            bgSizeClass = 'bgSizeLarge'
          }
          image.classList.add(bgSizeClass)
        });
      }
    },
    methods: {},
    computed: {
      classObject: function () {
        return {
          loadingImg: this.showLoadLogo,
          scaleToFill:this.mode == null || this.mode == '' || this.mode == 'scaleToFill',
          aspectFit:this.mode == 'aspectFit',
          aspectFill:this.mode == 'aspectFill',
          center:this.mode == 'center',
        }
      }
    },


  }
</script>

<style>
  .hvc-image {
    /*position: relative;*/
    font-family: 'Helvetica';
    font-weight: 300;
    line-height: 0;
  }

  .hvc-image:before {
  }

  .hvc-image:after {
    position: absolute;
    content: ' ';
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    border: 1px dotted rgb(200, 200, 200);
    background-color: #eeedeb;
    box-sizing: border-box;
  }

  .hvc-image.lazyLoad {
    background-color: #eeedeb;
  }

  .hvc-image.lazyLoad[lazy=loading] {
    background-position: center center;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  .hvc-image.lazyLoad[lazy=error] {
    border: 1px dotted rgb(200, 200, 200);
    background-color: #eeedeb;
    box-sizing: border-box;
  }

  .hvc-image.lazyLoad[lazy=loaded] {
    background-color: transparent;
    background-image: none !important;
  }

  .hvc-image.bgSizeSmall {
    background-size: 60px;
  }

  .hvc-image.bgSizeMiddle {
    background-size: 90px;
  }

  .hvc-image.bgSizeLarge {
    background-size: 140px;
  }

  .hvc-image.loadingImg[lazy=loading] {
    background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAAAvCAMAAAB3wnyXAAAAgVBMVEUAAAC7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7u7tI2Nm7AAAAKnRSTlMA+vfZ5jUHu2YTA9/Dty+ZioNOJB0ZDdKxej3xyFdE63Ruq5+PzKWkXypOhPUSAAAB20lEQVRIx6WU17KqQBBFJ5GjBCUoHvUazv7/D7ygBQN1UGFmPVhlAQu6e3qTrxgbX9Ca3w8m0aG6okecXHXPBmN8R9VzwRSeqXl+0EKDm4eevUKjHONAAVwzQlxZ4WalxX3s8CLZdv+DXsTyVZ6thQHqP1xio6dcJ8qyquRo8UInr1LykP0mq3G7XtNXKQUGcrIe0Z2d/Dk+SaIguqGlvkU7jPhREB0wQ6wgMusZUUQUiGZE/5R2f0a0ISp4+IPtNHYZx6VtbFViRCLkmbdOzrcu56kRpplJUnyGRdm75ahOF18Mb79SfIHGM8mSBIJiLdQzppYwYMsfxph6bDLOVE3TwYf5pcWaWt6edrdkWAzj1rmw9gITnsXlPpZz7PthhvZdHteg647ActgvGZPZfSaHJGF/bhZ8b1lBW4Dl7zxGP29sXorXhVp+9f6ysZPQIVNKSGpnbg3sIyC6pKC8iO3q3docvqejE+HY/mYu+UQoPTv37U3hgpgcmkQNogWXaa1H0Rdm6lhkuDG9wuTYTkSXX3SciTYH1jVoq6sxY3DgmOp6qh2wB200NU0AdCJbR7JtYg9PuOrA0iCwfG+cHYo0mFC4qqJp2EU6m5EOMc4T3XndPcb4JVlc1n8uPag5tzqwHgAAAABJRU5ErkJggg==);
  }

  .hvc-image.scaleToFill{
    object-fit: fill;
  }
  .hvc-image.aspectFit{
    object-fit: contain;
  }
  .hvc-image.aspectFill{
    object-fit: cover;
  }
  .hvc-image.center{
    object-fit: none;
  }

</style>
