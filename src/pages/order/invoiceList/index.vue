<template lang="pug">
.invoice_list_box
    .invoice_list(v-if='invoiceList.length')
        InvoiceItem(v-for='(item,index) in invoiceList',:key='index',:itemInfo='item')
    NoItem(v-else)
    .invoice_bottom
        .get_invoice_fromwx(@click='get_invoice_fromwx') {{'从微信导入'}}
        a.add_invoice(:href='aHref') {{'添加开票信息'}}
</template>

<script>
import { mapState,mapMutations} from 'vuex';
import InvoiceItem from './components/invoiceItem'
import NoItem from './components/noItem'
import api from './api'
export default {
  data(){
      return{
          invoiceList:[]
      }
  },
  computed: {
      aHref(){
        return `/pages/order/invoice`
      },
  },
  onShow(){
      this.get_invoice_list()
  },
  methods: {
      ...mapMutations(['changeInvoice']),
      async get_invoice_list(){
          let wipRes = await api.get_invoice_list();
          this.invoiceList = wipRes.value;
      },
      get_invoice_fromwx(){
        wx.chooseInvoiceTitle({
            success:(res)=>{
                let wipObj = {
                    'titleType':res.type==0?2:1,
                    'title':res.title,
                }
                if(res.taxNumber){
                    wipObj.taxId = res.taxNumber
                }
              
                this.add_invoice(wipObj);
                
            },
            fail:(res)=>{
                wx.showToast({
                    title: '导入发票失败,请手动添加',
                    icon: 'none'
                })
            }
        })
      },
      async add_invoice(obj){
          console.log(obj)
        if(obj.taxId&&obj.taxId.length>10){
            setTimeout(()=>{
                wx.showToast({
                    title: '税号过长，无法添加',
                    icon: 'none',
                    
                })
            },1000)
            return;
        }
        let wipRes = await api.add_invoice(obj);
        
        console.log(wipRes);
        if(wipRes.succ){
            wipRes.value.type=2;
            this.changeInvoice(wipRes.value);
            wx.showToast({
                title: '导入发票成功',
                icon: 'none'
            })
            wx.navigateBack({
                    url: '/pages/order/preorder'
                // delta:1
            })
        }
      }
  },
  components:{
      InvoiceItem,NoItem
  },
  mounted () {
     
  },
}
</script>

<style lang="less">
@import url("~@/styles/init");
.invoice_list{
    padding-bottom: 48px;
}
.invoice_bottom{
    width: 100%;
    position: fixed;
    height: 48px;
    display: flex;
    font-size: 18px;
    bottom: 0;
    color: white;
    text-align: center;
    line-height: 48px;
    .get_invoice_fromwx{
        flex:1;
        background: @normalFontColor;
    }
    .add_invoice{
        flex:1;
        background: @bgColor;
    }
}
</style>
