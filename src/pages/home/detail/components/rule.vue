<template lang="pug">
.rule
    view {{'活动规则:'}}
    text {{dataInfo}}
</template>

<script>
export default {
  props: { 
    dataInfo: {
      type: Object,
      default: ''
    }
  },
 
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.rule{
    padding: 20px;
    color: @normalFontColor;
    view{
        font-size: 14px;
    }
    text{
        font-size: 12px;
    }
}

</style>
