<template lang="pug">
.particpate
   .particpate_box(:data-id='JSON.stringify(detailInfo.values)')
      .particpate_top
        view {{'参与Ta的拼团'}}
        view(@click='close')
          img(src='/static/assets/detail_order_delete_icon@3x.png',)
      .particpate_content
        .particpate_content_top
          text {{'仅剩'}}
          text {{detailInfo.leftQuota}}
          text {{'个名额，'}}
          text {{time}}
          text {{'后结束'}}
        .particpate_content_user
          view(v-for='(item,index) in detailInfo.members' :style="{margin:marginValue}" :key='index' )
            view.tuanLeader(v-if='item.role==1') {{'团长'}}
            img(:src="item.avatar?(item.avatar+'@!400'):staticImg")
          view(v-for='(item,index) in detailInfo.leftQuota',:key='index',:style="{margin:marginValue}",class='noPeople')
             text {{"?"}}
        .particpate_content_bottom(@click='toGroup',:isPintuan='detail.isPintuan_state') {{'参与拼团'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import api from '../api'
import global from '@/global'
import {formatTime} from '@/utils'
export default {
  data(){
    return{
       detailInfo:{},
       time:''
    }
  },
  props:{
    type:{
      type:Object,
      default:1
    }
  },
  computed:{
    ...mapState(["detail"]),
    marginValue(){
      //60 是2，3，4，5的最小公倍数 rpx为是px的1/2
      return '0 '+120/(this.detailInfo.quota*this.detailInfo.quota).toFixed(2)+'rpx'
    },
    imgUrlPrefix(){
        return global.imgUrlPrefix
    },
    staticImg(){
        return `/static/assets/usercenter_avatar_default_active@3x.png`
    }
  },
  methods:{
     ...mapMutations([  
        'changeParticipatePintuan','changeDetailSkuStatus','changeIsPintuan_state','changeCreatePintuanId'
    ]),
    close(){
      this.changeParticipatePintuan(false)
    },
    toGroup(){
      // console.log(this.type);
      this.changeParticipatePintuan(false)
      this.changeDetailSkuStatus(true);
      if(this.type==4){
          this.changeIsPintuan_state('pintuanBuy');
          this.changeCreatePintuanId(this.detail.groupItemId)
      }else if(this.type == 5){
          this.changeIsPintuan_state('centDraw')
          this.changeCreatePintuanId(this.detail.groupItemId);
      }else if(this.type == 1){
          this.changeIsPintuan_state('singleBuy');
          this.changeCreatePintuanId(null)
      }
      
        
    },
    async getTuanDetail(id){
      const wipData = await api.get_tuan_detail(id);
      // console.log(wipData)
      this.detailInfo = wipData.value;
      setInterval(()=>{
          this.time = formatTime(this.detailInfo.endTime)
      },100)
    }
  },
  mounted(){
       this.getTuanDetail(this.detail.groupItemId);  
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.particpate{
  position: fixed;
  z-index: 10;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background:rgba(0, 0, 0, 0.5);
  .particpate_box{
    width: 300px;
    height: 210px;
    background: white;
    border-radius: 5px;
    .particpate_top{
      position: relative;
      width: 300px;
      height: 40px;
      font-size: 14px;
      line-height: 40px;
      box-sizing: border-box;
      border-bottom: 1px solid #f4f4f4;
      text-align: center;
      color: @normalFontColor;
      view:nth-child(2){
        position: absolute;
        right: 0px;
        top: 0;
        width: 40px;
        height: 40px;
        display: flex;
        align-items: center;
        justify-content: center;
        img{
          width: 12px;
          height: 12px;
        }
      }
    }
    .particpate_content{
      display: flex;
      flex-direction: column;
      align-items: center;
      .particpate_content_top{
        text-align: center;
        font-size: 12px;
        line-height: 30px;
        color: #737373;
        text:nth-child(2){
          color: @bgColor;
        }
        text:nth-child(4){
          font-family: 'Helvetica Neue';
        }
      }
      .particpate_content_user{
        min-width: 120px;
        display: flex;
        padding: 20px 15px;
        justify-content: center;
        view{
          width: 46px;
          height: 46px;
          border: 1px solid @bgColor;
          border-radius: 50%;
          position: relative;
          text-align: center;
          img{
            width: 100%;
            height: 100%;
            object-fit: cover;
            border-radius: 50%;
          }
          .tuanLeader{
            position: absolute;
            background:#fceded;
            border:1px solid #f12b55;
            left: -10px;
            top: -5px;
            border-radius:20px;
            width:31px;
            height:15px;
            font-size: 10px;
            color:#f12b55;
            text-align: center;
          }
          text{
            line-height: 46px;
            color: #b2b2b2;
          }
        }
        .noPeople{
          border:1px dashed #b2b2b2;
        }
      }
      .particpate_content_bottom{
        background:#ff3766;
        border-radius:30px;
        width:200px;
        height:32px;
        color: white;
        font-size: 14px;
        text-align: center;
        line-height: 32px;
      }
    }
  }
}
</style>
