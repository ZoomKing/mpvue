<template lang="pug">
.order_detail
    .order_detail_status
        view {{detail.orderStatusDesc}}
        view(v-if='timeStatus')
            text {{'结束倒计时'}}
            text {{timeContext}}
    //-通知消息
    noticeInfo(:dataInfo='detail.logistics',v-if='detail.logistics')
    //- 地址信息
    addressContent(:receiverName='detail.receiverName',:receiverPhone='detail.receiverPhone',:receiverAddress='detail.receiverAddress')
    //- 拼团人员信息
    pintuanInfo(:dataInfo='tuanInfo',v-if='tuanInfo')
    //- 商品详情信息
    .goodsDetail
        .goods_info_title {{detail.title}}
        goodsInfo(:subOrderList='detail.subOrderList',)
        .goods_info_content_remark
            text {{'备注：'+memo}}
        view.total
            text {{'共'+detail.totalNum+'件总计'}}
            text {{'¥'+totalFeeCent}}
    //- 支付方式，订单总额，实付金额
    paymentStyle(:payType='detail.payType',:totalFeeCent='detail.totalFeeCent',:payFeeCent='detail.payFeeCent')
    //- 发票
    repairInvoice(v-if='detail.invoiceEmail',:invoiceEmail='detail.invoiceEmail',:invoiceTaxId='detail.invoiceTaxId',:invoiceTitle='detail.invoiceTitle')
    //- 补开发票
    .repair_invoice(v-else,@click='invoiceBtn',)
        text {{'补开发票'}}
        img(src='/static/assets/clrrow_right_16_icon.png')
    //- 订单编号，下单时间，付款时间等信息
    orderNumber(:orderId='detail.orderId',:createTime='detail.createTime',:payTime='detail.payTime',)
    //- 联系客服
    .customer_server(@click='phoneCall')
        view
            img(src='/static/assets/usercenter_customer_service_icon_common@3x.png')
            text {{'联系客服'}}
    .order_operation(v-if='orderStatus==1')
        button.cancel_order(@click='cancelOrder(detail.orderId)') {{'取消订单'}}
        button.share_now(@click.stop='prePayment(detail.orderId)') {{'立即支付'}}
    .order_operation(v-else-if="orderStatus==3")
        button.cancel_order(@click='confirmReceipt(detail.orderId)') {{'确认收货'}}
    .order_operation(v-else-if="orderStatus==6")
        button.share_now(open-type="share") {{'立即分享'}}
    toast(v-if='common.toast_state',:dataInfo='toastInfo')
</template>

