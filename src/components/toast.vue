<template lang="pug">
 .order_cancel_info_box
    .order_cancel_info
        .order_cancel_info_top
            text {{dataInfo.title}}
            img(src='/static/assets/detail_order_delete_icon@3x.png',@click='close')
        .order_cancel_info_center
            text {{dataInfo.context}}
        .order_cancel_info_bottom(@click='close')
            text {{'知道了'}}
</template>

<script>
import { mapState,mapMutations} from 'vuex';
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
      ...mapMutations(['changeToast']),
      close(){
          this.changeToast(false)
      }
  },
  components:{
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.order_cancel_info_box{
    width: 100%;
    height: 100%;
    position: fixed;
    z-index: 9;
    background: rgba(0, 0, 0, 0.5);
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    .order_cancel_info{
        width: 300px;
        height: 170px;
        background: white;
        border-radius: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: flex-start;
        .order_cancel_info_top{
            width: 100%;
            height: 40px;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 14px;
            >img{
                position: absolute;
                width: 16px;
                height: 16px;
                right: 20px;
            }
        }
        .order_cancel_info_center{
            width: 213px;
            height: 48px;
            font-size: 14px;
            padding: 15px;
            display: flex;
            align-items: center;
            color: #737373;
            justify-content: center;
            text-align: center;
        }
        .order_cancel_info_bottom{
            width: 120px;
            height: 32px;
            border-radius: 30px;
            background: @bgColor;
            font-size: 14px;
            color: white;
            text-align: center;
            line-height: 32px;
        }
    }
}
</style>
