<template lang="pug">
.active_state_detail
    paySuccessPinCan(v-if='successInfo.tuanDetail&&successInfo.tuanDetail.status==3',:dataInfo='successInfo.tuanDetail')
    paySuccessPinKai(v-else-if='successInfo.tuanDetail',:dataInfo='successInfo.tuanDetail')
    paySuccessCentCan(v-else-if='successInfo.centDrawDetail&&successInfo.centDrawDetail.status==3',:dataInfo='successInfo.centDrawDetail')
    paySuccessCentKai(v-else-if='successInfo.centDrawDetail',:dataInfo='successInfo.centDrawDetail')
    paySuccessSingle(v-else)
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import paySuccessPinKai from './components/paySuccess-pin-kai'
import paySuccessPinCan from './components/paySuccess-pin-can'
import paySuccessCentKai from './components/paySuccess-cent-kai'
import paySuccessCentCan from './components/paySuccess-cent-can'
import paySuccessSingle from './components/paySuccess-single'
import global from '@/global'
import {schemesUrl} from '@/utils'
import api from './api'
export default {
   data(){
       return {
           successInfo:{}
       }
   },
   computed: {
       ...mapState(["preorder"]),
       pin(){
           if(this.successInfo.tuanDetail){
            //    拼团商品处理
               if(this.successInfo.tuanDetail.status==1){
                   return false
               }else if(this.successInfo.tuanDetail.status==2){
                   return true
               }else if(this.successInfo.tuanDetail.status==3){
                   return false
               }
           }else if(this.successInfo.centDrawDetail){
            //    一分抽商品处理
               if(this.successInfo.centDrawDetail.status==1){
                   return false
               }else if(this.successInfo.centDrawDetail.status==2){
                   return true
               }else if(this.successInfo.centDrawDetail.status==3){
                   return false
               }
           }else{
               //
           }
       },
   },
   methods: {
    //    async getPayResult(obj){
    //         const res = await api.get_pay_id(obj);
    //         console.log(res);
    //         this.successInfo = res.value;
    //         if(!res.value.paySuccess){
    //             setTimeout(()=>{
    //                 this.getPayResult({'payId':global.payId});
    //             },1000)
    //         }
    //    },
   },
   mounted(){
    //    console.log(this.preorder.paySuccessInfo);
       this.successInfo = this.preorder.paySuccessInfo;
    //    this.getPayResult({'payId':global.payId})
   },
   components: {
       paySuccessPinKai,paySuccessPinCan,paySuccessCentKai,paySuccessCentCan,paySuccessSingle
   },
   onShareAppMessage: function (res) {
       let info;
       if(this.successInfo.tuanDetail){
           info = this.successInfo.tuanDetail
       }else if(this.successInfo.centDrawDetail){
           info = this.successInfo.centDrawDetail
       }
        return {
            title: info.shareInfo.shareTitle,
            imageUrl:info.shareInfo.shareIcon+'@!1200',
            path: info.shareInfo.smartUrl,
            success: function(res) {
                // 转发成功;
               wx.showToast({
                    title: '分享成功',
                    icon: 'none'
                })
            },
            fail: function(res) {
                // 转发失败
               wx.showToast({
                    title: '分享失败',
                    icon: 'none'
                })
            }
        }
    }
 
}
</script>

<style lang="less">
@import url("~@/styles/init");
.backToHome{
  width: 40px;
  height: 40px;
  position: fixed;
  border-radius: 50%;
  bottom: 100px;
  right:20px;
  background: rgba(256, 256, 256, 1);
  border: 1px solid #b2b2b2;
  font-size: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
  padding: 5px;
  img{
    width: 16px;
    height: 16px;
    
  }
}
</style>
