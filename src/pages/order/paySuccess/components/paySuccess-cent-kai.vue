<template lang="pug">
.box
    .paySuccess_pin
        view(v-if='dataInfo.status==1') {{'开团成功'}}
        view(v-else) {{'参团成功'}}
        view
            text {{'还差'}}
            text {{dataInfo.leftQuota}}
            text {{'个名额 拼团成功'}}
        view {{'分享到3个群，成功率高达98%'}}
        timer(:time='dataInfo.endTime')
    shareBtn

</template>

<script>
import timer from '@/components/overTime'
import { mapState, mapActions } from 'vuex'
import shareBtn from './share-btn'
export default {
    props:{
        dataInfo:{
            type:Object,
            default:{}
        }
    },
    components:{
        timer,shareBtn
    }
}
</script>

<style lang="less">
@import url("~@/styles/init");
.paySuccess_pin{
    width: 100%;
    height: 158px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-bottom: 10px solid #f7f8fa;
    >view{
        padding: 3px 0;
    }
    .timer{
        display: flex;
    }
    >view:nth-child(2){
        font-size: 14px;
        >text:nth-child(2){
            color: @bgColor;
        }
    }
    >view:nth-child(3){
        font-size: 14px;
        color: #b2b2b2;
    }
   
}

</style>
