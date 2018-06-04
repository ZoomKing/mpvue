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
            global.loginBackUrl = currentUrlValue;
            //已经存了openId，未绑定手机号，去绑定
            saveSmartId(loginInfo.value.smartId);
        }
        // isLogin(funcValue)
    }else{
        if(loginInfo.errorCode.code=='1118'){
            global.loginBackUrl = currentUrlValue;
            
            wx.getUserInfo({
                complete:(res)=>{
                    // 判断用户有没有授过权，有的话，直接请求login接口，没有则跳到授权绑定页
                    if(res.userInfo){
                        // console.log(res)
                        wx.login({
                            success: e => {
                                if (e.code) {
                                    loginAgain({
                                        code: e.code,
                                        encryptedData: res.encryptedData,
                                        iv: res.iv
                                    });
                                }
                            }
                        });
                    }else{
                        wx.reLaunch({
                            url: '/pages/home/login'
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
    if(loginInfo_again.succ){
        if(loginInfo_again.value.binding){
            //设置登录token
            wx.setStorage({
              key: "storage_token",
              data: loginInfo_again.value.token
            });
            // wx.reLaunch({
            //     url: '/pages/home/list'
            // })
            wx.reLaunch({
              url: global.loginBackUrl
            });
        }else{
            saveSmartId(loginInfo_again.value.smartId);
        }
    }
}

//存储smartId
function saveSmartId(smartId){
    global.smartId = smartId;
    wx.reLaunch({
        url: '/pages/home/login'
    })
}
export default isLogin;