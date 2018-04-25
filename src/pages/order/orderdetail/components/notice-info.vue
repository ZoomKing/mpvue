<template lang="pug">
.notice_info
    view.box
        view {{'包裹状态: '+dataInfo.logisticsStatusDesc}}
        //- text {{'物流单号: '+dataInfo.logisticsCode}}
        view
            text {{'物流单号:'}}
            text {{dataInfo.logisticsCode}}
    img()
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      dataInfo:{
          type:Object,
          default:{}
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

<style lang="less" scoped>
@import url("~@/styles/init");
.notice_info{
    width: 375px;
    height: 86px;
    font-size: 24px;
    box-sizing: border-box;
    padding: 0 20px;
    display: flex;
    align-items: center;
    border-bottom: 10px solid #f7f8fa;
    .box{
        display: flex;
        flex:1;
        flex-direction: column;
        view:nth-child(1){
            font-size: 14px;
            color:#5891eb;
        }
        view:nth-child(2){
            font-size: 12px;
            >text:nth-child(2){
                // color:@bgColor;
                padding-left: 10px;
            }
        }
    }
    img{
        width: 24px;
        height: 24px;
        object-fit: cover;
    }
}
</style>
