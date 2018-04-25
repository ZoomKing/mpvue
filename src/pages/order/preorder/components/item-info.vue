<template lang="pug">
.goods_info_content_top
    img(:src="imgUrlPrefix+dataInfo.picUrl+'@!400'")
    view
        text {{dataInfo.itemTitle}}
        view 
            text(v-for="(item,v) in skuName",:key='v') {{item}}
        view 
            text {{'￥'+salePrice}}
            text {{'X'+dataInfo.buyNum}}
</template>

<script>
import  global from '@/global'
export default {
  data(){
      return{
          skuName:[],
      }
  },
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  methods: {
  },
  computed:{
      imgUrlPrefix(){
          return global.imgUrlPrefix
      },
      salePrice(){
          return parseFloat(this.dataInfo.salePrice/100).toFixed(2)
      }
  },
  mounted(){
    //   console.log(this.dataInfo)
      this.dataInfo.skuName.split(' ').forEach((item,index)=>{
          this.skuName.push(item)
      })
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.goods_info_content_top{
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
</style>
