<template lang="pug">
.bind
    img.welcome_img(mode='widthFix' src='/static/assets/login_bg_pic@3x.png')
    .bind_content
        view
            input(placeholder='手机号',v-model='phoneNumber')
        view 
            input(placeholder='验证码',v-model='code')
            view#sendCode(@click='sendCode') {{sendCodeText}}
    view#login_btn(@click='registerFunc') {{'登录'}}
    
</template>

<script>
import global from '@/global'
import {checkPhone} from '@/utils'
import api from './api'
export default {
  data(){
      return {
          phoneNumber:'',
          code:'',
          nickName:'',
          avatarUrl:'',
          sendCodeText:'发送验证码',
          second:60
      }
  },
  methods:{
      async sendCode(){
          //判断手机号吗格式
        checkPhone(this.phoneNumber);
        let data = await api.send_confirm_code(this.phoneNumber);
        console.log(data);
        let timer;
        if(data.succ){
             wx.showToast({
                title: '验证码发送成功',
                icon: 'none',
                duration: 2000
            })
            timer = setInterval(()=>{
                this.second--;
                this.sendCodeText = this.second+'秒'
                if(this.second<=0){
                    this.sendCodeText = '发送验证码';
                    clearInterval(timer)
                }
            },1000)
        }
        wx.getUserInfo({
            success: (res)=>{
                let userInfo = res.userInfo
                this.nickName = userInfo.nickName;
                this.avatarUrl = userInfo.avatarUrl;
            }
        })
      },
    async registerFunc(){
        if(this.phoneNumber.replace(/(^\s*)|(\s*$)/g, "")==''){
            wx.showToast({
                title: '请输入手机号',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        if(this.code.replace(/(^\s*)|(\s*$)/g, "")==''){
             wx.showToast({
                title: '请输入验证码',
                icon: 'none',
                duration: 2000
            })
            return;
        }
        let data = await api.register({
            'smartId':global.smartId,
            'nick':this.nickName,
            'avatarUrl':this.avatarUrl,
            'phone':this.phoneNumber,
            'confirmCode':this.code
        })
        console.log(data);
             //设置登录token
        wx.setStorage({
            key:"storage_token",
            data:data.value.token
        }) 
        wx.reLaunch({
            url: '/pages/home/list'
        })
      }
  },
  mounted () {
      
  },

}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.welcome_img{
    height: 120px;
    width: 100%;
}
.bind_content{
    margin: 50px 0;
    overflow: hidden;
    >view{
        width: 335px;
        height: 54px;
        margin: 0 auto 10px;
        border-bottom: 1px solid #f4f4f4;
        position: relative;
        #sendCode{
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
            border:1px solid #f4f4f4;
            z-index: 9;
        }
    }
    input{
        font-size: 14px;
        width: 100%;
        height: 100%;
    }
}
#login_btn{
    width: 335px;
    height: 48px;
    background: @bgColor;
    margin: 50px auto;
    border-radius: 100px;
    color: white;
    line-height: 48px;
    text-align: center;
}
</style>
