<template lang="pug">
    view.tab_ul(id='pintuan_tab_ul')
        text(v-for='(item,index) in dataInfo',:key='index',:class='{active:index==defaultIndex}',@click='upChangeIndex(index)') {{item}}
</template>

<script>
export default {
  props:{
      dataInfo:{
          type:Array,
          default:[]
      },
      defaultIndex:{
          type:Number,
          default:0
      },
      isFixed:{
          type:Boolean,
          default:false
      }
  },
  data(){
      return{

      }
  },
  computed: {
  },
  methods: {
      upChangeIndex(index){
          this.$emit('listenFromPintuanTabUl',index)
      }
  },
  components:{
  },
  mounted () {
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");

.tab_ul{
    width: 375px;
    font-size: 12px;
    height: 44px;
    display: flex;
    overflow: scroll;
    align-items: center;
    padding: 0 10px;
    box-sizing: border-box;
    text{
        flex: none;
        display: inline-block;
        padding: 0 15px;
        margin:0 10px;
        background: #F7F8FA;
        height: 25px;
        line-height: 25px;
        border-radius: 22px;
    }
    .active{
        color: @bgColor;
        background: #FCE6EA;
    }
}
.tab_ul::-webkit-scrollbar{
    display: none;
}
</style>
