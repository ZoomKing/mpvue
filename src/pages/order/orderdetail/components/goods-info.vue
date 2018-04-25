<template lang="pug">
.goods_info
    .goods_info_content
        goodItem(v-for='(item,index) in subOrderList',:key='index',:dataInfo='item',)
</template>

<script>
import goodItem from './good-item'
export default {
  props: {
    subOrderList: {
      type: Object,
      default: {}
    }
  },
  components:{
      goodItem
  },
  mounted(){
    //   console.log(this.subOrderList)
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.goods_info{
    width: 100%;
    box-sizing: border-box;
    font-size: 16px;
    
    .goods_info_content{
        font-size: 14px;
        
        
    }
}
</style>
