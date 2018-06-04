<template lang="pug">
.invoice
    .invoice_choose
        text {{'发票类型'}}
        view
            text {{'电子发票'}}
    .invoice_type
        text {{'抬头类型'}}
        view(@click='changeTitleType(true)')
            img(:src="change_title_type_state?'/static/assets/order_setting_radio_on_common_icon@3x.png':'/static/assets/order_setting_radio_off_common_icon@3x.png'",)
            text {{'个人'}}
        view(@click='changeTitleType(false)')
            img(:src="change_title_type_state?'/static/assets/order_setting_radio_off_common_icon@3x.png':'/static/assets/order_setting_radio_on_common_icon@3x.png'",)
            text {{'企业'}}
    .invoice_content_company
        view
            text {{'发票抬头'}}
            input(placeholder='请输入发票抬头',v-model='title')
        view(v-if='!change_title_type_state')
            text {{'纳税识别号'}}
            input(placeholder='请输入纳税识别号',v-model='taxId',maxlength='18')
        view
            text {{'收票人邮箱'}}
            input(placeholder='请输入邮箱(非必须)',v-model='email')
    view.invoice_btn
      #save_invoice(@click='save_invoice') {{'保存'}}

</template>

<script>
import { mapState,mapMutations} from 'vuex';
import api from './api'
export default {
  data(){
      return{
        //需不需要开发票 change_type_state == true 不需要 
        change_type_state:false,
        // 发票类型 change_title_type_state == true 个人 change_title_type_state==false 单位
        change_title_type_state:true,
        invoiceInfo:{},
        title:'',
        taxId:'',
        email:''
      }
  },
  computed: {
  },
  mounted () {
    
  },
  onShow(){
    //禁止分享
    wx.hideShareMenu()
  },
  onReachBottom () {
    
  },
  methods: {
    ...mapMutations(['changeInvoice']),
    changeTitleType(value){
      this.change_title_type_state = value;
    },
    save_invoice(){
        this.invoiceInfo.type= 2;
        this.invoiceInfo.title = this.title;
         if(this.title.replace(/(^\s*)|(\s*$)/g, "")==''){
              wx.showToast({
                title: '请填写发票抬头',
                icon: 'none',
                duration: 2000
              })
              return;
          }
        if(this.change_title_type_state){
          this.invoiceInfo.titleType = 1;
        }else{
          this.invoiceInfo.titleType = 2;
          this.invoiceInfo.taxId = this.taxId;
          if(this.taxId.replace(/(^\s*)|(\s*$)/g, "")==''){
              wx.showToast({
                title: '请填写发票税号',
                icon: 'none',
                duration: 2000
              })
              return;
          }
        }
        this.invoiceInfo.email = this.email;
        //email 非必填项
        // if(this.email.replace(/(^\s*)|(\s*$)/g, "")==''){
        //       wx.showToast({
        //         title: '请填写收件人邮箱',
        //         icon: 'none',
        //         duration: 2000
        //       })
        //       return;
        // }
      
        console.log(this.invoiceInfo);
        this.add_invoice(this.invoiceInfo)
       
    },
    async add_invoice(obj){
      let wipRes = await api.add_invoice(obj);
      console.log(wipRes);
      if(wipRes.succ){
          this.changeInvoice(this.invoiceInfo);
          //清空之前填写的发票信息
          this.title = '';
          this.taxId = '';
          this.email = '';
          wx.navigateBack({
                // url: '/pages/order/preorder'
                delta:2
          })
      }
    }
  },
  components:{
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.invoice_choose{
  display: flex;
  font-size: 14px;
  width: 375px;
  box-sizing: border-box;
  padding: 0 20px;
  height: 55px;
  align-items: center;
  border-top: 1px solid #f4f4f4;
  border-bottom: 10px solid #f7f8fa;
  >text{
    width: 100px;
  }
  >view{
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img{
      width: 16px;
      height: 16px;
      margin-right: 5px;
    }
  }
}
.invoice_type{
  display: flex;
  font-size: 14px;
  width: 375px;
  box-sizing: border-box;
  padding: 0 20px;
  height: 44px;
  align-items: center;
  >text{
    width: 150px;
  }
  >view{
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    img{
      width: 19px;
      height: 19px;
      margin-right: 5px;
    }
  }
}
.invoice_content_personal,.invoice_content_company{
  width: 375px;
  font-size: 14px;
  box-sizing: border-box;
  padding: 0 20px 10px;
  border-bottom: 1px solid #f4f4f4;
  >view{
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 44px;
    text{
      display: inline-block;
      width: 100px;
    }
    input{
      text-align: right;
    }
  }
}
.invoice_btn{
  width: 100%;
  height: 48px;
  position: fixed;
  bottom: 0;
  left: 0;
  font-size: 18px;
  line-height: 48px;
  text-align: center;
  display: flex;
  view{
    flex:1;
  }
  #get_invoice_fromwx{
    background: @normalFontColor;
    color: white;
  }
  #save_invoice{
    background: @bgColor;
    color:white;
  }
}

</style>
