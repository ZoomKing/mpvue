<template lang="pug">
 .payment_style
    view
        text {{'支付方式'}}
        text {{type}}
    view
        text {{'订单总额'}}
        text {{'￥'+total}}
    view
        text {{'实付金额'}}
        text {{'￥'+pay}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      payType:{
          type:Number,
          default:1
      },
      totalFeeCent:{
          type:Number,
          default:null
      },
      payFeeCent:{
          type:Number,
          default:null
      }
  },
  computed: {
      total(){
          return parseFloat(this.totalFeeCent/100).toFixed(2)
      },
      pay(){
          return parseFloat(this.payFeeCent/100).toFixed(2)
      },
      type(){
          switch(this.payType){
              case 1:
              return '支付宝';
              break;
              case 2:
              return '微信';
              break;
              case 3:
              return '翼支付';
              break;
              case 4:
              return '花呗支付';
              break;
              case 6:
              return '微信';
              break;
          }
      }
  },
  mounted () {
  },
 
  onReachBottom () {
    
  },
  methods: {
   
  },
  components:{
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.payment_style{
    width: 375px;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 14px;
    border-bottom: 10px solid #f7f8fa;
    view:nth-child(1),view:nth-child(2){
        height: 34px;
        line-height: 34px;
        display: flex;
        text:nth-child(1){
            width: 70px;
            color: #737373;
        }
        text:nth-child(2){
            flex:1;
            padding-left: 20px;
        }
    }
    view:nth-child(3){
        height: 44px;
        line-height: 44px;
        border-top: 1px solid #f4f4f4;
        color: @bgColor;
        display: flex;
        text:nth-child(1){
            width: 70px;
        }
        text:nth-child(2){
            flex:1;
            padding-left: 20px;
        }
    }
}
</style>
