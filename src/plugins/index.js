import mintUi from './mint-ui'
import vueLazyload from './vue-lazyload'
import report from './report'




export default ({app,router})=>{

  if(report){
    report({app,router})
  }


}