export default {

  /**
   * 使element的顶部与视图（容器）顶部对齐
   * @param elId
   */
  scroll2Top:function (elId) {
    let anchor = document.getElementById(elId);
    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "start",
        inline: "start"
      })
    }
  },

  /**
   * 使element的顶部与视图（容器）底部对齐
   * @param elId
   */
  scroll2Bottom:function (elId) {
    let anchor = document.getElementById(elId);
    if (anchor) {
      anchor.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "end"
      })
    }
  },

  addClass(node,className){
    let classList = node.className.split(' ')
    if(classList.indexOf(className) == -1){
      classList.push(className)
      node.className = classList.join(' ')
    }
  },

  removeClass(node,className){
    let classList = node.className.split(' ')
    let index = classList.indexOf(className)
    if(index != -1){
      classList.splice(index,1)
      node.className = classList.join(' ')
    }
  },


}
