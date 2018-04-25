function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime(time){
  // console.log(time)
  // 解决ios微信不能识别 2018-12-31 格式，需要转化成 2018/12/31
  time = time.replace(/\-/g,'/');
  let a = new Date(time)-new Date();
  let hours = parseInt(a/(1000*3600));
  let min   = parseInt(a/(1000*60))%60;
  let second= parseInt(a/(1000))%60;
  let millSec = parseInt(a/100)%10
  return (hours<10?('0'+hours):hours)+':'+(min<10?('0'+min):min)+':'+(second<10?('0'+second):second)+'.'+millSec;
}
export function formatTime2(time){
  // console.log(time)
  // 解决ios微信不能识别 2018-12-31 格式，需要转化成 2018/12/31
  time = time.replace(/\-/g,'/');
  let a = new Date(time)-new Date();
  let hours = parseInt(a/(1000*3600));
  let min   = parseInt(a/(1000*60))%60;
  let second= parseInt(a/(1000))%60;
  return (hours<10?('0'+hours):hours)+':'+(min<10?('0'+min):min)+':'+(second<10?('0'+second):second);
}
export function formatTime3(time){
  // console.log(time)
  // 解决ios微信不能识别 2018-12-31 格式，需要转化成 2018/12/31
  time = time.replace(/\-/g,'/');
  let a = new Date(time)-new Date();
  let day = parseInt(a/(1000*3600*24));
  let hours = parseInt(a/(1000*3600))%24;
  let min   = parseInt(a/(1000*60))%60;
  let second= parseInt(a/(1000))%60;
  return [day,hours,min,second];
}
export function checkPhone(phone){ 
  if(!(/^1[34578]\d{9}$/.test(phone))){ 
    wx.showToast({
      title: '请输入正确手机号码',
      icon: 'none',
      duration: 2000
    })
      return false; 
  } 
}

export function schemesUrl(url,tuanId){
  console.log(url)
  if(url.indexOf('pinkumall://default/item_detail')!=-1){
    return '/pages/home/detail?id='+url.split('?item_id=')[1]+'&tuan_id='+tuanId
  }
}

//刷新页面
export function refreshPage(state){
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
  setTimeout(() => {
    if(state=='redirectTo'){
      wx.redirectTo({
        url: url
      })
    }else if(state == 'reLaunch'){
      wx.reLaunch({
         url:url
      })
    }
    
  }, 500);
}
//判断手机号
export function checkMobile(str) {
  var re = /^1\d{10}$/
  if (re.test(str)) {
    return true
  } else {
    return false
  }
}