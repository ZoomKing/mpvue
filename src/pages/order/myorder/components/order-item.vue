<template lang="pug">
a.order_item(:href='aHref')
    .order_item_title
        view {{dataInfo.title}}
        view {{dataInfo.orderStatusDesc}}
    .goodsList
        goodsItem(v-for='(item,index) in dataInfo.subOrderList', :key='index',:itemInfo='item')
    .goods_price
        text {{'共'+dataInfo.totalNum+'件总计'}}
        text {{'¥'+totalFeeCent}}
    .goods_share(v-if='dataInfo.orderStatus==6')
        view(@click.stop='phoneCall')
            img(src='/static/assets/usercenter_customer_service_icon_common@3x.png')
            text {{'联系客服'}}
        view {{'立即分享'}}
    .goods_confirm(v-else-if='dataInfo.orderStatus==3')
        view
            img(src='/static/assets/usercenter_customer_service_icon_common@3x.png')
            text {{'联系客服'}}
        view(@click.stop='confirmReceipt(dataInfo.orderId)') {{'确认收获'}}
    .goods_deal(v-else-if='dataInfo.orderStatus==1')
        .goods_deal_top
            view
                img(src='/static/assets/usercenter_customer_service_icon_common@3x.png')
                text {{'联系客服'}}
            view
                view(@click.stop='cancel(dataInfo.orderId)') {{'取消订单'}}
                view(@click.stop='prePayment(dataInfo.orderId)') {{'立即付款'}}
        .goods_deal_bottom
            text {{'支付倒计时'}}
            text {{time}}
    
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {formatTime2,refreshPage}  from '@/utils'
import goodsItem from './goods-item'
import global from '@/global'
import api from '../api'
export default {
  data(){
      return {
         time:'00:00:00'
      }
  },
  props:{
      dataInfo:{
          type:Object,
          default:{}
      }
  },
  computed: {
    totalFeeCent(){
        return parseFloat(this.dataInfo.totalFeeCent/100).toFixed(2)
    },
    aHref(){
        return  `/pages/order/orderdetail?id=${this.dataInfo.orderId}`
    }
  },
  mounted () {
      setInterval(()=>{
          this.time = formatTime2(this.dataInfo.payExpireTime);
          if(this.time=='00:00:00'){
              wx.redirectTo({
                url: '/pages/order/myorder'
            })
          }
      },1000)
  },
  
  onReachBottom () {
  },
  methods: {
    cancel(orderId){
        // console.log(orderId)
        orderId = orderId + '';
        let that = this;
        wx.showModal({
            title: '提示',
            content: '确定取消订单?',
            success: function(res) {
                if (res.confirm) {
                    that.cancelOrder(orderId);
                } else if (res.cancel) {
                }
            }
        })
    },
    async cancelOrder(orderId){
        const res = await api.cancel_order(orderId)
        if(res.succ){
            wx.showToast({
                title: '订单取消成功',
                icon: 'none'
            })
            refreshPage('reLaunch');
        }
    },
    phoneCall(){
        wx.makePhoneCall({
            phoneNumber: global.serviceTel 
        })
    },
    confirmReceipt(orderId){
        var that = this;
        wx.showModal({
            title: '提示',
            content: '确定收货?',
            success: function(res) {
                if (res.confirm) {
                    that.confirmReceiptFun(orderId);
                } else if (res.cancel) {
                }
            }
        })
    },
    async confirmReceiptFun(orderId){
        const res = await api.confirm_receipt(orderId);
        console.log(res);
        if(res.succ){
            wx.showToast({
                title: '确认收货成功',
                icon: 'none'
            })
            refreshPage('reLaunch');
        }
    }, 
    async prePayment(orderId){
        orderId = orderId + ''
      const res = await api.pre_payment({'orderIds':[orderId]});
      console.log(res);
      let parameter = {
        'payType':6,
        'payFeeCent':res.value.payFeeCent,
        'orderIds': res.value.orderIds
      };
      this.orderPay(parameter)
    },
    async orderPay(obj){
      const res = await api.order_pay(obj);
      console.log(res);
      global.payId = res.value.payId;
      let wechatPay = res.value.wechatPay;
      wx.requestPayment(
      {
        'timeStamp': wechatPay.timeStamp,
        'nonceStr': wechatPay.nonceStr,
        'package': wechatPay.pkg,
        'signType': 'MD5',
        'paySign': wechatPay.sign,
        'success':function(res){
             wx.navigateTo({
                url: '/pages/order/paySuccess'
            })
        },
        'fail':function(res){
        //   console.log(res)
            wx.switchTab({
                url: '/pages/order/myorder'
            })
        },
        'complete':function(res){}
      })
    }
  },
  components:{
      goodsItem
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.order_item{
    border-bottom: 10px solid #f7f8fa;
    .order_item_title{
        width: 375px;
        height: 44px;
        font-size: 14px;
        display: flex;
        align-items: center;
        border-bottom: 1px solid #f4f4f4;
        box-sizing: border-box;
        padding: 0 20px;
        justify-content: space-between;
        view:nth-child(2){
            color:@bgColor;
            font-size: 12px;
        }
    }
    .goods_price{
        height: 44px;
        line-height: 44px;
        width: 335px;
        margin: 0 auto;
        display: flex;
        justify-content: flex-end;
        border-bottom: 1px solid #f4f4f4;
        text:nth-child(1){
            font-size: 12px;
        }
        text:nth-child(2){
            padding-left: 10px;
            font-size: 24px;
            font-family:PTSans-Caption;
        }
    }
    .goods_share,.goods_confirm{
        display: flex;
        height: 44px;
        align-items: center;
        font-size: 10px;
        line-height: 44px;
        box-sizing: border-box;
        padding: 0 20px;
        justify-content: space-between;
        view:nth-child(1){
            display: flex;
            align-items: center;
            img{
                width: 16px;
                height: 16px;
                margin-right: 5px;
            }
        }
        button:nth-child(2),view:nth-child(2){
            font-size: 12px;
            width: 76px;
            height: 25px;
            background: @bgColor;
            text-align: center;
            line-height: 25px;
            color: white;
            border-radius: 22px;
        }
        button{
            margin: 0;
        }
    }
    .goods_deal{
        font-size: 12px;
        width: 100%;
        padding: 0 20px;
        box-sizing: border-box;
        .goods_deal_top{
            height: 44px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            >view:nth-child(1){
                display: flex;
                align-items: center;
                font-size: 10px;
                img{
                    width: 16px;
                    height: 16px;
                    margin-right: 5px;
                }
            }
            >view:nth-child(2){
                display: flex;
                >view{
                    width: 76px;
                    height: 25px;
                    border-radius: 25px;
                    text-align: center;
                    line-height: 25px;
                }
                >view:nth-child(1){
                    color: #FF9DB4;
                    border: 1px solid #FF9DB4;
                    margin-right: 10px;
                }
                >view:nth-child(2){
                    background: @bgColor;
                    color: white;
                }
            }
        }
        .goods_deal_bottom{
            height: 30px;
            display: flex;
            justify-content: flex-end;
            text:nth-child(2){
                color: #5891EB;
                padding-left: 5px;
            }
        }
    }
}
</style>
