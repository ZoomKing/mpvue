<template lang="pug">
.box
    .paySuccess_pin
        //- view(v-if='dataInfo.status==1') {{'开团成功'}}
        //- view(v-else) {{'参团成功'}}
        view
            text {{'还差'}}
            text {{dataInfo.leftQuota}}
            text {{'个名额 拼团成功'}}
       
        .pintuan_info_users
            view.existing(v-for='(item,index) in dataInfo.members',:key='index')
                img(:src="item.avatar?(item.avatar+'@!200'):'/static/assets/usercenter_avatar_default_active@3x.png'")
                view(v-if='item.role==1') {{'团长'}}
            view(v-for='(item,index) in dataInfo.leftQuota',:key='index') {{'?'}}

        view {{'分享到3个群，成功率提高200%'}}
        timer(:time='dataInfo.endTime')
    shareBtn(:state='"process"',:status='status')

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
        },
        status:{
            type:Number,
            default:1
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
    // height: 158px;
    padding: 30px 0 20px;
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
    >view:nth-child(1){
        font-size: 14px;
        >text:nth-child(2){
            color: @bgColor;
        }
    }
    .pintuan_info_users{
        padding: 15px;
        flex:1;
        display: flex;
        flex-wrap: wrap;
        width: 300px;
        margin: 0 auto;
        justify-content:center;
        view{
            width: 44px;
            height: 44px;
            border-radius: 50%;
            border: 1px dashed #b2b2b2;
            color: #b2b2b2;
            line-height: 44px;
            text-align: center;
            margin: 2px 5px;
        }
        .existing{
            border:1px solid @bgColor;
            position: relative;
            >view{
                position: absolute;
                color:@bgColor;
                top: -5px;
                left: -10px;
                font-size: 10px;
                width: 32px;
                height: 16px;
                border-radius: 16px;
                border: 1px solid @bgColor;
                background: #fceded;
                line-height: 16px;
            }
            img{
                width: 44px;
                height: 44px;
                object-fit: cover;
                border-radius: 50%;
            }
        }
    }
    >view:nth-child(3){
        font-size: 14px;
        color: #b2b2b2;
        margin-bottom:10px;
    }
   
}

</style>
