<template lang="pug">
.dataInfo
    view.detail_title
        text {{basicInfo.title}}
    view.detail_price
        text {{'¥'+salePriceCent}}
        text {{'￥'+originalPriceCent}}
        text(v-if='basicInfo.itemType==4') {{}}
        text(v-if='basicInfo.itemType==4') {{pintuanInfo.quota+'人团'}}
    view.detail_discount_list
        view.easy_payment(v-if='basicInfo.bestPayPromotionTitle')
            text {{'翼'}}
            text {{basicInfo.bestPayPromotionTitle}}
        view.discount(v-if='sessionInfo')
            text {{'减'}}
            text {{'满'+discountThresholdCent+'减'+discountCent+'元'}}
    view.detail_promise(v-if='servicePromiseList.length')
        view(v-for='(item,index) in servicePromiseList' :key='index')
            icon(type='success',size='12',color='#b2b2b2')
            text {{item.title}}
</template>

<script>
export default {
  props: {
    servicePromiseList: {
      type: Object,
      default: []
    },
    basicInfo:{
        type:Object,
        default:{}
    },
    sessionInfo:{
        type:Object,
        default:undefined
    },
    pintuanInfo:{
        type:Object,
        default:undefined
    }
  },
  computed:{
      salePriceCent(){
          if(this.basicInfo.itemType==4){
              return (this.pintuanInfo.pintuanPriceCent/100).toFixed(2)
          }else{
              return (this.basicInfo.salePriceCent/100).toFixed(2)
          }
          
      },
      originalPriceCent(){
          return (this.basicInfo.originalPriceCent/100).toFixed(2)
      },
      discountThresholdCent(){
          if(this.sessionInfo){
              return (this.sessionInfo.discountThresholdCent/100)
          }else{
              return ''
          }
      },
      discountCent(){
          if(this.sessionInfo){
              return (this.sessionInfo.discountCent/100)
          }else{
              return ''
          }
      }
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.dataInfo{
    width: 375px;
    padding:0 20px;
    box-sizing: border-box;
    border-bottom: 10px solid #f4f4f4;
    .detail_title{
        padding-top: 10px;
        font-size: 18px;
        color:@normalFontColor;
        line-height: 28px;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        overflow: hidden;
        word-wrap: break-word;
        word-break:break-all;
    }
    .detail_price{
        margin-top: 5px;
        display: flex;
        align-items: flex-end;
        position: relative;
        text:nth-child(1){
            color:@bgColor;
            font-size: 18px;
        }
        text:nth-child(2){
            color: @lightColor;
            font-size: 12px;
            text-decoration: line-through;
            margin-left:10px; 
        }
        text:nth-child(3){
            font-size: 12px;
            color: #737373;
            position: absolute;
            right: 50px;
        }
        text:nth-child(4){
            position: absolute;
            right: -20px;
            width: 54px;
            height: 24px;
            background: @bgColor;
            color: white;
            font-size: 14px;
            text-align: center;
            line-height: 24px;
            border-top-left-radius: 12px;
            border-bottom-left-radius: 12px;
        }
    }
    .detail_discount_list{
        font-size: 12px;
        line-height: 25px;
        padding: 5px 0;
        color: #737373;
        >view{
             >text:nth-child(1){
                font-size: 10px;
                padding: 0 2px;
                border-radius: 3px;
                margin-right:5px; 
            }
        }
        >view.easy_payment{
             >text:nth-child(1){
                color: @bgColor;
                border: 1px solid @bgColor;
            }
        }
        >view.coupon{
             >text:nth-child(1){
                color: #f6947d;
                border: 1px solid #f6947d;
            }
        }
        >view.discount{
             >text:nth-child(1){
                color: #70ccd2;
                border: 1px solid #70ccd2;
            }
        }
       
    }
    .detail_promise{
        width: 100%;
        height: 44px;
        box-sizing: border-box;
        border-top: 1px solid #f4f4f4;
        display: flex;
        font-size: 11px;
        // line-height: 44px;
        align-items: center;
        justify-content: space-between;
        color: @lightColor;
        >view{
            padding-right: 20px;
            display: flex;
            align-items: center;
            icon{
                padding-right: 5px;
            }
        }
    }
}

</style>
