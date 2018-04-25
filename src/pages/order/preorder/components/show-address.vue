<template lang="pug">
a.addressContent(v-if='addressInfo.region',:href='aHref')
    img(src='/static/assets/address_icon@3x.png')
    .addressCenter
        view
            text {{'收货人：'+addressInfo.name}}
            text {{addressInfo.phone}}
        view {{addressInfo.region+' '+addressInfo.address}}
    img(src='/static/assets/arrow_right_16_icon.png')
    img.addressBottom(src='/static/assets/addr@3x.png')
.addressContent(v-else)
    .no_address(@tap='add_address')
        img(src='/static/assets/order_setting_add_unclickale_icon@3x.png')
        text {{'添加收货信息'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
export default {
  props:{
      addressInfo:{
          type:Object,
          default:{

          }
      }
  },
  computed: {
      ...mapState(['importAddressState']),
      aHref(){
          return `/pages/order/address`
      }
  },
  mounted () {
    
  },
 
  onReachBottom () {
    
  },
  methods: {
    ...mapMutations([  
        'changeImportAddressState'
    ]),
    add_address(){
        this.changeImportAddressState(true)
    }
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
  position: relative;
  z-index: 9;
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
  .no_address{
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100%;
      img{
          width: 24px;
          height: 24px;
          margin-right: 10px;
      }
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
  }
</style>
