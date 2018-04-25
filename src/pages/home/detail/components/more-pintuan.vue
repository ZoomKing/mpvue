<template lang="pug">
.morePintuan
   .morePintuan_box
      .morePintuan_top
        view {{'正在参团'}}
        view(@click='changeMorPintuan(false)')
          img(src='/static/assets/detail_order_delete_icon@3x.png',)
      scroll-view.morePintuan_list(scroll-y='true',style='height:300px')
        pintuanListItem(v-for='(item,index) in dataInfo.values',:key='index',:itemInfo='item')
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import store from '@/store'
import pintuanListItem from './detail-moreItem'
export default {
  props: {
    dataInfo: {
      type: Object,
      default: {
        values:[]
      }
    }
  },
  computed:{
      ...mapState(["showMorePintuanState"])
  },
  methods: {
    ...mapMutations([  
        'changeMorPintuan'
    ]),
  },
  store,
  components: {
    pintuanListItem
  },
  mounted(){
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.morePintuan{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  z-index: 5;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgba(0, 0, 0, 0.5);
  .morePintuan_box{
    width: 300px;
    background: white;
    border-radius: 5px;
    .morePintuan_top{
      position: relative;
      width: 300px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #f4f4f4;
      text-align: center;
      color: @normalFontColor;
      view:nth-child(2){
        position: absolute;
        right: 0px;
        top: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 12px;
          height: 12px;
        }
      }
    }
    
  }
  
}
</style>
