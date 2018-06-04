<template lang="pug">
a.home_view_li(:href='detailHref')
    img.home_view_li_left(:src="imgUrlPrefix+dataInfo.pic+'@!400'",)
    .home_view_li_right
        .li_top {{dataInfo.title}}
        .li_center {{dataInfo.desc}}
        .li_bottom
            .li_bottom_left
                text.li_bottom_left_saleprice {{'¥'+pintuanPriceCent}}
                view
                    text {{'原价'}}
                    text.li_bottom_left_orginprice {{'¥'+originalPriceCent}}
            .li_bottom_right {{'去开团'}}
</template>

<script>
import  global from '@/global'
export default {
  data(){
      return {
      }
  },
  props: {
    dataInfo: {
      type: Object,
      default: {}
    }
  },
  computed:{
      originalPriceCent(){
          return (this.dataInfo.originalPriceCent/100).toFixed(2);
      },
      pintuanPriceCent(){
          return (this.dataInfo.pintuanPriceCent/100).toFixed(2);
      },
      detailHref(){
          return `/pages/home/detail?id=${this.dataInfo.itemId}`
      },
      imgUrlPrefix(){
          return global.imgUrlPrefix
      }
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
        flex:none;
    }
    .home_view_li_right{
        flex:1;
        display: flex;
        padding: 10px 10px 5px;
        flex-wrap: wrap;
        flex-direction: column;
        justify-content: space-between;
        .li_top{
            display: -webkit-box;
            -webkit-box-orient: vertical;
            -webkit-line-clamp: 2;
            overflow: hidden;
            color: @normalFontColor;
            font-size: 14px;
            line-height: 20px;
            height: 40px;
            width: 100%;
            word-wrap: break-word;
            word-break:break-all;
        }
        .li_center {
            color: @bgColor;
            font-size: 14px;
            margin: 5px 0 20px;
        }
        .li_bottom{
            height: 30px;
            display: flex;
            width: 100%;
            justify-content: space-between;
            .li_bottom_left{
                display: flex;
                flex-direction: column;
                margin-top: -2px;
                .li_bottom_left_saleprice{
                    font-weight:bolder;
                    font-size: 18px;
                    color: @bgColor;
                    line-height:20px;
                }
                >view{
                    font-size: 10px;
                    color: @lightColor;
                }
                .li_bottom_left_orginprice{
                    font-size: 10px;
                    text-decoration: line-through;
                    color: @lightColor;
                }
            }
            .li_bottom_right{
                width: 89px;
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
