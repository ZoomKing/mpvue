<template lang="pug">
 .goods_info_item
    .goods_info_item_content
        img(:src="dataInfo.picUrl+'@!400'")
        view
            text {{dataInfo.title}}
            view 
                text(v-for='(item,index) in skuNameArr',:key='index') {{item}}
            view 
                text {{'￥'+payFeeCent}}
                text {{'X'+dataInfo.buyNum}}
    //- view.goods_operation
    //-     .refund(v-if='false',class='refund') {{'申请退款'}}
    //-     .cant_refund(v-else,class='not_refund') {{'商品不可退'}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import global from '@/global'
export default {
  props:{
        dataInfo:{
            type:Object,
            default:{}
        }
  },
  data(){
      return{
          skuNameArr:[]
      }
  },
  computed: {
    imgUrlPrefix(){
          return global.imgUrlPrefix
    },
    payFeeCent(){
        return parseFloat(this.dataInfo.payFeeCent/100).toFixed(2)
    }
  },
  mounted () {
    // console.log(this.dataInfo);
    this.dataInfo.skuName.split(' ').forEach((item,index)=>{
        this.skuNameArr.push(item)
    })
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
.goods_info_item{
    border-bottom: 1px solid #f4f4f4;
    .goods_info_item_content{
        display: flex;
        padding: 15px 0;
        >img{
            width: 80px;
            height: 80px;
            box-sizing: border-box;
            border: 1px solid #f4f4f4;
        }
        >view{
            padding-left: 14px;
            flex:1;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            >text:nth-child(1){
                display: -webkit-box;
                -webkit-box-orient: vertical;
                -webkit-line-clamp: 2;
                overflow: hidden;
                height: 40px;
                line-height: 20px;
            }
            >view:nth-child(2){
                color: #b2b2b2;
                font-size: 12px;
            }
            >view:nth-child(3){
                font-size: 12px;
                display: flex;
                justify-content: space-between;
            }
        }
    }
    .goods_operation{
        width: 100%;
        height: 44px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        font-size: 12px;
        color: #737373;
        .refund{
            width: 76px;
            height: 25px;
            box-sizing: border-box;
            border-radius: 26px;
            border:1px solid #737373;
            text-align: center;
            line-height: 25px;
        }
    }
    
}
</style>
