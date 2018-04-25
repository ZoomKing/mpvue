<template lang="pug">
.myorder_ul
    view(v-for='(item,index) of dataInfo',:key='index',:class='{active:(item.index)==tabState}',@click='up(item.index)') {{item.title}}
</template>
<script>
import { mapState, mapActions } from 'vuex'
export default {
  props:{
      dataInfo:{
          type:Object,
          default:[]
      },
      tabState:{
          type:Number,
          default:1
      },
      isCurrentPage:{
          type:Number,
          default:1
      }
  },
  computed: {
    
  },
  methods:{
      up(index){
        this.$emit('ListenFromChild',index)
      }
  },
  mounted () {
  },
  
  onReachBottom () {
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");
.myorder_ul{
    width: 375px;
    height: 40px;
    display: flex;
    font-size: 14px;
    view{
        flex:1;
        text-align: center;
        line-height: 40px;
        color: #b2b2b2;
        margin: 0 10px;
        box-sizing: border-box;
    }
    .active{
        color: @normalFontColor;
        border-bottom: 2px solid @normalFontColor;
    }
}
</style>
