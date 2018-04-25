import commonApi from '@/utils/commonApi'
import global from '@/global'
let currentUrlValue;
function isLogin(currentUrl){
    currentUrlValue = currentUrl?currentUrl:'';
    wx.getStorage({
        key: 'storage_token',
        complete:(res)=>{
            if(res.data){
                // console.log(res.data)
                if(currentUrlValue){
                    // currentUrlValue()
                    wx.reLaunch({
                        url:currentUrlValue
                    })
                }
            }else{
                //获取token失败，默认未登录，先去login（传code即可）;
                // console.log(res.data)
                 wx.login({
                    success: (res)=>{
                        console.log(res)
                        if (res.code) {
                            login(res.code); 
                        } else {
                            console.log('登录失败！' + res.errMsg)
                        }
                    }
                });
                
            }
        }
    })
}
async function login(code){
    console.log(code)
    // var formData = new FormData();
    // formData.append('code','code');
    let loginInfo = await commonApi.login({code:code});
    console.log(loginInfo);
    //这里判断login的情况，若是失败则重新login，这次加上getuserInfo的加密信息
    if(loginInfo.succ){
        if(loginInfo.value.binding){
            try {
                wx.setStorageSync('storage_token', loginInfo.value.token);
                if(currentUrlValue){
                    // currentUrlValue();
                    console.log(currentUrlValue)
                    wx.reLaunch({
                        url:currentUrlValue
                    })
                }
            } catch (e) {    
            }
            
        }else{
            //已经存了openId，未绑定手机号，去绑定
            saveSmartId(loginInfo.value.smartId);
        }
        // isLogin(funcValue)
    }else{
        console.log(loginInfo)
        if(loginInfo.errorCode.code=='1118'){
            console.log('hello')
            wx.login({
                success:(res)=>{
                    if(res.code){
                        wx.getUserInfo({
                            success: function(data) {
                                loginAgain({
                                    'code':res.code,
                                    'encryptedData':data.encryptedData,
                                    'iv':data.iv
                                });
                            }
                          })
                    }
                }
            })
        }
    }
};
async function loginAgain(obj){
    let loginInfo_again = await commonApi.login(obj);
    // console.log(loginInfo_again);
    saveSmartId(loginInfo.value.smartId);
}

//存储smartId
function saveSmartId(smartId){
    wx.reLaunch({
        url: '/pages/home/login'
    })
    global.smartId = smartId;
}
export default isLogin;