import Vue from 'vue'
import store from '@/store'
import App from './App'
Vue.config.productionTip = false
const app = new Vue({
  store,
  ...App
})
// wx.hideTabBar({
//   success:()=>{
//   }
// })
app.$mount();

export default {
  // 这个字段走 app.json
  config: {
    pages: [
      '^pages/home/list',
      'pages/home/detail',
      'pages/order/myorder',
      'pages/order/preorder',
      'pages/order/address',
      'pages/order/invoice',
      'pages/order/newAddress',
      'pages/order/orderdetail',
      'pages/order/paySuccess',
      'pages/home/shareDetail',
      'pages/home/login',
      'pages/cent/list',
      'pages/home/webView',
      'pages/order/invoiceList'
    ], // Will be filled in webpack
    window: {
      backgroundTextStyle: 'light',
      backgroundColor: '#000000',
      backgroundColorTop: 'white',
      navigationBarBackgroundColor: '#fff',
      navigationBarTitleText: '品库',
      navigationBarTextStyle: 'black',
      backgroundColorTop:'#dddce1',
      backgroundColorBottom:'#dddce1'
    },
    tabBar: {
      color: '#999999',
      selectedColor: '#d22222',
      backgroundColor: '#fff',
      borderStyle: 'black',
      list: [{
        pagePath: 'pages/home/list',
        text: '首页',
        iconPath: '/static/assets/Bottom_label_icon_home_onclick@3x.png',
        selectedIconPath: '/static/assets/Bottom_label_icon_home_click@3x.png'
      }, {
        pagePath: 'pages/order/myorder',
        text: '我的',
        iconPath: '/static/assets/Bottom_label_icon_me_onclick@3x.png',
        selectedIconPath: '/static/assets/Bottom_label_icon_me_click@3x.png'
      }]
    }
  }
}
