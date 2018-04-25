<template lang="pug">
 .order_number
    view(v-if='invoiceTitle')
        text {{'发票抬头'}}
        text {{invoiceTitle}}
    view(v-if='invoiceTaxId')
        text {{'纳税识别号'}}
        text {{invoiceTaxId}}
    view(v-if='invoiceEmail')
        text {{'收票人邮箱'}}
        text {{invoiceEmail}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      invoiceEmail:{
          type:String,
          default:null
      },
      invoiceTaxId:{
          type:String,
          default:null
      },
      invoiceTitle:{
          type:String,
          default:null
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
