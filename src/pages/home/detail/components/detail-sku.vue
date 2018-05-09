<template lang="pug">
.detailSKU
    .detailSKU_top
    .detailSKU_content
        .detailSKU_title
            .detailSKU_title_left {{skuListDate.itemTitle}}
            img(src='/static/assets/detail_order_delete_icon@3x.png',@click='close') 
        .detailSKU_info
            img(:src="detail.showInfo.pic+'@!400'")
            .detailSKU_info_right
                text {{'￥'+salePriceCent}}
                text {{quantityLeft}}
                view.detailSKU_balel
                    view(v-for='(item,index) in detail.showInfo.attributeList',:key='index') {{item.value}}
        .specifications
            specificationItem(v-for='(item,name) in detail.skuNormal',:key='name',:dataInfo='item',:dataTitle='name',)
        .goodsCount(v-if='isPintuanStatus')
            .name {{'数量'}}
            view
                img(src='/static/assets/order_setting_subtract_normal_icon@3x.png',@click='computedCount(-1)')
                text {{count}}
                img(src='/static/assets/order_setting_add_unclickale_icon@3x.png',@click='computedCount(1)')
        .confirm(@click='confirm',:class="{invilid:cantClick}") {{'确定'}}
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import specificationItem from './specification-item';
import isLogin from '@/utils/isLogin'

export default {
  props: {
    skuListDate: {
        type: Object,
        default: {
            itemTitle:'',
            mainPic:'',
            skuList:{
                itemTitle:'',
                mainPic:'',
                normal:{},
            }
        }
    },
    isPintuan:{
        type:String,
        default:''
    },
    orderType:{
        type:Number,
        default:1
    }
  },
  data(){
      return{
        count:1,
      }
  },
  computed:{
      ...mapState(["detail",'preorder']),
      originalPriceCent(){
          return (this.detail.showInfo.originalPriceCent/100).toFixed(2)
      },
      salePriceCent(){
          return (this.detail.showInfo.salePriceCent/100).toFixed(2)
      },
      isPintuanStatus(){
          if(this.isPintuan=='singleBuy' || this.isPintuan =='pintuanBuy'){
              return true
          }else if(this.isPintuan=='centDraw'){
              return false
          }
      },
      cantClick(){
          if(this.detail.showInfo.quantityLeft>0){
              return false
          }else{
              return true
          }
      },
      quantityLeft(){
          if(this.detail.showInfo.quantityLeft>99){
              return '库存充足'
          }else{
              return '库存紧张'
          }
      }
  },
  methods:{
    ...mapMutations([  
        'changeShowInfo','changePreOorderParameter','changeDetailSkuStatus'
    ]),
    close(){
        this.changeDetailSkuStatus(false)
    },
    computedCount(value){
        this.count  += value;
        if(this.count<1){
            this.count = 1;
        }
        if(this.count>this.detail.showInfo.quantityLeft){
            this.count = this.detail.showInfo.quantityLeft
        }
    },
    confirm(){
        if(this.detail.showInfo.quantityLeft>0){
             this.changeDetailSkuStatus(false)
            // console.log(this.detail.showInfo)
            // this.detail.showInfo 为当前选中的sku
            this.changePreOorderParameter({
                'itemList':[
                    {
                        'skuId':this.detail.showInfo.id,
                        'buyNum':this.count
                    }
                ],
                'orderType':this.orderType,
            })
            wx.navigateTo({
                url: '/pages/order/preorder'
            })
        }
       
    },
    
  },
  
  mounted(){
    //   console.log(this.detail);
  },
  components: {
      specificationItem
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.detailSKU{
    width: 100%;
    height: 100%;
    background:rgba(0,0,0,0.75);
    position: fixed;
    top: 0;
    z-index: 10;
    display: flex;
    flex-direction: column;
    overflow: auto;
    .detailSKU_top{
        flex: 1;
    }
    .detailSKU_content{
        background: white;
        .detailSKU_title{
            display: flex;
            box-sizing: border-box;
            padding: 0 20px;
            font-size: 16px;
            font-weight: normal;
            justify-content: space-between;
            height: 44px;
            align-items: center;
            border-bottom: 1px solid #f4f4f4;
            .detailSKU_title_left{
                width: 292px;
                overflow: hidden;
                text-overflow:ellipsis;
                white-space: nowrap;
            }
            >img{
                width: 24px;
                height: 24px;
                box-sizing: border-box;
                padding: 6px;
            }
        }
        .detailSKU_info{
            display: flex;
            box-sizing: border-box;
            width: 335px;
            margin: 0 auto;
            padding: 20px 0;
            border-bottom: 1px solid #f4f4f4;
            >img{
                width: 90px;
                height: 90px;
                margin-right: 10px;
            }
            .detailSKU_info_right{
                flex: 1;
                font-size: 12px;
                display: flex;
                flex-direction: column;
                line-height: 20px;
                position: relative;
                text:nth-child(1){
                    font-size: 14px;
                    color: @bgColor;
                }
                .detailSKU_balel{
                    position: absolute;
                    display: flex;
                    bottom: 0;
                    >view{
                        font-size: 10px;
                        height: 15px;
                        border: 1px solid #f4f4f4;
                        padding: 0 5px;
                        line-height: 15px;
                        margin-right: 10px;
                        color: @normalFontColor;
                        border-radius: 3px;
                    }
                }
            }
        }
        .specifications{
            width: 335px;
            padding-bottom: 10px;
            border-bottom: 1px solid #f4f4f4;
        }
        .goodsCount{
            width: 335px;
            margin: 0 auto;
            padding: 20px 0;
            .name{
                font-size: 14px;
            }
            >view{
                 display: flex;
                 padding-top: 10px;
                 >img{
                    width: 20px;
                    height: 20px;
                    // margin-right:10px;
                }
                >text{
                    font-family:PTSans-Caption;
                    font-size:24px;
                    line-height: 20px;
                    color:@normalFontColor;
                    margin:0 20px;
                }
            }
           
        }
        .confirm{
            width: 375px;
            height: 48px;
            background: @bgColor;
            color: white;
            font-size: 18px;
            text-align: center;
            line-height: 48px;
        }
        .invilid{
            background: #666 !important;
        }
    }
}
</style>
