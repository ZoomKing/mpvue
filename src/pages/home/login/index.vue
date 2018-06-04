<template lang="pug">
.bind
    img.welcome_img(mode='widthFix' src='/static/assets/login_bg_pic@3x.png')
    .authorization(v-if='!dailogState')
        img(src='/static/assets/smart_login_wechat_icon.png')
        button(v-if='canIUse',open-type='getUserInfo',@getuserinfo="bindGetUserInfo") {{'微信授权登录'}}
        view(v-else) {{'请升级微信版本'}}
    .dailog(v-else)
        .box
            .dailog_title
                .dailog_title_context {{'绑定手机号'}}
                //- img(src='/static/assets/detail_order_delete_icon@3x.png',@click='close') 
            .bind_content
                view
                    input(placeholder='手机号',v-model='phoneNumber',maxlength='11')
                    #sendCode(@click='sendCode') {{sendCodeText}}
                view 
                    input(placeholder='验证码',v-model='code')
            #login_btn(@click='registerFunc') {{'登录'}}
    
</template>

<script>
import global from "@/global";
import { checkMobile } from "@/utils";
import api from "./api";
import commonApi from '@/utils/commonApi'
export default {
  data() {
    return {
      phoneNumber: "",
      code: "",
      nickName: "",
      avatarUrl: "",
      sendCodeText: "发送验证码",
      second: 60,
      dailogState: false,
      canIUse:wx.canIUse('button.open-type.getUserInfo')
    };
  },
  onShow() {
    // this.dailogState =false;
    // global.smartId = null;
    wx.getUserInfo({
        complete: (res)=>{
          console.log(res)
          if(res.userInfo){
            if(global.smartId){
                this.dailogState = true;
            }else{
                wx.login({
                    success: e => {
                    if (e.code) {
                        this.loginAgain({
                        code: e.code,
                        encryptedData: res.encryptedData,
                        iv: res.iv
                        });
                    }
                    }
                });
            }
            
          }else{
            this.dailogState = false;
            wx.getSetting({
                success: (res)=> {
                    console.log(res.authSetting["scope.userInfo"])
                    if (res.authSetting["scope.userInfo"]) {
                    this.dailogState = true;
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称
                    wx.getUserInfo({
                        success: (res)=>{
                        console.log(res);
                        wx.login({
                            success: e => {
                            if (e.code) {
                                this.loginAgain({
                                code: e.code,
                                encryptedData: res.encryptedData,
                                iv: res.iv
                                });
                            }
                            }
                        });
                        }
                    });
                    }
                }
            });
          }
        },
    });
    // console.log(global)
      // if(global.smartId){
      //     this.dailogState = true;
      // }else{
      //   this.dailogState = false;
      //   wx.getSetting({
      //       success: (res)=> {
      //           console.log(res.authSetting["scope.userInfo"])
      //           if (res.authSetting["scope.userInfo"]) {
      //           this.dailogState = true;
      //           // 已经授权，可以直接调用 getUserInfo 获取头像昵称
      //           wx.getUserInfo({
      //               success: (res)=>{
      //               console.log(res);
      //               wx.login({
      //                   success: e => {
      //                   if (e.code) {
      //                       this.loginAgain({
      //                       code: e.code,
      //                       encryptedData: res.encryptedData,
      //                       iv: res.iv
      //                       });
      //                   }
      //                   }
      //               });
      //               }
      //           });
      //           }
      //       }
      //   });
      // }
    
  },
  onError(res){
    console.log(res)
  },
  methods: {
    async sendCode() {
      //判断手机号吗格式
      console.log(checkMobile(this.phoneNumber));
      if (checkMobile(this.phoneNumber)) {
        let data = await api.send_confirm_code(this.phoneNumber);
        console.log(data);
        let timer;
        if (data.succ) {
          wx.showToast({
            title: "验证码发送成功",
            icon: "none",
            duration: 2000
          });
          timer = setInterval(() => {
            this.second--;
            this.sendCodeText = this.second + "秒";
            if (this.second <= 0) {
              this.sendCodeText = "发送验证码";
              clearInterval(timer);
            }
          }, 1000);
        }
        wx.getUserInfo({
          success: res => {
            let userInfo = res.userInfo;
            this.nickName = userInfo.nickName;
            this.avatarUrl = userInfo.avatarUrl;
          }
        });
      }
    },
    async registerFunc() {
      if (this.phoneNumber.replace(/(^\s*)|(\s*$)/g, "") == "") {
        wx.showToast({
          title: "请输入手机号",
          icon: "none",
          duration: 2000
        });
        return;
      }
      if (this.code.replace(/(^\s*)|(\s*$)/g, "") == "") {
        wx.showToast({
          title: "请输入验证码",
          icon: "none",
          duration: 2000
        });
        return;
      }
      let data = await api.register({
        smartId: global.smartId,
        nick: this.nickName,
        avatarUrl: this.avatarUrl,
        phone: this.phoneNumber,
        confirmCode: this.code
      });
      console.log(data);
      //设置登录token
      wx.setStorage({
        key: "storage_token",
        data: data.value.token
      });
      // wx.reLaunch({
      //     url: '/pages/home/list'
      // })
      wx.reLaunch({
        url: global.loginBackUrl
      });
    },
     
    async loginAgain(obj) {
      console.log(obj);
      let loginInfo_again = await commonApi.login(obj);
      console.log(loginInfo_again);
      //判断用户有没有绑定过账号
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
            //用户没有绑定过账号，绑定框才能出现
            this.dailogState = true;
            this.saveSmartId(loginInfo_again.value.smartId);
          }
      }
      
    },
    bindGetUserInfo(e) {
        console.log(e);
        if(e.target.userInfo){
           this.dailogState = true;
            wx.login({
              success: res => {
                  console.log(res)
                  if (res.code) {
                  this.loginAgain({
                      code: res.code,
                      encryptedData: e.target.encryptedData,
                      iv: e.target.iv
                  });
                  }
              },
            });
        }else{
          wx.showToast({
            title: "您取消了授权,授权后才能正常绑定哦",
            icon: "none",
            duration: 2000
          });
        }
        
    },
    //存储smartId
    saveSmartId(smartId) {
      global.smartId = smartId;
    }
  },
  mounted() {
    // console.log(global.loginBackUrl);
  }
};
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.welcome_img {
  height: 120px;
  width: 100%;
}
.authorization {
  margin-top: 50px;
  width: 100%;
  height: 200px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  > img {
    background: #f7f8fa;
    width: 80px;
    height: 80px;
    border-radius: 50%;
  }
  button {
    width: 335px;
    height: 48px;
    line-height: 48px;
    border-radius: 100px;
    background: #84ec08;
    color: white;
  }
  >view{
    width: 335px;
    height: 48px;
    text-align: center;
    line-height: 48px;
    border-radius: 100px;
    background: @bgColor;
    color: white;
  }
}
.dailog {
  position: fixed;
  height: 100vh;
  width: 100%;
  z-index: 99;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  .box {
    margin-top: 150px;
    width: 300px;
    height: 210px;
    background: white;
    border-radius: 5px;
    display: flex;
    flex-direction: column;
    // justify-content: center;
    align-items: center;
    .dailog_title {
      width: 100%;
      display: flex;
      box-sizing: border-box;
      padding: 0 20px;
      font-size: 16px;
      font-weight: normal;
      justify-content: space-between;
      height: 44px;
      align-items: center;
      position: relative;
      .dailog_title_context {
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        text-align: center;
      }
      > img {
        position: absolute;
        top: 11px;
        width: 20px;
        height: 20px;
        box-sizing: border-box;
        right: 20px;
      }
    }
    .bind_content {
      overflow: hidden;
      > view {
        width: 260px;
        height: 44px;
        margin: 0 auto 10px;
        border-bottom: 1px solid #f4f4f4;
        position: relative;
        #sendCode {
          position: absolute;
          font-size: 12px;
          width: 76px;
          height: 25px;
          color: #737373;
          border-radius: 26px;
          right: 0;
          top: 10px;
          line-height: 25px;
          text-align: center;
          border: 1px solid #f4f4f4;
          z-index: 9;
        }
      }
      input {
        font-size: 14px;
        width: 100%;
        height: 100%;
      }
    }
    #login_btn {
      width: 120px;
      height: 32px;
      background: @bgColor;
      border-radius: 100px;
      color: white;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
    }
  }
}
</style>
