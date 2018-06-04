<template lang="pug">
a.home_view_li(:href='detailHref')
    img.home_view_li_left(:src="imgUrlPrefix+dataInfo.pic+'@!400'",lazy-load='true')
    .home_view_li_right
        .li_top {{dataInfo.title}}
        .li_center 
            text {{'￥0.01'}}
            view
                text {{'原价'}}
                text {{'¥'+originalPriceCent}}
        .li_bottom
            .li_bottom_left {{dataInfo.desc}}
            .li_bottom_right {{'立享1分抽'}}
</template>

<script>
import  global from '@/global'
export default {
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  data(){
      return{

      }
  },
  computed:{
      originalPriceCent(){
          return (this.dataInfo.originalPriceCent/100).toFixed(2);
      },
      salePriceCent(){
          return (this.dataInfo.salePriceCent/100).toFixed(2);
      },
      detailHref(){
          return `/pages/home/detail?id=${this.dataInfo.itemId}`
      },
      day(){
          return parseInt((new Date(this.dataInfo.endTime)-new Date())/(1000*3600*24))
      },
      hours(){
          return parseInt((new Date(this.dataInfo.endTime)-new Date())/(1000*3600))%24
      },
      imgUrlPrefix(){
          return global.imgUrlPrefix
      }
  },
  mounted(){
    //   console.log(this.dataInfo)
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.home_view_li{
    display: flex;
    box-sizing: border-box;
    padding: 5px;
    width: 343px;
    height: 150px;
    margin-bottom: 10px;
    overflow: hidden;
    border-radius: 5px;
    background: white;
    img.home_view_li_left{
        width: 140px;
        height: 140px;
        object-fit: cover;
        flex: none;
    }
    .home_view_li_right{
        flex:1;
        display: flex;
        padding: 10px 10px 0;
        flex-wrap: wrap;
        justify-content: space-between;
        flex-direction: column;
        .li_top{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            color: @normalFontColor;
            font-size: 14px;
            line-height: 20px;
            height: 40px;
        }
        .li_center {
            color: @normalFontColor;
            font-size: 12px;
            // margin: 10px 0 20px;
            display: flex;
            color: @bgColor;
            flex-direction: column;
            >text:nth-child(1){
                font-size:18px;
                font-weight:bolder;
                line-height:20px;
            }
            text:nth-child(2){
                color: #b2b2b2;
                text-decoration: line-through;
            }
            >view{
                font-size:12px;
                color: #b2b2b2;
            }
        }
        .li_bottom{
            height: 30px;
            display: flex;
            width: 100%;
            margin-bottom: 5px;
            justify-content: space-between;
            text-align: center;
            line-height: 30px;
            font-size: 14px;
            .li_bottom_left{
                flex:1;
                color: @bgColor;
                background: white;
                border: 1px solid @bgColor;
                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;
            }
            .li_bottom_right{
                flex:1;
                background: @bgColor;
                color: white;
                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;
            }
        }

    }
}
</style>
