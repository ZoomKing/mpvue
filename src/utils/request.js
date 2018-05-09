import Fly from 'flyio'
import global  from '../global'
import commonApi from '@/utils/commonApi'
import md5 from  './md5'
import isLogin from './isLogin'
const fly = new Fly()

let token = '';
const func ={
  async getSalt(){
    let a = await commonApi.getSalt()
    global.requestHeaderInfo.salt = a.value;
  },
}
//判断有没有salt
if(!global.requestHeaderInfo.salt){
  func.getSalt();
}


fly.interceptors.request.use((request) => {
  try {
    token = wx.getStorageSync('storage_token');
 } catch (e) {
   // Do something when catch error
 }
  wx.showNavigationBarLoading();
  wx.showLoading({
    title: '加载中',
  })
  request.headers['x-proto-version'] = 'v1';
  request.headers['x-device-id'] = global.requestHeaderInfo.deviceID;
  let sign;
  
  if(token){
    request.headers['x-access-token'] = token;
    let versionStr = 'x-proto-version:v1;x-device-id:'+global.requestHeaderInfo.deviceID+';';
    let tokenStr = 'x-access-token:'+token+';'
     sign = md5(versionStr+tokenStr+global.requestHeaderInfo.salt);
  }else{
    let versionStr = 'x-proto-version:v1;x-device-id:'+global.requestHeaderInfo.deviceID+';';
    //  sign = md5('x-proto-version:v1;x-device-id:'+global.requestHeaderInfo.deviceID+';'+global.requestHeaderInfo.salt);
    sign = md5(versionStr+global.requestHeaderInfo.salt);
  }
  request.headers['x-sign'] = sign;
  return request
})

fly.interceptors.response.use(
  (response, promise) => {
    //请求成功了，重置小程序刷新当前页面的次数
    global.reFreshSmartCount = 5;
    // console.log(response)
    //当token快过期的时候，后端会在头部放入一个新的token,用来替换掉之前的token
    if( response.headers['x-refresh-token']){
      try {
        wx.setStorageSync('storage_token', response.headers['x-refresh-token'])
      } catch (e) {    
      }
    }
    wx.hideLoading()
    wx.hideNavigationBarLoading();
    if(response.data.succ){
      return promise.resolve(response.data)
    }else{
      wx.showToast({
        title: response.data.errorCode.message,
        icon: 'none'
      })
      return promise.resolve(response.data)
    }
   
  },
  (err, promise) => {
    // console.log(err.data);
    // console.log(promise)
    //未登录
    if(err.status==401){
      wx.getStorage({
        key: 'storage_token',
        success: function(res) {
            token = res.data;
        },
        fail:(res)=>{
        }
      })
      let currentPage = getCurrentPages()[getCurrentPages().length-1];
      let url ='/'+currentPage.route;
      let parameter = [];
      // 把页面带的参数一并放到url里面去
      for(let key in currentPage.options){
        parameter.push(key+'='+currentPage.options[key]);
      }
      parameter = parameter.join('&');
      if(parameter){
        url = url+'?'+parameter
      }
      // console.log(url);
      isLogin(url);
    }
    // console.log(err.status);
    if(err.status==0){
      wx.showToast({
        title: '可能没有网络了哦~',
        icon: 'none'
      })
    }
    //重新获取salt
    if(err.status=='403'){
      // console.log(getCurrentPages()[0].route)
      let currentPage = getCurrentPages()[getCurrentPages().length-1];
      let url ='/'+currentPage.route;
      let parameter = []
      for(let key in currentPage.options){
        parameter.push(key+'='+currentPage.options[key]);
      }
      parameter = parameter.join('&');
      if(parameter){
        url = url+'?'+parameter
      }
      // console.log(url)
      if(global.reFreshSmartCount>0){
        global.reFreshSmartCount--;
        wx.reLaunch({
          url: url
        })
      }else{
        wx.showToast({
          title: '系统累瘫了,工程师抢救中,请重启小程序试试~',
          icon: 'none'
        })
      }
    }
    if(err.status>=500){
      wx.showToast({
        title: '系统累瘫了,工程师抢救中,请重启小程序试试~',
        icon: 'none'
      })
    }
    wx.hideNavigationBarLoading()
    // wx.showToast({
    //   title: err.message,
    //   icon: 'none'
    // })
    return promise.resolve()
  }
)

export default fly
