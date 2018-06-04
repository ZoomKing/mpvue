<template lang="pug">
.no_item 
    img(src='/static/assets/order_nothing_110.png')
    view {{'暂时还没有发票哦~'}}
</template>

<script>
export default {
  data(){
      return{

      }
  },
  computed: {
  },
  methods: {
  },
  components:{
  },
  mounted () {
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");
.no_item{
    width: 100%;
    display: flex;
    height: 80vh;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font-size: 14px;
    color: #737373;
    img{
        width: 80px;
        height: 80px;
    }
}
</style>
