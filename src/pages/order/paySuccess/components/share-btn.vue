<template lang="pug">
.paySuccess_share
    view(v-if="state=='process'")
        view(v-if='status==1') {{'拼团成功即可立即发货，'}}
        view(v-else) {{'拼团成功才有资格参与抽奖，'}}
        view
            text {{'快去'}}
            text {{'分享'}}
            text {{'到微信群或好友！'}}
    view(v-else) {{'赶快告诉好友拼团吧!'}}
    view.share_btn
    view.active_state_detail_btn
        view(id='view',@click='backToHome') {{'回到首页'}}
        button(open-type="share") {{'邀请好友'}}

</template>

<script>
import timer from '@/components/overTime'
import { mapState, mapActions } from 'vuex'
import global from '@/global'
export default {
    props:{
        state:{
            type:String,
            default:"process"
        },
        status:{
            type:Number,
            default:1
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
        text-align: center;
        >view{
            >text:nth-child(2){
                color: @bgColor;
            }
        }

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
        >button,>.view{
            font-size: 14px;
            width: 120px;
            height: 40px;
            border-radius: 20px;
            text-align: center;
            line-height: 40px;
            margin: 0;
        }
        button{
            color: white;
            background: @bgColor;
        }
        #view{
            color: @bgColor;
            background: white;
            border:1px solid @bgColor;
        }
    }
}
</style>
