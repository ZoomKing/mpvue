<template lang="pug">
.specificatinItem
    .name(:data-id='str') {{dataTitle}}
    .item_box
        skuItem(v-for='(item,index) of dataInfo',:key='index',:dataInfo='item',:attributeList='detail.showInfo.attributeList',)
</template>

<script>
import { mapState,mapMutations,actions} from 'vuex';
import skuItem from './detail-sku-item'
export default {
  props: {
    dataInfo: {
      type: Object,
      default: []
    },
    dataTitle:{
      type:String,
      default:''
    },
  },
  data(){
    return {
      
    }
  },
  methods: {
    // ...mapMutations([  
    //     'changeShowInfo','changeSkuDataList','changeSkuNormal'
    // ]),
  },
  computed:{
      ...mapState(["detail"]),
      str(){
        return JSON.stringify(this.detail.showInfo)
      }
  },
  
  created(){
    // console.log(this.detail.showInfo);
    // this.detail.showInfo.attributeList.forEach((item,index)=>{
    //     this.attributeList.push(item.value)
    // })
   
  },
  components:{
    skuItem
  }
}
</script>

<style lang="less" scoped>
@import url("~@/styles/init");
.specificatinItem{
  color: @normalFontColor;
  padding: 0 20px;
  padding-top: 10px;
  line-height: 25px;
  .name{
    font-size: 14px;
  }
  .item_box{
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    
  }
}
</style>
