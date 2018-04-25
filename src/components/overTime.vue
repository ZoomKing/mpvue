<template lang="pug">
.timer
    text {{'距离结束'}}
    view {{hours}}
    text {{'时'}}
    view {{min}}
    text {{'分'}}
    view {{second}}
    text {{'秒'}}
    
</template>

<script>
import {formatTime2}  from '@/utils'
export default {
  data(){
      return {
          hours:'00',
          min:'00',
          second:'00'
      }
  },
  props:{
      time:{
          type:String,
          default:''
      }
  },
  computed: {

  },
  mounted () {
    setInterval(()=>{
        let res = formatTime2(this.time);
        this.hours = res.split(':')[0]
        this.min = res.split(':')[1]
        this.second = res.split(':')[2]
    },1000)
  },
  methods: {
   
  },
  components:{
  }
}
</script>

<style lang="less">
@import url("~@/styles/init");
 .timer{
        font-size: 12px;
        display: flex;
        align-items: center;
        view{
            width: 20px;
            height: 20px;
            background: black;
            text-align: center;
            line-height: 20px;
            color: white;
            border-radius: 3px;
            margin: 0 3px;
        }
    }
</style>
