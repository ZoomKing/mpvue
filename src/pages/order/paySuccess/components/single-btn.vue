<template lang="pug">
.paySuccess_share
    view {{'赶快告诉好友来品库吧!'}}
    view.share_btn
    view.active_state_detail_btn
        view(@click='backToHome') {{'回到首页'}}
        view(@click='backToMyorder') {{'我的订单'}}
       
</template>

<script>
import timer from '@/components/overTime'
import { mapState, mapActions } from 'vuex'
import global from '@/global'
export default {
    props:{
        dataInfo:{
            type:Object,
            default:{}
        }
    },
    computed:{
    },
    methods:{
        backToHome(){
            wx.reLaunch({
            url: '/pages/home/list'
            })
        },
        backToMyorder(){
            wx.reLaunch({
                url:'/pages/order/myorder'
            })
        }
    },
    components:{
        timer
    },
    
}
</script>

<style lang="less">
@import url("~@/styles/init");
.paySuccess_share{
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 14px;
    >view:nth-child(1){
        padding-top: 30px;
        line-height: 20px;
    }
    .share_btn{
        display: flex;
        width: 260px;
        justify-content: space-between;
        padding: 15px 0;
        >view{
            width: 48px;
            height: 48px;
            background: #f7f8fa;
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            img{
                width: 24px;
                height: 20px;
                background: red;
                object-fit: cover;
            }
        }
    }
    .active_state_detail_btn{
        display: flex;
        width: 260px;
        justify-content: center;
        justify-content: space-around;
        >view{
            font-size: 14px;
            width: 120px;
            height: 40px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            margin: 0;
        }
        view:nth-child(2){
            color: white;
            background: @bgColor;
        }
        view:nth-child(1){
             color: @bgColor;
            background: white;
            border:1px solid @bgColor;
        }
    }
}
</style>
