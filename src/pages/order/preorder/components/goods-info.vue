<template lang="pug">
.goods_info
    .goods_info_title {{dataInfo.groupName}}
    .goods_info_content
        itemInfo(v-for='(item,index) in dataInfo.groupItemList',:key='index',:dataInfo='item')
        .goods_info_content_remark
            text {{'备注：'}}
            input(placeholder='选填（请输入文字）',@change='changeMemo',v-model='memo')
</template>

<script>
import  global from '@/global'
import  itemInfo from './item-info'
export default {
  data(){
      return{
          skuName:[],
          memo:''
      }
  },
  props: {
    dataInfo: {
      type: Object,
      default: []
    }
  },
  methods: {
    changeMemo(){
        this.$emit('listenFromChild',this.memo);
        this.memo = ''
    }  
  },
  computed:{
      imgUrlPrefix(){
          return global.imgUrlPrefix
      },
      
  },
  components: {
    itemInfo  
  },
  mounted(){
    //   console.log(this.dataInfo)
    //   this.dataInfo.skuName.split(' ').forEach((item,index)=>{
    //       this.skuName.push(item)
    //   })
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.goods_info{
    width: 375px;
    padding: 0 20px;
    box-sizing: border-box;
    font-size: 16px;
     border-bottom: 10px solid #f7f8fa;
    .goods_info_title{
        height: 43px;
        line-height: 43px;
        border-bottom: 1px solid #f4f4f4;
    }
    .goods_info_content{
        font-size: 14px;
        .goods_info_content_top{
            display: flex;
            padding: 15px 0;
            >img{
                width: 80px;
                height: 80px;
                box-sizing: border-box;
                border: 1px solid #f4f4f4;
            }
            >view{
                padding-left: 14px;
                flex:1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                >text:nth-child(1){
                    display: -webkit-box;
                    -webkit-box-orient: vertical;
                    -webkit-line-clamp: 2;
                    overflow: hidden;
                    height: 40px;
                    line-height: 20px;
                }
                >view:nth-child(2){
                    color: #b2b2b2;
                    font-size: 12px;
                }
                >view:nth-child(3){
                    font-size: 12px;
                    display: flex;
                    justify-content: space-between;
                }
            }
        }
        .goods_info_content_remark{
            display: flex;
            height: 54px;
            line-height: 54px;
            text{
                width: 42px;
            }
            input{
                flex:1;
                padding: 14px;
            }
            input:-moz-placeholder { /* Mozilla Firefox 4 to 18 */
                color: #b2b2b2; opacity:1; 
            }
            input::-moz-placeholder { /* Mozilla Firefox 19+ */
                color: #b2b2b2;opacity:1;
            }
            input:-ms-input-placeholder{
                color: #b2b2b2;opacity:1;
            }
            input::-webkit-input-placeholder{
                color: #b2b2b2;opacity:1;
            }
        }
    }
}
</style>
