<template lang="pug">
.pintuanItem(v-if='isShow')
    img.userImg(:src="dataInfo.avatar?(imgUrlPrefix+dataInfo.avatar+'@!400'):staticImg")
    text.userPhoneNumber {{dataInfo.nick}}
    view.time
        view 
            text {{'再有'}}
            text {{dataInfo.leftQuota+'人'}}
            text {{'拼成'}}
        view {{'剩余'+time}}
    view.goTo(@click='goto_pintuan(dataInfo.tuanId)') {{'去拼团'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import global from '@/global'
import {formatTime} from '@/utils'
export default {
  props: { 
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  data(){
      return{
          time : '',
          //判断倒计时是否走完的状态，默认为没走完，为true
          isShow:true
      }
  },
  computed:{
      imgUrlPrefix(){
          return global.imgUrlPrefix
      },
      staticImg(){
          return `/static/assets/usercenter_avatar_default_active@3x.png`
      }
  },
  methods:{
      ...mapMutations([  
        'changeParticipatePintuan','changeGroupItemId'
    ]),
      goto_pintuan(id){
          this.changeParticipatePintuan(true);
          this.changeGroupItemId(id)
      }
  },
  mounted(){
    let wiptime = this.dataInfo.endTime;
     setInterval(()=>{
        this.time = formatTime(wiptime);
        // console.log(this.time)
        if(this.time.indexOf('-')!=-1){
            this.isShow = false;
        }else{
            this.isShow = true;
        }
     },100)
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.pintuanItem{
    width: 100%;
    height: 64px;
    overflow: hidden;
    display: flex;
    box-sizing: border-box;
    padding: 10px 0;
    border-bottom: 1px solid #f4f4f4;
    align-items: center;
    img{
        width: 44px;
        height: 44px;
        border-radius: 50%;
        object-fit: cover;
    }
    .goTo{
        width: 56px;
        height: 25px;
        background:@bgColor;
        border-radius: 22px;
        color: white;
        line-height: 25px;
        text-align: center;
        font-size: 12px;
    }
    .userPhoneNumber{
        flex: 1;
        padding-left: 10px;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }
    .time{
        flex: 1;
        line-height: 22px;
        color: @normalFontColor;
        padding-right: 15px;
        text-align: right;
        view:nth-child(1){
            text:nth-child(2){
                color: @bgColor;
            }
        }
        view:nth-child(2){
            font-family:'Helvetica Neue';
        }
    }
}

</style>
