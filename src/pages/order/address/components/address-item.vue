<template lang="pug">
.address_item(@click='setAddress')
    view
        view
            text {{'收货人：'+dataInfo.name}}
            view(v-if='dataInfo.isDefault') {{'默认'}}
        view {{dataInfo.phone}}
    view {{'地址:'+dataInfo.region+dataInfo.address}}
</template>

<script>
import { mapState, mapMutations } from 'vuex'
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
      ...mapMutations([  
        'changeShowAddress',
      ]),
      setAddress(){
        this.changeShowAddress(this.dataInfo)
          wx.navigateBack({
            // url: '/pages/order/preorder'
            delta:1
          })
      }
  },
  components:{
    
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.address_item{
    width: 335px;
    box-sizing: border-box;
    margin: 0 auto;
    height: 109px;
    border-bottom: 1px solid #f4f4f4;
    font-size: 14px;
    padding: 10px 0;
    >view:nth-child(1){
        display: flex;
        justify-content: space-between;
        padding: 10px 0;
        >view:nth-child(1){
            display: flex;
            align-items: center;
            view{
                font-size: 10px;
                color: @bgColor;
                border: 1px solid @bgColor;
                width: 36px;
                height: 16px;
                line-height: 16px;
                text-align: center;
                border-radius: 5px;
                margin-left: 20px;
            }
        }
    }
    >view:nth-child(2){
        height: 40px;
        line-height: 20px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
    }
}
</style>
