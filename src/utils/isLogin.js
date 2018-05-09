import commonApi from '@/utils/commonApi'
import global from '@/global'
let currentUrlValue;
function isLogin(currentUrl){
    currentUrlValue = currentUrl?currentUrl:'';
    
    //获取token失败，默认未登录，先去login（传code即可）;
        // console.log()
        wx.login({
            success: (res)=>{
                if (res.code) {
                    login(res.code); 
                } else {
                    console.log('登录失败！' + res.errMsg)
                }
            }
        });
                
}
async function login(code){
    let loginInfo = await commonApi.login({code:code});
    //这里判断login的情况，若是失败则重新login，这次加上getuserInfo的加密信息
    // console.log(loginInfo.succ)
    if(loginInfo.succ){
        if(loginInfo.value.binding){
            try {
                wx.setStorageSync('storage_token', loginInfo.value.token);
                if(currentUrlValue){
                    // currentUrlValue();
                    // console.log(currentUrlValue)
                    wx.reLaunch({
                        url:currentUrlValue,
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
        if(loginInfo.errorCode.code=='1118'){
            wx.login({
                success:(res)=>{
                    // console.log(res)
                    if(res.code){
                        wx.getUserInfo({
                            success: function(data) {
                                // console.log(data)
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
    // console.log(obj);
    let loginInfo_again = await commonApi.login(obj);
    // console.log(loginInfo_again);
    saveSmartId(loginInfo_again.value.smartId);
}

//存储smartId
function saveSmartId(smartId){
    wx.reLaunch({
        url: '/pages/home/login'
    })
    global.smartId = smartId;
}
export default isLogin;