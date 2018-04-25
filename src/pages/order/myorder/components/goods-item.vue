<template lang="pug">
.goods_item
    img(:src="itemInfo.picUrl+'@!400'")
    .goods_item_content
        view {{itemInfo.title}}
        view 
            text(v-for='(item,index) in skuName', :key='index') {{item}}
        text {{'¥'+skuSalePriceCent}}
    .goods_count {{'X'+itemInfo.buyNum}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      itemInfo:{
          type:Object,
          default:{}
      }
  },
  data(){
      return{
          skuName:[]
      }
  },
  computed: {
    skuSalePriceCent(){
        return parseFloat(this.itemInfo.skuSalePriceCent/100).toFixed(2)
    }
  },
  mounted () {
      this.itemInfo.skuName.split(' ').forEach((item,index)=>{
          this.skuName.push(item)
      })
  },
  
  onReachBottom () {
  },
  methods: {
    
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.goods_item{
    width: 335px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 100px;
    border-bottom: 1px solid #f4f4f4;
    padding: 10px 0;
    display: flex;
    font-size: 12px;
    >img{
        width: 80px;
        height: 80px;
        box-sizing: border-box;
        border: 1px solid #f4f4f4;
        object-fit: cover;
    }
    .goods_item_content{
        flex:1;
        padding-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        color: #212121;
        view:nth-child(1){
            height: 32px;
            line-height: 16px;
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
        }
    }
    .goods_count{
        width: 50px;
        display: flex;
        align-items: flex-end;
        justify-content: flex-end;
    }
}
</style>
