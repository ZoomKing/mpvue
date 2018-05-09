<template lang="pug">
a.home_view_li(:href='detailHref')
    img.home_view_li_left(:src="imgUrlPrefix+dataInfo.pic+'@!400'",lazy-load='true')
    .home_view_li_right
        .li_top {{dataInfo.title}}
        .li_center {{'原价¥'+originalPriceCent}}
        .li_bottom
            .li_bottom_right {{'立享一分抽'}}
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
            font-size: 16px;
            margin: 10px 0 20px;
            text:nth-child(2),text:nth-child(4){
                color: @bgColor;
            }
        }
        .li_bottom{
            height: 30px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            .li_bottom_left{
                display: flex;
                flex-direction: column;
                margin-top: -5px;
                .li_bottom_left_saleprice{
                    font-size: 18px;
                    color: @bgColor;
                }
                .li_bottom_left_orginprice{
                    font-size: 10px;
                    text-decoration: line-through;
                    color: @lightColor;
                }
            }
            .li_bottom_right{
                width: 186px;
                height: 30px;
                font-size: 16px;
                text-align: center;
                line-height: 30px;
                background: @bgColor;
                color: white;
                border-radius: 5px;
            }
        }

    }
}
</style>
