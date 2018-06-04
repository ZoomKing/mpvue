<template lang="pug">
    .invoice_item(@click='chooseInvoice')
        view.taitou
            text {{'开票抬头:'}}
            view 
                text {{itemInfo.title}}
                text.personal(v-if='itemInfo.titleType==1') {{'个人'}}
                text.company(v-else-if='itemInfo.titleType==2') {{'企业'}}
        view.shuihao(v-if='itemInfo.taxId')
            text {{'纳税识别号:'}}
            text {{itemInfo.taxId}}
        view.email(v-if='itemInfo.email')
            text {{'收票人邮箱:'}}
            text {{itemInfo.email}}

</template>

<script>
import { mapState,mapMutations} from 'vuex';
export default {
    props:{
        itemInfo:{
            type:Object,
            default:{}
        }
    },
  data(){
      return{

      }
  },
  computed: {
  },
  methods: {
      ...mapMutations(['changeInvoice']),
      chooseInvoice(){
          console.log(this.itemInfo);
        //   确定需要开发票的状态为2，不开发票为1，这里为2
          this.itemInfo.type=2;
          this.changeInvoice(this.itemInfo);
          wx.navigateBack({
                // url: '/pages/order/preorder'
                delta:1
          })
      }
  },
  components:{
  },
  mounted () {
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");
 .invoice_item{
     font-size:14px;
     border-bottom: 1px solid #f4f4f4;
     width: 335px;
     margin: 5px auto;
     >view{
         display: flex;
         line-height: 40px;
         text:nth-child(1){
             margin-right: 10px;
         }
         >view{
             .personal{
                 font-size: 10px;
                 color: @bgColor;
                 border: 1px solid @bgColor;
                 border-radius: 3px;
                 padding: 0 5px;
             }
             .company{
                font-size: 10px;
                color: #5891EB;
                border: 1px solid #5891EB;
                border-radius: 3px;
                padding: 0 5px;
             }
         }
     }
 }
</style>
