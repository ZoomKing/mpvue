<template lang="pug">
.goodsDetail
    .goodsDetailTitle {{'-商品详情-'}}
    view
        img.userImg(mode='widthFix' :src="item+'@!1200'" v-for='(item,index) in dataInfo.picList' :key='index')

</template>

<script>
export default {
  props: {
    dataInfo: {
      type: Object,
      default: []
    }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.goodsDetail{
    width:375px;
    .goodsDetailTitle{
        width: 100%;
        height: 50px;
        font-size: 14px;
        text-align: center;
        line-height: 50px;
    }
    view{
        display: flex;
        flex-direction: column;
        img{
            width: 100%;
        }
    }

}
</style>
