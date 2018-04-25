<template lang="pug">
.pintuan_info
    .pintuan_info_state(v-if='dataInfo.leftQuota>0')
        text {{'待分享，还差'}}
        text {{dataInfo.leftQuota}}
        text {{'人拼团成功'}}
    .pintuan_info_state(v-else)
        text {{'已拼团成功啦!'}}
    .pintuan_info_users
        .pintuan_info_users_left
            view.existing(v-for='(item,index) in dataInfo.members',:key='index')
                img(:src="item.avatar?(item.avatar+'@!200'):'/static/assets/usercenter_avatar_default_active@3x.png'")
                view(v-if='item.role==1') {{'团长'}}
            view(v-for='(item,index) in dataInfo.leftQuota',:key='index') {{'?'}}
        button(open-type="share",v-if='dataInfo.leftQuota>0').pintuan_info_users_right {{'邀请好友'}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
import {formatTime2} from '@/utils'
import  global from '@/global'
export default {
  props:{
        dataInfo:{
            type:Object,
            default:{}
        }
  },
  data(){
      return{
          time:'00:00:00'
      }
  },
  computed: {
       imgUrlPrefix(){
          return global.imgUrlPrefix
      },
  },
  mounted () {
    //   console.log(this.dataInfo.endTime)
    //  setInterval(()=>{
         
    //      this.time = formatTime2(this.dataInfo.endTime);
    //     //  console.log(this.time);
         
    //  },1000)
  },
 
  onReachBottom () {
    
  },
  methods: {
   
  },
  components:{
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.pintuan_info{
    padding:  20px 0;
    font-size: 14px;
    .pintuan_info_state{
        padding:0 20px;
    }
    .pintuan_info_users{
        padding: 10px 20px;
        display: flex;
        align-items: center;
        border-bottom: 10px solid #f7f8fa;
        .pintuan_info_users_left{
            flex:1;
            display: flex;
            flex-wrap: wrap;
             view{
                width: 44px;
                height: 44px;
                border-radius: 50%;
                border: 1px dashed #b2b2b2;
                color: #b2b2b2;
                line-height: 44px;
                text-align: center;
                margin: 2px;
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
        .pintuan_info_users_right{
            width: 76px;
            height: 25px;
            color: white;
            background: @bgColor;
            text-align: center;
            line-height: 25px;
            border-radius: 22px;
            font-size: 12px;
        }
       
    }
}
</style>
