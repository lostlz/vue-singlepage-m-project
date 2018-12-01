## Image
img图片封装组件，懒加载功能、显示剪裁模式,

VUE图片懒加载vue-lazyload插件
> https://github.com/hilongjw/vue-lazyload


#### 例子

```
<hvc-image
  src="https://xxx.xxx"
  lazyLoad
  :showLoadLogo="true"/>
```

**如果引用本地图片资源需要require方式**
原因：https://blog.csdn.net/mr_yanyan/article/details/78783091
```
<hvc-image
  :src="require('@/assets/ic_home_title_hot.png')"/>
```

#### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------------ | :------------ | :------------ | :------------ |:------------ |
| src  |图片资源|String|   | '' |
| lazyLoad  |是否懒加载|Boolean|   | false |
| showLoadLogo  |	是显示懒加载logo图片|Boolean|   | true |
| mode  |	图片裁剪、缩放的模式|String|   | scaleToFill |

##### mode 有效值：
| 值 | 说明 |
| :------------ | :------------ |
| scaleToFill  |不保持纵横比缩放图片，使图片的宽高完全拉伸至填满 image 元素|
| aspectFit  |保持纵横比缩放图片，使图片的长边能完全显示出来。也就是说，可以完整地将图片显示出来。|
| aspectFill  |	保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取。|
| center  |	不缩放图片，只显示图片的中间区域|

