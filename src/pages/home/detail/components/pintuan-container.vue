<template lang="pug">
.pintuanContainer
    .viewMorePintuan
      text {{dataInfo.desc}}
      view(@click='changeMorPintuan(true)')
        text {{'更多拼团'}}
        text {{'>'}}
    .pintuanList
        pintuanItem(v-for='(item,index) in dataInfo.values',:key='index',v-if='index<3',:dataInfo='item')
</template>

<script>
import store from '@/store'
import { mapState,mapMutations,actions} from 'vuex';
import pintuanItem from './pintuan-Item'
export default {
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  computed:{
      ...mapState(["showMorePintuanState"]),
  },
  methods: {
    ...mapMutations([  
        'changeMorPintuan'
    ]),
  },
  store,
  components:{
      pintuanItem
  },
  mounted () {
  } 
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.pintuanContainer{
  width: 375px;
  box-sizing: border-box;
  padding: 0 20px;
  font-size: 12px;
  color: @normalFontColor;
  border-bottom: 10px solid #f4f4f4;
  .viewMorePintuan{
    width: 100%;
    display: flex;
    height: 34px;
    line-height: 34px;
    justify-content: space-between;
    >view{
      text:nth-child(2){
        padding-left: 10px;
        color: @lightColor;
      }
    }
  }
}

</style>
