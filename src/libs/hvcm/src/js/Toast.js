import {Toast as mintToast } from 'mint-ui';
import {Indicator} from 'mint-ui';

var Toast = {}

var config = {
  message:'',
  duration:3000,
  position:'middle',//'top'、'bottom'、'middle'
}

/**
 * 执行 Toast 方法会返回一个 Toast 实例，每个实例都有 close 方法，用于手动关闭 Toast
  let instance = Toast('提示信息');
  setTimeout(() => {
  instance.close();
  }, 2000);
 * @param param
 */
var show = function(param) {
  param || (param={})
  return mintToast({
    message: param.message,
    iconClass: param.iconClass,
    duration:param.duration ? param.duration : config.duration,
    position:param.position ? param.position : config.position,
  });
}

Toast.showSuccess=function(message,duration,position){
  return show({
    iconClass:'icon-success',
    message:message,
    duration:duration,
    position:position,
  })
}

Toast.showNotice=function(message,duration,position) {
  return show({
    iconClass:'icon-notice',
    message:message,
    duration:duration,
    position:position,
  })
}


/**
 * 加载toast,阻塞事件
 * @param message
 */
Toast.showLoading = function(message){
  Indicator.open({
    text: message,
  });
}
Toast.closeLoading = function(){
  Indicator.close();
}



export default  Toast
