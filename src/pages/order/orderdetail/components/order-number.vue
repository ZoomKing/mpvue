<template lang="pug">
 .order_number
    view
        text {{'订单编号'}}
        text {{orderId}}
    view
        text {{'下单时间'}}
        text {{createTime}}
    view(v-if='payTime')
        text {{'付款时间'}}
        text {{payTime}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      orderId:{
          type:String,
          default:''
      },
      createTime:{
          type:String,
          default:''
      },
      payTime:{
          type:String,
          default:''
      },
  },
  computed: {

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
.order_number{
    width: 375px;
    box-sizing: border-box;
    padding: 0 20px;
    font-size: 14px;
    color: @normalFontColor;
    border-bottom: 10px solid #f7f8fa;
    view{
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
}
</style>
