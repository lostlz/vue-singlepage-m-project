## Mask
蒙层布局，解决移动端滚动穿透问题

#### 例子
```
<hvc-mask
  :show="isShow"
  :zIndex="0"
  backgroundColor="rgba(0,0,0,0.3)"
  @click.native.self="clickMask">
</hvc-mask>
```

#### API

| 参数 | 说明 | 类型 | 可选值 | 默认值 |
| :------------ | :------------ | :------------ | :------------ |:------------ |
| show  |控制是否显示mask|Boolean|   | false |
| backgroundColor  |背景颜色|String|   | 'rgba(0,0,0,0.6)' |
| zIndex  |	mask的z-index|Integer/String|   | 1000 |
| prevent |是否阻止蒙层下层滚动|Boolean|   | true |
