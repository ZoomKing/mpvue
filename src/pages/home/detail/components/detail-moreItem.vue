<template lang="pug">
.pintuan_item(v-if='isShow')
    img(:src="itemInfo.avatar?(imgUrlPrefix+itemInfo.avatar+'@!400'):staticImg")
    view.pintuan_item_content
        view
            text {{itemInfo.nick}}
            text {{'还差'+itemInfo.leftQuota+'人'}}
        text {{'剩余'+time}}
    view(@click='goto_pintuan(itemInfo.tuanId)') {{'去参团'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import {formatTime} from '@/utils'
import global from '@/global'
export default {
  data(){
    return{
      time:'',
      //判断倒计时是否走完的状态，默认为没走完，为true
      isShow:true
    }
  },
  props: {
    itemInfo: {
      type: Object,
      default: {}
    }
  },
  computed: {
      imgUrlPrefix(){
          return global.imgUrlPrefix
      },
      staticImg(){
          return `/static/assets/usercenter_avatar_default_active@3x.png`
      }
  },
  methods: {
     ...mapMutations([  
        'changeParticipatePintuan','changeGroupItemId','changeMorPintuan'
    ]),
    goto_pintuan(itemId){
        this.changeMorPintuan(false)
        this.changeParticipatePintuan(true);
        this.changeGroupItemId(itemId)
    }
  },
  mounted(){
    setInterval(()=>{
        this.time = formatTime(this.itemInfo.endTime);
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
.pintuan_item{
      font-size: 12px;
      display: flex;
      box-sizing: border-box;
      padding:10px 20px;
      width: 100%;
      height: 66px;
      color: @normalFontColor;
      overflow: hidden;
      align-items: center;
      img{
        width: 46px;
        height: 46px;
        border-radius: 50%;
        border: 1px solid #f4f4f4;
      }
      .pintuan_item_content{
        width: 100px;
        display: flex;
        flex: 1;
        padding:10px 10px;
        box-sizing: border-box;
        justify-content: center;
        flex-direction: column;
        >text:nth-child(2){
          color: #737373;
        }
        >view{
          display: flex;
          justify-content: space-between;
          >text:nth-child(1){
            width: 80px;
            overflow:hidden;
            text-overflow:ellipsis;
            white-space:nowrap
          }
          >text:nth-child(2){
            color: #666;
          }
        }
      }
      view:nth-child(3){
        width: 54px;
        height: 20px;
        background: @bgColor;
        color: white;
        box-sizing: border-box;
        border-radius: 20px;
        text-align: center;
        line-height: 20px;
        font-size: 11px;
      }
    }
</style>
