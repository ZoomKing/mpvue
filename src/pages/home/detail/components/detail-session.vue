<template lang="pug">
.detailbox_bottom(v-if='dataInfo')
    text {{dataInfo.title}}
    view.detailbox_bottom_time
        view
        text {{'距离结束：'+time}}
</template>

<script>
import { mapState, mapActions } from 'vuex'
export default {
  data(){
    return{
      suolun:'suolun',
      time:''
    }
  },
  props: {
    dataInfo: {
      type: Object,
      default: {}
    },
  },
  computed:{
     
  },
  methods:{
    remainingTime(){
       setInterval(()=>{
            let wipTime = new Date(new Date(this.dataInfo.endTime)-new Date());
            this.time = wipTime.getDate()+'天'+wipTime.getHours()+':'+wipTime.getMinutes()+':'+wipTime.getSeconds();
       },1000)
    }
  },
  mounted(){
      console.log(this.dataInfo)
      this.remainingTime();
  }
}
</script>

<style lang="less" scoped>
@import url('~@/styles/init');
.detailbox_bottom{
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  z-index: 2;
  background: @bgColor;
  display: flex;
  font-size: 12px;
  height: 34px;
  line-height: 34px;
  color: white;
  justify-content: space-between;
  >text{
    padding-left: 20px;
  }
  .detailbox_bottom_time{
    display: flex;
    background: #ff9f5f;
    >view{
      position: relative;
      left: -9px;
      width: 0; 
      height: 0; 
      border-top: 17px solid transparent; 
      border-right: 10px solid #ff9f5f; 
      border-bottom: 17px solid transparent; 
      z-index:3;
    }
    >text{
      width: 150px;
    }
  }
}

</style>