<script>
import { mapState, mapMutations } from "vuex";
import noticeInfo from "./components/notice-info";
import addressContent from "./components/show-address";
import goodsInfo from "./components/goods-info";
import paymentStyle from "./components/payment-style";
import orderNumber from "./components/order-number";
import pintuanInfo from "./components/pintuan-info";
import repairInvoice from "./components/repair-invoice";
import toast from "@/components/toast";
import { formatTime2, schemesUrl, refreshPage } from "@/utils";
import commonApi from "@/utils/commonApi";
import global from "@/global";
import api from "./api";
export default {
  data() {
    return {
      detail: {},
      order_cancel_state: false,
      toastInfo: {
        title: "暂无法取消",
        context: "发起拼团24小时后，若未拼团成功将自动取消订单并退款哦"
      },
      timeContext: "00:00:00",
      timeStatus: false,
      shareShow: false,
      tuanInfo: null,
      orderStatus: 1,
      retryCount:3
    };
  },
  computed: {
    ...mapState(["common"]),
    memo() {
      return this.detail.memo ? this.detail.memo : "暂无备注";
    },
    totalFeeCent() {
      return parseFloat(this.detail.totalFeeCent / 100).toFixed(2);
    }
  },
  onShow() {
    //禁止分享
    wx.hideShareMenu();
    //重置付款回调次数
    this.retryCount = 3;
    this.tuanInfo = null;
    this.getDetail(this.$root.$mp.query.id);
  },
  mounted() {
    setInterval(() => {
      if(this.detail.orderStatus==6){
          let wip = '';
          if(this.detail.centDrawInfo){
              this.timeContext = formatTime2(this.detail.centDrawInfo.endTime);
          }else if(this.detail.pintuanInfo){
              this.timeContext = formatTime2(this.detail.pintuanInfo.endTime);
          }
      }else if(this.detail.orderStatus==1){
           this.timeContext = formatTime2(this.detail.payExpireTime);
      }
      // console.log(this.timeContext)
      if (this.timeContext.indexOf("-") != -1) {
        this.timeStatus = false;
      }
    }, 1000);
  },

  onReachBottom() {},
  methods: {
    ...mapMutations(["changeToast",'changePaySuccessInfo']),
    async getDetail(orderId) {
      //   console.log(orderId);
      const res = await api.get_order_detail(orderId);
      // console.log(res);
      this.detail = res.value;
      this.orderStatus = res.value.orderStatus;
      if (res.value.pintuanInfo) {
        this.tuanInfo = res.value.pintuanInfo;
      } else if (res.value.centDrawInfo) {
        this.tuanInfo = res.value.centDrawInfo;
      }
      //判断是不是待支付状态，或者是待分享状态，显示倒计时
      if (res.value.orderStatus == 1 ||res.value.orderStatus == 6) {
        this.timeStatus = true;
      }
    },
    show_order_cancel_state(msg) {
      console.log(msg);
      this.order_cancel_state = msg;
    },
    phoneCall() {
      wx.makePhoneCall({
        phoneNumber: global.serviceTel
      });
    },
    async cancelOrder(orderId) {
      console.log(orderId);
      const res = await api.cancel_order(orderId);
      if (res.succ) {
        wx.showToast({
          title: "订单取消成功",
          icon: "none"
        });
        this.timeStatus = false;
        refreshPage("redirectTo");
      }
    },
    invoiceBtn() {
      this.toastInfo = {
        title: "小程序暂无法补开",
        context: "请下载品库app补开发票"
      };
      this.changeToast(true);
    },
    async shareCb(orderType) {
      if (orderType == 4) {
        const res = await commonApi.pintuan_share_detail(orderType);
        console.log(res);
      } else if (orderType == 5) {
        const res = await commonApi.cent_share_detail(orderType);
      }
    },
    async confirmReceipt(orderId) {
      const res = await api.confirm_receipt(orderId);
      console.log(res);
      if (res.succ) {
        wx.showToast({
          title: "确认收货成功",
          icon: "none"
        });
        refreshPage("redirectTo");
      }
    },
    async prePayment(orderId) {
      orderId = orderId + "";
      const res = await api.pre_payment({ orderIds: [orderId] });
      console.log(res);
      let parameter = {
        payType: 6,
        payFeeCent: res.value.payFeeCent,
        orderIds: res.value.orderIds
      };
      this.orderPay(parameter);
    },
    async orderPay(obj) {
      const res = await api.order_pay(obj);
      console.log(res);
      global.payId = res.value.payId;
      let wechatPay = res.value.wechatPay;
      wx.requestPayment({
        timeStamp: wechatPay.timeStamp,
        nonceStr: wechatPay.nonceStr,
        package: wechatPay.pkg,
        signType: "MD5",
        paySign: wechatPay.sign,
        success: (res)=> {
           this.getPayResult({'payId':global.payId})
          // wx.navigateTo({
          //   url: "/pages/order/paySuccess"
          // });
        },
        fail: function(res) {
          //   console.log(res)
          wx.switchTab({
            url: "/pages/order/myorder"
          });
        },
        complete: function(res) {}
      });
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
  onShareAppMessage(res) {
    //   console.log(this.detail.orderType)
    let url, title, imageUrl;
    if (this.detail.pintuanInfo) {
      title = this.detail.pintuanInfo.shareInfo.shareTitle;
      url = this.detail.pintuanInfo.shareInfo.smartUrl;
      imageUrl = this.detail.pintuanInfo.shareInfo.shareIcon + "@!1200";
    } else if (this.detail.centDrawInfo) {
      title = this.detail.centDrawInfo.shareInfo.shareTitle;
      url = this.detail.centDrawInfo.shareInfo.smartUrl;
      imageUrl = this.detail.centDrawInfo.shareInfo.shareIcon + "@!1200";
    }
    return {
      title: title,
      path: url,
      imageUrl: imageUrl,
      success: res => {
        // 转发成功;
        console.log(this);
        // this.shareCb(this.detail.orderType)
        wx.showToast({
          title: "分享成功",
          icon: "none"
        });
      },
      fail: function(res) {
        // 转发失败
        wx.showToast({
          title: "分享失败",
          icon: "none"
        });
      }
    };
  },
  components: {
    noticeInfo,
    addressContent,
    goodsInfo,
    paymentStyle,
    orderNumber,
    pintuanInfo,
    toast,
    repairInvoice
  }
};
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.order_detail {
  .order_detail_status {
    width: 375px;
    height: 120px;
    background: #f7f8fa;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
    padding: 0 20px;
    view:nth-child(1) {
      font-size: 24px;
    }
    view:nth-child(2) {
      font-size: 12px;
      text:nth-child(2) {
        font-size: 14px;
        padding-left: 10px;
        color: #5891eb;
      }
    }
    // line-height: 120px;
  }
  .repair_invoice {
    width: 375px;
    height: 44px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 14px;
    box-sizing: border-box;
    padding: 0 20px;
    border-bottom: 10px solid #f7f8fa;
    img {
      width: 16px;
      height: 16px;
    }
  }
  .customer_server {
    display: flex;
    height: 44px;
    padding-bottom: 100px;
    > view {
      flex: 1;
      display: flex;
      box-sizing: border-box;
      font-size: 10px;
      justify-content: center;
      align-items: center;
      color: #737373;
      img {
        width: 16px;
        height: 16px;
        margin-right: 10px;
      }
    }
  }
  .order_operation {
    width: 375px;
    height: 54px;
    position: fixed;
    box-sizing: border-box;
    padding: 0 20px;
    bottom: 0;
    background: white;
    box-shadow: 0px 2px 4px #000;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    button {
      width: 80px;
      height: 25px;
      text-align: center;
      line-height: 25px;
      font-size: 12px;
      border-radius: 26px;
      margin-left: 10px;
      margin-right: 0;
    }
    .cancel_order {
      border: 1px solid #ff9db4;
      color: #ff9db4;
    }
    .share_now {
      background: @bgColor;
      color: white;
    }
  }
  .goodsDetail {
    width: 100%;
    box-sizing: border-box;
    padding: 0 20px;
    .goods_info_title {
      height: 43px;
      line-height: 43px;
      border-bottom: 1px solid #f4f4f4;
    }
    .goods_info_content_remark {
      margin-top: 10px;
      background: #f7f8fa;
      padding: 10px;
      color: #c4c9d3;
      font-size: 10px;
      box-sizing: border-box;
    }
    .total {
      display: flex;
      justify-content: flex-end;
      align-items: center;
      height: 44px;
      text:nth-child(1) {
        font-size: 12px;
      }
      text:nth-child(2) {
        padding-left: 10px;
        font-size: 24px;
      }
    }
  }
}
</style>
