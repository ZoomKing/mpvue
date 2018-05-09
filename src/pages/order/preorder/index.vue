<template lang="pug">
.preorder
    .preorder_content
      addressContent(:addressInfo='preorder.showAddress')
      //- 商品信息
      goodsInfo(v-for='(item,index) in pre_order_info.normalList',:key='index',:dataInfo='item',@listenFromChild="listenFromChild",:memo='memo')
      //- 发票
      a.invoice(:href='aHref')
          view.invoice_name {{'发票'}}
          view.invoice_choose
              text {{invoiceText}}
              img(src='/static/assets/arrow_right_16_icon.png')
      //- 总金额
      .allPrice
          view.allPrice_name {{'总金额'}}
          view.allPrice_money {{'￥'+sumTotalFeeCent}}
      .submit_order
          view {{'¥'+sumTotalFeeCent}}
          view#submit_btn(@click='createOrder') {{submit_btn_text}}
    .preorder_bottom
    importAddress(v-if='preorder.importAddressState')
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import goodsInfo from './components/goods-info'
import addressContent from './components/show-address'
import importAddress from './components/import-address'
import global from '@/global'
import api from './api'
export default {
  data(){
    return{
        pre_order_info:{},
        //invoiceText 发票简单信息展示
        invoiceText:'',
        creat_parameter:{
            'payFeeCent':'',
            'groupList':[],
            'invoice':{},
            'receiver':null,
            'orderType':1,
            // tuanId 新开团的时候不要传，参团的时候需要传
        },
        memo:'',
        action:'',
        retryCount:3
    }
  },
  onShow(){
    //重置付款次数
    this.retryCount = 3;
    //禁止分享
    wx.hideShareMenu()
    // console.log(this.preorder.pre_order_parameter)
    // console.log(this.preorder.create_pintuanId)
    // 重置导入地址时的状态
    this.changeImportAddressState(false);
    //获取地址列表
    this.getAddress();
    // 获取预下单信息
    this.getPreOrder(this.preorder.pre_order_parameter);
    //这里不建议使用computed去处理，在数据未发生变化时，优先读取缓存。
    //computed 计算属性只有在相关的数据发生变化时才会改变要计算的属性，当相关数据没有变化是，它会读取缓存。
    //而不必想 motheds方法 和 watch 方法是的每次都去执行函数。
    //由于会有缓存值的情况，所以第一次可以改变状态，第二次则因为缓存的情况不会执行computed,故而不采用.
    if(this.preorder.invoiceInfo.type == 1){
        this.invoiceText =  '不开发票'
    }else if(this.preorder.invoiceInfo.titleType==1){
        this.invoiceText =  '个人发票'
    }else if(this.preorder.invoiceInfo.titleType==2){
        this.invoiceText =  '企业发票'
    }
  },
  computed: {
      ...mapState(["preorder",'common']),
      aHref(){
        return `/pages/order/invoice`
      },
      sumTotalFeeCent(){
          return parseFloat(this.pre_order_info.sumTotalFeeCent/100).toFixed(2)
      },
      submit_btn_text(){
        switch(this.preorder.pre_order_parameter.orderType){
            case 3 :
            return '提交分期订单'
            break;
            case 4 :
            return '提交拼团订单'
            break;
            case 5 :
            return '提交一分抽订单'
            break;
            default :
            return '提交订单'
            break;
        }
      }
  },
  mounted () {
  
  },
 
  onReachBottom () {
    
  },
  methods: {
    ...mapMutations([  
        'changeShowAddress','changePaySuccessInfo','changeImportAddressState'
    ]),
    listenFromChild(msg){
        this.memo = msg;
    },
    async getAddress(){
      //判断若是vuex的showAddress没有值，则用默认的值，若有值，则用showAddress
    //   console.log(this.preorder.showAddress.region)
      if(!this.preorder.showAddress.region){
          const res = await  api.get_address_list();
          res.value.forEach((item,index)=>{
            if(item.isDefault){
                this.changeShowAddress(item)
            }
          })
      }
    },
    async getPreOrder(obj){
        const res = await api.get_pre_order(obj);
        this.pre_order_info = res.value;
    },
    createOrder(){
      this.creat_parameter ={
          'payFeeCent':this.pre_order_info.sumTotalFeeCent,
          'groupList':[
              {
                  'merchantId':this.pre_order_info.normalList[0].merchantId,
                  'memo':this.memo,
                  'itemList':this.preorder.pre_order_parameter.itemList
              }
          ],
          'invoice':this.preorder.invoiceInfo,
          'orderType':this.preorder.pre_order_parameter.orderType,
          'useCoupon':false
      }
      //判断地址是否存在
      if(this.preorder.showAddress.phone){
          this.creat_parameter.receiver ={
                "receiverName": this.preorder.showAddress.name,
               "receiverPhone": this.preorder.showAddress.phone,
               "receiverAddress": this.preorder.showAddress.region+' '+this.preorder.showAddress.address
          }
      }else{
        wx.showToast({
            title: '您还没有添加地址哦~',
            icon: 'none'
        })
        return;
      }
    //是拼团商品
      if(this.preorder.create_pintuanId){
          this.creat_parameter.tuanId = this.preorder.create_pintuanId;
      }
      // console.log(this.creat_parameter);
      
      this.creatOrderFunc(this.creat_parameter);
    },
    async creatOrderFunc(obj){
        let res = await api.create_order(obj);
        if(res.succ){
            this.creat_parameter = {}
        }
        this.prePayment({'orderIds':res.value.orderIds});
    },
    async prePayment(obj){
      const res = await api.pre_payment(obj);
      // console.log(res);
      let parameter = {
        'payType':6,
        'payFeeCent':res.value.payFeeCent,
        'orderIds': res.value.orderIds
      };
      this.orderPay(parameter)
    },
    async orderPay(obj){
      const res = await api.order_pay(obj);
      // console.log(res);
      global.payId = res.value.payId;
      let wechatPay = res.value.wechatPay;
      wx.requestPayment(
      {
        'timeStamp': wechatPay.timeStamp,
        'nonceStr': wechatPay.nonceStr,
        'package': wechatPay.pkg,
        'signType': 'MD5',
        'paySign': wechatPay.sign,
        'success':(result)=>{
            // wx.showLoading({
            //   title: '支付处理中...',
            // })
            this.getPayResult({'payId':global.payId})
            
        },
        'fail':function(res){
           wx.switchTab({
                url: '/pages/order/myorder'
            })
        },
        'complete':function(res){}
      })
    },
    async getPayResult(obj){
            const res = await api.pay_result(obj);
            console.log(this.retryCount)
            if(this.retryCount<=0){
                wx.switchTab({
                    url: '/pages/order/myorder'
                });
                return;
            }
            // console.log(res.value.paySuccess);
            if(res.value.paySuccess){
                // wx.hideLoading();
                this.changePaySuccessInfo(res.value);
                 wx.redirectTo({
                    url: '/pages/order/paySuccess'
                })
            }else{
              var that = this;
              this.retryCount--;
               setTimeout(()=>{
                    that.getPayResult({'payId':global.payId});
                },1000)
            }
       },
  },
  components:{
    goodsInfo,addressContent,importAddress
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");

.invoice{
  width: 375px;
  padding: 0 20px;
  box-sizing: border-box;
  height: 54px;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  line-height: 44px;
  border-bottom: 10px solid #f7f8fa;
  .invoice_name{
    width: 30px;
  }
  .invoice_choose{
    flex:1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    text{
      padding-right: 10px;
    }
    img{
      width: 24px;
      height: 24px;
    }
  }
}
.allPrice{
  width: 375px;
  padding: 0 20px;
  box-sizing: border-box;
  height: 34px;
  overflow: hidden;
  font-size: 14px;
  display: flex;
  justify-content: space-between;
  line-height: 34px;
}
.preorder{
  display: flex;
  width: 100vw;
  height: 100vh;
  flex-direction: column;
  .preorder_bottom{
    flex:1;
    background: #f7f8fa;
  }
}
.submit_order{
  position: fixed;
  bottom: 0;
  width: 375px;
  height: 48px;
  line-height: 48px;
  background: white;
  display: flex;
  font-size: 18px;
  justify-content: space-between;
  view:nth-child(1){
    flex:1;
    padding-right: 10px;
    text-align: right;
  }
  #submit_btn{
    width: 136px;
    height: 48px;
    background: @bgColor;
    text-align: center;
    color: white;
  }
}
</style>
