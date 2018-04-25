<template lang="pug">
.box
    .paySuccess_cent
        img(src='/static/assets/payment_succeed_pic_110@3x.png')
        view {{'下单成功'}}
    singleBtn
</template>

<script>
import { mapState, mapActions } from 'vuex'
import singleBtn from './single-btn'
export default {
    components: {
        singleBtn
    }
 
}
</script>

<style lang="less">
@import url("~@/styles/init");
.paySuccess_cent{
    width: 100%;
    height: 158px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 10px solid #f7f8fa;
    font-size: 20px;
    img{
        width: 100px;
        height: 100px;
    }
    view{
        padding-top: 5px;
        font-size:18px;
    }
    .show_myorder{

    }
}

</style>
