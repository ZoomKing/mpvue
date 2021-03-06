import Vue from 'vue'
import store from '@/store'
import App from './index'

const app = new Vue({
  store,
  ...App
})
app.$mount()

export default {
  config: {
    navigationBarTitleText: '发票抬头',
    enablePullDownRefresh: false
  }
}
