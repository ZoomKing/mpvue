<template lang="pug">
.addressContent
    img(src='/static/assets/address_icon@3x.png')
    .addressCenter
        view
            text {{'收货人：'+receiverName}}
            text {{receiverPhone}}
        view {{receiverAddress}}
    img
    img.addressBottom(src='/static/assets/addr@3x.png')
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      receiverName:{
          type:String,
          default:''
      },
      receiverPhone:{
          type:String,
          default:''
      },
      receiverAddress:{
          type:String,
          default:''
      }
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

<style lang="less">
@import url("~@/styles/init");
.addressContent{
  width: 375px;
  height: 108px;
  box-sizing: border-box;
  position: relative;
  font-size: 14px;
  background: white;
  border-top: 1px solid #f7f8fa;
  border-bottom: 11px solid #f7f8fa;
  >img{
    width: 24px;
    height: 24px;
    position: absolute;
  }
  >img:nth-child(1){
      left:20px;
      top: 38px;
  }
  >img:nth-child(3){
      right: 20px;
      top: 38px;
  }
  >img:nth-child(4){
    width: 375px;
    height: 3px;
    bottom: 0;
  }
  
}
.addressCenter{
    width: 278px;
    margin: 0 auto;
    height: 97px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 15px 0;
    box-sizing: border-box;
    >view{
      display: flex;
      justify-content: space-between;
    }
    >view:nth-child(2){
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
  }
</style>
