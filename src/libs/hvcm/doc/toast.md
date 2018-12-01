## Toast
toast/loading提示

#### 例子
```
Toast.showSuccess('成功',3000,'middle');
Toast.showNotice('失败',3000,'bottom');
Toast.showLoading('正在加载...');
```

#### API
```
Toast.showSuccess(message,duration,position);
Toast.showNotice(message,duration,position);
Toast.showLoading(message);
Toast.closeLoading();
```

| 属性 | 说明 | 类型 | 可选值 | 默认值 |
| :------------ | :------------ | :------------ | :------------ |:------------ |
| message  |提文本示|String|   | '' |
| duration  |失败提示|Number|   | 3000 |
| position  |显示loading|String| 'top'、'bottom'、'middle'  | 'middle' |





