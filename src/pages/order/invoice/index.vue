<template lang="pug">
.invoice
    .invoice_choose
        text {{'发票类型'}}
        view
            img(:src="change_type_state?'/static/assets/payment_check_common_icon@3x.png':'/static/assets/payment_uncheck_common_icon@3x.png'",@click='changeType(true)')
            text {{'不开发票'}}
        view
            img(:src="change_type_state?'/static/assets/payment_uncheck_common_icon@3x.png':'/static/assets/payment_check_common_icon@3x.png'",@click='changeType(false)')
            text {{'电子发票'}}
    .invoice_type(v-if='!change_type_state')
        text {{'抬头类型'}}
        view
            img(:src="change_title_type_state?'/static/assets/order_setting_radio_on_common_icon@3x.png':'/static/assets/order_setting_radio_off_common_icon@3x.png'",@click='changeTitleType(true)')
            text {{'个人'}}
        view
            img(:src="change_title_type_state?'/static/assets/order_setting_radio_off_common_icon@3x.png':'/static/assets/order_setting_radio_on_common_icon@3x.png'",@click='changeTitleType(false)')
            text {{'企业'}}
    .invoice_content_company(v-if='!change_type_state')
        view
            text {{'发票抬头'}}
            input(placeholder='请输入发票抬头',v-model='title')
        view(v-if='!change_title_type_state')
            text {{'纳税识别号'}}
            input(placeholder='请输入纳税识别号',v-model='taxId')
        view
            text {{'收票人邮箱'}}
            input(placeholder='请输入收件人邮箱',v-model='email')
    view.invoice_btn
      #get_invoice_fromwx(@click='get_invoice_fromwx',v-if='!change_title_type_state') {{'从微信导入'}}
      #save_invoice(@click='save_invoice') {{'保存'}}

</template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
  data(){
      return{
        //需不需要开发票 change_type_state == true 不需要 
        change_type_state:true,
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
    changeType(value){
        this.change_type_state = value;
    },
    changeTitleType(value){
      this.change_title_type_state = value;
    },
    get_invoice_fromwx(){
      let that = this;
      wx.chooseInvoiceTitle({
        success(res) {
          wx.showToast({
            title: '导入发票成功',
            icon: 'none'
          })
          // console.log(this);
          that.title = res.title;
          that.taxId = res.taxNumber;
        },
        fail(res){
             wx.showToast({
              title: '导入发票失败,请手动添加',
              icon: 'none'
            })
        }
      })
    },
    save_invoice(){
      if(this.change_type_state){
          this.invoiceInfo.type=1;
      }else{
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
        if(this.email.replace(/(^\s*)|(\s*$)/g, "")==''){
              wx.showToast({
                title: '请填写收件人邮箱',
                icon: 'none',
                duration: 2000
              })
              return;
          }
      }
      // console.log(this.invoiceInfo);
      this.changeInvoice(this.invoiceInfo);
      wx.navigateBack({
            // url: '/pages/order/preorder'
            delta:1
      })
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
