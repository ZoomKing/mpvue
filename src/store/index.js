import Vue from 'vue'
import Vuex from 'vuex'
import detail_module from './detail_module';
import preorder_module from './preorder_module'
import common_mudule from './common'
import order_module from './order_module'
Vue.use(Vuex)


const store = new Vuex.Store({
  modules :{
    detail:detail_module,
    preorder:preorder_module,
    common:common_mudule,
    order :order_module
  }
})
export default store
