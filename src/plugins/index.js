import mintUi from './mint-ui'
import vueLazyload from './vue-lazyload'


export default ({app,router})=>{

  if(mintUi){
    mintUi({app,router})
  }

}