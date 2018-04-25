<template lang="pug">
.share_detail
    .detail
        img
        view.detail_right(v-if='goodInfo.basicInfo')
            view
                view {{goodInfo.basicInfo.title}}
                text {{num+'人已拼团'}}
            view
                view.detail_price
                    view {{'¥24.00'}}
                    view {{'¥64.00'}}
                //- view.goToPintuan {{'去拼团'}}
    .pintuan_info
        view
            text {{'还差'}}
            text {{'4'}}
            text {{'人拼团成功'}}
        view.pintuan_users_list
            view.existing
                img
                view {{'团长'}}
            view {{'?'}}
            view {{'?'}}
            view {{'?'}}
            view {{'?'}}
            view {{'?'}}
            view {{'?'}}
            view {{'?'}}
        timer
    #goto_pintuan_btn {{'我要参团'}}
</template>

<script>
import timer from '@/components/overTime'
import api from './api'
import { mapState, mapActions } from 'vuex'
export default {
  data(){
      return{
          goodInfo:{},
          num:0,
          pintuanPriceCent:0,
          salePriceCent:0
      }
  },
  computed: {
  },
  onReachBottom () {
    
  },
  methods: {
      async getGoodDetail(id){
         const res = await api.get_good_detail(id);
        //  console.log(res);
         this.goodInfo = res.value;
         console.log(this.goodInfo);
         if(res.value.pintuanInfo){
             this.num = res.value.pintuanInfo.quota
         }else if(res.value.centDrawInfo){
            this.num = res.value.centDrawInfo.pinQuota
         }
      }
  },
  components:{
      timer
  },
  mounted () {
     this.$root.$mp.query.tuan_id = 196;
     this.$root.$mp.query.id = 3;
     this.getGoodDetail(this.$root.$mp.query.id);
    //  this.get
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");
.share_detail
    .detail{
        width: 100%;
        height: 160px;
        margin:  0 auto;
        display: flex;
        box-sizing: border-box;
        padding: 5px 20px;
        border-bottom: 10px solid #f7f8fa;
        >img{
            width: 140px;
            height: 140px;
            background: red;
            object-fit: cover;
        }
        .detail_right{
            flex:1;
            font-size: 14px;
            padding-left: 10px;
            >view:nth-child(1){
                >view{
                    height: 40px;
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                }
                >text{
                    color: @bgColor;
                    font-size: 12px;
                    line-height: 40px;
                }
            }
            >view:nth-child(2){
                margin-top: 20px;
                display: flex;
                align-items: center;
                justify-content: space-between;
                .detail_price{
                    >view:nth-child(1){
                        font-size: 18px;
                        color: @bgColor;
                    }
                    >view:nth-child(2){
                        font-size: 10px;
                        color: #b2b2b2;
                        text-decoration: line-through;
                    }
                }
                .goToPintuan{
                    width: 90px;
                    height: 30px;
                    background: @bgColor;
                    color: white;
                    text-align: center;
                    line-height: 30px;
                    border-radius: 5px;
                }
            }
        }
    }
    .pintuan_info{
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: center;
        align-items: center;
        >view:nth-child(1){
            font-size: 20px;
            padding: 30px 0;
            line-height: 20px;
            >text:nth-child(2){
                color: @bgColor;
            }
        }
        .pintuan_users_list{
            width: 280px;
            display: flex;
            flex-wrap: wrap;
            padding: 0px 0 20px;
            justify-content: space-around;
            >view{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px dashed #b2b2b2;
                color: #b2b2b2;
                line-height: 44px;
                text-align: center;
                margin: 5px;
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
                }
            }
        }
    }
    #goto_pintuan_btn{
        width: 100%;
        height: 48px;
        position: absolute;
        bottom: 0;
        background: @bgColor;
        line-height: 48px;
        text-align: center;
        color: white;
    }
</style>
