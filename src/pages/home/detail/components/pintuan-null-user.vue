<template lang="pug">
.pintuanContainer
    //- .viewMorePintuan
    //-   text {{'暂无拼团'}}
    .pintuanList {{'稍息，立正，团长来晚了，立即去开团！'}}
        
</template>

<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  components:{
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
    height: 34px;
    line-height: 34px;
  }
  .pintuanList{
      width: 100%;
      height: 80px;
      text-align: center;
      line-height: 80px;
      color: #B2B2B2;
  }
}

</style>
