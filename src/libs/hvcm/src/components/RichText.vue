<template>
  <div class="rich-text"
       v-lazy-container="{ selector: 'img' }"
       v-html="cHtml">
  </div>
</template>

<script>
  export default {
    name: 'rich-text',
    props:{
      html:{type:String,default:''}
    },
    data() {
      return {}
    },
    computed:{
      cHtml:function () {
        if(this.html){
          return this.html.replace(/<img([\s\S]*?)src\s*=\s*(['"])([\s\S]*?)\2([^>]*)>/gi,'<img$1data-src=$2$3$2$4>')
        }else{
          return ''
        }
      }
    },
    created: function () {
    },
    mounted: function () {
    },
    components: {}
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
  .rich-text {
    font-size: 16px;
    color: #666666;
  }

  .rich-text img{
    position: relative;
    width: 100% !important;
    height: 200px !important;
    margin: 10px 0px;
    background-size: 100px;
  }

  .rich-text img[lazy=loaded] {
    height: auto !important;
  }

  .rich-text img:after {
    position: absolute;
    content: ' ';
    top: 0px;
    left: 0;
    width: 100%;
    height: 100%;
    border: 2px dotted rgb(200, 200, 200);
    background-color: #eeedeb;
    box-sizing: border-box;
  }


  .rich-text img[lazy=loading] {
    background-position: center center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    background-color: #eeedeb;
  }

  .rich-text img[lazy=error] {
    border: 2px dotted rgb(200, 200, 200);
    background-color: #eeedeb;
    box-sizing: border-box;
  }


</style>
